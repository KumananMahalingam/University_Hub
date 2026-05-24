package com.universityhub.repository;

import com.universityhub.model.UniversityRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UniversityRatingRepository extends JpaRepository<UniversityRating, Long> {
    Optional<UniversityRating> findByUniversityId(Long universityId);
}