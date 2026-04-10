package com.reelio.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
public class RegisterRequest {
   @NotBlank
  @Email
   private String email;
   @NotBlank
   private String password;
    @NotBlank
     private String name;
   @NotNull
      private UserRole role;
   private String phone;
   private String bio;
   public RegisterRequest() {}
      public String getEmail() { return email; }
     public void setEmail(String email) { this.email = email; }
      public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
   public String getName() { return name; }
  public void setName(String name) { this.name = name; }
   public UserRole getRole() { return role; }
     public void setRole(UserRole role) { this.role = role; }
     public String getPhone() { return phone; }
      public void setPhone(String phone) { this.phone = phone; }
     public String getBio() { return bio; }
  public void setBio(String bio) { this.bio = bio; }
}