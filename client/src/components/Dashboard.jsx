import { useAuth } from '../context/AuthContext';
import ResumeUpload from './ResumeUpload';
import GenerateInterview from './GenerateInterview';

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#539632] text-white font-sans selection:bg-white selection:text-[#539632]">
      
      {/* Header (Top Nav) */}
      <header className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-8 md:px-16">
        <div className="text-xl font-black tracking-tighter uppercase flex items-center">
          INTER<span className="font-light opacity-80">VIEWED</span>
        </div>
        <nav className="hidden items-center gap-10 text-[10px] font-bold tracking-[0.2em] uppercase md:flex text-white/90">
          <span className="cursor-pointer transition-opacity hover:opacity-60">Home</span>
          <span className="cursor-pointer transition-opacity hover:opacity-60">Where to find</span>
          <span className="cursor-pointer transition-opacity hover:opacity-60">Contact</span>
          {/* Logout Button Added Here */}
          <button onClick={logout} className="cursor-pointer transition-opacity hover:opacity-60 border border-white/40 px-3 py-1 rounded-full">
            Logout
          </button>
        </nav>
      </header>

      {/* Main Layout Grid */}
      <main className="relative z-30 mx-auto flex min-h-screen max-w-[1600px] flex-col justify-center px-8 pt-28 md:px-16 lg:flex-row lg:items-center lg:pt-0">
        
        {/* Left Column */}
        <div className="w-full pb-16 lg:w-5/12 lg:pb-0">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-xl font-bold tracking-tight">01</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/70">/05</span>
            <div className="h-[1px] w-32 bg-white/40" />
          </div>

          <h1 className="mb-6 text-[3.5rem] font-black uppercase leading-[0.95] tracking-tighter md:text-[5rem] lg:text-[5.5rem]">
            A Sharper <br />
            Interview
          </h1>

          {/* Updated Project Vision Copy */}
          <p className="mb-8 max-w-[380px] text-[12px] font-medium leading-[1.8] text-white/90">
            Bridging the gap between academic theory and the demands of the modern tech industry, this platform leverages advanced AI to transform raw resumes into rigorous, targeted interview loops. It empowers candidates to recover lost time and build an exceptionally strong, standout technical presence in a crowded job market.
          </p>

          <button className="mb-16 border border-white bg-white px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-[#539632] transition-all hover:bg-transparent hover:text-white">
            Read More
          </button>
        </div>

        {/* Right Column: The Modules */}
        <div className="w-full lg:w-7/12 relative z-40 flex justify-center lg:justify-end lg:pr-20 pb-32 lg:pb-0">
           <div className="w-full max-w-[420px] flex flex-col gap-6">
             <ResumeUpload />
             <GenerateInterview />
           </div>
        </div>
      </main>

      {/* Massive Background Text - Fixed Overlap */}
      <div className="pointer-events-none absolute bottom-[-4%] left-0 right-0 z-0 text-center overflow-hidden">
        <h2 className="select-none text-[22vw] font-black uppercase leading-none tracking-tighter text-white opacity-90">
          ELEVATE!
        </h2>
      </div>

    </div>
  );
}
