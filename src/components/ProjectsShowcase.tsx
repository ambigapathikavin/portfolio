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
  Layers
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

interface ProjectsShowcaseProps {
  onSelectProject?: (projectId: string) => void;
  onOpenResumeModal?: (role?: 'DATA_ANALYST' | 'DATA_SCIENTIST') => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ 
  onSelectProject,
  onOpenResumeModal
}) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('ALL');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'DATA_ANALYST' | 'DATA_SCIENTIST'>('ALL');

  const filteredProjects = PROJECTS.filter(project => {
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
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
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-8 pb-4 border-b border-[#ffffff08]">
          
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
              <span>Data Analyst (4)</span>
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
              <span>Data Scientist (5)</span>
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
        </div>

        {/* Project Cards Grid with Visual Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                transition={{ 
                  duration: 0.35, 
                  ease: [0.21, 0.47, 0.32, 0.98],
                  delay: (idx % 6) * 0.05 
                }}
                className="group flex flex-col justify-between rounded-xl bg-[#0f0f0f] border border-[#ffffff0e] hover:border-cyan-500/40 shadow-sm hover:shadow-cyan-950/20 transition-colors duration-200 overflow-hidden"
              >
                <div>
                  {/* Project Visual Thumbnail / Screenshot */}
                  <div 
                    onClick={() => handleProjectClick(project.id)}
                    className="relative aspect-video w-full overflow-hidden bg-[#181818] cursor-pointer group/img"
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
                    
                    {/* Category */}
                    <div className="text-[10px] font-mono text-cyan-400 mb-1">
                      {project.category}
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

                    {/* Key Result Impact Callout */}
                    <div className="p-2.5 rounded-lg bg-[#080808] border border-cyan-500/20 mb-3 flex items-start gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[9px] font-mono text-cyan-400 uppercase font-semibold">
                          Key Outcome
                        </div>
                        <div className="text-xs text-[#E0E0E0] mt-0.5 font-medium leading-snug line-clamp-2">
                          {project.keyResult}
                        </div>
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
                          className="px-2 py-0.5 rounded bg-[#161616] border border-[#ffffff0a] text-[10px] font-mono text-[#A0A0A0]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technology.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded bg-[#161616] text-[9px] font-mono text-[#666]">
                          +{project.technology.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* View Project Action Footer */}
                <div className="p-4 sm:p-5 pt-0">
                  <button
                    onClick={() => handleProjectClick(project.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#181818] hover:bg-cyan-500 hover:text-black text-white text-[11px] font-semibold font-mono border border-[#ffffff0a] hover:border-cyan-400 transition-all duration-150 shadow-sm cursor-pointer group/btn"
                  >
                    <span>View Project & Detailed Metrics</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
