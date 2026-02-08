package com.operationwedding.backend.model.mapper;

import org.springframework.stereotype.Component;

import com.operationwedding.backend.model.dto.PaymentRequestDTO;
import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.entities.GiftReceived;
import com.operationwedding.backend.model.enums.PaymentStatus;

@Component
public class GiftMapper {
	public static GiftReceived toEntity(PaymentRequestDTO dto, PaymentResponseDTO mpResponse) {
		GiftReceived giftReceived = new GiftReceived();
		giftReceived.setDonorName(dto.getDonorName());
		giftReceived.setDonorMessage(dto.getDonorMessage());
		giftReceived.setGiftAmount(dto.getTransactionAmount());
		giftReceived.setMpPaymentId(mpResponse.getPaymentId());
		giftReceived.setStatus(PaymentStatus.fromMpValue(mpResponse.getStatus()));
		
	}
}
