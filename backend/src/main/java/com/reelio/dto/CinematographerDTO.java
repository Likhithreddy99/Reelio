package com.reelio.dto;

import java.math.BigDecimal;

public class CinematographerDTO {
    private Long id;
    private Long userId; // to associate back if needed
    private String name;
    private String bio;
    private BigDecimal hourlyRate;
    private String city;
    private String specialties;
    private String profilePic;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public BigDecimal getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(BigDecimal hourlyRate) { this.hourlyRate = hourlyRate; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getSpecialties() { return specialties; }
    public void setSpecialties(String specialties) { this.specialties = specialties; }
    public String getProfilePic() { return profilePic; }
    public void setProfilePic(String profilePic) { this.profilePic = profilePic; }
}
