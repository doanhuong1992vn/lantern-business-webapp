package com.lantern_business_webapp.repository;

import com.lantern_business_webapp.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SizeRepository extends JpaRepository<Size, UUID> {
    List<Size> findByActiveTrue();

    Size findByNameAndActiveTrue(String size);
}
