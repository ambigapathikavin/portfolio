import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ArrowRight, ExternalLink, Download, CheckCircle2, TrendingUp, 
  Cpu, Database, Sparkles, Layers, Terminal, FileCode2, LineChart, 
  Sliders, ShieldCheck, Share2, HelpCircle, Briefcase, Award, BarChart2,
  GitBranch, Play, Code2, Github, Activity
} from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ProjectInteractiveDashboard } from './ProjectInteractiveDashboard';
import { PipelineFlowchart } from './PipelineFlowchart';

const getTechBadgeStyle = (tech: string) => {
  const lower = tech.toLowerCase();
  if (lower.includes('python') || lower.includes('sql') || lower.includes('pyspark')) {
    return 'bg-cyan-950/40 border-cyan-500/25 text-cyan-300';
  }
  if (lower.includes('power bi') || lower.includes('dax') || lower.includes('excel') || lower.includes('tableau')) {
    return 'bg-sky-950/40 border-sky-500/25 text-sky-300';
  }
  if (lower.includes('pytorch') || lower.includes('bert') || lower.includes('xgboost') || lower.includes('machine learning') || lower.includes('nlp')) {
    return 'bg-violet-950/40 border-violet-500/25 text-violet-300';
  }
  if (lower.includes('docker') || lower.includes('fastapi') || lower.includes('streamlit') || lower.includes('mlflow')) {
    return 'bg-emerald-950/40 border-emerald-500/25 text-emerald-300';
  }
  return 'bg-[#161616] border-[#ffffff10] text-[#A0A0A0]';
};

interface ProjectPageProps {
  projectId: string;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
}

type TabKey = 'dashboard' | 'problem' | 'pipeline' | 'methodology' | 'roi';

