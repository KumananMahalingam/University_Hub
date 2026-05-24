package com.universityhub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "university_majors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UniversityMajors {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "university_id")
    private Long universityId;

    @Column(name = "major_id")
    private Long majorId;

    @Column(name = "admission_average")
    private Double admissionAverage;

    @Column(name = "tuition_cost")
    private String tuitionCost;

    @Column(name = "books_supplies")
    private String booksSupplies;
}