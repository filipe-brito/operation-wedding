package com.operationwedding.backend.services;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.operationwedding.backend.exception.BusinessException;
import com.operationwedding.backend.model.dto.RsvpDto;
import com.operationwedding.backend.model.entities.Guest;
import com.operationwedding.backend.model.enums.GuestStatus;
import com.operationwedding.backend.repositories.GuestRespository;
import com.operationwedding.backend.model.dto.GuestGroupResponseDto;
import com.operationwedding.backend.utils.LogUtils;

import jakarta.transaction.Transactional;

@Service
public class GuestService {
	@Autowired
	private GuestRespository guestRepository;

	private static final Logger log = LoggerFactory.getLogger(GuestService.class);

	@Transactional
	public Void cancelInvitation(String phone, String inviteCode) {
		log.info("Checking if the guest is on the list.");
		Guest guest = guestRepository.findByPhoneAndInviteCodeAndGuestType(phone, inviteCode, "GUEST").orElseThrow(() -> 
		{
			log.warn("Guest was not found or invite code is invalid. | Number sent: {} Invite code sent: {}", LogUtils.mask(phone), inviteCode);
			throw new BusinessException(
				404, 
				"Recurso não encontrado", 
				"Ops! O convidado não foi encontrado ou o código de convite é inválido. Por gentileza, entre em contato com os noivos ou tente novamente."
			);
		});
		
		if(!guest.getStatus().equals(GuestStatus.PENDING)) {
			log.warn("Guest has already answered the confirmation. | Number sent: {}", guest.getPhone(), "Invite code sent: {}", inviteCode);
			throw new BusinessException(409, "Conflict", "Convidado já respondeu a confirmação.");
		};

		log.warn("Guest indicated that will not attend. So, we will update the status of all companions to WILL_NOT_ATTENDING");
		guestRepository.updateStatusByGroupAndType(GuestStatus.WILL_NOT_ATTEND, guest.getGuestGroup(), "COMPANION");
		guest.setStatus(GuestStatus.WILL_NOT_ATTEND);
		log.info("Guest attendance persisted.");
		return null;
	};

	@Transactional
	public GuestGroupResponseDto fetchGuestAndCompanions(String phone, String inviteCode) {
		log.info("Checking if the guest is on the list.");
		Guest guest = guestRepository.findByPhoneAndInviteCodeAndGuestType(phone, inviteCode, "GUEST").orElseThrow(() -> 
		{
			log.warn("Guest was not found or invite code is invalid. | Number sent: {} Invite code sent: {}", LogUtils.mask(phone), inviteCode);
			throw new BusinessException(
				404, 
				"Recurso não encontrado", 
				"Ops! O convidado não foi encontrado ou o código de convite é inválido. Por gentileza, entre em contato com os noivos ou tente novamente."
			);
		});
		if(!guest.getStatus().equals(GuestStatus.PENDING)) {
			log.warn("Guest has already answered the confirmation. | Number sent: {}", guest.getPhone(), "Invite code sent: {}", inviteCode);
			throw new BusinessException(409, "Conflict", "Convidado já respondeu a confirmação.");
		};
		List<Guest> companions = guestRepository.findByGuestGroupAndGuestType(guest.getGuestGroup(), "COMPANION");
		GuestGroupResponseDto response = new GuestGroupResponseDto();
		response.setGuestId(guest.getId());
		response.setGuestName(guest.getFullName());
	
		List<GuestGroupResponseDto.Companion> companionsDto = companions.stream().map(entityCompanion -> {
		GuestGroupResponseDto.Companion companion = new GuestGroupResponseDto.Companion();
		companion.setCompanionId(entityCompanion.getId());
		companion.setCompanionName(entityCompanion.getFullName());
		return companion;
	}).toList();
		
		response.setCompanions(companionsDto);
		return response;
	}
	
	@Transactional
	public void confirmAttendenceAndCompanions(RsvpDto dto) {
		log.info("Checking if the guest is on the list.");
		Guest guest = guestRepository.findByPhoneAndInviteCodeAndGuestType(dto.getPhone(), dto.getInviteCode(), "GUEST").orElseThrow(() -> 
		{
			log.warn("Guest was not found or invite code is invalid. | Number sent: {} Invite code sent: {}", dto.getPhone(), dto.getInviteCode());
			throw new BusinessException(
				404, 
				"Recurso não encontrado", 
				"Ops! O convidado não foi encontrado ou o código de convite é inválido. Por gentileza, entre em contato com os noivos ou tente novamente."
			);
	});
		if(!guest.getStatus().equals(GuestStatus.PENDING)) {
			log.warn("Guest has already answered the confirmation. | Number sent: {}", dto.getPhone(), "Invite code sent: {}", dto.getInviteCode());
			throw new BusinessException(409, "Conflict", "Convidado já respondeu a confirmação.");
		};
		guest.setStatus(dto.getWillAttend() ? GuestStatus.CONFIRMED : GuestStatus.WILL_NOT_ATTEND);
		guest.setDob(dto.getDob());
		guest.setConfirmedAt(OffsetDateTime.now());
		
		if(dto.getCompanions() != null && !dto.getCompanions().isEmpty()) {
			// Fetch the real companions from the database (unique fetch)
			List<Guest> companions = guestRepository.findByGuestGroupAndGuestType(guest.getGuestGroup(), "COMPANION");

			// Transform the database list into a Map for quick lookup
			Map<Long, Guest> companionMap = companions.stream()
				.collect(Collectors.toMap(Guest::getId, c -> c));

			// Loop into the companion DTOs
			dto.getCompanions().forEach(companionDto -> {
				
				// Unique fetch into the map. Does not loop the list. 
				Guest companion = companionMap.get(companionDto.getId());

				// If the companion was not found on the map, throw an exception
				if (companion == null) {
					log.warn("Companion was not found on the group {}. | Companion ID: {}", guest.getGuestGroup(), companionDto.getId());
					throw new BusinessException(
						404, 
						"Acompanhante não encontrado", 
						"Lista de acompanhantes inválida. Por gentileza, entre em contato com os noivos ou tente novamente."
					);
				}

				// Update the status in memory with security
				companion.setStatus(companionDto.getWillAttend() ? GuestStatus.CONFIRMED : GuestStatus.WILL_NOT_ATTEND);
				companion.setDob(companionDto.getDob());
			});
		}
		log.info("Guest attendance persisted.");
	}
}