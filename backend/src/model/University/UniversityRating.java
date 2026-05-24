package com.universityhub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "university_rating")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UniversityRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "university_id")
    private Long universityId;

    @Column(name = "overall")
    private Double overall;

    @Column(name = "academics")
    private Double academics;

    @Column(name = "safety")
    private Double safety;

    @Column(name = "partying")
    private Double partying;

    @Column(name = "cafeteria")
    private Double cafeteria;

    @Column(name = "happiness")
    private Double happiness;

    @Column(name = "residences")
    private Double residences;

    @Column(name = "location")
    private Double location;

    @Column(name = "diversity")
    private Double diversity;

    @Column(name = "affordability")
    private Double affordability;

    @Column(name = "employability")
    private Double employability;
}