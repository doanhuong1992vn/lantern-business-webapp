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
@JsonIgnoreProperties({"variants", "active"})
public class Color {
    @Id
    @Type(type="uuid-char")
    private UUID id;
    @Column(name = "name", length = 50, nullable = false)
    private String name;
    private boolean active;
    @OneToMany(mappedBy = "color", cascade = CascadeType.ALL)
    private Collection<Variant> variants;
}
