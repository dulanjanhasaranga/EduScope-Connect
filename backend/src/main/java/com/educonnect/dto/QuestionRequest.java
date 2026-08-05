package com.educonnect.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class QuestionRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 150, message = "Title must be at most 150 characters")
    private String title;

    @NotBlank(message = "Body is required")
    @Size(max = 5000, message = "Body must be at most 5000 characters")
    private String body;

    @NotEmpty(message = "At least one tag is required")
    @Size(max = 5, message = "Maximum 5 tags allowed")
    private Set<String> tags;
}
