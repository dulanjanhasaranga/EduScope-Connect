package com.educonnect.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDetailResponse {
    private Long id;
    private String title;
    private String body;
    private String status;
    private UserDTO author;
    private Set<String> tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<AnswerResponse> answers;
    private Boolean isOwner;
    private Integer voteCount;
    private String userVote;
}
