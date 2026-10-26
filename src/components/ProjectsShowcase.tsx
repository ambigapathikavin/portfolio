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
  Play,
  Search,
  X,
  Star
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory, ProjectTab } from '../types';
import { 
  trackProjectCardClick, 
  trackRoleFilterChange, 
  trackCategoryFilterChange, 
  trackProjectSearch, 
  trackProfileLink
} from '../utils/analytics';
import { resolveProjectImage, BROKEN_IMAGE_FALLBACK, projectImageAccent } from '../utils/assets';

const FILTER_OPTIONS: { label: string; value: ProjectCategory }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: 'DATA ANALYTICS', value: 'DATA ANALYTICS' },
  { label: 'POWER BI', value: 'POWER BI' },
  { label: 'MACHINE LEARNING', value: 'MACHINE LEARNING' },
  { label: 'NLP', value: 'NLP' },
  { label: 'AI', value: 'AI' }
];

const INITIAL_PROJECT_COUNT = 8;
const INITIAL_PROJECT_IDS = [
  'project-1',
  'project-2',
  'project-3',
  'project-4',
  'project-5',
  'project-6',
  'project-7',
  'project-10',
] as const;
const INITIAL_PROJECT_ORDER = new Map<string, number>(
  INITIAL_PROJECT_IDS.map((id, index) => [id, index])
);

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
  return 'bg-slate-100 dark:bg-[#161616] border-slate-300 dark:border-[#ffffff0a] text-slate-700 dark:text-[#A0A0A0]';
};

