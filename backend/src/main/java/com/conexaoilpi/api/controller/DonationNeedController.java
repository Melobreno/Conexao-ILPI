package com.conexaoilpi.api.controller;

import com.conexaoilpi.api.dto.DonationNeedRequest;
import com.conexaoilpi.api.dto.DonationNeedResponse;
import com.conexaoilpi.api.service.DonationNeedService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donation-needs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DonationNeedController {

    private final DonationNeedService service;

    /**
     * GET /api/donation-needs
     * Returns all donation needs ordered by status then date.
     * Use ?activeOnly=true to exclude MET items (public-facing page).
     */
    @GetMapping
    public ResponseEntity<List<DonationNeedResponse>> findAll(
            @RequestParam(defaultValue = "false") boolean activeOnly) {
        List<DonationNeedResponse> result = activeOnly
                ? service.findActive()
                : service.findAll();
        return ResponseEntity.ok(result);
    }

    /**
     * GET /api/donation-needs/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<DonationNeedResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    /**
     * POST /api/donation-needs
     * Creates a new donation need (admin use).
     */
    @PostMapping
    public ResponseEntity<DonationNeedResponse> create(
            @Valid @RequestBody DonationNeedRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    /**
     * PUT /api/donation-needs/{id}
     * Updates an existing donation need (admin use).
     */
    @PutMapping("/{id}")
    public ResponseEntity<DonationNeedResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody DonationNeedRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    /**
     * DELETE /api/donation-needs/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
