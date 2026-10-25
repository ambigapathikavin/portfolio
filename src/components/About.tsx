import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  LineChart, 
  BrainCircuit,
  Compass
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutProps {
  onOpenResume?: (role?: 'DATA_ANALYST' | 'DATA_SCIENTIST') => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  return (
    <section id="about" className="scroll-mt-20 sm:scroll-mt-24 py-16 relative bg-white dark:bg-[#060608] overflow-hidden border-t border-slate-200 dark:border-[#ffffff08]">
      {/* Subtle background gradient accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#111111] border border-slate-300 dark:border-[#ffffff15] text-cyan-700 dark:text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
            <Compass className="w-3 h-3" />
            <span>EXECUTIVE PROFILE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About Me & Dual Specialization Architecture
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
            Bridging exploratory data analytics with modern predictive AI systems to deliver concrete business decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Narrative & Quick Info */}
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            
            <div className="p-5 rounded-xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#ffffff08] space-y-3 shadow-sm">
              <p className="text-slate-900 dark:text-white text-sm font-semibold leading-relaxed">
                {PERSONAL_INFO.aboutText[0]}
              </p>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {PERSONAL_INFO.aboutText[1]}
              </p>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {PERSONAL_INFO.aboutText[2]}
              </p>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {PERSONAL_INFO.aboutText[3]}
              </p>
            </div>

            {/* Quick Metadata Card */}
            <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#111111] sm:grid-cols-3 sm:divide-x sm:divide-slate-200 dark:sm:divide-white/10">
              <div className="flex items-center gap-2.5 p-3">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 font-mono uppercase">Location</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white truncate">Salem, Tamil Nadu</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 border-t border-slate-200 p-3 dark:border-white/10 sm:border-t-0">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 font-mono uppercase">Email</div>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-medium text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors truncate block font-mono">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 border-t border-slate-200 p-3 dark:border-white/10 sm:border-t-0">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 font-mono uppercase">Phone</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white font-mono">{PERSONAL_INFO.phone}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Two Visual Career Tracks */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="text-[10px] font-mono tracking-[0.2em] text-slate-600 dark:text-slate-400 uppercase flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-cyan-400" />
              <span>Two Core Specialization Tracks</span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#111111] divide-y divide-slate-200 dark:divide-white/10">
            {/* Track 1: Data Analytics */}
            <div className="p-5 transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.03] relative overflow-hidden group">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <LineChart className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide uppercase font-mono">
                    DATA ANALYTICS
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-300 dark:border-cyan-500/30">
                  Track 01
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3.5 leading-relaxed">
                Transforming relational SQL schemas and unstructured operational data into executive Power BI/Tableau dashboards and KPI intelligence.
              </p>

              {/* Step Sequence Flow */}
              <div className="bg-slate-50 dark:bg-[#0a0a0a] p-3 rounded-lg border border-slate-200 dark:border-[#ffffff08]">
              <div className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Pipeline Progression:
                </div>
                <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
                  {PERSONAL_INFO.careerTracks[0].flow.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span className="px-2 py-0.5 rounded bg-cyan-50 dark:bg-[#161616] border border-cyan-200 dark:border-[#ffffff0a] text-cyan-800 dark:text-cyan-200 font-medium">
                        {step}
                      </span>
                      {idx < PERSONAL_INFO.careerTracks[0].flow.length - 1 && (
                        <span className="text-cyan-500/50 font-bold px-0.5">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {onOpenResume && (
                <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-[#ffffff08] flex justify-end">
                  <button
                    onClick={() => onOpenResume('DATA_ANALYST')}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-800 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-200 transition-colors cursor-pointer"
                  >
                    <span>View Data Analyst Resume & BI Metrics</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Track 2: Data Science & AI */}
            <div className="p-5 transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.03] relative overflow-hidden group">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                    <BrainCircuit className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide uppercase font-mono">
                    DATA SCIENCE & AI
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-violet-800 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/60 px-2 py-0.5 rounded border border-violet-300 dark:border-violet-500/30">
                  Track 02
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3.5 leading-relaxed">
                Engineering predictive machine learning algorithms, BERT transformer NLP pipelines, and containerized MLOps endpoints.
              </p>

              {/* Step Sequence Flow */}
              <div className="bg-slate-50 dark:bg-[#0a0a0a] p-3 rounded-lg border border-slate-200 dark:border-[#ffffff08]">
                <div className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Pipeline Progression:
                </div>
                <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
                  {PERSONAL_INFO.careerTracks[1].flow.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span className="px-2 py-0.5 rounded bg-violet-50 dark:bg-[#161616] border border-violet-200 dark:border-[#ffffff0a] text-violet-800 dark:text-violet-200 font-medium">
                        {step}
                      </span>
                      {idx < PERSONAL_INFO.careerTracks[1].flow.length - 1 && (
                        <span className="text-violet-500/50 font-bold px-0.5">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {onOpenResume && (
                <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-[#ffffff08] flex justify-end">
                  <button
                    onClick={() => onOpenResume('DATA_SCIENTIST')}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-violet-800 dark:text-violet-300 hover:text-violet-900 dark:hover:text-violet-200 transition-colors cursor-pointer"
                  >
                    <span>View Data Scientist Resume & Model Specs</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
