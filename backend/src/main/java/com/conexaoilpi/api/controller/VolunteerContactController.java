package com.conexaoilpi.api.controller;

import com.conexaoilpi.api.dto.VolunteerContactRequest;
import com.conexaoilpi.api.dto.VolunteerContactResponse;
import com.conexaoilpi.api.entity.VolunteerContact.RequestType;
import com.conexaoilpi.api.service.VolunteerContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VolunteerContactController {

    private final VolunteerContactService service;

    /**
     * GET /api/contacts
     * Returns all contacts. Use ?type=VOLUNTEER or ?type=SUPPORT_REQUEST to filter.
     */
    @GetMapping
    public ResponseEntity<List<VolunteerContactResponse>> findAll(
            @RequestParam(required = false) RequestType type) {
        List<VolunteerContactResponse> result = type != null
                ? service.findByType(type)
                : service.findAll();
        return ResponseEntity.ok(result);
    }

    /**
     * GET /api/contacts/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<VolunteerContactResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    /**
     * POST /api/contacts
     * Submits a new volunteer registration or support request (public endpoint).
     */
    @PostMapping
    public ResponseEntity<VolunteerContactResponse> create(
            @Valid @RequestBody VolunteerContactRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }
}
