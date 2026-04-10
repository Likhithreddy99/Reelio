package com.reelio.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
@Entity
@Table(name = "creator_profiles")
public class CreatorProfile {
     @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;
  @OneToOne
   @JoinColumn(name = "user_id", nullable = false)
  private User user;
  @Column
      private String specialization;
     @Column
    private String equipment;
     @Column
    private String experience;
     @Column
    private String portfolioUrl;
    @Column
   private BigDecimal hourlyRate;
   @Column
    private String blogContent;
   @Column
      private boolean available = true;
      public CreatorProfile() {}
   public CreatorProfile(User user) {
      this.user = user;
     }
  public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
      public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
     public String getEquipment() { return equipment; }
      public void setEquipment(String equipment) { this.equipment = equipment; }
    public String getExperience() { return experience; }
   public void setExperience(String experience) { this.experience = experience; }
   public String getPortfolioUrl() { return portfolioUrl; }
    public void setPortfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; }
    public BigDecimal getHourlyRate() { return hourlyRate; }
  public void setHourlyRate(BigDecimal hourlyRate) { this.hourlyRate = hourlyRate; }
      public String getBlogContent() { return blogContent; }
  public void setBlogContent(String blogContent) { this.blogContent = blogContent; }
    public boolean isAvailable() { return available; }
   public void setAvailable(boolean available) { this.available = available; }
}