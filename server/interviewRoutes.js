const express = require('express');
const pool = require('./db');
const authMiddleware = require('./authMiddleware');
const { generateInterviewQuestions } = require('./aiService');

const router = express.Router();

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    if (!role || !difficulty) {
      return res.status(400).json({ error: 'Role and difficulty are required' });
    }

    const userResult = await pool.query(
      'SELECT resume_text FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (!userResult.rows.length || !userResult.rows[0].resume_text) {
      return res.status(400).json({ error: 'Please upload a resume first' });
    }

    const resumeText = userResult.rows[0].resume_text;

    const interviewResult = await pool.query(
      'INSERT INTO interviews (user_id, role, difficulty) VALUES ($1, $2, $3) RETURNING id',
      [req.user.userId, role, difficulty]
    );

    const interviewId = interviewResult.rows[0].id;

    const questions = await generateInterviewQuestions(resumeText, role, difficulty);

    for (const question of questions) {
      await pool.query(
        'INSERT INTO questions (interview_id, question_text, question_type) VALUES ($1, $2, $3)',
        [interviewId, question.question_text, question.question_type || 'general']
      );
    }

    res.json({
      message: 'Interview questions generated successfully',
      interviewId,
      questions,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to generate interview questions' });
  }
});

module.exports = router;
