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
@JsonIgnoreProperties({"variants", "active"})
public class Size {
    @Id
    @Type(type="uuid-char")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "active")
    private boolean active;
    @OneToMany(mappedBy = "size", cascade = CascadeType.ALL)
    private Collection<Variant> variants;

    @Override
    public String toString() {
        return super.toString();
    }
}
