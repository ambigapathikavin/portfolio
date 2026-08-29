import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Newspaper, 
  Database, 
  Target, 
  Zap, 
  TrendingUp, 
  Clock 
} from 'lucide-react';
import { QUICK_STATS } from '../data/portfolioData';

export const QuickStats: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Map icon strings to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Newspaper':
        return <Newspaper className="w-5 h-5 text-cyan-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-sky-400" />;
      case 'Target':
        return <Target className="w-5 h-5 text-emerald-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-violet-400" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-indigo-400" />;
      default:
        return <Target className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section ref={ref} className="py-8 bg-[#050505] border-y border-[#ffffff10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle section label */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#888] uppercase">
              Quantifiable Impact Metrics
            </span>
          </div>
          <span className="text-[10px] text-[#666] font-mono hidden sm:inline-block uppercase tracking-wider">
            Production NLP • Power BI • Pipeline Engineering
          </span>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {QUICK_STATS.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group p-3 rounded-xl bg-[#111111] hover:bg-[#161616] border border-[#ffffff08] hover:border-cyan-500/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-[#181818] border border-[#ffffff0a] group-hover:border-cyan-500/30 transition-colors">
                  {getIcon(stat.icon)}
                </div>
                <span className="text-[9px] font-mono text-[#555] group-hover:text-cyan-400/80 transition-colors">
                  0{idx + 1}
                </span>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                </div>
                <div className="text-[11px] font-semibold text-[#E0E0E0] mt-0.5 leading-snug">
                  {stat.label}
                </div>
                <p className="text-[10px] text-[#777] mt-0.5 line-clamp-2 leading-relaxed">
                  {stat.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
