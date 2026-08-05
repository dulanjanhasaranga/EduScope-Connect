# Eduscope Connect - Collaborative Study & Doubt-Clearing Portal

Eduscope Connect is a premier, full-stack educational technology platform where students, educators, and institutions converge to share knowledge, discover opportunities, and build reputation. The platform is designed to provide intelligent solutions for modern learning through community-driven Q&A, an advanced technology ecosystem showcase, and gamified reputation systems.

## 🚀 Features

* **Community-Driven Q&A:** Post academic questions, write answers, and utilize rich-text formatting (Markdown) with tags and categories.
* **Reputation System:** Gamified user experience where users earn points for getting upvoted, having answers accepted, and providing high-quality contributions. Includes a fully-featured Leaderboard with rank tiers (Legend, Expert, Mentor, etc.).
* **Ecosystem Showcase:** An elegant product showcase page displaying our suite of AI-powered educational technology platforms with category filtering and interactive modals.
* **Waitlist Management:** Integrated waitlist signup flow for upcoming products within the ecosystem.
* **Admin Dashboard:** A secured area to manage ecosystem products, tag hierarchies, and handle administrative tasks.
* **Real-time Updates:** Instant UI feedback and live polling for upvotes via WebSockets.

## 🛠️ Tech Stack

**Frontend:**
* **React 18** with Vite
* **Tailwind CSS** for modern, responsive, utility-first styling
* **Framer Motion** for fluid animations and page transitions
* **React Router DOM** for client-side routing
* **Lucide React** for crisp, scalable iconography
* **React SimpleMDE** for Markdown editing
* **STOMP.js + SockJS** for WebSocket communication

**Backend:**
* **Spring Boot 3.2** (Java 17)
* **Spring Security** with JWT Authentication
* **Spring Data JPA** & Hibernate
* **MySQL** with auto-configuration
* **Maven** for build management
* **BCrypt** for password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
* **Node.js** (v18 or higher)
* **Java Development Kit (JDK)** 17 or higher
* **MySQL 8.0+**
* **Maven 3.8+**

## 🔧 Installation & Setup

### 1. Database Setup

Start MySQL and create the database (or let auto-creation handle it):
```sql
CREATE DATABASE IF NOT EXISTS educonnect;
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON educonnect.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Backend Setup
Navigate to the `backend` directory and start the Spring Boot server:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
*The backend server will start on `http://localhost:8080`.*
*(Note: A `DataSeeder` is included which automatically populates the database with initial users, products, and tags on startup for easy testing).*

### 3. Frontend Setup
Open a new terminal window, navigate to the `frontend` directory, and start the Vite development server:
```bash
cd frontend
npm install
npm run dev
```
*The frontend application will be available at `http://localhost:5173`.*

## 🔒 Default Accounts (For Testing)

The database is seeded with a few default accounts you can use to log in immediately:
* **Admin Account:** `admin@eduscope.com` / `password123`
* **Test User:** `test@example.com` / `password123`

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/yourusername/educonnect/issues) if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. This project is built for academic purposes as per the EduConnect SRS document.
