package com.operationwedding.backend.model.enums;

import java.util.Arrays;
import java.util.List;

public enum PaymentStatus {
	PAID("processed", "approved"), // Aceita ambos
    ACTION_REQUIRED("action_required"),
    REJECTED("failed", "rejected"),
    IN_PROCESS("processing", "in_process"),
    REFUNDED("refunded"),
    CANCELED("canceled", "cancelled");

	private final List<String> mpValues;

	PaymentStatus(String... values) {
		this.mpValues = Arrays.asList(values);
	}

	public static PaymentStatus fromMpValue(String text) {
		return Arrays.stream(PaymentStatus.values()).filter(s -> s.mpValues.contains(text.toLowerCase())).findFirst()
				.orElse(ACTION_REQUIRED);
	}
}
