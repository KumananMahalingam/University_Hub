package com.universityhub.repository;

import com.universityhub.model.Graduation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface GraduationRepository extends JpaRepository<Graduation, Long> {
    Optional<Graduation> findByUniversityId(Long universityId);
}