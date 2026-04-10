package com.reelio.repository;
import com.reelio.entity.Booking;
import com.reelio.dto.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
      List<Booking> findByClientId(Long clientId);
  List<Booking> findByCreatorId(Long creatorId);
    List<Booking> findByStatus(BookingStatus status);
      @Query("SELECT b FROM Booking b WHERE b.creator.id = :creatorId AND " +
            "((b.startTime <= :endTime AND b.endTime >= :startTime) OR " +
          "(b.startTime <= :startTimeMinusOneHour AND b.endTime >= :startTimeMinusOneHour) OR " +
          "(b.startTime <= :endTimePlusOneHour AND b.endTime >= :endTimePlusOneHour))")
  List<Booking> findConflictingBookings(@Param("creatorId") Long creatorId,
                                            @Param("startTime") LocalDateTime startTime,
                                           @Param("endTime") LocalDateTime endTime,
                                             @Param("startTimeMinusOneHour") LocalDateTime startTimeMinusOneHour,
                                             @Param("endTimePlusOneHour") LocalDateTime endTimePlusOneHour);
}