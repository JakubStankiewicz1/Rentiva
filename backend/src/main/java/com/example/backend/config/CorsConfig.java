package com.example.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${CORS_ORIGINS:http://localhost:3000,http://localhost:3001,http://localhost:5173,https://rentiva-frontend-k1ss.onrender.com,https://rentiva-admin-zmr9.onrender.com,*}")
    private String corsOrigins;

    private List<String> getAllowedOrigins() {
        List<String> origins = Arrays.asList(corsOrigins.split(","));
        System.out.println("=== CORS CONFIGURATION ===");
        System.out.println("CORS_ORIGINS: " + corsOrigins);
        System.out.println("Allowed origins: " + origins);
        System.out.println("==========================");
        return origins;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        List<String> allowedOrigins = getAllowedOrigins();
        System.out.println("Configuring CORS with origins: " + allowedOrigins);
        
        // Tymczasowo pozwalamy wszystkim originom dla testowania
        registry.addMapping("/**")
                .allowedOriginPatterns("*") // Używamy pattern zamiast origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        List<String> allowedOrigins = getAllowedOrigins();
        System.out.println("Creating CORS configuration source with origins: " + allowedOrigins);
        
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*")); // Tymczasowo wszystkie originy
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
