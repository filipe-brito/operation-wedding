package com.operationwedding.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.operationwedding.backend.model.dto.GiftItemDTO;
import com.operationwedding.backend.model.dto.PaymentRequestDTO;
import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.payload.MPFetchPaymentResponse;
import com.operationwedding.backend.services.GiftService;
import com.operationwedding.backend.services.MercadoPagoService;

import jakarta.validation.Valid;
import tools.jackson.databind.JsonNode;
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

	@PostMapping("/webhook")
	public ResponseEntity<Map<String, Object>> handleWebhook(
				@RequestBody JsonNode payload, 
				@RequestHeader HttpHeaders header, 
				@RequestHeader("x-signature") String xSignature,
				@RequestHeader("x-request-id") String xRequestId,
				@RequestParam("data.id") String dataId,
				@RequestParam("data.external_reference") String externalReference
			) {
		System.out.println("======================================================================");
		System.out.println("x-signature = " + xSignature + "\nx-request-id = " + xRequestId + "\ndata.id = " + dataId);
		System.out.println("Corpo recebido do Webhook: " + objectMapper.writeValueAsString(payload));
		System.out.println("======================================================================");
		
		giftService.updateGift(xSignature, xRequestId, dataId, externalReference);		
		
		return ResponseEntity.ok(null);
	}
}