package com.example.backend.config;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    @Autowired
    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== RUNNING DATABASE INITIALIZATION ===");
        
        try {
            // Check if admin user already exists
            if (userRepository.findByEmail("admin@rentiva.com").isEmpty()) {
                System.out.println("Creating default admin user...");
                  User adminUser = new User();
                adminUser.setName("Admin");
                adminUser.setEmail("admin@rentiva.com");
                adminUser.setPassword("admin123"); // In production, this should be hashed
                adminUser.setRole(User.Role.ADMIN);
                adminUser.setIsActive(true);
                adminUser.setCreatedAt(LocalDateTime.now());
                adminUser.setUpdatedAt(LocalDateTime.now());
                
                userRepository.save(adminUser);
                System.out.println("✅ Default admin user created successfully!");
                System.out.println("  Email: admin@rentiva.com");
                System.out.println("  Password: admin123");
            } else {
                System.out.println("ℹ️  Default admin user already exists");
            }
            
            // Create a test user as well
            if (userRepository.findByEmail("test@rentiva.com").isEmpty()) {
                System.out.println("Creating test user...");
                  User testUser = new User();
                testUser.setName("Test User");
                testUser.setEmail("test@rentiva.com");
                testUser.setPassword("test123");
                testUser.setRole(User.Role.USER);
                testUser.setIsActive(true);
                testUser.setCreatedAt(LocalDateTime.now());
                testUser.setUpdatedAt(LocalDateTime.now());
                
                userRepository.save(testUser);
                System.out.println("✅ Test user created successfully!");
                System.out.println("  Email: test@rentiva.com");
                System.out.println("  Password: test123");
            } else {
                System.out.println("ℹ️  Test user already exists");
            }
            
            // Print user count
            long userCount = userRepository.count();
            System.out.println("📊 Total users in database: " + userCount);
            
        } catch (Exception e) {
            System.err.println("❌ ERROR during database initialization: " + e.getMessage());
            e.printStackTrace();
        }
        
        System.out.println("=== DATABASE INITIALIZATION COMPLETE ===");
    }
}
