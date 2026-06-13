package com.universityhub.repository;

import com.universityhub.model.ProgramAdmissionAverage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ProgramAdmissionAverageRepository extends JpaRepository<ProgramAdmissionAverage, Long> {
    Optional<ProgramAdmissionAverage> findByUniversityIdAndMajorId(Long universityId, Long majorId);
}