package com.universityhub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "university_cost")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UniversityCost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "university_id")
    private Long universityId;

    @Column(name = "average_cost")
    private String averageCost;

    @Column(name = "average_housing_cost")
    private String averageHousingCost;

    @Column(name = "average_meal_plan_cost")
    private String averageMealPlanCost;

    @Column(name = "average_domestic_tuition")
    private String averageDomesticTuition;

    @Column(name = "average_internationl_cost")
    private String averageInternationalCost;
}