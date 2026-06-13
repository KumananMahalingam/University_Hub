package com.universityhub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "graduation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Graduation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "university_id")
    private Long universityId;

    @Column(name = "grad_rate")
    private String gradRate;

    @Column(name = "median_income")
    private String medianIncome;

    @Column(name = "employment_rate")
    private String employmentRate;
}