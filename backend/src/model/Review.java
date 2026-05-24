package com.universityhub.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "university_id", nullable = false)
    private Long universityId;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "body", columnDefinition = "TEXT")
    private String body;

    @Column(name = "academics_rating")
    private Integer academicsRating;

    @Column(name = "food_rating")
    private Integer foodRating;

    @Column(name = "safety_rating")
    private Integer safetyRating;

    @Column(name = "party_scene_rating")
    private Integer partySceneRating;

    @Column(name = "student_life_rating")
    private Integer studentLifeRating;

    @Column(name = "location_rating")
    private Integer locationRating;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}