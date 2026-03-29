package com.operationwedding.backend.services;

import java.math.BigDecimal;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.operationwedding.backend.client.MercadoPagoClient;
import com.operationwedding.backend.exception.BusinessException;
import com.operationwedding.backend.exception.MPPaymentException;
import com.operationwedding.backend.model.dto.GiftItemDTO;
import com.operationwedding.backend.model.dto.PaymentRequestDTO;
import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.entities.GiftReceived;
import com.operationwedding.backend.model.enums.PaymentStatus;
import com.operationwedding.backend.model.mapper.GiftMapper;
import com.operationwedding.backend.model.mapper.PaymentMapper;
import com.operationwedding.backend.model.payload.MPFetchPaymentResponse;
import com.operationwedding.backend.model.payload.MPOrderRequest;
import com.operationwedding.backend.repositories.GiftsCatalogRepository;
import com.operationwedding.backend.repositories.GiftsReceivedRepository;

import jakarta.transaction.Transactional;

@Service
public class GiftService {
	@Autowired
	private GiftsCatalogRepository giftsCatalogRepository;

	@Autowired
	private GiftsReceivedRepository giftsReceivedRepository;

	@Autowired
	private MercadoPagoClient mpClient;

	@Autowired
	private GiftMapper giftMapper;

	private static final Logger log = LoggerFactory.getLogger(GiftService.class);

	@Transactional
	public PaymentResponseDTO processGift(PaymentRequestDTO dto, String idempotencyKey) {
		MPOrderRequest requestBody = PaymentMapper.toMPOrderRequest(dto);
		try{
			PaymentResponseDTO processPaymentResponse = mpClient.proccessMPPayment(requestBody, idempotencyKey);
			GiftReceived giftReceived = giftMapper.toEntity(dto, processPaymentResponse);
			giftsReceivedRepository.save(giftReceived);
			log.info("[PAYMENT DATA PERSISTENCE COMPLETE]");

			return processPaymentResponse;
		} catch (MPPaymentException e) {
			if(e.getStatusCode().is4xxClientError()){
				String message = PaymentMapper.MESSAGES.getOrDefault(e.getStatusDetail(), "Mercado Pago retornou um erro inesperado ao processar o pagamento.");
				throw new BusinessException(e.getStatusCode().value(), e.getErrorTitle(), message);
			} else {
				throw new BusinessException(e.getStatusCode().value(), e.getErrorTitle(), "Mercado Pago retornou um erro inesperado ao processar o pagamento.");
			}
		} catch (Exception e) {
				log.error("[ERROR ON PAYMENT DATA PERSISTENCE] Description: {} | Message: {} | Error: {}", e.getCause(), e.getMessage(), e);
				throw new BusinessException(500, "Ocorreu um erro inesperado.", "Erro ao persistir os dados do pagamento. Contacte o administrador.");
			}
	}

	@Transactional
	public void updateGift(String xSignature, String xRequestId, String dataId, String externalReference) {
		log.info("Initiating payment verification on Mercado Pago");
		mpClient.mpPaymentValidation(xSignature, xRequestId, dataId);
		MPFetchPaymentResponse mpPayment = mpClient.fetchMPPayment(externalReference).getBody();
		log.info("Searching payment in the database");
		GiftReceived giftReceived = giftsReceivedRepository.findByExternalReference(externalReference).orElse(null);
		if(giftReceived == null){
			log.warn("The Mercado Pago webhook returned a payment that was not found in database | externalReference: {}", externalReference);
			return;
		} else {
			log.info("The payment was found in the databse. Iniciating update");
		}
		BigDecimal amountPaid = null;
		BigDecimal amountReceived = null;
		try{
			Assert.notEmpty(mpPayment.getResults(), "The property \"results\" is empty or null");
			Assert.notNull(mpPayment.getResults().getFirst().getStatus(), "The property \"status\" is null");
			
			PaymentStatus mpStatus = PaymentStatus.fromMpValue(mpPayment.getResults().getFirst().getStatus());
			if(mpStatus == giftReceived.getStatus()){
				log.warn("The Mercado Pago webhook status and the persisted status are the same. Therefore, it will not be updated.");
				return;
			}
			giftReceived.setStatus(mpStatus);

			if (mpPayment.getResults().getFirst().getTransactionDetails() != null) {
				amountPaid = mpPayment.getResults().getFirst().getTransactionDetails().getAmountPaid();
				amountReceived = mpPayment.getResults().getFirst().getTransactionDetails().getNetReceivedAmount();

				giftReceived.setAmountPaid(amountPaid);
				giftReceived.setNetReceivedAmount(amountReceived);
				giftReceived.setFeeAmount(amountPaid.subtract(amountReceived));
				log.info("Payment was updated in the database.");
			} else {
				log.warn("Some information was not returned by Mercado Pago. Therefore, it will not be persisted in the database");
			}
		} catch (IllegalArgumentException e) {
			log.warn("Payload does not match the expected format | Details: {} | Message: {}", e.getCause(), e.getMessage());
			return;
		}	
	}

	public List<GiftItemDTO> getGiftCatalog() {
		try{
			List<GiftItemDTO> dto = giftsCatalogRepository.findAll().stream().map(giftMapper::toGiftDTO).toList();
			return dto;
		} catch (Exception e) {
			log.error("[ERROR ON GIFT CATALOG DATABASE CONSULT] Details: {} | Message: {} | Error: {}", e.getCause(), e.getMessage(), e);
			throw new BusinessException(500, "Erro interno do servidor", "Erro ao consultar catálogo de presentes no banco de dados. Contacte o administrador.");
		}
	}
}
