package com.operationwedding.backend.model.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;

import com.operationwedding.backend.model.dto.PaymentDTO;
import com.operationwedding.backend.model.payload.MPOrderRequest;
import com.operationwedding.backend.model.payload.MPOrderRequest.Payer;
import com.operationwedding.backend.model.payload.MPOrderRequest.Transactions;
import com.operationwedding.backend.model.payload.MPOrderRequest.Transactions.Payment;
import com.operationwedding.backend.model.payload.MPOrderRequest.Transactions.Payment.PaymentMethod;

public class PaymentMapper {

	public static MPOrderRequest toMPOrderRequest(PaymentDTO dto) {
		
		PaymentMethod paymentMethod = new PaymentMethod();
		paymentMethod.setId(dto.getPaymentMethodId());
		paymentMethod.setCardToken(dto.getCardToken());
		paymentMethod.setInstallments(dto.getInstallments());
		if(dto.getPaymentMethodId().equals("pix")) {
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
	
}
