package com.operationwedding.backend.model.payload;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MPOrderRequest {
	private String type = "online";
	@JsonProperty("external_reference")
	private String externalReference = "REF_" + UUID.randomUUID().toString().replace("-", "_"); // Será usado como referência no banco de dados futuramente
	private Transactions transactions;
	private Payer payer;
	@JsonProperty("total_amount")
	private String totalAmount;
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getExternalReference() {
		return externalReference;
	}
	public void setExternalReference(String externalReference) {
		this.externalReference = externalReference;
	}
	public Transactions getTransactions() {
		return transactions;
	}
	public void setTransactions(Transactions transactions) {
		this.transactions = transactions;
	}
	public Payer getPayer() {
		return payer;
	}
	public void setPayer(Payer payer) {
		this.payer = payer;
	}
	public String getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}

	@JsonInclude(JsonInclude.Include.NON_NULL)
	public static class Transactions {

		private List<Payment> payments;
		
		public List<Payment> getPayments() {
			return payments;
		}
		public void setPayments(List<Payment> payments) {
			this.payments = payments;
		}

		@JsonInclude(JsonInclude.Include.NON_NULL)
		public static class Payment {
			private String amount;
			@JsonProperty("payment_method")
			private PaymentMethod paymentMethod;
			
			public String getAmount() {
				return amount;
			}
			public void setAmount(String amount) {
				this.amount = amount;
			}
			public PaymentMethod getPaymentMethod() {
				return paymentMethod;
			}
			public void setPaymentMethod(PaymentMethod paymentMethod) {
				this.paymentMethod = paymentMethod;
			}


			@JsonInclude(JsonInclude.Include.NON_NULL)
			public static class PaymentMethod{
				private String id;
				@JsonInclude(JsonInclude.Include.NON_NULL)
				private String type;
				@JsonProperty("token")
				private String cardToken;
				private Integer installments;
				@JsonProperty("statement_descriptor")
				private String statementDescriptor = "Casam. Amanda e Filipe";
				
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
				public String getCardToken() {
					return cardToken;
				}
				public void setCardToken(String cardToken) {
					this.cardToken = cardToken;
				}
				public Integer getInstallments() {
					return installments;
				}
				public void setInstallments(Integer installments) {
					this.installments = installments;
				}
				public String getStatementDescriptor() {
					return statementDescriptor;
				}
				public void setStatementDescriptor(String statementDescriptor) {
					this.statementDescriptor = statementDescriptor;
				}
				
			}
		}
	}
	
	@JsonInclude(JsonInclude.Include.NON_NULL)
	public static class Payer {
		private String email;
		private Identification identification;
		
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public Identification getIdentification() {
			return identification;
		}
		public void setIdentification(Identification identification) {
			this.identification = identification;
		}
		@JsonInclude(JsonInclude.Include.NON_NULL)
		public static class Identification {
			private String type;
			private String number;
			
			public String getType() {
				return type;
			}
			public void setType(String type) {
				this.type = type;
			}
			public String getNumber() {
				return number;
			}
			public void setNumber(String number) {
				this.number = number;
			}
		}
	}
}
