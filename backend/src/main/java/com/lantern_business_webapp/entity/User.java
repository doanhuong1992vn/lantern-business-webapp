package com.lantern_business_webapp.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(name = "user_uk", columnNames = {"email", "phone", "username"})})
public class User {
    @Id
    private UUID id;
    @Column(name = "fullname", length = 50, nullable = false)
    private String fullName;
    @Column(name = "username", length = 20, nullable = false)
    private String username;
    @Column(name = "password", columnDefinition = "TEXT", nullable = false)
    private String password;
    @Column(name = "email", length = 50, nullable = false)
    private String email;
    @Column(name = "phone", length = 10, nullable = false)
    private String phone;
    @Column(name = "active")
    private Boolean active;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Role> roles = new HashSet<>();
    @Column(name = "remember_token")
    private String rememberToken;
}

