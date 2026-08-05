package com.educonnect.repository;

import com.educonnect.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByAnswerIdAndUserId(Long answerId, Long userId);
    boolean existsByAnswerIdAndUserId(Long answerId, Long userId);
    long countByAnswerIdAndVoteType(Long answerId, Vote.VoteType voteType);
}
