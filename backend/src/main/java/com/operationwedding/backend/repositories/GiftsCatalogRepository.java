package com.operationwedding.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.operationwedding.backend.model.entities.GiftItem;

@Repository
public interface GiftsCatalogRepository extends JpaRepository<GiftItem, Long>{
}
