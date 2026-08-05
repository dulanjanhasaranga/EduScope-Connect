package com.educonnect.controller;

import com.educonnect.dto.VoteRequest;
import com.educonnect.dto.VoteResponse;
import com.educonnect.service.VoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/answers")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @PostMapping("/{answerId}/vote")
    public ResponseEntity<VoteResponse> castVote(
            @PathVariable Long answerId,
            @Valid @RequestBody VoteRequest request) {
        VoteResponse response = voteService.castVote(answerId, request.getVoteType());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{answerId}/vote")
    public ResponseEntity<VoteResponse> removeVote(@PathVariable Long answerId) {
        VoteResponse response = voteService.removeVote(answerId);
        return ResponseEntity.ok(response);
    }
}
