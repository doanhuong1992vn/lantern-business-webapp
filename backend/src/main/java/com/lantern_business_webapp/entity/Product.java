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
@JsonIgnoreProperties({"variants", "category", "active", "show"})
public class Product {
    @Id
    @Type(type="uuid-char")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(columnDefinition = "TEXT")
    private String image;
    @Column(name = "active")
    private boolean active;
    @Column(name = "is_shown")
    private boolean isShown;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Collection<Variant> variants;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @Override
    public String toString() {
        return String.format("id = %s, name = %s, description = %s, image = %s, active = %b, isShown = %b",
                getId().toString(), getName(), getDescription(), getImage(), isActive(), isShown());
    }
}
