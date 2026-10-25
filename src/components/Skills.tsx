import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  LayoutDashboard, 
  Code2, 
  Cpu, 
  Server, 
  Search, 
  Sparkles, 
  Check, 
  Tag,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface SkillsProps {
  roleMode?: 'ALL' | 'DATA_ANALYST' | 'DATA_SCIENTIST';
}

export const Skills: React.FC<SkillsProps> = ({ roleMode = 'ALL' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'LineChart':
        return <LineChart className="w-5 h-5 text-cyan-400" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-5 h-5 text-sky-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-violet-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-amber-400" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  // Re-order categories dynamically based on roleMode
  const orderedBaseCategories = [...SKILL_CATEGORIES].sort((a, b) => {
    if (roleMode === 'DATA_ANALYST') {
      const analystIds = ['data-analytics', 'business-intelligence', 'python-data'];
      const aIdx = analystIds.indexOf(a.id);
      const bIdx = analystIds.indexOf(b.id);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
    } else if (roleMode === 'DATA_SCIENTIST') {
      const scientistIds = ['ml-ai', 'python-data', 'backend-deployment', 'data-analytics'];
      const aIdx = scientistIds.indexOf(a.id);
      const bIdx = scientistIds.indexOf(b.id);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
    }
    return 0;
  });

  const filteredCategories = orderedBaseCategories.map(category => {
    let filteredSkills = category.skills;
    if (searchQuery.trim() !== '') {
      filteredSkills = filteredSkills.filter(skill => 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return {
      ...category,
      skills: filteredSkills
    };
  }).filter(category => {
    if (activeCategory !== 'all' && category.id !== activeCategory) {
      return false;
    }
    return category.skills.length > 0;
  });

  return (
    <section id="skills" className="scroll-mt-20 sm:scroll-mt-24 py-16 bg-[#050505] border-t border-[#ffffff08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#111111] border border-slate-300 dark:border-[#ffffff15] text-cyan-700 dark:text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
              <Cpu className="w-3 h-3" />
              <span>TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Skills & Technology Matrix
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-xl leading-relaxed">
              Categorized toolsets across Data Analytics, Business Intelligence, Python Data Ecosystem, Machine Learning, and MLOps.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills (BERT, SQL, DAX)..."
              className="w-full bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#ffffff10] focus:border-cyan-500 pl-8 pr-3 py-2 rounded-lg text-sm font-mono text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'bg-white dark:bg-[#111111] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-[#ffffff0a]'
            }`}
          >
            All Categories ({SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0)})
          </button>
          {SKILL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-white dark:bg-[#111111] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-[#ffffff0a]'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#111318] md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: (idx % 3) * 0.05 
              }}
              className="flex min-h-full flex-col justify-between border-b border-slate-200 p-4 transition-colors hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/[0.03] group last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-start justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-[#181818] border border-slate-200 dark:border-[#ffffff0a] group-hover:border-cyan-500/30 transition-colors">
                      {getCategoryIcon(category.icon)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide uppercase font-mono">
                        {category.title}
                      </h3>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                        {category.skills.length} core competencies
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                  {category.subtitle}
                </p>

                {/* Skills Interactive Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => {
                    const isSelected = selectedSkill === skill.name;
                    return (
                      <div
                        key={skill.name}
                        onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                        className={`group/skill relative px-2.5 py-1 rounded border text-[10px] font-mono transition-all duration-150 cursor-pointer select-none hover:scale-105 active:scale-95 ${
                          isSelected
                            ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-900 dark:text-cyan-200 border-cyan-500 shadow-sm'
                            : 'bg-slate-100 dark:bg-[#161616] hover:bg-slate-200 dark:hover:bg-[#1f1f1f] text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border-slate-300 dark:border-[#ffffff0a] hover:border-slate-400 dark:hover:border-[#ffffff15]'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>{skill.name}</span>
                          {skill.tags && skill.tags.length > 0 && (
                            <span className="text-[10px] text-slate-600 dark:text-slate-400 group-hover/skill:text-cyan-700 dark:group-hover/skill:text-cyan-400 transition-colors">
                              •
                            </span>
                          )}
                        </div>
                        
                        {/* Sub-tags preview tooltip on active/hover */}
                        {skill.tags && skill.tags.length > 0 && (
                          <div className="hidden group-hover/skill:flex absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 rounded bg-white dark:bg-[#050505] border border-cyan-500/40 text-[10px] text-cyan-800 dark:text-cyan-300 font-mono whitespace-nowrap z-30 shadow-xl pointer-events-none">
                            {skill.tags.join(' | ')}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Note */}
              <div className="pt-3 mt-3 border-t border-slate-200 dark:border-[#ffffff08] flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-cyan-400" />
                  <span>Production Tested</span>
                </span>
                <span>Verified</span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-[#111111] rounded-xl border border-dashed border-slate-300 dark:border-[#ffffff10]">
            <p className="text-slate-700 dark:text-slate-300 text-sm font-mono">No skills found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-2 text-sm font-mono text-cyan-800 dark:text-cyan-300 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
