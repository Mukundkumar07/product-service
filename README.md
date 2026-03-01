# MyArogya Healthcare Platform 🏥

A scalable, production-ready healthcare microservices ecosystem built with Java, Spring Boot, React, and React Native.

## 📁 Project Structure

```text
MyArogya/
├── backend/                  # Spring Boot Microservices
│   ├── ai-service            # Symptom analysis & recommendations
│   ├── api-gateway           # Unified entry point (Port 8080)
│   ├── appointment-service   # Booking & scheduling logic
│   ├── auth-service          # OTP & JWT security
│   ├── doctor-service        # Professional profiles & search
│   ├── eureka-server         # Service discovery (Port 8761)
│   ├── file-service          # AWS S3 storage for medical reports
│   ├── notification-service  # Firebase cloud messaging
│   └── payment-service       # Razorpay integration
│
├── frontend/                 # Client Applications
│   ├── web-dashboard         # Vite + React Admin/Doctor portal
│   └── mobile-app            # React Native Patient application
│
└── docker-compose.yml        # Multi-container orchestration
```

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- Java 17+
- Node.js & npm

### Running the Backend
1. Build and start the services:
   ```bash
   docker-compose up --build -d
   ```
2. Monitor services via Eureka: [http://localhost:8761](http://localhost:8761)

### Running the Web Dashboard
1. Navigate to the dashboard directory:
   ```bash
   cd frontend/web-dashboard
   ```
2. Install dependencies & start:
   ```bash
   npm install
   npm run dev
   ```

## 🔒 Security
- **OTP Verification**: Handled via Redis for 5-minute transient storage.
- **JWT**: Stateless authentication for session management.

## 🛠 Tech Stack
- **Backend**: Spring Boot 3.2, Spring Cloud Gateway, Eureka, OpenFeign.
- **Database**: PostgreSQL (multi-instance), Redis.
- **UI**: React (Web), React Native (Mobile), Vite.
- **Infrastructure**: Docker, AWS S3, Firebase, Razorpay.

---
Developed by **Mukund Kumar**
- **Java Expert** (7+ Years)
- **Spring Boot & Microservices Specialist** (5+ Years)
- **Docker Hub**: `mukundkumar007`

