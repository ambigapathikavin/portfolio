import React from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  Cpu, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { WHAT_I_BRING } from '../data/portfolioData';

export const WhatIBring: React.FC = () => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'Brain':
        return <Brain className="w-6 h-6 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-violet-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-emerald-400" />;
      default:
        return <Layers className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section className="py-16 bg-[#050505] border-t border-[#ffffff08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#111111] border border-[#ffffff15] text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
            <Sparkles className="w-3 h-3" />
            <span>VALUE PROPOSITION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What I Bring to Your Organization
          </h2>
          <p className="text-[#A3A3A3] text-xs sm:text-sm mt-1.5 leading-relaxed">
            A balanced synthesis of analytical precision, machine learning development, and business-focused KPI impact.
          </p>
        </div>

        {/* 3 Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WHAT_I_BRING.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-6 rounded-xl bg-[#111111] border border-[#ffffff08] hover:border-cyan-500/40 transition-all duration-200 flex flex-col justify-between shadow-md relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-2.5 rounded-xl bg-[#181818] border border-[#ffffff0a] group-hover:border-cyan-500/40 transition-colors">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-3xl font-mono font-extrabold text-[#333] group-hover:text-cyan-400/40 transition-colors">
                    {item.number}
                  </span>
                </div>

                <h3 className="text-sm font-bold font-mono tracking-wide text-white mb-2 uppercase">
                  {item.title}
                </h3>

                <p className="text-xs text-[#E0E0E0] font-semibold leading-snug mb-3">
                  "{item.headline}"
                </p>

                <p className="text-xs text-[#888] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-[#ffffff08] flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Immediate Project Readiness</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
