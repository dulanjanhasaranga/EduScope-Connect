package com.educonnect.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponse {
    private Long id;
    private String body;
    private Integer voteCount;
    private Boolean isAccepted;
    private UserDTO author;
    private LocalDateTime createdAt;
    private String userVote; // "up", "down", or null
    private Boolean isOwner;
}
