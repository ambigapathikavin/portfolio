import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderGit2, 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  BarChart3,
  BrainCircuit,
  Eye,
  Layers,
  Target,
  Zap,
  Info,
  CheckCircle2,
  Code2,
  Play,
  ExternalLink,
  Activity
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';

const FILTER_OPTIONS: { label: string; value: ProjectCategory }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: 'DATA ANALYTICS', value: 'DATA ANALYTICS' },
  { label: 'POWER BI', value: 'POWER BI' },
  { label: 'MACHINE LEARNING', value: 'MACHINE LEARNING' },
  { label: 'NLP', value: 'NLP' },
  { label: 'AI', value: 'AI' }
];

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
  return 'bg-[#161616] border-[#ffffff0a] text-[#A0A0A0]';
};

interface ProjectsShowcaseProps {
  onSelectProject?: (projectId: string) => void;
  onOpenResumeModal?: (role?: 'DATA_ANALYST' | 'DATA_SCIENTIST') => void;
  roleMode?: 'ALL' | 'DATA_ANALYST' | 'DATA_SCIENTIST';
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ 
  onSelectProject,
  onOpenResumeModal,
  roleMode = 'ALL'
}) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('ALL');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'DATA_ANALYST' | 'DATA_SCIENTIST'>(roleMode);

  // Sync roleFilter with incoming roleMode prop changes
  React.useEffect(() => {
    setRoleFilter(roleMode);
  }, [roleMode]);

  // Re-order and filter projects dynamically
  const filteredProjects = [...PROJECTS]
    .sort((a, b) => {
      if (roleFilter === 'DATA_ANALYST') {
        if (a.roleType === 'DATA_ANALYST' && b.roleType !== 'DATA_ANALYST') return -1;
        if (b.roleType === 'DATA_ANALYST' && a.roleType !== 'DATA_ANALYST') return 1;
      } else if (roleFilter === 'DATA_SCIENTIST') {
        if (a.roleType === 'DATA_SCIENTIST' && b.roleType !== 'DATA_SCIENTIST') return -1;
        if (b.roleType === 'DATA_SCIENTIST' && a.roleType !== 'DATA_SCIENTIST') return 1;
      }
      return 0;
    })
    .filter(project => {
      // Role filter
      if (roleFilter !== 'ALL') {
        if (project.roleType && project.roleType !== 'BOTH' && project.roleType !== roleFilter) {
          return false;
        }
      }
      // Category filter
      if (activeFilter === 'ALL') return true;
      return project.filterCategories.includes(activeFilter);
    });

  const handleProjectClick = (projectId: string) => {
    if (onSelectProject) {
      onSelectProject(projectId);
    }
  };

  return (
    <section id="projects" className="py-16 bg-[#050505] border-t border-[#ffffff08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#111111] border border-[#ffffff15] text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
              <FolderGit2 className="w-3 h-3" />
              <span>PROJECTS & VISUAL CASE STUDIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Visual Case Studies & Interactive Dashboards
            </h2>
            <p className="text-[#A3A3A3] text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Explore hands-on projects featuring production BI dashboards, BERT NLP engines, predictive risk scorecards, and automated MLOps pipelines.
            </p>
          </div>

          {/* Dual Resume Trigger Pill */}
          {onOpenResumeModal && (
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => onOpenResumeModal('DATA_ANALYST')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111] hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono text-cyan-300 transition-all cursor-pointer shadow-sm"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Data Analyst Resume</span>
              </button>
              <button
                onClick={() => onOpenResumeModal('DATA_SCIENTIST')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111] hover:bg-violet-500/20 border border-violet-500/30 text-xs font-mono text-violet-300 transition-all cursor-pointer shadow-sm"
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Data Scientist Resume</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Filter Controls Row */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-8 pb-4 border-b border-[#ffffff08]"
        >
          
          {/* Track Filter */}
          <div className="flex items-center gap-1 bg-[#0d0d0d] p-1 rounded-xl border border-[#ffffff10] self-start">
            <span className="text-[10px] font-mono text-[#666] px-2 uppercase">Track:</span>
            <button
              onClick={() => setRoleFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                roleFilter === 'ALL'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-[#888] hover:text-white'
              }`}
            >
              All Roles ({PROJECTS.length})
            </button>
            <button
              onClick={() => setRoleFilter('DATA_ANALYST')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                roleFilter === 'DATA_ANALYST'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-[#888] hover:text-cyan-300'
              }`}
            >
              <BarChart3 className="w-3 h-3" />
              <span>Data Analyst ({PROJECTS.filter(p => p.roleType === 'DATA_ANALYST' || p.roleType === 'BOTH').length})</span>
            </button>
            <button
              onClick={() => setRoleFilter('DATA_SCIENTIST')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                roleFilter === 'DATA_SCIENTIST'
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 font-semibold'
                  : 'text-[#888] hover:text-violet-300'
              }`}
            >
              <BrainCircuit className="w-3 h-3" />
              <span>Data Scientist ({PROJECTS.filter(p => p.roleType === 'DATA_SCIENTIST' || p.roleType === 'BOTH').length})</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 flex-wrap bg-[#0d0d0d] p-1 rounded-xl border border-[#ffffff08] self-start lg:self-auto">
            {FILTER_OPTIONS.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === tab.value
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                    : 'text-[#888] hover:text-white hover:bg-[#181818]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Cards Grid with Visual Thumbnails */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px', amount: 0.12 }}
                exit={{ opacity: 0, scale: 0.94, y: 15, transition: { duration: 0.2 } }}
                whileHover={{ y: -6, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
                whileTap={{ scale: 0.985 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: (idx % 3) * 0.09 
                }}
                className="group flex flex-col justify-between rounded-xl bg-[#0f0f0f] border border-[#ffffff0e] hover:border-cyan-500/40 shadow-sm hover:shadow-cyan-950/20 transition-colors duration-200 relative"
              >
                <div>
                  {/* Project Visual Thumbnail / Screenshot */}
                  <div 
                    onClick={() => handleProjectClick(project.id)}
                    className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-[#181818] cursor-pointer group/img"
                  >
                    <img
                      src={project.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80'}
                      alt={project.imageCaption || project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300 opacity-90 group-hover/img:opacity-100"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/40 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold shadow-md ${
                        project.roleType === 'DATA_SCIENTIST'
                          ? 'bg-violet-950/90 border border-violet-500/40 text-violet-200'
                          : project.roleType === 'DATA_ANALYST'
                          ? 'bg-cyan-950/90 border border-cyan-500/40 text-cyan-200'
                          : 'bg-emerald-950/90 border border-emerald-500/40 text-emerald-200'
                      }`}>
                        {project.roleType === 'DATA_SCIENTIST' ? 'Data Science' : project.roleType === 'DATA_ANALYST' ? 'Data Analytics' : 'Analytics & GIS'}
                      </span>

                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-white/80">
                        CASE 0{idx + 1}
                      </span>
                    </div>

                    {/* Hover Overlay Prompt */}
                    <div className="absolute inset-0 bg-cyan-950/30 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-semibold shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Open Project Case Study</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5">
                    
                    {/* Category & KPI Tooltip Trigger Pill */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="text-[10px] font-mono text-cyan-400 truncate">
                        {project.category}
                      </div>

                      {/* Small Interactive KPI Hover Tooltip Trigger */}
                      <div className="relative group/tooltip shrink-0">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-[9px] font-mono transition-colors cursor-help focus:outline-none"
                          aria-label="View KPI metrics"
                        >
                          <Target className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                          <span>KPIs</span>
                          <Info className="w-2.5 h-2.5 opacity-70 shrink-0" />
                        </button>

                        {/* Floating Tooltip Card */}
                        <div className="absolute bottom-full right-0 mb-2.5 w-72 sm:w-80 p-3.5 rounded-xl bg-[#0c1017] border border-cyan-500/40 shadow-2xl shadow-black/90 backdrop-blur-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:visible transition-all duration-200 z-50 pointer-events-none group-hover/tooltip:pointer-events-auto">
                          
                          {/* Tooltip Header */}
                          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#ffffff12]">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span>Key Performance Indicators</span>
                            </div>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              Measured Lift
                            </span>
                          </div>

                          {/* Quick Metrics Grid in Tooltip */}
                          {project.metrics && project.metrics.length > 0 && (
                            <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                              {project.metrics.slice(0, 4).map((metric, mIdx) => (
                                <div key={mIdx} className="p-1.5 rounded-lg bg-[#141924] border border-[#ffffff0a]">
                                  <div className="text-[11px] font-bold font-mono text-cyan-300">{metric.value}</div>
                                  <div className="text-[8px] text-[#888] font-mono truncate">{metric.label}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* KPI Deltas List */}
                          {project.kpis && project.kpis.length > 0 && (
                            <div className="space-y-1.5">
                              <div className="text-[9px] font-mono uppercase tracking-wider text-[#777]">
                                Benchmarks & Optimization
                              </div>
                              {project.kpis.slice(0, 2).map((kpi, kIdx) => (
                                <div key={kIdx} className="p-1.5 rounded-lg bg-[#10141d] border border-[#ffffff08] text-[10px]">
                                  <div className="flex items-center justify-between text-white font-medium mb-0.5">
                                    <span className="truncate pr-1 text-[10px]">{kpi.title}</span>
                                    <span className="font-mono text-[9px] font-bold px-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 shrink-0">
                                      {kpi.improvement}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-[9px] font-mono text-[#888]">
                                    <span>Base: <strong className="text-[#bbb]">{kpi.baseline}</strong></span>
                                    <span>Achieved: <strong className="text-cyan-300">{kpi.current}</strong></span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Tooltip Arrow Indicator */}
                          <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-cyan-500/40" />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => handleProjectClick(project.id)}
                      className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-2 cursor-pointer line-clamp-1"
                    >
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-[#A3A3A3] text-xs leading-relaxed mb-3.5 line-clamp-2">
                      {project.shortDescription}
                    </p>

                    {/* Key Result Impact Callout with Interactive Tooltip Hover */}
                    <div className="relative group/outcome p-2.5 rounded-lg bg-[#080808] hover:bg-[#0c1017] border border-cyan-500/20 hover:border-cyan-500/40 mb-3 flex items-start gap-2 transition-all cursor-help">
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="text-[9px] font-mono text-cyan-400 uppercase font-semibold">
                            Key Outcome & KPI Result
                          </div>
                          <span className="text-[8px] font-mono text-[#666] group-hover/outcome:text-cyan-400 transition-colors">
                            Hover for KPIs ⓘ
                          </span>
                        </div>
                        <div className="text-xs text-[#E0E0E0] mt-0.5 font-medium leading-snug line-clamp-2">
                          {project.keyResult}
                        </div>
                      </div>

                      {/* Tooltip on Key Outcome Box Hover */}
                      <div className="absolute bottom-full left-0 right-0 mb-2 p-3 rounded-xl bg-[#0c1017] border border-cyan-500/40 shadow-2xl shadow-black/90 backdrop-blur-xl opacity-0 invisible group-hover/outcome:opacity-100 group-hover/outcome:visible transition-all duration-200 z-50 pointer-events-none">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 mb-1.5 pb-1 border-b border-[#ffffff10]">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>Measured Business & Technical Impact</span>
                        </div>
                        <p className="text-[11px] text-[#D1D5DB] leading-relaxed mb-2">
                          {project.keyResult}
                        </p>
                        {project.kpis && project.kpis.length > 0 && (
                          <div className="pt-1.5 border-t border-[#ffffff0a] flex items-center justify-between text-[9px] font-mono text-[#9CA3AF]">
                            <span>Primary KPI Lift:</span>
                            <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                              {project.kpis[0].title} ({project.kpis[0].improvement})
                            </span>
                          </div>
                        )}
                        <div className="absolute top-full left-6 -mt-1 border-4 border-transparent border-t-cyan-500/40" />
                      </div>
                    </div>

                    {/* Quick 2-Column Metrics */}
                    {project.metrics && (
                      <div className="grid grid-cols-2 gap-1.5 mb-3">
                        {project.metrics.slice(0, 2).map((m, mIdx) => (
                          <div key={mIdx} className="p-2 rounded-lg bg-[#0a0a0a] border border-[#ffffff08] text-center">
                            <div className="text-xs font-bold font-mono text-white">{m.value}</div>
                            <div className="text-[9px] text-[#777] font-mono truncate">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Technology Stack Chips */}
                    <div className="flex flex-wrap items-center gap-1">
                      {project.technology.slice(0, 3).map(tech => (
                        <span
                          key={tech}
                          className={`px-2 py-0.5 rounded border text-[10px] font-mono font-medium transition-colors ${getTechBadgeStyle(tech)}`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technology.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded bg-[#161616] border border-[#ffffff0a] text-[9px] font-mono text-[#777]">
                          +{project.technology.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* View Project Action Footer */}
                <div className="p-4 sm:p-5 pt-0 space-y-2">
                  {(project.githubUrl || project.liveDemoUrl) && (
                    <div className="flex items-center gap-2 pt-1">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#ffffff15] hover:border-[#ffffff30] text-[10px] font-mono text-[#d0d0d0] hover:text-white transition-all cursor-pointer shadow-sm group/git"
                          title="View GitHub Repository"
                        >
                          <Code2 className="w-3 h-3 text-cyan-400 group-hover/git:scale-110 transition-transform" />
                          <span>GitHub</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover/git:opacity-100 transition-opacity" />
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 hover:border-emerald-400/60 text-[10px] font-mono text-emerald-200 hover:text-emerald-100 font-semibold transition-all cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.12)] group/live"
                          title="Open Live Streamlit Application"
                        >
                          <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                          </span>
                          <span>Live Demo</span>
                          <ExternalLink className="w-2.5 h-2.5 text-emerald-300 opacity-70 group-hover/live:opacity-100 transition-opacity" />
                        </a>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleProjectClick(project.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-500 hover:text-black text-cyan-300 text-[11px] font-semibold font-mono border border-cyan-500/35 hover:border-cyan-400 transition-all duration-150 shadow-sm cursor-pointer group/simbtn"
                      title="Launch live interactive simulator"
                    >
                      <Activity className="w-3.5 h-3.5 text-cyan-400 group-hover/simbtn:text-black animate-pulse" />
                      <span>Live Simulator</span>
                    </button>
                    <button
                      onClick={() => handleProjectClick(project.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#181818] hover:bg-[#252525] text-[#e0e0e0] hover:text-white text-[11px] font-semibold font-mono border border-[#ffffff0a] hover:border-[#ffffff20] transition-all duration-150 shadow-sm cursor-pointer group/casebtn"
                      title="View full architectural case study"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#888] group-hover/casebtn:text-white group-hover/casebtn:translate-x-0.5 group-hover/casebtn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
