package com.educonnect.controller;

import com.educonnect.dto.GroupMessageDTO;
import com.educonnect.dto.GroupMessageRequest;
import com.educonnect.dto.StudyGroupDTO;
import com.educonnect.dto.StudyGroupRequest;
import com.educonnect.service.StudyGroupService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
public class StudyGroupController {

    @Autowired
    private StudyGroupService studyGroupService;

    @GetMapping
    public ResponseEntity<List<StudyGroupDTO>> getAllGroups() {
        return ResponseEntity.ok(studyGroupService.getAllGroups());
    }

    @PostMapping
    public ResponseEntity<StudyGroupDTO> createGroup(@Valid @RequestBody StudyGroupRequest request) {
        return ResponseEntity.ok(studyGroupService.createGroup(request));
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<StudyGroupDTO> joinGroup(@PathVariable Long id) {
        return ResponseEntity.ok(studyGroupService.joinGroup(id));
    }

    @PostMapping("/{id}/leave")
    public ResponseEntity<StudyGroupDTO> leaveGroup(@PathVariable Long id) {
        return ResponseEntity.ok(studyGroupService.leaveGroup(id));
    }

    @GetMapping("/{id}/messages")
    public ResponseEntity<List<GroupMessageDTO>> getGroupMessages(@PathVariable Long id) {
        return ResponseEntity.ok(studyGroupService.getGroupMessages(id));
    }
}
