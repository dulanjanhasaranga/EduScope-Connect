package com.educonnect.dto;

import com.educonnect.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String bio;
    private String avatarUrl;
    private Integer reputationScore;
    private User.Role role;
    private LocalDateTime createdAt;

    public static UserDTO fromEntity(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .bio(user.getBio())
                .avatarUrl(user.getAvatarUrl())
                .reputationScore(user.getReputationScore())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
