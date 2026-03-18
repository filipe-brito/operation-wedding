package com.operationwedding.backend.exception;

import org.springframework.http.HttpStatusCode;

import com.operationwedding.backend.model.payload.MPProcessPaymentResponse;

public class MPPaymentException extends RuntimeException{
	private static final long serialVersionUID = 1L;
	private HttpStatusCode status;
	private MPProcessPaymentResponse body;
	
	public MPPaymentException(HttpStatusCode status, MPProcessPaymentResponse body) {
		super("Erro no processamento do Mercado Pago");
		this.status = status;
		this.body = body;
		System.out.println("Body recebido no MPexception\n: " + body);
	}

	public HttpStatusCode getStatus() {
		return status;
	}

	public MPProcessPaymentResponse getBody() {
		return body;
	}
}
