package com.educonnect.service;

import com.educonnect.dto.GroupMessageDTO;
import com.educonnect.dto.GroupMessageRequest;
import com.educonnect.dto.StudyGroupDTO;
import com.educonnect.dto.StudyGroupRequest;
import com.educonnect.model.GroupMessage;
import com.educonnect.model.StudyGroup;
import com.educonnect.model.User;
import com.educonnect.repository.GroupMessageRepository;
import com.educonnect.repository.StudyGroupRepository;
import com.educonnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudyGroupService {

    @Autowired
    private StudyGroupRepository studyGroupRepository;

    @Autowired
    private GroupMessageRepository groupMessageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Transactional(readOnly = true)
    public List<StudyGroupDTO> getAllGroups() {
        User currentUser = authService.getCurrentUser();
        Long currentUserId = currentUser != null ? currentUser.getId() : null;

        return studyGroupRepository.findAllByOrderByCreatedAtDesc().stream().map(g -> {
            boolean isMember = currentUserId != null && g.getMembers().stream().anyMatch(u -> u.getId().equals(currentUserId));
            return StudyGroupDTO.builder()
                    .id(g.getId())
                    .name(g.getName())
                    .description(g.getDescription())
                    .category(g.getCategory())
                    .createdAt(g.getCreatedAt())
                    .ownerId(g.getOwner().getId())
                    .memberCount(g.getMembers().size())
                    .isMember(isMember)
                    .build();
        }).collect(Collectors.toList());
    }

    @Autowired
    private org.springframework.beans.factory.ObjectProvider<com.educonnect.config.DataSeeder> dataSeederProvider;

    @Transactional
    public StudyGroupDTO createGroup(StudyGroupRequest request) {
        User currentUser = authService.getCurrentUser();
        
        StudyGroup group = StudyGroup.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .owner(currentUser)
                .build();
        
        group.getMembers().add(currentUser);
        group = studyGroupRepository.save(group);

        com.educonnect.config.DataSeeder seeder = dataSeederProvider.getIfAvailable();
        if (seeder != null) {
            seeder.seedDynamicGroupActivity(group);
        }

        return StudyGroupDTO.builder()
                .id(group.getId())
                .name(group.getName())
                .description(group.getDescription())
                .category(group.getCategory())
                .createdAt(group.getCreatedAt())
                .ownerId(group.getOwner().getId())
                .memberCount(1)
                .isMember(true)
                .build();
    }

    @Transactional
    public StudyGroupDTO joinGroup(Long groupId) {
        User currentUser = authService.getCurrentUser();
        StudyGroup group = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        group.getMembers().add(currentUser);
        group = studyGroupRepository.save(group);

        return StudyGroupDTO.builder()
                .id(group.getId())
                .name(group.getName())
                .description(group.getDescription())
                .category(group.getCategory())
                .createdAt(group.getCreatedAt())
                .ownerId(group.getOwner().getId())
                .memberCount(group.getMembers().size())
                .isMember(true)
                .build();
    }

    @Transactional
    public StudyGroupDTO leaveGroup(Long groupId) {
        User currentUser = authService.getCurrentUser();
        StudyGroup group = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        if (group.getOwner().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Owner cannot leave the group. Transfer ownership or delete group.");
        }

        group.getMembers().removeIf(u -> u.getId().equals(currentUser.getId()));
        group = studyGroupRepository.save(group);

        return StudyGroupDTO.builder()
                .id(group.getId())
                .name(group.getName())
                .description(group.getDescription())
                .category(group.getCategory())
                .createdAt(group.getCreatedAt())
                .ownerId(group.getOwner().getId())
                .memberCount(group.getMembers().size())
                .isMember(false)
                .build();
    }

    @Transactional(readOnly = true)
    public List<GroupMessageDTO> getGroupMessages(Long groupId) {
        StudyGroup group = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        User currentUser = authService.getCurrentUser();
        if (currentUser == null || group.getMembers().stream().noneMatch(u -> u.getId().equals(currentUser.getId()))) {
            throw new RuntimeException("You must be a member to view messages");
        }

        return groupMessageRepository.findByGroupIdOrderByCreatedAtAsc(groupId).stream()
                .map(this::mapMessageToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public GroupMessageDTO saveMessage(Long groupId, GroupMessageRequest request, String email) {
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        StudyGroup group = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        if (group.getMembers().stream().noneMatch(u -> u.getId().equals(currentUser.getId()))) {
            throw new RuntimeException("You must be a member to send messages");
        }

        GroupMessage message = GroupMessage.builder()
                .content(request.getContent())
                .author(currentUser)
                .group(group)
                .build();

        message = groupMessageRepository.save(message);
        return mapMessageToDTO(message);
    }

    private GroupMessageDTO mapMessageToDTO(GroupMessage m) {
        return GroupMessageDTO.builder()
                .id(m.getId())
                .content(m.getContent())
                .authorId(m.getAuthor().getId())
                .authorName(m.getAuthor().getUsername())
                .authorAvatarUrl(m.getAuthor().getAvatarUrl())
                .groupId(m.getGroup().getId())
                .createdAt(m.getCreatedAt())
                .build();
    }
}
