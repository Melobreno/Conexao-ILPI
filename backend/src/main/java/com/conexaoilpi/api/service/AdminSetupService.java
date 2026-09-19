package com.conexaoilpi.api.service;

import com.conexaoilpi.api.dto.AdminSetupRequest;
import com.conexaoilpi.api.dto.AdminSetupResponse;
import com.conexaoilpi.api.entity.AdminUser;
import com.conexaoilpi.api.entity.AdminUser.Role;
import com.conexaoilpi.api.repository.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminSetupService {

    private final AdminUserRepository repository;

    // Injected from SETUP_SECRET_KEY environment variable
    @Value("${app.setup.secret-key}")
    private String setupSecretKey;

    private final BCryptPasswordEncoder passwordEncoder;

    @Transactional
    public AdminSetupResponse createAdmin(AdminSetupRequest request) {
        if (!setupSecretKey.equals(request.setupKey())) {
            throw new SecurityException("Chave de setup inválida.");
        }

        if (repository.existsByEmail(request.email())) {
            throw new IllegalStateException("Já existe um administrador com este e-mail.");
        }

        AdminUser admin = AdminUser.builder()
                .name(request.name())
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(Role.ADMIN)
                .build();

        AdminUser saved = repository.save(admin);

        return new AdminSetupResponse(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getRole().name()
        );
    }
}
