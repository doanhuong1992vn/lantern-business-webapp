package com.lantern_business_webapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Objects;
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
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @Column(name = "import_price", columnDefinition = "DOUBLE NOT NULL CHECK ( IMPORT_PRICE >= 0 )")
    private Double importPrice;
    @Column(name = "sale_price", columnDefinition = "DOUBLE NOT NULL CHECK ( SALE_PRICE >= 0 )")
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

    @Override
    public String toString() {
        return String.format("id = %s, importPrice = %f, salePrice = %f, quantity = %d, active = %b, isShow = %b",
                getId().toString(), getImportPrice(), getSalePrice(), getQuantity(), isActive(), isShow());
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Variant variant = (Variant) obj;
        return Objects.equals(id == null ? null : id.toString(), variant.id == null ? null : variant.id.toString())
                && Objects.equals(importPrice, variant.getImportPrice())
                && Objects.equals(salePrice, variant.getSalePrice())
                && Objects.equals(quantity, variant.getQuantity())
                && Objects.equals(size.getName(), variant.getSize().getName())
                && Objects.equals(color.getName(), variant.getColor().getName());
    }
}
