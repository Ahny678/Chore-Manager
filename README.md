# 🧹 Ahny’s Chore Manager

## A full-stack task manager with React frontend, Express backend, and PostgreSQL database

### Introduction

**Ahny’s Chore Manager** is a **full-stack task management web app** built with **React (frontend), Express.js (backend), PostgreSQL (database), and Docker** for containerized deployment. It allows users to:

- Add, edit, and delete tasks
- Mark tasks as completed or pending
- Filter tasks by status (completed / not completed)
- Clear completed tasks
- Reorder tasks (move up / down)
- Persistent multi-user support (each user has their own task list via username)

This app is ideal for anyone looking for a **personal task manager, chore tracker, or productivity tool** with **modern web technologies** and **scalable Docker-based deployment**.

---

## 📊 Architecture Overview

The project is structured as:

```
/frontend  -> React app served via Nginx
/backend   -> Express.js API with PostgreSQL integration
/db        -> PostgreSQL service managed in Docker Compose
```

**System Diagram:**

```
   React (Frontend)  <--->  Express API (Backend)  <--->  PostgreSQL (Database)
           │                          │
        Docker Nginx              Docker Node.js
           │                          │
           └──────────── Docker Compose ────────────┘
```

---

## 🚀 Installation (Users)

If you just want to run the app:

### **Prerequisites**

- [Docker](https://www.docker.com/) installed
- [Docker Compose](https://docs.docker.com/compose/) installed

### **Steps**

```bash
# Clone the repository
git clone git@github.com:Ahny678/Chore-Manager.git
cd Chore-Manager

# Start all services (frontend, backend, db)
docker compose up --build -d

# Access the app in your browser
http://localhost:8080/
```

The backend will be running on **[http://localhost:5000](http://localhost:5000)** and frontend on **[http://localhost:8080](http://localhost:8080)**.

---

## 🛠️ Installation (Developers / Contributors)

### **Prerequisites**

- Node.js v20+
- PostgreSQL 15+
- npm or yarn

### **Steps**

#### **Backend**

```bash
cd backend
cp .env.example .env   # configure DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
npm install
npm run dev
```

#### **Frontend**

```bash
cd frontend
npm install
npm run dev
```

Now visit **[http://localhost:5173](http://localhost:5173)** for frontend and **[http://localhost:5000](http://localhost:5000)** for backend.

---

## 🤝 Contributor Expectations

We welcome contributions! Please follow these guidelines:

- **Code style:** Keep code clean and consistent with existing style.
- **Commits:** Use clear commit messages (`fix:`, `feat:`, `docs:`).
- **Pull requests:** Provide a clear explanation of changes.
- **Issues:** Open an issue before starting large changes.
- **Testing:** Ensure no breaking changes before submitting.

---

## ⚠️ Known Issues / Limitations

- 🚧 No authentication – usernames are stored in `localStorage` and not validated.
- 🚧 No input validation beyond required fields.
- 🚧 Task reordering is **frontend-only** and does not persist in database.
- 🚧 No support for editing tasks (only add, complete, delete).
- 🚧 Deployment assumes **ports 80, 5000, 8080** are free.
