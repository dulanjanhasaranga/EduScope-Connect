package com.educonnect.controller;

import com.educonnect.dto.VoteRequest;
import com.educonnect.dto.VoteResponse;
import com.educonnect.service.QuestionVoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
public class QuestionVoteController {

    @Autowired
    private QuestionVoteService questionVoteService;

    @PostMapping("/{questionId}/vote")
    public ResponseEntity<VoteResponse> castVote(
            @PathVariable Long questionId,
            @Valid @RequestBody VoteRequest request) {
        VoteResponse response = questionVoteService.castVote(questionId, request.getVoteType());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{questionId}/vote")
    public ResponseEntity<VoteResponse> removeVote(@PathVariable Long questionId) {
        VoteResponse response = questionVoteService.removeVote(questionId);
        return ResponseEntity.ok(response);
    }
}
