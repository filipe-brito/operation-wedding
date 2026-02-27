package com.operationwedding.backend.model.payload;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MPFetchPaymentResponse {
	private List<Payment> results;
	
	public List<Payment> getResults() {
		return results;
	}
	public void setResult(List<Payment> result) {
		this.results = result;
	}

	@JsonInclude(JsonInclude.Include.NON_NULL)
	public static class Payment {
		private String status;
		@JsonProperty("date_approved")
		private OffsetDateTime paidAt;
		@JsonProperty("transaction_details")
		private TransactionDetails transactionDetails;
		
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public TransactionDetails getTransactionDetails() {
			return transactionDetails;
		}
		public void setTransactionDetails(TransactionDetails transactionDetails) {
			this.transactionDetails = transactionDetails;
		}

		@JsonInclude(JsonInclude.Include.NON_NULL)
		public static class TransactionDetails {
			@JsonProperty("net_received_amount")
			private BigDecimal netReceivedAmount;
			@JsonProperty("total_paid_amount")
			private BigDecimal amountPaid;
			public BigDecimal getNetReceivedAmount() {
				return netReceivedAmount;
			}
			public void setNetReceivedAmount(BigDecimal netReceivedAmount) {
				this.netReceivedAmount = netReceivedAmount;
			}
			public BigDecimal getAmountPaid() {
				return amountPaid;
			}
			public void setAmountPaid(BigDecimal amountPaid) {
				this.amountPaid = amountPaid;
			}
			
		}
	}
}
