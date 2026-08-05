package com.educonnect.controller;

import com.educonnect.model.StudyGroup;
import com.educonnect.repository.StudyGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "http://localhost:5173")
public class StudyGroupController {

    @Autowired
    private StudyGroupRepository studyGroupRepository;

    @GetMapping
    public ResponseEntity<List<StudyGroup>> getAllGroups() {
        return ResponseEntity.ok(studyGroupRepository.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping
    public ResponseEntity<StudyGroup> createGroup(@RequestBody StudyGroup group) {
        StudyGroup saved = studyGroupRepository.save(group);
        return ResponseEntity.ok(saved);
    }
}
