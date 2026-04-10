package com.reelio.service;
import com.reelio.entity.CreatorProfile;
import com.reelio.entity.User;
import com.reelio.repository.CreatorProfileRepository;
import com.reelio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class CreatorService {
  @Autowired
  private CreatorProfileRepository creatorProfileRepository;
   @Autowired
  private UserRepository userRepository;
  public List<User> getAllCreators() {
         return userRepository.findByRole(com.reelio.dto.UserRole.CREATOR);
  }
  public CreatorProfile getCreatorProfile(Long userId) {
         return creatorProfileRepository.findByUserId(userId).orElse(null);
    }
      public CreatorProfile updateCreatorProfile(Long userId, CreatorProfile profileData) {
       User user = userRepository.findById(userId)
          .orElseThrow(() -> new RuntimeException("User not found"));
          CreatorProfile profile = creatorProfileRepository.findByUserId(userId)
           .orElse(new CreatorProfile(user));
          profile.setSpecialization(profileData.getSpecialization());
          profile.setEquipment(profileData.getEquipment());
        profile.setExperience(profileData.getExperience());
        profile.setPortfolioUrl(profileData.getPortfolioUrl());
          profile.setHourlyRate(profileData.getHourlyRate());
          profile.setBlogContent(profileData.getBlogContent());
       profile.setAvailable(profileData.isAvailable());
          return creatorProfileRepository.save(profile);
     }
   public List<CreatorProfile> getAvailableCreators() {
      return creatorProfileRepository.findByAvailable(true);
     }
}