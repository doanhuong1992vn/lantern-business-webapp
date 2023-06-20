package com.lantern_business_webapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
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
    @Type(type="uuid-char")
    private UUID id;
    @Column(nullable = false)
    private String name;

    private boolean active;
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Collection<Product> products;

    public Category(String name) {
        this.name = name;
    }
//
//    @PrePersist
//    public void prePersist() {
//        if (this.id == null) {
//            this.id = UUID.randomUUID();
//        }
//    }
}
