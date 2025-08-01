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
}
