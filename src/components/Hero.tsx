import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Sparkles, 
  Database, 
  TrendingUp, 
  BrainCircuit, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Upload, 
  Camera, 
  Activity,
  BarChart2,
  GitBranch
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: (role?: 'DATA_ANALYST' | 'DATA_SCIENTIST') => void;
  onOpenContact: () => void;
  onViewWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenContact, onViewWork }) => {
  // Allow candidate to load/persist custom uploaded photo
  const [profileImage, setProfileImage] = useState<string | null>(() => {
    return localStorage.getItem('ambigapathi_profile_avatar') || null;
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImage(result);
        try {
          localStorage.setItem('ambigapathi_profile_avatar', result);
        } catch {
          // localStorage limit fallback
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileImage(null);
    localStorage.removeItem('ambigapathi_profile_avatar');
  };

  return (
    <section id="home" className="relative min-h-[90vh] pt-24 pb-14 lg:pt-32 lg:pb-20 flex items-center bg-[#050505] bg-data-grid overflow-hidden">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-violet-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Small Label / Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#ffffff15] text-cyan-400 text-[10px] font-mono tracking-[0.2em] shadow-sm mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>DATA ANALYST • DATA SCIENTIST • ML ENGINEER</span>
            </motion.div>

            {/* Large Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.12] mb-5"
            >
              Turning Data Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
                Insights, Predictions
              </span> <br />
              & Intelligent Solutions.
            </motion.h1>

            {/* Short Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed max-w-2xl mb-7"
            >
              {PERSONAL_INFO.heroDescription}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-wrap items-center gap-2.5 mb-8"
            >
              <button
                onClick={onViewWork}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-slate-200 transition-all cursor-pointer group shadow-sm"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenResume('DATA_ANALYST')}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#111111] hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs border border-cyan-500/40 transition-all cursor-pointer shadow-sm"
                title="View & Download Data Analyst Resume"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>DA Resume</span>
              </button>

              <button
                onClick={() => onOpenResume('DATA_SCIENTIST')}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#111111] hover:bg-violet-500/20 text-violet-300 font-mono text-xs border border-violet-500/40 transition-all cursor-pointer shadow-sm"
                title="View & Download Data Scientist Resume"
              >
                <Download className="w-3.5 h-3.5 text-violet-400" />
                <span>DS Resume</span>
              </button>

              <button
                onClick={onOpenContact}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#141414] hover:bg-[#202020] text-[#aaa] hover:text-white border border-[#ffffff15] text-xs font-mono transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Let's Connect</span>
              </button>
            </motion.div>

            {/* Data Lifecycle Breadcrumb Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="w-full max-w-2xl pt-5 border-t border-[#ffffff10]"
            >
              <div className="text-[10px] font-mono text-[#888] uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                <GitBranch className="w-3 h-3 text-cyan-400" />
                <span>Complete Data Lifecycle Flow</span>
              </div>
              <div className="flex flex-wrap items-center gap-1 font-mono text-[11px] text-[#A3A3A3]">
                {PERSONAL_INFO.lifecycle.map((step, idx) => (
                  <React.Fragment key={step}>
                    <span className="px-2 py-0.5 rounded bg-[#111111] border border-[#ffffff0a] text-[#D1D1D1] hover:border-cyan-500/40 hover:text-cyan-300 transition-colors">
                      {step}
                    </span>
                    {idx < PERSONAL_INFO.lifecycle.length - 1 && (
                      <span className="text-cyan-500/50 font-bold px-0.5">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Professional Portrait Frame & Data Visual Elements */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative w-full max-w-sm sm:max-w-md aspect-square flex items-center justify-center"
            >
              
              {/* Outer Decorative Tech Rings */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/15 border-dashed animate-[spin_60s_linear_infinite]" />
              <div className="absolute -inset-3 rounded-full border border-violet-500/10 animate-[spin_40s_linear_infinite_reverse]" />
              
              {/* Data Grid Background Glow */}
              <div className="absolute inset-5 rounded-2xl bg-[#111111]/80 backdrop-blur-xl border border-[#ffffff10] shadow-2xl" />

              {/* Main Portrait Container - Compact Sleek High Density Frame */}
              <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden p-1 bg-[#141414] shadow-2xl border border-cyan-500/30 group">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#0a0a0a] relative flex flex-col items-center justify-center">
                  
                  {profileImage ? (
                    <div className="w-full h-full relative group">
                      <img
                        src={profileImage}
                        alt="Ambigapathi V - Professional Profile Photograph"
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Photo management overlay on hover */}
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                        <span className="text-[10px] font-mono text-cyan-300">Ambigapathi V Profile Photo</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-2 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-black text-[10px] font-mono font-bold cursor-pointer"
                          >
                            Change Photo
                          </button>
                          <button
                            onClick={handleRemovePhoto}
                            className="px-2 py-1 rounded bg-[#222] hover:bg-red-500/30 hover:text-red-300 text-[10px] font-mono text-[#aaa] cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* High-End Technical Portrait Representation with Monogram & Vector Nodes */
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center relative bg-gradient-to-b from-[#121212] to-[#080808]">
                      
                      {/* Technical Blueprint Nodes behind avatar */}
                      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="50%" cy="50%" r="30" stroke="#0ea5e9" strokeWidth="1" fill="none" />
                        <circle cx="20%" cy="20%" r="2.5" fill="#06b6d4" />
                        <circle cx="80%" cy="80%" r="2.5" fill="#8b5cf6" />
                      </svg>

                      <div className="w-16 h-16 rounded-xl bg-[#161616] border border-cyan-400/30 flex items-center justify-center text-xl font-bold font-mono text-cyan-300 mb-2 shadow-inner shadow-cyan-500/10">
                        AV
                      </div>

                      <h2 className="text-sm font-bold text-white mb-0.5 tracking-tight">Ambigapathi V</h2>
                      <p className="text-[10px] text-cyan-400 font-mono mb-2">Salem, Tamil Nadu, India</p>
                      
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1c1c1c] border border-[#ffffff10] text-[9px] text-[#A3A3A3] font-mono mb-2">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                        <span>Verified Profile</span>
                      </div>

                      {/* Photo upload trigger */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1a1a1a] hover:bg-[#252525] border border-cyan-500/30 text-[10px] font-mono text-cyan-300 transition-colors cursor-pointer"
                        title="Upload/Select your personal photograph file"
                      >
                        <Camera className="w-3 h-3" />
                        <span>Upload Photo</span>
                      </button>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* Corner Accent Tech Badges */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#050505]/90 backdrop-blur-md border border-cyan-500/30 text-[8px] font-mono text-cyan-300 pointer-events-none">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    <span>MLOps Ready</span>
                  </div>

                  <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#050505]/90 backdrop-blur-md border border-violet-500/30 text-[8px] font-mono text-violet-300 pointer-events-none">
                    <BrainCircuit className="w-2.5 h-2.5 text-violet-400" />
                    <span>BERT NLP</span>
                  </div>

                </div>
              </div>

              {/* Floating Data Point 1: Top Right */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-2 sm:right-0 z-20 px-3 py-1.5 rounded-lg bg-[#111111] border border-[#ffffff15] shadow-xl flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <BarChart2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#888] font-mono">Classification</span>
                  <span className="text-[11px] font-bold text-white font-mono">98% Accuracy</span>
                </div>
              </motion.div>

              {/* Floating Data Point 2: Bottom Left */}
              <motion.div
                animate={{ y: [3, -3, 3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-3 -left-2 sm:left-0 z-20 px-3 py-1.5 rounded-lg bg-[#111111] border border-[#ffffff15] shadow-xl flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Database className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#888] font-mono">Pipeline Volume</span>
                  <span className="text-[11px] font-bold text-white font-mono">50K+ Daily Feed</span>
                </div>
              </motion.div>

              {/* Floating Data Point 3: Center Left */}
              <motion.div
                animate={{ x: [-2, 2, -2] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden sm:flex absolute top-1/2 -left-6 -translate-y-1/2 z-20 px-2.5 py-1 rounded bg-[#111111] border border-[#ffffff15] shadow-lg items-center gap-1.5"
              >
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] font-mono text-emerald-300 font-semibold">-40% Latency</span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
