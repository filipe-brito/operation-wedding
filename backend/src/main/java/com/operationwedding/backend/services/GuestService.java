package com.operationwedding.backend.services;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.operationwedding.backend.model.dto.GuestDTO;
import com.operationwedding.backend.model.entities.Guest;
import com.operationwedding.backend.model.enums.GuestStatus;
import com.operationwedding.backend.model.mapper.GuestMapper;
import com.operationwedding.backend.repositories.GuestRespository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class GuestService {
	@Autowired
	private GuestRespository guestRepository;
	
	@Transactional
	public void confirmAttendenceAndCompanions(GuestDTO dto) {
		Guest guest = guestRepository.findByPhone(dto.getPhone()).orElseThrow(() -> new EntityNotFoundException("Convidado não localizado"));
		if(!guest.getStatus().equals(GuestStatus.PENDING)) {
			throw new IllegalStateException("Convidado já respondeu a confirmação.");
		};
		guest.setStatus(dto.getWillAttend() ? GuestStatus.CONFIRMED : GuestStatus.WILL_NOT_ATTEND);
		guest.setConfirmedAt(OffsetDateTime.now());
		
		if(dto.getCompanions() != null && !dto.getCompanions().isEmpty()) {
			List<Guest> companions = GuestMapper.companionsToEntity(guest.getFullName(), dto);
			guestRepository.saveAll(companions);
			guest.setGuestGroup("Família " + guest.getFullName());
		};
		
		guestRepository.save(guest);
	}
}