interface ProjectsShowcaseProps {
  onSelectProject?: (projectId: string, initialTab?: ProjectTab) => void;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllProjects, setShowAllProjects] = useState(false);
  // Which project's KPI panel is open. Explicit state (rather than hover-only)
  // so the panel is reachable on touch devices and via keyboard.
  const [openKpiCard, setOpenKpiCard] = useState<string | null>(null);

  // Dismiss an open KPI panel on Escape or an outside click.
  React.useEffect(() => {
    if (!openKpiCard) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenKpiCard(null);
    };
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest('[data-kpi-trigger]')) setOpenKpiCard(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [openKpiCard]);

  // Sync roleFilter with incoming roleMode prop changes
  React.useEffect(() => {
    setRoleFilter(roleMode);
  }, [roleMode]);

  const handleRoleFilterSelect = (newRole: 'ALL' | 'DATA_ANALYST' | 'DATA_SCIENTIST') => {
    setRoleFilter(newRole);
    trackRoleFilterChange(newRole, 'showcase');
  };

  const handleCategoryFilterSelect = (category: ProjectCategory) => {
    setActiveFilter(category);
    trackCategoryFilterChange(category);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length >= 2) {
      const q = query.trim().toLowerCase();
      const matchCount = PROJECTS.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.technology.some(t => t.toLowerCase().includes(q))
      ).length;
      trackProjectSearch(query, matchCount, 'projects');
    }
  };

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
      return (INITIAL_PROJECT_ORDER.get(a.id) ?? Number.MAX_SAFE_INTEGER)
        - (INITIAL_PROJECT_ORDER.get(b.id) ?? Number.MAX_SAFE_INTEGER);
    })
    .filter(project => {
      // Role filter
      if (roleFilter !== 'ALL') {
        if (project.roleType && project.roleType !== 'BOTH' && project.roleType !== roleFilter) {
          return false;
        }
      }
      // Category filter
      if (activeFilter !== 'ALL' && !project.filterCategories.includes(activeFilter)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesDesc = project.shortDescription.toLowerCase().includes(q);
        const matchesTech = project.technology.some(t => t.toLowerCase().includes(q));
        const matchesKeyResult = project.keyResult.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesTech || matchesKeyResult;
      }
      return true;
    });

  // `initialTab` lets the "Live Simulator" button land straight on the
  // simulator instead of behaving identically to "Case Study".
  const handleProjectClick = (projectId: string, index: number, initialTab?: ProjectTab) => {
    const proj = PROJECTS.find(p => p.id === projectId);
    trackProjectCardClick(
      projectId,
      proj?.title || projectId,
      { roleTrack: proj?.roleType, category: proj?.category, cardPosition: index }
    );
    if (onSelectProject) {
      onSelectProject(projectId, initialTab);
    }
  };

  return (
    <section id="projects" className="scroll-mt-20 sm:scroll-mt-24 py-16 bg-white dark:bg-[#060608] border-t border-slate-200 dark:border-[#ffffff08] relative">
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
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#111111] border border-slate-300 dark:border-[#ffffff15] text-cyan-600 dark:text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
              <FolderGit2 className="w-3 h-3" />
              <span>PROJECTS & VISUAL CASE STUDIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Projects & Case Studies
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
              Browse practical work across data analytics, machine learning, NLP, and AI. Search or filter the projects to find relevant examples.
            </p>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Project metrics may include estimates or simulated examples; they are not independently verified client outcomes.
            </p>
          </div>

          {/* Dual Resume Trigger Pill */}
          {onOpenResumeModal && (
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => onOpenResumeModal('DATA_ANALYST')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#111] hover:bg-cyan-100 dark:hover:bg-cyan-500/20 border border-cyan-400 dark:border-cyan-500/30 text-xs font-mono text-cyan-700 dark:text-cyan-300 transition-all cursor-pointer shadow-sm"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Data Analyst Resume</span>
              </button>
              <button
                onClick={() => onOpenResumeModal('DATA_SCIENTIST')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#111] hover:bg-violet-100 dark:hover:bg-violet-500/20 border border-violet-400 dark:border-violet-500/30 text-xs font-mono text-violet-700 dark:text-violet-300 transition-all cursor-pointer shadow-sm"
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Data Scientist Resume</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Filter & Search Controls Row */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3 mb-8 pb-4 border-b border-[#ffffff08]"
        >
          {/* Top row: Track selector & Search bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Track Filter */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#0d0d0d] p-1 rounded-xl border border-slate-200 dark:border-[#ffffff10] self-start shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 dark:text-[#666] px-2 uppercase">Track:</span>
              <button
                onClick={() => handleRoleFilterSelect('ALL')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                  roleFilter === 'ALL'
                    ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-[#888] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All ({PROJECTS.length})
              </button>
              <button
                onClick={() => handleRoleFilterSelect('DATA_ANALYST')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                  roleFilter === 'DATA_ANALYST'
                    ? 'bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-600 dark:text-[#888] hover:text-cyan-700 dark:hover:text-cyan-300'
                }`}
              >
                <BarChart3 className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                <span>Analyst ({PROJECTS.filter(p => p.roleType === 'DATA_ANALYST' || p.roleType === 'BOTH').length})</span>
              </button>
              <button
                onClick={() => handleRoleFilterSelect('DATA_SCIENTIST')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                  roleFilter === 'DATA_SCIENTIST'
                    ? 'bg-violet-500/20 text-violet-800 dark:text-violet-300 border border-violet-500/40 font-semibold'
                    : 'text-slate-600 dark:text-[#888] hover:text-violet-700 dark:hover:text-violet-300'
                }`}
              >
                <BrainCircuit className="w-3 h-3 text-violet-600 dark:text-violet-400" />
                <span>Scientist ({PROJECTS.filter(p => p.roleType === 'DATA_SCIENTIST' || p.roleType === 'BOTH').length})</span>
              </button>
            </div>

            {/* Instant Project Search Input */}
            <div className="relative flex-1 sm:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 dark:text-[#666]">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search projects (e.g. Tomato, BERT, Power BI)..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0d0d0d] border border-slate-200 dark:border-[#ffffff10] text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#666] focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-white cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Bottom row: Category Filter Pills */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
            <div className="flex items-center gap-1 flex-wrap bg-slate-100 dark:bg-[#0d0d0d] p-1 rounded-xl border border-slate-200 dark:border-[#ffffff08] shadow-sm">
              {FILTER_OPTIONS.map(tab => (
                <button
                  key={tab.value}
                  onClick={() => handleCategoryFilterSelect(tab.value)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilter === tab.value
                      ? 'bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                      : 'text-slate-600 dark:text-[#888] hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#181818]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] font-mono text-slate-500 dark:text-[#777]">
              Showing <strong className="text-cyan-600 dark:text-cyan-400">{filteredProjects.length}</strong> of {PROJECTS.length} projects
            </span>
          </div>
        </motion.div>

        {/* Equal grid tracks keep every project card aligned and compact. */}
        <motion.div 
          layout
          className="grid grid-cols-1 auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {(showAllProjects ? filteredProjects : filteredProjects.slice(0, INITIAL_PROJECT_COUNT)).map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px', amount: 0.12 }}
                exit={{ opacity: 0, scale: 0.94, y: 15, transition: { duration: 0.2 } }}
                whileHover={{ y: -2, transition: { duration: 0.18 } }}
                whileTap={{ scale: 0.995 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: (idx % 3) * 0.09 
                }}
                className="group flex h-full min-w-0 flex-col rounded-xl bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-[#ffffff0e] hover:border-cyan-500/40 shadow-sm hover:shadow-md transition-colors duration-200 relative"
              >
                <div className="flex flex-1 flex-col">
                  {/* Project Visual Thumbnail / Screenshot.
                      A button, so the image is reachable by keyboard and
                      announced as clickable, rather than a bare div with onClick. */}
                  <button
                    type="button"
                    onClick={() => handleProjectClick(project.id, idx, 'problem')}
                    className="relative aspect-[2.2/1] w-full shrink-0 overflow-hidden rounded-t-xl bg-slate-100 dark:bg-[#181818] cursor-pointer group/img focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500/70"
                    aria-label={`Open case study: ${project.title}`}
                  >
                    {/* Fallback tile sits *behind* the image. If the file 404s
                        the <img> is swapped for a 1x1 transparent GIF, so this
                        label shows through instead of a broken-image icon. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center px-6 text-center font-mono text-xs font-bold leading-snug text-white/80 p-4"
                      style={{ backgroundColor: `${projectImageAccent(project.accentColor)}1f` }}
                    >
                      {project.title}
                    </span>

                    <img
                      src={resolveProjectImage(project.imageUrl) || BROKEN_IMAGE_FALLBACK}
                      alt={project.imageCaption || project.title}
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={675}
                      onError={e => {
                        if (e.currentTarget.src !== BROKEN_IMAGE_FALLBACK) {
                          e.currentTarget.src = BROKEN_IMAGE_FALLBACK;
                        }
                      }}
                      className="relative w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300 opacity-90 group-hover/img:opacity-100"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-[#0f0f0f] via-transparent to-black/30 pointer-events-none" />

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
                  </button>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-3">
                    {project.imageAttribution && (
                      <p className="mb-1 h-3 truncate whitespace-nowrap text-[9px] leading-3 text-slate-500 dark:text-slate-400">
                        Photo:{' '}
                        <a
                          href={project.imageAttribution.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-slate-400/50 underline-offset-2 hover:text-cyan-600 dark:hover:text-cyan-300"
                        >
                          {project.imageAttribution.creator}
                        </a>
                        {' · cropped to fit'}
                        {' · '}
                        <a
                          href={project.imageAttribution.licenseUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-slate-400/50 underline-offset-2 hover:text-cyan-600 dark:hover:text-cyan-300"
                        >
                          {project.imageAttribution.license}
                        </a>
                      </p>
                    )}
                    {!project.imageAttribution && <div aria-hidden="true" className="mb-1 h-3" />}

                    {/* Category & KPI Tooltip Trigger Pill */}
                    <div className="mb-1 flex h-5 min-w-0 items-center justify-between gap-1">
                      <div className="flex min-w-0 flex-1 items-center gap-1.5">
                        <div className="min-w-0 truncate text-[10px] font-mono text-cyan-400">
                          {project.category}
                        </div>
                        {project.collaboration && (
                          <span className="shrink-0 truncate rounded border border-orange-500/30 bg-orange-950/60 px-1 py-0.5 text-[8px] font-mono text-orange-200">
                            Omdena · Volunteer
                          </span>
                        )}
                      </div>

                      {/* KPI tooltip.
                          Hover alone left this unreachable on phones and
                          tablets, where there is no pointer hover - the button
                          simply did nothing. It is now an explicit
                          open/close disclosure that also still opens on hover
                          and on keyboard focus, and closes on Escape or an
                          outside click. */}
                      <div className="relative shrink-0 group/tooltip" data-kpi-trigger>
                        <button
                          type="button"
                          onClick={() => setOpenKpiCard(openKpiCard === project.id ? null : project.id)}
                          onMouseEnter={() => setOpenKpiCard(project.id)}
                          aria-expanded={openKpiCard === project.id}
                          aria-controls={`kpi-panel-${project.id}`}
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-[9px] font-mono transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60"
                          aria-label={`${openKpiCard === project.id ? 'Hide' : 'View'} KPI metrics for ${project.title}`}
                        >
                          <Target className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                          <span>KPIs</span>
                          <Info className="w-2.5 h-2.5 opacity-70 shrink-0" />
                        </button>

                        {/* Floating Tooltip Card */}
                        <div
                          id={`kpi-panel-${project.id}`}
                          role="tooltip"
                          onMouseLeave={() => setOpenKpiCard(cur => (cur === project.id ? null : cur))}
                          className={`absolute bottom-full right-0 mb-2.5 w-72 sm:w-80 p-3.5 rounded-xl bg-[#0c1017] border border-cyan-500/40 shadow-2xl shadow-black/90 backdrop-blur-xl transition-all duration-200 z-50 ${openKpiCard === project.id ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                        >
                          
                          {/* Tooltip Header */}
                          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#ffffff12]">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span>Key Performance Indicators</span>
                            </div>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              Project comparisons
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
                                KPI comparisons
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
                                    <span>Baseline: <strong className="text-[#bbb]">{kpi.baseline}</strong></span>
                                    <span>Current: <strong className="text-cyan-300">{kpi.current}</strong></span>
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

                    {/* Title.
                       The heading itself is not clickable - a clickable <h3> is
                       invalid semantics and unreachable for keyboard/AT users.
                       The title is a button and the thumbnail is a button, both
                       pointing at the case study. */}
                    <h3 className="mb-1 h-10 min-h-10 overflow-hidden text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors tracking-tight line-clamp-2">
                      <button
                        type="button"
                        onClick={() => handleProjectClick(project.id, idx, 'problem')}
                        className="text-left hover:text-cyan-300 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 rounded-sm"
                        title={`Open the case study: ${project.title}`}
                      >
                        {project.title}
                      </button>
                    </h3>

                    {/* Short Description */}
                    <p className="mb-1.5 h-9 min-h-9 overflow-hidden text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>

                    {/* Key Outcome callout.
                       This used to carry its own hover-only tooltip labelled
                       "Hover for KPIs", which (a) did nothing on touch devices
                       and (b) duplicated the KPI panel already reachable from
                       the pill above. It is now a plain, always-visible
                       highlight - the single KPI disclosure is the pill. */}
                    <div className="mb-1.5 flex h-8 min-h-8 items-start gap-1.5 overflow-hidden border-l-2 border-cyan-500 py-0.5 pl-2">
                      <TrendingUp className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-slate-600 dark:text-slate-300 leading-tight line-clamp-2">
                          {project.keyResult}
                        </div>
                      </div>
                    </div>

                    {/* Technology Stack Chips */}
                    <div className="flex min-h-5 flex-wrap content-start items-center gap-1 overflow-hidden">
                      {project.technology.slice(0, 2).map(tech => (
                        <span
                          key={tech}
                          className={`px-2 py-0.5 rounded border text-[10px] font-mono font-medium transition-colors bg-slate-100 dark:bg-[#161616] ${getTechBadgeStyle(tech)}`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technology.length > 2 && (
                        <span className="px-1.5 py-0.5 rounded bg-[#161616] border border-[#ffffff0a] text-[9px] font-mono text-[#777]">
                          +{project.technology.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-auto px-3 pb-3">
                  <button
                    type="button"
                    onClick={() => handleProjectClick(project.id, idx, 'problem')}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-50 px-2.5 py-1.5 text-[10px] font-mono font-semibold text-cyan-800 shadow-sm transition-all hover:border-cyan-400 hover:bg-cyan-500 hover:text-black dark:bg-cyan-950/60 dark:text-cyan-300"
                    title="Read the full project case study"
                  >
                    <span>View project details</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length > 4 && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              aria-expanded={showAllProjects}
              onClick={() => setShowAllProjects((visible) => !visible)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-[#151515] hover:bg-slate-200 dark:hover:bg-[#1f1f1f] border border-slate-200 dark:border-[#ffffff15] text-xs font-mono text-slate-700 dark:text-[#d0d0d0] hover:text-slate-900 dark:hover:text-white transition-all"
            >
              <span>{showAllProjects ? 'Show featured projects' : `View all ${filteredProjects.length} matching projects`}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 transition-transform ${showAllProjects ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
