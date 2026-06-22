package com.operationwedding.backend.model.mapper;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import com.operationwedding.backend.model.dto.RsvpDto;
import com.operationwedding.backend.model.entities.Guest;
import com.operationwedding.backend.model.enums.GuestStatus;

public class GuestMapper {
	public static List<Guest> companionsToEntity(String mainGuestName, RsvpDto dto) {

		List<Guest> guestCompanions = new ArrayList<>();

		if (dto.getCompanions().isEmpty()) {
			throw new IllegalArgumentException("A lista de acompanhantes está vazia");
		}
		
		dto.getCompanions().forEach(companion -> {
			Guest guest = new Guest();
			guest.setFullName(companion.getFullName());
			guest.setStatus(GuestStatus.CONFIRMED);
			guest.setGuestType("COMPANION");
			guest.setDob(companion.getDob());
			guest.setConfirmedAt(OffsetDateTime.now());

			guestCompanions.add(guest);
		});

		return guestCompanions;
	}
}
