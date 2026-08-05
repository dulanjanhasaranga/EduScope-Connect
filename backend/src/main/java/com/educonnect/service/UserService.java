package com.educonnect.service;

import com.educonnect.dto.*;
import com.educonnect.model.Answer;
import com.educonnect.model.Question;
import com.educonnect.model.User;
import com.educonnect.repository.AnswerRepository;
import com.educonnect.repository.QuestionRepository;
import com.educonnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private AuthService authService;

    @Transactional(readOnly = true)
    public ProfileResponse getCurrentUserProfile() {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("Authentication required");
        }
        return buildProfileResponse(currentUser);
    }

    @Transactional(readOnly = true)
    public ProfileResponse getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return buildProfileResponse(user);
    }

    @Transactional
    public UserDTO updateProfile(ProfileUpdateRequest request) {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("Authentication required");
        }

        if (request.getDisplayName() != null && !request.getDisplayName().isEmpty()) {
            currentUser.setUsername(request.getDisplayName());
        }
        if (request.getBio() != null) {
            currentUser.setBio(request.getBio());
        }

        currentUser = userRepository.save(currentUser);
        return UserDTO.fromEntity(currentUser);
    }

    @Transactional(readOnly = true)
    public List<UserDTO> getLeaderboard() {
        return userRepository.findTop20ByOrderByReputationScoreDesc().stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList());
    }

    private ProfileResponse buildProfileResponse(User user) {
        List<Question> questions = questionRepository.findByAuthorId(user.getId());
        List<Answer> answers = answerRepository.findByAuthorIdOrderByCreatedAtDesc(user.getId());

        List<QuestionListResponse> questionResponses = questions.stream()
                .map(q -> QuestionListResponse.builder()
                        .id(q.getId())
                        .title(q.getTitle())
                        .body(q.getBody().length() > 200 ? q.getBody().substring(0, 200) + "..." : q.getBody())
                        .status(q.getStatus().name())
                        .authorUsername(q.getAuthor().getUsername())
                        .authorId(q.getAuthor().getId())
                        .answerCount(q.getAnswers().size())
                        .voteCount(0)
                        .tags(q.getTags().stream().map(com.educonnect.model.Tag::getName).collect(Collectors.toSet()))
                        .createdAt(q.getCreatedAt())
                        .hasAcceptedAnswer(q.getAcceptedAnswer() != null)
                        .build())
                .collect(Collectors.toList());

        List<AnswerResponse> answerResponses = answers.stream()
                .map(a -> AnswerResponse.builder()
                        .id(a.getId())
                        .body(a.getBody())
                        .voteCount(a.getVoteCount())
                        .isAccepted(a.getIsAccepted())
                        .author(UserDTO.fromEntity(a.getAuthor()))
                        .createdAt(a.getCreatedAt())
                        .userVote(null)
                        .isOwner(false)
                        .build())
                .collect(Collectors.toList());

        return ProfileResponse.builder()
                .user(UserDTO.fromEntity(user))
                .questions(questionResponses)
                .answers(answerResponses)
                .build();
    }
}
