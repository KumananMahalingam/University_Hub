package com.universityhub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "university_admission")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UniversityAdmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "university_id")
    private Long universityId;

    @Column(name = "application_deadline")
    private String applicationDeadline;

    @Column(name = "application_fee")
    private String applicationFee;

    @Column(name = "overall_average")
    private Double overallAverage;

    @Column(name = "website_url")
    private String websiteUrl;

    @Column(name = "supplementary_application")
    private String supplementaryApplication;
}