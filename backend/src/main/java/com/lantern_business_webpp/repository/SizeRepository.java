package com.lantern_business_webpp.repository;

import com.lantern_business_webpp.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SizeRepository extends JpaRepository<Size, Long> {
    List<Size> findByIsActiveTrue();
}
