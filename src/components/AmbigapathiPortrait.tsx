import React, { useState } from 'react';
import portfolioWebp from '../data/portfolio.webp';
import portfolioPng from '../data/portfolio.png';
import { Database, BrainCircuit, Activity, Cpu, Sparkles } from 'lucide-react';

interface PortraitProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AmbigapathiPortrait: React.FC<PortraitProps> = ({
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between select-none bg-[#07090e] rounded-2xl overflow-hidden ${className}`}
    >
      {/* Top Technical Telemetry Header */}
      <div className="relative z-20 flex items-center justify-between px-3.5 py-2 bg-[#0a0f18]/90 backdrop-blur-md border-b border-[#ffffff0f]">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wider">ANALYTICS CORE</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-[#718096]">
          <span className="flex items-center gap-1 text-violet-400">
            <BrainCircuit className="w-3 h-3" />
            <span>DS/DA</span>
          </span>
          <span>•</span>
          <span className="text-emerald-400">ONLINE</span>
        </div>
      </div>

      {/* Main Image Frame with Ambient Backdrop */}
      <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#080d16] via-[#05080e] to-[#030509]">
        
        {/* Subtle Background Grid & Lens Flare */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf806_1px,transparent_1px),linear-gradient(to_bottom,#38bdf806_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        {!imageError ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <picture className="w-full h-full">
              <source srcSet="/portfolio-450.webp 450w, /portfolio.webp 900w" type="image/webp" sizes="(max-width: 640px) 360px, 450px" />
              <source srcSet={portfolioWebp} type="image/webp" />
              <img
                src={portfolioPng || '/portfolio.jpg'}
                alt="Ambigapathi V - Data Analyst & Data Scientist"
                width={450}
                height={562}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03]"
                draggable={false}
                onError={() => setImageError(true)}
              />
            </picture>
            {/* Subtle Gradient Overlay at bottom for seamless readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80 pointer-events-none" />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#121c2e] to-[#090d16] border border-cyan-400/40 flex items-center justify-center text-3xl font-bold font-mono text-cyan-300 shadow-xl shadow-cyan-950/40">
                AV
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-[#0a0f18] border border-violet-500/40 flex items-center justify-center text-violet-400">
                <BrainCircuit className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-white mb-1 tracking-tight font-mono">Ambigapathi V</h2>
            <p className="text-xs text-cyan-400 font-mono mb-2">Data Analyst & Data Scientist</p>
            <div className="flex flex-wrap gap-1 justify-center max-w-[220px]">
              {['SQL', 'Python', 'Power BI', 'Machine Learning', 'NLP'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded bg-[#101726] border border-cyan-500/20 text-[9px] font-mono text-cyan-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Technical HUD Crosshairs / Data Coordinates */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded bg-[#03060b]/85 backdrop-blur-md border border-cyan-500/30 text-[9px] font-mono text-cyan-300 pointer-events-none">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>98.2% ACCURACY</span>
        </div>

        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded bg-[#03060b]/85 backdrop-blur-md border border-violet-500/30 text-[9px] font-mono text-violet-300 pointer-events-none">
          <Database className="w-3 h-3 text-violet-400" />
          <span>50K+ RECORDS</span>
        </div>
      </div>

      {/* Bottom Identity & Technical Skills Bar */}
      <div className="relative z-20 px-3.5 py-2.5 bg-[#0a0f18]/95 backdrop-blur-md border-t border-[#ffffff0f] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white font-mono tracking-tight">Ambigapathi V</span>
          </div>
          <p className="text-[10px] text-cyan-400 font-mono leading-tight">Data Analyst & Data Scientist</p>
        </div>
        
        <div className="text-right">
          <span className="px-2 py-0.5 rounded bg-[#131d2e] border border-cyan-500/30 text-[9px] font-mono text-cyan-300 uppercase">
            Salem, TN
          </span>
        </div>
      </div>
    </div>
  );
};

