package com.educonnect.controller;

import com.educonnect.model.Assessment;
import com.educonnect.model.User;
import com.educonnect.repository.AssessmentRepository;
import com.educonnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@CrossOrigin(origins = "http://localhost:5173")
public class AssessmentController {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Assessment>> getAllAssessments() {
        return ResponseEntity.ok(assessmentRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assessment> getAssessment(@PathVariable Long id) {
        return assessmentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/my")
    @PreAuthorize("hasAuthority('system:config') or hasAuthority('leaders:verify') or hasRole('LEADER')")
    public ResponseEntity<List<Assessment>> getMyAssessments() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User author = userRepository.findByEmail(email).orElse(null);
        if (author == null) return ResponseEntity.badRequest().build();
        
        return ResponseEntity.ok(assessmentRepository.findByAuthorOrderByCreatedAtDesc(author));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('system:config') or hasAuthority('leaders:verify')")
    public ResponseEntity<Assessment> createAssessment(@RequestBody Assessment assessment) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User author = userRepository.findByEmail(email).orElse(null);
        if (author == null) return ResponseEntity.badRequest().build();

        assessment.setAuthor(author);
        if (assessment.getQuestions() != null) {
            assessment.getQuestions().forEach(q -> q.setAssessment(assessment));
        }

        Assessment saved = assessmentRepository.save(assessment);
        return ResponseEntity.ok(saved);
    }
}
