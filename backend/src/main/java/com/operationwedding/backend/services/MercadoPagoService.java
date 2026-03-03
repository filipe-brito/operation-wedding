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
import com.operationwedding.backend.exception.MPPaymentException;
import com.operationwedding.backend.model.payload.MPFetchPaymentResponse;
import com.operationwedding.backend.model.payload.MPOrderRequest;
import com.operationwedding.backend.model.payload.MPProcessPaymentResponse;

import tools.jackson.databind.JsonNode;
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

	public ResponseEntity<MPProcessPaymentResponse> proccessMPPayment(MPOrderRequest requestBody, String idempotencyKey) {

		HttpHeaders header = new HttpHeaders();
		header.setContentType(MediaType.APPLICATION_JSON);
		header.set("X-Idempotency-Key", idempotencyKey);
		header.setBearerAuth(mpToken);
		HttpEntity<MPOrderRequest> httpEntity = new HttpEntity<>(requestBody, header);
		
		try {
			ResponseEntity<MPProcessPaymentResponse> response = restTemplate.postForEntity(paymentUrl, httpEntity, MPProcessPaymentResponse.class);
			System.out.println("======RETORNO DO MERCADO PAGO======");
			System.out.println(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(response));
			System.out.println("===================================");
			
			return response;
		} catch (HttpStatusCodeException e){
			if (e.getStatusCode().is4xxClientError()) {
				String jsonError = e.getResponseBodyAsString();
				// 1. Lê o JSON como uma árvore de nós
	            JsonNode rootNode = objectMapper.readTree(jsonError);
	            
	            // 2. Tenta encontrar o nó "data". Se não existir, usa o rootNode (o próprio JSON)
	            JsonNode targetNode = rootNode.has("data") ? rootNode.get("data") : rootNode;
				MPProcessPaymentResponse jsonConverted = objectMapper.treeToValue(targetNode, MPProcessPaymentResponse.class);

				System.out.println("======ERRO MERCADO PAGO======");
				System.out.println(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonConverted));
				System.out.println("===================================");
				
				throw new MPPaymentException(e.getStatusCode(), jsonConverted);
			} else {
				System.out.println("======ERRO DIVERSO======");
				System.out.println(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(e.getResponseBodyAsString()));
				System.out.println("===================================");
				throw e;
			}
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
		String ts;
		String v1;
			try {
				String[] split = xSignature.split(",");
				ts = split[0].split("=")[1].trim();
				v1 = split[1].split("=")[1].trim();
			} catch (Exception e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A assinatura do pagamento está com a estrutura inválida", null);
			}
			
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
