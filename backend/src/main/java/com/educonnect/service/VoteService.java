package com.educonnect.service;

import com.educonnect.dto.VoteResponse;
import com.educonnect.model.Answer;
import com.educonnect.model.User;
import com.educonnect.model.Vote;
import com.educonnect.repository.AnswerRepository;
import com.educonnect.repository.UserRepository;
import com.educonnect.repository.VoteRepository;
import com.educonnect.websocket.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private WebSocketService webSocketService;

    @Transactional
    public VoteResponse castVote(Long answerId, Vote.VoteType voteType) {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("Authentication required");
        }

        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        if (answer.getAuthor().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You cannot vote on your own answer");
        }

        Optional<Vote> existingVote = voteRepository.findByAnswerIdAndUserId(answerId, currentUser.getId());
        int reputationChange = 0;
        String userVoteState = null;

        if (existingVote.isPresent()) {
            Vote vote = existingVote.get();

            if (vote.getVoteType() == voteType) {
                // Retract vote
                voteRepository.delete(vote);
                reputationChange = voteType == Vote.VoteType.UP ? -10 : 2;
                userVoteState = null;
            } else {
                // Switch vote
                Vote.VoteType oldType = vote.getVoteType();
                vote.setVoteType(voteType);
                voteRepository.save(vote);

                if (oldType == Vote.VoteType.UP && voteType == Vote.VoteType.DOWN) {
                    reputationChange = -12; // -10 (remove up) + -2 (add down)
                } else {
                    reputationChange = 12; // +10 (add up) + +2 (remove down)
                }
                userVoteState = voteType.name().toLowerCase();
            }
        } else {
            // New vote
            Vote vote = Vote.builder()
                    .answer(answer)
                    .user(currentUser)
                    .voteType(voteType)
                    .build();
            voteRepository.save(vote);
            reputationChange = voteType == Vote.VoteType.UP ? 10 : -2;
            userVoteState = voteType.name().toLowerCase();
        }

        // Update answer vote count
        long upvotes = voteRepository.countByAnswerIdAndVoteType(answerId, Vote.VoteType.UP);
        long downvotes = voteRepository.countByAnswerIdAndVoteType(answerId, Vote.VoteType.DOWN);
        int newVoteCount = (int) (upvotes - downvotes);
        answer.setVoteCount(newVoteCount);
        answerRepository.save(answer);

        // Update author reputation
        User answerAuthor = answer.getAuthor();
        answerAuthor.setReputationScore(Math.max(0, answerAuthor.getReputationScore() + reputationChange));
        userRepository.save(answerAuthor);

        // Broadcast vote update
        webSocketService.sendVoteUpdate(answer.getQuestion().getId(), answerId, newVoteCount);

        return VoteResponse.builder()
                .voteCount(newVoteCount)
                .userVote(userVoteState)
                .build();
    }

    @Transactional
    public VoteResponse removeVote(Long answerId) {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("Authentication required");
        }

        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        Optional<Vote> existingVote = voteRepository.findByAnswerIdAndUserId(answerId, currentUser.getId());

        if (existingVote.isPresent()) {
            Vote vote = existingVote.get();
            int reputationChange = vote.getVoteType() == Vote.VoteType.UP ? -10 : 2;

            voteRepository.delete(vote);

            // Update answer vote count
            long upvotes = voteRepository.countByAnswerIdAndVoteType(answerId, Vote.VoteType.UP);
            long downvotes = voteRepository.countByAnswerIdAndVoteType(answerId, Vote.VoteType.DOWN);
            int newVoteCount = (int) (upvotes - downvotes);
            answer.setVoteCount(newVoteCount);
            answerRepository.save(answer);

            // Update author reputation
            User answerAuthor = answer.getAuthor();
            answerAuthor.setReputationScore(Math.max(0, answerAuthor.getReputationScore() + reputationChange));
            userRepository.save(answerAuthor);

            // Broadcast vote update
            webSocketService.sendVoteUpdate(answer.getQuestion().getId(), answerId, newVoteCount);
        }

        long upvotes = voteRepository.countByAnswerIdAndVoteType(answerId, Vote.VoteType.UP);
        long downvotes = voteRepository.countByAnswerIdAndVoteType(answerId, Vote.VoteType.DOWN);

        return VoteResponse.builder()
                .voteCount((int) (upvotes - downvotes))
                .userVote(null)
                .build();
    }
}
