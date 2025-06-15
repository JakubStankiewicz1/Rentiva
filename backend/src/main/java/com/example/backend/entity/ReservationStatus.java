package com.example.backend.entity;

/**
 * Enumeration representing the different statuses of a car reservation.
 */
public enum ReservationStatus {
    /**
     * Reservation has been created but not yet confirmed
     */
    PENDING,
    
    /**
     * Reservation has been confirmed and is active
     */
    CONFIRMED,
    
    /**
     * Reservation has been cancelled
     */
    CANCELLED,
    
    /**
     * Reservation has been completed (car returned)
     */
    COMPLETED;
    
    /**
     * Check if the status represents an active reservation
     * @return true if the reservation is active (PENDING or CONFIRMED)
     */
    public boolean isActive() {
        return this == PENDING || this == CONFIRMED;
    }
    
    /**
     * Check if the status allows cancellation
     * @return true if the reservation can be cancelled
     */
    public boolean canBeCancelled() {
        return this == PENDING || this == CONFIRMED;
    }
    
    /**
     * Check if the status allows confirmation
     * @return true if the reservation can be confirmed
     */
    public boolean canBeConfirmed() {
        return this == PENDING;
    }
    
    /**
     * Check if the status allows completion
     * @return true if the reservation can be completed
     */
    public boolean canBeCompleted() {
        return this == CONFIRMED;
    }
}
