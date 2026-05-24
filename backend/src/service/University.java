package com.universityhub.service;

import com.universityhub.dto.UniversityDto;
import com.universityhub.model.*;
import com.universityhub.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UniversityService {

    private final UniversityInformationRepository universityInfoRepo;
    private final UniversityRatingRepository      ratingRepo;
    private final UniversityAdmissionRepository   admissionRepo;
    private final UniversityCostRepository        costRepo;
    private final GraduationRepository            graduationRepo;
    private final ResidenceRepository             residenceRepo;

    /**
     * Build the full DTO for a university page.
     * Mirrors the 6-query pattern in each app.get('/uoft'), app.get('/western'), etc.
     */
    public UniversityDto getUniversityData(Long universityId) {
        // Fetch all related data
        List<Object[]> majorRows  = universityInfoRepo.findUniversityWithMajors(universityId);
        UniversityRating   rating    = ratingRepo.findByUniversityId(universityId)
                .orElseThrow(() -> new RuntimeException("Ratings not found for university " + universityId));
        UniversityAdmission admission = admissionRepo.findByUniversityId(universityId)
                .orElseThrow(() -> new RuntimeException("Admission data not found"));
        UniversityCost cost = costRepo.findByUniversityId(universityId)
                .orElseThrow(() -> new RuntimeException("Cost data not found"));
        Graduation grad = graduationRepo.findByUniversityId(universityId)
                .orElseThrow(() -> new RuntimeException("Graduation data not found"));
        List<Residence> residences = residenceRepo.findByUniversityId(universityId);

        // University name and admission average come from the join query
        String universityName = majorRows.isEmpty() ? "" : (String) majorRows.get(0)[0];
        List<String> majorNames = majorRows.stream()
                .map(row -> (String) row[1])
                .collect(Collectors.toList());

        // books_supplies is in university_majors — grab from first row if present
        String booksSupplies = majorRows.isEmpty() ? null : castToString(majorRows.get(0)[4]);

        // Map residences
        List<UniversityDto.ResidenceDto> residenceDtos = residences.stream()
                .map(r -> UniversityDto.ResidenceDto.builder()
                        .name(r.getName())
                        .roomType(r.getRoomType())
                        .capacity(r.getCapacity())
                        .priceRange(r.getPriceRange())
                        .rating(r.getRating())
                        .build())
                .collect(Collectors.toList());

        return UniversityDto.builder()
                .universityName(universityName)
                .admissionAverage(majorRows.isEmpty() ? null
                        : castToDouble(majorRows.get(0)[2]))
                .booksSupplies(booksSupplies)
                // Ratings
                .overallRating(rating.getOverall())
                .academicsRating(rating.getAcademics())
                .safetyRating(rating.getSafety())
                .partyRating(rating.getPartying())
                .foodRating(rating.getCafeteria())
                .locationRating(rating.getLocation())
                .happinessRating(rating.getHappiness())
                .affordabilityRating(rating.getAffordability())
                .employabilityRating(rating.getEmployability())
                // Admissions
                .applicationDeadline(admission.getApplicationDeadline())
                .applicationFee(admission.getApplicationFee())
                .overallAverage(admission.getOverallAverage())
                .websiteUrl(admission.getWebsiteUrl())
                .supplementaryApplication(admission.getSupplementaryApplication())
                // Costs
                .averageCost(cost.getAverageCost())
                .averageHousingCost(cost.getAverageHousingCost())
                .averageMealPlanCost(cost.getAverageMealPlanCost())
                .averageDomesticTuition(cost.getAverageDomesticTuition())
                .averageInternationalCost(cost.getAverageInternationalCost())
                // Post-grad
                .gradRate(grad.getGradRate())
                .employmentRate(grad.getEmploymentRate())
                .medianIncome(grad.getMedianIncome())
                // Collections
                .popularMajors(majorNames)
                .residences(residenceDtos)
                .build();
    }

    private Double castToDouble(Object obj) {
        if (obj == null) return null;
        if (obj instanceof Number) return ((Number) obj).doubleValue();
        try { return Double.parseDouble(obj.toString()); } catch (Exception e) { return null; }
    }

    private String castToString(Object obj) {
        return obj == null ? null : obj.toString();
    }
}