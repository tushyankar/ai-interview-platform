import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function AuthPage() {
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', loginData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/signup', signupData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-backdrop auth-backdrop-left" />
      <div className="auth-backdrop auth-backdrop-right" />

      <main className="auth-page">
        <section className="hero-panel">
          <div className="hero-topbar">
            <div className="brand-lockup">
              <div className="brand-mark" />
              <div>
                <span className="brand-kicker">GREEN</span>
                <span className="brand-name">NEXUS</span>
              </div>
            </div>

            <div className="hero-nav">
              <span>Home</span>
              <span>Studio</span>
              <span>Contact</span>
            </div>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-badge">01 / 05</div>
              <h1>{mode === 'login' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}</h1>
              <p>
                A bold green interface inspired by the explosive poster-style reference,
                built to make authentication feel premium instead of plain.
              </p>

              <div className="hero-actions">
                <button
                  type="button"
                  className={`mode-btn ${mode === 'login' ? 'active' : ''}`}
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={`mode-btn ${mode === 'signup' ? 'active' : ''}`}
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                >
                  Sign Up
                </button>
              </div>

              <div className="hero-meter">
                <span className="meter-label">01</span>
                <div className="meter-line" />
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
              </div>
            </div>

            <div className="bomb-stage" aria-hidden="true">
              <div className="bomb-shadow" />
              <div className="pineapple-bomb">
                <div className="pin-ring" />
                <div className="pin-body" />
                <div className="leaf leaf-1" />
                <div className="leaf leaf-2" />
                <div className="leaf leaf-3" />
                <div className="leaf leaf-4" />
                <div className="leaf leaf-5" />
                <div className="leaf leaf-6" />
                <div className="leaf leaf-7" />
                <div className="leaf leaf-8" />
                <div className="leaf leaf-9" />
              </div>
            </div>
          </div>

          <div className="giant-word">GREENADE!</div>
        </section>

        <section className="form-panel">
          <div className="side-rail" />

          <div className="form-card">
            <div className="form-header">
              <span className="form-kicker">{mode === 'login' ? 'LOGIN' : 'SIGN UP'}</span>
              <h2>{mode === 'login' ? 'Enter the dashboard' : 'Join the workspace'}</h2>
              <p>
                {mode === 'login'
                  ? 'Use your account credentials to continue.'
                  : 'Create your account, then jump straight into the dashboard.'}
              </p>
            </div>

            {error && <div className="error-banner">{error}</div>}

            {mode === 'login' ? (
              <form className="auth-form" onSubmit={handleLogin}>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="••••••••"
                    required
                  />
                </label>

                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleSignup}>
                <label>
                  Full name
                  <input
                    type="text"
                    name="name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    placeholder="Your name"
                    required
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    placeholder="Create a password"
                    required
                  />
                </label>

                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Sign Up'}
                </button>
              </form>
            )}

            <div className="form-footer">
              <span>{mode === 'login' ? "No account yet?" : 'Already have an account?'}</span>
              <button
                type="button"
                className="text-switch"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError('');
                }}
              >
                {mode === 'login' ? 'Switch to sign up' : 'Switch to login'}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AuthPage;
