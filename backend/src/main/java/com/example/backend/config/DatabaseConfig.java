package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.boot.jdbc.DataSourceBuilder;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {    @Bean
    @Primary
    public DataSource dataSource() {
        System.out.println("=== CUSTOM DATABASE CONFIG STARTING ===");
        
        String databaseUrl = System.getenv("DATABASE_URL");
        String activeProfile = System.getenv("SPRING_PROFILES_ACTIVE");
        String port = System.getenv("PORT");
        
        System.out.println("DATABASE_URL: " + databaseUrl);
        System.out.println("SPRING_PROFILES_ACTIVE: " + activeProfile);
        System.out.println("PORT: " + port);
        
        // Print all database-related environment variables
        System.out.println("All database-related environment variables:");
        System.getenv().forEach((key, value) -> {
            if (key.toUpperCase().contains("DATABASE") || 
                key.toUpperCase().contains("POSTGRES") || 
                key.toUpperCase().contains("SQL") ||
                key.toUpperCase().contains("DB")) {
                System.out.println("  " + key + " = " + value);
            }
        });
        
        if (databaseUrl != null && !databaseUrl.trim().isEmpty()) {
            System.out.println("✅ DATABASE_URL found, parsing...");
            
            if (databaseUrl.startsWith("postgresql://")) {
                try {
                    URI dbUri = new URI(databaseUrl);
                    
                    String host = dbUri.getHost();
                    int dbPort = dbUri.getPort();
                    String database = dbUri.getPath();
                    if (database.startsWith("/")) {
                        database = database.substring(1);
                    }
                    
                    // Fallback port to 5432 if not specified
                    if (dbPort == -1) {
                        dbPort = 5432;
                        System.out.println("⚠️  Port not specified, using default 5432");
                    }
                    
                    String userInfo = dbUri.getUserInfo();
                    if (userInfo == null) {
                        throw new IllegalArgumentException("No user info in DATABASE_URL");
                    }
                    
                    String[] credentials = userInfo.split(":");
                    if (credentials.length != 2) {
                        throw new IllegalArgumentException("Invalid user info format in DATABASE_URL");
                    }
                    
                    String username = credentials[0];
                    String password = credentials[1];
                    
                    String jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s", host, dbPort, database);
                    
                    System.out.println("✅ Successfully parsed PostgreSQL DATABASE_URL:");
                    System.out.println("  Host: " + host);
                    System.out.println("  Port: " + dbPort);
                    System.out.println("  Database: " + database);
                    System.out.println("  Username: " + username);
                    System.out.println("  Password: " + (password != null ? "[HIDDEN]" : "null"));
                    System.out.println("  Final JDBC URL: " + jdbcUrl);
                    System.out.println("=====================================");
                    
                    DataSource ds = DataSourceBuilder.create()
                            .driverClassName("org.postgresql.Driver")
                            .url(jdbcUrl)
                            .username(username)
                            .password(password)
                            .build();
                    
                    System.out.println("✅ PostgreSQL DataSource created successfully!");
                    return ds;
                            
                } catch (Exception e) {
                    System.err.println("❌ ERROR parsing DATABASE_URL: " + e.getMessage());
                    e.printStackTrace();
                    throw new RuntimeException("Failed to parse DATABASE_URL", e);
                }
            } else if (databaseUrl.startsWith("jdbc:postgresql://")) {
                System.out.println("✅ Using JDBC PostgreSQL URL directly: " + databaseUrl);
                
                DataSource ds = DataSourceBuilder.create()
                        .driverClassName("org.postgresql.Driver")
                        .url(databaseUrl)
                        .build();
                
                System.out.println("✅ PostgreSQL DataSource created with JDBC URL!");
                return ds;
            } else {
                System.err.println("❌ DATABASE_URL format not recognized: " + databaseUrl);
                throw new RuntimeException("DATABASE_URL must start with 'postgresql://' or 'jdbc:postgresql://'");
            }
        }
        
        // If no DATABASE_URL, this is a critical error in production
        System.err.println("❌ CRITICAL ERROR: DATABASE_URL not found!");
        System.err.println("❌ Cannot start application without database configuration!");
        System.err.println("❌ Please set DATABASE_URL environment variable on Render!");
        System.err.println("=====================================");
        
        throw new RuntimeException("DATABASE_URL environment variable is required but not found!");
    }
}
