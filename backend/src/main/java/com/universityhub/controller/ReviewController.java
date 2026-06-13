package com.universityhub.controller;

import com.universityhub.dto.ReviewDto;
import com.universityhub.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    /**
     * GET /api/reviews/{universityId}  →  mirrors GET /api/reviews/:universityId
     */
    @GetMapping("/reviews/{universityId}")
    public ResponseEntity<List<ReviewDto.Response>> getReviews(@PathVariable Long universityId) {
        return ResponseEntity.ok(reviewService.getReviewsByUniversity(universityId));
    }

    /**
     * POST /api/submit-review  →  mirrors POST /submit-review
     */
    @PostMapping("/submit-review")
    public ResponseEntity<?> submitReview(@Valid @RequestBody ReviewDto.CreateRequest request) {
        try {
            ReviewDto.Response response = reviewService.submitReview(request);
            return ResponseEntity.ok(Map.of("message", "Review successfully saved.", "review", response));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to save review."));
        }
    }
}