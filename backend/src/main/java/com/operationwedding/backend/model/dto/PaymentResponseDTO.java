package com.operationwedding.backend.model.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
/**
 * DTO that represents the payment response to be returned to the frontend
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PaymentResponseDTO {
	@JsonProperty("external_reference")
	private String externalReference;
	private String status; // approved, rejected, pending
	@JsonProperty("payment_method_id")
	private String paymentMethodId;
	@JsonProperty("payment_method_type")
	private String paymentMethodType;
	private String detail; // O código original (insufficient_amount)
	@JsonProperty("friendly_message")
	private String friendlyMessage; // A tradução amigável
	@JsonProperty("payment_id")
	private String paymentId; // Id do pagamento para o Brick de status
	@JsonProperty("qr_code_base_64")
	private String qrCodeBase64; // Se for PIX
	@JsonProperty("qr_code")
	private String qrCode; // Se for PIX (texto do copia e cola)
	@JsonProperty("total_paid_amount")
	private BigDecimal totalPaidAmount;

	public String getExternalReference() {
		return externalReference;
	}

	public void setExternalReference(String externalReference) {
		this.externalReference = externalReference;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPaymentMethodId() {
		return paymentMethodId;
	}

	public void setPaymentMethodId(String paymentMethodId) {
		this.paymentMethodId = paymentMethodId;
	}
	
	public String getPaymentMethodType() {
		return paymentMethodType;
	}

	public void setPaymentMethodType(String paymentMethodType) {
		this.paymentMethodType = paymentMethodType;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public String getFriendlyMessage() {
		return friendlyMessage;
	}

	public void setFriendlyMessage(String friendlyMessage) {
		this.friendlyMessage = friendlyMessage;
	}

	public String getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}

	public String getQrCodeBase64() {
		return qrCodeBase64;
	}

	public void setQrCodeBase64(String qrCodeBase64) {
		this.qrCodeBase64 = qrCodeBase64;
	}

	public String getQrCode() {
		return qrCode;
	}

	public void setQrCode(String qrCode) {
		this.qrCode = qrCode;
	}

	public BigDecimal getTotalPaidAmount() {
		return totalPaidAmount;
	}

	public void setTotalPaidAmount(BigDecimal totalPaidAmount) {
		this.totalPaidAmount = totalPaidAmount;
	}

}
