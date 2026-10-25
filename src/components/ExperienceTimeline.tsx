import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  GitCommit, 
  ArrowUpRight, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="scroll-mt-20 sm:scroll-mt-24 py-16 bg-slate-50 dark:bg-[#050505] border-t border-slate-200 dark:border-[#ffffff08] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#ffffff15] text-cyan-700 dark:text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
            <Briefcase className="w-3 h-3" />
            <span>CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Work & Engineering Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
            Proven track record of deploying transformer NLP models and delivering high-value business intelligence.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-5 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-cyan-400/60 before:via-violet-500/40 before:to-emerald-400/20">
          
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="relative group"
            >
              
              {/* Timeline Node Bullet */}
              <div               className="absolute -left-5 sm:-left-8 top-3 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-50 dark:bg-[#050505] border border-cyan-500 dark:border-cyan-400 flex items-center justify-center group-hover:scale-110 transition-all">
                {exp.isCurrent && (
                  <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
                )}
                <span className={`w-1.5 h-1.5 rounded-full ${exp.isCurrent ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
              </div>

              {/* Experience Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 transition-colors shadow-sm">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-white/10">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-bold text-slate-900 dark:text-white tracking-wide font-mono">
                        {exp.company}
                      </span>
                      {exp.isCurrent && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[9px] font-mono font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Current Role
                        </span>
                      )}
                      {exp.project && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-medium">
                          Project: {exp.project}
                        </span>
                      )}
                    </div>
                    <div className="text-cyan-800 dark:text-cyan-300 font-mono text-sm mt-1">
                      {exp.role}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end gap-1 text-xs text-slate-600 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Achievements List */}
                <div className="space-y-2.5 mb-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Key project contributions
                  </div>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((ach, achIdx) => (
                      <li key={achIdx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies used in this role */}
                <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-200 dark:border-white/10">
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400">Tools:</span>
                  {exp.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-[#161616] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};
