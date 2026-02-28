# Product Service Application Documentation

## Overview
The **Product Service** is a full-stack application built using a Spring Boot backend and a modern React frontend. It provides a luxurious interface to manage artisan products, with a real-time connection to a MongoDB database.

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.5.11
- **Language**: Java 17
- **Database**: MongoDB (NoSQL)
- **Testing**: Testcontainers (MongoDB), JUnit 5, MockMvc

### Frontend
- **Framework**: React 18 (via Vite)
- **Styling**: Vanilla CSS (Custom Glassmorphic Design System)
- **State Management**: React Hooks (useState, useEffect)
- **API Client**: Axios
- **Icons**: Lucide React

## Architecture
- **Backend**: Standard layered architecture (Controller -> Service -> Repository).
- **Frontend**: Component-based React architecture with a responsive, premium grid view.
- **Integration**: CORS-enabled REST API communication.

## API Endpoints

### 1. Create Product
- **URL**: `/api/product`
- **Method**: `POST`
- **Request Body**: `ProductRequest`
- **Response**: `201 Created`

### 2. Get All Products
- **URL**: `/api/product`
- **Method**: `GET`
- **Response**: `200 OK`

## How to Run

### 1. Start the Backend
- Ensure MongoDB is running on port `27017`.
- Run from the root directory:
  ```bash
  ./mvnw spring-boot:run
  ```

### 2. Start the Frontend
- Navigate to the frontend directory:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- Open your browser at **http://localhost:5173**.

## Design Features
- **Modern Glassmorphism**: Cards and panels feature frosted glass effects.
- **Premium Aesthetics**: Gold-accented dark theme tailored for high-end boutique experiences.
- **Dynamic Animations**: Smooth hover transitions and sliding modal entry for product creation.
- **Responsive Layout**: Designed to look stunning on all screen sizes.
