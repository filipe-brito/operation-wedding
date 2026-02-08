package com.operationwedding.backend.services;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.operationwedding.backend.model.dto.PaymentRequestDTO;
import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.entities.GiftReceived;
import com.operationwedding.backend.repositories.GiftsCatalogRepository;
import com.operationwedding.backend.repositories.GiftsReceivedRepository;

import jakarta.transaction.Transactional;
@Service
public class ProcessGiftService {
	@Autowired
	private MercadoPagoService MPService;
	@Autowired
	private GiftsCatalogRepository giftsCatalogRepository;
	@Autowired
	private GiftsReceivedRepository giftReceivedRepository;
	
	private GiftReceived giftReceived = new GiftReceived();
	
	@Transactional
	public ResponseEntity<PaymentResponseDTO> processGift(PaymentRequestDTO dto, String idempotencyKey){
		BigDecimal totalGiftAmount = checkTotalGiftAmount(dto);
		dto.setTransactionAmount(totalGiftAmount);
		ResponseEntity<PaymentResponseDTO> processPayment = MPService.proccessMPPayment(dto, idempotencyKey);
		if(processPayment.getStatusCode().is2xxSuccessful()) {
			String status = processPayment.getBody().getStatus();
			if(status.equals("processed") || status.equals("action_required") || status.equals("processing")) {
				
			};
		}
	}
	
	private BigDecimal checkTotalGiftAmount(PaymentRequestDTO dto) {
		BigDecimal total = BigDecimal.ZERO;
		for(var itemDTO : dto.getGiftItems()) {
			var itemCatalog = giftsCatalogRepository.findById(itemDTO.getGiftItemId().longValue())
					.orElseThrow(() -> new RuntimeException("Item inválido!"));
			total = total.add(itemCatalog.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity())));
		}
		return total;
	}
	
	private void saveGiftToDataBase() {
		
	}
}
