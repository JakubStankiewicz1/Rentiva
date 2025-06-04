package com.example.backend.dto;

import com.example.backend.entity.User;
import java.time.LocalDateTime;

public class LoginResponse {
    
    private String token;
    private String tokenType = "Bearer";
    private UserInfo user;
    
    // Nested class for user information
    public static class UserInfo {
        private Long id;
        private String name;
        private String email;
        private String role;
        private LocalDateTime lastLogin;
        
        public UserInfo() {}
        
        public UserInfo(User user) {
            this.id = user.getId();
            this.name = user.getName();
            this.email = user.getEmail();
            this.role = user.getRole().toString();
            this.lastLogin = user.getLastLogin();
        }
        
        // Getters and Setters
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public String getEmail() {
            return email;
        }
        
        public void setEmail(String email) {
            this.email = email;
        }
        
        public String getRole() {
            return role;
        }
        
        public void setRole(String role) {
            this.role = role;
        }
        
        public LocalDateTime getLastLogin() {
            return lastLogin;
        }
        
        public void setLastLogin(LocalDateTime lastLogin) {
            this.lastLogin = lastLogin;
        }
    }
    
    // Constructors
    public LoginResponse() {}
    
    public LoginResponse(String token, User user) {
        this.token = token;
        this.user = new UserInfo(user);
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getTokenType() {
        return tokenType;
    }
    
    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
    
    public UserInfo getUser() {
        return user;
    }
    
    public void setUser(UserInfo user) {
        this.user = user;
    }
}
