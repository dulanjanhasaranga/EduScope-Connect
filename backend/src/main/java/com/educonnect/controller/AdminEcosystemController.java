package com.educonnect.controller;

import com.educonnect.model.EcosystemProduct;
import com.educonnect.repository.EcosystemProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin/ecosystem")
@PreAuthorize("hasAuthority('system:config')")
public class AdminEcosystemController {

    @Autowired
    private EcosystemProductRepository repository;

    @PostMapping
    public ResponseEntity<EcosystemProduct> createProduct(@RequestBody EcosystemProduct product) {
        if (product.getId() == null || product.getId().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(repository.save(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EcosystemProduct> updateProduct(@PathVariable String id, @RequestBody EcosystemProduct productDetails) {
        Optional<EcosystemProduct> optionalProduct = repository.findById(id);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        EcosystemProduct product = optionalProduct.get();
        product.setName(productDetails.getName());
        product.setCategory(productDetails.getCategory());
        product.setTagline(productDetails.getTagline());
        product.setDescription(productDetails.getDescription());
        product.setIcon(productDetails.getIcon());
        product.setColor(productDetails.getColor());
        product.setBgColor(productDetails.getBgColor());
        product.setBorderColor(productDetails.getBorderColor());
        product.setIconColor(productDetails.getIconColor());
        product.setImageUrl(productDetails.getImageUrl());
        product.setFeatures(productDetails.getFeatures());

        return ResponseEntity.ok(repository.save(product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
