import React, { useState } from 'react';
import { publicAsset } from '../utils/assets';
import { BrainCircuit } from 'lucide-react';

const PORTRAIT_IMAGE = publicAsset('portfolio-profile-high-quality.webp');

interface PortraitProps {
  className?: string;
}

export const AmbigapathiPortrait: React.FC<PortraitProps> = ({
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative isolate w-full h-full select-none overflow-hidden rounded-[1.5rem_4.4rem_1.5rem_1.5rem] bg-slate-200 dark:bg-[#111318] ${className}`}
    >
      {!imageError ? (
        <img
          src={PORTRAIT_IMAGE}
          alt="Ambigapathi V - Data Analyst & Data Scientist"
          width={922}
          height={768}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out motion-safe:hover:scale-[1.04]"
          draggable={false}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 p-6 text-center dark:from-[#1b2432] dark:to-[#090d16]">
          <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-500/30 bg-white/80 text-2xl font-bold text-cyan-700 shadow-lg dark:bg-[#0a0f18] dark:text-cyan-300">
            AV
            <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-violet-500/30 bg-white text-violet-600 dark:bg-[#0a0f18] dark:text-violet-300">
              <BrainCircuit className="h-4 w-4" />
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
