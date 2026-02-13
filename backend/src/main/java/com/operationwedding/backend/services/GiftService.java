package com.operationwedding.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.operationwedding.backend.model.dto.GiftItemDTO;
import com.operationwedding.backend.model.dto.PaymentRequestDTO;
import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.entities.GiftReceived;
import com.operationwedding.backend.model.mapper.GiftMapper;
import com.operationwedding.backend.repositories.GiftsCatalogRepository;
import com.operationwedding.backend.repositories.GiftsReceivedRepository;

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
	private GiftMapper giftMapper;
	
	@Transactional
	public ResponseEntity<PaymentResponseDTO> processGift(PaymentRequestDTO dto, String idempotencyKey){
		ResponseEntity<PaymentResponseDTO> processPayment = MPService.proccessMPPayment(dto, idempotencyKey);
		if(processPayment.getStatusCode().is2xxSuccessful()) {
			String status = processPayment.getBody().getStatus();
			if(status.equals("processed") || status.equals("action_required") || status.equals("processing")) {
				GiftReceived giftReceived = giftMapper.toEntity(dto, processPayment.getBody());
				giftsReceivedRepository.save(giftReceived);
			};
		}
		return processPayment;
	}
	
	public ResponseEntity<List<GiftItemDTO>> getGiftCatalog() {
		List<GiftItemDTO> dto = giftsCatalogRepository.findAll().stream().map(giftMapper::toGiftDTO).toList();
		return ResponseEntity.ok(dto);
		
	}
}
