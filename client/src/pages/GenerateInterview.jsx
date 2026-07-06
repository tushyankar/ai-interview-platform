import { useState } from 'react';
import api from '../api/axios';

function GenerateInterview() {
  const [role, setRole] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e) {
    e.preventDefault();
    setError('');
    setQuestions([]);
    setLoading(true);

    try {
      const response = await api.post('/interview/generate', {
        role,
        difficulty,
      });
      setQuestions(response.data.questions);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate questions');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Generate Interview Questions</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleGenerate}>
        <div>
          <label>Target Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. ML Engineer"
            required
          />
        </div>

        <div>
          <label>Difficulty</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Questions'}
        </button>
      </form>

      {questions.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Generated Questions</h4>
          <ol>
            {questions.map((q, index) => (
              <li key={index}>
                {q.question_text} ({q.question_type})
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default GenerateInterview;
