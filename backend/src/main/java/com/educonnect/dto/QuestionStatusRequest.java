package com.educonnect.dto;

import com.educonnect.model.Question;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class QuestionStatusRequest {

    @NotNull(message = "Status is required")
    private Question.Status status;

    private Long acceptedAnswerId;
}
