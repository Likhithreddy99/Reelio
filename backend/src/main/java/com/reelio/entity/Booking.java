package com.reelio.entity;
import com.reelio.dto.BookingStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "bookings")
public class Booking {
      @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  @ManyToOne
      @JoinColumn(name = "client_id", nullable = false)
   private User client;
      @ManyToOne
  @JoinColumn(name = "creator_id", nullable = false)
   private User creator;
  @Column(nullable = false)
      private LocalDateTime startTime;
      @Column(nullable = false)
     private LocalDateTime endTime;
   @Column(nullable = false)
    private String projectName;
   @Column
  private String description;
   @Column
   private String location;
     @Enumerated(EnumType.STRING)
    @Column(nullable = false)
     private BookingStatus status;
  public Booking() {
         this.status = BookingStatus.PENDING;
      }
    public Booking(User client, User creator, LocalDateTime startTime, LocalDateTime endTime, String projectName) {
       this.client = client;
        this.creator = creator;
        this.startTime = startTime;
      this.endTime = endTime;
         this.projectName = projectName;
          this.status = BookingStatus.PENDING;
    }
   public Long getId() { return id; }
     public void setId(Long id) { this.id = id; }
      public User getClient() { return client; }
   public void setClient(User client) { this.client = client; }
  public User getCreator() { return creator; }
     public void setCreator(User creator) { this.creator = creator; }
    public LocalDateTime getStartTime() { return startTime; }
     public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
      public LocalDateTime getEndTime() { return endTime; }
     public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public String getProjectName() { return projectName; }
   public void setProjectName(String projectName) { this.projectName = projectName; }
      public String getDescription() { return description; }
     public void setDescription(String description) { this.description = description; }
  public String getLocation() { return location; }
  public void setLocation(String location) { this.location = location; }
      public BookingStatus getStatus() { return status; }
     public void setStatus(BookingStatus status) { this.status = status; }
}