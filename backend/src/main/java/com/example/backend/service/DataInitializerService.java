package com.example.backend.service;

import com.example.backend.entity.Car;
import com.example.backend.repository.CarRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class DataInitializerService implements CommandLineRunner {

    private final CarRepository carRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public DataInitializerService(CarRepository carRepository, ObjectMapper objectMapper) {
        this.carRepository = carRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        // Only initialize if database is empty
        if (carRepository.count() == 0) {
            initializeCarsFromJson();
        }
    }

    private void initializeCarsFromJson() {
        try {
            // Read the JSON file from resources
            ClassPathResource resource = new ClassPathResource("data/carsData.json");
            InputStream inputStream = resource.getInputStream();
            
            // Parse JSON
            JsonNode jsonArray = objectMapper.readTree(inputStream);
            
            for (JsonNode carNode : jsonArray) {
                Car car = createCarFromJsonNode(carNode);
                carRepository.save(car);
            }
            
            System.out.println("Successfully initialized " + carRepository.count() + " cars from JSON data");
            
        } catch (IOException e) {
            System.err.println("Error loading cars data from JSON: " + e.getMessage());
        }
    }

    private Car createCarFromJsonNode(JsonNode carNode) {
        Car car = new Car();
        
        // Basic properties
        car.setId(carNode.get("id").asText());
        car.setTitle(carNode.get("title").asText());
        car.setBrand(carNode.get("brand").asText());
        car.setModel(carNode.get("model").asText());
        car.setEngine(carNode.get("engine").asText());
        car.setPower(carNode.get("power").asInt());
        car.setAcceleration(carNode.get("acceleration").asDouble());
        car.setMaxSpeed(carNode.get("maxSpeed").asInt());
        car.setFuelType(carNode.get("fuelType").asText());
        car.setTransmission(carNode.get("transmission").asText());
        car.setDrivetrain(carNode.get("drivetrain").asText());
        car.setType(carNode.get("type").asText());
        car.setGrossPrice(carNode.get("grossPrice").asInt());

        // Images - convert array to JSON string
        JsonNode imagesNode = carNode.get("images");
        if (imagesNode != null && imagesNode.isArray()) {
            try {
                car.setImages(objectMapper.writeValueAsString(imagesNode));
            } catch (Exception e) {
                car.setImages("[]");
            }
        }

        // Description
        JsonNode descriptionNode = carNode.get("description");
        if (descriptionNode != null) {
            car.setDescriptionTitle(getTextValue(descriptionNode, "title"));
            car.setDescriptionMainText(getTextValue(descriptionNode, "mainText"));
            car.setDescriptionPerformance(getTextValue(descriptionNode, "performance"));
            car.setDescriptionAccelerationDetails(getTextValue(descriptionNode, "accelerationDetails"));
            car.setDescriptionInterior(getTextValue(descriptionNode, "interior"));
            car.setDescriptionCraftsmanship(getTextValue(descriptionNode, "craftsmanship"));
            car.setDescriptionConclusion(getTextValue(descriptionNode, "conclusion"));
        }

        // Pricing
        JsonNode pricingNode = carNode.get("pricing");
        if (pricingNode != null) {
            car.setPriceDaily(getIntValue(pricingNode, "daily"));
            car.setPriceTwoDays(getIntValue(pricingNode, "twoDays"));
            car.setPriceThreeDays(getIntValue(pricingNode, "threeDays"));
            car.setPriceWeekly(getIntValue(pricingNode, "weekly"));
            car.setPriceMonthly(getIntValue(pricingNode, "monthly"));
        }

        // Mileage Info
        JsonNode mileageInfoNode = carNode.get("mileageInfo");
        if (mileageInfoNode != null) {
            car.setMileageDailyLimit(getIntValue(mileageInfoNode, "dailyLimit"));
            car.setMileageExcessFee(getIntValue(mileageInfoNode, "excessFee"));
            car.setMileageIncludedKm(getTextValue(mileageInfoNode, "includedKm"));
        }

        return car;
    }

    private String getTextValue(JsonNode node, String fieldName) {
        JsonNode fieldNode = node.get(fieldName);
        return fieldNode != null ? fieldNode.asText() : null;
    }

    private Integer getIntValue(JsonNode node, String fieldName) {
        JsonNode fieldNode = node.get(fieldName);
        if (fieldNode != null && !fieldNode.isNull()) {
            try {
                return fieldNode.asInt();
            } catch (Exception e) {
                // Try parsing as string (in case it's stored as string in JSON)
                try {
                    return Integer.parseInt(fieldNode.asText());
                } catch (NumberFormatException nfe) {
                    return null;
                }
            }
        }
        return null;
    }
}
