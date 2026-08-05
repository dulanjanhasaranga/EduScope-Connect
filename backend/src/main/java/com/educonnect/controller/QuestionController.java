package com.educonnect.controller;

import com.educonnect.dto.*;
import com.educonnect.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping
    public ResponseEntity<PageResponse<QuestionListResponse>> getAllQuestions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "newest") String sort,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search) {
        PageResponse<QuestionListResponse> response = questionService.getAllQuestions(page, size, sort, tag, status, search);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionDetailResponse> getQuestionById(@PathVariable Long id) {
        QuestionDetailResponse response = questionService.getQuestionById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<QuestionListResponse> createQuestion(@Valid @RequestBody QuestionRequest request) {
        QuestionListResponse response = questionService.createQuestion(request);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<QuestionDetailResponse> updateQuestionStatus(
            @PathVariable Long id,
            @Valid @RequestBody QuestionStatusRequest request) {
        QuestionDetailResponse response = questionService.updateQuestionStatus(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
