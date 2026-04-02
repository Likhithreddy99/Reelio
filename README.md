# Reelio Platform

Reelio is a full-stack booking platform that allows clients to discover, search for, and book cinematographers. Keep your video scheduling and talent discovery in one simple, unified interface! 

This project was built to demonstrate full-stack web development using modern technologies. While it focuses on being accessible and simple as a student-level project, it integrates many powerful features across its architecture.

---

## 🏗 Architecture & Technologies

### Backend (`/backend`)
A Decoupled REST API built in Java to handle user authentication, booking logic, and search.
- **Framework:** Spring Boot, Spring MVC
- **Database:** PostgreSQL with JPA/Hibernate managing relational entities.
- **Security:** JWT Authentication and Role-Based Access Control (RBAC).
- **AI Integration:** Spring AI with Ollama to enable natural-language search and personalized cinematographer discovery.
- **Containerization:** Configured for Docker to manage cross-service deployments smoothly.

### Frontend (`/frontend`)
The presentation layer handling user experience and client interactions.
- **Framework:** React.js
- **Styling:** CSS natively, along with React-Bootstrap.
- **Features:** Responsive SPA design, Protected Client & Cinematographer routing, and dynamic data fetching.

---

## ✨ Features

- **RBAC Authenticated System:** Distinct user permissions for `CLIENT` and `CINEMATOGRAPHER`.
- **Booking Engine:** Ability for clients to secure time blocks. A built-in buffer algorithm prevents consecutive bookings with less than a 1-hour margin of overlap.
- **Intelligent Discovery:** AI-powered search allows fetching cinematographers based on semantic keywords.
- **Optimized Communication:** Designed using DTOs to map model data nicely over standard REST constraints, minimizing server payload overhead.

---

## 🚀 Getting Started locally

1. **Start the database:** 
   Use the included docker-compose configuration to spin up the required PostgreSQL containers.
   ```bash
   docker-compose up -d
   ```

2. **Launch the backend:**
   Navigate into the `/backend` directory and start the Spring app.
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

3. **Launch the frontend:**
   Navigate into the `/frontend` directory and serve the React interface.
   ```bash
   cd frontend
   npm run dev
   ```

*Note: Make sure your local `.env` or application configuration files have the appropriate database credentials set before starting.*
