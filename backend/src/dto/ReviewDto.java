package com.universityhub.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;

public class ReviewDto {

    @Data
    public static class CreateRequest {
        @NotNull
        @JsonProperty("user_id")
        private Long userId;

        @NotNull
        @JsonProperty("university_id")
        private Long universityId;

        @Min(1) @Max(5)
        @JsonProperty("rating")
        private Integer rating;

        @JsonProperty("body")
        private String body;

        @Min(1) @Max(5)
        @JsonProperty("academics_rating")
        private Integer academicsRating;

        @Min(1) @Max(5)
        @JsonProperty("food_rating")
        private Integer foodRating;

        @Min(1) @Max(5)
        @JsonProperty("safety_rating")
        private Integer safetyRating;

        @Min(1) @Max(5)
        @JsonProperty("party_scene_rating")
        private Integer partySceneRating;

        @Min(1) @Max(5)
        @JsonProperty("student_life_rating")
        private Integer studentLifeRating;

        @Min(1) @Max(5)
        @JsonProperty("location_rating")
        private Integer locationRating;
    }

    @Data
    public static class Response {
        private Long    id;
        private Long    universityId;
        private Integer rating;
        private Integer academicsRating;
        private Integer safetyRating;
        private Integer partySceneRating;
        private Integer foodRating;
        private Integer locationRating;
        private String  body;
    }
}