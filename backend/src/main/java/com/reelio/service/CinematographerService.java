package com.reelio.service;

import com.reelio.dto.CinematographerDTO;
import com.reelio.model.CinematographerProfile;
import com.reelio.repository.CinematographerProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CinematographerService {

    private final CinematographerProfileRepository profileRepository;

    public List<CinematographerDTO> getAllCinematographers() {
        return profileRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public CinematographerDTO getCinematographerById(Long id) {
        return profileRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Cinematographer not found"));
    }
    
    public List<CinematographerDTO> getCinematographersByCity(String city) {
        return profileRepository.findByCityIgnoreCase(city).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public CinematographerDTO updateProfile(Long userId, CinematographerDTO dto) {
        CinematographerProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        profile.setBio(dto.getBio());
        profile.setCity(dto.getCity());
        profile.setHourlyRate(dto.getHourlyRate());
        profile.setSpecialties(dto.getSpecialties());
        profile.setProfilePic(dto.getProfilePic());

        return mapToDTO(profileRepository.save(profile));
    }

    public CinematographerDTO mapToDTO(CinematographerProfile profile) {
        CinematographerDTO dto = new CinematographerDTO();
        dto.setId(profile.getId());
        dto.setUserId(profile.getUser().getId());
        dto.setName(profile.getUser().getName());
        dto.setBio(profile.getBio());
        dto.setCity(profile.getCity());
        dto.setHourlyRate(profile.getHourlyRate());
        dto.setSpecialties(profile.getSpecialties());
        dto.setProfilePic(profile.getProfilePic());
        return dto;
    }

    public CinematographerService(CinematographerProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }
}
