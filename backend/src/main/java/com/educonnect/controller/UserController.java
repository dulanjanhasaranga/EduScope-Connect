package com.educonnect.controller;

import com.educonnect.dto.ProfileResponse;
import com.educonnect.dto.ProfileUpdateRequest;
import com.educonnect.dto.UserDTO;
import com.educonnect.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ProfileResponse> getCurrentUserProfile() {
        ProfileResponse response = userService.getCurrentUserProfile();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ProfileResponse> getUserProfile(@PathVariable Long userId) {
        ProfileResponse response = userService.getUserProfile(userId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/me")
    public ResponseEntity<UserDTO> updateProfile(@Valid @RequestBody ProfileUpdateRequest request) {
        UserDTO response = userService.updateProfile(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<java.util.List<UserDTO>> getLeaderboard() {
        java.util.List<UserDTO> response = userService.getLeaderboard();
        return ResponseEntity.ok(response);
    }
}
