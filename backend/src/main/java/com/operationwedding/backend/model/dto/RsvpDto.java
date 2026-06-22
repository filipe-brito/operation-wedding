package com.operationwedding.backend.model.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RsvpDto {
	@JsonProperty("captcha_token")
	@NotBlank(message="O token de validação de humanidade é obrigatório")
	private String captchaToken;
	@JsonProperty("full_name")
	private String fullName;
	@NotBlank(message="Telefone é obrigatório")
	@Size(min=11, max=11, message="Telefone deve conter 11 dígitos.")
	@Pattern(regexp = "\\d+", message = "O telefone deve conter apenas números")
	private String phone;
	@JsonProperty("invite_code")
	@NotBlank(message="Código do convite é obrigatório")
	private String inviteCode;
	@JsonProperty("will_attend")
	@NotNull(message="Confirmação de presença é obrigatório")
	private Boolean willAttend;
	@JsonProperty("date_of_birth")
	private LocalDate dob; 
	@Valid
	private List<CompanionDto> companions = new ArrayList<>();

		// MÁGICA AQUI: O Spring vai executar esse método na validação
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // Evita expor no JSON de resposta
    @AssertTrue(message = "Data de nascimento é obrigatória.")
    public boolean isDobValid() {
        // Se a pessoa vai comparecer (willAttend == true), o dob NÃO pode ser nulo
        if (Boolean.TRUE.equals(willAttend)) {
            return dob != null;
        }
        // Se não vai comparecer, não importa se o dob é nulo ou não
        return true;
    }
	
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
	public String getInviteCode() {
		return inviteCode;
	}
	public void setInviteCode(String inviteCode) {
		this.inviteCode = inviteCode;
	}
	public Boolean getWillAttend() {
		return willAttend;
	}
	public void setWillAttend(Boolean willAttend) {
		this.willAttend = willAttend;
	}
	public LocalDate getDob() {
		return dob;
	}
	public void setDob(LocalDate dob) {
		this.dob = dob;
	}
	
	public List<CompanionDto> getCompanions() {
		return companions;
	}
	public void setCompanions(List<CompanionDto> companions) {
		this.companions = companions;
	}

	public static class CompanionDto {
		@NotNull(message="Id do acompanhante é obrigatório")
		private Long id;
		@JsonProperty("full_name")
		@NotBlank(message="Nome do acompanhante é obrigatório")
		private String fullName;
		@JsonProperty("date_of_birth")
		private LocalDate dob;
		@JsonProperty("will_attend")
		@NotNull(message="Confirmação de presença do acompanhante é obrigatório")
		private Boolean willAttend;

			// MÁGICA AQUI: O Spring vai executar esse método na validação
		@JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // Evita expor no JSON de resposta
		@AssertTrue(message = "Data de nascimento é obrigatória.")
		public boolean isDobValid() {
			// Se a pessoa vai comparecer (willAttend == true), o dob NÃO pode ser nulo
			if (Boolean.TRUE.equals(willAttend)) {
				return dob != null;
        	}
        // Se não vai comparecer, não importa se o dob é nulo ou não
        return true;
    }

		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}		
		public String getFullName() {
			return fullName;
		}
		public void setFullName(String fullName) {
			this.fullName = fullName;
		}
		public LocalDate getDob() {
			return dob;
		}
		public void setDob(LocalDate dob) {
			this.dob = dob;
		}
		public Boolean getWillAttend() {
			return willAttend;
		}
		public void setWillAttend(Boolean willAttend) {
			this.willAttend = willAttend;
		}
	}
}
