import { useState } from 'react'
import api from '../api/axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await api.post('/auth/login', { email, password })
      const token = res.data.token

      window.__AUTH_TOKEN__ = token
      window.dispatchEvent(new Event('auth-changed'))

      window.location.href = '/'
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(180deg,#0c1110_0%,#090c0b_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          <section className="relative flex flex-col justify-between p-8 sm:p-10 lg:p-12">
            <div>
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                Interviewed
              </div>

              <h1 className="max-w-md text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                A sharper sign-in experience for serious practice.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
                Log in to upload your resume, generate focused interview questions, and continue your preparation flow without losing context.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-3 text-sm text-white/60">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-semibold text-white">01</div>
                <div className="mt-2">Resume</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-semibold text-white">02</div>
                <div className="mt-2">Questions</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-semibold text-white">03</div>
                <div className="mt-2">Feedback</div>
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 bg-[#0e1412]/80 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <div className="mx-auto max-w-md">
              <h2 className="text-2xl font-semibold tracking-tight text-white">Welcome back</h2>
              <p className="mt-2 text-sm text-white/60">
                Sign in to continue your interview prep.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-emerald-400/60 focus:bg-white/8 focus:ring-2 focus:ring-emerald-400/20"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-emerald-400/60 focus:bg-white/8 focus:ring-2 focus:ring-emerald-400/20"
                    required
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3.5 font-medium text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Signing in...' : 'Enter Workspace'}
                </button>
              </form>

              <p className="mt-6 text-sm text-white/50">
                By continuing, you agree to keep your interview notes and resume history in this workspace.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
