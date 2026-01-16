package com.operationwedding.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.operationwedding.backend.model.dto.PaymentDTO;
import com.operationwedding.backend.services.MercadoPagoService;

import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private MercadoPagoService MPService;

	@PostMapping("/process")
	public ResponseEntity<String> processPayment(@RequestBody PaymentDTO paymentDTO,
			@RequestHeader("X-Idempotency-Key") String idempotencyKey) {
		System.out.println("Chave de idempotência recebido do front: " + idempotencyKey.toString());
		System.out.println("Corpo recebido do front: " + objectMapper.writeValueAsString(paymentDTO));

		ResponseEntity<String> response = MPService.proccessMPPayment(paymentDTO, idempotencyKey);
		
		System.out.println("Header da resposta do backend: \n" + response.getHeaders());
		
		return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
	}
}