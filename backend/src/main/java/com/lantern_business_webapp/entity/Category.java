package com.lantern_business_webapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Collection;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(value = "products")
public class Category {
    @Id
    @Type(type = "uuid-char")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Column(name = "active")
    private boolean active;
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Collection<Product> products;

    public Category(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return String.format("id = %s, name = %s", getId().toString(), getName());
    }
}
