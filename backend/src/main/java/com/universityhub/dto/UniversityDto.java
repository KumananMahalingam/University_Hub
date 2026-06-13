package com.universityhub.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UniversityDto {

    private String universityName;

    // Quick Facts
    private Double admissionAverage;
    private String averageCost;
    private String gradRate;
    private String websiteUrl;
    private String booksSupplies;

    // Ratings
    private Double overallRating;
    private Double academicsRating;
    private Double safetyRating;
    private Double partyRating;
    private Double foodRating;
    private Double locationRating;
    private Double happinessRating;
    private Double affordabilityRating;
    private Double employabilityRating;

    // Admissions
    private String applicationDeadline;
    private String applicationFee;
    private Double overallAverage;
    private String supplementaryApplication;

    // Costs
    private String averageHousingCost;
    private String averageMealPlanCost;
    private String averageDomesticTuition;
    private String averageInternationalCost;

    // Post-Graduation
    private String employmentRate;
    private String medianIncome;

    // Collections
    private List<String>       popularMajors;
    private List<ResidenceDto> residences;

    @Data
    @Builder
    public static class ResidenceDto {
        private String name;
        private String roomType;
        private Integer capacity;
        private String priceRange;
        private Double rating;
    }
}