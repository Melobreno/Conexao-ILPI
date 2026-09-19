package com.conexaoilpi.api.repository;

import com.conexaoilpi.api.entity.DonationNeed;
import com.conexaoilpi.api.entity.DonationNeed.DonationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationNeedRepository extends JpaRepository<DonationNeed, Long> {

    List<DonationNeed> findByStatusNot(DonationStatus status);

    List<DonationNeed> findByCategory(String category);

    List<DonationNeed> findAllByOrderByStatusAscCreatedAtDesc();
}
