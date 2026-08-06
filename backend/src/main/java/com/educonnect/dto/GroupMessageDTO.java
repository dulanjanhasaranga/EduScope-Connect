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
public class GroupMessageDTO {
    private Long id;
    private String content;
    private Long authorId;
    private String authorName;
    private String authorAvatarUrl;
    private Long groupId;
    private LocalDateTime createdAt;
}
