package com.reelio.repository;

import com.reelio.model.CinematographerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CinematographerProfileRepository extends JpaRepository<CinematographerProfile, Long> {
    Optional<CinematographerProfile> findByUserId(Long userId);
    List<CinematographerProfile> findByCityIgnoreCase(String city);
}
