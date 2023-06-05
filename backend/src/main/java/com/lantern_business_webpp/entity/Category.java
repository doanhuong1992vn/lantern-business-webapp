package com.lantern_business_webpp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(value = "products")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(name = "active", columnDefinition = "boolean default true")
    private boolean active;
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Collection<Product> products;

    public Category(String name) {
        this.name = name;
    }

}
