package com.lantern_business_webpp.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "name", length = 50, nullable = false)
    private String name;
    @Column(name = "is_active")
    private boolean isActive;
    @OneToMany(mappedBy = "color", cascade = CascadeType.ALL)
    private Collection<Variant> variants;
}
