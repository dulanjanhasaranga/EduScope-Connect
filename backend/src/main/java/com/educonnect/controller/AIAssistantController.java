package com.educonnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AIAssistantController {

    @PostMapping("/summarize")
    public ResponseEntity<Map<String, String>> summarizeText(@RequestBody Map<String, String> payload) {
        String text = payload.get("text");
        if (text == null || text.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Text is required"));
        }

        // Mock AI Summarization Logic
        String summary = generateMockSummary(text);

        Map<String, String> response = new HashMap<>();
        response.put("summary", summary);
        return ResponseEntity.ok(response);
    }

    private String generateMockSummary(String text) {
        // A simple mock summarizer that takes the first few sentences and adds an AI flair
        String[] sentences = text.split("\\.");
        StringBuilder summaryBuilder = new StringBuilder();
        
        summaryBuilder.append("✨ **AI Summary:** ");
        for (int i = 0; i < Math.min(2, sentences.length); i++) {
            summaryBuilder.append(sentences[i].trim()).append(". ");
        }
        
        if (sentences.length > 2) {
            summaryBuilder.append(" (This text contains additional details not included in this brief summary.)");
        }
        
        return summaryBuilder.toString().trim();
    }
}
