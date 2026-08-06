package com.educonnect.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, name = "password_hash")
    private String passwordHash;

    @Column(length = 300)
    private String bio;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "reputation_score", nullable = false)
    @Builder.Default
    private Integer reputationScore = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Role role = Role.STUDENT;
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Vote> votes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<QuestionVote> questionVotes = new ArrayList<>();

    public enum Role {
        STUDENT(java.util.Set.of(Permission.USER_READ)),
        LEADER(java.util.Set.of(Permission.USER_READ, Permission.CONTENT_MODERATE)),
        ADMIN(java.util.Set.of(Permission.USER_READ, Permission.USER_MANAGE, Permission.LEADER_MANAGE, Permission.CONTENT_MODERATE, Permission.SYSTEM_CONFIG, Permission.AUDIT_READ));

        private final java.util.Set<Permission> permissions;

        Role(java.util.Set<Permission> permissions) {
            this.permissions = permissions;
        }

        public java.util.Set<Permission> getPermissions() {
            return permissions;
        }

        public java.util.List<org.springframework.security.core.authority.SimpleGrantedAuthority> getAuthorities() {
            var authorities = new java.util.ArrayList<>(getPermissions().stream()
                    .map(permission -> new org.springframework.security.core.authority.SimpleGrantedAuthority(permission.getPermission()))
                    .toList());
            authorities.add(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + this.name()));
            return authorities;
        }
    }


    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            if (createdAt == null) createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
