package com.lantern_business_webpp.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(name = "user_uk", columnNames = {"email", "phone", "username"})})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Role> roles = new HashSet<>();

    @NotBlank
    @Column(name = "fullname", length = 50, nullable = false)
    private String fullName;

    @NotBlank
    @Column(name = "username", length = 20, nullable = false)
    private String username;

    @NotBlank
    @Column(name = "password", length = 20, nullable = false)
    private String password;

    @NotBlank
    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @NotBlank
    @Column(name = "address", length = 255, nullable = false)
    private String address;

    @NotBlank
    @Column(name = "phone", length = 11, nullable = false)
    private String phone;

    @NotBlank
    @Column(name = "avatar", columnDefinition = "text")
    private String avatar;

    private Boolean active;

    @Column(name = "remember_token")
    private String rememberToken;
}

