package com.operationwedding.backend.model.mapper;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.operationwedding.backend.model.dto.PaymentRequestDTO;
import com.operationwedding.backend.model.dto.GiftItemDTO;
import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.entities.GiftItem;
import com.operationwedding.backend.model.entities.GiftItemPurchased;
import com.operationwedding.backend.model.entities.GiftReceived;
import com.operationwedding.backend.model.enums.PaymentStatus;
import com.operationwedding.backend.repositories.GiftsCatalogRepository;

@Component
public class GiftMapper {
	@Autowired
	private GiftsCatalogRepository giftsCatalogRepository;
	
	public GiftReceived toEntity(PaymentRequestDTO dto, PaymentResponseDTO mpResponse) {
		GiftReceived giftReceived = new GiftReceived();
		giftReceived.setExternalReference(mpResponse.getExternalReference());
		giftReceived.setDonorName(dto.getDonorName());
		giftReceived.setDonorMessage(dto.getDonorMessage());
		giftReceived.setGiftAmount(dto.getTransactionAmount());
		giftReceived.setMpPaymentId(mpResponse.getPaymentId());
		giftReceived.setStatus(PaymentStatus.fromMpValue(mpResponse.getStatus()));
		checkGiftItems(dto, giftReceived);
		return giftReceived;
		
	}
	
	private void checkGiftItems(PaymentRequestDTO dto, GiftReceived giftReceived) {
		BigDecimal total = BigDecimal.ZERO;
		for(var itemDTO : dto.getGiftItems()) {
			var itemCatalog = giftsCatalogRepository.findById(itemDTO.getGiftItemId().longValue())
					.orElseThrow(() -> new RuntimeException("Item inválido!"));
			GiftItemPurchased itemPurchased = new GiftItemPurchased();
			itemPurchased.setGiftItem(itemCatalog);
			itemPurchased.setUnitPrice(itemCatalog.getPrice());
			itemPurchased.setQuantity(itemDTO.getQuantity());
			giftReceived.addGiftItem(itemPurchased);
			
			total = total.add(itemCatalog.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity())));
		}
		giftReceived.setGiftAmount(total);
	}
	
	public GiftItemDTO toGiftDTO(GiftItem entity) {
		GiftItemDTO dto = new GiftItemDTO();
		dto.setGiftName(entity.getGiftName());
		dto.setId(entity.getId());
		dto.setImageUrl(entity.getImageUrl());
		dto.setPrice(entity.getPrice());
		
		return dto;
	}
}
