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
public class StudyGroupDTO {
    private Long id;
    private String name;
    private String description;
    private String category;
    private LocalDateTime createdAt;
    private Long ownerId;
    private int memberCount;
    private boolean isMember;
}
