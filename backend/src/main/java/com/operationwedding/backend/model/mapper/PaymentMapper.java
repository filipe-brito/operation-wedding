package com.operationwedding.backend.model.mapper;

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
import com.operationwedding.backend.model.payload.MPProcessPaymentResponse;

public class PaymentMapper {

	public static final Map<String, String> MESSAGES = new HashMap<>();

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
		request.setExternalReference(dto.getExternalReference());
		request.setTransactions(transaction);
		request.setPayer(payer);

		request.setTotalAmount(payment.getAmount());

		return request;
	}

	public static PaymentResponseDTO toPaymentResponse(MPProcessPaymentResponse mpResponse) {
		
		PaymentResponseDTO dto = new PaymentResponseDTO();
		dto.setExternalReference(mpResponse.getExternalReference());
		if(
			mpResponse.getTransactions() != null && 
			mpResponse.getTransactions().getPayments() != null && 
			!mpResponse.getTransactions().getPayments().isEmpty()
			) {
			dto.setStatus(mpResponse.getTransactions().getPayments().get(0).getStatus());
			dto.setPaymentMethodId(mpResponse.getTransactions().getPayments().get(0).getPaymentMethod().getId());
			dto.setPaymentMethodType(mpResponse.getTransactions().getPayments().get(0).getPaymentMethod().getType());
			String detail = mpResponse.getTransactions().getPayments().get(0).getStatusDetail();
			dto.setDetail(detail);
			dto.setFriendlyMessage(MESSAGES.getOrDefault(detail, "Ocorreu um erro inesperado."));
			dto.setPaymentId(mpResponse.getTransactions().getPayments().get(0).getId());
			dto.setQrCodeBase64(mpResponse.getTransactions().getPayments().get(0).getPaymentMethod().getQrCodeBase64());
			dto.setQrCode(mpResponse.getTransactions().getPayments().get(0).getPaymentMethod().getQrCode());
			dto.setTotalPaidAmount(mpResponse.getTotalPaidAmount());
		}
		
		return dto;
	}
}
