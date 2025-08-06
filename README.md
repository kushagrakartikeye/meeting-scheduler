Here's a properly formatted **GitHub README** version of your content with Markdown tags:

````markdown
# 📅 Meeting Scheduler App

**Live Demo:** [https://meeting-scheduler-backend-ten.vercel.app](https://meeting-scheduler-backend-ten.vercel.app)

---

## 📑 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Deployment](#deployment)
- [Contact](#contact)

---

## 📌 Project Overview
**Meeting Scheduler** is a full-stack, professionally built web application designed to allow users to create, manage, and participate in meetings with advanced features such as **JWT authentication**, participant management, and real-time notifications.

- **Frontend:** React + Vite  
- **Backend:** Node.js + Express + MongoDB  
- **Deployment:** Single unified project on **Vercel** (no CORS or multi-URL issues)

---

## ✅ Features
- 🔐 **User Registration & Login** with JWT authentication
- 🗓 **CRUD operations**: Create, Read, Update, Delete meetings
- 👥 Join meetings and RSVP with attendance status
- 📅 View upcoming meetings & detailed summaries
- 🔔 **Real-time notifications** and reminders
- 🌙 **Responsive dark-themed UI**
- 📊 **MongoDB integration** with advanced schema and analytics

---

## 🛠 Tech Stack
**Frontend:**  
- React, Vite, Axios, React Router  

**Backend:**  
- Node.js, Express.js, JWT, Mongoose  

**Database:**  
- MongoDB Atlas  

**Deployment:**  
- Vercel (single unified deployment)  

**Other Tools:**  
- dotenv, bcryptjs, nodemailer  

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js (v16 or later)
- npm or yarn
- MongoDB Atlas account (or any MongoDB URI)
- Vercel CLI (optional for deployment)

---

### ⚡ Installation
Clone the repository:

```bash
git clone https://github.com/kushagrakartikeye/meeting-scheduler.git
cd meeting-scheduler
````

Install backend and frontend dependencies:

```bash
npm install
npm run install-client
```

Set environment variables:
Create a `.env` file in the root directory:

```text
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

Build the frontend:

```bash
npm run build
```

Start the backend server:

```bash
npm run start
```

Visit [http://localhost:5000](http://localhost:5000) in your browser to use the app.

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

* `npm run install-client` - Installs frontend dependencies
* `npm run build` - Builds React frontend into `meeting-scheduler-frontend/dist`
* `npm run start` - Starts Express backend server
* `npm run dev` - Starts backend server with nodemon for development

---

## 📂 Folder Structure

```
meeting-scheduler/
├── meeting-scheduler-frontend/   # React frontend source and config
├── routes/                       # Express API routes (auth, meetings)
├── models/                       # MongoDB schemas (User, Meeting)
├── server.js                     # Express server entry point
├── package.json                  # Root package.json (full-stack scripts & dependencies)
├── vercel.json                   # Vercel deployment configuration
└── .env                          # Environment Variables (not in repo)
```

---

## 🌍 Deployment

The project is deployed as a single app on **Vercel**, handling both frontend and backend under one URL, removing CORS and multi-URL issues.

**Production URL:**
[https://meeting-scheduler-backend-ten.vercel.app](https://meeting-scheduler-backend-ten.vercel.app)

---

## 📬 Contact

For questions or support, please open an issue on the [GitHub repository](https://github.com/kushagrakartikeye/meeting-scheduler) or contact the project maintainer.

---

✨ **Thank you for checking out the Meeting Scheduler!** 🚀

```

---

✅ This is **copy-paste ready** for your GitHub README with:

- Proper Markdown formatting
- Clickable links
- Emojis for better readability
- Code blocks for commands

Do you want me to also **add badges (e.g., for Node.js, React, License, Deployment status)** at the top for a more professional look? Or **add screenshots and GIFs of the UI** for visual appeal?
```
