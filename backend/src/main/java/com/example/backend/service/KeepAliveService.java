package com.example.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class KeepAliveService {
    
    private static final Logger logger = LoggerFactory.getLogger(KeepAliveService.class);
    
    private final RestTemplate restTemplate;
    
    @Autowired
    public KeepAliveService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    /**
     * Scheduled task that runs every 2 minutes to keep the service alive
     * This helps prevent the service from going idle on Render.com
     */
    @Scheduled(fixedRate = 120000) // 2 minutes
    public void keepAlive() {
        try {
            logger.info("🔄 Performing keep-alive health check...");
            
            // Call our own keep-alive endpoint to keep the service active
            String keepAliveUrl = "http://localhost:8080/api/keep-alive";
            restTemplate.getForObject(keepAliveUrl, Object.class);
            
            logger.info("✅ Keep-alive check completed successfully");
        } catch (Exception e) {
            logger.warn("⚠️ Keep-alive check failed: {}", e.getMessage());
        }
    }
    
    /**
     * Additional scheduled task that runs every 5 minutes to perform a more comprehensive check
     */
    @Scheduled(fixedRate = 300000) // 5 minutes
    public void comprehensiveHealthCheck() {
        try {
            logger.info("🔍 Performing comprehensive health check...");
            
            // Call the health endpoint to perform a comprehensive check
            String healthUrl = "http://localhost:8080/api/health";
            restTemplate.getForObject(healthUrl, Object.class);
            
            logger.info("✅ Comprehensive health check completed");
        } catch (Exception e) {
            logger.warn("⚠️ Comprehensive health check failed: {}", e.getMessage());
        }
    }
    
    /**
     * Simple ping task that runs every 1 minute
     */
    @Scheduled(fixedRate = 60000) // 1 minute
    public void ping() {
        try {
            logger.debug("🏓 Performing ping...");
            
            // Call the ping endpoint
            String pingUrl = "http://localhost:8080/api/ping";
            restTemplate.getForObject(pingUrl, Object.class);
            
            logger.debug("✅ Ping completed");
        } catch (Exception e) {
            logger.warn("⚠️ Ping failed: {}", e.getMessage());
        }
    }
} 