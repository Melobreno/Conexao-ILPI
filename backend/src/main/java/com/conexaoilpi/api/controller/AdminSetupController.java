package com.conexaoilpi.api.controller;

import com.conexaoilpi.api.dto.AdminSetupRequest;
import com.conexaoilpi.api.dto.AdminSetupResponse;
import com.conexaoilpi.api.service.AdminSetupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * One-time endpoint to bootstrap an ADMIN user.
 *
 * POST /api/setup/admin
 * Body: { "setupKey": "<SETUP_SECRET_KEY>", "name": "...", "email": "...", "password": "..." }
 *
 * Protected by a secret key defined in the SETUP_SECRET_KEY environment variable.
 * There is no rate-limiting here — disable or remove this endpoint after first use in production.
 */
@RestController
@RequestMapping("/api/setup")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminSetupController {

    private final AdminSetupService service;

    @PostMapping("/admin")
    public ResponseEntity<?> createAdmin(@Valid @RequestBody AdminSetupRequest request) {
        try {
            AdminSetupResponse response = service.createAdmin(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (SecurityException ex) {
            ProblemDetail detail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, ex.getMessage());
            detail.setTitle("Acesso negado");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(detail);
        } catch (IllegalStateException ex) {
            ProblemDetail detail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
            detail.setTitle("Conflito");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(detail);
        }
    }
}
