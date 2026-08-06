package com.educonnect.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminAnalyticsDTO {
    private long totalUsers;
    private long totalQuestions;
    private long totalGroups;
    private long totalEcosystemApps; // We will hardcode this to 5 for now
    private List<Map<String, Object>> questionActivityChart; // e.g. [{"date": "Mon", "count": 12}, ...]
}
