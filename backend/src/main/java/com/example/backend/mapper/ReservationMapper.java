package com.example.backend.mapper;

import com.example.backend.dto.CreateReservationDTO;
import com.example.backend.dto.ReservationDTO;
import com.example.backend.entity.Car;
import com.example.backend.entity.Reservation;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.temporal.ChronoUnit;

@Component
public class ReservationMapper {
    
    /**
     * Convert Reservation entity to ReservationDTO
     */
    public ReservationDTO toDTO(Reservation reservation) {
        if (reservation == null) {
            return null;
        }
        
        ReservationDTO dto = new ReservationDTO();
        dto.setId(reservation.getId());
        dto.setCarId(reservation.getCar().getId());
        dto.setFirstName(reservation.getFirstName());
        dto.setLastName(reservation.getLastName());
        dto.setEmail(reservation.getEmail());
        dto.setPhone(reservation.getPhone());
        dto.setStartDate(reservation.getStartDate());
        dto.setEndDate(reservation.getEndDate());
        dto.setTotalPrice(reservation.getTotalPrice());
        dto.setDailyRate(reservation.getDailyRate());
        dto.setNumberOfDays(reservation.getNumberOfDays());
        dto.setStatus(reservation.getStatus());
        dto.setNotes(reservation.getNotes());
        dto.setPickupLocation(reservation.getPickupLocation());
        dto.setDropoffLocation(reservation.getDropoffLocation());
        dto.setCreatedAt(reservation.getCreatedAt());
        dto.setUpdatedAt(reservation.getUpdatedAt());
        dto.setConfirmedAt(reservation.getConfirmedAt());
        dto.setCancelledAt(reservation.getCancelledAt());
        dto.setCancellationReason(reservation.getCancellationReason());
        
        // Set car information
        Car car = reservation.getCar();
        if (car != null) {
            dto.setCarTitle(car.getTitle());
            dto.setCarBrand(car.getBrand());
            dto.setCarModel(car.getModel());
        }
        
        return dto;
    }
    
    /**
     * Convert CreateReservationDTO to Reservation entity
     */
    public Reservation toEntity(CreateReservationDTO createDTO, Car car) {
        if (createDTO == null || car == null) {
            return null;
        }
        
        Reservation reservation = new Reservation();
        reservation.setCar(car);
        reservation.setFirstName(createDTO.getFirstName());
        reservation.setLastName(createDTO.getLastName());
        reservation.setEmail(createDTO.getEmail());
        reservation.setPhone(createDTO.getPhone());
        reservation.setStartDate(createDTO.getStartDate());
        reservation.setEndDate(createDTO.getEndDate());
        reservation.setNotes(createDTO.getNotes());
        reservation.setPickupLocation(createDTO.getPickupLocation());
        reservation.setDropoffLocation(createDTO.getDropoffLocation());
        
        // Calculate number of days and pricing
        int numberOfDays = calculateNumberOfDays(createDTO.getStartDate(), createDTO.getEndDate());
        reservation.setNumberOfDays(numberOfDays);
        
        BigDecimal dailyRate = getDailyRate(car, numberOfDays);
        reservation.setDailyRate(dailyRate);
        
        BigDecimal totalPrice = dailyRate.multiply(BigDecimal.valueOf(numberOfDays));
        reservation.setTotalPrice(totalPrice);
        
        return reservation;
    }
    
    /**
     * Calculate number of days between start and end date
     */
    private int calculateNumberOfDays(java.time.LocalDate startDate, java.time.LocalDate endDate) {
        return Math.max(1, (int) ChronoUnit.DAYS.between(startDate, endDate) + 1);
    }
    
    /**
     * Get daily rate based on car pricing and number of days
     */    private BigDecimal getDailyRate(Car car, int numberOfDays) {
        // Use car's pricing tiers based on rental duration
        // Only use pricing tier if it's greater than 0
        
        if (numberOfDays >= 30 && car.getPriceMonthly() != null && car.getPriceMonthly() > 0) {
            // Monthly rate (divide by 30 to get daily rate)
            return BigDecimal.valueOf(car.getPriceMonthly()).divide(BigDecimal.valueOf(30), 2, RoundingMode.HALF_UP);
        } else if (numberOfDays >= 7 && car.getPriceWeekly() != null && car.getPriceWeekly() > 0) {
            // Weekly rate (divide by 7 to get daily rate)
            return BigDecimal.valueOf(car.getPriceWeekly()).divide(BigDecimal.valueOf(7), 2, RoundingMode.HALF_UP);
        } else if (numberOfDays >= 3 && car.getPriceThreeDays() != null && car.getPriceThreeDays() > 0) {
            // Three days rate (divide by 3 to get daily rate)
            return BigDecimal.valueOf(car.getPriceThreeDays()).divide(BigDecimal.valueOf(3), 2, RoundingMode.HALF_UP);
        } else if (numberOfDays >= 2 && car.getPriceTwoDays() != null && car.getPriceTwoDays() > 0) {
            // Two days rate (divide by 2 to get daily rate)
            return BigDecimal.valueOf(car.getPriceTwoDays()).divide(BigDecimal.valueOf(2), 2, RoundingMode.HALF_UP);
        } else if (car.getPriceDaily() != null && car.getPriceDaily() > 0) {
            // Daily rate
            return BigDecimal.valueOf(car.getPriceDaily());
        } else {
            // Fallback to gross price as daily rate
            return BigDecimal.valueOf(car.getGrossPrice());
        }
    }
}
