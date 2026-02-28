package com.javaCoffee.product_service.service;

import com.javaCoffee.product_service.dto.ProductResponse;
import com.javaCoffee.product_service.model.Product;
import com.javaCoffee.product_service.dto.ProductRequest;
import com.javaCoffee.product_service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for handling Product business logic.
 * Interacts with the ProductRepository to perform CRUD operations.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

  private final ProductRepository productRepository;

  /**
   * Creates a new product based on the provided request.
   * 
   * @param productRequest DTO containing name, description, and price of the
   *                       product.
   */
  public void createProduct(ProductRequest productRequest) {
    // Map DTO to Model using Builder pattern
    Product product = Product.builder()
        .name(productRequest.getName())
        .description(productRequest.getDescription())
        .price(productRequest.getPrice())
        .build();

    // Persist product to database
    productRepository.save(product);
    log.info("Product created successfully with ID: {}", product.getId());
  }

  /**
   * Fetches all products from the database and maps them to DTOs.
   * 
   * @return List of ProductResponse DTOs.
   */
  public List<ProductResponse> getAllProducts() {
    log.info("Fetching all products from repository");
    List<Product> products = productRepository.findAll();

    // Map List of Product entities to List of ProductResponse DTOs
    return products.stream()
        .map(this::mapToProductResponse)
        .toList();
  }

  /**
   * Helper method to map a Product entity to a ProductResponse DTO.
   * 
   * @param product The Product entity to map.
   * @return The mapped ProductResponse DTO.
   */
  private ProductResponse mapToProductResponse(Product product) {
    return ProductResponse.builder()
        .id(product.getId())
        .name(product.getName())
        .description(product.getDescription())
        .price(product.getPrice())
        .build();
  }
}
