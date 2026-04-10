package com.reelio.controller;
import com.reelio.dto.BookingRequest;
import com.reelio.entity.Booking;
import com.reelio.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
   @Autowired
     private BookingService bookingService;
     @Autowired
   private com.reelio.repository.UserRepository userRepository;
     @PostMapping
      public ResponseEntity<?> createBooking(@RequestBody BookingRequest bookingRequest) {
       try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
              Long clientId = getUserIdFromEmail(email);
           Booking booking = bookingService.createBooking(bookingRequest, clientId);
          return ResponseEntity.ok(booking);
         } catch (Exception e) {
           return ResponseEntity.badRequest().body(e.getMessage());
          }
    }
   @GetMapping("/client")
    public ResponseEntity<List<Booking>> getClientBookings() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Long clientId = getUserIdFromEmail(email);
          List<Booking> bookings = bookingService.getClientBookings(clientId);
          return ResponseEntity.ok(bookings);
     }
   @GetMapping("/creator")
     public ResponseEntity<List<Booking>> getCreatorBookings() {
         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
       String email = authentication.getName();
       Long creatorId = getUserIdFromEmail(email);
          List<Booking> bookings = bookingService.getCreatorBookings(creatorId);
        return ResponseEntity.ok(bookings);
      }
   @PutMapping("/{bookingId}/status")
   public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long bookingId, @RequestParam String status) {
      try {
            Booking booking = bookingService.updateBookingStatus(bookingId, status);
          return ResponseEntity.ok(booking);
      } catch (Exception e) {
             return ResponseEntity.badRequest().build();
       }
     }
      private Long getUserIdFromEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"))
           .getId();
      }
}