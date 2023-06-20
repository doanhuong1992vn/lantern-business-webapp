package com.lantern_business_webapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(value = "product")
public class Variant {
    @Id
    @Type(type="uuid-char")
    private UUID id;
    @Column(columnDefinition = "DOUBLE NOT NULL CHECK ( PRICE >= 0 )")
    private Double importPrice;
    @Column(columnDefinition = "DOUBLE NOT NULL CHECK ( PRICE >= 0 )")
    private Double salePrice;

    @Column(columnDefinition = "INT NOT NULL CHECK ( QUANTITY >= 0 )")
    private Integer quantity;
    @Column(name = "active")
    private boolean active;
    @Column(name = "is_show")
    private boolean isShow;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "size_id", referencedColumnName = "id")
    private Size size;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "color_id", referencedColumnName = "id")
    private Color color;

    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = UUID.randomUUID();
        }
    }
}
