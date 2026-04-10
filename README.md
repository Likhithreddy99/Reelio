# Reelio - Cinematographer Booking Platform
A simple platform for clients to book cinematographers for their video projects.
## Tech Stack
- **Backend**: Spring Boot, PostgreSQL, JPA/Hibernate, JWT
- **Frontend**: React, Axios
- **Database**: PostgreSQL
- **Containerization**: Docker
## Features
- User authentication (Clients & Creators)
- Booking system with time slot management
- Creator profiles and blogs
- 1-hour buffer before/after bookings
## Project Structure
```
reelio/
├── backend/          # Spring Boot application
├── frontend/         # React application
└── docker-compose.yml
```
## Getting Started
1. Start PostgreSQL database
2. Run backend: `cd backend && ./mvnw spring-boot:run`
3. Run frontend: `cd frontend && npm start`
4. Access at http://localhost:3000
