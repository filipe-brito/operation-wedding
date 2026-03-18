package com.operationwedding.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.operationwedding.backend.model.dto.GuestDTO;
import com.operationwedding.backend.services.GuestService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/guests")
@Validated
public class GuestController {
	@Autowired
	GuestService guestService;
	
	@PostMapping("confirm")
	public ResponseEntity<Void> confirmAttendence(@RequestBody @Valid GuestDTO dto) {
		guestService.confirmAttendenceAndCompanions(dto);
		return ResponseEntity.noContent().build();
	}
}
