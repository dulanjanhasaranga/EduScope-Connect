package com.educonnect.controller;

import com.educonnect.model.User;
import com.educonnect.repository.AnswerRepository;
import com.educonnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;
import com.educonnect.model.Answer;

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
        
        // Calculate dynamic monthly engagement for the last 6 months
        List<Answer> allAnswers = answerRepository.findByAuthor(leader);
        Map<YearMonth, Integer> monthlyCounts = new TreeMap<>();
        YearMonth currentMonth = YearMonth.now();
        
        // Initialize last 6 months with 0
        for (int i = 5; i >= 0; i--) {
            monthlyCounts.put(currentMonth.minusMonths(i), 0);
        }
        
        // Populate with real data
        for (Answer ans : allAnswers) {
            YearMonth ym = YearMonth.from(ans.getCreatedAt());
            if (monthlyCounts.containsKey(ym)) {
                monthlyCounts.put(ym, monthlyCounts.get(ym) + 1);
            }
        }
        
        List<Map<String, Object>> chartData = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM");
        for (Map.Entry<YearMonth, Integer> entry : monthlyCounts.entrySet()) {
            Map<String, Object> dataPoint = new HashMap<>();
            dataPoint.put("name", entry.getKey().format(formatter));
            dataPoint.put("value", entry.getValue());
            chartData.add(dataPoint);
        }
        
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalAnswers", totalAnswers);
        metrics.put("reputationScore", leader.getReputationScore());
        metrics.put("studentImpactScore", Math.round(leader.getReputationScore() * 1.5));
        metrics.put("monthlyEngagement", chartData);

        return ResponseEntity.ok(metrics);
    }
}
