package com.operationwedding.backend.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.operationwedding.backend.model.entities.GiftReceived;

public interface GiftsReceivedRepository extends JpaRepository<GiftReceived, UUID> {
}
