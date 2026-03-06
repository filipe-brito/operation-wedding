package com.operationwedding.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.operationwedding.backend.model.dto.GuestDTO;
import com.operationwedding.backend.services.GuestService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@RestController
@RequestMapping("/api/guests")
@Validated
public class GuestController {
	@Autowired
	GuestService guestService;
	
	@GetMapping("confirm")
	public ResponseEntity<GuestDTO> fetchGuest(
			@RequestParam("phone") 
			@NotBlank(message="O parâmetro \"phone\" deve ser informado") 
			@Size(max=11, min=11, message="Telefone deve ter 11 dígitos")
			@Pattern(regexp = "\\d+", message = "O telefone deve conter apenas números")String phone) {
		GuestDTO dto = guestService.searchGuestToConfirm(phone);
		return ResponseEntity.ok(dto);
	}
	
	@PostMapping("confirm")
	public ResponseEntity<Void> confirmAttendence(@RequestBody @Valid GuestDTO dto) {
		guestService.confirmAttendenceAndCompanions(dto);
		return ResponseEntity.noContent().build();
	}
}
