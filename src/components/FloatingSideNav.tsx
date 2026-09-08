import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  User, 
  Cpu, 
  Layers, 
  Briefcase, 
  Quote, 
  Database, 
  Award, 
  Mail,
  ArrowUp,
  Compass,
  ChevronDown,
  ChevronUp,
  Minus,
  Maximize2
} from 'lucide-react';
import { playTactileClick } from '../utils/sound';

export interface FloatingSideNavProps {
  activeSection: string;
  onNavigate?: (href: string) => void;
}

export const SIDE_NAV_ITEMS = [
  { index: '01', name: 'Home', href: '#home', id: 'home', icon: Home, label: 'Hero Overview' },
  { index: '02', name: 'About', href: '#about', id: 'about', icon: User, label: 'Profile & Dual Track' },
  { index: '03', name: 'Skills', href: '#skills', id: 'skills', icon: Cpu, label: 'Tech Stack & MLOps' },
  { index: '04', name: 'Projects', href: '#projects', id: 'projects', icon: Layers, label: '19 Project Studies' },
  { index: '05', name: 'Journey', href: '#data-journey', id: 'data-journey', icon: Database, label: 'AI Lifecycle' },
  { index: '06', name: 'Experience', href: '#experience', id: 'experience', icon: Briefcase, label: 'Omdena Experience' },
  { index: '07', name: 'Feedback', href: '#testimonials', id: 'testimonials', icon: Quote, label: 'Testimonials' },
  { index: '08', name: 'Certs', href: '#certifications', id: 'certifications', icon: Award, label: 'Certifications' },
  { index: '09', name: 'Contact', href: '#contact', id: 'contact', icon: Mail, label: 'Get in Touch' },
];

export const FloatingSideNav: React.FC<FloatingSideNavProps> = ({
  activeSection,
  onNavigate
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsVisible(currentScroll > 150);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, Math.round((currentScroll / totalScroll) * 100))));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    playTactileClick('pop');
    if (onNavigate) {
      onNavigate(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollTop = () => {
    playTactileClick('pop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeIdx = SIDE_NAV_ITEMS.findIndex(i => i.id === activeSection);
  const activeItem = SIDE_NAV_ITEMS[activeIdx >= 0 ? activeIdx : 0];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="floating-navigation-dock"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center justify-center pointer-events-auto"
          aria-label="Interactive Navigation Dock"
        >
          {/* Minimized Capsule View: Zero Content Intrusion */}
          {isMinimized ? (
            <motion.div
              layoutId="navDockShell"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 dark:bg-[#070d17]/95 backdrop-blur-2xl border border-slate-200 dark:border-cyan-500/30 shadow-2xl shadow-slate-400/30 dark:shadow-cyan-950/60"
            >
              <button
                type="button"
                onClick={() => handleClick(activeItem.href)}
                className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 dark:text-white cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                title="Current Section"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span>{activeItem.index}</span>
                <span className="uppercase tracking-wider">{activeItem.name}</span>
                <span className="text-[10px] text-slate-400 dark:text-[#666]">({scrollProgress}%)</span>
              </button>

              <div className="w-px h-3.5 bg-slate-200 dark:bg-white/15 mx-0.5" />

              <button
                type="button"
                onClick={() => {
                  playTactileClick('pop');
                  setIsMinimized(false);
                }}
                className="flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-bold cursor-pointer"
                title="Expand Navigation Dock"
                aria-label="Expand Navigation Dock"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Expand</span>
              </button>

              <button
                type="button"
                onClick={handleScrollTop}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 dark:text-[#888] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Back to Top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ) : (
            /* Full Floating Bottom Island Dock: Theme Adaptive, Zero Side Overlap */
            <motion.div
              layoutId="navDockShell"
              className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-white/95 dark:bg-[#060a12]/95 backdrop-blur-2xl border border-slate-200 dark:border-cyan-500/30 shadow-2xl shadow-slate-400/25 dark:shadow-cyan-950/50 max-w-[95vw] overflow-x-auto no-scrollbar transition-colors"
            >
              {/* Active Section Telemetry Pill (Desktop) */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-xs font-mono shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  {activeItem.index} {activeItem.name}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-[#666] font-semibold">
                  {scrollProgress}%
                </span>
              </div>

              {/* Navigation Items List */}
              <nav className="flex items-center gap-0.5 sm:gap-1 shrink-0" role="navigation">
                {SIDE_NAV_ITEMS.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeSection === item.id;
                  const isHovered = hoveredItem === item.id;

                  return (
                    <div
                      key={item.id}
                      className="relative flex items-center justify-center"
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <button
                        type="button"
                        onClick={() => handleClick(item.href)}
                        className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl sm:rounded-full text-xs font-mono transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/40 ${
                          isActive
                            ? 'bg-slate-900 text-white dark:bg-cyan-500/20 dark:text-cyan-300 border border-slate-900/10 dark:border-cyan-400/50 shadow-sm shadow-slate-300 dark:shadow-cyan-950/40 font-bold'
                            : 'text-slate-500 dark:text-[#888888] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                        aria-label={`Go to ${item.name}`}
                      >
                        <IconComponent className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isActive 
                            ? 'text-cyan-400 dark:text-cyan-300 scale-110' 
                            : 'text-slate-400 dark:text-[#777] group-hover:scale-110'
                        }`} />

                        {/* Title text shown on medium screens and up for readability */}
                        <span className={`text-[11px] tracking-tight ${
                          isActive 
                            ? 'inline font-bold' 
                            : 'hidden xl:inline text-slate-600 dark:text-[#999]'
                        }`}>
                          {item.name}
                        </span>

                        {/* Active Sliding Indicator Dot */}
                        {isActive && (
                          <motion.span
                            layoutId="activeDockDot"
                            className="w-1 h-1 rounded-full bg-cyan-400 dark:bg-cyan-300 shadow-[0_0_6px_rgba(6,182,212,0.8)] shrink-0"
                          />
                        )}
                      </button>

                      {/* Animated Upward Tooltip on Hover */}
                      <AnimatePresence>
                        {isHovered && !isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.9 }}
                            transition={{ duration: 0.12 }}
                            className="absolute bottom-full mb-2 px-2.5 py-1 rounded-lg bg-slate-900/95 dark:bg-[#111]/95 backdrop-blur-md text-white border border-slate-700/50 dark:border-cyan-500/30 text-[10px] font-mono shadow-xl whitespace-nowrap pointer-events-none z-50 flex items-center gap-1.5"
                          >
                            <span className="text-cyan-400 font-bold">{item.index}</span>
                            <span>{item.name}</span>
                            <span className="text-[#888] text-[9px] hidden sm:inline">• {item.label}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-0.5 shrink-0" />

              {/* Back to Top Quick Action */}
              <button
                type="button"
                onClick={handleScrollTop}
                className="flex items-center justify-center w-7 h-7 rounded-full text-slate-400 dark:text-[#777] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer shrink-0"
                title="Back to Top"
                aria-label="Back to Top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>

              {/* Minimize Dock Button */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick('pop');
                  setIsMinimized(true);
                }}
                className="flex items-center justify-center w-7 h-7 rounded-full text-slate-400 dark:text-[#777] hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer shrink-0"
                title="Minimize Dock"
                aria-label="Minimize Dock"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
