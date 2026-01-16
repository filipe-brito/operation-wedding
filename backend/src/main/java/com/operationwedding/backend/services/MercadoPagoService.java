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

import com.operationwedding.backend.model.dto.PaymentDTO;
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
	
    public ResponseEntity<String> proccessMPPayment(PaymentDTO dto, String idempotencyKey) {
        MPOrderRequest requestBody = PaymentMapper.toMPOrderRequest(dto);
        System.out.println("Corpo que será enviado ao Mercado Pago: " + objectMapper.writeValueAsString(requestBody));
        
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        header.set("X-Idempotency-Key", idempotencyKey);
        header.setBearerAuth(mpToken);
        System.out.println("Header que será enviado ao Mercado Pago: " + objectMapper.writeValueAsString(header));
        
        HttpEntity<MPOrderRequest> httpEntity = new HttpEntity<>(requestBody, header);
        try {
        	ResponseEntity<String> response = restTemplate.postForEntity(paymentUrl, httpEntity, String.class);
        	System.out.println("Transação processada!");
        	System.out.println("=====================RETORNO DO MERCADO PAGO==================");
        	System.out.println(response.getBody());
        	return response;
        } catch (HttpStatusCodeException e) {
        	System.out.println("=====================EROO DO MERCADO PAGO=====================");
            System.out.println("Erro Mercado Pago: " + e.getResponseBodyAsString());
            System.out.println("Status Code do Erro: " + e.getStatusCode());
            System.out.println("Headers do Erro: " + e.getResponseHeaders());
            System.out.println("==============================================================");
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        }  
        catch (Exception e){
        	System.out.println("Erro interno no pagamento: " + e.getMessage());
        	return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
