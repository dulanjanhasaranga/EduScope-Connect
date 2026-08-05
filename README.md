<div align="center">
  <img src="https://img.icons8.com/color/96/000000/graduation-cap.png" alt="EduScope Logo" width="80" />
  
  # EduScope Connect

  **A modern, community-driven Q&A and collaborative learning ecosystem.**

  [![React](https://img.shields.io/badge/React-18.x-blue.svg?style=flat-square&logo=react)](https://reactjs.org/)
  [![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-brightgreen.svg?style=flat-square&logo=spring)](https://spring.io/projects/spring-boot)
  [![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg?style=flat-square&logo=mysql)](https://www.mysql.com/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#environment-variables">Environment Variables</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## 📖 About The Project

EduScope Connect is a premium, full-stack educational technology platform where students, educators, and institutions converge to share knowledge, discover opportunities, and build their academic reputation. 

Inspired by top-tier community forums like Quora and StackOverflow, the platform is designed to provide intelligent solutions for modern learning through community-driven Q&A, real-time collaboration, and a gamified reputation system.

## ✨ Features

- 💬 **Community-Driven Q&A:** Ask questions, write detailed answers using a rich Markdown editor, and categorize knowledge using hierarchical tags.
- 🏆 **Gamified Reputation System:** Users earn points for upvotes, accepted answers, and high-quality contributions. Climb the Leaderboard through dynamic rank tiers (Legend, Expert, Mentor).
- 🚀 **Ecosystem Showcase:** An elegant product showcase page displaying a suite of AI-powered educational technology tools with category filtering.
- ⚡ **Real-Time Collaboration:** Experience instant UI updates and live vote polling powered by WebSockets (STOMP/SockJS).
- 📱 **Fully Responsive UI:** A modern, Quora-style layout meticulously designed with Tailwind CSS and Framer Motion for a fluid, mobile-first experience.
- 🛡️ **Admin Dashboard:** Secure administrative panel to manage users, control ecosystem products, and moderate platform content.

## 💻 Tech Stack

### Frontend
- **React 18** (Vite)
- **Tailwind CSS** (Utility-first styling)
- **Framer Motion** (Fluid animations)
- **React Router DOM** (Client-side routing)
- **Lucide React** (Crisp iconography)
- **React SimpleMDE / React Markdown** (Rich text editing)

### Backend
- **Spring Boot 3.2** (Java 17)
- **Spring Security & JWT** (Stateless authentication)
- **Spring Data JPA / Hibernate** (ORM)
- **MySQL** (Relational Database)
- **WebSockets** (STOMP messaging)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
* **Node.js** (v18 or higher) & **npm**
* **Java Development Kit (JDK)** 17 or higher
* **MySQL** 8.0+
* **Maven** 3.8+

### 1. Database Setup

Start your MySQL server and create the database:
```sql
CREATE DATABASE IF NOT EXISTS educonnect;
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON educonnect.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Environment Variables

Create `.env` files to securely store your credentials.

**Backend (`backend/src/main/resources/application.properties`):**
Replace hardcoded credentials with environment variables on your system, or update the `application.properties` to match your local database credentials.

**Frontend (`frontend/.env`):**
Create a `.env` file in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:8080
```

### 3. Running the Backend

Navigate to the `backend` directory and start the Spring Boot server:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
> **Note:** The backend includes a `DataSeeder` that will automatically populate the database with tags, ecosystem products, and default users (if not running in the `prod` profile).

### 4. Running the Frontend

Open a new terminal window, navigate to the `frontend` directory, and start the Vite development server:
```bash
cd frontend
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🔐 Default Test Accounts

If the `DataSeeder` runs successfully, you can log in immediately with these default accounts:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@eduscope.com` | `admin123` |
| **Professor** | `sarah.chen@university.edu` | `password123` |

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  <p>Built with ❤️ for modern education.</p>
</div>
