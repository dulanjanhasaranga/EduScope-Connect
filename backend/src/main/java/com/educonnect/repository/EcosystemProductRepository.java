package com.educonnect.repository;

import com.educonnect.model.EcosystemProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EcosystemProductRepository extends JpaRepository<EcosystemProduct, String> {
}
