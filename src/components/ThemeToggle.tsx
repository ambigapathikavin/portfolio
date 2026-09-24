import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { playTactileClick } from '../utils/sound';
import { trackThemeToggle } from '../utils/analytics';

interface ThemeToggleProps {
  id?: string;
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  id = 'navbar-theme-toggle-btn',
  className = '', 
  showLabel = false 
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTactileClick('switch');
    const nextTheme = isDark ? 'light' : 'dark';
    trackThemeToggle(nextTheme);
    toggleTheme();
  };

  return (
    <button
      id={id}
      type="button"
      onClick={handleClick}
      className={`group relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer select-none ${
        isDark 
          ? 'bg-[#111111] hover:bg-[#181818] text-[#A3A3A3] hover:text-amber-300 border border-[#ffffff15] hover:border-amber-500/40 shadow-sm' 
          : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-cyan-700 border border-slate-300 hover:border-cyan-500/50 shadow-sm'
      } ${className}`}
      aria-label={isDark ? 'Switch to light theme mode' : 'Switch to dark theme mode'}
      title={isDark ? 'Theme: Dark (Click to switch to Light mode)' : 'Theme: Light (Click to switch to Dark mode)'}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -60, scale: 0.7, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 60, scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center shrink-0"
      >
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-cyan-600 group-hover:scale-110 transition-transform" />
        )}
      </motion.div>

      {showLabel ? (
        <span className="text-[11px] whitespace-nowrap font-medium">
          Theme: <strong className={isDark ? 'text-amber-300 font-bold' : 'text-cyan-700 font-bold'}>{isDark ? 'Dark' : 'Light'}</strong>
        </span>
      ) : (
        <span className="hidden xl:inline text-[10px] font-mono text-[#888] group-hover:text-white transition-colors">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};

