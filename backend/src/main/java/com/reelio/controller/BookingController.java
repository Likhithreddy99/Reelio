package com.reelio.controller;

import com.reelio.dto.BookingRequest;
import com.reelio.dto.BookingResponse;
import com.reelio.model.User;
import com.reelio.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @AuthenticationPrincipal User user,
            @RequestBody BookingRequest request) {
        if (!user.getRole().name().equals("CLIENT")) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(bookingService.createBooking(user.getId(), request));
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingResponse>> getClientBookings(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(bookingService.getClientBookings(user.getId()));
    }

    @GetMapping("/my-schedule")
    public ResponseEntity<List<BookingResponse>> getCinematographerBookings(@AuthenticationPrincipal User user) {
        if (!user.getRole().name().equals("CINEMATOGRAPHER")) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(bookingService.getCinematographerBookings(user.getId()));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<BookingResponse> updateStatus(
            @PathVariable Long id,
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> statusUpdate) {
        if (!user.getRole().name().equals("CINEMATOGRAPHER")) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, statusUpdate.get("status")));
    }

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }
}
