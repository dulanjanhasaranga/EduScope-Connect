package com.educonnect.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProfileUpdateRequest {

    @Size(max = 30, message = "Display name must be at most 30 characters")
    private String displayName;

    @Size(max = 300, message = "Bio must be at most 300 characters")
    private String bio;
}
