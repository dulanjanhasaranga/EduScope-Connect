package com.educonnect.repository;

import com.educonnect.model.Answer;
import com.educonnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    @Query("SELECT a FROM Answer a LEFT JOIN FETCH a.votes WHERE a.id = :id")
    Optional<Answer> findByIdWithVotes(@Param("id") Long id);

    List<Answer> findByQuestionIdOrderByVoteCountDescCreatedAtDesc(Long questionId);

    List<Answer> findByAuthor(User author);

    List<Answer> findByAuthorIdOrderByCreatedAtDesc(Long authorId);

    long countByAuthor(User author);

    long countByAuthorId(Long authorId);
}
