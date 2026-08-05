package com.educonnect.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionListResponse {
    private Long id;
    private String title;
    private String body;
    private String status;
    private String authorUsername;
    private Long authorId;
    private Integer answerCount;
    private Integer voteCount;
    private Set<String> tags;
    private LocalDateTime createdAt;
    private Boolean hasAcceptedAnswer;
    private String userVote;
}
