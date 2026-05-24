package com.universityhub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

// ── Login ──────────────────────────────────────────────────────────────────
public class AuthDto {

    @Data
    public static class LoginRequest {
        @Email  @NotBlank private String email;
        @NotBlank         private String password;
    }

    @Data
    public static class RegisterRequest {
        @NotBlank                      private String name;
        @Email  @NotBlank              private String email;
        @NotBlank @Size(min = 6)       private String password;
    }

    @Data
    public static class AuthResponse {
        private String token;
        private String name;
        private Long   id;

        public AuthResponse(String token, String name, Long id) {
            this.token = token;
            this.name  = name;
            this.id    = id;
        }
    }
}