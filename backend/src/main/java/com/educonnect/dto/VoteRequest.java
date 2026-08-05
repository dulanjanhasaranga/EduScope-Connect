package com.educonnect.dto;

import com.educonnect.model.Vote;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VoteRequest {

    @NotNull(message = "Vote type is required")
    private Vote.VoteType voteType;
}
