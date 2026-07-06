const express = require('express');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const pool = require('./db');
const authMiddleware = require('./authMiddleware');
const upload = require('./uploadConfig');

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    await pool.query(
      'UPDATE users SET resume_text = $1, resume_filename = $2 WHERE id = $3',
      [extractedText, req.file.filename, req.user.userId]
    );

    res.json({
      message: 'Resume uploaded and parsed successfully',
      filename: req.file.filename,
      preview: extractedText.substring(0, 300),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error while processing resume' });
  }
});

module.exports = router;
