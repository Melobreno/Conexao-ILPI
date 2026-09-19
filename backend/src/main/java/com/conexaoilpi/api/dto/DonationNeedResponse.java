package com.conexaoilpi.api.dto;

import com.conexaoilpi.api.entity.DonationNeed;
import com.conexaoilpi.api.entity.DonationNeed.DonationStatus;

import java.time.LocalDateTime;

public record DonationNeedResponse(
        Long id,
        String title,
        String description,
        String category,
        Integer targetQuantity,
        Integer currentQuantity,
        DonationStatus status,
        LocalDateTime createdAt
) {
    public static DonationNeedResponse from(DonationNeed entity) {
        return new DonationNeedResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getCategory(),
                entity.getTargetQuantity(),
                entity.getCurrentQuantity(),
                entity.getStatus(),
                entity.getCreatedAt()
        );
    }
}
