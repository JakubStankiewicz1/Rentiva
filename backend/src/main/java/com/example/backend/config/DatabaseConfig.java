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
                    
                    // Check if host is null or empty
                    if (host == null || host.trim().isEmpty()) {
                        System.err.println("❌ Host is null or empty in DATABASE_URL");
                        throw new IllegalArgumentException("Host is missing from DATABASE_URL");
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
                    
                    // Try fallback approach for malformed URLs
                    System.out.println("🔄 Attempting fallback URL parsing...");
                    return createFallbackDataSource(databaseUrl);
                }
            } else if (databaseUrl.startsWith("jdbc:postgresql://")) {
                System.out.println("✅ Using JDBC PostgreSQL URL directly: " + databaseUrl);
                
                // Validate the JDBC URL format
                if (!isValidJdbcUrl(databaseUrl)) {
                    System.err.println("❌ Invalid JDBC URL format detected");
                    return createFallbackDataSource(databaseUrl);
                }
                
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
    
    /**
     * Validates if a JDBC URL has proper format
     */
    private boolean isValidJdbcUrl(String jdbcUrl) {
        try {
            // Basic validation - must contain host and database
            return jdbcUrl.matches("jdbc:postgresql://[^:]+:[0-9]+/[^\\s]+");
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Creates a fallback DataSource when standard parsing fails
     */
    private DataSource createFallbackDataSource(String databaseUrl) {
        System.out.println("🔄 FALLBACK: Attempting to extract connection details manually...");
        
        try {
            // Try to extract database connection info from Render environment
            String dbHost = System.getenv("RENDER_DATABASE_HOST");
            String dbPort = System.getenv("RENDER_DATABASE_PORT");
            String dbName = System.getenv("RENDER_DATABASE_NAME");
            String dbUser = System.getenv("RENDER_DATABASE_USER");
            String dbPassword = System.getenv("RENDER_DATABASE_PASSWORD");
            
            System.out.println("Render DB Environment Variables:");
            System.out.println("  RENDER_DATABASE_HOST: " + dbHost);
            System.out.println("  RENDER_DATABASE_PORT: " + dbPort);
            System.out.println("  RENDER_DATABASE_NAME: " + dbName);
            System.out.println("  RENDER_DATABASE_USER: " + dbUser);
            System.out.println("  RENDER_DATABASE_PASSWORD: " + (dbPassword != null ? "[HIDDEN]" : "null"));
            
            if (dbHost != null && dbName != null && dbUser != null && dbPassword != null) {
                String port = dbPort != null ? dbPort : "5432";
                String fallbackJdbcUrl = String.format("jdbc:postgresql://%s:%s/%s", dbHost, port, dbName);
                
                System.out.println("✅ FALLBACK: Using Render environment variables");
                System.out.println("  Fallback JDBC URL: " + fallbackJdbcUrl);
                
                return DataSourceBuilder.create()
                        .driverClassName("org.postgresql.Driver")
                        .url(fallbackJdbcUrl)
                        .username(dbUser)
                        .password(dbPassword)
                        .build();
            }
              // If Render env vars not available, try manual parsing from DATABASE_URL
            if (databaseUrl.contains("@") && databaseUrl.contains("/")) {
                System.out.println("🔄 FALLBACK: Attempting manual URL parsing...");
                
                // Extract from patterns like: postgresql://user:pass@host:port/db
                // Handle both full hostnames and Render internal hostnames
                String pattern = "postgresql://([^:]+):([^@]+)@([^:/]+):?([0-9]*)[^/]*/(.+)";
                java.util.regex.Pattern p = java.util.regex.Pattern.compile(pattern);
                java.util.regex.Matcher m = p.matcher(databaseUrl);
                
                if (m.matches()) {
                    String username = m.group(1);
                    String password = m.group(2);
                    String host = m.group(3);
                    String port = m.group(4).isEmpty() ? "5432" : m.group(4);
                    String database = m.group(5);
                    
                    // Handle Render internal hostnames - add proper domain if missing
                    if (host.startsWith("dpg-") && !host.contains(".")) {
                        host = host + ".oregon-postgres.render.com";
                        System.out.println("🔄 FALLBACK: Expanded Render hostname to: " + host);
                    }
                    
                    String fallbackJdbcUrl = String.format("jdbc:postgresql://%s:%s/%s", host, port, database);
                    
                    System.out.println("✅ FALLBACK: Manual parsing successful");
                    System.out.println("  Host: " + host);
                    System.out.println("  Port: " + port);
                    System.out.println("  Database: " + database);
                    System.out.println("  Username: " + username);
                    System.out.println("  Fallback JDBC URL: " + fallbackJdbcUrl);
                    
                    return DataSourceBuilder.create()
                            .driverClassName("org.postgresql.Driver")
                            .url(fallbackJdbcUrl)
                            .username(username)
                            .password(password)
                            .build();
                }
            }
            
            System.err.println("❌ FALLBACK: All fallback methods failed");
            throw new RuntimeException("Could not parse DATABASE_URL using any method");
            
        } catch (Exception e) {
            System.err.println("❌ FALLBACK: Error in fallback parsing: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Fallback DATABASE_URL parsing failed", e);
        }
    }
}
