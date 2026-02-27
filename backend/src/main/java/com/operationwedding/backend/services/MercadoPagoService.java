package com.operationwedding.backend.services;

import org.apache.commons.codec.digest.HmacUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import com.mercadopago.net.HttpStatus;
import com.operationwedding.backend.model.dto.PaymentRequestDTO;
import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.mapper.PaymentMapper;
import com.operationwedding.backend.model.payload.MPFetchPaymentResponse;
import com.operationwedding.backend.model.payload.MPOrderRequest;

import tools.jackson.databind.ObjectMapper;

@Service
public class MercadoPagoService {

	@Autowired
	private ObjectMapper objectMapper;

	@Value("${mercadopago.access.token}")
	private String mpToken;
	@Value("${mercadopago.secret.signature}")
	private String mpSecretSignature;
	private final String paymentUrl = "https://api.mercadopago.com/v1/orders";
	private final String fetchPaymentUrl = "https://api.mercadopago.com/v1/payments/search?external_reference=";

	private RestTemplate restTemplate = new RestTemplate();

	public ResponseEntity<PaymentResponseDTO> proccessMPPayment(PaymentRequestDTO dto, String idempotencyKey) {
		MPOrderRequest requestBody = PaymentMapper.toMPOrderRequest(dto);

		HttpHeaders header = new HttpHeaders();
		header.setContentType(MediaType.APPLICATION_JSON);
		header.set("X-Idempotency-Key", idempotencyKey);
		header.setBearerAuth(mpToken);
		HttpEntity<MPOrderRequest> httpEntity = new HttpEntity<>(requestBody, header);
		try {
			// Isso deve ser ajustado. O ideal, é ter uma classe DTO para o retorno do
			// Mercado Pago
			ResponseEntity<String> response = restTemplate.postForEntity(paymentUrl, httpEntity, String.class);
			Object formatted = objectMapper.readValue(response.getBody(), Object.class);
			System.out.println("======RETORNO DO MERCADO PAGO======");
			System.out.println(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(formatted));
			System.out.println("===================================");
			PaymentResponseDTO responseConverted = PaymentMapper
					.toPaymentResponse(objectMapper.readTree(response.getBody()));
			return ResponseEntity.status(response.getStatusCode()).body(responseConverted);
		} catch (HttpStatusCodeException e) {
			String jsonError = e.getResponseBodyAsString();
			Object jsonObject = objectMapper.readValue(jsonError, Object.class);
			String jsonFormated = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonObject);
			System.out.println("=======ERRO DO MERCADO PAGO=======");
			System.out.println(e.getMessage() + "\n====================" + jsonFormated);
			System.out.println("===================================");
			PaymentResponseDTO responseConverted = PaymentMapper
					.toPaymentResponse(objectMapper.readTree(e.getResponseBodyAsString()));
			return ResponseEntity.status(e.getStatusCode()).body(responseConverted);
		} catch (Exception e) {
			PaymentResponseDTO responseError = new PaymentResponseDTO();
			responseError.setStatus("Erro interno ao processar pagamento!");
			responseError.setDetail("Não foi possível enviar o pagamento ao Mercado Pago.");
			return ResponseEntity.status(500).body(responseError);
		}
	}

	public ResponseEntity<MPFetchPaymentResponse> fetchMPPayment(String externalReference) {
		HttpHeaders header = new HttpHeaders();
		header.setBearerAuth(mpToken);

		HttpEntity<MPOrderRequest> httpEntity = new HttpEntity<>(header);

		// O Spring propaga as exceções lançadas pelo MP
		ResponseEntity<MPFetchPaymentResponse> mpResponse = 
				restTemplate.exchange(fetchPaymentUrl + externalReference, 
						HttpMethod.GET, httpEntity, 
						MPFetchPaymentResponse.class);
		return mpResponse;
	}

	public void MPPaymentValidation(String xSignature, String xRequestId, String dataId) {
			String[] split = xSignature.split(",");
			String ts = split[0].split("=")[1].trim();
			String v1 = split[1].split("=")[1].trim();

			long now = System.currentTimeMillis() / 1000;

			if (Math.abs(now - Long.parseLong(ts)) > 300) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Assinatura do pagamento com validade vencida", null);
			}

			String manifest = "id:" + dataId.toLowerCase() + ";request-id:" + xRequestId + ";ts:" + ts + ";";

			String cyphedSignature = new HmacUtils("HmacSHA256", mpSecretSignature).hmacHex(manifest);

			if (!cyphedSignature.equalsIgnoreCase(v1)) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Assinatura do pagamento inválida", null);
			}	
	}
}
