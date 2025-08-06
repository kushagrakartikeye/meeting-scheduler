const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Fix CORS for production
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000',
    'https://meeting-scheduler-frontend-khyvywn7f.vercel.app',
    'https://meeting-scheduler-frontend-m0ekpe2nc.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const meetingRoutes = require('./routes/meetings');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);

// Add a test endpoint for debugging
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend API is working!',
    mongoConnected: !!process.env.MONGO_URI,
    jwtSecret: !!process.env.JWT_SECRET,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => res.send("Meeting Scheduler API Running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
