package com.conexaoilpi.api.service;

import com.conexaoilpi.api.dto.DonationNeedRequest;
import com.conexaoilpi.api.dto.DonationNeedResponse;
import com.conexaoilpi.api.entity.DonationNeed;
import com.conexaoilpi.api.entity.DonationNeed.DonationStatus;
import com.conexaoilpi.api.repository.DonationNeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class DonationNeedService {

    private final DonationNeedRepository repository;

    @Transactional(readOnly = true)
    public List<DonationNeedResponse> findAll() {
        return repository.findAllByOrderByStatusAscCreatedAtDesc()
                .stream()
                .map(DonationNeedResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<DonationNeedResponse> findActive() {
        return repository.findByStatusNot(DonationStatus.MET)
                .stream()
                .map(DonationNeedResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public DonationNeedResponse findById(Long id) {
        return repository.findById(id)
                .map(DonationNeedResponse::from)
                .orElseThrow(() -> new NoSuchElementException("Necessidade de doação não encontrada: " + id));
    }

    @Transactional
    public DonationNeedResponse create(DonationNeedRequest request) {
        DonationNeed entity = DonationNeed.builder()
                .title(request.title())
                .description(request.description())
                .category(request.category())
                .targetQuantity(request.targetQuantity())
                .currentQuantity(request.currentQuantity() != null ? request.currentQuantity() : 0)
                .status(request.status() != null ? request.status() : DonationStatus.NEEDED)
                .build();

        return DonationNeedResponse.from(repository.save(entity));
    }

    @Transactional
    public DonationNeedResponse update(Long id, DonationNeedRequest request) {
        DonationNeed entity = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Necessidade de doação não encontrada: " + id));

        entity.setTitle(request.title());
        entity.setDescription(request.description());
        entity.setCategory(request.category());
        entity.setTargetQuantity(request.targetQuantity());
        entity.setCurrentQuantity(request.currentQuantity() != null ? request.currentQuantity() : entity.getCurrentQuantity());
        if (request.status() != null) {
            entity.setStatus(request.status());
        }

        return DonationNeedResponse.from(repository.save(entity));
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("Necessidade de doação não encontrada: " + id);
        }
        repository.deleteById(id);
    }
}
