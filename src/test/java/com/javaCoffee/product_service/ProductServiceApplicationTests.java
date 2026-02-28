package com.javaCoffee.product_service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

/**
 * Integration test for Product Service using Testcontainers for MongoDB.
 */
@SpringBootTest
@Testcontainers
class ProductServiceApplicationTests {

	/**
	 * Starts a MongoDB container and automatically configures Spring Data MongoDB
	 * to use it
	 */
	@Container
	@ServiceConnection
	static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:7.0.5");

	@Test
	void contextLoads() {
		// Test passes if the Spring application context starts successfully with the
		// Testcontainer
	}

}
