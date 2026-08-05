# EduScope Connect

EduScope Connect is a comprehensive, full-stack educational technology platform. It serves as a centralized ecosystem where students, educators, and institutions can collaborate, share knowledge, and build academic reputation through community-driven interactions.

## Key Features

- **Community-Driven Q&A:** A structured forum for academic discourse featuring rich-text Markdown formatting, hierarchical tagging, and category-based filtering.
- **Reputation System:** A gamified engagement model that awards points for upvotes, accepted answers, and high-quality contributions, complete with a dynamic leaderboard and tier system.
- **Ecosystem Integration:** A dedicated showcase highlighting a suite of interconnected, AI-powered educational technology tools.
- **Real-Time Collaboration:** Instantaneous UI updates and live polling for upvotes powered by WebSockets (STOMP/SockJS).
- **Responsive Architecture:** A modern, single-column feed layout optimized for both desktop and mobile viewing.
- **Administrative Control:** A secure dashboard for managing user accounts, moderating content, and overseeing ecosystem product listings.

## Technology Stack

**Frontend Framework & Libraries**
- React 18 (Vite)
- Tailwind CSS
- Framer Motion
- React Router DOM
- React SimpleMDE

**Backend Architecture**
- Spring Boot 3.2 (Java 17)
- Spring Security (JWT Authentication)
- Spring Data JPA / Hibernate
- MySQL
- WebSockets (STOMP messaging)

## Installation and Setup

The following instructions will guide you through setting up the project locally for development and testing.

### Prerequisites

Ensure the following dependencies are installed on your system:
- Node.js (v18.x or higher)
- Java Development Kit (JDK 17 or higher)
- MySQL (8.0 or higher)
- Maven (3.8.x or higher)

### 1. Database Configuration

Initialize the MySQL database using the following commands:
```sql
CREATE DATABASE IF NOT EXISTS educonnect;
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON educonnect.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Environment Variables

Create `.env` configuration files to manage local environment settings.

**Backend (`backend/src/main/resources/application.properties`):**
Ensure the database credentials in `application.properties` match your local MySQL configuration.

**Frontend (`frontend/.env`):**
Create a `.env` file in the root of the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:8080
```

### 3. Running the Backend Server

Navigate to the `backend` directory, build the project, and initialize the Spring Boot application:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
*Note: A `DataSeeder` class will automatically populate the database with initial taxonomies and default users when running locally.*

### 4. Running the Frontend Client

Navigate to the `frontend` directory, install dependencies, and start the Vite development server:
```bash
cd frontend
npm install
npm run dev
```
The application will be accessible at `http://localhost:5173`.

## Default Credentials

For local testing purposes, the database seeder provisions the following accounts:

| Role | Email | Password |
| :--- | :--- | :--- |
| Admin | `admin@eduscope.com` | `admin123` |
| User | `sarah.chen@university.edu` | `password123` |

## License

This project is distributed under the MIT License. See the `LICENSE` file for detailed information.
