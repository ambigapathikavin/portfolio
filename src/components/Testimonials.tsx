import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Quote, 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  Award,
  Sparkles,
  Users
} from 'lucide-react';
import { TESTIMONIALS, PERSONAL_INFO } from '../data/portfolioData';

export const Testimonials: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'OMDENA' | 'NLP'>('ALL');

  const filteredTestimonials = TESTIMONIALS.filter(item => {
    if (activeFilter === 'OMDENA') {
      return item.badge.toLowerCase().includes('omdena') || item.project.toLowerCase().includes('omdena');
    }
    if (activeFilter === 'NLP') {
      return item.quote.toLowerCase().includes('nlp') || item.quote.toLowerCase().includes('llm') || item.quote.toLowerCase().includes('news');
    }
    return true;
  });

  return (
    <section id="testimonials" className="py-20 bg-[#050505] border-t border-[#ffffff08] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-3 shadow-sm">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>COWORKER RECOMMENDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Endorsements & Testimonials
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8e8e93] leading-relaxed">
            Real feedback from data scientists, machine learning engineers, and AI product leads who collaborated with Ambigapathi on high-impact AI challenges.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              type="button"
              onClick={() => setActiveFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeFilter === 'ALL'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                  : 'bg-[#111] text-[#888] border border-[#222] hover:text-white hover:border-[#333]'
              }`}
            >
              All Recommendations ({TESTIMONIALS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('OMDENA')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeFilter === 'OMDENA'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                  : 'bg-[#111] text-[#888] border border-[#222] hover:text-white hover:border-[#333]'
              }`}
            >
              Omdena AI Collaborators
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('NLP')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeFilter === 'NLP'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                  : 'bg-[#111] text-[#888] border border-[#222] hover:text-white hover:border-[#333]'
              }`}
            >
              NLP & LLM Projects
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTestimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#0d0d0d] border border-[#222222] hover:border-cyan-500/40 hover:bg-[#111111] transition-all duration-300 shadow-lg hover:shadow-cyan-950/20"
            >
              {/* Header with Project Badge and Rating */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono">
                    <Award className="w-3 h-3 text-cyan-400" />
                    <span>{item.badge}</span>
                  </span>

                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-0.5 text-amber-400" aria-label={`${item.rating} out of 5 stars`}>
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Collaboration Context Tag */}
                <div className="text-[11px] font-mono text-[#777] mb-3.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#999]" />
                  <span>Project: <strong className="text-[#ccc] font-medium">{item.project}</strong></span>
                </div>

                {/* Quote Text */}
                <div className="relative mb-6">
                  <Quote className="w-6 h-6 text-cyan-500/20 absolute -top-1 -left-1 -z-0" />
                  <p className="relative z-10 text-sm sm:text-[15px] text-[#d4d4d8] leading-relaxed italic pl-3 border-l-2 border-cyan-500/30">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-[#1e1e1e] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  {/* Avatar or Fallback Initials */}
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-600/30 to-violet-600/30 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-sm tracking-wider shadow-inner overflow-hidden flex-shrink-0">
                    {item.avatarUrl ? (
                      <img 
                        src={item.avatarUrl} 
                        alt={item.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to initials on broken image
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      item.name.split(' ').map(n => n[0]).join('').slice(0, 2)
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.name}
                      </h3>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    </div>
                    <p className="text-xs text-[#8e8e93] leading-tight mt-0.5">
                      {item.title}
                    </p>
                  </div>
                </div>

                <a 
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#161616] text-[#888] hover:text-cyan-400 hover:bg-[#202020] transition-colors flex-shrink-0"
                  title="Verify on LinkedIn"
                  aria-label={`Verify recommendation for ${item.name} on LinkedIn`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Omdena Verification Banner */}
        <div className="mt-12 p-4 sm:p-5 rounded-xl bg-[#0d0d0d] border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                Collaborative Impact Across Global AI Teams
              </h4>
              <p className="text-xs text-[#8e8e93] mt-0.5">
                All projects verified through Omdena Local Chapter challenges with international cross-functional teams.
              </p>
            </div>
          </div>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-colors flex-shrink-0"
          >
            <span>View LinkedIn Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
