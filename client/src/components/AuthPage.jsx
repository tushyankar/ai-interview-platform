import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await axios.post(`http://localhost:5001${endpoint}`, { email, password });
      if (isLogin) {
        login(res.data.token, res.data.user);
      } else {
        alert('Registered! Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      alert('Authentication failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#549638] font-sans text-white">
      {/* Huge Background Typography */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-20">
        <h1 className="select-none text-[20vw] font-black uppercase leading-none tracking-tighter">
          ACCESS
        </h1>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md p-10">
        <div className="mb-10">
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-white/80">
            {isLogin ? '01 / Authenticate' : '01 / Initialize'}
          </p>
          <div className="my-4 h-px w-16 bg-white" />
          <h2 className="text-5xl font-extrabold uppercase tracking-tight text-white">
            {isLogin ? 'Welcome Back' : 'Join the Ranks'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full border-b-2 border-white/30 bg-transparent py-3 text-lg font-medium text-white outline-none transition-all focus:border-white placeholder:text-white/50"
              value={email} onChange={e => setEmail(e.target.value)} required 
            />
          </div>
          <div className="relative">
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full border-b-2 border-white/30 bg-transparent py-3 text-lg font-medium text-white outline-none transition-all focus:border-white placeholder:text-white/50"
              value={password} onChange={e => setPassword(e.target.value)} required 
            />
          </div>
          <button 
            type="submit" 
            className="mt-6 border-2 border-white bg-transparent py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-[#549638]"
          >
            {isLogin ? 'Access Workspace' : 'Create Profile'}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="mt-8 w-full text-center text-xs font-semibold tracking-wider text-white/60 transition hover:text-white uppercase"
        >
          {isLogin ? "No account? Request Access" : "Already registered? Sign In"}
        </button>
      </div>
    </div>
  );
}
