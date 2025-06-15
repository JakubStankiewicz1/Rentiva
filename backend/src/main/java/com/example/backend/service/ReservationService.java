package com.example.backend.service;

import com.example.backend.dto.AvailabilityCheckDTO;
import com.example.backend.dto.CreateReservationDTO;
import com.example.backend.dto.ReservationDTO;
import com.example.backend.entity.Car;
import com.example.backend.entity.Reservation;
import com.example.backend.entity.ReservationStatus;
import com.example.backend.exception.CarNotFoundException;
import com.example.backend.exception.ReservationNotFoundException;
import com.example.backend.mapper.ReservationMapper;
import com.example.backend.repository.CarRepository;
import com.example.backend.repository.ReservationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservationService {
    
    private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);
    
    private final ReservationRepository reservationRepository;
    private final CarRepository carRepository;
    private final ReservationMapper reservationMapper;
    
    public ReservationService(ReservationRepository reservationRepository, 
                             CarRepository carRepository, 
                             ReservationMapper reservationMapper) {
        this.reservationRepository = reservationRepository;
        this.carRepository = carRepository;
        this.reservationMapper = reservationMapper;
    }
    
    /**
     * Create a new reservation
     */
    public ReservationDTO createReservation(CreateReservationDTO createDTO) {
        logger.info("Creating reservation for car {} from {} to {}", 
                   createDTO.getCarId(), createDTO.getStartDate(), createDTO.getEndDate());
        
        // Validate dates
        validateReservationDates(createDTO.getStartDate(), createDTO.getEndDate());
        
        // Check if car exists
        Car car = carRepository.findById(createDTO.getCarId())
                .orElseThrow(() -> new CarNotFoundException("Car not found with ID: " + createDTO.getCarId()));
        
        // Check for duplicate reservation
        Optional<Reservation> existingReservation = reservationRepository.findExistingReservation(
                createDTO.getCarId(), createDTO.getEmail(), 
                createDTO.getStartDate(), createDTO.getEndDate());
        
        if (existingReservation.isPresent()) {
            throw new IllegalStateException("A reservation already exists for this car, customer, and date range");
        }
        
        // Check car availability
        if (!isCarAvailable(createDTO.getCarId(), createDTO.getStartDate(), createDTO.getEndDate())) {
            throw new IllegalStateException("Car is not available for the requested dates");
        }
        
        // Create reservation
        Reservation reservation = reservationMapper.toEntity(createDTO, car);
        Reservation savedReservation = reservationRepository.save(reservation);
        
        logger.info("Reservation created successfully with ID: {}", savedReservation.getId());
        return reservationMapper.toDTO(savedReservation);
    }
    
    /**
     * Get reservation by ID
     */
    @Transactional(readOnly = true)
    public ReservationDTO getReservationById(Long id) {
        logger.debug("Fetching reservation with ID: {}", id);
        
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation not found with ID: " + id));
        
        return reservationMapper.toDTO(reservation);
    }
    
    /**
     * Get all reservations
     */
    @Transactional(readOnly = true)
    public List<ReservationDTO> getAllReservations() {
        logger.debug("Fetching all reservations");
        
        return reservationRepository.findAll().stream()
                .map(reservationMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get reservations by status
     */
    @Transactional(readOnly = true)
    public List<ReservationDTO> getReservationsByStatus(ReservationStatus status) {
        logger.debug("Fetching reservations with status: {}", status);
        
        return reservationRepository.findByStatusOrderByCreatedAtDesc(status).stream()
                .map(reservationMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get reservations for a specific car
     */
    @Transactional(readOnly = true)
    public List<ReservationDTO> getReservationsByCarId(String carId) {
        logger.debug("Fetching reservations for car: {}", carId);
        
        // Verify car exists
        if (!carRepository.existsById(carId)) {
            throw new CarNotFoundException("Car not found with ID: " + carId);
        }
        
        return reservationRepository.findByCarIdOrderByStartDateDesc(carId).stream()
                .map(reservationMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get reservations by customer email
     */
    @Transactional(readOnly = true)
    public List<ReservationDTO> getReservationsByEmail(String email) {
        logger.debug("Fetching reservations for email: {}", email);
        
        return reservationRepository.findByEmailOrderByCreatedAtDesc(email).stream()
                .map(reservationMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Check if a car is available for the given date range
     */
    @Transactional(readOnly = true)
    public boolean isCarAvailable(String carId, LocalDate startDate, LocalDate endDate) {
        logger.debug("Checking availability for car {} from {} to {}", carId, startDate, endDate);
        
        // Verify car exists
        if (!carRepository.existsById(carId)) {
            throw new CarNotFoundException("Car not found with ID: " + carId);
        }
        
        validateReservationDates(startDate, endDate);
        
        long conflictingReservations = reservationRepository.countConflictingReservations(carId, startDate, endDate);
        boolean isAvailable = conflictingReservations == 0;
        
        logger.debug("Car {} availability from {} to {}: {}", carId, startDate, endDate, isAvailable);
        return isAvailable;
    }
    
    /**
     * Get conflicting reservations for a date range
     */
    @Transactional(readOnly = true)
    public List<ReservationDTO> getConflictingReservations(String carId, LocalDate startDate, LocalDate endDate) {
        logger.debug("Finding conflicting reservations for car {} from {} to {}", carId, startDate, endDate);
        
        return reservationRepository.findOverlappingReservations(carId, startDate, endDate).stream()
                .map(reservationMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Confirm a reservation
     */
    public ReservationDTO confirmReservation(Long id) {
        logger.info("Confirming reservation with ID: {}", id);
        
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation not found with ID: " + id));
        
        if (!reservation.getStatus().canBeConfirmed()) {
            throw new IllegalStateException("Reservation cannot be confirmed. Current status: " + reservation.getStatus());
        }
        
        // Double-check availability before confirming
        if (!isCarAvailable(reservation.getCar().getId(), reservation.getStartDate(), reservation.getEndDate())) {
            throw new IllegalStateException("Car is no longer available for the requested dates");
        }
        
        reservation.confirm();
        Reservation savedReservation = reservationRepository.save(reservation);
        
        logger.info("Reservation {} confirmed successfully", id);
        return reservationMapper.toDTO(savedReservation);
    }
    
    /**
     * Cancel a reservation
     */
    public ReservationDTO cancelReservation(Long id, String reason) {
        logger.info("Cancelling reservation with ID: {} for reason: {}", id, reason);
        
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation not found with ID: " + id));
        
        if (!reservation.getStatus().canBeCancelled()) {
            throw new IllegalStateException("Reservation cannot be cancelled. Current status: " + reservation.getStatus());
        }
        
        reservation.cancel(reason);
        Reservation savedReservation = reservationRepository.save(reservation);
        
        logger.info("Reservation {} cancelled successfully", id);
        return reservationMapper.toDTO(savedReservation);
    }
    
    /**
     * Complete a reservation
     */
    public ReservationDTO completeReservation(Long id) {
        logger.info("Completing reservation with ID: {}", id);
        
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation not found with ID: " + id));
        
        if (!reservation.getStatus().canBeCompleted()) {
            throw new IllegalStateException("Reservation cannot be completed. Current status: " + reservation.getStatus());
        }
        
        reservation.complete();
        Reservation savedReservation = reservationRepository.save(reservation);
        
        logger.info("Reservation {} completed successfully", id);
        return reservationMapper.toDTO(savedReservation);
    }
    
    /**
     * Get upcoming reservations (starting in the next N days)
     */
    @Transactional(readOnly = true)
    public List<ReservationDTO> getUpcomingReservations(int daysAhead) {
        LocalDate today = LocalDate.now();
        LocalDate futureDate = today.plusDays(daysAhead);
        
        return reservationRepository.findUpcomingReservations(today, futureDate).stream()
                .map(reservationMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get reservations ending soon (ending in the next N days)
     */
    @Transactional(readOnly = true)
    public List<ReservationDTO> getEndingReservations(int daysAhead) {
        LocalDate today = LocalDate.now();
        LocalDate futureDate = today.plusDays(daysAhead);
        
        return reservationRepository.findEndingReservations(today, futureDate).stream()
                .map(reservationMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Auto-complete overdue reservations
     */
    public List<ReservationDTO> autoCompleteOverdueReservations() {
        logger.info("Auto-completing overdue reservations");
        
        LocalDate today = LocalDate.now();
        List<Reservation> overdueReservations = reservationRepository.findReservationsToComplete(today);
        
        return overdueReservations.stream()
                .map(reservation -> {
                    reservation.complete();
                    Reservation savedReservation = reservationRepository.save(reservation);
                    logger.debug("Auto-completed reservation ID: {}", savedReservation.getId());
                    return reservationMapper.toDTO(savedReservation);
                })
                .collect(Collectors.toList());
    }
    
    /**
     * Get reservation statistics
     */
    @Transactional(readOnly = true)
    public ReservationStatistics getReservationStatistics() {
        logger.debug("Calculating reservation statistics");
        
        long totalReservations = reservationRepository.count();
        long pendingReservations = reservationRepository.countByStatus(ReservationStatus.PENDING);
        long confirmedReservations = reservationRepository.countByStatus(ReservationStatus.CONFIRMED);
        long cancelledReservations = reservationRepository.countByStatus(ReservationStatus.CANCELLED);
        long completedReservations = reservationRepository.countByStatus(ReservationStatus.COMPLETED);
        Double totalRevenue = reservationRepository.getTotalRevenue();
        
        return new ReservationStatistics(
                totalReservations, pendingReservations, confirmedReservations,
                cancelledReservations, completedReservations, totalRevenue != null ? totalRevenue : 0.0
        );
    }
    
    /**
     * Delete a reservation (only if PENDING or CANCELLED)
     */
    public void deleteReservation(Long id) {
        logger.info("Deleting reservation with ID: {}", id);
        
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation not found with ID: " + id));
        
        if (reservation.getStatus() == ReservationStatus.CONFIRMED || 
            reservation.getStatus() == ReservationStatus.COMPLETED) {
            throw new IllegalStateException("Cannot delete confirmed or completed reservations");
        }
        
        reservationRepository.delete(reservation);
        logger.info("Reservation {} deleted successfully", id);
    }
    
    /**
     * Update reservation status
     */
    public ReservationDTO updateReservationStatus(Long id, ReservationStatus newStatus) {
        logger.info("Updating reservation {} status to {}", id, newStatus);
        
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation not found with id: " + id));
        
        ReservationStatus oldStatus = reservation.getStatus();
        reservation.setStatus(newStatus);
        
        // Update modification time
        reservation.setUpdatedAt(LocalDateTime.now());
        
        Reservation savedReservation = reservationRepository.save(reservation);
        
        logger.info("Reservation {} status updated from {} to {}", id, oldStatus, newStatus);
        
        return reservationMapper.toDTO(savedReservation);
    }

    /**
     * Validate reservation dates
     */
    private void validateReservationDates(LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("Start date and end date are required");
        }
        
        if (startDate.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Start date cannot be in the past");
        }
        
        if (endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }
        
        if (endDate.equals(startDate)) {
            // Allow same-day rentals but log a warning
            logger.warn("Same-day rental requested: {}", startDate);
        }
    }
    
    /**
     * Inner class for reservation statistics
     */
    public static class ReservationStatistics {
        private final long totalReservations;
        private final long pendingReservations;
        private final long confirmedReservations;
        private final long cancelledReservations;
        private final long completedReservations;
        private final double totalRevenue;
        
        public ReservationStatistics(long totalReservations, long pendingReservations, 
                                   long confirmedReservations, long cancelledReservations,
                                   long completedReservations, double totalRevenue) {
            this.totalReservations = totalReservations;
            this.pendingReservations = pendingReservations;
            this.confirmedReservations = confirmedReservations;
            this.cancelledReservations = cancelledReservations;
            this.completedReservations = completedReservations;
            this.totalRevenue = totalRevenue;
        }
        
        // Getters
        public long getTotalReservations() { return totalReservations; }
        public long getPendingReservations() { return pendingReservations; }
        public long getConfirmedReservations() { return confirmedReservations; }
        public long getCancelledReservations() { return cancelledReservations; }
        public long getCompletedReservations() { return completedReservations; }
        public double getTotalRevenue() { return totalRevenue; }
    }
}
