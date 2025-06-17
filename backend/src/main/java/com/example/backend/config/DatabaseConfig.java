package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.boot.jdbc.DataSourceBuilder;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
@Profile("prod")
public class DatabaseConfig {

    @Bean
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        
        System.out.println("=== DATABASE CONFIG DEBUG ===");
        System.out.println("DATABASE_URL env: " + databaseUrl);
        
        if (databaseUrl != null && databaseUrl.startsWith("postgresql://")) {
            try {
                URI dbUri = new URI(databaseUrl);
                
                // Pobierz komponenty z URI
                String host = dbUri.getHost();
                int port = dbUri.getPort();
                String database = dbUri.getPath().substring(1); // usuń pierwszy slash
                
                // Jesli port to -1, ustaw domyślny 5432
                if (port == -1) {
                    port = 5432;
                }
                
                // Parsuj user info
                String userInfo = dbUri.getUserInfo();
                String[] credentials = userInfo.split(":");
                String username = credentials[0];
                String password = credentials[1];
                
                // Stwórz właściwy JDBC URL
                String jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s", host, port, database);
                
                System.out.println("Parsed Host: " + host);
                System.out.println("Parsed Port: " + port);
                System.out.println("Parsed Database: " + database);
                System.out.println("Parsed Username: " + username);
                System.out.println("Generated JDBC URL: " + jdbcUrl);
                System.out.println("==============================");
                
                return DataSourceBuilder.create()
                        .driverClassName("org.postgresql.Driver")
                        .url(jdbcUrl)
                        .username(username)
                        .password(password)
                        .build();
                        
            } catch (URISyntaxException e) {
                System.err.println("BŁĄD PARSOWANIA DATABASE_URL: " + e.getMessage());
                e.printStackTrace();
            } catch (Exception e) {
                System.err.println("BŁĄD OGÓLNY: " + e.getMessage());
                e.printStackTrace();
            }
        }
        
        // Fallback - ZAWSZE zwróć jakąś konfigurację
        System.out.println("Using fallback DataSource configuration");
        String fallbackUrl = "jdbc:postgresql://localhost:5432/rentiva";
        String fallbackUser = "rentiva_user";
        String fallbackPassword = "password";
        
        System.out.println("Fallback JDBC URL: " + fallbackUrl);
        System.out.println("Fallback Username: " + fallbackUser);
        
        return DataSourceBuilder.create()
                .driverClassName("org.postgresql.Driver")
                .url(fallbackUrl)
                .username(fallbackUser)
                .password(fallbackPassword)
                .build();
    }
}
