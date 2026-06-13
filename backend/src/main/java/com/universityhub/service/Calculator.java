package com.universityhub.service;

import com.universityhub.model.ProgramAdmissionAverage;
import com.universityhub.repository.ProgramAdmissionAverageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CalculatorService {

    private final ProgramAdmissionAverageRepository programRepo;

    /**
     * Fetch historical admission averages — mirrors GET /averages/:universityId/:majorId
     */
    public ProgramAdmissionAverage getAverages(Long universityId, Long majorId) {
        return programRepo.findByUniversityIdAndMajorId(universityId, majorId)
                .orElseThrow(() -> new RuntimeException(
                        "No data found for university " + universityId + " major " + majorId));
    }
}