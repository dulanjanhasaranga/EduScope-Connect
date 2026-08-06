package com.educonnect.service;

import com.educonnect.dto.AdminAnalyticsDTO;
import com.educonnect.dto.AuditLogDTO;
import com.educonnect.dto.SystemSettingDTO;
import com.educonnect.model.AuditLog;
import com.educonnect.model.SystemSetting;
import com.educonnect.repository.AuditLogRepository;
import com.educonnect.repository.QuestionRepository;
import com.educonnect.repository.StudyGroupRepository;
import com.educonnect.repository.SystemSettingRepository;
import com.educonnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private StudyGroupRepository studyGroupRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private SystemSettingRepository systemSettingRepository;

    @Transactional(readOnly = true)
    public AdminAnalyticsDTO getAnalytics() {
        long userCount = userRepository.count();
        long questionCount = questionRepository.count();
        long groupCount = studyGroupRepository.count();

        // Generate real chart data for the last 7 days
        List<Map<String, Object>> chartData = new ArrayList<>();
        java.time.LocalDate today = java.time.LocalDate.now();
        
        List<com.educonnect.model.Question> allQuestions = questionRepository.findAll();
        List<com.educonnect.model.User> allUsers = userRepository.findAll();

        for (int i = 6; i >= 0; i--) {
            java.time.LocalDate date = today.minusDays(i);
            String dayName = date.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            
            long questionsOnDay = allQuestions.stream()
                .filter(q -> q.getCreatedAt() != null && q.getCreatedAt().toLocalDate().equals(date))
                .count();
                
            long usersOnDay = allUsers.stream()
                .filter(u -> u.getCreatedAt() != null && u.getCreatedAt().toLocalDate().equals(date))
                .count();

            Map<String, Object> point = new HashMap<>();
            point.put("name", dayName);
            point.put("questions", questionsOnDay); 
            point.put("users", usersOnDay);
            chartData.add(point);
        }

        return AdminAnalyticsDTO.builder()
                .totalUsers(userCount)
                .totalQuestions(questionCount)
                .totalGroups(groupCount)
                .totalEcosystemApps(5)
                .questionActivityChart(chartData)
                .build();
    }

    @Transactional(readOnly = true)
    public List<AuditLogDTO> getAuditLogs() {
        return auditLogRepository.findAllByOrderByTimestampDesc().stream().map(log -> 
            AuditLogDTO.builder()
                    .id(log.getId())
                    .action(log.getAction())
                    .entityName(log.getEntityName())
                    .entityId(log.getEntityId())
                    .performedById(log.getPerformedBy().getId())
                    .performedByUsername(log.getPerformedBy().getUsername())
                    .timestamp(log.getTimestamp())
                    .details(log.getDetails())
                    .build()
        ).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<SystemSettingDTO> getSettings() {
        return systemSettingRepository.findAll().stream().map(this::mapSettingToDTO).collect(Collectors.toList());
    }

    @Transactional
    public SystemSettingDTO updateSetting(String key, String value) {
        SystemSetting setting = systemSettingRepository.findByKey(key)
                .orElseThrow(() -> new RuntimeException("Setting not found"));
        setting.setValue(value);
        setting = systemSettingRepository.save(setting);
        return mapSettingToDTO(setting);
    }

    private SystemSettingDTO mapSettingToDTO(SystemSetting setting) {
        return SystemSettingDTO.builder()
                .id(setting.getId())
                .key(setting.getKey())
                .value(setting.getValue())
                .description(setting.getDescription())
                .build();
    }
}
