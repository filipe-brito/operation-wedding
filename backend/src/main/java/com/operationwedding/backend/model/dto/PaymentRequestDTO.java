package com.operationwedding.backend.model.dto;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class PaymentRequestDTO {
	@JsonProperty("gift_items")
	@NotNull(message="Selecione ao menos um item para o presente")
	private List<GiftItemDTO> giftItems;
	@JsonProperty("donor_name")
	@NotNull(message="Informe o nome do presenteiro")
	private String donorName;
	@JsonProperty("donor_message")
	@Size(max=500, message="A mensagem deve conter no máximo 500 caracteres")
	private String donorMessage;
	@JsonProperty("transaction_amount")
	@NotNull(message="O valor do presente deve ser informado")
	@DecimalMin(value="10.00", message="O valor do presente deve ser maior que R$10,00")
	private BigDecimal transactionAmount;
	@JsonProperty("payment_method_id")
	private String paymentMethodId;
	private Payer payer;
	private String description;
	@JsonProperty("token")
	private String cardToken;
	private Integer installments;
	
	public List<GiftItemDTO> getGiftItems() {
		return giftItems;
	}

	public void setGiftItems(List<GiftItemDTO> giftItems) {
		this.giftItems = giftItems;
	}

	public String getDonorName() {
		return donorName;
	}

	public void setDonorName(String donorName) {
		this.donorName = donorName;
	}

	public String getDonorMessage() {
		return donorMessage;
	}

	public void setDonorMessage(String donorMessage) {
		this.donorMessage = donorMessage;
	}

	public BigDecimal getTransactionAmount() {
		return transactionAmount;
	}

	public void setTransactionAmount(BigDecimal transactionAmount) {
		this.transactionAmount = transactionAmount;
	}

	public String getPaymentMethodId() {
		return paymentMethodId;
	}

	public void setPaymentMethodId(String paymentMethodId) {
		this.paymentMethodId = paymentMethodId;
	}

	public Payer getPayer() {
		return payer;
	}

	public void setPayer(Payer payer) {
		this.payer = payer;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public static class GiftItemDTO {
		private Long giftItemId;
		private Integer quantity;
		
		public Long getGiftItemId() {
			return giftItemId;
		}
		public void setGiftItemId(Long giftItemId) {
			this.giftItemId = giftItemId;
		}
		public Integer getQuantity() {
			return quantity;
		}
		public void setQuantity(Integer quantity) {
			this.quantity = quantity;
		}
	}
	
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