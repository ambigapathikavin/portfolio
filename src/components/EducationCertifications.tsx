import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  FileCheck,
  X,
  Copy,
  Check
} from 'lucide-react';
import { EDUCATION, CERTIFICATIONS } from '../data/portfolioData';
import { CertificationItem } from '../types';

export const EducationCertifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [copiedCertId, setCopiedCertId] = useState<string | null>(null);

  const handleCopyId = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    navigator.clipboard.writeText(id);
    setCopiedCertId(id);
    setTimeout(() => {
      setCopiedCertId(null);
    }, 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section id="certifications" className="py-16 bg-[#050505] border-t border-[#ffffff08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education */}
          <div className="lg:col-span-5 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#111111] border border-[#ffffff15] text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
                <GraduationCap className="w-3 h-3" />
                <span>ACADEMIC FOUNDATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Education
              </h2>
              <p className="text-[#A3A3A3] text-xs sm:text-sm mt-1 leading-relaxed">
                Rigorous scientific and quantitative methodologies.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="space-y-4"
            >
              {EDUCATION.map((edu, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-5 rounded-xl bg-[#111111] border border-[#ffffff08] hover:border-cyan-500/30 transition-all shadow-sm relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#181818] border border-[#ffffff0a] flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {edu.institution}
                        </h3>
                        <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                          {edu.degree}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#777] mb-3 pb-3 border-b border-[#ffffff08]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#777]" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1 text-[#777]">
                      <MapPin className="w-3 h-3 text-[#777]" />
                      {edu.location}
                    </span>
                  </div>

                  <p className="text-xs text-[#A3A3A3] leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-7 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#111111] border border-[#ffffff15] text-violet-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
                <Award className="w-3 h-3" />
                <span>PROFESSIONAL CREDENTIALS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Certifications & Project Credentials
              </h2>
              <p className="text-[#A3A3A3] text-xs sm:text-sm mt-1 leading-relaxed">
                Verified specialization in Machine Learning, NLP, and Data Science.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            >
              {CERTIFICATIONS.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-4 rounded-xl bg-[#111111] border border-[#ffffff08] hover:border-violet-500/40 transition-all flex flex-col justify-between group shadow-sm cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-lg bg-[#181818] border border-[#ffffff0a] flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                        {cert.badgeType && (
                          <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/25">
                            {cert.badgeType}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-[#777] bg-[#161616] px-2 py-0.5 rounded border border-[#ffffff08]">
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors mb-1 leading-snug">
                      {cert.title}
                    </h3>
                    
                    <div className="text-[10px] font-mono text-cyan-400 mb-2">
                      Issued by: {cert.issuer}
                    </div>

                    {cert.credentialId && (
                      <div className="mb-2.5 flex items-center justify-between px-2 py-1 rounded bg-[#0a0a0a] border border-[#ffffff08]">
                        <span className="text-[9px] font-mono text-[#888] truncate max-w-[160px]">
                          ID: <span className="text-[#D0D0D0] font-mono">{cert.credentialId}</span>
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleCopyId(cert.credentialId!, e)}
                          title="Copy Certificate ID"
                          className="text-[9px] font-mono text-cyan-400 hover:text-cyan-200 flex items-center gap-1 px-1 py-0.5 rounded hover:bg-cyan-500/10 transition-colors"
                        >
                          {copiedCertId === cert.credentialId ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    <div className="space-y-1 mb-3">
                      <div className="text-[9px] font-mono uppercase text-[#666]">
                        Competencies Verified:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cert.skillsCovered.map(sc => (
                          <span
                            key={sc}
                            className="px-1.5 py-0.5 rounded bg-[#181818] border border-[#ffffff08] text-[9px] font-mono text-[#A0A0A0]"
                          >
                            {sc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-[#ffffff08] flex items-center justify-between text-[10px] font-mono text-[#777]">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Credential</span>
                    </span>
                    
                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-200 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/25 transition-all hover:bg-cyan-500/20"
                      >
                        <span>Verify ↗</span>
                      </a>
                    ) : (
                      <FileCheck className="w-3.5 h-3.5 text-[#777]" />
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="fixed inset-0" onClick={() => setSelectedCert(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-lg p-5 sm:p-6 bg-[#0d0d0d] border border-violet-500/40 rounded-xl shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#181818] border border-violet-500/30 flex items-center justify-center text-violet-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-violet-400 uppercase tracking-wider">Credential Verification</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{selectedCert.title}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 rounded-lg bg-[#181818] text-[#888] hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-lg bg-[#111111] border border-[#ffffff08] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#C0C0C0]">
                  <span className="text-[#777]">Issuing Authority:</span>
                  <span className="text-white font-semibold">{selectedCert.issuer}</span>
                </div>
                <div className="flex justify-between text-[#C0C0C0]">
                  <span className="text-[#777]">Issue Date:</span>
                  <span className="text-white">{selectedCert.date}</span>
                </div>
                {selectedCert.credentialId && (
                  <div className="flex justify-between items-center text-[#C0C0C0] pt-1 border-t border-[#ffffff08]">
                    <span className="text-[#777]">Credential ID:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-cyan-300 font-mono font-semibold">{selectedCert.credentialId}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyId(selectedCert.credentialId!)}
                        className="text-[10px] text-[#888] hover:text-white p-1 rounded hover:bg-[#202020]"
                        title="Copy Credential ID"
                      >
                        {copiedCertId === selectedCert.credentialId ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex justify-between text-[#C0C0C0] pt-1 border-t border-[#ffffff08]">
                  <span className="text-[#777]">Credential Status:</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Valid, Authenticated & Active
                  </span>
                </div>
                {selectedCert.verificationPlatform && (
                  <div className="flex justify-between text-[#C0C0C0]">
                    <span className="text-[#777]">Registry Platform:</span>
                    <span className="text-violet-300">{selectedCert.verificationPlatform}</span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-[10px] font-mono uppercase text-[#777] mb-1.5">Verified Subject Areas & Skills:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skillsCovered.map(skill => (
                    <span key={skill} className="px-2 py-0.5 rounded bg-[#181818] border border-[#ffffff0a] text-[10px] font-mono text-cyan-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Open Verification Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-lg bg-[#181818] hover:bg-[#252525] text-white font-semibold text-xs font-mono transition-colors cursor-pointer"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