export const ProjectPage: React.FC<ProjectPageProps> = ({ projectId, onBack, onSelectProject }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [copiedLink, setCopiedLink] = useState(false);

  // Find project
  const projectIndex = PROJECTS.findIndex(p => p.id === projectId);
  const project = projectIndex !== -1 ? PROJECTS[projectIndex] : PROJECTS[0];

  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : PROJECTS[0];

  // Scroll to top on project load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('dashboard');
  }, [projectId]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-sans pt-16 sm:pt-20 pb-24 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Clean Sticky Sub-Navigation Header docked below main fixed Navbar */}
      <header className="sticky top-[56px] sm:top-[64px] z-30 bg-[#080808]/95 backdrop-blur-md border-b border-[#ffffff10] px-4 sm:px-6 lg:px-8 py-2.5 shadow-lg shadow-black/70">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back Action & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 font-semibold shadow-sm transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Overview</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#666]">
              <span>/</span>
              <button 
                onClick={onBack}
                className="text-[#888] hover:text-white transition-colors cursor-pointer"
              >
                Projects
              </button>
              <span>/</span>
              <span className="text-cyan-400 font-semibold truncate max-w-[240px]">{project.title}</span>
            </div>
          </div>

          {/* Quick Action Links & Prev / Next Switchers */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-xs font-mono text-emerald-300 font-bold transition-all shadow-sm"
                title="Launch Live Application / Streamlit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3 text-emerald-400" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#ffffff15] hover:border-cyan-500/40 text-xs font-mono text-[#ccc] hover:text-white transition-all shadow-sm"
                title="View Source Repository on GitHub"
              >
                <Github className="w-3 h-3 text-cyan-400" />
                <span>GitHub</span>
              </a>
            )}

            <button
              onClick={() => {
                setActiveTab('dashboard');
                setTimeout(() => {
                  const el = document.getElementById('interactive-simulator-section') || document.getElementById('project-tabs-content');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 40);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900/90 border border-cyan-500/40 text-xs font-mono text-cyan-300 font-semibold transition-all cursor-pointer shadow-sm group/sim"
              title="Launch Interactive Simulator & Live Metrics"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Simulator</span>
            </button>

            <div className="h-4 w-[1px] bg-[#ffffff15] hidden sm:block mx-0.5" />

            <button
              onClick={handleShare}
              className="px-2.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#ffffff15] text-xs font-mono text-[#aaa] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
              title="Share this project link"
            >
              <Share2 className="w-3 h-3" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={() => onSelectProject(prevProject.id)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#ffffff15] text-xs font-mono text-[#aaa] hover:text-white flex items-center gap-1 transition-all cursor-pointer"
              title={`Previous: ${prevProject.title}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <button
              onClick={() => onSelectProject(nextProject.id)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#ffffff15] text-xs font-mono text-[#aaa] hover:text-white flex items-center gap-1 transition-all cursor-pointer"
              title={`Next: ${nextProject.title}`}
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Project Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 sm:p-8 rounded-2xl bg-[#0e0e0e] border border-[#ffffff12] shadow-2xl relative overflow-hidden mb-8"
        >
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-semibold">
                  {project.category}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#1c1c1c] border border-[#ffffff10] text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Production & Analytics Verified</span>
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#777]">
                PROJECT ID: {project.id.toUpperCase()}
              </span>
            </div>

            {/* Project Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              {project.title}
            </h1>

            {/* Project Executive Summary */}
            <p className="text-sm sm:text-base text-[#B0B0B0] leading-relaxed max-w-4xl mb-6">
              {project.overview}
            </p>

            {/* Dataset Statistics Matrix */}
            {project.datasetStats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#080808] border border-[#ffffff0a] mb-6">
                <div>
                  <div className="text-[9px] font-mono text-[#777] uppercase">Dataset Volume</div>
                  <div className="text-xs font-bold font-mono text-white mt-0.5">{project.datasetStats.rows}</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-[#777] uppercase">Dimensional Features</div>
                  <div className="text-xs font-bold font-mono text-cyan-300 mt-0.5">{project.datasetStats.features}</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-[#777] uppercase">Storage / Schema</div>
                  <div className="text-xs font-bold font-mono text-violet-300 mt-0.5">{project.datasetStats.format}</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-[#777] uppercase">Timeframe / Scope</div>
                  <div className="text-xs font-bold font-mono text-emerald-300 mt-0.5">{project.datasetStats.timeframe}</div>
                </div>
              </div>
            )}

            {/* Key Result Callout & Tech Stack */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-[#ffffff0a]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Quantified Impact</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">{project.keyResult}</div>
                </div>
              </div>

              {/* Action Links & Technologies */}
              <div className="flex flex-wrap items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#282828] border border-[#ffffff20] text-xs font-mono text-white font-semibold transition-all cursor-pointer shadow-sm hover:border-cyan-500/50"
                  >
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>GitHub Code</span>
                    <ExternalLink className="w-3 h-3 text-[#888]" />
                  </a>
                )}

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/85 border border-emerald-500/40 hover:border-emerald-400/60 text-xs font-mono text-emerald-200 hover:text-emerald-100 font-bold transition-all cursor-pointer shadow-[0_0_14px_rgba(16,185,129,0.16)] group/live"
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span>Live Streamlit App</span>
                    <ExternalLink className="w-3 h-3 text-emerald-300 opacity-75 group-hover/live:opacity-100 transition-opacity" />
                  </a>
                )}

                {project.technology.map(tech => (
                  <span
                    key={tech}
                    className={`px-2.5 py-1 rounded border text-[11px] font-mono font-medium transition-colors ${getTechBadgeStyle(tech)}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

        {/* Executive Metric Cards Bar */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#0f0f0f] border border-[#ffffff0a] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div className="text-[10px] font-mono text-[#888] uppercase tracking-wider mb-1">
                  {metric.label}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                  {metric.value}
                </div>
                {metric.subtext && (
                  <div className="text-[10px] font-mono text-cyan-400/80 mt-1">
                    {metric.subtext}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div id="project-tabs-content" className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 border-b border-[#ffffff10] scroll-mt-20">
          {[
            { id: 'dashboard' as TabKey, label: 'Interactive Simulator & Dashboard', icon: BarChart2, isLive: true },
            { id: 'pipeline' as TabKey, label: '9-Stage Pipeline Architecture', icon: Layers },
            { id: 'problem' as TabKey, label: 'Business Problem & Context', icon: Briefcase },
            { id: 'methodology' as TabKey, label: 'Technical Methodology', icon: FileCode2 },
            { id: 'roi' as TabKey, label: 'Quantified ROI & Key Learnings', icon: Award }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                    : 'text-[#888] hover:text-white hover:bg-[#141414]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.isLive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: INTERACTIVE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Project Screenshot / Visual Banner */}
            {project.imageUrl && (
              <div className="p-4 sm:p-5 rounded-xl bg-[#0e0e0e] border border-[#ffffff10] overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Visual System Asset & Architecture
                    </span>
                  </div>
                  {project.imageCaption && (
                    <span className="text-[11px] font-mono text-cyan-400">
                      {project.imageCaption}
                    </span>
                  )}
                </div>

                <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full rounded-lg overflow-hidden bg-[#161616] border border-[#ffffff08]">
                  <img
                    src={project.imageUrl}
                    alt={project.imageCaption || project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-[#E0E0E0]">
                      {project.category} • {project.title}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                      Production Architecture
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Live Interactive Simulator Wrapper */}
            <div id="interactive-simulator-section" className="scroll-mt-24 space-y-4">
              {project.liveDemoUrl && (
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-[#0e1613] to-cyan-950/30 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono shadow-sm">
                  <div className="flex items-start sm:items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 mt-0.5 sm:mt-0 animate-ping" />
                    <div>
                      <span className="text-white font-bold">Dual Model Simulation:</span>{' '}
                      <span className="text-[#bbb]">
                        Execute instant in-browser ML parameter predictions below (0ms latency), or access the deployed{' '}
                      </span>
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-300 hover:text-emerald-200 underline font-bold inline-flex items-center gap-1"
                      >
                        Streamlit Cloud App ↗
                      </a>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#888] shrink-0 bg-[#080808] px-2 py-1 rounded border border-[#ffffff10]">
                    Streamlit Cloud free-tier takes ~45s to wake up if sleeping
                  </span>
                </div>
              )}

              <ProjectInteractiveDashboard project={project} />
            </div>

            {/* Performance KPIs Comparison Table */}
            {project.kpis && project.kpis.length > 0 && (
              <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#ffffff10]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span>Key Performance Indicators (Baseline vs Achieved)</span>
                  </h3>
                  <span className="text-[10px] font-mono text-[#888]">Rigorous benchmarking</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.kpis.map((kpi, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-[#141414] border border-[#ffffff08]">
                      <div className="text-xs font-bold text-white font-mono mb-2">{kpi.title}</div>
                      
                      <div className="flex items-baseline justify-between mb-2">
                        <div>
                          <div className="text-[9px] font-mono text-[#777]">Current Model</div>
                          <div className="text-lg font-bold font-mono text-emerald-400">{kpi.current}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] font-mono text-[#777]">Legacy Baseline</div>
                          <div className="text-xs font-mono text-[#888] line-through">{kpi.baseline}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                          {kpi.improvement}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#A0A0A0] leading-relaxed pt-2 border-t border-[#ffffff08]">
                        {kpi.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 2: PIPELINE ARCHITECTURE */}
        {activeTab === 'pipeline' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Visual Interactive Architecture Flowchart */}
            <PipelineFlowchart category={project.category} projectTitle={project.title} />

            <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#ffffff10]">
              <div className="mb-6">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Full End-to-End 9-Stage Pipeline Architecture</span>
                </h3>
                <p className="text-xs text-[#888] font-mono mt-1">
                  How this project executes across: RAW DATA → INGESTION → CLEANING → EDA → FEATURE ENG → MODELING → EVALUATION → DEPLOYMENT → BUSINESS ROI
                </p>
              </div>

              <div className="space-y-3">
                {project.pipeline.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-[#141414] border border-[#ffffff08] hover:border-cyan-500/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                            {step.step}
                          </span>
                          {step.tools && (
                            <div className="flex items-center gap-1">
                              {step.tools.map(t => (
                                <span key={t} className="px-1.5 py-0.2 rounded bg-[#202020] text-[9px] font-mono text-cyan-300">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-[#B0B0B0] mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {step.codeSnippet && (
                      <div className="lg:w-96 shrink-0">
                        <code className="block p-2 rounded bg-[#0a0a0a] border border-[#ffffff0a] text-[10px] font-mono text-cyan-200 overflow-x-auto">
                          {step.codeSnippet}
                        </code>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: BUSINESS PROBLEM & STRATEGY */}
        {activeTab === 'problem' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* The Business Challenge */}
            <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#ffffff10] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[10px] font-mono mb-3">
                  <span>PROBLEM DEFINITION</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">The Operational Challenge</h3>
                <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                  {project.problem}
                </p>
              </div>
              
              <div className="mt-6 p-3.5 rounded-lg bg-[#141414] border border-[#ffffff08] text-xs font-mono text-[#888]">
                <strong className="text-white block mb-1">Key Vulnerability:</strong>
                Lack of automated analytical pipelines led to delayed decision making and uncaptured revenue.
              </div>
            </div>

            {/* Highlights and Solution Scope */}
            <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#ffffff10]">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono mb-3">
                <span>SYSTEM SOLUTION</span>
              </div>
              <h3 className="text-base font-bold text-white mb-3">Implemented Scope & Execution</h3>

              <div className="space-y-2.5">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#B0B0B0] leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: TECHNICAL METHODOLOGY */}
        {activeTab === 'methodology' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dataset Description */}
              <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#ffffff10]">
                <h3 className="text-sm font-bold text-white font-mono mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>Data Foundation & Schemas</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                  {project.data}
                </p>
              </div>

              {/* Analytical Methodology */}
              <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#ffffff10]">
                <h3 className="text-sm font-bold text-white font-mono mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-violet-400" />
                  <span>Engineering Methodology</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                  {project.methodology}
                </p>
              </div>
            </div>

            {/* Implementation Process Steps */}
            <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#ffffff10]">
              <h3 className="text-sm font-bold text-white font-mono mb-4">Detailed Step-by-Step Execution</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.process.map((p, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#141414] border border-[#ffffff08] flex items-start gap-2.5">
                    <span className="text-xs font-mono font-bold text-cyan-400 shrink-0">#{i + 1}</span>
                    <span className="text-xs text-[#B0B0B0] leading-relaxed">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 5: QUANTIFIED ROI & LEARNINGS */}
        {activeTab === 'roi' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Results */}
            <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#ffffff10]">
              <h3 className="text-sm font-bold text-white font-mono mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Verified Business Outcomes</span>
              </h3>
              <div className="space-y-3">
                {project.results.map((r, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#141414] border border-[#ffffff08] flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-[#D0D0D0] leading-relaxed">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learnings */}
            <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#ffffff10]">
              <h3 className="text-sm font-bold text-white font-mono mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Key Technical Insights & Takeaways</span>
              </h3>
              <div className="space-y-3">
                {project.learnings.map((l, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#141414] border border-[#ffffff08] flex items-start gap-2.5">
                    <span className="text-xs font-mono font-bold text-amber-400 shrink-0">0{i + 1}</span>
                    <span className="text-xs text-[#D0D0D0] leading-relaxed">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom Switcher Card for Seamless Browsing */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0e0e0e] border border-[#ffffff10] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono text-[#777] uppercase">Next Flagship Project</div>
            <div className="text-base font-bold text-white mt-0.5">{nextProject.title}</div>
            <div className="text-xs text-[#888] font-mono mt-0.5">{nextProject.category}</div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectProject(nextProject.id)}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-cyan-500/10 active:scale-95"
            >
              <span>Explore Next Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};
