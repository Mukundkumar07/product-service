package com.javaCoffee.product_service.controller;

import com.javaCoffee.product_service.dto.ProductRequest;
import com.javaCoffee.product_service.dto.ProductResponse;
import com.javaCoffee.product_service.model.Product;
import com.javaCoffee.product_service.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing Product related operations.
 * Provides endpoints for creating and retrieving products.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
@Slf4j
@CrossOrigin // Enabling CORS for local frontend development
public class ProductController {

    // Injecting ProductService to handle business logic
    private final ProductService productService;

    /**
     * Endpoint to create a new product.
     * Maps to POST /api/product
     * 
     * @param productRequest The DTO containing product details to be created.
     * @return The created ProductResponse.
     */
    @PostMapping(consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED) // Returns 201 Created status upon successful execution
    public ProductResponse createProduct(@RequestBody ProductRequest productRequest) {
        log.info("Received request to create product: {}", productRequest.getName());
        return productService.createProduct(productRequest);
    }

    /**
     * Endpoint to retrieve all products.
     * Maps to GET /api/product
     * 
     * @return List of ProductResponse DTOs containing product details.
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK) // Returns 200 OK status
    public List<ProductResponse> getAllProducts() {
        log.info("Received request to fetch all products");
        return productService.getAllProducts();
    }

    /**
     * Endpoint to delete a product.
     * Maps to DELETE /api/product/{id}
     * 
     * @param id The ID of the product to delete.
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Returns 204 No Content status upon successful execution
    public void deleteProduct(@PathVariable String id) {
        log.info("Received request to delete product with ID: {}", id);
        productService.deleteProduct(id);
    }
}
