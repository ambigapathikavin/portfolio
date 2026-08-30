import React from 'react';
import portfolioImage from '../data/portfolio.png';

interface PortraitProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AmbigapathiPortrait: React.FC<PortraitProps> = ({
  className = '',
  size = 'md',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      <img
        src={portfolioImage}
        alt="Ambigapathi V"
        className="w-full h-full object-cover rounded-xl"
        draggable={false}
      />

      {/* Verified Data Scientist Overlay Pill */}
      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a0a0a]/95 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300 shadow-xl whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-white">Ambigapathi V</span>
        <span className="text-[#666]">|</span>
        <span className="text-cyan-400">Salem, TN</span>
      </div>
    </div>
  );
};
