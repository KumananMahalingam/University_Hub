package com.universityhub.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.universityhub.dto.AiInsightDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiInsightService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    private final RestTemplate   restTemplate;
    private final ObjectMapper   objectMapper;

    /**
     * Call Gemini API — mirrors the /ai-admission-insight route in server.js
     */
    public AiInsightDto.Response generateInsight(AiInsightDto.Request request) {
        String prompt = String.format("""
            You are an admission counselor AI. A student has an average of %.1f%%
            applying to %s at %s.
            The program's historical mean average is %.2f%%.
            Give a personalized assessment of their chances and provide suggestions
            to improve their odds. Respond in 2-3 sentences in a friendly tone.
            """,
            request.getUserAverage(),
            request.getMajor(),
            request.getUniversity(),
            request.getProgramMean()
        );

        Map<String, Object> body = Map.of(
            "contents", new Object[]{
                Map.of("parts", new Object[]{ Map.of("text", prompt) })
            }
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String url = geminiApiUrl + "?key=" + geminiApiKey;
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    url, HttpMethod.POST, entity, String.class);

            JsonNode root      = objectMapper.readTree(response.getBody());
            String   aiMessage = root.path("candidates")
                                     .get(0)
                                     .path("content")
                                     .path("parts")
                                     .get(0)
                                     .path("text")
                                     .asText();

            return new AiInsightDto.Response(aiMessage);
        } catch (Exception e) {
            throw new RuntimeException("AI insight generation failed: " + e.getMessage(), e);
        }
    }
}