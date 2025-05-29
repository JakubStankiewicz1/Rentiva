package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		System.out.println("Starting Rentiva Backend Application...");
		SpringApplication.run(BackendApplication.class, args);
		System.out.println("Rentiva Backend Application started successfully!");
		System.out.println("API Documentation available at: http://localhost:8080/api");
		System.out.println("Health check available at: http://localhost:8080/api/health");
		System.out.println("Cars API available at: http://localhost:8080/api/cars");
	}

}
