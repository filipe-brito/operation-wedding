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

import com.operationwedding.backend.model.dto.GuestDTO;
import com.operationwedding.backend.services.GuestService;
import com.operationwedding.backend.services.TurnstileService;
import com.operationwedding.backend.utils.LogUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
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
	
	@PostMapping("confirm")
	public ResponseEntity<Void> confirmAttendence(HttpServletRequest request, @RequestBody @Valid GuestDTO dto) {
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
