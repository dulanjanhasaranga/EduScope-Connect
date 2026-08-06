package com.educonnect.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "question_votes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"question_id", "user_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "vote_type", nullable = false)
    private Vote.VoteType voteType;
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;


    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            if (createdAt == null) createdAt = LocalDateTime.now();
        }
    }
}
