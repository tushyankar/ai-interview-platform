import { useAuth } from '../context/AuthContext';
import ResumeUpload from './ResumeUpload';
import GenerateInterview from './GenerateInterview';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0f2d16] text-white">
      {/* Background layers */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,255,160,0.10),transparent_30%),radial-gradient(circle_at_top_right,rgba(80,180,120,0.08),transparent_25%),linear-gradient(to_bottom,#14361b,#0e2414_55%,#0b1c10)]" />
        <div className="absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[120px]" />
        <div className="absolute inset-y-0 left-0 w-[90px] bg-black/10" />
        <div className="absolute inset-y-0 right-0 w-[90px] bg-black/10" />
      </div>

      {/* Outer frame */}
      <div className="mx-auto min-h-screen max-w-[1400px] px-6 py-8">
        <div className="relative rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(124,191,60,0.88),rgba(63,132,43,0.88))] shadow-[0_30px_80px_rgba(0,0,0,0.35)] overflow-hidden">
          {/* Soft overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(to_bottom_right,rgba(255,255,255,0.04),transparent_40%)]" />

          {/* Top nav */}
          <header className="relative z-10 flex items-center justify-between px-8 py-6 md:px-12">
            <div className="text-sm font-semibold tracking-[0.18em] text-white/90 uppercase">
              Interviewed
            </div>

            <nav className="hidden items-center gap-10 text-[11px] font-medium tracking-[0.18em] text-white/75 md:flex uppercase">
              <span>Home</span>
              <span>Practice</span>
              <span>Profile</span>
            </nav>

            <button
              onClick={logout}
              className="rounded-full border border-white/20 px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-white/85 uppercase transition hover:bg-white/10"
            >
              Logout
            </button>
          </header>

          {/* Hero */}
          <section className="relative z-10 grid min-h-[78vh] grid-cols-1 gap-10 px-8 pb-10 pt-2 md:px-12 lg:grid-cols-[1fr_1.15fr_0.18fr] lg:items-center">
            {/* Left copy */}
            <div className="max-w-md self-center">
              <p className="text-[34px] font-semibold leading-none tracking-tight text-white/90">
                01
                <span className="ml-1 text-sm align-top text-white/60">/05</span>
              </p>

              <div className="mt-6 h-px w-36 bg-white/40" />

              <h1 className="mt-6 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
                A sharper
                <br />
                interview
                <br />
                presence
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-6 text-white/75">
                Upload your resume, generate focused mock questions, and build
                a preparation flow that feels crafted rather than generic.
              </p>

              <button className="mt-8 rounded-none border border-white/40 px-6 py-3 text-[11px] font-semibold tracking-[0.18em] text-white uppercase transition hover:bg-white hover:text-[#1b3b1d]">
                Enter Workspace
              </button>

              <div className="mt-12 flex items-center gap-5 text-[11px] font-medium tracking-[0.16em] text-white/70 uppercase">
                <span>01</span>
                <div className="h-px w-24 bg-white/40" />
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
              </div>
            </div>

            {/* Center hero visual */}
            <div className="relative flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 scale-110 rounded-full bg-black/20 blur-3xl" />
                <div className="relative h-[360px] w-[260px] rounded-[140px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,70,28,0.75),rgba(10,38,16,0.92))] shadow-[0_40px_80px_rgba(0,0,0,0.35)] md:h-[480px] md:w-[340px]">
                  <div className="absolute left-1/2 top-10 h-16 w-16 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md" />
                  <div className="absolute left-1/2 top-28 h-[220px] w-[180px] -translate-x-1/2 rounded-[90px_90px_80px_80px] bg-[linear-gradient(180deg,#9adf59,#4f9f33_58%,#2a5f22)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_25px_40px_rgba(0,0,0,0.25)] md:h-[290px] md:w-[220px]">
                    <div className="absolute inset-x-5 top-5 h-8 rounded-full border border-white/15 bg-black/10" />
                    <div className="absolute inset-x-6 top-16 h-10 rounded-full border border-white/10 bg-white/5" />
                    <div className="absolute inset-x-4 bottom-7 h-16 rounded-[40px] border border-white/10 bg-black/10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right rail */}
            <div className="hidden h-full items-center justify-center lg:flex">
              <div className="flex h-full flex-col items-center justify-center gap-6">
                <div className="h-20 w-px bg-white/30" />
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-xs text-white/80">
                  f
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-xs text-white/80">
                  x
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-xs text-white/80">
                  in
                </div>
                <div className="h-20 w-px bg-white/30" />
              </div>
            </div>
          </section>

          {/* Huge bottom word */}
          <div className="pointer-events-none relative z-10 px-8 pb-4 md:px-12">
            <h2 className="select-none text-[64px] font-extrabold uppercase leading-none tracking-[-0.06em] text-white/95 md:text-[120px] lg:text-[160px]">
              Emerald.
            </h2>
          </div>
        </div>

        {/* Lower content sections */}
        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
            <div className="mb-6 text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-200/70">
                Resume Module
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Build your candidate profile
              </h3>
            </div>
            <ResumeUpload />
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
            <div className="mb-6 text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-200/70">
                Interview Module
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Generate your practice flow
              </h3>
            </div>
            <GenerateInterview />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
