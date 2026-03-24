package com.operationwedding.backend.model.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class GuestDTO {
	@JsonProperty("captcha_token")
	@NotBlank(message="O token de validação de humanidade é obrigatório")
	private String captchaToken;
	@JsonProperty("full_name")
	private String fullName;
	@NotBlank(message="Telefone é obrigatório")
	@Size(min=11, max=11, message="Telefone deve conter 11 dígitos.")
	@Pattern(regexp = "\\d+", message = "O telefone deve conter apenas números")
	private String phone;
	@Email(message="E-mail inválido")
	private String email;
	@JsonProperty("will_attend")
	@NotNull(message="Confirmação de presença é obrigatório")
	private Boolean willAttend;
	@Valid
	private List<CompanionDTO> companions = new ArrayList<>();
	
	public String getCaptchaToken() {
		return captchaToken;
	}
	public void setCaptchaToken(String captchaToken) {
		this.captchaToken = captchaToken;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Boolean getWillAttend() {
		return willAttend;
	}
	public void setWillAttend(Boolean willAttend) {
		this.willAttend = willAttend;
	}
	public List<CompanionDTO> getCompanions() {
		return companions;
	}
	public void setCompanions(List<CompanionDTO> companions) {
		this.companions = companions;
	}

	public static class CompanionDTO {
		@JsonProperty("full_name")
		@NotBlank(message="Nome do acompanhante é obrigatório")
		private String fullName;
		@JsonProperty("is_underage")
		@NotNull(message="É necessário informar se o acompanhante tem menos de 7 anos.")
		private Boolean isUnderage;
		
		public String getFullName() {
			return fullName;
		}
		public void setFullName(String fullName) {
			this.fullName = fullName;
		}
		public Boolean getIsUnderage() {
			return isUnderage;
		}
		public void setIsUnderage(Boolean isUnderage) {
			this.isUnderage = isUnderage;
		}
	}
}
