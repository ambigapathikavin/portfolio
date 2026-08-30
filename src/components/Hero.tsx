import React from 'react';
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
  Activity,
  BarChart2,
  GitBranch
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AmbigapathiPortrait } from './AmbigapathiPortrait';
import { DataParticleBackground } from './DataParticleBackground';

interface HeroProps {
  onOpenResume: (role?: 'DATA_ANALYST' | 'DATA_SCIENTIST') => void;
  onOpenContact: () => void;
  onViewWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenContact, onViewWork }) => {
  return (
    <section id="home" className="relative min-h-[90vh] pt-24 pb-14 lg:pt-32 lg:pb-20 flex items-center bg-[#050505] bg-data-grid overflow-hidden">
      {/* Interactive Data Science Neural/Particle Background */}
      <DataParticleBackground />

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
                <span>Data Analyst Resume</span>
              </button>

              <button
                onClick={() => onOpenResume('DATA_SCIENTIST')}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#111111] hover:bg-violet-500/20 text-violet-300 font-mono text-xs border border-violet-500/40 transition-all cursor-pointer shadow-sm"
                title="View & Download Data Scientist Resume"
              >
                <Download className="w-3.5 h-3.5 text-violet-400" />
                <span>Data Scientist Resume</span>
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
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative w-full max-w-[290px] sm:max-w-[340px] lg:max-w-[360px] h-[380px] sm:h-[420px] lg:h-[450px] flex items-center justify-center"
            >
              
              {/* Outer Decorative Ambient Glow & Orbit Grids */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/10 via-transparent to-violet-500/15 blur-2xl pointer-events-none" />
              <div className="absolute -inset-2 rounded-3xl border border-cyan-500/15 pointer-events-none" />
              <div className="absolute -inset-6 rounded-full border border-cyan-500/10 border-dashed animate-[spin_80s_linear_infinite] pointer-events-none" />

              {/* Main Portrait Frame - Expanded Generous Scale */}
              <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[#1c2838] via-[#101722] to-[#0a0e17] shadow-2xl border border-cyan-500/35 hover:border-cyan-400/60 transition-all duration-300 group">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#07090e] relative flex flex-col items-center justify-center">
                  
                  {/* High-Fidelity Studio Portrait Representation with Full Fill */}
                  <AmbigapathiPortrait className="w-full h-full" />

                </div>
              </div>

              {/* Floating Analytical Metric 1: Top Right */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 z-30 px-3.5 py-2 rounded-xl bg-[#0a0f18]/95 backdrop-blur-md border border-cyan-500/40 shadow-2xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#8899ac] font-mono uppercase tracking-wider">Classification Precision</span>
                  <span className="text-xs font-bold text-white font-mono">98.2% Accuracy</span>
                </div>
              </motion.div>

              {/* Floating Analytical Metric 2: Bottom Left */}
              <motion.div
                animate={{ y: [3, -3, 3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-3 -left-3 z-30 px-3.5 py-2 rounded-xl bg-[#0a0f18]/95 backdrop-blur-md border border-violet-500/40 shadow-2xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-300">
                  <Database className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#8899ac] font-mono uppercase tracking-wider">Daily ETL Pipeline</span>
                  <span className="text-xs font-bold text-white font-mono">50K+ Rows Ingestion</span>
                </div>
              </motion.div>

              {/* Floating Analytical Metric 3: Center Left */}
              <motion.div
                animate={{ x: [-2, 2, -2] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden sm:flex absolute top-1/2 -left-6 -translate-y-1/2 z-30 px-3 py-1.5 rounded-lg bg-[#0a0f18]/95 backdrop-blur-md border border-emerald-500/40 shadow-xl items-center gap-2"
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-mono text-emerald-300 font-bold">-40% Query Latency</span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
