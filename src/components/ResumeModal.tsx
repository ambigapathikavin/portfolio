import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code2, 
  FileText,
  BarChart3,
  BrainCircuit,
  Sparkles
} from 'lucide-react';
import { DATA_ANALYST_RESUME, DATA_SCIENTIST_RESUME, PERSONAL_INFO } from '../data/portfolioData';
import { downloadResumePdf } from '../utils/resumePdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'DATA_ANALYST' | 'DATA_SCIENTIST';
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ 
  isOpen, 
  onClose,
  initialRole = 'DATA_ANALYST'
}) => {
  const [selectedRole, setSelectedRole] = useState<'DATA_ANALYST' | 'DATA_SCIENTIST'>(
    initialRole === 'DATA_SCIENTIST' ? 'DATA_SCIENTIST' : 'DATA_ANALYST'
  );
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedRole(initialRole === 'DATA_SCIENTIST' ? 'DATA_SCIENTIST' : 'DATA_ANALYST');
    }
  }, [isOpen, initialRole]);

  if (!isOpen) return null;

  const currentResume = selectedRole === 'DATA_ANALYST' ? DATA_ANALYST_RESUME : DATA_SCIENTIST_RESUME;

  const handlePrint = () => {
    window.print();
  };

  const generateResumeText = () => {
    if (selectedRole === 'DATA_ANALYST') {
      const r = DATA_ANALYST_RESUME;
      return `
${r.name}
Role: ${r.role}
Location: ${r.location} | Phone: ${r.phone} | Email: ${r.email}

==================================================
PROFESSIONAL SUMMARY
==================================================
${r.summary}

==================================================
TECHNICAL SKILLS
==================================================
${r.technicalSkills.map(t => `${t.category}: ${t.skills}`).join('\n')}

==================================================
PROJECTS
==================================================
${r.projects.map(p => `
${p.title} (${p.tech}) - ${p.date}
${p.bullets.map(b => `• ${b}`).join('\n')}
`).join('\n')}

==================================================
LEADERSHIP & OPEN SOURCE CONTRIBUTIONS
==================================================
${r.leadership.map(l => `
${l.role} - ${l.organization} (${l.period})
Location: ${l.location}
${l.bullets.map(b => `• ${b}`).join('\n')}
`).join('\n')}

==================================================
EDUCATION
==================================================
${r.education.map(e => `${e.institution} - ${e.degree} (${e.period}), ${e.location}`).join('\n')}

==================================================
CERTIFICATIONS
==================================================
${r.certifications.map(c => `• ${c.title} - ${c.issuer} (${c.date})`).join('\n')}
      `.trim();
    } else {
      const r = DATA_SCIENTIST_RESUME;
      return `
${r.name}
Role: ${r.role} / Machine Learning Engineer
Location: ${r.location} | Phone: ${r.phone} | Email: ${r.email}

==================================================
PROFESSIONAL SUMMARY
==================================================
${r.summary}

==================================================
KEY COURSEWORK
==================================================
${r.coursework.join(', ')}

==================================================
EXPERIENCE
==================================================
${r.experience.map(e => `
${e.company} - ${e.role} (${e.period}) | ${e.location}
${e.projects ? e.projects.map(p => `
  [Project: ${p.name}]
  ${p.bullets.map(b => `  • ${b}`).join('\n')}
`).join('\n') : ''}
${e.bullets ? e.bullets.map(b => `• ${b}`).join('\n') : ''}
`).join('\n')}

==================================================
TECHNICAL SKILLS
==================================================
${r.technicalSkills.map(t => `${t.category}: ${t.skills}`).join('\n')}

==================================================
LEADERSHIP
==================================================
${r.leadership.map(l => `• ${l}`).join('\n')}

==================================================
EDUCATION
==================================================
${r.education.map(e => `${e.institution} - ${e.degree} (${e.period}), ${e.location}`).join('\n')}
      `.trim();
    }
  };

  const handleCopyText = () => {
    const text = generateResumeText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = generateResumeText();
    const roleSlug = selectedRole === 'DATA_ANALYST' ? 'Data_Analyst' : 'Data_Scientist';
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ambigapathi_V_${roleSlug}_Resume.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0d0d0d] border border-[#ffffff15] rounded-xl shadow-2xl z-10 my-auto overflow-hidden text-[#E0E0E0]"
        >
          
          {/* Header Action Bar */}
          <div className="p-3.5 sm:p-4 bg-[#111111] border-b border-[#ffffff0a] flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
            
            {/* Dual Resume Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#080808] border border-[#ffffff10] rounded-lg">
              <button
                onClick={() => setSelectedRole('DATA_ANALYST')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
                  selectedRole === 'DATA_ANALYST'
                    ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold shadow-sm'
                    : 'text-[#888] hover:text-[#bbb] hover:bg-[#151515]'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Data Analyst Resume</span>
              </button>

              <button
                onClick={() => setSelectedRole('DATA_SCIENTIST')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
                  selectedRole === 'DATA_SCIENTIST'
                    ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300 font-semibold shadow-sm'
                    : 'text-[#888] hover:text-[#bbb] hover:bg-[#151515]'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Data Scientist Resume</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyText}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#181818] hover:bg-[#252525] text-[11px] font-mono text-[#C0C0C0] transition-colors cursor-pointer"
                title="Copy Active Resume as Text"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#888]" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                onClick={() => downloadResumePdf(selectedRole)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono font-bold text-black transition-all shadow-md cursor-pointer active:scale-95 ${
                  selectedRole === 'DATA_ANALYST' 
                    ? 'bg-cyan-400 hover:bg-cyan-300 shadow-cyan-500/20' 
                    : 'bg-violet-400 hover:bg-violet-300 shadow-violet-500/20'
                }`}
                title={`Download ${selectedRole === 'DATA_ANALYST' ? 'Data Analyst' : 'Data Scientist'} Resume as PDF`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Active PDF ({selectedRole === 'DATA_ANALYST' ? 'DA' : 'DS'})</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded bg-[#181818] text-[#888] hover:text-white ml-0.5 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Prominent Download Hub: Two Distinct Downloadable Files */}
          <div className="p-3 sm:p-4 bg-[#0a0e17] border-b border-[#ffffff0f] grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Visual Indicator 1: Data Analyst File */}
            <div 
              onClick={() => setSelectedRole('DATA_ANALYST')}
              className={`p-3 rounded-lg border transition-all cursor-pointer relative flex flex-col justify-between gap-2.5 ${
                selectedRole === 'DATA_ANALYST'
                  ? 'bg-cyan-950/35 border-cyan-400/60 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                  : 'bg-[#0f1420] border-[#ffffff0f] hover:border-cyan-500/40 hover:bg-[#131b2b]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 shadow-sm">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-xs text-white">Data Analyst Resume</span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        OFFICIAL PDF
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8899ac] font-mono mt-0.5">
                      SQL • Tableau • Python • EDA & BI
                    </p>
                  </div>
                </div>
                {selectedRole === 'DATA_ANALYST' ? (
                  <span className="text-[9px] font-mono font-semibold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-500/50 shrink-0 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Previewing
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-[#888] bg-[#1a2333] px-1.5 py-0.5 rounded border border-[#ffffff0f] shrink-0">
                    Click to View
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-[#ffffff0a] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[10px] text-[#8899ac] font-mono truncate">
                  <FileText className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">Ambigapathi_Data_Analyst.pdf</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadResumePdf('DATA_ANALYST');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                  title="Download Ambigapathi_Data_Analyst.pdf"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            {/* Visual Indicator 2: Data Scientist File */}
            <div 
              onClick={() => setSelectedRole('DATA_SCIENTIST')}
              className={`p-3 rounded-lg border transition-all cursor-pointer relative flex flex-col justify-between gap-2.5 ${
                selectedRole === 'DATA_SCIENTIST'
                  ? 'bg-violet-950/35 border-violet-400/60 shadow-md shadow-violet-950/40 ring-1 ring-violet-500/30'
                  : 'bg-[#151122] border-[#ffffff0f] hover:border-violet-500/40 hover:bg-[#1d172f]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-400/40 flex items-center justify-center text-violet-300 shrink-0 shadow-sm">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-xs text-white">Data Scientist Resume</span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/40">
                        OFFICIAL PDF
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8899ac] font-mono mt-0.5">
                      BERT NLP • Scikit-Learn • MLOps
                    </p>
                  </div>
                </div>
                {selectedRole === 'DATA_SCIENTIST' ? (
                  <span className="text-[9px] font-mono font-semibold text-violet-300 bg-violet-950 px-2 py-0.5 rounded-full border border-violet-500/50 shrink-0 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    Previewing
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-[#888] bg-[#221c33] px-1.5 py-0.5 rounded border border-[#ffffff0f] shrink-0">
                    Click to View
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-[#ffffff0a] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[10px] text-[#8899ac] font-mono truncate">
                  <FileText className="w-3 h-3 text-violet-400 shrink-0" />
                  <span className="truncate">Ambigapathi_Data_Scientist.pdf</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadResumePdf('DATA_SCIENTIST');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-400 hover:bg-violet-300 text-black text-xs font-mono font-bold transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                  title="Download Ambigapathi_Data_Scientist.pdf"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

          </div>

          {/* Role Indicator Banner */}
          <div className={`px-5 py-2 border-b flex items-center justify-between text-xs font-mono ${
            selectedRole === 'DATA_ANALYST'
              ? 'bg-cyan-950/20 border-cyan-500/20 text-cyan-300'
              : 'bg-violet-950/20 border-violet-500/20 text-violet-300'
          }`}>
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Showing tailored <strong>{selectedRole === 'DATA_ANALYST' ? 'Data Analyst' : 'Data Scientist & ML Engineer'}</strong> Resume
            </span>
            <span className="text-[10px] text-[#888] hidden sm:inline">
              Downloadable as a clean, formatted PDF
            </span>
          </div>

          {/* Printable / Renderable Resume Document Container */}
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6 bg-[#0a0a0a] font-sans text-xs">
            
            {/* Header / Contact Info */}
            <div className="border-b border-[#ffffff08] pb-4 text-center space-y-1.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {currentResume.name}
              </h1>
              <div className={`text-xs font-mono font-semibold ${
                selectedRole === 'DATA_ANALYST' ? 'text-cyan-400' : 'text-violet-400'
              }`}>
                {selectedRole === 'DATA_ANALYST' ? 'Data Analyst' : 'Machine Learning Engineer & Data Scientist'}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-[#777] font-mono pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#777]" />
                  {currentResume.location}
                </span>
                <a 
                  href={`mailto:${currentResume.email}`}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Mail className="w-3 h-3 text-[#777]" />
                  {currentResume.email}
                </a>
                <a 
                  href={`tel:${currentResume.phone}`}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Phone className="w-3 h-3 text-[#777]" />
                  {currentResume.phone}
                </a>
                {currentResume.linkedin && (
                  <a 
                    href={currentResume.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>LinkedIn</span>
                  </a>
                )}
                <a 
                  href={PERSONAL_INFO.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-1.5">
              <h2 className={`text-[10px] font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 border-b border-[#ffffff08] pb-1 ${
                selectedRole === 'DATA_ANALYST' ? 'text-cyan-400' : 'text-violet-400'
              }`}>
                <Briefcase className="w-3 h-3" />
                <span>Professional Summary</span>
              </h2>
              <p className="text-[#C0C0C0] leading-relaxed text-xs">
                {currentResume.summary}
              </p>
            </div>

            {/* Key Coursework (if DS) */}
            {selectedRole === 'DATA_SCIENTIST' && 'coursework' in DATA_SCIENTIST_RESUME && (
              <div className="space-y-1.5">
                <h2 className="text-[10px] font-mono uppercase tracking-wider text-violet-400 font-bold flex items-center gap-1.5 border-b border-[#ffffff08] pb-1">
                  <GraduationCap className="w-3 h-3" />
                  <span>Key Coursework</span>
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {DATA_SCIENTIST_RESUME.coursework.map((course, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-[#161616] border border-[#ffffff10] text-[#B0B0B0] text-[11px] font-mono">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Skills */}
            <div className="space-y-2">
              <h2 className={`text-[10px] font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 border-b border-[#ffffff08] pb-1 ${
                selectedRole === 'DATA_ANALYST' ? 'text-cyan-400' : 'text-violet-400'
              }`}>
                <Code2 className="w-3 h-3" />
                <span>Technical Skills</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentResume.technicalSkills.map((cat, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#111111] border border-[#ffffff08]">
                    <div className="font-mono font-bold text-white text-[11px] mb-0.5">{cat.category}:</div>
                    <div className="text-[#A3A3A3] text-[11px]">
                      {cat.skills}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Work / Project Experience */}
            {selectedRole === 'DATA_SCIENTIST' ? (
              <div className="space-y-3">
                <h2 className="text-[10px] font-mono uppercase tracking-wider text-violet-400 font-bold flex items-center gap-1.5 border-b border-[#ffffff08] pb-1">
                  <Briefcase className="w-3 h-3" />
                  <span>Experience</span>
                </h2>
                <div className="space-y-4">
                  {DATA_SCIENTIST_RESUME.experience.map((exp, eIdx) => (
                    <div key={eIdx} className="space-y-2 p-3 rounded-lg bg-[#111111] border border-[#ffffff08]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white text-xs">{exp.role}</span>
                          <span className="text-violet-400 font-medium"> — {exp.company}</span>
                        </div>
                        <div className="text-[#777] font-mono text-[10px]">
                          {exp.period} | {exp.location}
                        </div>
                      </div>

                      {exp.projects && exp.projects.map((proj, pIdx) => (
                        <div key={pIdx} className="space-y-1 pt-1 border-t border-[#ffffff05]">
                          <div className="font-mono text-[11px] font-semibold text-cyan-300">
                            Project: {proj.name}
                          </div>
                          <ul className="list-disc list-inside space-y-1 text-[#A3A3A3] text-[11px] pl-1">
                            {proj.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="leading-relaxed">
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {exp.bullets && (
                        <ul className="list-disc list-inside space-y-1 text-[#A3A3A3] text-[11px] pl-1">
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="leading-relaxed">
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h2 className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5 border-b border-[#ffffff08] pb-1">
                  <Award className="w-3 h-3" />
                  <span>Projects</span>
                </h2>
                <div className="space-y-3">
                  {DATA_ANALYST_RESUME.projects.map((proj, idx) => (
                    <div key={idx} className="space-y-1.5 p-3 rounded-lg bg-[#111111] border border-[#ffffff08]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                        <span className="font-bold text-white text-xs">{proj.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400 font-mono text-[10px]">{proj.tech}</span>
                          <span className="text-[#666] font-mono text-[10px]">| {proj.date}</span>
                        </div>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-[#A3A3A3] text-[11px] pl-1">
                        {proj.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leadership & Contributions */}
            <div className="space-y-2">
              <h2 className={`text-[10px] font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 border-b border-[#ffffff08] pb-1 ${
                selectedRole === 'DATA_ANALYST' ? 'text-cyan-400' : 'text-violet-400'
              }`}>
                <Award className="w-3 h-3" />
                <span>Leadership & Open Source</span>
              </h2>
              {selectedRole === 'DATA_ANALYST' ? (
                <div className="space-y-2">
                  {DATA_ANALYST_RESUME.leadership.map((l, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[#111111] border border-[#ffffff08] space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-white">{l.role} — <span className="text-cyan-400">{l.organization}</span></span>
                        <span className="text-[#777] font-mono text-[10px]">{l.period} | {l.location}</span>
                      </div>
                      <ul className="list-disc list-inside text-[#A3A3A3] text-[11px] space-y-0.5 pl-1">
                        {l.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-[#111111] border border-[#ffffff08]">
                  <ul className="list-disc list-inside text-[#A3A3A3] text-[11px] space-y-1 pl-1">
                    {DATA_SCIENTIST_RESUME.leadership.map((l, idx) => (
                      <li key={idx}>{l}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <h2 className={`text-[10px] font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 border-b border-[#ffffff08] pb-1 ${
                  selectedRole === 'DATA_ANALYST' ? 'text-cyan-400' : 'text-violet-400'
                }`}>
                  <GraduationCap className="w-3 h-3" />
                  <span>Education</span>
                </h2>
                {currentResume.education.map((ed, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-[#111111] border border-[#ffffff08] text-xs space-y-0.5">
                    <div className="font-bold text-white text-xs">{ed.institution}</div>
                    <div className="text-[#C0C0C0] text-[11px]">{ed.degree}</div>
                    <div className="text-[#777] font-mono text-[10px]">{ed.period} | {ed.location}</div>
                  </div>
                ))}
              </div>

              {selectedRole === 'DATA_ANALYST' && 'certifications' in DATA_ANALYST_RESUME && (
                <div className="space-y-1.5">
                  <h2 className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5 border-b border-[#ffffff08] pb-1">
                    <Award className="w-3 h-3" />
                    <span>Certifications</span>
                  </h2>
                  <div className="space-y-1.5">
                    {DATA_ANALYST_RESUME.certifications.map((cert, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[#111111] border border-[#ffffff08] text-xs space-y-0.5">
                        <div className="font-bold text-white text-xs">{cert.title}</div>
                        <div className="text-[#777] font-mono text-[10px]">{cert.issuer} • {cert.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
