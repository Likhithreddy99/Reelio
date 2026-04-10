package com.reelio.controller;
import com.reelio.entity.CreatorProfile;
import com.reelio.entity.User;
import com.reelio.service.CreatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CreatorController {
      @Autowired
  private CreatorService creatorService;
      @Autowired
    private com.reelio.repository.UserRepository userRepository;
    @GetMapping("/creators")
      public ResponseEntity<List<User>> getAllCreators() {
        List<User> creators = creatorService.getAllCreators();
      return ResponseEntity.ok(creators);
     }
   @GetMapping("/creator-profiles/{userId}")
  public ResponseEntity<CreatorProfile> getCreatorProfile(@PathVariable Long userId) {
      CreatorProfile profile = creatorService.getCreatorProfile(userId);
      if (profile != null) {
            return ResponseEntity.ok(profile);
       }
       return ResponseEntity.notFound().build();
      }
     @PutMapping("/creator-profiles")
   public ResponseEntity<CreatorProfile> updateCreatorProfile(@RequestBody CreatorProfile profileData) {
         try {
              Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
             Long userId = getUserIdFromEmail(email);
          CreatorProfile profile = creatorService.updateCreatorProfile(userId, profileData);
          return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
         }
  }
   @GetMapping("/creator-profiles/available")
    public ResponseEntity<List<CreatorProfile>> getAvailableCreators() {
        List<CreatorProfile> profiles = creatorService.getAvailableCreators();
       return ResponseEntity.ok(profiles);
   }
  private Long getUserIdFromEmail(String email) {
         return userRepository.findByEmail(email)
           .orElseThrow(() -> new RuntimeException("User not found"))
             .getId();
   }
}