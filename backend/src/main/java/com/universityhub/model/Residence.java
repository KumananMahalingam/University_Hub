package com.universityhub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "residence")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Residence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "university_id")
    private Long universityId;

    @Column(name = "name")
    private String name;

    @Column(name = "room_type")
    private String roomType;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "price_range")
    private String priceRange;

    @Column(name = "rating")
    private Double rating;
}