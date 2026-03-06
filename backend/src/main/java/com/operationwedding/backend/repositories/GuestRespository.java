package com.operationwedding.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.operationwedding.backend.model.entities.Guest;

@Repository
public interface GuestRespository extends JpaRepository<Guest, Long> {
	Optional<Guest> findByPhone(String phone);
}
