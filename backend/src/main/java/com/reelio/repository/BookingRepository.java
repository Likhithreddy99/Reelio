package com.reelio.repository;

import com.reelio.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByClientId(Long clientId);
    List<Booking> findByCinematographerId(Long cinematographerId);
    List<Booking> findByCinematographerIdAndBookingDate(Long cinematographerId, java.time.LocalDate bookingDate);
}
