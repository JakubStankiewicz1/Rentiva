package com.example.backend.service;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

@Service
public class AuthService {
    
    private final UserRepository userRepository;
    
    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    /**
     * Authenticate user and return login response
     */
    public LoginResponse authenticate(LoginRequest loginRequest) {
        try {
            System.out.println("=== AUTHENTICATE START ===");
            System.out.println("Looking for user with email: " + loginRequest.getEmail());
            
            // Find user by email
            Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
            
            if (userOptional.isEmpty()) {
                System.out.println("User not found with email: " + loginRequest.getEmail());
                throw new RuntimeException("Invalid email or password");
            }
            
            User user = userOptional.get();
            System.out.println("User found: " + user.getName() + " (ID: " + user.getId() + ")");
            
            // Check if user is active
            if (!user.getIsActive()) {
                System.out.println("User account is deactivated: " + user.getEmail());
                throw new RuntimeException("User account is deactivated");
            }
            
            System.out.println("User is active, verifying password...");
            
            // Verify password (in production, use proper password hashing like BCrypt)
            if (!verifyPassword(loginRequest.getPassword(), user.getPassword())) {
                System.out.println("Password verification failed for user: " + user.getEmail());
                throw new RuntimeException("Invalid email or password");
            }
            
            System.out.println("Password verified successfully");
            
            // Update last login time
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);
            System.out.println("Last login time updated");
            
            // Generate token (in production, use JWT)
            String token = generateToken(user);
            System.out.println("Token generated successfully");
            
            System.out.println("=== AUTHENTICATE COMPLETED ===");
            
            return new LoginResponse(token, user);
            
        } catch (Exception e) {
            System.err.println("=== AUTHENTICATE ERROR ===");
            System.err.println("Error during authentication: " + e.getMessage());
            e.printStackTrace();
            System.err.println("=== END AUTHENTICATE ERROR ===");
            throw e;
        }
    }
    
    /**
     * Verify password (simplified for demo - use BCrypt in production)
     */
    private boolean verifyPassword(String rawPassword, String encodedPassword) {
        // For demo purposes, we're storing passwords in plain text
        // In production, use BCrypt or another secure hashing algorithm
        return rawPassword.equals(encodedPassword);
    }
    
    /**
     * Generate authentication token (simplified for demo - use JWT in production)
     */
    private String generateToken(User user) {
        // For demo purposes, create a simple token
        // In production, use JWT with proper expiration and signing
        String payload = user.getId() + ":" + user.getEmail() + ":" + System.currentTimeMillis();
        return Base64.getEncoder().encodeToString(payload.getBytes());
    }
    
    /**
     * Validate token and return user
     */
    public User validateToken(String token) {
        try {
            // Decode token
            String payload = new String(Base64.getDecoder().decode(token));
            String[] parts = payload.split(":");
            
            if (parts.length != 3) {
                throw new RuntimeException("Invalid token format");
            }
            
            Long userId = Long.parseLong(parts[0]);
            String email = parts[1];
            long timestamp = Long.parseLong(parts[2]);
            
            // Check token age (24 hours)
            long currentTime = System.currentTimeMillis();
            long tokenAge = currentTime - timestamp;
            long maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            
            if (tokenAge > maxAge) {
                throw new RuntimeException("Token expired");
            }
            
            // Find user
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isEmpty() || !userOptional.get().getEmail().equals(email)) {
                throw new RuntimeException("Invalid token");
            }
            
            User user = userOptional.get();
            if (!user.getIsActive()) {
                throw new RuntimeException("User account is deactivated");
            }
            
            return user;
            
        } catch (Exception e) {
            throw new RuntimeException("Invalid token: " + e.getMessage());
        }
    }
    
    /**
     * Get user profile by token
     */
    public LoginResponse.UserInfo getUserProfile(String token) {
        User user = validateToken(token);
        return new LoginResponse.UserInfo(user);
    }
    
    /**
     * Initialize default admin user if no users exist
     */
    public void initializeDefaultUser() {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setName("Administrator");
            admin.setEmail("admin@rentiva.com");
            admin.setPassword("admin123"); // In production, hash this password
            admin.setRole(User.Role.ADMIN);
            admin.setIsActive(true);
            
            userRepository.save(admin);
            System.out.println("Default admin user created: admin@rentiva.com / admin123");
        }
    }
}
