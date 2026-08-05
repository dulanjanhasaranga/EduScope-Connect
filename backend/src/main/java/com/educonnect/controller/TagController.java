package com.educonnect.controller;

import com.educonnect.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping
    public ResponseEntity<List<String>> searchTags(@RequestParam(required = false) String search) {
        List<String> tags = tagService.searchTags(search);
        return ResponseEntity.ok(tags);
    }

    @GetMapping("/categorized")
    public ResponseEntity<java.util.Map<String, List<String>>> getCategorizedTags() {
        return ResponseEntity.ok(tagService.getCategorizedTags());
    }
}
