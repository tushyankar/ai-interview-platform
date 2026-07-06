import { useState } from 'react';
import api from '../api/axios';

export default function GenerateInterview() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  
  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Hardcoded role/difficulty for quick generation, can be dynamic later
      const res = await api.post('/interview/generate', { role: "Software Engineer", difficulty: "Hard" });
      setQuestions(res.data.questions);
    } catch (err) {
      console.error(err);
      alert("Failed to generate questions. Did you upload a resume?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-white/30 bg-black/10 p-8 transition-colors hover:border-white/60">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Module .02</p>
        <div className="h-2 w-2 rounded-full bg-white/50" />
      </div>
      
      <p className="mt-4 text-xs leading-6 text-white/80">
        Our local AI will cross-reference your uploaded resume against industry standards to generate a rigorous mock interview loop directly from your PostgreSQL database.
      </p>

      <button 
        onClick={handleGenerate}
        disabled={loading}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#539632] transition-all hover:bg-white/90 disabled:opacity-50"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
        {loading ? 'Initializing LLM...' : 'Initialize Mock Interview'}
      </button>

      {questions.length > 0 && (
        <ul className="mt-6 space-y-3">
          {questions.map((q, idx) => (
            <li key={idx} className="text-xs text-white/90 border-l-2 border-white/40 pl-3">
              <span className="font-bold text-white">Q{idx + 1}:</span> {q.question_text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
