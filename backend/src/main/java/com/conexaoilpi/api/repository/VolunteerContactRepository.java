package com.conexaoilpi.api.repository;

import com.conexaoilpi.api.entity.VolunteerContact;
import com.conexaoilpi.api.entity.VolunteerContact.RequestType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VolunteerContactRepository extends JpaRepository<VolunteerContact, Long> {

    List<VolunteerContact> findByRequestType(RequestType requestType);

    List<VolunteerContact> findAllByOrderBySentAtDesc();
}
