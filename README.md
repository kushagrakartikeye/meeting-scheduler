# 📅 Meeting Scheduler App

![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success)
![License](https://img.shields.io/badge/License-MIT-yellow)
[![Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://meeting-scheduler-backend-ten.vercel.app)

**Live Demo:** [https://meeting-scheduler-backend-ten.vercel.app](https://meeting-scheduler-backend-ten.vercel.app)

---

## 📑 Table of Contents

* [Project Overview](#project-overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [Environment Variables](#environment-variables)
* [Scripts](#scripts)
* [Folder Structure](#folder-structure)
* [Deployment](#deployment)
* [Authentication Flow](#authentication-flow)
* [Contributing](#contributing)
* [Future Plans](#future-plans)
* [Contact](#contact)

---

## 📌 Project Overview

**Meeting Scheduler** is a full-stack web application that allows users to create, manage, and participate in meetings with features like **JWT authentication**, participant management, and real-time notifications.

* **Frontend:** React + Vite
* **Backend:** Node.js + Express + MongoDB
* **Deployment:** Unified on **Vercel** (no CORS issues)

---

## ✅ Features

* 🔐 User Registration & Login with JWT
* 🗓 CRUD operations for meetings
* 👥 Join meetings and RSVP
* 📅 View upcoming meetings
* 🔔 Real-time notifications & reminders
* 🌙 Responsive dark-themed UI
* 📊 MongoDB integration with advanced schema

---

## 🛠 Tech Stack

* **Frontend:** React, Vite, Axios, React Router
* **Backend:** Node.js, Express.js, JWT, Mongoose
* **Database:** MongoDB Atlas
* **Deployment:** Vercel
* **Other:** dotenv, bcryptjs, nodemailer

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16+)
* npm or yarn
* MongoDB Atlas account
* Vercel CLI (optional)

### Installation

```bash
git clone https://github.com/kushagrakartikeye/meeting-scheduler.git
cd meeting-scheduler
npm install
npm run install-client
```

### Environment Variables

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### Build & Run

```bash
npm run build
npm run start
```

Visit **[http://localhost:5000](http://localhost:5000)**

---

## ▶️ Usage

* Register or Login to your account.
* Create a new meeting with date, time, and participants.
* Share meeting ID with participants.
* RSVP or join meetings from the dashboard.

(Add screenshots or GIF demo here)

---

## 🔑 Environment Variables

| Variable    | Description                        |
| ----------- | ---------------------------------- |
| PORT        | Port number (default: 5000)        |
| MONGO\_URI  | MongoDB connection string          |
| JWT\_SECRET | Secret key for JWT tokens          |
| EMAIL\_USER | Email user for notifications       |
| EMAIL\_PASS | Password or app password for email |

---

## 📜 Scripts

* `npm run install-client` → Installs frontend dependencies
* `npm run build` → Builds React frontend
* `npm run start` → Starts Express backend
* `npm run dev` → Starts backend with nodemon

---

## 📂 Folder Structure

```
meeting-scheduler/
├── meeting-scheduler-frontend/   # React frontend
├── routes/                       # Express API routes
├── models/                       # MongoDB schemas
├── server.js                     # Express entry point
├── package.json                  # Root package.json
├── vercel.json                   # Vercel config
└── .env                          # Not in repo
```

---

## 🌍 Deployment

Deployed as a single app on **Vercel**, removing CORS and multi-URL issues.
**Production URL:**
[https://meeting-scheduler-backend-ten.vercel.app](https://meeting-scheduler-backend-ten.vercel.app)

---

## 🔐 Authentication Flow

* Users register/login using email and password.
* JWT tokens issued on successful login.
* Protected routes include:

  * `/api/meetings` (CRUD for meetings)
  * `/api/auth` (Login/Signup)

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Added feature"`.
4. Push to branch: `git push origin feature-name`.
5. Open a Pull Request.

---

## 🛠 Future Plans

* Add video conferencing integration.
* Calendar sync with Google Calendar.
* Push notifications for upcoming meetings.

---

## 📬 Contact

Open an issue on [GitHub](https://github.com/kushagrakartikeye/meeting-scheduler) or contact the maintainer.

---

✨ **Thank you for checking out the Meeting Scheduler!** 🚀
