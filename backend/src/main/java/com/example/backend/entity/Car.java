package com.example.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "cars")
public class Car {

    @Id
    @Column(name = "id")
    private String id;

    @NotBlank(message = "Title is required")
    @Column(name = "title", nullable = false)
    private String title;

    @NotBlank(message = "Brand is required")
    @Column(name = "brand", nullable = false)
    private String brand;

    @NotBlank(message = "Model is required")
    @Column(name = "model", nullable = false)
    private String model;

    @NotBlank(message = "Engine is required")
    @Column(name = "engine", nullable = false)
    private String engine;

    @NotNull(message = "Power is required")
    @Positive(message = "Power must be positive")
    @Column(name = "power", nullable = false)
    private Integer power;

    @NotNull(message = "Acceleration is required")
    @Positive(message = "Acceleration must be positive")
    @Column(name = "acceleration", nullable = false)
    private Double acceleration;

    @NotNull(message = "Max speed is required")
    @Positive(message = "Max speed must be positive")
    @Column(name = "max_speed", nullable = false)
    private Integer maxSpeed;

    @NotBlank(message = "Fuel type is required")
    @Column(name = "fuel_type", nullable = false)
    private String fuelType;

    @NotBlank(message = "Transmission is required")
    @Column(name = "transmission", nullable = false)
    private String transmission;

    @NotBlank(message = "Drivetrain is required")
    @Column(name = "drivetrain", nullable = false)
    private String drivetrain;

    @NotBlank(message = "Type is required")
    @Column(name = "type", nullable = false)
    private String type;

    @NotNull(message = "Gross price is required")
    @Positive(message = "Gross price must be positive")
    @Column(name = "gross_price", nullable = false)
    private Integer grossPrice;

    // Images as JSON string array
    @Column(name = "images", columnDefinition = "TEXT")
    private String images;

    // Description fields
    @Column(name = "description_title", columnDefinition = "TEXT")
    private String descriptionTitle;

    @Column(name = "description_main_text", columnDefinition = "TEXT")
    private String descriptionMainText;

    @Column(name = "description_performance", columnDefinition = "TEXT")
    private String descriptionPerformance;

    @Column(name = "description_acceleration_details", columnDefinition = "TEXT")
    private String descriptionAccelerationDetails;

    @Column(name = "description_interior", columnDefinition = "TEXT")
    private String descriptionInterior;

    @Column(name = "description_craftsmanship", columnDefinition = "TEXT")
    private String descriptionCraftsmanship;

    @Column(name = "description_conclusion", columnDefinition = "TEXT")
    private String descriptionConclusion;

    // Pricing fields
    @Column(name = "price_daily")
    private Integer priceDaily;

    @Column(name = "price_two_days")
    private Integer priceTwoDays;

    @Column(name = "price_three_days")
    private Integer priceThreeDays;

    @Column(name = "price_weekly")
    private Integer priceWeekly;

    @Column(name = "price_monthly")
    private Integer priceMonthly;

    // Mileage info fields
    @Column(name = "mileage_daily_limit")
    private Integer mileageDailyLimit;

    @Column(name = "mileage_excess_fee")
    private Integer mileageExcessFee;

    @Column(name = "mileage_included_km")
    private String mileageIncludedKm;

    // Constructors
    public Car() {}

    public Car(String id, String title, String brand, String model, String engine, 
               Integer power, Double acceleration, Integer maxSpeed, String fuelType, 
               String transmission, String drivetrain, String type, Integer grossPrice) {
        this.id = id;
        this.title = title;
        this.brand = brand;
        this.model = model;
        this.engine = engine;
        this.power = power;
        this.acceleration = acceleration;
        this.maxSpeed = maxSpeed;
        this.fuelType = fuelType;
        this.transmission = transmission;
        this.drivetrain = drivetrain;
        this.type = type;
        this.grossPrice = grossPrice;
    }

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

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public String getDescriptionTitle() {
        return descriptionTitle;
    }

    public void setDescriptionTitle(String descriptionTitle) {
        this.descriptionTitle = descriptionTitle;
    }

    public String getDescriptionMainText() {
        return descriptionMainText;
    }

    public void setDescriptionMainText(String descriptionMainText) {
        this.descriptionMainText = descriptionMainText;
    }

    public String getDescriptionPerformance() {
        return descriptionPerformance;
    }

    public void setDescriptionPerformance(String descriptionPerformance) {
        this.descriptionPerformance = descriptionPerformance;
    }

    public String getDescriptionAccelerationDetails() {
        return descriptionAccelerationDetails;
    }

    public void setDescriptionAccelerationDetails(String descriptionAccelerationDetails) {
        this.descriptionAccelerationDetails = descriptionAccelerationDetails;
    }

    public String getDescriptionInterior() {
        return descriptionInterior;
    }

    public void setDescriptionInterior(String descriptionInterior) {
        this.descriptionInterior = descriptionInterior;
    }

    public String getDescriptionCraftsmanship() {
        return descriptionCraftsmanship;
    }

    public void setDescriptionCraftsmanship(String descriptionCraftsmanship) {
        this.descriptionCraftsmanship = descriptionCraftsmanship;
    }

    public String getDescriptionConclusion() {
        return descriptionConclusion;
    }

    public void setDescriptionConclusion(String descriptionConclusion) {
        this.descriptionConclusion = descriptionConclusion;
    }

    public Integer getPriceDaily() {
        return priceDaily;
    }

    public void setPriceDaily(Integer priceDaily) {
        this.priceDaily = priceDaily;
    }

    public Integer getPriceTwoDays() {
        return priceTwoDays;
    }

    public void setPriceTwoDays(Integer priceTwoDays) {
        this.priceTwoDays = priceTwoDays;
    }

    public Integer getPriceThreeDays() {
        return priceThreeDays;
    }

    public void setPriceThreeDays(Integer priceThreeDays) {
        this.priceThreeDays = priceThreeDays;
    }

    public Integer getPriceWeekly() {
        return priceWeekly;
    }

    public void setPriceWeekly(Integer priceWeekly) {
        this.priceWeekly = priceWeekly;
    }

    public Integer getPriceMonthly() {
        return priceMonthly;
    }

    public void setPriceMonthly(Integer priceMonthly) {
        this.priceMonthly = priceMonthly;
    }

    public Integer getMileageDailyLimit() {
        return mileageDailyLimit;
    }

    public void setMileageDailyLimit(Integer mileageDailyLimit) {
        this.mileageDailyLimit = mileageDailyLimit;
    }

    public Integer getMileageExcessFee() {
        return mileageExcessFee;
    }

    public void setMileageExcessFee(Integer mileageExcessFee) {
        this.mileageExcessFee = mileageExcessFee;
    }

    public String getMileageIncludedKm() {
        return mileageIncludedKm;
    }

    public void setMileageIncludedKm(String mileageIncludedKm) {
        this.mileageIncludedKm = mileageIncludedKm;
    }

    @Override
    public String toString() {
        return "Car{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", engine='" + engine + '\'' +
                ", power=" + power +
                ", acceleration=" + acceleration +
                ", maxSpeed=" + maxSpeed +
                ", fuelType='" + fuelType + '\'' +
                ", transmission='" + transmission + '\'' +
                ", drivetrain='" + drivetrain + '\'' +
                ", type='" + type + '\'' +
                ", grossPrice=" + grossPrice +
                '}';
    }
}
