package com.educonnect.controller;

import com.educonnect.model.EcosystemProduct;
import com.educonnect.repository.EcosystemProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ecosystem")
public class EcosystemController {

    @Autowired
    private EcosystemProductRepository ecosystemProductRepository;

    @GetMapping
    public ResponseEntity<List<EcosystemProduct>> getAllProducts() {
        return ResponseEntity.ok(ecosystemProductRepository.findAll());
    }
}
