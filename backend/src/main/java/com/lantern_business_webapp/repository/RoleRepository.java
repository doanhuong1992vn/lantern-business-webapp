package com.lantern_business_webapp.repository;

import com.lantern_business_webapp.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Role findByName(String roleCustomer);
}
