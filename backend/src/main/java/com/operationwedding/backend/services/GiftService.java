package com.operationwedding.backend.services;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.operationwedding.backend.model.dto.GiftItemDTO;
import com.operationwedding.backend.model.dto.PaymentRequestDTO;
import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.entities.GiftReceived;
import com.operationwedding.backend.model.enums.PaymentStatus;
import com.operationwedding.backend.model.mapper.GiftMapper;
import com.operationwedding.backend.model.mapper.PaymentMapper;
import com.operationwedding.backend.model.payload.MPFetchPaymentResponse;
import com.operationwedding.backend.model.payload.MPOrderRequest;
import com.operationwedding.backend.model.payload.MPProcessPaymentResponse;
import com.operationwedding.backend.repositories.GiftsCatalogRepository;
import com.operationwedding.backend.repositories.GiftsReceivedRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
@Service
public class GiftService {
	@Autowired
	private MercadoPagoService MPService;
	
	@Autowired
	private GiftsCatalogRepository giftsCatalogRepository;
	
	@Autowired
	private GiftsReceivedRepository giftsReceivedRepository;
	
	@Autowired
	private MercadoPagoService mpService;
	
	@Autowired
	private GiftMapper giftMapper;
	
	@Transactional
	public ResponseEntity<PaymentResponseDTO> processGift(PaymentRequestDTO dto, String idempotencyKey){
		MPOrderRequest requestBody = PaymentMapper.toMPOrderRequest(dto);
		ResponseEntity<MPProcessPaymentResponse> processPaymentResponse = MPService.proccessMPPayment(requestBody, idempotencyKey);
		
		String status = processPaymentResponse.getBody().getTransactions().getPayments().get(0).getStatus();
		if(status.equals("processed") || status.equals("action_required") || status.equals("processing")) {
			GiftReceived giftReceived = giftMapper.toEntity(dto, processPaymentResponse.getBody());
			giftsReceivedRepository.save(giftReceived);
		}
		
		PaymentResponseDTO responseDto = PaymentMapper
				.toPaymentResponse(processPaymentResponse.getBody());
		
		return ResponseEntity.status(processPaymentResponse.getStatusCode()).body(responseDto);
	}
	
	private GiftReceived fetchGift(String externalReference) {
	    return giftsReceivedRepository.findByExternalReference(externalReference)
	        .orElseThrow(() -> new EntityNotFoundException("Presente não encontrado na banco de dados"));
	}
	
	@Transactional
	public void updateGift(String xSignature, String xRequestId, String dataId, String externalReference) {
		mpService.MPPaymentValidation(xSignature, xRequestId, dataId);
		MPFetchPaymentResponse mpPayment = mpService.fetchMPPayment(externalReference).getBody();
		GiftReceived giftReceived = fetchGift(externalReference);
		BigDecimal amountPaid = null;
		BigDecimal amountReceived = null;
		if(mpPayment.getResults() != null && !mpPayment.getResults().isEmpty()) {
			giftReceived.setStatus(PaymentStatus.fromMpValue(mpPayment.getResults().get(0).getStatus()));
			
			if(mpPayment.getResults().get(0).getTransactionDetails() != null) {
				amountPaid = mpPayment.getResults().get(0).getTransactionDetails().getAmountPaid();
				amountReceived = mpPayment.getResults().get(0).getTransactionDetails().getNetReceivedAmount();
				
				giftReceived.setAmountPaid(amountPaid);
				giftReceived.setNetReceivedAmount(amountReceived);
				giftReceived.setFeeAmount(amountPaid.subtract(amountReceived));
			}
		}
	}
	
	public ResponseEntity<List<GiftItemDTO>> getGiftCatalog() {
		List<GiftItemDTO> dto = giftsCatalogRepository.findAll().stream().map(giftMapper::toGiftDTO).toList();
		return ResponseEntity.ok(dto);
		
	}
}
