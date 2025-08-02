package com.example.backend.repository;

import com.example.backend.entity.Reservation;
import com.example.backend.entity.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    
    /**
     * Find all reservations for a specific car
     */
    List<Reservation> findByCarIdOrderByStartDateDesc(String carId);
    
    /**
     * Count reservations for a specific car
     */
    long countByCarId(String carId);
    
    /**
     * Find all reservations by status
     */
    List<Reservation> findByStatusOrderByCreatedAtDesc(ReservationStatus status);
    
    /**
     * Find reservations by customer email
     */
    List<Reservation> findByEmailOrderByCreatedAtDesc(String email);
    
    /**
     * Find active reservations (PENDING or CONFIRMED) for a specific car
     */
    @Query("SELECT r FROM Reservation r WHERE r.car.id = :carId AND r.status IN ('PENDING', 'CONFIRMED') ORDER BY r.startDate")
    List<Reservation> findActiveReservationsByCarId(@Param("carId") String carId);
    
    /**
     * Check if a car is available for the given date range
     * Returns true if there are NO conflicting reservations
     */
    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.car.id = :carId " +
           "AND r.status IN ('PENDING', 'CONFIRMED') " +
           "AND NOT (r.endDate < :startDate OR r.startDate > :endDate)")
    long countConflictingReservations(@Param("carId") String carId, 
                                     @Param("startDate") LocalDate startDate, 
                                     @Param("endDate") LocalDate endDate);
    
    /**
     * Find reservations that overlap with the given date range for a specific car
     */
    @Query("SELECT r FROM Reservation r WHERE r.car.id = :carId " +
           "AND r.status IN ('PENDING', 'CONFIRMED') " +
           "AND NOT (r.endDate < :startDate OR r.startDate > :endDate)")
    List<Reservation> findOverlappingReservations(@Param("carId") String carId, 
                                                 @Param("startDate") LocalDate startDate, 
                                                 @Param("endDate") LocalDate endDate);
    
    /**
     * Find reservations by date range
     */
    @Query("SELECT r FROM Reservation r WHERE r.startDate >= :startDate AND r.endDate <= :endDate ORDER BY r.startDate")
    List<Reservation> findReservationsByDateRange(@Param("startDate") LocalDate startDate, 
                                                  @Param("endDate") LocalDate endDate);
    
    /**
     * Find reservations starting in the next N days (for notifications)
     */
    @Query("SELECT r FROM Reservation r WHERE r.status = 'CONFIRMED' " +
           "AND r.startDate BETWEEN :today AND :futureDate ORDER BY r.startDate")
    List<Reservation> findUpcomingReservations(@Param("today") LocalDate today, 
                                              @Param("futureDate") LocalDate futureDate);
    
    /**
     * Find reservations ending in the next N days (for notifications)
     */
    @Query("SELECT r FROM Reservation r WHERE r.status = 'CONFIRMED' " +
           "AND r.endDate BETWEEN :today AND :futureDate ORDER BY r.endDate")
    List<Reservation> findEndingReservations(@Param("today") LocalDate today, 
                                            @Param("futureDate") LocalDate futureDate);
    
    /**
     * Find reservations that should be completed (past end date but still confirmed)
     */
    @Query("SELECT r FROM Reservation r WHERE r.status = 'CONFIRMED' AND r.endDate < :today")
    List<Reservation> findReservationsToComplete(@Param("today") LocalDate today);
    
    /**
     * Get reservation statistics
     */
    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.status = :status")
    long countByStatus(@Param("status") ReservationStatus status);
    
    /**
     * Get total revenue from completed reservations
     */
    @Query("SELECT COALESCE(SUM(r.totalPrice), 0) FROM Reservation r WHERE r.status = 'COMPLETED'")
    Double getTotalRevenue();
    
    /**
     * Find reservations by car ID and status
     */
    List<Reservation> findByCarIdAndStatusOrderByStartDateDesc(String carId, ReservationStatus status);
    
    /**
     * Find reservations by customer phone
     */
    List<Reservation> findByPhoneOrderByCreatedAtDesc(String phone);
    
    /**
     * Check if reservation exists for given parameters (to prevent duplicates)
     */
    @Query("SELECT r FROM Reservation r WHERE r.car.id = :carId AND r.email = :email " +
           "AND r.startDate = :startDate AND r.endDate = :endDate AND r.status IN ('PENDING', 'CONFIRMED')")
    Optional<Reservation> findExistingReservation(@Param("carId") String carId, 
                                                 @Param("email") String email,
                                                 @Param("startDate") LocalDate startDate, 
                                                 @Param("endDate") LocalDate endDate);
}
