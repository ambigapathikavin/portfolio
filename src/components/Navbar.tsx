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
  Database,
  BarChart3,
  BrainCircuit,
  Layers
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';

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

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Data Lifecycle', href: '#data-journey' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-[#050505]/95 backdrop-blur-md border-b border-[#ffffff10] shadow-xl shadow-black/80' 
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
            <div className="w-8 h-8 rounded-lg bg-[#111111] border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs tracking-wider shadow-inner group-hover:border-cyan-400 transition-colors shrink-0">
              AV
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-bold text-xs tracking-[0.15em] sm:tracking-[0.2em] text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                AMBIGAPATHI V
              </span>
              <span className="text-[9px] text-[#A3A3A3] font-mono tracking-wider sm:tracking-widest uppercase whitespace-nowrap">
                Data Analyst • ML Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-[#111111] p-1 rounded-full border border-[#ffffff10] backdrop-blur-md shrink-0">
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
                  className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-[#A3A3A3] hover:text-white hover:bg-[#1c1c1c]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* 1-Click Recruiter Role Customizer */}
            {onRoleModeChange && (
              <div className="flex items-center bg-[#101520] p-0.5 rounded-full border border-cyan-500/30 shadow-inner shrink-0">
                <button
                  type="button"
                  onClick={() => onRoleModeChange('ALL')}
                  title="Full Dual Profile"
                  className={`px-2.5 py-1 text-[10px] font-mono rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    roleMode === 'ALL'
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-[#888] hover:text-white'
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
                      : 'text-cyan-400/80 hover:text-cyan-300'
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
                      ? 'bg-violet-500 text-white font-bold shadow-sm'
                      : 'text-violet-400/80 hover:text-violet-300'
                  }`}
                >
                  <BrainCircuit className="w-2.5 h-2.5 shrink-0" />
                  <span>Scientist</span>
                </button>
              </div>
            )}

            <button
              onClick={() => onOpenResume(roleMode === 'ALL' ? undefined : roleMode)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#E0E0E0] bg-[#111111] hover:bg-[#1a1a1a] border border-[#ffffff10] hover:border-cyan-500/40 rounded-full transition-all shadow-sm group cursor-pointer whitespace-nowrap shrink-0"
              title="View & Download Resume"
            >
              <FileText className="w-3 h-3 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>Resume</span>
            </button>

            {/* Theme Toggle Button (Light/Dark mode) */}
            <ThemeToggle />

            <div className="hidden 2xl:flex items-center gap-1 text-[#A3A3A3] border-l border-[#ffffff10] pl-2.5 shrink-0">
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
          <div className="flex items-center gap-1.5 xl:hidden">
            <ThemeToggle />

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
  );
};
