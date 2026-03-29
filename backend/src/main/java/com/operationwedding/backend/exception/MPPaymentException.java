package com.operationwedding.backend.exception;

import java.util.List;

import org.springframework.http.HttpStatusCode;

public class MPPaymentException extends RuntimeException{
	private static final long serialVersionUID = 1L;
	private HttpStatusCode statusCode;
	private String errorTitle = "Erro na integração com o Mercado Pago";
	private String statusDetail;
	private List<Error> errors;
	
	public MPPaymentException(HttpStatusCode statusCode, String statusDetail, String message, List<Error> errors) {
		super(message);
		this.statusCode = statusCode;
		this.statusDetail = statusDetail;
		this.errors = errors;
	}

	public HttpStatusCode getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(HttpStatusCode statusCode) {
		this.statusCode = statusCode;
	}
	public String getStatusDetail() {
		return statusDetail;
	}
	public void setStatusDetail(String statusDetail) {
		this.statusDetail = statusDetail;
	}
	public String getErrorTitle() {
		return errorTitle;
	}
	public List<Error> getErrors() {
		return errors;
	}
	public void setErrors(List<Error> errors) {
		this.errors = errors;
	}

	public static class Error {
		private String code;
		private String message;
		private String details;

		public String getCode() {
			return code;
		}
		public void setCode(String code) {
			this.code = code;
		}
		public String getMessage() {
			return message;
		}
		public void setMessage(String message) {
			this.message = message;
		}
		public String getDetails() {
			return details;
		}
		public void setDetails(String details) {
			this.details = details;
		}
	}
}
