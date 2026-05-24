package com.universityhub.service;

import com.universityhub.dto.ReviewDto;
import com.universityhub.model.Review;
import com.universityhub.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    /**
     * Fetch all reviews for a university — mirrors GET /api/reviews/:universityId
     */
    public List<ReviewDto.Response> getReviewsByUniversity(Long universityId) {
        return reviewRepository.findByUniversityId(universityId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Submit a new review — mirrors POST /submit-review
     */
    public ReviewDto.Response submitReview(ReviewDto.CreateRequest request) {
        Review review = Review.builder()
                .userId(request.getUserId())
                .universityId(request.getUniversityId())
                .rating(request.getRating())
                .body(request.getBody())
                .academicsRating(request.getAcademicsRating())
                .foodRating(request.getFoodRating())
                .safetyRating(request.getSafetyRating())
                .partySceneRating(request.getPartySceneRating())
                .studentLifeRating(request.getStudentLifeRating())
                .locationRating(request.getLocationRating())
                .build();

        review = reviewRepository.save(review);
        return toResponse(review);
    }

    private ReviewDto.Response toResponse(Review r) {
        ReviewDto.Response dto = new ReviewDto.Response();
        dto.setId(r.getId());
        dto.setUniversityId(r.getUniversityId());
        dto.setRating(r.getRating());
        dto.setAcademicsRating(r.getAcademicsRating());
        dto.setSafetyRating(r.getSafetyRating());
        dto.setPartySceneRating(r.getPartySceneRating());
        dto.setFoodRating(r.getFoodRating());
        dto.setLocationRating(r.getLocationRating());
        dto.setBody(r.getBody());
        return dto;
    }
}