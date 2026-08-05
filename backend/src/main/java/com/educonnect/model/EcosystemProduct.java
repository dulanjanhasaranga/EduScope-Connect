package com.educonnect.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ecosystem_products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EcosystemProduct {

    @Id
    @Column(name = "product_id", nullable = false, unique = true)
    private String id; // e.g. "facultylens"

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false)
    private String tagline;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false)
    private String icon;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false, name = "bg_color")
    private String bgColor;

    @Column(nullable = false, name = "border_color")
    private String borderColor;

    @Column(nullable = false, name = "icon_color")
    private String iconColor;

    @Column(name = "image_url")
    private String imageUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "ecosystem_product_features", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "feature")
    @Builder.Default
    private List<String> features = new ArrayList<>();
}
