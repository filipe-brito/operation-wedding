package com.operationwedding.backend.client;

import java.util.List;

import org.apache.commons.codec.digest.HmacUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import com.mercadopago.net.HttpStatus;
import com.operationwedding.backend.exception.MPPaymentException;
import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.mapper.PaymentMapper;
import com.operationwedding.backend.model.payload.MPFetchPaymentResponse;
import com.operationwedding.backend.model.payload.MPOrderRequest;
import com.operationwedding.backend.model.payload.MPProcessPaymentResponse;
import com.operationwedding.backend.utils.LogUtils;

import tools.jackson.core.JacksonException;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Component
public class MercadoPagoClient {

	@Autowired
	private ObjectMapper objectMapper;

	@Value("${mercadopago.access.token}")
	private String mpToken;
	@Value("${mercadopago.secret.signature}")
	private String mpSecretSignature;
	private final String paymentUrl = "https://api.mercadopago.com/v1/orders";
	private final String fetchPaymentUrl = "https://api.mercadopago.com/v1/payments/search?external_reference=";

	@Autowired
	private RestTemplate restTemplate;

	private static final Logger log = LoggerFactory.getLogger(MercadoPagoClient.class);

	public PaymentResponseDTO proccessMPPayment(MPOrderRequest requestBody, String idempotencyKey) {

		HttpHeaders header = new HttpHeaders();
		header.setContentType(MediaType.APPLICATION_JSON);
		header.set("X-Idempotency-Key", idempotencyKey);
		header.setBearerAuth(mpToken);
		HttpEntity<MPOrderRequest> httpEntity = new HttpEntity<>(requestBody, header);

		String response = "";
		try {
			log.info("[STARTING PAYMENT INTEGRATION WITH MERCADO PAGO] Idenpotency Key: {} Payload: {}", idempotencyKey,
					LogUtils.mask(LogUtils.httpEntityToCurl(httpEntity, "POST", paymentUrl)));
			response = restTemplate.postForEntity(
					paymentUrl, httpEntity, String.class).getBody();

			MPProcessPaymentResponse mappedResponse = objectMapper.readValue(response, MPProcessPaymentResponse.class);

			Assert.hasText(mappedResponse.getExternalReference(),
					"Mercado Pago processou o pagamento, mas não devolveu a propriedade 'external_reference'");
			Assert.notNull(mappedResponse.getTotalPaidAmount(),
					"Mercado Pago processou o pagamento, mas não devolveu a propriedade 'total_paid_amount'");
			Assert.notNull(mappedResponse.getTransactions(),
					"Mercado Pago processou o pagamento, mas não devolveu a propriedade 'transactions'");

			log.info("[MERCAGO PAGO PAYMENT RETURN] Status: {} Mercado Pago response: {}",
					mappedResponse.getTransactions().getPayments().get(0).getStatusDetail(),
					LogUtils.mask(objectMapper.writeValueAsString(mappedResponse)));

			return PaymentMapper.toPaymentResponse(mappedResponse);
		} catch (JacksonException e) {
			log.error("[JSON DESSERIALIZATION ERROR] Mercado Pago Response: {}", LogUtils.mask(response));
			throw new ResponseStatusException(HttpStatusCode.valueOf(500),
					"Erro ao desserializar resposta do Mercado Pago. Acione o administrador para validar o status do pagamento.");
		} catch (HttpStatusCodeException e) {
			if (e.getStatusCode().is4xxClientError()) {
				JsonNode jsonError = objectMapper.readTree(e.getResponseBodyAsString());

				String statusDetail = jsonError.at("/data/transactions/payments/0/status_detail").asString(null);

				List<MPPaymentException.Error> errors = objectMapper.readerForListOf(MPPaymentException.Error.class).readValue(jsonError.path("errors"));


				log.error("[MERCAGO PAGO PAYMENT RETURN] Status: {} Mercado Pago response: {}", e.getStatusCode(),
						LogUtils.mask(e.getResponseBodyAsString()));

				throw new MPPaymentException(e.getStatusCode(), statusDetail, "Mercado Pago retornou erro ao processar o pagamento.", errors);

			} else {
				log.error("[MERCAGO PAGO PAYMENT RETURN] Status: {} Mercado Pago response: {}", e.getStatusCode(),
						LogUtils.mask(e.getResponseBodyAsString()));
				throw new MPPaymentException(e.getStatusCode(), null, e.getMessage(), null);
			}
		} catch (IllegalArgumentException e) {
			log.error("[JSON DESSERIALIZATION ERROR] Descripion: {} Mercado Pago Response: {}", e.getMessage(),
					LogUtils.mask(response));
			throw new MPPaymentException(HttpStatusCode.valueOf(500), null, 
					"Erro ao desserializar resposta do Mercado Pago. Acione o administrador para validar o status do pagamento.", null);
		} catch (Exception e) {
			log.error("[UNEXPECTED_ERROR] Error detail: {} | Message: {}",
					e.getClass().getSimpleName(), e.getMessage(), e);

			throw new MPPaymentException(HttpStatusCode.valueOf(500), null, 
					"Ocorreu um erro interno inesperado ao integrar com o Mercado Pago. Acione o administrador.", null);
		}
	}

