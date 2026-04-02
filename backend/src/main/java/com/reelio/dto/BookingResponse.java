package com.reelio.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class BookingResponse {
    private Long id;
    private Long clientId;
    private String clientName;
    private Long cinematographerId;
    private String cinematographerName;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String location;
    private String eventType;
    private String notes;
    private String status;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getClientId() { return clientId; }
    public void setClientId(Long clientId) { this.clientId = clientId; }
    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }
    public Long getCinematographerId() { return cinematographerId; }
    public void setCinematographerId(Long cinematographerId) { this.cinematographerId = cinematographerId; }
    public String getCinematographerName() { return cinematographerName; }
    public void setCinematographerName(String cinematographerName) { this.cinematographerName = cinematographerName; }
    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }
    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
