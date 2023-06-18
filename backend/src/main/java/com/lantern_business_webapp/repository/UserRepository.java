package com.lantern_business_webapp.repository;

import com.lantern_business_webapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    User findByUsername(String username);

    @Query(nativeQuery = true,
            value = "select * " +
                    "from user u " +
                    "where u.fullname like (:fullname)")
    List<User> findByFullName(@Param("fullname") String fullname);

    @Query(nativeQuery = true,
            value = "select role.name " +
                    "from user join users_roles on user.id = users_roles.user_id " +
                    "join role on role.id = users_roles.role_id " +
                    "WHERE user.username = :username")
    List<String> findRolesByUsername(@Param("username") String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByPhoneContaining(String data);
}
