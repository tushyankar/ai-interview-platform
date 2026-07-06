import { useState } from 'react';
import api from '../api/axios';

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
    setMessage('');
    setError('');
  }

  async function handleUpload(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!file) {
      setError('Please select a PDF resume first.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    setLoading(true);

    try {
      const response = await api.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(`Uploaded successfully: ${response.data.filename}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/35">
          Resume Upload
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Bring your profile into the experience
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/55 md:text-base">
          Upload your latest resume so the platform can personalize interview
          prompts, difficulty, and future feedback around your actual experience.
        </p>
      </div>

      <div className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.40)] backdrop-blur-2xl md:p-8">
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="rounded-[28px] border border-dashed border-white/15 bg-black/20 px-6 py-10 text-center transition hover:border-white/25 hover:bg-white/[0.03]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16V4m0 0l-4 4m4-4l4 4M4 16.5v1A2.5 2.5 0 006.5 20h11a2.5 2.5 0 002.5-2.5v-1"
                />
              </svg>
            </div>

            <h3 className="mt-5 text-lg font-medium text-white">
              Select a PDF resume
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/45">
              Choose a clean PDF version of your resume. This will be used to
              tailor the interview flow and future question generation.
            </p>

            <div className="mt-6 flex justify-center">
              <label className="group inline-flex cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Choose File
              </label>
            </div>

            {file && (
              <div className="mt-5 inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                {file.name}
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
              {message}
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Uploading…' : 'Upload Resume'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResumeUpload;
