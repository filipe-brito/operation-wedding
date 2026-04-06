package com.operationwedding.backend.services;

import java.time.OffsetDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.operationwedding.backend.exception.BusinessException;
import com.operationwedding.backend.model.dto.GuestDTO;
import com.operationwedding.backend.model.entities.Guest;
import com.operationwedding.backend.model.enums.GuestStatus;
import com.operationwedding.backend.model.mapper.GuestMapper;
import com.operationwedding.backend.repositories.GuestRespository;

import jakarta.transaction.Transactional;

@Service
public class GuestService {
	@Autowired
	private GuestRespository guestRepository;

	private static final Logger log = LoggerFactory.getLogger(GuestService.class);
	
	@Transactional
	public void confirmAttendenceAndCompanions(GuestDTO dto) {
		log.info("Checking if the guest is on the list.");
		Guest guest = guestRepository.findByPhone(dto.getPhone()).orElseThrow(() -> 
		{
			log.warn("Guest is not on the list. | Number sent: {}", dto.getPhone());
			throw new BusinessException(
				404, 
				"Recurso não encontrado", 
				"Ops! O convidado não foi encontrado. Por gentileza, entre em contato com os noivos."
			);
	});
		if(!guest.getStatus().equals(GuestStatus.PENDING)) {
			log.warn("Guest has already answered the confirmation. | Number sent: {}", dto.getPhone());
			throw new BusinessException(409, "Conflict", "Convidado já respondeu a confirmação.");
		};
		guest.setStatus(dto.getWillAttend() ? GuestStatus.CONFIRMED : GuestStatus.WILL_NOT_ATTEND);
		guest.setConfirmedAt(OffsetDateTime.now());
		
		if(dto.getCompanions() != null && !dto.getCompanions().isEmpty()) {
			List<Guest> companions = GuestMapper.companionsToEntity(guest.getFullName(), dto);
			guestRepository.saveAll(companions);
			guest.setGuestGroup("Família " + guest.getFullName());
		};
		log.info("Guest attendance persisted.");
	}
}
