package com.javaCoffee.product_service.repository;

import com.javaCoffee.product_service.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Repository interface for Product entity.
 * Provides standard MongoDB CRUD operations through MongoRepository.
 */
public interface ProductRepository extends MongoRepository<Product, String> {

}
