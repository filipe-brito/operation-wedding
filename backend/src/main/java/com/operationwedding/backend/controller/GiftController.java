package com.operationwedding.backend.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
import com.operationwedding.backend.services.GiftService;
import com.operationwedding.backend.services.TurnstileService;
import com.operationwedding.backend.utils.LogUtils;

import jakarta.servlet.http.HttpServletRequest;
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
	@Autowired
	TurnstileService tService;
	
	private static final Logger log = LoggerFactory.getLogger(GiftController.class);

	@PostMapping("/process")
	public ResponseEntity<PaymentResponseDTO> processPayment(
		HttpServletRequest request, 
		@RequestBody @Valid PaymentRequestDTO paymentDTO,
		@RequestHeader("X-Idempotency-Key") String idempotencyKey
	) {
		MDC.put("trace_id", paymentDTO.getExternalReference());
		MDC.put("process_name", "PAYMENT_PROCESS");
		String clientIp = request.getRemoteAddr();
		
		log.info("[PAYMENT REQUEST RECEIVED] Payload request: {}", objectMapper.writeValueAsString(paymentDTO));
		boolean isHuman = tService.isHuman(paymentDTO.getCaptchaToken(), clientIp);
		if(!isHuman) {
			log.warn("[HUMANITY TEST] Result: FAILED");
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
		log.info("[HUMANITY TEST] Result: SUCCESS");		

		PaymentResponseDTO response = giftService.processGift(paymentDTO, idempotencyKey);
		
		log.info("[PAYMENT PROCESSED SUCCESSFULLY] Result: the payment was processed without incident. Returning client response | Response to the client {}", LogUtils.mask(objectMapper.writeValueAsString(response)));	
		return ResponseEntity.ok(response);
	}

	@GetMapping("/catalog")
	public ResponseEntity<List<GiftItemDTO>> getGiftsCatalog() {
		MDC.put("process_name", "GIFT_CATALOG_CONSULT");
		log.info("Requisition to gift catalog received");
		List<GiftItemDTO> response = giftService.getGiftCatalog();
		log.info("Returning gift catalog to the client");

		return ResponseEntity.ok(response);
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
		MDC.put("process_name", "PAYMENT_PROCESS_MERCADO_PAGO_WEBHOOK_NOTIFICATION");
		MDC.put("trace_id", externalReference);
		log.info("Mercado Pago notification received | x-Signature: {} | x-Request-Id: {} | Resquest body: {}", xSignature, xRequestId, LogUtils.mask(objectMapper.writeValueAsString(payload)));
		
		giftService.updateGift(xSignature, xRequestId, dataId, externalReference);	
		log.info("Mercado Pago notification was processed successfully");	
		
		return ResponseEntity.ok(null);
	}
}