package com.conexaoilpi.api.dto;

import com.conexaoilpi.api.entity.DonationNeed.DonationStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record DonationNeedRequest(

        @NotBlank(message = "Título é obrigatório")
        @Size(max = 150, message = "Título deve ter no máximo 150 caracteres")
        String title,

        String description,

        @NotBlank(message = "Categoria é obrigatória")
        @Size(max = 80, message = "Categoria deve ter no máximo 80 caracteres")
        String category,

        @NotNull(message = "Quantidade alvo é obrigatória")
        @Min(value = 1, message = "Quantidade alvo deve ser pelo menos 1")
        Integer targetQuantity,

        @Min(value = 0, message = "Quantidade atual não pode ser negativa")
        Integer currentQuantity,

        DonationStatus status
) {}
