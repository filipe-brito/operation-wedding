package com.operationwedding.backend.model.entities;

import java.time.LocalDate;
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
	@Enumerated(EnumType.STRING)
	private GuestStatus status;
	@Column(name="guest_type", nullable=false)
	private String guestType;
	@Column(name="date_of_birth", nullable=false)
	private LocalDate dob; 
	@Column(name="guest_group")
	private String guestGroup;
	@Column(name="invite_code")
	private String inviteCode;
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
	public GuestStatus getStatus() {
		return status;
	}
	public void setStatus(GuestStatus status) {
		this.status = status;
	}
	public String getGuestType() {
		return guestType;
	}
	public void setGuestType(String guestType) {
		this.guestType = guestType;
	}

	public LocalDate getDob() {
		return dob;
	}
	public void setDob(LocalDate dob) {
		this.dob = dob;
	}
	public String getGuestGroup() {
		return guestGroup;
	}
	public void setGuestGroup(String guestGroup) {
		this.guestGroup = guestGroup;
	}
	public String getInviteCode() {
		return inviteCode;
	}
	public void setInviteCode(String inviteCode) {
		this.inviteCode = inviteCode;
	}
	public OffsetDateTime getConfirmedAt() {
		return confirmedAt;
	}
	public void setConfirmedAt(OffsetDateTime confirmedAt) {
		this.confirmedAt = confirmedAt;
	}
}
