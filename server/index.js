const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./authRoutes');
const resumeRoutes = require('./resumeRoutes');
const interviewRoutes = require('./interviewRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/interview', interviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
