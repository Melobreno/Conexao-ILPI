package com.conexaoilpi.api.dto;

import com.conexaoilpi.api.entity.VolunteerContact;
import com.conexaoilpi.api.entity.VolunteerContact.RequestType;

import java.time.LocalDateTime;

public record VolunteerContactResponse(
        Long id,
        String name,
        String phone,
        String email,
        String interestArea,
        String message,
        RequestType requestType,
        LocalDateTime sentAt
) {
    public static VolunteerContactResponse from(VolunteerContact entity) {
        return new VolunteerContactResponse(
                entity.getId(),
                entity.getName(),
                entity.getPhone(),
                entity.getEmail(),
                entity.getInterestArea(),
                entity.getMessage(),
                entity.getRequestType(),
                entity.getSentAt()
        );
    }
}
