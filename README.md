<div align="center">

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)

**A full-stack collaborative learning ecosystem and Q&A platform built with Spring Boot and React.**

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Project Structure](#-project-structure) · [Contributors](#-contributors)

</div>

---

## 📋 About the Project

**EduScope Connect** is a comprehensive educational technology platform where students, educators, and institutions converge to share knowledge, discover opportunities, and build their academic reputation. Inspired by community forums like Quora and StackOverflow, it serves as a centralized hub for modern learning.

The system supports interactive Q&A, real-time collaboration, and ecosystem product showcasing, ensuring a seamless experience for both learners and educational administrators.

### 🎯 Problem It Solves

- Eliminates fragmented learning by centralizing academic Q&A
- Provides a platform for real-time peer-to-peer tutoring and doubt clearing
- Enables educators to build verifiable academic reputation through gamification
- Automates the curation of educational resources and ecosystem products
- Streamlines the management of academic tags and taxonomies

---

## ✨ Features

### 👤 Student / User Features
| Feature | Description |
|---------|-------------|
| **User Registration & Login** | Secure account creation and JWT-based authentication |
| **Browse Questions** | Explore community questions with tags, categories, and real-time vote counts |
| **Ask Questions** | Post academic questions using a rich Markdown editor |
| **Provide Answers** | Write detailed answers with code snippets and image support |
| **Reputation System** | Earn points dynamically for upvotes and accepted answers |
| **Ecosystem Discovery** | Browse AI-powered educational tools via the product showcase |
| **Profile Management** | Update personal information, bio, and track earned ranks (e.g., Expert, Legend) |

### 👨‍🏫 Educator Features
| Feature | Description |
|---------|-------------|
| **Knowledge Sharing** | Answer complex questions to build platform reputation |
| **Content Moderation** | Highly-ranked users can verify and accept correct answers |
| **Real-time Collaboration** | Instantaneous UI updates and live polling for upvotes via WebSockets |
| **Waitlist Enrollment** | Sign up for early access to upcoming ecosystem products |

### 🔑 Admin Features
| Feature | Description |
|---------|-------------|
| **Admin Dashboard** | Complete platform overview with real-time statistics |
| **Tag Management** | Create, update, and categorize hierarchical knowledge tags |
| **Ecosystem Management** | Add, edit, and manage educational products in the showcase |
| **User Moderation** | Monitor user accounts and handle administrative workflows |
| **All User Features** | Full access to every community capability |

### ⚙️ Backend Features
| Feature | Description |
|---------|-------------|
| **RESTful API** | Clean REST API architecture for all core entities |
| **JWT Authentication** | Stateless, token-based security |
| **WebSocket Integration** | STOMP messaging for real-time feed updates |
| **Role-Based Access Control** | Method-level security with Spring Security |
| **Global Exception Handling** | Centralized error responses via `@ControllerAdvice` |
| **CORS Configuration** | Configurable cross-origin support for Vite client |
| **Auto Schema Management** | Hibernate DDL auto-update for development |
| **Sample Data Seeding** | `DataSeeder` populates demo tags, products, and users on first run |

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Java** | 17 | Core language |
| **Spring Boot** | 3.2.0 | Application framework |
| **Spring Security** | 6.x | Authentication & authorization |
| **Spring Data JPA** | 3.2.x | Database access & ORM |
| **Hibernate** | 6.x | JPA implementation |
| **MySQL** | 8.0+ | Relational database |
| **WebSockets** | 3.2.0 | Real-time STOMP messaging |
| **Maven** | 3.8+ | Build tool & dependency management |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.2 | UI framework |
| **Vite** | 5.0 | Build tool & dev server |
| **React Router** | 6.20 | Client-side routing |
| **Tailwind CSS** | 3.4 | Utility-first styling |
| **Framer Motion** | 10.x | Fluid animations |
| **React SimpleMDE** | 5.x | Markdown editing |
| **Axios** | 1.6 | HTTP Client with Interceptors |
| **Lucide React** | 0.3 | Icon library |
| **SockJS / STOMP** | Latest | Client-side WebSocket handling |

---

## 🏗 Project Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                     │
│  ┌─────────┐ ┌──────────┐ ┌───────────┐ ┌────────────┐ │
│  │  Pages  │ │Components│ │  Contexts  │ │    Utils   │ │
│  └────┬────┘ └────┬─────┘ └─────┬─────┘ └──────┬─────┘ │
└───────┼───────────┼─────────────┼──────────────┼───────┘
        │           │             │              │
        ▼           ▼             ▼              ▼
┌─────────────────────────────────────────────────────────┐
│                    BACKEND (Spring Boot)                 │
│  ┌─────────┐ ┌──────────┐ ┌───────────┐ ┌────────────┐ │
│  │ Security│ │Controller│ │ WebSocket │ │  Services  │ │
│  └────┬────┘ └────┬─────┘ └─────┬─────┘ └──────┬─────┘ │
│       │           │             │              │       │
│       ▼           ▼             ▼              ▼       │
│  ┌───────────────────────────────────────────────────┐ │
│  │                    Repository                     │ │
│  └────────────────────────┬──────────────────────────┘ │
└───────────────────────────┼────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     DATABASE (MySQL)                     │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
- Node.js (v18.x or higher)
- Java Development Kit (JDK 17 or higher)
- MySQL (8.0 or higher)
- Maven (3.8.x or higher)

### 1. Database Configuration
Initialize the MySQL database:
```sql
CREATE DATABASE IF NOT EXISTS educonnect;
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON educonnect.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Environment Variables
Create `.env` configuration files for the frontend:
```env
# frontend/.env
VITE_API_BASE_URL=http://localhost:8080
```
Update your backend database credentials in `backend/src/main/resources/application.properties`.

### 3. Running the Backend Server
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 4. Running the Frontend Client
```bash
cd frontend
npm install
npm run dev
```
Access the application at `http://localhost:5173`.

---

## 🔐 Default Test Accounts

If the `DataSeeder` runs successfully, use these credentials for immediate testing:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@eduscope.com` | `admin123` |
| **User** | `sarah.chen@university.edu` | `password123` |

---

## 🤝 Contributors

Contributions are welcome! If you'd like to improve the platform:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
<div align="center">
  <p>Distributed under the MIT License.</p>
</div>
