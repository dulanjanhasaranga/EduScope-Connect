package com.educonnect.controller;

import com.educonnect.model.WaitlistEntry;
import com.educonnect.repository.WaitlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/waitlist")
public class WaitlistController {

    @Autowired
    private WaitlistRepository waitlistRepository;

    @PostMapping
    public ResponseEntity<?> joinWaitlist(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String productId = payload.get("productId");

        if (email == null || email.trim().isEmpty() || productId == null || productId.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and Product ID are required."));
        }

        if (waitlistRepository.findByEmailAndProductId(email, productId).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "You are already on the waitlist for this product!"));
        }

        WaitlistEntry entry = WaitlistEntry.builder()
                .email(email)
                .productId(productId)
                .build();
        
        waitlistRepository.save(entry);

        return ResponseEntity.ok(Map.of("message", "Successfully joined the waitlist!"));
    }
}
