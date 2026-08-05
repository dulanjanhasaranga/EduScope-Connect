package com.educonnect.service;

import com.educonnect.dto.VoteResponse;
import com.educonnect.model.Question;
import com.educonnect.model.QuestionVote;
import com.educonnect.model.User;
import com.educonnect.model.Vote.VoteType;
import com.educonnect.repository.QuestionRepository;
import com.educonnect.repository.QuestionVoteRepository;
import com.educonnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class QuestionVoteService {

    @Autowired
    private QuestionVoteRepository questionVoteRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Transactional
    public VoteResponse castVote(Long questionId, VoteType voteType) {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("Authentication required");
        }

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (question.getAuthor().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You cannot vote on your own question");
        }

        Optional<QuestionVote> existingVote = questionVoteRepository.findByQuestionAndUser(question, currentUser);
        int reputationChange = 0;
        String userVoteState = null;

        if (existingVote.isPresent()) {
            QuestionVote vote = existingVote.get();

            if (vote.getVoteType() == voteType) {
                // Retract vote
                questionVoteRepository.delete(vote);
                reputationChange = voteType == VoteType.UP ? -5 : 2;
                userVoteState = null;
            } else {
                // Switch vote
                VoteType oldType = vote.getVoteType();
                vote.setVoteType(voteType);
                questionVoteRepository.save(vote);

                if (oldType == VoteType.UP && voteType == VoteType.DOWN) {
                    reputationChange = -7; // -5 (remove up) + -2 (add down)
                } else {
                    reputationChange = 7; // +5 (add up) + +2 (remove down)
                }
                userVoteState = voteType.name().toLowerCase();
            }
        } else {
            // New vote
            QuestionVote vote = QuestionVote.builder()
                    .question(question)
                    .user(currentUser)
                    .voteType(voteType)
                    .build();
            questionVoteRepository.save(vote);
            reputationChange = voteType == VoteType.UP ? 5 : -2;
            userVoteState = voteType.name().toLowerCase();
        }

        long upvotes = questionVoteRepository.countByQuestionIdAndVoteType(questionId, VoteType.UP);
        long downvotes = questionVoteRepository.countByQuestionIdAndVoteType(questionId, VoteType.DOWN);
        int newVoteCount = (int) (upvotes - downvotes);
        question.setVoteCount(newVoteCount);
        questionRepository.save(question);

        // Update author reputation
        User questionAuthor = question.getAuthor();
        questionAuthor.setReputationScore(Math.max(0, questionAuthor.getReputationScore() + reputationChange));
        userRepository.save(questionAuthor);

        return VoteResponse.builder()
                .voteCount(newVoteCount)
                .userVote(userVoteState)
                .build();
    }

    @Transactional
    public VoteResponse removeVote(Long questionId) {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("Authentication required");
        }

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        Optional<QuestionVote> existingVote = questionVoteRepository.findByQuestionAndUser(question, currentUser);

        if (existingVote.isPresent()) {
            QuestionVote vote = existingVote.get();
            int reputationChange = vote.getVoteType() == VoteType.UP ? -5 : 2;

            questionVoteRepository.delete(vote);

            long upvotes = questionVoteRepository.countByQuestionIdAndVoteType(questionId, VoteType.UP);
            long downvotes = questionVoteRepository.countByQuestionIdAndVoteType(questionId, VoteType.DOWN);
            int newVoteCount = (int) (upvotes - downvotes);
            question.setVoteCount(newVoteCount);
            questionRepository.save(question);

            User questionAuthor = question.getAuthor();
            questionAuthor.setReputationScore(Math.max(0, questionAuthor.getReputationScore() + reputationChange));
            userRepository.save(questionAuthor);
        }

        long upvotes = questionVoteRepository.countByQuestionIdAndVoteType(questionId, VoteType.UP);
        long downvotes = questionVoteRepository.countByQuestionIdAndVoteType(questionId, VoteType.DOWN);

        return VoteResponse.builder()
                .voteCount((int) (upvotes - downvotes))
                .userVote(null)
                .build();
    }
}
