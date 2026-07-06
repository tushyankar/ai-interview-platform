async function generateInterviewQuestions(resumeText, role, difficulty) {
  return [
    {
      question_text: `Tell me about yourself and why you are interested in the ${role} role.`,
      question_type: 'behavioral'
    },
    {
      question_text: `Based on your resume, explain a project where you used problem-solving skills effectively.`,
      question_type: 'experience'
    },
    {
      question_text: `What are the key technical skills required for a ${role}, and which ones are you strongest in?`,
      question_type: 'technical'
    },
    {
      question_text: `Describe a challenge you faced while working on a technical project and how you solved it.`,
      question_type: 'situational'
    },
    {
      question_text: `For a ${difficulty} level interview, how would you prepare to answer system design or coding questions?`,
      question_type: 'technical'
    }
  ];
}

module.exports = { generateInterviewQuestions };
