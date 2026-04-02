package com.reelio.service;

import com.reelio.dto.BookingRequest;
import com.reelio.dto.BookingResponse;
import com.reelio.model.Booking;
import com.reelio.model.CinematographerProfile;
import com.reelio.model.User;
import com.reelio.repository.BookingRepository;
import com.reelio.repository.CinematographerProfileRepository;
import com.reelio.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final CinematographerProfileRepository profileRepository;

    public BookingResponse createBooking(Long clientId, BookingRequest request) {
        User client = userRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        CinematographerProfile profile = profileRepository.findById(request.getCinematographerId())
                .orElseThrow(() -> new RuntimeException("Cinematographer not found"));

        List<Booking> existingBookings = bookingRepository.findByCinematographerIdAndBookingDate(
                request.getCinematographerId(), request.getBookingDate());

        for (Booking existing : existingBookings) {
            if ("CANCELLED".equals(existing.getStatus()) || "REJECTED".equals(existing.getStatus())) {
                continue;
            }

            java.time.LocalTime bufferedStart = existing.getStartTime().minusHours(1);
            java.time.LocalTime bufferedEnd = existing.getEndTime().plusHours(1);

            if (request.getStartTime().isBefore(bufferedEnd) && request.getEndTime().isAfter(bufferedStart)) {
                throw new RuntimeException("Cinematographer is unavailable at this time due to another booking (1-hour buffer applies)");
            }
        }

        Booking booking = new Booking();
        booking.setClient(client);
        booking.setCinematographer(profile);
        booking.setBookingDate(request.getBookingDate());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setLocation(request.getLocation());
        booking.setEventType(request.getEventType());
        booking.setNotes(request.getNotes());
        booking.setStatus("PENDING");

        Booking savedBooking = bookingRepository.save(booking);
        return mapToDTO(savedBooking);
    }

    public List<BookingResponse> getClientBookings(Long clientId) {
        return bookingRepository.findByClientId(clientId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<BookingResponse> getCinematographerBookings(Long userId) {
        CinematographerProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return bookingRepository.findByCinematographerId(profile.getId()).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public BookingResponse updateBookingStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus(status.toUpperCase());
        return mapToDTO(bookingRepository.save(booking));
    }

    private BookingResponse mapToDTO(Booking booking) {
        BookingResponse dto = new BookingResponse();
        dto.setId(booking.getId());
        dto.setClientId(booking.getClient().getId());
        dto.setClientName(booking.getClient().getName());
        dto.setCinematographerId(booking.getCinematographer().getId());
        dto.setCinematographerName(booking.getCinematographer().getUser().getName());
        dto.setBookingDate(booking.getBookingDate());
        dto.setStartTime(booking.getStartTime());
        dto.setEndTime(booking.getEndTime());
        dto.setLocation(booking.getLocation());
        dto.setEventType(booking.getEventType());
        dto.setNotes(booking.getNotes());
        dto.setStatus(booking.getStatus());
        return dto;
    }

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, CinematographerProfileRepository profileRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }
}
