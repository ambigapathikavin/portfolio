import React, { useState } from 'react';
import { publicAsset, publicImageSrcSet } from '../utils/assets';
import { BrainCircuit } from 'lucide-react';

// Hero LCP image. These live in /public so they can be art-directed and
// preloaded; publicAsset() keeps the paths correct on subpath deploys.
const PORTRAIT_SRCSET = publicImageSrcSet([
  { path: 'portfolio-450.webp', width: 450 },
  { path: 'portfolio.webp', width: 900 },
]);
const PORTRAIT_SIZES = '(max-width: 640px) 360px, 450px';
const PORTRAIT_FALLBACK = publicAsset('portfolio.jpg');

interface PortraitProps {
  className?: string;
}

export const AmbigapathiPortrait: React.FC<PortraitProps> = ({
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative isolate w-full h-full select-none overflow-hidden rounded-[1.4rem] bg-slate-200 dark:bg-[#111318] ${className}`}
    >
      {!imageError ? (
        <picture className="absolute inset-0 block h-full w-full">
          <source srcSet={PORTRAIT_SRCSET} type="image/webp" sizes={PORTRAIT_SIZES} />
          <img
            src={PORTRAIT_FALLBACK}
            alt="Ambigapathi V - Data Analyst & Data Scientist"
            width={450}
            height={562}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="h-full w-full scale-[1.12] object-cover object-[50%_38%] brightness-110 contrast-105 transition-transform duration-700 ease-out motion-safe:hover:scale-[1.16]"
            draggable={false}
            onError={() => setImageError(true)}
          />
        </picture>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 p-6 text-center dark:from-[#1b2432] dark:to-[#090d16]">
          <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-500/30 bg-white/80 text-2xl font-bold text-cyan-700 shadow-lg dark:bg-[#0a0f18] dark:text-cyan-300">
            AV
            <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-violet-500/30 bg-white text-violet-600 dark:bg-[#0a0f18] dark:text-violet-300">
              <BrainCircuit className="h-4 w-4" />
            </span>
          </div>
          <span className="text-sm font-semibold text-slate-800 dark:text-white">Ambigapathi V</span>
          <span className="mt-1 text-xs text-slate-600 dark:text-slate-300">Data Analyst & Data Scientist</span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent via-35% to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold tracking-tight text-white sm:text-xl">Ambigapathi V</p>
          <p className="mt-0.5 text-xs font-medium text-white/75 sm:text-sm">Data Analyst <span className="px-1 text-cyan-300">·</span> Data Scientist</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[10px] font-medium text-white/85 backdrop-blur-sm sm:text-xs">
          Salem, India
        </span>
      </div>
    </div>
  );
};
