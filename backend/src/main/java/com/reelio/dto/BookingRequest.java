package com.reelio.dto;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
public class BookingRequest {
     @NotNull
   private Long creatorId;
     @NotNull
      @Future
  private LocalDateTime startTime;
     @NotNull
   @Future
      private LocalDateTime endTime;
     @NotBlank
      private String projectName;
      private String description;
  private String location;
     public BookingRequest() {}
  public Long getCreatorId() { return creatorId; }
    public void setCreatorId(Long creatorId) { this.creatorId = creatorId; }
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
}