package com.operationwedding.backend.model.entities;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="gifts_items_purchased", schema="gifts")
public class GiftItemPurchased {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@JoinColumn(name="gifts_received_id")
	@ManyToOne(fetch=FetchType.LAZY)
	@NotNull(message="O item deve estar vinculado a um presente pré-existente")
	private GiftReceived giftReceived;
	@JoinColumn(name="gift_id")
	@ManyToOne(fetch=FetchType.LAZY)
	@NotNull(message="Selecione pelo menos um item do catálogo de presentes")
	private GiftItem giftItem;
	@Column(name="unit_price")
	private BigDecimal unitPrice; // Should be defined by a service or mapper
	private Integer quantity;
	@Column(name="total_amount")
	private BigDecimal totalAmount;
	
	@PrePersist // Always calculate before persisting
	@PreUpdate // Always calculate before persisting
	public void updateTotalAmount() {
		if (unitPrice != null && quantity != null) {
			totalAmount = unitPrice.multiply(BigDecimal.valueOf(quantity));
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public GiftReceived getGiftReceived() {
		return giftReceived;
	}

	public void setGiftReceived(GiftReceived giftReceived) {
		this.giftReceived = giftReceived;
	}

	public GiftItem getGiftItem() {
		return giftItem;
	}

	public void setGiftItem(GiftItem giftItem) {
		this.giftItem = giftItem;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}
}
