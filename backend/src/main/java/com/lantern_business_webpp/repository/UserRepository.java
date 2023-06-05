package com.lantern_business_webpp.repository;

import com.lantern_business_webpp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    @Query(nativeQuery = true, value = "select * " +
            "from user u " +
            "where u.fullname like (:fullname);")
    List<User> findByFullName(@Param("fullname") String fullname);

    @Query(nativeQuery = true,
            value = "SELECT r.name FROM role r " +
                    "INNER JOIN user u ON r.id = u.role_id " +
                    "WHERE u.username = :username")
    List<String> findRolesByUsername(@Param("username") String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);
}
