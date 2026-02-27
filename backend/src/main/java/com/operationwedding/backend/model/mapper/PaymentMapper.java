package com.operationwedding.backend.model.mapper;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;

import com.operationwedding.backend.model.dto.PaymentRequestDTO;
import com.operationwedding.backend.model.dto.PaymentResponseDTO;
import com.operationwedding.backend.model.payload.MPOrderRequest;
import com.operationwedding.backend.model.payload.MPOrderRequest.Payer;
import com.operationwedding.backend.model.payload.MPOrderRequest.Transactions;
import com.operationwedding.backend.model.payload.MPOrderRequest.Transactions.Payment;
import com.operationwedding.backend.model.payload.MPOrderRequest.Transactions.Payment.PaymentMethod;

import tools.jackson.databind.JsonNode;

public class PaymentMapper {

	private static final Map<String, String> MESSAGES = new HashMap<>();

	static {
		// ================RETORNOS POR PIX=================
		MESSAGES.put("waiting_transfer", "Aguardando transferência do valor via PIX");
		
		// =========RETORNOS POR CARTÃO DE CRÉDITO==========
		// Processados:
		MESSAGES.put("accredited", "Pronto! Amanda e Filipe agradecem imensamente pelo carinho!");
		MESSAGES.put("in_process", "Aguardando confirmação do pagamento.");
		//Rejeições
		MESSAGES.put("insufficient_amount", "O cartão não possui limite suficiente disponível.");
		MESSAGES.put("bad_filled_card_data", "Informações do cartão de crédito inválidas.");
		MESSAGES.put("rejected_by_issuer", "Pagamento rejeitado pelo banco.");
		MESSAGES.put("required_call_for_authorize", "Transação não autorizada pelo banco.");
		MESSAGES.put("invalid_installments", "Quantidade de parcelas inválidas.");
		MESSAGES.put("processing_error", "Erro no processamento!");
		MESSAGES.put("card_disabled", "Cartão foi desabilitado!");
		MESSAGES.put("invalid_card_token", "Cartão inválido.");
		MESSAGES.put("max_attempts_exceeded", "Máximo de tentativas excedido.");
	}

	public static MPOrderRequest toMPOrderRequest(PaymentRequestDTO dto) {

		PaymentMethod paymentMethod = new PaymentMethod();
		paymentMethod.setId(dto.getPaymentMethodId());
		paymentMethod.setCardToken(dto.getCardToken());
		paymentMethod.setInstallments(dto.getInstallments());
		if (dto.getPaymentMethodId().equals("pix")) {
			paymentMethod.setType("bank_transfer");
		} else {
			paymentMethod.setType("credit_card");
		}

		Payment payment = new Payment();
		payment.setAmount(dto.getTransactionAmount().toString());
		payment.setPaymentMethod(paymentMethod);

		Transactions transaction = new Transactions();
		List<Payment> payments = new ArrayList<>();
		payments.add(payment);
		transaction.setPayments(payments);

		Payer payer = new Payer();
		BeanUtils.copyProperties(dto.getPayer(), payer);

		MPOrderRequest request = new MPOrderRequest();
		request.setTransactions(transaction);
		request.setPayer(payer);

		request.setTotalAmount(payment.getAmount());

		return request;
	}

	public static PaymentResponseDTO toPaymentResponse(JsonNode mpResponse) {
		
		JsonNode root = mpResponse.has("data") ? mpResponse.path("data") : mpResponse;
		
		String externalReference = root.path("external_reference").asString(null);
		
		String status = root.path("transactions").path("payments").get(0).path("status")
				.asString(null);
		String paymentMethodId = root.path("transactions").path("payments").get(0)
				.path("payment_method").path("id").asString(null);
		String paymentMethodType = root.path("transactions").path("payments").get(0)
				.path("payment_method").path("type").asString(null);
		String detail = root.path("transactions").path("payments").get(0)
				.path("status_detail").asString(null);
		String friendlyMessage = MESSAGES.getOrDefault(detail, MESSAGES.get("Ocorreu um erro inesperado."));
		String paymentId = root.path("transactions").path("payments").get(0)
				.path("id").asString(null);
		String qrCodeBase64 = root.path("transactions").path("payments").get(0)
				.path("payment_method").path("qr_code_base64").asString(null);
		String qrCode = root.path("transactions").path("payments").get(0)
				.path("payment_method").path("qr_code").asString(null);
		BigDecimal totalPaidAmount = root.path("total_paid_amount").asDecimal(null);
		
		PaymentResponseDTO dto = new PaymentResponseDTO();
		dto.setExternalReference(externalReference);
		dto.setStatus(status);;
		dto.setPaymentMethodId(paymentMethodId);
		dto.setPaymentMethodType(paymentMethodType);
		dto.setDetail(detail);
		dto.setFriendlyMessage(friendlyMessage);
		dto.setPaymentId(paymentId);
		dto.setQrCodeBase64(qrCodeBase64);
		dto.setQrCode(qrCode);
		dto.setTotalPaidAmount(totalPaidAmount);

		return dto;
	}
}
