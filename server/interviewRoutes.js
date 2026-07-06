const express = require('express');
const authenticateToken = require('./authMiddleware');
const { generateInterviewQuestions } = require('./aiService');
const { pool } = require('./db');
const router = express.Router();

router.post('/generate', authenticateToken, async (req, res) => {
  try {
    // Get the latest resume for the user
    const resumeResult = await pool.query(
      'SELECT parsed_text FROM resumes WHERE user_id = $1 ORDER BY uploaded_at DESC LIMIT 1',
      [req.user.id]
    );

    if (resumeResult.rows.length === 0) {
      return res.status(400).json({ error: 'No resume found. Please upload a resume first.' });
    }

    const resumeText = resumeResult.rows[0].parsed_text;
    const questions = await generateInterviewQuestions(resumeText);

    // Save generated questions to DB
    const interviewResult = await pool.query(
      'INSERT INTO interviews (user_id, questions) VALUES ($1, $2) RETURNING id',
      [req.user.id, JSON.stringify(questions)]
    );

    res.json({ interviewId: interviewResult.rows[0].id, questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate interview' });
  }
});

module.exports = router;
