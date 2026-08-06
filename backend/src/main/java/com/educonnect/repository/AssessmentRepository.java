package com.educonnect.repository;

import com.educonnect.model.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.educonnect.model.User;

import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    List<Assessment> findAllByOrderByCreatedAtDesc();
    List<Assessment> findByAuthorOrderByCreatedAtDesc(User author);
}
