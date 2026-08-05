package com.educonnect.websocket;

import com.educonnect.dto.AnswerResponse;
import com.educonnect.dto.QuestionListResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class WebSocketService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void broadcastNewQuestion(QuestionListResponse question) {
        messagingTemplate.convertAndSend("/topic/questions", question);
    }

    public void sendNewAnswer(Long questionId, AnswerResponse answer) {
        messagingTemplate.convertAndSend("/topic/question/" + questionId + "/answers", answer);
    }

    public void sendNotification(Long userId, String type, String message, Long relatedId) {
        Map<String, Object> notification = new HashMap<>();
        notification.put("type", type);
        notification.put("message", message);
        notification.put("relatedId", relatedId);
        messagingTemplate.convertAndSendToUser(userId.toString(), "/queue/notifications", notification);
    }

    public void sendVoteUpdate(Long questionId, Long answerId, Integer voteCount) {
        Map<String, Object> voteUpdate = new HashMap<>();
        voteUpdate.put("answerId", answerId);
        voteUpdate.put("voteCount", voteCount);
        messagingTemplate.convertAndSend("/topic/question/" + questionId + "/votes", voteUpdate);
    }

    public void sendQuestionSolved(Long questionId, Long acceptedAnswerId) {
        Map<String, Object> solvedEvent = new HashMap<>();
        solvedEvent.put("questionId", questionId);
        solvedEvent.put("acceptedAnswerId", acceptedAnswerId);
        messagingTemplate.convertAndSend("/topic/question/" + questionId + "/solved", solvedEvent);
    }
}
