package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class BackendApplication {

	public static void main(String[] args) {
		System.out.println("Starting Rentiva Backend Application...");
		System.out.println("DataSource AutoConfiguration is DISABLED - using custom DatabaseConfig");
		SpringApplication.run(BackendApplication.class, args);
		System.out.println("Rentiva Backend Application started successfully!");
		System.out.println("API Documentation available at: http://localhost:8080/api");
		System.out.println("Health check available at: http://localhost:8080/actuator/health");
		System.out.println("Cars API available at: http://localhost:8080/api/cars");
	}

}
