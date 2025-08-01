package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now());
        response.put("service", "Rentiva Backend");
        response.put("version", "1.0.0");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, String>> root() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Rentiva Backend API is running");
        response.put("timestamp", LocalDateTime.now().toString());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/keep-alive")
    public ResponseEntity<Map<String, Object>> keepAlive() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "ALIVE");
        response.put("timestamp", LocalDateTime.now());
        response.put("message", "Service is active and responding");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/ping")
    public ResponseEntity<Map<String, Object>> ping() {
        Map<String, Object> response = new HashMap<>();
        response.put("pong", true);
        response.put("timestamp", LocalDateTime.now());
        response.put("service", "Rentiva Backend");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/wake")
    public ResponseEntity<Map<String, Object>> wake() {
        Map<String, Object> response = new HashMap<>();
        response.put("awake", true);
        response.put("timestamp", LocalDateTime.now());
        response.put("message", "Service has been woken up");
        response.put("service", "Rentiva Backend");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/heartbeat")
    public ResponseEntity<Map<String, Object>> heartbeat() {
        Map<String, Object> response = new HashMap<>();
        response.put("heartbeat", true);
        response.put("timestamp", LocalDateTime.now());
        response.put("status", "ALIVE");
        response.put("service", "Rentiva Backend");
        return ResponseEntity.ok(response);
    }
}
