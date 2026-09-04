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
  BarChart3,
  GitBranch,
  Filter,
  Check
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AmbigapathiPortrait } from './AmbigapathiPortrait';
import { DataParticleBackground } from './DataParticleBackground';

interface HeroProps {
  onOpenResume: (role?: 'DATA_ANALYST' | 'DATA_SCIENTIST') => void;
  onOpenContact: () => void;
  onViewWork: () => void;
  roleMode?: 'ALL' | 'DATA_ANALYST' | 'DATA_SCIENTIST';
  onRoleModeChange?: (mode: 'ALL' | 'DATA_ANALYST' | 'DATA_SCIENTIST') => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenResume, 
  onOpenContact, 
  onViewWork,
  roleMode = 'ALL',
  onRoleModeChange
}) => {
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
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#ffffff15] text-cyan-400 text-[10px] font-mono tracking-[0.2em] shadow-sm mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>
                {roleMode === 'DATA_ANALYST' ? 'DATA ANALYST & BI SPECIALIST' :
                 roleMode === 'DATA_SCIENTIST' ? 'DATA SCIENTIST & ML ENGINEER' :
                 'DATA ANALYST • DATA SCIENTIST • ML ENGINEER'}
              </span>
            </motion.div>

            {/* 1-Click Role Customizer Banner for Hiring Managers */}
            {onRoleModeChange && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="w-full max-w-xl p-2.5 rounded-xl bg-[#0b1019]/90 border border-cyan-500/30 backdrop-blur-md mb-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                    <Filter className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      Hiring Manager Lens
                    </div>
                    <div className="text-[11px] text-[#A0AEC0] font-mono flex items-center gap-1.5">
                      <span>
                        {roleMode === 'DATA_ANALYST' ? 'Emphasizing SQL, Power BI, DAX & Storytelling' :
                         roleMode === 'DATA_SCIENTIST' ? 'Emphasizing Python, BERT, PyTorch & MLOps' :
                         'Select a role to highlight relevant skills & projects:'}
                      </span>
                      <span className="hidden md:inline-block px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-500/30 text-[9px] font-mono text-cyan-300 font-semibold animate-pulse">
                        {roleMode === 'DATA_ANALYST' ? '5 Analyst Projects' :
                         roleMode === 'DATA_SCIENTIST' ? '5 ML/AI Projects' :
                         '10 Total Projects'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-[#090e17] p-1 rounded-xl border border-[#ffffff15] shadow-inner shrink-0 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => onRoleModeChange('ALL')}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                      roleMode === 'ALL'
                        ? 'bg-white text-black font-bold shadow-[0_0_12px_rgba(255,255,255,0.25)]'
                        : 'text-[#aaa] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => onRoleModeChange('DATA_ANALYST')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                      roleMode === 'DATA_ANALYST'
                        ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                        : 'text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/15 border border-cyan-500/20'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    <span>Analyst</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onRoleModeChange('DATA_SCIENTIST')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                      roleMode === 'DATA_SCIENTIST'
                        ? 'bg-violet-500 text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                        : 'text-violet-300 hover:text-violet-100 hover:bg-violet-500/15 border border-violet-500/20'
                    }`}
                  >
                    <BrainCircuit className="w-3 h-3" />
                    <span>Scientist</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Large Main Heading - Immediate LCP Paint */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.12] mb-5">
              Turning Data Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
                {roleMode === 'DATA_ANALYST' ? 'Actionable BI Insights' :
                 roleMode === 'DATA_SCIENTIST' ? 'Production ML Models' :
                 'Insights, Predictions'}
              </span> <br />
              & Intelligent Solutions.
            </h1>

            {/* Dynamic Role Highlights Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="flex flex-wrap items-center gap-1.5 mb-5"
            >
              {(roleMode === 'DATA_ANALYST' ? [
                'SQL Window Functions', 'Power BI Dashboards', 'DAX Measures', 'Tableau', 'Business Storytelling', 'KPI Variance Analysis'
              ] : roleMode === 'DATA_SCIENTIST' ? [
                'Python', 'BERT NLP', 'PyTorch', 'Machine Learning', 'Feature Engineering', 'Scikit-learn', 'MLOps Pipelines'
              ] : [
                'SQL', 'Power BI', 'Tableau', 'Python', 'Machine Learning', 'BERT NLP', 'DAX', 'Business Analytics'
              ]).map((skill) => (
                <span
                  key={skill}
                  className={`px-2.5 py-1 rounded-full text-xs font-mono transition-all ${
                    roleMode === 'DATA_ANALYST'
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : roleMode === 'DATA_SCIENTIST'
                      ? 'bg-violet-500/15 text-violet-300 border border-violet-500/40 font-semibold'
                      : 'bg-[#111111] text-[#CCCCCC] border border-[#ffffff0a]'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* Short Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed max-w-2xl mb-7"
            >
              {roleMode === 'DATA_ANALYST'
                ? 'Data Analyst with hands-on expertise building executive Power BI dashboards, authoring complex SQL window queries & CTEs, and translating raw transactional metrics into bottom-line business strategies.'
                : roleMode === 'DATA_SCIENTIST'
                ? 'Data Scientist & ML Engineer specializing in BERT NLP fine-tuning, automated Scikit-learn pipelines, predictive modeling, and scalable PyTorch training workflows deployed on real-world datasets.'
                : PERSONAL_INFO.heroDescription}
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
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer group shadow-[0_0_20px_rgba(255,255,255,0.18)] hover:shadow-[0_0_28px_rgba(255,255,255,0.3)]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenResume('DATA_ANALYST')}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#0d121c] hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer shadow-sm group/btn"
                title="View & Download Data Analyst Resume"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                <span>Data Analyst Resume</span>
              </button>

              <button
                onClick={() => onOpenResume('DATA_SCIENTIST')}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#0d121c] hover:bg-violet-500/20 text-violet-300 font-mono text-xs border border-violet-500/40 hover:border-violet-400 transition-all cursor-pointer shadow-sm group/btn2"
                title="View & Download Data Scientist Resume"
              >
                <Download className="w-3.5 h-3.5 text-violet-400 group-hover/btn2:scale-110 transition-transform" />
                <span>Data Scientist Resume</span>
              </button>

              <button
                onClick={onOpenContact}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#12161f] hover:bg-[#1c2230] text-[#c0c0c0] hover:text-white border border-[#ffffff18] hover:border-[#ffffff35] text-xs font-mono transition-all cursor-pointer shadow-sm"
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
            <div className="relative w-full max-w-[290px] sm:max-w-[340px] lg:max-w-[360px] h-[380px] sm:h-[420px] lg:h-[450px] flex items-center justify-center">
              
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

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
