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
    <section id="experience" className="py-16 bg-[#050505] border-t border-[#ffffff08] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#111111] border border-[#ffffff15] text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
            <Briefcase className="w-3 h-3" />
            <span>CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Work & Engineering Experience
          </h2>
          <p className="text-[#A3A3A3] text-xs sm:text-sm mt-1 leading-relaxed">
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
              <div className="absolute -left-5 sm:-left-8 top-3 -translate-x-1/2 w-4 h-4 rounded-full bg-[#050505] border border-cyan-400 flex items-center justify-center group-hover:scale-110 transition-all shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                {exp.isCurrent && (
                  <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
                )}
                <span className={`w-1.5 h-1.5 rounded-full ${exp.isCurrent ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
              </div>

              {/* Experience Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#111111] border border-[#ffffff0e] hover:border-cyan-500/40 transition-all shadow-sm">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3 pb-3 border-b border-[#ffffff08]">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm sm:text-base font-bold text-white tracking-wide font-mono">
                        {exp.company}
                      </span>
                      {exp.isCurrent && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[9px] font-mono font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Current Role
                        </span>
                      )}
                      {exp.project && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-medium">
                          Project: {exp.project}
                        </span>
                      )}
                    </div>
                    <div className="text-cyan-400 font-mono text-xs mt-0.5">
                      {exp.role}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end gap-0.5 text-[10px] text-[#777] font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#666]" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 text-[#666]">
                      <MapPin className="w-3 h-3 text-[#666]" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Achievements List */}
                <div className="space-y-2 mb-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#777]">
                    Key Deliverables & Quantifiable Achievements:
                  </div>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((ach, achIdx) => (
                      <li key={achIdx} className="flex items-start gap-2 text-xs text-[#C0C0C0] leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies used in this role */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#ffffff08]">
                  <span className="text-[10px] font-mono text-[#666]">Stack:</span>
                  {exp.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[#161616] border border-[#ffffff0a] text-[#A0A0A0] text-[10px] font-mono"
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
