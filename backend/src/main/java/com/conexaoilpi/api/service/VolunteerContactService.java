package com.conexaoilpi.api.service;

import com.conexaoilpi.api.dto.VolunteerContactRequest;
import com.conexaoilpi.api.dto.VolunteerContactResponse;
import com.conexaoilpi.api.entity.VolunteerContact;
import com.conexaoilpi.api.repository.VolunteerContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class VolunteerContactService {

    private final VolunteerContactRepository repository;

    @Transactional(readOnly = true)
    public List<VolunteerContactResponse> findAll() {
        return repository.findAllByOrderBySentAtDesc()
                .stream()
                .map(VolunteerContactResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<VolunteerContactResponse> findByType(VolunteerContact.RequestType type) {
        return repository.findByRequestType(type)
                .stream()
                .map(VolunteerContactResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public VolunteerContactResponse findById(Long id) {
        return repository.findById(id)
                .map(VolunteerContactResponse::from)
                .orElseThrow(() -> new NoSuchElementException("Contato não encontrado: " + id));
    }

    @Transactional
    public VolunteerContactResponse create(VolunteerContactRequest request) {
        VolunteerContact entity = VolunteerContact.builder()
                .name(request.name())
                .phone(request.phone())
                .email(request.email())
                .interestArea(request.interestArea())
                .message(request.message())
                .requestType(request.requestType())
                .build();

        return VolunteerContactResponse.from(repository.save(entity));
    }
}
