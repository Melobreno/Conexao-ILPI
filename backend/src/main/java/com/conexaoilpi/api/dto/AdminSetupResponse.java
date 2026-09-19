package com.conexaoilpi.api.dto;

public record AdminSetupResponse(
        Long id,
        String name,
        String email,
        String role
) {}
