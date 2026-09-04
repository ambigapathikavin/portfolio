import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { isSoundEnabled, toggleSound } from '../utils/sound';

interface SoundToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ className = '', showLabel = false }) => {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isSoundEnabled());

    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      if (customEvent.detail) {
        setEnabled(customEvent.detail.enabled);
      }
    };

    window.addEventListener('sfx-toggle', handleToggle);
    return () => window.removeEventListener('sfx-toggle', handleToggle);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = toggleSound();
    setEnabled(newState);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={enabled ? 'Tactile sound effects: ON (Click to mute)' : 'Tactile sound effects: OFF (Click to unmute)'}
      aria-label={enabled ? 'Mute sound effects' : 'Unmute sound effects'}
      className={`relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer select-none ${
        enabled
          ? 'bg-[#111111] hover:bg-[#181818] text-cyan-300 border-[#ffffff15] hover:border-cyan-500/40 shadow-sm'
          : 'bg-[#141414] hover:bg-[#1a1a1a] text-[#777] hover:text-[#aaa] border-[#ffffff0a]'
      } ${className}`}
    >
      {enabled ? (
        <Volume2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-[#777] shrink-0" />
      )}
      
      {showLabel ? (
        <span className="text-[11px] whitespace-nowrap">
          SFX: <strong className={enabled ? 'text-cyan-300 font-bold' : 'text-[#888]'}>{enabled ? 'ON' : 'OFF'}</strong>
        </span>
      ) : (
        <span className="hidden xl:inline text-[10px] text-[#888] group-hover:text-white">
          {enabled ? 'SFX' : 'Muted'}
        </span>
      )}

      {enabled && (
        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse pointer-events-none" />
      )}
    </button>
  );
};
