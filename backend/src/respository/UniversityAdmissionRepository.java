package com.universityhub.repository;

import com.universityhub.model.UniversityAdmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UniversityAdmissionRepository extends JpaRepository<UniversityAdmission, Long> {
    Optional<UniversityAdmission> findByUniversityId(Long universityId);
}