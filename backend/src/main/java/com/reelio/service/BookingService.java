package com.reelio.service;
import com.reelio.dto.BookingRequest;
import com.reelio.entity.Booking;
import com.reelio.entity.User;
import com.reelio.repository.BookingRepository;
import com.reelio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class BookingService {
     @Autowired
   private BookingRepository bookingRepository;
      @Autowired
     private UserRepository userRepository;
      public Booking createBooking(BookingRequest bookingRequest, Long clientId) {
          User client = userRepository.findById(clientId)
              .orElseThrow(() -> new RuntimeException("Client not found"));
        User creator = userRepository.findById(bookingRequest.getCreatorId())
              .orElseThrow(() -> new RuntimeException("Creator not found"));
      LocalDateTime startTimeMinusOneHour = bookingRequest.getStartTime().minusHours(1);
      LocalDateTime endTimePlusOneHour = bookingRequest.getEndTime().plusHours(1);
          List<Booking> conflictingBookings = bookingRepository.findConflictingBookings(
           bookingRequest.getCreatorId(),
           bookingRequest.getStartTime(),
            bookingRequest.getEndTime(),
            startTimeMinusOneHour,
             endTimePlusOneHour
       );
         if (!conflictingBookings.isEmpty()) {
             throw new RuntimeException("Time slot not available. Creator has conflicting bookings.");
         }
        Booking booking = new Booking();
          booking.setClient(client);
          booking.setCreator(creator);
      booking.setStartTime(bookingRequest.getStartTime());
         booking.setEndTime(bookingRequest.getEndTime());
          booking.setProjectName(bookingRequest.getProjectName());
       booking.setDescription(bookingRequest.getDescription());
          booking.setLocation(bookingRequest.getLocation());
       return bookingRepository.save(booking);
  }
   public List<Booking> getClientBookings(Long clientId) {
          return bookingRepository.findByClientId(clientId);
      }
     public List<Booking> getCreatorBookings(Long creatorId) {
          return bookingRepository.findByCreatorId(creatorId);
  }
      public Booking updateBookingStatus(Long bookingId, String status) {
         Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
      booking.setStatus(com.reelio.dto.BookingStatus.valueOf(status.toUpperCase()));
         return bookingRepository.save(booking);
    }
}