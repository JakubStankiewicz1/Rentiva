package com.example.backend.controller;

import com.example.backend.dto.AvailabilityCheckDTO;
import com.example.backend.dto.CreateReservationDTO;
import com.example.backend.dto.ReservationDTO;
import com.example.backend.entity.ReservationStatus;
import com.example.backend.service.ReservationService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"})
public class ReservationController {
    
    private static final Logger logger = LoggerFactory.getLogger(ReservationController.class);
    
    private final ReservationService reservationService;
    
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }
    
    /**
     * Create a new reservation
     */
    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(
            @Valid @RequestBody CreateReservationDTO createReservationDTO) {
        
        logger.info("Creating new reservation for car: {}", createReservationDTO.getCarId());
        
        try {
            ReservationDTO reservation = reservationService.createReservation(createReservationDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(reservation);
        } catch (Exception e) {
            logger.error("Error creating reservation: {}", e.getMessage());
            throw e;
        }
    }
    
    /**
     * Get all reservations
     */
    @GetMapping
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
        logger.debug("Fetching all reservations");
        
        List<ReservationDTO> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }
    
    /**
     * Get reservation by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservationById(@PathVariable Long id) {
        
        logger.debug("Fetching reservation with ID: {}", id);
        
        ReservationDTO reservation = reservationService.getReservationById(id);
        return ResponseEntity.ok(reservation);
    }
    
    /**
     * Get reservations by status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByStatus(@PathVariable ReservationStatus status) {
        
        logger.debug("Fetching reservations with status: {}", status);
        
        List<ReservationDTO> reservations = reservationService.getReservationsByStatus(status);
        return ResponseEntity.ok(reservations);
    }
    
    /**
     * Get reservations for a specific car
     */
    @GetMapping("/car/{carId}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByCarId(@PathVariable String carId) {
        
        logger.debug("Fetching reservations for car: {}", carId);
        
        List<ReservationDTO> reservations = reservationService.getReservationsByCarId(carId);
        return ResponseEntity.ok(reservations);
    }
    
    /**
     * Get reservations by customer email
     */
    @GetMapping("/customer/{email}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByEmail(@PathVariable String email) {
        
        logger.debug("Fetching reservations for email: {}", email);
        
        List<ReservationDTO> reservations = reservationService.getReservationsByEmail(email);
        return ResponseEntity.ok(reservations);
    }
    
    /**
     * Check car availability
     */
    @GetMapping("/availability/{carId}")
    public ResponseEntity<Map<String, Object>> checkCarAvailability(
            @PathVariable String carId,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        
        logger.debug("Checking availability for car {} from {} to {}", carId, startDate, endDate);
        
        boolean isAvailable = reservationService.isCarAvailable(carId, startDate, endDate);
        List<ReservationDTO> conflictingReservations = reservationService.getConflictingReservations(carId, startDate, endDate);
        
        Map<String, Object> response = Map.of(
            "available", isAvailable,
            "carId", carId,
            "startDate", startDate,
            "endDate", endDate,
            "conflictingReservations", conflictingReservations
        );
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Confirm a reservation
     */
    @PutMapping("/{id}/confirm")
    public ResponseEntity<ReservationDTO> confirmReservation(@PathVariable Long id) {
        
        logger.info("Confirming reservation with ID: {}", id);
        
        ReservationDTO reservation = reservationService.confirmReservation(id);
        return ResponseEntity.ok(reservation);
    }
    
    /**
     * Cancel a reservation
     */
    @PutMapping("/{id}/cancel")
    public ResponseEntity<ReservationDTO> cancelReservation(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> requestBody) {
        
        String reason = requestBody != null ? requestBody.get("reason") : "No reason provided";
        logger.info("Cancelling reservation with ID: {} for reason: {}", id, reason);
        
        ReservationDTO reservation = reservationService.cancelReservation(id, reason);
        return ResponseEntity.ok(reservation);
    }
    
    /**
     * Complete a reservation
     */
    @PutMapping("/{id}/complete")
    public ResponseEntity<ReservationDTO> completeReservation(@PathVariable Long id) {
        
        logger.info("Completing reservation with ID: {}", id);
        
        ReservationDTO reservation = reservationService.completeReservation(id);
        return ResponseEntity.ok(reservation);
    }
    
    /**
     * Get upcoming reservations
     */
    @GetMapping("/upcoming")
    public ResponseEntity<List<ReservationDTO>> getUpcomingReservations(
            @RequestParam(defaultValue = "7") int daysAhead) {
        
        logger.debug("Fetching upcoming reservations for next {} days", daysAhead);
        
        List<ReservationDTO> reservations = reservationService.getUpcomingReservations(daysAhead);
        return ResponseEntity.ok(reservations);
    }
    
    /**
     * Get reservations ending soon
     */
    @GetMapping("/ending-soon")
    public ResponseEntity<List<ReservationDTO>> getEndingReservations(
            @RequestParam(defaultValue = "3") int daysAhead) {
        
        logger.debug("Fetching reservations ending in next {} days", daysAhead);
        
        List<ReservationDTO> reservations = reservationService.getEndingReservations(daysAhead);
        return ResponseEntity.ok(reservations);
    }
    
    /**
     * Get reservation statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<ReservationService.ReservationStatistics> getReservationStatistics() {
        logger.debug("Fetching reservation statistics");
        
        ReservationService.ReservationStatistics stats = reservationService.getReservationStatistics();
        return ResponseEntity.ok(stats);
    }
    
    /**
     * Auto-complete overdue reservations
     */
    @PostMapping("/auto-complete")
    public ResponseEntity<List<ReservationDTO>> autoCompleteOverdueReservations() {
        logger.info("Auto-completing overdue reservations");
        
        List<ReservationDTO> completedReservations = reservationService.autoCompleteOverdueReservations();
        return ResponseEntity.ok(completedReservations);
    }
    
    /**
     * Delete a reservation
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        
        logger.info("Deleting reservation with ID: {}", id);
        
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
    
    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "ReservationService",
            "timestamp", java.time.LocalDateTime.now().toString()
        ));
    }
}
