package com.operationwedding.backend.exception;

import org.springframework.http.HttpStatusCode;

import com.operationwedding.backend.model.payload.MPProcessPaymentResponse;

public class MPPaymentException extends RuntimeException{
	private final HttpStatusCode status;
	private final MPProcessPaymentResponse body;
	
	public MPPaymentException(HttpStatusCode status, MPProcessPaymentResponse body) {
		super("Erro no processamento do Mercado Pago");
		this.status = status;
		this.body = body;
	}

	public HttpStatusCode getStatus() {
		return status;
	}

	public MPProcessPaymentResponse getBody() {
		return body;
	}
}
