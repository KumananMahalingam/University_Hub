package com.universityhub.repository;

import com.universityhub.model.UniversityCost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UniversityCostRepository extends JpaRepository<UniversityCost, Long> {
    Optional<UniversityCost> findByUniversityId(Long universityId);
}