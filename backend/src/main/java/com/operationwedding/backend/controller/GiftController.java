package com.operationwedding.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.operationwedding.backend.model.dto.GiftItemDTO;
import com.operationwedding.backend.model.dto.PaymentRequestDTO;
import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.services.GiftService;

import jakarta.validation.Valid;
import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/gifts")
public class GiftController {
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private GiftService giftService;

	@PostMapping("/process")
	public ResponseEntity<PaymentResponseDTO> processPayment(@RequestBody @Valid PaymentRequestDTO paymentDTO,
			@RequestHeader("X-Idempotency-Key") String idempotencyKey) {
		System.out.println("Chave de idempotência recebido do front: " + idempotencyKey.toString());
		System.out.println("Corpo recebido do front: " + objectMapper.writeValueAsString(paymentDTO));

		ResponseEntity<PaymentResponseDTO> response = giftService.processGift(paymentDTO, idempotencyKey);
		
		System.out.println("Status da resposta do backend: \n" + response.getStatusCode().toString());
		
		return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
	}
	
	@GetMapping("/catalog")
	public ResponseEntity<List<GiftItemDTO>> getGiftsCatalog() {
		System.out.println("==================Lista de Presentes consultadas no banco=====================");
		ResponseEntity<List<GiftItemDTO>> response = giftService.getGiftCatalog();
		System.out.println(objectMapper.writeValueAsString(response));
		
		return response;
	}
}