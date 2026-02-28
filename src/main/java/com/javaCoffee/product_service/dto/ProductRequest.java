package com.javaCoffee.product_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) for creating a new product.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    /** Name of the product to be created */
    private String name;

    /** Description of the product to be created */
    private String description;

    /** Price of the product to be created */
    private Double price;
}
