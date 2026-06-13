package com.universityhub.controller;

import com.universityhub.dto.AiInsightDto;
import com.universityhub.model.ProgramAdmissionAverage;
import com.universityhub.service.AiInsightService;
import com.universityhub.service.CalculatorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CalculatorController {

    private final CalculatorService calculatorService;
    private final AiInsightService  aiInsightService;

    /**
     * GET /api/averages/{universityId}/{majorId}  →  mirrors GET /averages/:universityId/:majorId
     */
    @GetMapping("/averages/{universityId}/{majorId}")
    public ResponseEntity<?> getAverages(@PathVariable Long universityId,
                                         @PathVariable Long majorId) {
        try {
            ProgramAdmissionAverage avg = calculatorService.getAverages(universityId, majorId);
            return ResponseEntity.ok(avg);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * POST /api/ai-admission-insight  →  mirrors POST /ai-admission-insight
     */
    @PostMapping("/ai-admission-insight")
    public ResponseEntity<?> getAiInsight(@Valid @RequestBody AiInsightDto.Request request) {
        try {
            AiInsightDto.Response response = aiInsightService.generateInsight(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "AI insight generation failed."));
        }
    }
}