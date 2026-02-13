package com.operationwedding.backend.model.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GiftItemDTO {
		private Long id;
		@JsonProperty("gift_name")
		private String giftName;
		private BigDecimal price;
		@JsonProperty("image_url")
		private String imageUrl;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getGiftName() {
			return giftName;
		}

		public void setGiftName(String giftName) {
			this.giftName = giftName;
		}

		public BigDecimal getPrice() {
			return price;
		}

		public void setPrice(BigDecimal price) {
			this.price = price;
		}

		public String getImageUrl() {
			return imageUrl;
		}

		public void setImageUrl(String imageUrl) {
			this.imageUrl = imageUrl;
		}
}
