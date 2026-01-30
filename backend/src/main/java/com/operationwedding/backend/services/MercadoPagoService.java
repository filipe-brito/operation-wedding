package com.operationwedding.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import com.operationwedding.backend.model.dto.PaymentRequestDTO;
import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.mapper.PaymentMapper;
import com.operationwedding.backend.model.payload.MPOrderRequest;

import tools.jackson.databind.ObjectMapper;

@Service
public class MercadoPagoService {
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Value("${mercadopago.access.token}")
	private String mpToken;
	private final String paymentUrl = "https://api.mercadopago.com/v1/orders";
	
	private RestTemplate restTemplate = new RestTemplate();
	
    public ResponseEntity<PaymentResponseDTO> proccessMPPayment(PaymentRequestDTO dto, String idempotencyKey) {
        MPOrderRequest requestBody = PaymentMapper.toMPOrderRequest(dto);
        
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        header.set("X-Idempotency-Key", idempotencyKey);
        header.setBearerAuth(mpToken);
        HttpEntity<MPOrderRequest> httpEntity = new HttpEntity<>(requestBody, header);
        try {
        	ResponseEntity<String> response = restTemplate.postForEntity(paymentUrl, httpEntity, String.class);
        	Object formatted = objectMapper.readValue(response.getBody(), Object.class);
        	System.out.println("======RETORNO DO MERCADO PAGO======");
        	System.out.println(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(formatted));
        	System.out.println("===================================");
        	PaymentResponseDTO responseConverted = PaymentMapper.toPaymentResponse(
        			objectMapper.readTree(response.getBody()));
        	return ResponseEntity.status(response.getStatusCode()).body(responseConverted);
        } catch (HttpStatusCodeException e) {
        	String jsonError = e.getResponseBodyAsString();
        	Object jsonObject = objectMapper.readValue(jsonError, Object.class);
        	String jsonFormated = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonObject);
        	System.out.println("=======ERRO DO MERCADO PAGO=======");
        	System.out.println(e.getMessage() + "\n====================" + jsonFormated);
        	System.out.println("===================================");
            PaymentResponseDTO responseConverted = PaymentMapper.toPaymentResponse(
            		objectMapper.readTree(e.getResponseBodyAsString()));
            return ResponseEntity.status(e.getStatusCode()).body(responseConverted);
        }  
        catch (Exception e){
        	PaymentResponseDTO responseError = new PaymentResponseDTO();
        	responseError.setStatus("Erro interno ao processar pagamento!");
        	responseError.setDetail("Não foi possível enviar o pagamento ao Mercado Pago.");
        	return ResponseEntity.status(500).body(responseError);
        }
    }
}
