package com.educonnect.service;

import com.educonnect.dto.*;
import com.educonnect.model.*;
import com.educonnect.repository.*;
import com.educonnect.websocket.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private WebSocketService webSocketService;

    @Autowired
    private QuestionVoteRepository questionVoteRepository;

    @Transactional(readOnly = true)
    public PageResponse<QuestionListResponse> getAllQuestions(int page, int size, String sort, String tag, String status, String search) {
        Sort.Direction direction = Sort.Direction.DESC;
        String sortBy = "createdAt";

        if ("most-voted".equalsIgnoreCase(sort)) {
            sortBy = "voteCount";
        }

        Pageable pageable = PageRequest.of(page, size, direction, sortBy);
        Question.Status statusEnum = null;
        if (status != null && !status.isEmpty()) {
            try {
                statusEnum = Question.Status.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                // invalid status, ignore filter
            }
        }

        Page<Question> questionPage = questionRepository.findAllWithFilters(
                search != null && !search.isEmpty() ? search : null,
                tag != null && !tag.isEmpty() ? tag : null,
                statusEnum,
                pageable
        );

        User currentUser = authService.getCurrentUser();
        
        List<QuestionListResponse> content = questionPage.getContent().stream()
                .map(q -> mapToListResponse(q, currentUser))
                .collect(Collectors.toList());

        return PageResponse.<QuestionListResponse>builder()
                .content(content)
                .totalPages(questionPage.getTotalPages())
                .totalElements(questionPage.getTotalElements())
                .currentPage(page)
                .pageSize(size)
                .build();
    }

    @Transactional(readOnly = true)
    public QuestionDetailResponse getQuestionById(Long id) {
        Question question = questionRepository.findByIdWithTags(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        User currentUser = authService.getCurrentUser();
        boolean isOwner = currentUser != null && currentUser.getId().equals(question.getAuthor().getId());

        List<Answer> answers = answerRepository.findByQuestionIdOrderByVoteCountDescCreatedAtDesc(id);
        List<AnswerResponse> answerResponses = answers.stream()
                .map(a -> mapToAnswerResponse(a, currentUser))
                .collect(Collectors.toList());

        String userVote = null;
        if (currentUser != null) {
            Optional<QuestionVote> vote = questionVoteRepository.findByQuestionAndUser(question, currentUser);
            if (vote.isPresent()) {
                userVote = vote.get().getVoteType().name().toLowerCase();
            }
        }

        return QuestionDetailResponse.builder()
                .id(question.getId())
                .title(question.getTitle())
                .body(question.getBody())
                .status(question.getStatus().name())
                .author(UserDTO.fromEntity(question.getAuthor()))
                .tags(question.getTags().stream().map(Tag::getName).collect(Collectors.toSet()))
                .createdAt(question.getCreatedAt())
                .updatedAt(question.getUpdatedAt())
                .answers(answerResponses)
                .isOwner(isOwner)
                .voteCount(question.getVoteCount())
                .userVote(userVote)
                .build();
    }

    @Transactional
    public QuestionListResponse createQuestion(QuestionRequest request) {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("Authentication required");
        }

        Set<Tag> tags = request.getTags().stream()
                .map(tagName -> tagRepository.findByName(tagName.toLowerCase())
                        .orElseGet(() -> tagRepository.save(Tag.builder().name(tagName.toLowerCase()).build())))
                .collect(Collectors.toSet());

        Question question = Question.builder()
                .title(request.getTitle())
                .body(sanitizeHtml(request.getBody()))
                .author(currentUser)
                .tags(tags)
                .status(Question.Status.UNSOLVED)
                .build();

        question = questionRepository.save(question);
        QuestionListResponse response = mapToListResponse(question, currentUser);

        webSocketService.broadcastNewQuestion(response);
        return response;
    }

    @Transactional
    public QuestionDetailResponse updateQuestionStatus(Long questionId, QuestionStatusRequest request) {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("Authentication required");
        }

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (!question.getAuthor().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Only the question author can change its status");
        }

        question.setStatus(request.getStatus());

        if (request.getStatus() == Question.Status.SOLVED && request.getAcceptedAnswerId() != null) {
            Answer acceptedAnswer = answerRepository.findById(request.getAcceptedAnswerId())
                    .orElseThrow(() -> new RuntimeException("Answer not found"));

            if (!acceptedAnswer.getQuestion().getId().equals(questionId)) {
                throw new RuntimeException("Answer does not belong to this question");
            }

            // Reset previous accepted answer
            if (question.getAcceptedAnswer() != null) {
                question.getAcceptedAnswer().setIsAccepted(false);
            }

            acceptedAnswer.setIsAccepted(true);
            question.setAcceptedAnswer(acceptedAnswer);
            answerRepository.save(acceptedAnswer);

            // Award bonus reputation
            User answerAuthor = acceptedAnswer.getAuthor();
            answerAuthor.setReputationScore(answerAuthor.getReputationScore() + 15);
            userRepository.save(answerAuthor);
        }

        question = questionRepository.save(question);

        webSocketService.sendQuestionSolved(questionId, 
                question.getAcceptedAnswer() != null ? question.getAcceptedAnswer().getId() : null);

        return getQuestionById(questionId);
    }

    @Transactional
    public void deleteQuestion(Long questionId) {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("Authentication required");
        }

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (!question.getAuthor().getId().equals(currentUser.getId()) && currentUser.getRole() != User.Role.ADMIN) {
            throw new RuntimeException("Not authorized to delete this question");
        }

        questionRepository.delete(question);
    }

    private QuestionListResponse mapToListResponse(Question question, User currentUser) {
        String userVote = null;
        if (currentUser != null) {
            Optional<QuestionVote> vote = questionVoteRepository.findByQuestionAndUser(question, currentUser);
            if (vote.isPresent()) {
                userVote = vote.get().getVoteType().name().toLowerCase();
            }
        }

        return QuestionListResponse.builder()
                .id(question.getId())
                .title(question.getTitle())
                .body(question.getBody().length() > 200 ? question.getBody().substring(0, 200) + "..." : question.getBody())
                .status(question.getStatus().name())
                .authorUsername(question.getAuthor().getUsername())
                .authorId(question.getAuthor().getId())
                .answerCount(question.getAnswers().size())
                .voteCount(question.getVoteCount())
                .tags(question.getTags().stream().map(Tag::getName).collect(Collectors.toSet()))
                .createdAt(question.getCreatedAt())
                .hasAcceptedAnswer(question.getAcceptedAnswer() != null)
                .userVote(userVote)
                .build();
    }

    private AnswerResponse mapToAnswerResponse(Answer answer, User currentUser) {
        String userVote = null;
        boolean isOwner = false;

        if (currentUser != null) {
            Optional<Vote> vote = voteRepository.findByAnswerIdAndUserId(answer.getId(), currentUser.getId());
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
                .author(UserDTO.fromEntity(answer.getAuthor()))
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
