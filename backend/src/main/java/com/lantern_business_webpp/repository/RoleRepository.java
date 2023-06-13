package com.lantern_business_webpp.repository;

import com.lantern_business_webpp.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String roleCustomer);
}
