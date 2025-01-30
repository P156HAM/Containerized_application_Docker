# 🚀 Docker Compose Project

This project is structured with a **backend**, **frontend**, and **Mongo database**, using **Docker Compose**.

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/P156HAM/Containerized_application_Docker.git
cd Containerized_application_Docker
```

### 2️⃣ Configure Environment Variables

First, run:

```sh
cp .env.example .env
```

Then, edit the .env file and update the necessary credentials (MONGO_ADMIN_USER, MONGO_ADMIN_PASS, DB_NAME).

### 3️⃣ Start the Application with Docker

Run the following command to start all services:

```sh
docker-compose up --build
```
