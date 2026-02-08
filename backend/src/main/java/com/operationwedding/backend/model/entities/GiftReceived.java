package com.operationwedding.backend.model.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.operationwedding.backend.model.enums.PaymentStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="gifts_received", schema="gifts")
public class GiftReceived {
	@Id
	@GeneratedValue(strategy=GenerationType.UUID)
	@Column(name="id", updatable=false)
	private UUID id;
	@Column(name="donor_name")
	@NotNull(message="Nome do presenteiro deve ser informado")
	private String donorName;
	@Column(name="donor_message")
	@Size(max=500, message="A mensagem deve conter no máximo 500 caracteres")
	private String donorMessage;
	@Column(name="amount_paid")
	@NotNull(message="O valor do presente deve ser informado")
	@DecimalMin(value="10.00", message="O valor do presente deve ser maior que R$10,00")
	private BigDecimal giftAmount;
	@Column(name="mp_payment_id")
	private String mpPaymentId;
	@NotNull(message="O status do pagamento deve ser informado")
	@Enumerated(EnumType.STRING)
	private PaymentStatus status;
	@Column(name="created_at", insertable=false, updatable=false)
	private LocalDateTime createdAt;
	@Column(name="paid_at")
	private LocalDateTime paidAt;
	@OneToMany(mappedBy="giftReceived", cascade=CascadeType.ALL, orphanRemoval=true)
	private List<GiftItemPurchased> giftItems = new ArrayList<>();
	
	// Helper to add items in gift and vinculate a gift on item class
	public void addGiftItem(GiftItemPurchased item) {
		giftItems.add(item);
		item.setGiftReceived(this);
	}
	
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
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
	public BigDecimal getGiftAmount() {
		return giftAmount;
	}
	public void setGiftAmount(BigDecimal giftAmount) {
		this.giftAmount = giftAmount;
	}
	public String getMpPaymentId() {
		return mpPaymentId;
	}
	public void setMpPaymentId(String mpPaymentId) {
		this.mpPaymentId = mpPaymentId;
	}
	public PaymentStatus getStatus() {
		return status;
	}
	public void setStatus(PaymentStatus status) {
		this.status = status;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public LocalDateTime getPaidAt() {
		return paidAt;
	}
	public void setPaidAt(LocalDateTime paidAt) {
		this.paidAt = paidAt;
	}
	public List<GiftItemPurchased> getGiftItems() {
		return giftItems;
	}
}
