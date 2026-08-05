package com.educonnect.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AnswerRequest {

    @NotBlank(message = "Answer body is required")
    @Size(max = 5000, message = "Answer must be at most 5000 characters")
    private String body;
}
