package com.universityhub.controller;

import com.universityhub.dto.UniversityDto;
import com.universityhub.service.UniversityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/universities")
@RequiredArgsConstructor
public class UniversityController {

    private final UniversityService universityService;

    /**
     * GET /api/universities/{id}
     * Replaces the separate /uoft, /uwaterloo, /western, /queens routes.
     * University IDs match the original DB: 1=Waterloo, 2=Western, 3=Queens, 4=UofT
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getUniversity(@PathVariable Long id) {
        try {
            UniversityDto dto = universityService.getUniversityData(id);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Convenience named endpoints kept for backward-compat with existing bookmarks.
     * They simply delegate to the generic /{id} handler.
     */
    @GetMapping("/uoft")
    public ResponseEntity<?> getUofT() { return getUniversity(4L); }

    @GetMapping("/waterloo")
    public ResponseEntity<?> getWaterloo() { return getUniversity(1L); }

    @GetMapping("/western")
    public ResponseEntity<?> getWestern() { return getUniversity(2L); }

    @GetMapping("/queens")
    public ResponseEntity<?> getQueens() { return getUniversity(3L); }
}