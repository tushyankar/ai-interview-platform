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
      setError('Please select a PDF file first');
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
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto' }}>
      <h3>Upload Your Resume</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleUpload}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Resume'}
        </button>
      </form>
    </div>
  );
}

export default ResumeUpload;
