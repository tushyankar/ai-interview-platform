const axios = require('axios');

async function generateInterviewQuestions(resumeText, role, difficulty) {
  const prompt = `
  You are an expert technical software engineering interviewer. 
  Generate exactly 5 interview questions for a candidate applying for the role: ${role}.
  The difficulty level should be: ${difficulty}.
  
  CRITICAL: You must use the candidate's resume text below to personalize these questions to their specific projects, skills, and background.
  
  Resume Text:
  ${resumeText}
  
  Return the output strictly as a JSON array of objects. Do not include any markdown formatting, backticks, or extra text. Each object must have exactly two keys: "question_text" and "question_type" (either 'technical', 'behavioral', or 'experience').
  `;

  try {
    // Calling the local Ollama instance running on your machine
    const response = await axios.post('http://127.0.0.1:11434/api/generate', {
      model: 'llama3', // Make sure you have pulled this model locally via terminal
      prompt: prompt,
      stream: false,
      format: 'json'
    });

    // Parse the JSON returned by your local LLM
    const questions = JSON.parse(response.data.response);
    return questions;
  } catch (error) {
    console.error('Local LLM Error:', error.message);
    throw new Error('Failed to generate questions from local LLM. Ensure Ollama is running.');
  }
}

module.exports = { generateInterviewQuestions };
