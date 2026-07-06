import { useState } from 'react';
import api from '../api/axios';

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus('Uploading...');
    
    const formData = new FormData();
    formData.append('resume', file); // 'resume' must match upload.single('resume') on backend

    try {
      await api.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('Success! Parsed and saved to DB.');
    } catch (error) {
      console.error(error);
      setStatus('Upload failed.');
    }
  };

  return (
    <div className="border border-white/30 bg-black/10 p-8 transition-colors hover:border-white/60">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Module .01</p>
        <div className="h-2 w-2 rounded-full bg-white/50" />
      </div>
      
      <div className="mt-4 rounded-xl border border-dashed border-white/30 p-6 text-center">
        <svg className="mx-auto mb-3 h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-xs text-white/80">Drag & drop your PDF resume here, or</p>
        <label className="mt-2 inline-block cursor-pointer px-3 py-1 border border-white/40 text-xs font-bold uppercase transition hover:bg-white hover:text-[#539632]">
          Browse Files
          <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
        </label>
        {file && <p className="mt-3 text-[10px] text-white/90">Selected: {file.name}</p>}
      </div>

      <button 
        onClick={handleUpload}
        disabled={!file}
        className="mt-6 w-full rounded-full border border-white bg-transparent py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-[#539632] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white"
      >
        Upload & Parse Resume
      </button>
      {status && <p className="mt-3 text-center text-xs font-bold text-white">{status}</p>}
    </div>
  );
}
