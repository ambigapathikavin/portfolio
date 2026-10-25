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
import { trackCertificateVerify, trackEvent } from '../utils/analytics';
import { useDialogA11y } from '../hooks/useDialogA11y';

export const EducationCertifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [copiedCertId, setCopiedCertId] = useState<string | null>(null);

  // Escape / focus trap / focus restore / background scroll lock.
  const certDialogRef = useDialogA11y(selectedCert !== null, () => setSelectedCert(null));

  const handleCopyId = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    navigator.clipboard.writeText(id);
    setCopiedCertId(id);
    trackEvent('copy_credential_id', { cert_id: id });
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
    <section id="certifications" className="scroll-mt-20 sm:scroll-mt-24 py-16 bg-slate-50 dark:bg-[#050505] border-t border-slate-200 dark:border-[#ffffff08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Education */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#ffffff15] text-cyan-700 dark:text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
                <GraduationCap className="w-3 h-3" />
                <span>ACADEMIC FOUNDATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Education
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                Rigorous scientific and quantitative methodologies.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="flex-1 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:divide-white/10 dark:border-white/10 dark:bg-[#111111]"
            >
              {EDUCATION.map((edu, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-4 sm:p-5 transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.03] group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#181818] border border-[#ffffff0a] flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                          {edu.institution}
                        </h3>
                        <div className="text-sm font-medium text-cyan-800 dark:text-cyan-300 mt-1">
                          {edu.degree}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400 mb-3 pb-3 border-b border-slate-200 dark:border-white/10">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      {edu.location}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Certifications */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#ffffff15] text-violet-700 dark:text-violet-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
                <Award className="w-3 h-3" />
                <span>PROFESSIONAL CREDENTIALS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Certifications & Project Credentials
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                Verified specialization in Machine Learning, NLP, and Data Science.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="flex-1 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:divide-white/10 dark:border-white/10 dark:bg-[#111111]"
            >
              {CERTIFICATIONS.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  className="px-4 py-4 sm:px-5 sm:py-5 transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.03] group"
                  onClick={() => {
                    trackEvent('view_certificate_modal', { 
                      cert_id: cert.id, 
                      cert_title: cert.title, 
                      issuer: cert.issuer 
                    });
                    setSelectedCert(cert);
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1.5">
                        {cert.badgeType && (
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-violet-50 dark:bg-violet-500/15 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-500/30 font-semibold">
                            {cert.badgeType}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                        Issued {cert.date}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-violet-800 dark:group-hover:text-violet-200 transition-colors mb-1 leading-snug">
                      {cert.title}
                    </h3>
                    
                    <div className="text-sm text-slate-600 dark:text-slate-300 font-medium mb-2.5">
                      {cert.issuer}
                    </div>

                    {cert.credentialId && (
                      <div className="mb-3 flex items-center justify-between gap-3 px-2.5 py-1.5 rounded bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10">
                        <span className="text-xs font-mono text-slate-600 dark:text-slate-400 truncate">
                          Credential ID: <span className="text-slate-900 dark:text-white font-semibold">{cert.credentialId}</span>
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleCopyId(cert.credentialId!, e)}
                          title="Copy Certificate ID"
                          className="text-xs font-mono text-cyan-800 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-100 flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-cyan-500/10 transition-colors"
                        >
                          {copiedCertId === cert.credentialId ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">Copied</span>
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

                    <div className="space-y-1 mb-3.5">
                      <div className="text-xs font-mono uppercase text-slate-600 dark:text-slate-400">
                        Verified Skills:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cert.skillsCovered.slice(0, 3).map(sc => (
                          <span
                            key={sc}
                            className="px-2 py-1 rounded bg-slate-100 dark:bg-[#181818] border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300"
                          >
                            {sc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-violet-800 dark:hover:text-violet-200"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>View credential details</span>
                    </button>
                    
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackCertificateVerify(cert.title, cert.issuer, cert.credentialUrl);
                        }}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-800 dark:text-cyan-200 hover:text-cyan-950 dark:hover:text-white px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-100 dark:hover:bg-cyan-600 border border-cyan-300 dark:border-cyan-500/50 hover:border-cyan-500 transition-colors group/btn"
                        title="Show credential in official portal"
                      >
                        <span>Show credential</span>
                        <ExternalLink className="w-3 h-3 text-cyan-300 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
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
              ref={certDialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-modal-title"
              tabIndex={-1}
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
                    <h3 id="cert-modal-title" className="text-base font-bold text-white mt-0.5">{selectedCert.title}</h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-1 rounded-lg bg-[#181818] text-[#888] hover:text-white cursor-pointer"
                  aria-label="Close certificate details"
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
                    rel="noopener noreferrer"
                    onClick={() => trackCertificateVerify(selectedCert.title, selectedCert.issuer, selectedCert.credentialUrl)}
                    className="flex-1 py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Show credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-lg bg-[#181818] hover:bg-[#252525] text-[#ccc] hover:text-white font-semibold text-xs font-mono transition-colors cursor-pointer border border-[#ffffff15]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