	public ResponseEntity<MPFetchPaymentResponse> fetchMPPayment(String externalReference) {
		HttpHeaders header = new HttpHeaders();
		header.setBearerAuth(mpToken);

		HttpEntity<Void> httpEntity = new HttpEntity<>(header);
		log.info("Initiating payment consult on Mercado Pago | Request cURL: {}", LogUtils.httpEntityToCurl(httpEntity, "GET", fetchPaymentUrl + externalReference));
		try{
			ResponseEntity<MPFetchPaymentResponse> mpResponse = restTemplate.exchange(fetchPaymentUrl + externalReference,
					HttpMethod.GET, httpEntity, MPFetchPaymentResponse.class);
			log.info("Payment successfully validated on Mercado Pago | Mercado Pago response: {}", LogUtils.mask(objectMapper.writeValueAsString(mpResponse.getBody())));
			return mpResponse;
		} catch (HttpStatusCodeException e) {
			log.error("Failure to verify payment on Mercado Pago | Details: {} | Message: {} | Response body: {}", e.getCause(), e.getMessage(), LogUtils.generalMask(e.getResponseBodyAsString()));
			throw e;
		}
	}

	public void mpPaymentValidation(String xSignature, String xRequestId, String dataId) {
		log.info("Initiating integrity verification of payment signature");
		String ts;
		String v1;
		try {
			String[] split = xSignature.split(",");
			ts = split[0].split("=")[1].trim();
			v1 = split[1].split("=")[1].trim();
		} catch (Exception e) {
			log.error("Error on payment signature autentication | Details: {} Message: {} Error: {}", e.getCause(), e.getMessage());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
					"A assinatura do pagamento está com a estrutura inválida", null);
		}

		long now = System.currentTimeMillis() / 1000;

		if (Math.abs(now - Long.parseLong(ts)) > 300) {
			log.error("Error on payment signature autentication | Details: Payment signature is expired");
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Assinatura do pagamento com validade vencida",
					null);
		}

		String manifest = "id:" + dataId.toLowerCase() + ";request-id:" + xRequestId + ";ts:" + ts + ";";

		String cyphedSignature = new HmacUtils("HmacSHA256", mpSecretSignature).hmacHex(manifest);

		if (!cyphedSignature.equalsIgnoreCase(v1)) {
			log.error("Error on payment signature autentication | Details: The payment signature sent by Mercado Pago does not match the server's signature | v1 value: {}", v1);
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Assinatura do pagamento inválida", null);
		}

		log.info("Payment signature was successfully validated");
	}
}
