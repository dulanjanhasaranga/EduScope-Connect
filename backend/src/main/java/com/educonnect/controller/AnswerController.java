package com.educonnect.controller;

import com.educonnect.dto.AnswerRequest;
import com.educonnect.dto.AnswerResponse;
import com.educonnect.service.AnswerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @PostMapping("/questions/{questionId}/answers")
    public ResponseEntity<AnswerResponse> createAnswer(
            @PathVariable Long questionId,
            @Valid @RequestBody AnswerRequest request) {
        AnswerResponse response = answerService.createAnswer(questionId, request);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/answers/{answerId}")
    public ResponseEntity<AnswerResponse> updateAnswer(
            @PathVariable Long answerId,
            @Valid @RequestBody AnswerRequest request) {
        AnswerResponse response = answerService.updateAnswer(answerId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/answers/{answerId}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long answerId) {
        answerService.deleteAnswer(answerId);
        return ResponseEntity.noContent().build();
    }
}
