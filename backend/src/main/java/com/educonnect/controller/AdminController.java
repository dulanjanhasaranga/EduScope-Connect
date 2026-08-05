package com.educonnect.controller;

import com.educonnect.model.User;
import com.educonnect.repository.AnswerRepository;
import com.educonnect.repository.QuestionRepository;
import com.educonnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    // Users
    @GetMapping("/users")
    @PreAuthorize("hasAnyAuthority('user:manage', 'leader:manage')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userRepository.findAll().stream()
                .map(this::mapUserToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasAuthority('user:manage')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    @PatchMapping("/users/{id}/role")
    @PreAuthorize("hasAuthority('user:manage')")
    public ResponseEntity<Void> toggleUserRole(@PathVariable Long id, @RequestParam String role) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(User.Role.valueOf(role.toUpperCase()));
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    // Questions
    @GetMapping("/questions")
    @PreAuthorize("hasAuthority('content:moderate')")
    public ResponseEntity<List<QuestionDTO>> getAllQuestions() {
        List<QuestionDTO> questions = questionRepository.findAll().stream()
                .map(this::mapQuestionToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(questions);
    }

    @DeleteMapping("/questions/{id}")
    @PreAuthorize("hasAuthority('content:moderate')")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        if (!questionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        questionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Answers
    @DeleteMapping("/answers/{id}")
    @PreAuthorize("hasAuthority('content:moderate')")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        if (!answerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        answerRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    private UserDTO mapUserToDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getBio(), user.getAvatarUrl(), user.getReputationScore(), user.getRole().name(), user.getCreatedAt());
    }

    private QuestionDTO mapQuestionToDTO(com.educonnect.model.Question q) {
        return new QuestionDTO(q.getId(), q.getTitle(), q.getAuthor().getUsername(), q.getCreatedAt());
    }

    public static class QuestionDTO {
        public Long id;
        public String title;
        public String authorUsername;
        public java.time.LocalDateTime createdAt;

        public QuestionDTO(Long id, String title, String authorUsername, java.time.LocalDateTime createdAt) {
            this.id = id;
            this.title = title;
            this.authorUsername = authorUsername;
            this.createdAt = createdAt;
        }
    }

    // Simple DTO for Admin view
    public static class UserDTO {
        public Long id;
        public String username;
        public String email;
        public String bio;
        public String avatarUrl;
        public Integer reputationScore;
        public String role;
        public java.time.LocalDateTime createdAt;

        public UserDTO(Long id, String username, String email, String bio, String avatarUrl, Integer reputationScore, String role, java.time.LocalDateTime createdAt) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.bio = bio;
            this.avatarUrl = avatarUrl;
            this.reputationScore = reputationScore;
            this.role = role;
            this.createdAt = createdAt;
        }
    }
}
