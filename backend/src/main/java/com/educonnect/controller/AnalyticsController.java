package com.educonnect.controller;

import com.educonnect.model.User;
import com.educonnect.repository.AnswerRepository;
import com.educonnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @GetMapping("/leader")
    @PreAuthorize("hasAuthority('system:config') or hasAuthority('leaders:verify') or hasRole('LEADER')")
    public ResponseEntity<Map<String, Object>> getLeaderAnalytics() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User leader = userRepository.findByEmail(email).orElse(null);
        if (leader == null) return ResponseEntity.badRequest().build();

        long totalAnswers = answerRepository.countByAuthor(leader);
        
        // Simulating some analytics data inspired by FacultyLens
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalAnswers", totalAnswers);
        metrics.put("reputationScore", leader.getReputationScore());
        metrics.put("studentImpactScore", Math.round(leader.getReputationScore() * 1.5));
        metrics.put("monthlyEngagement", new int[]{12, 19, 15, 25, 22, 30}); // Mock chart data

        return ResponseEntity.ok(metrics);
    }
}
