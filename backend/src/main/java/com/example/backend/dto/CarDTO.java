package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public class CarDTO {

    private String id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotBlank(message = "Model is required")
    private String model;

    @NotBlank(message = "Engine is required")
    private String engine;

    @NotNull(message = "Power is required")
    @Positive(message = "Power must be positive")
    private Integer power;

    @NotNull(message = "Acceleration is required")
    @Positive(message = "Acceleration must be positive")
    private Double acceleration;

    @NotNull(message = "Max speed is required")
    @Positive(message = "Max speed must be positive")
    private Integer maxSpeed;

    @NotBlank(message = "Fuel type is required")
    private String fuelType;

    @NotBlank(message = "Transmission is required")
    private String transmission;

    @NotBlank(message = "Drivetrain is required")
    private String drivetrain;

    @NotBlank(message = "Type is required")
    private String type;

    @NotNull(message = "Gross price is required")
    @Positive(message = "Gross price must be positive")
    private Integer grossPrice;

    private List<String> images;
    private CarDescriptionDTO description;
    private CarPricingDTO pricing;
    private CarMileageInfoDTO mileageInfo;

    // Constructors
    public CarDTO() {}

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getEngine() {
        return engine;
    }

    public void setEngine(String engine) {
        this.engine = engine;
    }

    public Integer getPower() {
        return power;
    }

    public void setPower(Integer power) {
        this.power = power;
    }

    public Double getAcceleration() {
        return acceleration;
    }

    public void setAcceleration(Double acceleration) {
        this.acceleration = acceleration;
    }

    public Integer getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(Integer maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public String getDrivetrain() {
        return drivetrain;
    }

    public void setDrivetrain(String drivetrain) {
        this.drivetrain = drivetrain;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getGrossPrice() {
        return grossPrice;
    }

    public void setGrossPrice(Integer grossPrice) {
        this.grossPrice = grossPrice;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public CarDescriptionDTO getDescription() {
        return description;
    }

    public void setDescription(CarDescriptionDTO description) {
        this.description = description;
    }

    public CarPricingDTO getPricing() {
        return pricing;
    }

    public void setPricing(CarPricingDTO pricing) {
        this.pricing = pricing;
    }

    public CarMileageInfoDTO getMileageInfo() {
        return mileageInfo;
    }

    public void setMileageInfo(CarMileageInfoDTO mileageInfo) {
        this.mileageInfo = mileageInfo;
    }

    // Nested DTOs
    public static class CarDescriptionDTO {
        private String title;
        private String mainText;
        private String performance;
        private String accelerationDetails;
        private String interior;
        private String craftsmanship;
        private String conclusion;

        // Getters and Setters
        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getMainText() {
            return mainText;
        }

        public void setMainText(String mainText) {
            this.mainText = mainText;
        }

        public String getPerformance() {
            return performance;
        }

        public void setPerformance(String performance) {
            this.performance = performance;
        }

        public String getAccelerationDetails() {
            return accelerationDetails;
        }

        public void setAccelerationDetails(String accelerationDetails) {
            this.accelerationDetails = accelerationDetails;
        }

        public String getInterior() {
            return interior;
        }

        public void setInterior(String interior) {
            this.interior = interior;
        }

        public String getCraftsmanship() {
            return craftsmanship;
        }

        public void setCraftsmanship(String craftsmanship) {
            this.craftsmanship = craftsmanship;
        }

        public String getConclusion() {
            return conclusion;
        }

        public void setConclusion(String conclusion) {
            this.conclusion = conclusion;
        }
    }

    public static class CarPricingDTO {
        private Integer daily;
        private Integer twoDays;
        private Integer threeDays;
        private Integer weekly;
        private Integer monthly;

        // Getters and Setters
        public Integer getDaily() {
            return daily;
        }

        public void setDaily(Integer daily) {
            this.daily = daily;
        }

        public Integer getTwoDays() {
            return twoDays;
        }

        public void setTwoDays(Integer twoDays) {
            this.twoDays = twoDays;
        }

        public Integer getThreeDays() {
            return threeDays;
        }

        public void setThreeDays(Integer threeDays) {
            this.threeDays = threeDays;
        }

        public Integer getWeekly() {
            return weekly;
        }

        public void setWeekly(Integer weekly) {
            this.weekly = weekly;
        }

        public Integer getMonthly() {
            return monthly;
        }

        public void setMonthly(Integer monthly) {
            this.monthly = monthly;
        }
    }

    public static class CarMileageInfoDTO {
        private Integer dailyLimit;
        private Integer excessFee;
        private String includedKm;

        // Getters and Setters
        public Integer getDailyLimit() {
            return dailyLimit;
        }

        public void setDailyLimit(Integer dailyLimit) {
            this.dailyLimit = dailyLimit;
        }

        public Integer getExcessFee() {
            return excessFee;
        }

        public void setExcessFee(Integer excessFee) {
            this.excessFee = excessFee;
        }

        public String getIncludedKm() {
            return includedKm;
        }

        public void setIncludedKm(String includedKm) {
            this.includedKm = includedKm;
        }
    }
}
