package com.educonnect.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "waitlist_entries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WaitlistEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, name = "product_id")
    private String productId;
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;


    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            if (createdAt == null) createdAt = LocalDateTime.now();
        }
    }
}
