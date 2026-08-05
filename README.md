# EduScope Connect: Technical Documentation & Architecture

EduScope Connect is a comprehensive, full-stack educational technology platform. It serves as a centralized ecosystem where students, educators, and institutions can collaborate, share knowledge, and build academic reputation through community-driven interactions.

This document provides a complete technical overview of the project's architecture, directory structure, module breakdown, and deployment configuration.

---

## 1. System Architecture

The application follows a modern decoupled architecture:
- **Client Tier:** A single-page application (SPA) built with React and Vite. State is managed via React Context and data fetching is handled through Axios with HTTP interceptors for JWT token lifecycle management.
- **Application Tier:** A RESTful API built on Spring Boot 3.2. It manages business logic, stateless security, and transactional database operations.
- **Data Tier:** A MySQL relational database managing persistent entities, relationships, and metadata.
- **Messaging Tier:** WebSockets via STOMP protocol enabling real-time vote count updates and new post notifications.

---

## 2. Directory Structure

The repository is partitioned into two independent applications.

### Backend Structure (`/backend`)
The backend is structured by feature components following standard Spring MVC patterns.

```text
backend/src/main/java/com/educonnect/
├── config/              # Configuration classes (Security, WebSockets, CORS, DataSeeding)
├── controller/          # REST API Endpoints (Auth, Questions, Ecosystem, Admin)
├── dto/                 # Data Transfer Objects for API requests/responses
├── model/               # JPA Entity Definitions (User, Question, Answer, Vote, Tag)
├── repository/          # Spring Data JPA Interfaces for database access
├── security/            # JWT Filters, Authentication Providers, UserDetails configuration
├── service/             # Core Business Logic and transactional boundaries
└── websocket/           # WebSocket configuration and STOMP event listeners
```

### Frontend Structure (`/frontend`)
The frontend organizes code by React component boundaries and functional routing.

```text
frontend/src/
├── components/          # Reusable UI elements (Navbar, Modals, Cards, Loaders)
├── context/             # Global State Management (AuthContext, WebSocketContext)
├── pages/               # Route-level components (Dashboards, Question Feed, Detail Views)
├── utils/               # Helper functions (Axios interceptor setup, class string joiners)
├── App.jsx              # Main application router definition
└── main.jsx             # React DOM entry point
```

---

## 3. Core Modules

### Authentication & Security
- **JWT Implementation:** Secure, stateless authentication utilizing JSON Web Tokens. Access tokens are kept short-lived while refresh tokens manage extended sessions.
- **Role-Based Access Control (RBAC):** Privileges are dynamically resolved based on user roles (`ADMIN`, `STUDENT`). 
- **Security Chain:** `JwtAuthenticationFilter` intercepts HTTP requests, validates tokens via the `Authorization` header, and populates the Spring Security Context.

### Question & Answer Engine
- **Markdown Processing:** Questions and answers utilize rich-text formatting processed via `react-simplemde-editor` and safely rendered using `react-markdown`.
- **Relational Integrity:** Implemented through JPA associations. Questions map `OneToMany` with Answers and Votes. Users maintain `OneToMany` relationships with all their generated content.

### Reputation & Gamification System
- **Points Algorithm:** Users accrue reputation dynamically based on community interactions:
  - Receiving upvotes on answers/questions.
  - Having an answer marked as 'Accepted'.
- **Rank Calculation:** The frontend maps numerical reputation scores to visual tiers (e.g., Legend, Expert, Mentor).

### Real-Time Interactions
- **WebSocket Protocol:** Implemented via Spring WebSocket (`@EnableWebSocketMessageBroker`). 
- **STOMP Channels:** Clients subscribe to `/topic/questions` for global feed updates and `/topic/question/{id}/votes` for isolated, real-time polling updates on specific threads.

---

## 4. Setup and Installation

### Prerequisites
- Node.js (v18.x+)
- Java Development Kit (JDK 17+)
- MySQL (8.0+)
- Maven (3.8.x+)

### Environment Configuration

Before initializing the servers, ensure the following environments are configured.

**Backend (`backend/src/main/resources/application.properties`):**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/educonnect
spring.datasource.username=root
spring.datasource.password=your_password
jwt.secret=YourHighlySecureBase64EncodedSecretStringHere
```

**Frontend (`frontend/.env`):**
```env
VITE_API_BASE_URL=http://localhost:8080
```

### Server Initialization

**Initialize the Database:**
Execute the following SQL command to provision the schema shell:
```sql
CREATE DATABASE IF NOT EXISTS educonnect;
```

**Boot the Backend:**
Navigate to the `/backend` directory:
```bash
mvn clean install
mvn spring-boot:run
```
*(The backend executes on port 8080. A development `DataSeeder` automatically injects base administrative accounts and testing tags).*

**Boot the Frontend:**
Navigate to the `/frontend` directory:
```bash
npm install
npm run dev
```
*(The client executes on port 5173).*

---

## 5. Development Defaults

If the environment is configured correctly, the database seeder will initialize the following administrative credentials for immediate development access:

- **Admin Control:** `admin@eduscope.com` (Password: `admin123`)
- **Standard User:** `sarah.chen@university.edu` (Password: `password123`)

---

## 6. Licensing

This software is distributed under the MIT License. See the `LICENSE` file for detailed administrative guidelines.
