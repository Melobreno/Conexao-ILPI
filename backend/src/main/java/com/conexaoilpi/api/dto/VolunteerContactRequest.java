package com.conexaoilpi.api.dto;

import com.conexaoilpi.api.entity.VolunteerContact.RequestType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record VolunteerContactRequest(

        @NotBlank(message = "Nome é obrigatório")
        @Size(max = 150, message = "Nome deve ter no máximo 150 caracteres")
        String name,

        @NotBlank(message = "Telefone é obrigatório")
        @Pattern(regexp = "^\\(?\\d{2}\\)?[\\s-]?9?\\d{4}-?\\d{4}$",
                 message = "Formato de telefone inválido")
        String phone,

        @Size(max = 150, message = "E-mail deve ter no máximo 150 caracteres")
        String email,

        @Size(max = 100, message = "Área de interesse deve ter no máximo 100 caracteres")
        String interestArea,

        String message,

        @NotNull(message = "Tipo de solicitação é obrigatório")
        RequestType requestType
) {}
