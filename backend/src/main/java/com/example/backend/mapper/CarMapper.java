package com.example.backend.mapper;

import com.example.backend.dto.CarDTO;
import com.example.backend.entity.Car;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class CarMapper {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public CarDTO toDTO(Car car) {
        CarDTO dto = new CarDTO();
        
        // Basic properties
        dto.setId(car.getId());
        dto.setTitle(car.getTitle());
        dto.setBrand(car.getBrand());
        dto.setModel(car.getModel());
        dto.setEngine(car.getEngine());
        dto.setPower(car.getPower());
        dto.setAcceleration(car.getAcceleration());
        dto.setMaxSpeed(car.getMaxSpeed());
        dto.setFuelType(car.getFuelType());
        dto.setTransmission(car.getTransmission());
        dto.setDrivetrain(car.getDrivetrain());
        dto.setType(car.getType());
        dto.setGrossPrice(car.getGrossPrice());

        // Images - convert from JSON string to List
        if (car.getImages() != null && !car.getImages().isEmpty()) {
            try {
                List<String> imagesList = objectMapper.readValue(car.getImages(), new TypeReference<List<String>>() {});
                dto.setImages(imagesList);
            } catch (JsonProcessingException e) {
                // Fallback to comma-separated values
                dto.setImages(Arrays.asList(car.getImages().split(",")));
            }
        }

        // Description
        CarDTO.CarDescriptionDTO description = new CarDTO.CarDescriptionDTO();
        description.setTitle(car.getDescriptionTitle());
        description.setMainText(car.getDescriptionMainText());
        description.setPerformance(car.getDescriptionPerformance());
        description.setAccelerationDetails(car.getDescriptionAccelerationDetails());
        description.setInterior(car.getDescriptionInterior());
        description.setCraftsmanship(car.getDescriptionCraftsmanship());
        description.setConclusion(car.getDescriptionConclusion());
        dto.setDescription(description);

        // Pricing
        CarDTO.CarPricingDTO pricing = new CarDTO.CarPricingDTO();
        pricing.setDaily(car.getPriceDaily());
        pricing.setTwoDays(car.getPriceTwoDays());
        pricing.setThreeDays(car.getPriceThreeDays());
        pricing.setWeekly(car.getPriceWeekly());
        pricing.setMonthly(car.getPriceMonthly());
        dto.setPricing(pricing);

        // Mileage Info
        CarDTO.CarMileageInfoDTO mileageInfo = new CarDTO.CarMileageInfoDTO();
        mileageInfo.setDailyLimit(car.getMileageDailyLimit());
        mileageInfo.setExcessFee(car.getMileageExcessFee());
        mileageInfo.setIncludedKm(car.getMileageIncludedKm());
        dto.setMileageInfo(mileageInfo);

        return dto;
    }

    public Car toEntity(CarDTO dto) {
        Car car = new Car();
        
        // Basic properties
        car.setId(dto.getId());
        car.setTitle(dto.getTitle());
        car.setBrand(dto.getBrand());
        car.setModel(dto.getModel());
        car.setEngine(dto.getEngine());
        car.setPower(dto.getPower());
        car.setAcceleration(dto.getAcceleration());
        car.setMaxSpeed(dto.getMaxSpeed());
        car.setFuelType(dto.getFuelType());
        car.setTransmission(dto.getTransmission());
        car.setDrivetrain(dto.getDrivetrain());
        car.setType(dto.getType());
        car.setGrossPrice(dto.getGrossPrice());

        // Images - convert from List to JSON string
        if (dto.getImages() != null && !dto.getImages().isEmpty()) {
            try {
                String imagesJson = objectMapper.writeValueAsString(dto.getImages());
                car.setImages(imagesJson);
            } catch (JsonProcessingException e) {
                // Fallback to comma-separated values
                car.setImages(String.join(",", dto.getImages()));
            }
        }

        // Description
        if (dto.getDescription() != null) {
            car.setDescriptionTitle(dto.getDescription().getTitle());
            car.setDescriptionMainText(dto.getDescription().getMainText());
            car.setDescriptionPerformance(dto.getDescription().getPerformance());
            car.setDescriptionAccelerationDetails(dto.getDescription().getAccelerationDetails());
            car.setDescriptionInterior(dto.getDescription().getInterior());
            car.setDescriptionCraftsmanship(dto.getDescription().getCraftsmanship());
            car.setDescriptionConclusion(dto.getDescription().getConclusion());
        }

        // Pricing
        if (dto.getPricing() != null) {
            car.setPriceDaily(dto.getPricing().getDaily());
            car.setPriceTwoDays(dto.getPricing().getTwoDays());
            car.setPriceThreeDays(dto.getPricing().getThreeDays());
            car.setPriceWeekly(dto.getPricing().getWeekly());
            car.setPriceMonthly(dto.getPricing().getMonthly());
        }

        // Mileage Info
        if (dto.getMileageInfo() != null) {
            car.setMileageDailyLimit(dto.getMileageInfo().getDailyLimit());
            car.setMileageExcessFee(dto.getMileageInfo().getExcessFee());
            car.setMileageIncludedKm(dto.getMileageInfo().getIncludedKm());
        }

        return car;
    }

    public void updateEntityFromDTO(Car existingCar, CarDTO dto) {
        // Basic properties
        if (dto.getTitle() != null) existingCar.setTitle(dto.getTitle());
        if (dto.getBrand() != null) existingCar.setBrand(dto.getBrand());
        if (dto.getModel() != null) existingCar.setModel(dto.getModel());
        if (dto.getEngine() != null) existingCar.setEngine(dto.getEngine());
        if (dto.getPower() != null) existingCar.setPower(dto.getPower());
        if (dto.getAcceleration() != null) existingCar.setAcceleration(dto.getAcceleration());
        if (dto.getMaxSpeed() != null) existingCar.setMaxSpeed(dto.getMaxSpeed());
        if (dto.getFuelType() != null) existingCar.setFuelType(dto.getFuelType());
        if (dto.getTransmission() != null) existingCar.setTransmission(dto.getTransmission());
        if (dto.getDrivetrain() != null) existingCar.setDrivetrain(dto.getDrivetrain());
        if (dto.getType() != null) existingCar.setType(dto.getType());
        if (dto.getGrossPrice() != null) existingCar.setGrossPrice(dto.getGrossPrice());

        // Images
        if (dto.getImages() != null) {
            try {
                String imagesJson = objectMapper.writeValueAsString(dto.getImages());
                existingCar.setImages(imagesJson);
            } catch (JsonProcessingException e) {
                existingCar.setImages(String.join(",", dto.getImages()));
            }
        }

        // Description
        if (dto.getDescription() != null) {
            if (dto.getDescription().getTitle() != null) 
                existingCar.setDescriptionTitle(dto.getDescription().getTitle());
            if (dto.getDescription().getMainText() != null) 
                existingCar.setDescriptionMainText(dto.getDescription().getMainText());
            if (dto.getDescription().getPerformance() != null) 
                existingCar.setDescriptionPerformance(dto.getDescription().getPerformance());
            if (dto.getDescription().getAccelerationDetails() != null) 
                existingCar.setDescriptionAccelerationDetails(dto.getDescription().getAccelerationDetails());
            if (dto.getDescription().getInterior() != null) 
                existingCar.setDescriptionInterior(dto.getDescription().getInterior());
            if (dto.getDescription().getCraftsmanship() != null) 
                existingCar.setDescriptionCraftsmanship(dto.getDescription().getCraftsmanship());
            if (dto.getDescription().getConclusion() != null) 
                existingCar.setDescriptionConclusion(dto.getDescription().getConclusion());
        }

        // Pricing
        if (dto.getPricing() != null) {
            if (dto.getPricing().getDaily() != null) existingCar.setPriceDaily(dto.getPricing().getDaily());
            if (dto.getPricing().getTwoDays() != null) existingCar.setPriceTwoDays(dto.getPricing().getTwoDays());
            if (dto.getPricing().getThreeDays() != null) existingCar.setPriceThreeDays(dto.getPricing().getThreeDays());
            if (dto.getPricing().getWeekly() != null) existingCar.setPriceWeekly(dto.getPricing().getWeekly());
            if (dto.getPricing().getMonthly() != null) existingCar.setPriceMonthly(dto.getPricing().getMonthly());
        }

        // Mileage Info
        if (dto.getMileageInfo() != null) {
            if (dto.getMileageInfo().getDailyLimit() != null) 
                existingCar.setMileageDailyLimit(dto.getMileageInfo().getDailyLimit());
            if (dto.getMileageInfo().getExcessFee() != null) 
                existingCar.setMileageExcessFee(dto.getMileageInfo().getExcessFee());
            if (dto.getMileageInfo().getIncludedKm() != null) 
                existingCar.setMileageIncludedKm(dto.getMileageInfo().getIncludedKm());
        }
    }
}
