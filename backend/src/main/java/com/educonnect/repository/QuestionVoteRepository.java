package com.educonnect.repository;

import com.educonnect.model.Question;
import com.educonnect.model.QuestionVote;
import com.educonnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
    Optional<QuestionVote> findByQuestionAndUser(Question question, User user);
    Optional<QuestionVote> findByQuestionIdAndUserId(Long questionId, Long userId);
    long countByQuestionIdAndVoteType(Long questionId, com.educonnect.model.Vote.VoteType voteType);
}
