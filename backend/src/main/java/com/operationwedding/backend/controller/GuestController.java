package com.operationwedding.backend.controller;

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

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/guests")
@Validated
public class GuestController {
	@Autowired
	GuestService guestService;

	@Autowired
	TurnstileService tService;
	
	@PostMapping("confirm")
	public ResponseEntity<Void> confirmAttendence(HttpServletRequest request, @RequestBody @Valid GuestDTO dto) {
		String clientIp = request.getRemoteAddr();
		System.out.println("IP que será enviado ao CAPTCHA do Cloudflare: " + clientIp);
		boolean isHuman = tService.isHuman(dto.getCaptchaToken(), clientIp);
		if(!isHuman) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
		guestService.confirmAttendenceAndCompanions(dto);
		return ResponseEntity.noContent().build();
	}
}
