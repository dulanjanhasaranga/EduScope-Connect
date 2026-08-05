package com.educonnect.model;

public enum Permission {
    USER_READ("user:read"),
    USER_MANAGE("user:manage"),
    LEADER_MANAGE("leader:manage"),
    CONTENT_MODERATE("content:moderate"),
    SYSTEM_CONFIG("system:config"),
    AUDIT_READ("audit:read");

    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
