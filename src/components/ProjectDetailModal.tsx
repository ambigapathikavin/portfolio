import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Database, 
  TrendingUp, 
  GitBranch, 
  Sparkles, 
  ChevronRight, 
  Lightbulb, 
  Target, 
  BarChart3, 
  FileText,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pipeline' | 'results'>('overview');

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0d0d0d] border border-[#ffffff15] rounded-xl shadow-2xl shadow-black overflow-hidden z-10 my-auto"
        >
          
          {/* Modal Header */}
          <div className="p-5 sm:p-6 bg-[#111111] border-b border-[#ffffff0a] flex items-start justify-between gap-4 sticky top-0 z-20">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#1a1a1a] border border-cyan-500/30 text-cyan-300">
                  {project.category}
                </span>
                <span className="text-[#777] text-[10px] font-mono">• Production Case Study</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#181818] hover:bg-[#252525] text-[#888] hover:text-white transition-colors focus:outline-none cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 px-5 sm:px-6 py-2.5 bg-[#0a0a0a] border-b border-[#ffffff0a] text-xs font-mono">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-[#888] hover:text-white'
              }`}
            >
              Case Study & Solution
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1 rounded text-[11px] font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'pipeline'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-[#888] hover:text-white'
              }`}
            >
              <GitBranch className="w-3 h-3" />
              <span>Data Pipeline & Architecture</span>
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`px-3 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                activeTab === 'results'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-[#888] hover:text-white'
              }`}
            >
              Results & Metrics
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Tech Stack Chips Bar */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#777]">Tech Applied:</span>
              {project.technology.map(t => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-[#161616] border border-[#ffffff0a] text-cyan-300 text-[10px] font-mono"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                
                {/* Executive Summary */}
                <div className="p-4 rounded-xl bg-[#111111] border border-[#ffffff08]">
                  <h3 className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Project Overview</span>
                  </h3>
                  <p className="text-[#E0E0E0] text-xs sm:text-sm leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                {/* Problem vs Methodology Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="p-4 rounded-xl bg-[#140d0d] border border-red-500/20 space-y-1.5">
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-semibold flex items-center gap-1.5">
                      <Target className="w-3 h-3" />
                      <span>Business Problem</span>
                    </h4>
                    <p className="text-xs text-[#C0C0C0] leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0d1418] border border-cyan-500/20 space-y-1.5">
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                      <Cpu className="w-3 h-3" />
                      <span>Methodology & Approach</span>
                    </h4>
                    <p className="text-xs text-[#C0C0C0] leading-relaxed">
                      {project.methodology}
                    </p>
                  </div>

                </div>

                {/* Data Source Description */}
                <div className="p-3.5 rounded-xl bg-[#111111] border border-[#ffffff08] flex items-start gap-2.5">
                  <Database className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-mono text-[#777] uppercase">Dataset & Inputs</div>
                    <div className="text-xs text-[#E0E0E0] mt-0.5">{project.data}</div>
                  </div>
                </div>

                {/* Execution Process */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#777]">
                    Execution Steps & Implementation:
                  </h4>
                  <div className="space-y-1.5">
                    {project.process.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#111111] border border-[#ffffff08]">
                        <span className="w-4 h-4 rounded-full bg-[#181818] border border-cyan-500/40 text-cyan-400 font-mono text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs text-[#C0C0C0] leading-relaxed">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: PIPELINE & ARCHITECTURE */}
            {activeTab === 'pipeline' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#111111] border border-[#ffffff08]">
                  <h3 className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 mb-0.5">
                    End-to-End Data Pipeline Architecture
                  </h3>
                  <p className="text-[11px] text-[#888]">
                    From raw data collection through feature engineering to deployment and executive insight.
                  </p>
                </div>

                <div className="space-y-2">
                  {project.pipeline.map((pipe, idx) => (
                    <div
                      key={pipe.step}
                      className="p-3 rounded-xl bg-[#111111] border border-[#ffffff08] hover:border-cyan-500/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-[#181818] border border-[#ffffff0a] flex items-center justify-center text-[10px] font-mono text-cyan-400 font-bold shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-wide">
                            {pipe.step}
                          </div>
                          <div className="text-xs text-[#C0C0C0] mt-0.5">
                            {pipe.description}
                          </div>
                        </div>
                      </div>

                      {pipe.tools && (
                        <div className="flex flex-wrap gap-1 sm:justify-end shrink-0">
                          {pipe.tools.map(tool => (
                            <span key={tool} className="px-2 py-0.5 rounded bg-[#181818] text-[9px] font-mono text-[#A0A0A0] border border-[#ffffff0a]">
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: RESULTS & LEARNINGS */}
            {activeTab === 'results' && (
              <div className="space-y-4">
                
                {/* Highlight Metrics */}
                {project.metrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#111111] border border-[#ffffff08] text-center">
                        <div className="text-xl font-bold font-mono text-cyan-400">{m.value}</div>
                        <div className="text-[10px] font-mono text-[#777] mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Deliverables */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#777]">
                    Validated Deliverables & Business Value:
                  </h4>
                  <ul className="space-y-1.5">
                    {project.results.map((res, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#C0C0C0] leading-relaxed p-2.5 rounded-lg bg-[#0d1612] border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Technical Learnings */}
                <div className="p-4 rounded-xl bg-[#111111] border border-[#ffffff08] space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                    <Lightbulb className="w-3 h-3" />
                    <span>Technical & Architectural Learnings</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {project.learnings.map((learn, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#A0A0A0]">
                        <span className="text-violet-400 font-bold">•</span>
                        <span>{learn}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="p-3.5 sm:p-4 bg-[#111111] border-t border-[#ffffff0a] flex items-center justify-between">
            <div className="text-[10px] font-mono text-[#777]">
              Candidate: <span className="text-white font-semibold">Ambigapathi V</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#181818] hover:bg-[#252525] text-[#E0E0E0] hover:text-white text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
