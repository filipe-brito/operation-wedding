package com.operationwedding.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.operationwedding.backend.model.entities.Guest;
import com.operationwedding.backend.model.enums.GuestStatus;

@Repository
public interface GuestRespository extends JpaRepository<Guest, Long> {
	Optional<Guest> findByPhoneAndInviteCodeAndGuestType(String phone, String inviteCode, String guestType);
	List<Guest> findByGuestGroupAndGuestType(String guestGroup, String guestType);
	@Modifying
    @Query("""
        update Guest g
           set g.status = :status
         where g.guestGroup = :guestGroup
           and g.guestType = :guestType
    """)
    void updateStatusByGroupAndType(
            @Param("status") GuestStatus status,
            @Param("guestGroup") String guestGroup,
            @Param("guestType") String guestType
    );
}
