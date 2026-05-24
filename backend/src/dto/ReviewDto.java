package com.universityhub.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

public class ReviewDto {

    @Data
    public static class CreateRequest {
        @NotNull private Long   userId;
        @NotNull private Long   universityId;
        @Min(1) @Max(5) private Integer rating;
        private String  body;
        @Min(1) @Max(5) private Integer academicsRating;
        @Min(1) @Max(5) private Integer foodRating;
        @Min(1) @Max(5) private Integer safetyRating;
        @Min(1) @Max(5) private Integer partySceneRating;
        @Min(1) @Max(5) private Integer studentLifeRating;
        @Min(1) @Max(5) private Integer locationRating;
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