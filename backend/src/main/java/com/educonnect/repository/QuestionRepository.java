package com.educonnect.repository;

import com.educonnect.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("SELECT DISTINCT q FROM Question q LEFT JOIN FETCH q.tags WHERE q.id = :id")
    Optional<Question> findByIdWithTags(@Param("id") Long id);

    @Query("SELECT DISTINCT q FROM Question q LEFT JOIN q.tags t WHERE " +
           "(:search IS NULL OR LOWER(q.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(q.body) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:tag IS NULL OR t.name = :tag) AND " +
           "(:status IS NULL OR q.status = :status)")
    Page<Question> findAllWithFilters(@Param("search") String search,
                                        @Param("tag") String tag,
                                        @Param("status") Question.Status status,
                                        Pageable pageable);

    @Query("SELECT q FROM Question q WHERE q.author.id = :userId ORDER BY q.createdAt DESC")
    List<Question> findByAuthorId(@Param("userId") Long userId);

    long countByAuthorId(Long authorId);
}
