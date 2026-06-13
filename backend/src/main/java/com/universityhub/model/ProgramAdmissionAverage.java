package com.universityhub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "program_admission_averages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgramAdmissionAverage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "university_id")
    private Long universityId;

    @Column(name = "major_id")
    private Long majorId;

    @Column(name = "avg1")  private Double avg1;
    @Column(name = "avg2")  private Double avg2;
    @Column(name = "avg3")  private Double avg3;
    @Column(name = "avg4")  private Double avg4;
    @Column(name = "avg5")  private Double avg5;
    @Column(name = "avg6")  private Double avg6;
    @Column(name = "avg7")  private Double avg7;
    @Column(name = "avg8")  private Double avg8;
    @Column(name = "avg9")  private Double avg9;
    @Column(name = "avg10") private Double avg10;
    @Column(name = "avg11") private Double avg11;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
}