package com.universityhub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "university_information")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UniversityInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "admission_average")
    private Double admissionAverage;

    @Column(name = "books_supplies")
    private String booksSupplies;
}