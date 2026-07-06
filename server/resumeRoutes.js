const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const pool = require('./db');
const authMiddleware = require('./authMiddleware');
const router = express.Router();

// Store file in memory to parse immediately
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    if (req.file.mimetype !== 'application/pdf') return res.status(400).json({ error: 'Only PDF files are allowed' });

    // Extract text from the PDF
    const data = await pdfParse(req.file.buffer);
    const resumeText = data.text;

    // Save extracted text to your PostgreSQL database
    await pool.query(
      'UPDATE users SET resume_text = $1 WHERE id = $2',
      [resumeText, req.user.userId]
    );

    res.json({ message: 'Resume parsed and saved to SQL successfully', filename: req.file.originalname });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload and parse resume' });
  }
});

module.exports = router;
