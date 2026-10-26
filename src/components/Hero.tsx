import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  GitBranch
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AmbigapathiPortrait } from './AmbigapathiPortrait';
import { DataParticleBackground } from './DataParticleBackground';
import { trackEvent, trackResumeInteraction, trackSkillPillClick } from '../utils/analytics';

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
    <section id="home" className="scroll-mt-20 sm:scroll-mt-24 relative min-h-[90vh] pt-24 pb-14 lg:pt-32 lg:pb-20 flex items-center bg-white dark:bg-[#060608] bg-data-grid overflow-hidden">
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
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#111111] border border-slate-300 dark:border-[#ffffff15] text-cyan-600 dark:text-cyan-400 text-[10px] font-mono tracking-[0.2em] shadow-sm mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>
                {roleMode === 'DATA_ANALYST' ? 'DATA ANALYST' :
                 roleMode === 'DATA_SCIENTIST' ? 'DATA SCIENTIST' :
                 'DATA ANALYST • DATA SCIENTIST'}
              </span>
            </motion.div>

            {/* Large Main Heading - Immediate LCP Paint */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-5">
              Turning Data Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-sky-700 to-violet-700 dark:from-cyan-400 dark:via-sky-300 dark:to-violet-400">
                {roleMode === 'DATA_ANALYST' ? 'Actionable BI Insights' :
                 roleMode === 'DATA_SCIENTIST' ? 'Machine Learning Projects' :
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
                <button
                  key={skill}
                  type="button"
                  onClick={() => trackSkillPillClick(skill, roleMode)}
                  className={`px-2.5 py-1 rounded-full text-xs font-mono transition-all text-left cursor-pointer hover:scale-105 active:scale-95 ${
                    roleMode === 'DATA_ANALYST'
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : roleMode === 'DATA_SCIENTIST'
                      ? 'bg-violet-500/15 text-violet-300 border border-violet-500/40 font-semibold'
                      : 'bg-slate-100 dark:bg-[#111111] text-slate-700 dark:text-[#CCCCCC] border border-slate-300 dark:border-[#ffffff0a]'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </motion.div>

            {/* Short Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-7"
            >
              {roleMode === 'DATA_ANALYST'
                ? 'Data Analyst building Power BI dashboards, writing SQL queries, and turning project datasets into clear business insights.'
                : roleMode === 'DATA_SCIENTIST'
                ? 'Data Scientist working on NLP, predictive modeling, and machine-learning workflows through hands-on projects.'
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
                onClick={() => {
                  trackEvent('hero_cta_click', { cta_name: 'view_projects' });
                  onViewWork();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer group shadow-[0_0_20px_rgba(255,255,255,0.18)] hover:shadow-[0_0_28px_rgba(255,255,255,0.3)]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  trackResumeInteraction('DATA_ANALYST', 'open_modal', 'hero_cta_button');
                  onOpenResume('DATA_ANALYST');
                }}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-cyan-50 dark:bg-[#0d121c] hover:bg-cyan-100 dark:hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-mono text-xs border border-cyan-300 dark:border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer shadow-sm group/btn"
                title="View & Download Data Analyst Resume"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                <span>Data Analyst Resume</span>
              </button>

              <button
                onClick={() => {
                  trackResumeInteraction('DATA_SCIENTIST', 'open_modal', 'hero_cta_button');
                  onOpenResume('DATA_SCIENTIST');
                }}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-violet-50 dark:bg-[#0d121c] hover:bg-violet-100 dark:hover:bg-violet-500/20 text-violet-700 dark:text-violet-300 font-mono text-xs border border-violet-300 dark:border-violet-500/40 hover:border-violet-400 transition-all cursor-pointer shadow-sm group/btn2"
                title="View & Download Data Scientist Resume"
              >
                <Download className="w-3.5 h-3.5 text-violet-400 group-hover/btn2:scale-110 transition-transform" />
                <span>Data Scientist Resume</span>
              </button>

              <button
                onClick={() => {
                  trackEvent('hero_cta_click', { cta_name: 'lets_connect' });
                  onOpenContact();
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-[#12161f] hover:bg-slate-200 dark:hover:bg-[#1c2230] text-slate-700 dark:text-[#c0c0c0] hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-[#ffffff18] hover:border-slate-400 dark:hover:border-[#ffffff35] text-xs font-mono transition-all cursor-pointer shadow-sm"
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
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#111111] border border-slate-300 dark:border-[#ffffff0a] text-slate-700 dark:text-[#D1D1D1] hover:border-cyan-500/40 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
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
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[420px] aspect-[6/5] flex items-center justify-center">
              
              <div className="absolute -inset-5 rounded-[2rem_5rem_2rem_2rem] bg-gradient-to-br from-cyan-500/15 via-transparent to-violet-500/15 blur-2xl pointer-events-none" />
              <div className="absolute inset-2 translate-x-3 translate-y-3 rounded-[2rem_5rem_2rem_2rem] border border-cyan-500/30 dark:border-cyan-300/20 pointer-events-none" />

              {/* Responsive portrait frame */}
              <motion.div 
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="relative z-10 h-full w-full overflow-hidden rounded-[1.8rem_4.8rem_1.8rem_1.8rem] border border-slate-300/80 bg-slate-200 p-1 shadow-[0_24px_70px_-28px_rgba(8,145,178,0.45)] dark:border-white/15 dark:bg-[#111318]"
              >
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.6rem_4.6rem_1.6rem_1.6rem] bg-slate-300 dark:bg-[#07090e]">
                  <AmbigapathiPortrait className="w-full h-full" />
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
