# Product Service Application Documentation

## Overview
The **Product Service** is a microservice built using Spring Boot and MongoDB. It provides a RESTful interface to manage products, including functionality for creating new products and retrieving all existing products.

## Technology Stack
- **Framework**: Spring Boot 3.5.11
- **Language**: Java 17
- **Database**: MongoDB (NoSQL)
- **Utilities**: 
  - **Lombok**: For boilerplate code reduction (Getters, Setters, Builders, etc.)
  - **SLF4J/Logback**: For application logging.
- **Build Tool**: Maven

## Architecture
The application follows a standard layered architecture:
1.  **Controller Layer**: Handles HTTP requests and interacts with the Service layer.
2.  **Service Layer**: Contains business logic and orchestrates data Flow between DTOs and Entities.
3.  **Repository Layer**: Manages data persistence using Spring Data MongoDB.
4.  **Model/DTO Layer**: Defines the data structure for persistence (Entities) and communication (DTOs).

## API Endpoints

### 1. Create Product
- **URL**: `/api/product`
- **Method**: `POST`
- **Request Body**: `ProductRequest`
  ```json
  {
    "name": "Coffee Maker",
    "description": "High-quality espresso machine",
    "price": 1200.00
  }
  ```
- **Response**: `201 Created`

### 2. Get All Products
- **URL**: `/api/product`
- **Method**: `GET`
- **Response**: `200 OK`
- **Response Body**: List of `ProductResponse`
  ```json
  [
    {
      "id": "60d5ec...",
      "name": "Coffee Maker",
      "description": "High-quality espresso machine",
      "price": 1200.00
    }
  ]
  ```

## Configuration
The application connectivity to MongoDB is configured in `src/main/resources/application.properties`:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/product-service
```

## How to Run
1.  Ensure MongoDB is running locally on port `27017`.
2.  Run the application using Maven:
    ```bash
    mvn spring-boot:run
    ```
3.  Or build and run the JAR:
    ```bash
    mvn clean package
    java -jar target/product-service-0.0.1-SNAPSHOT.jar
    ```
