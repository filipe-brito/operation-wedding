package com.operationwedding.backend.model.payload;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MPProcessPaymentResponse {
	@JsonProperty("external_reference")
	private String externalReference;
	@JsonProperty("total_paid_amount")
	private BigDecimal totalPaidAmount;
	private Transactions transactions; 
	
	public String getExternalReference() {
		return externalReference;
	}
	public void setExternalReference(String externalReference) {
		this.externalReference = externalReference;
	}
	public BigDecimal getTotalPaidAmount() {
		return totalPaidAmount;
	}
	public void setTotalPaidAmount(BigDecimal totalPaidAmount) {
		this.totalPaidAmount = totalPaidAmount;
	}
	public Transactions getTransactions() {
		return transactions;
	}
	public void setTransactions(Transactions transactions) {
		this.transactions = transactions;
	}


	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Transactions {
		private List<Payment> payments;

		@JsonCreator
		public Transactions(@JsonProperty(required=true) List<Payment> payments) {
			this.payments = payments;
		}

		public List<Payment> getPayments() {
			return payments;
		}

		public void setPayments(List<Payment> payments) {
			this.payments = payments;
		}

		@JsonIgnoreProperties(ignoreUnknown = true)
		public static class Payment {
			private String id;
			private String status;
			@JsonProperty("status_detail")
			private String statusDetail;
			@JsonProperty("payment_method")
			private PaymentMethod paymentMethod; 
			
			@JsonCreator
			public Payment(
				@JsonProperty(required=true) String id, 
				@JsonProperty(required=true) String status, 
				@JsonProperty(required=true) String statusDetail, 
				@JsonProperty(required=true) PaymentMethod paymentMethod
			) {
				this.id = id;
				this.status = status;
				this.statusDetail = statusDetail;
				this.paymentMethod = paymentMethod;
			}

			public String getId() {
				return id;
			}
			public void setId(String id) {
				this.id = id;
			}
			public String getStatus() {
				return status;
			}
			public void setStatus(String status) {
				this.status = status;
			}
			public String getStatusDetail() {
				return statusDetail;
			}
			public void setStatusDetail(String statusDetail) {
				this.statusDetail = statusDetail;
			}
			public PaymentMethod getPaymentMethod() {
				return paymentMethod;
			}
			public void setPaymentMethod(PaymentMethod paymentMethod) {
				this.paymentMethod = paymentMethod;
			}
			
			@JsonIgnoreProperties(ignoreUnknown = true)
			public static class PaymentMethod {
				private String id;
				private String type;
				@JsonProperty("qr_code")
				private String qrCode;
				@JsonProperty("qr_code_base64")
				private String qrCodeBase64;
				
				public String getId() {
					return id;
				}
				public void setId(String id) {
					this.id = id;
				}
				public String getType() {
					return type;
				}
				public void setType(String type) {
					this.type = type;
				}
				public String getQrCode() {
					return qrCode;
				}
				public void setQrCode(String qrCode) {
					this.qrCode = qrCode;
				}
				public String getQrCodeBase64() {
					return qrCodeBase64;
				}
				public void setQrCodeBase64(String qrCodeBase64) {
					this.qrCodeBase64 = qrCodeBase64;
				}
			}
		}
	}
}
