package com.javaCoffee.product_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) for product information returned by the API.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    /** Unique identifier of the product */
    private String id;

    /** Name of the product */
    private String name;

    /** Description of the product */
    private String description;

    /** Price of the product */
    private Double price;
}
