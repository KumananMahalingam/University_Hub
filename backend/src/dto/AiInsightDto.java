package com.universityhub.dto;

import lombok.Data;

public class AiInsightDto {

    @Data
    public static class Request {
        private String university;
        private String major;
        private Double userAverage;
        private Double programMean;
    }

    @Data
    public static class Response {
        private String insight;

        public Response(String insight) {
            this.insight = insight;
        }
    }
}