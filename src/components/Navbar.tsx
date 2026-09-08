import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Linkedin, 
  Github, 
  Menu, 
  X, 
  Sparkles, 
  Mail, 
  ChevronRight, 
  ChevronDown,
  Compass,
  Database,
  BarChart3,
  BrainCircuit,
  Layers
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';
import { SoundToggle } from './SoundToggle';
import { FloatingSideNav } from './FloatingSideNav';

interface NavbarProps {
  onOpenResume: (role?: 'DATA_ANALYST' | 'DATA_SCIENTIST') => void;
  roleMode?: 'ALL' | 'DATA_ANALYST' | 'DATA_SCIENTIST';
  onRoleModeChange?: (mode: 'ALL' | 'DATA_ANALYST' | 'DATA_SCIENTIST') => void;
  onNavigate?: (href: string) => void;
  isProjectActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenResume,
  roleMode = 'ALL',
  onRoleModeChange,
  onNavigate,
  isProjectActive = false
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [sectionDropdownOpen, setSectionDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', label: 'Overview' },
    { name: 'About', href: '#about', label: 'Profile & Tracks' },
    { name: 'Skills', href: '#skills', label: 'Tech Stack' },
    { name: 'Projects', href: '#projects', label: '19 Projects' },
    { name: 'Experience', href: '#experience', label: 'Timeline' },
    { name: 'Testimonials', href: '#testimonials', label: 'Endorsements' },
    { name: 'Data Lifecycle', href: '#data-journey', label: 'AI Pipeline' },
    { name: 'Certifications', href: '#certifications', label: 'Verified Badges' },
    { name: 'Contact', href: '#contact', label: 'Get in Touch' },
  ];

  const getCurrentSectionMeta = () => {
    switch (activeSection) {
      case 'home': return { name: 'Home', subtitle: 'Overview' };
      case 'about': return { name: 'About', subtitle: 'Profile & Dual Tracks' };
      case 'skills': return { name: 'Skills', subtitle: 'Tech Stack & Competencies' };
      case 'projects': return { name: 'Projects', subtitle: '19 Live Case Studies' };
      case 'experience': return { name: 'Experience', subtitle: 'Omdena & Career Timeline' };
      case 'testimonials': return { name: 'Testimonials', subtitle: 'Coworker Endorsements' };
      case 'data-journey': return { name: 'Data Lifecycle', subtitle: '9-Stage AI Pipeline' };
      case 'certifications': return { name: 'Certifications', subtitle: 'Verified Credentials' };
      case 'contact': return { name: 'Contact', subtitle: 'Direct Channels' };
      default: return { name: 'Overview', subtitle: 'Data Portfolio' };
    }
  };

