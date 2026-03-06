package com.operationwedding.backend.model.entities;

import java.time.OffsetDateTime;

import com.operationwedding.backend.model.enums.GuestStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="guest_list", schema="guests")
public class Guest {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column(name="full_name", nullable=false)
	private String fullName;
	@Column(length=11)
	private String phone;
	private String email;
	@Enumerated(EnumType.STRING)
	private GuestStatus status;
	@Column(name="is_companion", nullable=false)
	private Boolean isCompanion = false;
	@Column(name="is_underage", nullable=false)
	private Boolean isUnderage = false;	
	@Column(name="guest_group")
	private String guestGroup;
	@Column(name="updated_at", nullable=false)
	private OffsetDateTime confirmedAt;
	
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
	public GuestStatus getStatus() {
		return status;
	}
	public void setStatus(GuestStatus status) {
		this.status = status;
	}
	public Boolean getIsCompanion() {
		return isCompanion;
	}
	public void setIsCompanion(Boolean isCompanion) {
		this.isCompanion = isCompanion;
	}
	public Boolean getIsUnderage() {
		return isUnderage;
	}
	public void setIsUnderage(Boolean isUnderage) {
		this.isUnderage = isUnderage;
	}
	public String getGuestGroup() {
		return guestGroup;
	}
	public void setGuestGroup(String guestGroup) {
		this.guestGroup = guestGroup;
	}
	public OffsetDateTime getConfirmedAt() {
		return confirmedAt;
	}
	public void setConfirmedAt(OffsetDateTime confirmedAt) {
		this.confirmedAt = confirmedAt;
	}
}
