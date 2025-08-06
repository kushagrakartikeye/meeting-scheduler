const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const meetingRoutes = require('./routes/meetings');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => res.send("Meeting Scheduler API Running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
