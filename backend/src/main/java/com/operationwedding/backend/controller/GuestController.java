package com.operationwedding.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.operationwedding.backend.model.dto.GuestGroupResponseDto;
import com.operationwedding.backend.model.dto.RsvpDto;
import com.operationwedding.backend.services.GuestService;
import com.operationwedding.backend.services.TurnstileService;
import com.operationwedding.backend.utils.LogUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/guests")
@Validated
public class GuestController {
	@Autowired
	GuestService guestService;

	@Autowired
	TurnstileService tService;
	@Autowired
	private ObjectMapper objectMapper; 

	private static final Logger log = LoggerFactory.getLogger(GuestController.class);

	private record RsvpFetchGuest(
		@JsonProperty("captcha_token") @NotBlank(message="O token do captcha é obrigatório") String captchaToken,
		@NotBlank(message="Telefone é obrigatório") 
		@Pattern(regexp = "^[1-9]{11}$", message = "O telefone deve conter 11 dígitos") String phone,
		@JsonProperty("invite_code") @NotBlank(message="Código do convite é obrigatório") String inviteCode,
		@JsonProperty("will_attend") @NotNull(message="A informação sobre a presença é obrigatória") Boolean willAttend
	){}

	@PostMapping("fetch")
	public ResponseEntity<GuestGroupResponseDto> fetchGuestAndCompanions(HttpServletRequest request, @RequestBody @Valid RsvpFetchGuest dto) {
		MDC.put("process_name", "RSVP_fetch_guest");

		log.info("A guest iniciated a search on the guest list. | Payload sent: {}", LogUtils.mask(objectMapper.writeValueAsString(dto)));
		String clientIp = request.getRemoteAddr();
		
		if(dto.willAttend == false) {
			log.warn("Guest indicated that will not attend. So, we will update the status of all companions to NOT_ATTENDING");
			boolean isHuman = tService.isHuman(dto.captchaToken(), clientIp);
			if(!isHuman) {
				log.warn("[HUMANITY TEST] Result: FAILED");
				return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
			}
			log.info("[HUMANITY TEST] Result: SUCCESS");
			guestService.cancelInvitation(dto.phone(), dto.inviteCode());
			return ResponseEntity.noContent().build();
		}
	
		return ResponseEntity.ok(guestService.fetchGuestAndCompanions(dto.phone(), dto.inviteCode()));
	}
	
	@PostMapping("confirm")
	public ResponseEntity<Void> confirmAttendence(HttpServletRequest request, @RequestBody @Valid RsvpDto dto) {
		MDC.put("process_name", "RSVP");
		String clientIp = request.getRemoteAddr();
		
		log.info("A guest is trying to confirm their attendance at the wedding. | Payload sent: {}", LogUtils.mask(objectMapper.writeValueAsString(dto)));
		boolean isHuman = tService.isHuman(dto.getCaptchaToken(), clientIp);
		if(!isHuman) {
			log.warn("[HUMANITY TEST] Result: FAILED");
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
		log.info("[HUMANITY TEST] Result: SUCCESS");
		guestService.confirmAttendenceAndCompanions(dto);
		return ResponseEntity.noContent().build();
	}
}
