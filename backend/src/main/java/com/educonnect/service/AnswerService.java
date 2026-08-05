package com.educonnect.service;

import com.educonnect.dto.AnswerRequest;
import com.educonnect.dto.AnswerResponse;
import com.educonnect.model.Answer;
import com.educonnect.model.Question;
import com.educonnect.model.User;
import com.educonnect.repository.AnswerRepository;
import com.educonnect.repository.QuestionRepository;
import com.educonnect.repository.VoteRepository;
import com.educonnect.websocket.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private WebSocketService webSocketService;

    @Transactional
    public AnswerResponse createAnswer(Long questionId, AnswerRequest request) {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("Authentication required");
        }

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        Answer answer = Answer.builder()
                .body(sanitizeHtml(request.getBody()))
                .question(question)
                .author(currentUser)
                .voteCount(0)
                .isAccepted(false)
                .build();

        answer = answerRepository.save(answer);

        AnswerResponse response = mapToAnswerResponse(answer, currentUser);

        // Notify question viewers
        webSocketService.sendNewAnswer(questionId, response);

        // Notify question author
        if (!question.getAuthor().getId().equals(currentUser.getId())) {
            webSocketService.sendNotification(
                    question.getAuthor().getId(),
                    "NEW_ANSWER",
                    "Your question received a new answer",
                    questionId
            );
        }

        return response;
    }

    @Transactional
    public AnswerResponse updateAnswer(Long answerId, AnswerRequest request) {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("Authentication required");
        }

        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        if (!answer.getAuthor().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Only the answer author can edit this answer");
        }

        answer.setBody(sanitizeHtml(request.getBody()));
        answer = answerRepository.save(answer);

        return mapToAnswerResponse(answer, currentUser);
    }

    @Transactional
    public void deleteAnswer(Long answerId) {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("Authentication required");
        }

        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        if (!answer.getAuthor().getId().equals(currentUser.getId()) && currentUser.getRole() != User.Role.ADMIN) {
            throw new RuntimeException("Not authorized to delete this answer");
        }

        answerRepository.delete(answer);
    }

    private AnswerResponse mapToAnswerResponse(Answer answer, User currentUser) {
        String userVote = null;
        boolean isOwner = false;

        if (currentUser != null) {
            Optional<com.educonnect.model.Vote> vote = voteRepository.findByAnswerIdAndUserId(answer.getId(), currentUser.getId());
            if (vote.isPresent()) {
                userVote = vote.get().getVoteType().name().toLowerCase();
            }
            isOwner = currentUser.getId().equals(answer.getAuthor().getId());
        }

        return AnswerResponse.builder()
                .id(answer.getId())
                .body(answer.getBody())
                .voteCount(answer.getVoteCount())
                .isAccepted(answer.getIsAccepted())
                .author(com.educonnect.dto.UserDTO.fromEntity(answer.getAuthor()))
                .createdAt(answer.getCreatedAt())
                .userVote(userVote)
                .isOwner(isOwner)
                .build();
    }

    private String sanitizeHtml(String input) {
        if (input == null) return "";
        return input.replaceAll("<script[^>]*>.*?</script>", "")
                    .replaceAll("<[^>]*>", "");
    }
}
