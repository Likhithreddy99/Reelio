package com.reelio.repository;
import com.reelio.entity.CreatorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
@Repository
public interface CreatorProfileRepository extends JpaRepository<CreatorProfile, Long> {
    Optional<CreatorProfile> findByUserId(Long userId);
  List<CreatorProfile> findByAvailable(boolean available);
}