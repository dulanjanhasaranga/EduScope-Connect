package com.educonnect.repository;

import com.educonnect.model.WaitlistEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WaitlistRepository extends JpaRepository<WaitlistEntry, Long> {
    Optional<WaitlistEntry> findByEmailAndProductId(String email, String productId);
    List<WaitlistEntry> findByProductId(String productId);
}
