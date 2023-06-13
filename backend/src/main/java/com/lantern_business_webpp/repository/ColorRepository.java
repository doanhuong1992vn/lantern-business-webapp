package com.lantern_business_webpp.repository;

import com.lantern_business_webpp.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ColorRepository extends JpaRepository<Color, Long> {
    List<Color> findByIsActiveTrue();
}
