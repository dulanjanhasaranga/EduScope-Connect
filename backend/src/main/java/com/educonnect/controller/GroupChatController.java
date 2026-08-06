package com.educonnect.controller;

import com.educonnect.dto.GroupMessageDTO;
import com.educonnect.dto.GroupMessageRequest;
import com.educonnect.service.StudyGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class GroupChatController {

    @Autowired
    private StudyGroupService studyGroupService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/group/{groupId}/chat")
    public void sendMessage(@DestinationVariable Long groupId, @Payload GroupMessageRequest request, java.security.Principal principal) {
        if (principal == null) return;
        // Save the message and get the DTO
        GroupMessageDTO savedMessage = studyGroupService.saveMessage(groupId, request, principal.getName());
        
        // Broadcast the message to all subscribers of this group
        messagingTemplate.convertAndSend("/topic/group/" + groupId, savedMessage);
    }
}
