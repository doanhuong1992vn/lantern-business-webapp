package com.lantern_business_webpp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Integer role;
    @Column(nullable = false, length = 50)
    private String name;
    @Column(nullable = false, length = 50, unique = true)
    private String email;
    @Column(nullable = false, length = 16)
    private String password;
    @Column(name = "is_active", columnDefinition = "boolean default true")
    private boolean isActive;
}
