require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const authMiddleware = require('./authMiddleware');
const app = express();
const resumeRoutes = require('./resumeRoutes');
const interviewRoutes = require('./interviewRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/interview', interviewRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.get('/api/profile', authMiddleware, async (req, res) => {
  res.json({ message: 'You are authenticated!', userId: req.user.userId });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
