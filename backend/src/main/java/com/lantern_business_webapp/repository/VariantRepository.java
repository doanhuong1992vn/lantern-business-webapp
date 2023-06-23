package com.lantern_business_webapp.repository;

import com.lantern_business_webapp.entity.Product;
import com.lantern_business_webapp.entity.Variant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VariantRepository extends JpaRepository<Variant, UUID> {
    List<Variant> findByProductOrderByColorAsc(Product product);
}