  useEffect(() => {
    if (isProjectActive) {
      setActiveSection('projects');
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProjectActive]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#ffffff10] shadow-md shadow-slate-200/40 dark:shadow-xl dark:shadow-black/80' 
          : 'py-4 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a 
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="group flex items-center gap-2.5 focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#111111] border border-cyan-500/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-mono font-bold text-xs tracking-wider shadow-inner group-hover:border-cyan-400 transition-colors shrink-0">
              AV
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-bold text-xs tracking-[0.15em] sm:tracking-[0.2em] text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                AMBIGAPATHI V
              </span>
              <span className="text-[9px] text-slate-500 dark:text-[#A3A3A3] font-mono tracking-wider sm:tracking-widest uppercase whitespace-nowrap">
                Data Analyst • Data Scientist
              </span>
            </div>
          </a>

          {/* Center: Dynamic Active Section Indicator with Animated HUD Pill & Quick Jump */}
          <div className="relative hidden md:flex items-center">
            <button
              type="button"
              onClick={() => setSectionDropdownOpen(!sectionDropdownOpen)}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-[#111111]/90 hover:bg-slate-200/90 dark:hover:bg-[#181818] border border-slate-300 dark:border-cyan-500/30 hover:border-cyan-400 backdrop-blur-md transition-all shadow-sm focus:outline-none cursor-pointer"
              aria-label="Current section and quick navigator"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shrink-0" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-1.5 text-xs font-mono"
                >
                  <span className="text-slate-900 dark:text-white font-bold tracking-wider uppercase">{getCurrentSectionMeta().name}</span>
                  <span className="text-slate-400 dark:text-[#555] hidden lg:inline">•</span>
                  <span className="text-cyan-600 dark:text-cyan-400/90 text-[11px] hidden lg:inline font-medium">{getCurrentSectionMeta().subtitle}</span>
                </motion.div>
              </AnimatePresence>

              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 dark:text-[#888] transition-transform duration-200 ${sectionDropdownOpen ? 'rotate-180 text-cyan-500' : 'group-hover:text-slate-900 dark:group-hover:text-white'}`} />
            </button>

            {/* Quick Section Jump Dropdown */}
            <AnimatePresence>
              {sectionDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-2 rounded-xl bg-white/98 dark:bg-[#0f0f0f]/95 backdrop-blur-xl border border-slate-200 dark:border-cyan-500/30 shadow-2xl shadow-slate-400/30 dark:shadow-black/90 z-50 flex flex-col gap-1 font-mono text-xs"
                >
                  <div className="px-2.5 py-1 text-[10px] text-slate-500 dark:text-[#666] uppercase tracking-wider border-b border-slate-100 dark:border-[#222] mb-1 flex items-center justify-between">
                    <span>Navigation</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">9 Sections</span>
                  </div>

                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <button
                        key={link.name}
                        type="button"
                        onClick={() => {
                          setSectionDropdownOpen(false);
                          handleNavClick(link.href);
                        }}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-bold border border-cyan-500/40'
                            : 'text-slate-700 dark:text-[#aaa] hover:bg-slate-100 dark:hover:bg-[#181818] hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span>{link.name}</span>
                        <span className="text-[10px] text-slate-400 dark:text-[#666]">{link.label}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Right Actions - Neatly spaced and guaranteed no cut-off */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* 1-Click Recruiter Role Customizer */}
            {onRoleModeChange && (
              <div className="flex items-center bg-slate-100 dark:bg-[#101520] p-0.5 rounded-full border border-slate-300 dark:border-cyan-500/30 shadow-inner shrink-0">
                <button
                  type="button"
                  onClick={() => onRoleModeChange('ALL')}
                  title="Full Dual Profile"
                  className={`px-2.5 py-1 text-[10px] font-mono rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    roleMode === 'ALL'
                      ? 'bg-white dark:bg-white text-black font-bold shadow-sm'
                      : 'text-slate-600 dark:text-[#888] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => onRoleModeChange('DATA_ANALYST')}
                  title="Data Analyst Mode (SQL, Power BI, DAX, Storytelling)"
                  className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    roleMode === 'DATA_ANALYST'
                      ? 'bg-cyan-500 text-black font-bold shadow-sm'
                      : 'text-cyan-700 dark:text-cyan-400/80 hover:text-cyan-600 dark:hover:text-cyan-300'
                  }`}
                >
                  <BarChart3 className="w-2.5 h-2.5 shrink-0" />
                  <span>Analyst</span>
                </button>
                <button
                  type="button"
                  onClick={() => onRoleModeChange('DATA_SCIENTIST')}
                  title="Data Scientist Mode (BERT, NLP, PyTorch, MLOps)"
                  className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    roleMode === 'DATA_SCIENTIST'
                      ? 'bg-violet-600 dark:bg-violet-500 text-white font-bold shadow-sm'
                      : 'text-violet-700 dark:text-violet-400/80 hover:text-violet-600 dark:hover:text-violet-300'
                  }`}
                >
                  <BrainCircuit className="w-2.5 h-2.5 shrink-0" />
                  <span>Scientist</span>
                </button>
              </div>
            )}

            {/* Resume CTA with Glow */}
            <button
              onClick={() => onOpenResume(roleMode === 'ALL' ? undefined : roleMode)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 border border-cyan-500/30 dark:border-cyan-500/40 hover:border-cyan-400 rounded-full transition-all shadow-sm group cursor-pointer whitespace-nowrap shrink-0"
              title="View & Download Resume"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="font-semibold">Resume</span>
            </button>

            {/* Tactile Sound FX Toggle */}
            <SoundToggle />

            {/* Theme Toggle Button (Light/Dark mode) */}
            <ThemeToggle id="navbar-theme-toggle-desktop" />

            <div className="hidden lg:flex items-center gap-1 text-[#A3A3A3] border-l border-[#ffffff10] pl-2 shrink-0">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-1.5 rounded-lg text-[#A3A3A3] hover:text-cyan-400 hover:bg-[#161616] transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-1.5 rounded-lg text-[#A3A3A3] hover:text-cyan-400 hover:bg-[#161616] transition-colors"
                title="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Mobile/Tablet Menu Toggle Button */}
          <div className="flex items-center gap-1.5 md:hidden">
            <ThemeToggle id="navbar-theme-toggle-mobile" />

            <button
              onClick={() => onOpenResume()}
              className="p-1.5 text-xs font-medium text-[#E0E0E0] bg-[#111111] border border-[#ffffff10] rounded-lg cursor-pointer"
              aria-label="View Resume"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#E0E0E0] hover:text-white bg-[#111111] border border-[#ffffff10] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden bg-[#080808]/98 backdrop-blur-xl border-b border-[#ffffff10] px-4 pt-3 pb-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-1 divide-y divide-[#ffffff08]">
              {onRoleModeChange && (
                <div className="py-2.5 px-3 bg-[#0d1420] rounded-xl border border-cyan-500/20 mb-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                    Recruiter View Mode
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => onRoleModeChange('ALL')}
                      className={`py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                        roleMode === 'ALL'
                          ? 'bg-white text-black'
                          : 'bg-[#162030] text-[#888]'
                      }`}
                    >
                      All Roles
                    </button>
                    <button
                      type="button"
                      onClick={() => onRoleModeChange('DATA_ANALYST')}
                      className={`py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1 ${
                        roleMode === 'DATA_ANALYST'
                          ? 'bg-cyan-500 text-black'
                          : 'bg-[#162030] text-cyan-300'
                      }`}
                    >
                      <BarChart3 className="w-3 h-3" />
                      <span>Analyst</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRoleModeChange('DATA_SCIENTIST')}
                      className={`py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1 ${
                        roleMode === 'DATA_SCIENTIST'
                          ? 'bg-violet-500 text-white'
                          : 'bg-[#162030] text-violet-300'
                      }`}
                    >
                      <BrainCircuit className="w-3 h-3" />
                      <span>Scientist</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="pb-3 space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                        isActive
                          ? 'bg-cyan-500/15 text-cyan-300 font-semibold border-l-2 border-cyan-400'
                          : 'text-[#A3A3A3] hover:bg-[#141414] hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#666]" />
                    </a>
                  );
                })}
              </div>

              <div className="pt-4 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-mono font-semibold rounded-full bg-[#161616] text-cyan-300 border border-cyan-500/30 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Resume</span>
                </button>

                <div className="flex items-center justify-between px-1 py-1">
                  <span className="text-[11px] font-mono text-[#888]">Appearance Mode:</span>
                  <ThemeToggle id="navbar-theme-toggle-drawer" showLabel={true} />
                </div>

                <div className="flex items-center justify-between px-1 py-1">
                  <span className="text-[11px] font-mono text-[#888]">Tactile Sound FX:</span>
                  <SoundToggle showLabel={true} />
                </div>

                <div className="flex items-center justify-center gap-3 pt-1">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-cyan-400 p-2 rounded-lg bg-[#111111] border border-[#ffffff10] flex-1 justify-center"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-cyan-400 p-2 rounded-lg bg-[#111111] border border-[#ffffff10] flex-1 justify-center"
                  >
                    <Github className="w-3.5 h-3.5 text-cyan-400" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    {/* Modern Animated Floating Side Navigation Dock */}
    <FloatingSideNav 
      activeSection={activeSection} 
      onNavigate={handleNavClick} 
    />
  </>
);
};
