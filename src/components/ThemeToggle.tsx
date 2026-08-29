import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 p-1.5 rounded-full text-xs font-mono transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer ${
        isDark 
          ? 'bg-[#111111] hover:bg-[#1a1a1a] text-[#A3A3A3] hover:text-amber-300 border border-[#ffffff15]' 
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-cyan-700 border border-slate-300 shadow-sm'
      } ${className}`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme (accessible high-contrast)' : 'Switch to dark theme'}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -45, scale: 0.7, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 45, scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-amber-400" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-cyan-600" />
        )}
      </motion.div>

      {showLabel && (
        <span className="text-[11px] font-mono pr-1">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
