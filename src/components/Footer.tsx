import React from 'react';
import { 
  Linkedin, 
  Github, 
  Mail, 
  FileText, 
  ArrowUp,
  Database,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { trackExternalLink } from '../utils/analytics';

interface FooterProps {
  onOpenResume: (role?: 'DATA_ANALYST' | 'DATA_SCIENTIST') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-[#ffffff08] pt-12 pb-8 relative text-[#888] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#ffffff08]">
          
          {/* Brand & Title */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded bg-[#111111] border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-[10px]">
                AV
              </div>
              <span className="font-bold text-sm text-white tracking-wider">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-[11px] text-cyan-400 font-mono">
              {PERSONAL_INFO.titles}
            </p>
            <p className="text-[10px] text-[#666] mt-0.5">
              Transforming complex data into predictive algorithms and business value.
            </p>
          </div>

          {/* Direct Navigation Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackExternalLink('LinkedIn', PERSONAL_INFO.linkedin)}
              className="flex items-center gap-1 text-[#888] hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackExternalLink('GitHub', PERSONAL_INFO.github)}
              className="flex items-center gap-1 text-[#888] hover:text-cyan-400 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onClick={() => trackExternalLink('Email', `mailto:${PERSONAL_INFO.email}`)}
              className="flex items-center gap-1 text-[#888] hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>

            <button
              onClick={() => onOpenResume('DATA_ANALYST')}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Data Analyst Resume</span>
            </button>

            <button
              onClick={() => onOpenResume('DATA_SCIENTIST')}
              className="flex items-center gap-1 text-violet-400 hover:text-violet-300 font-semibold transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Data Scientist Resume</span>
            </button>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-[#111111] hover:bg-[#181818] border border-[#ffffff0a] hover:border-cyan-500/40 text-[#A0A0A0] hover:text-cyan-300 transition-all cursor-pointer shadow-sm group"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#666] font-mono text-center sm:text-left">
          <div>
            © 2026 {PERSONAL_INFO.name}. All rights reserved.
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[#555]">
              High Density Analytics & ML Architecture.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

