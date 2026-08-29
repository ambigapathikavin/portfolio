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
  X
} from 'lucide-react';
import { EDUCATION, CERTIFICATIONS } from '../data/portfolioData';
import { CertificationItem } from '../types';

export const EducationCertifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <section id="certifications" className="py-16 bg-[#050505] border-t border-[#ffffff08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education */}
          <div className="lg:col-span-5 space-y-4">
            <div>
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
            </div>

            {EDUCATION.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-xl bg-[#111111] border border-[#ffffff08] hover:border-cyan-500/30 transition-all shadow-sm relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#181818] border border-[#ffffff0a] flex items-center justify-center text-cyan-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
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
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-7 space-y-4">
            <div>
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="p-4 rounded-xl bg-[#111111] border border-[#ffffff08] hover:border-violet-500/40 transition-all flex flex-col justify-between group shadow-sm cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-7 h-7 rounded-lg bg-[#181818] border border-[#ffffff0a] flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-mono text-[#777] bg-[#161616] px-2 py-0.5 rounded border border-[#ffffff08]">
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors mb-1 leading-snug">
                      {cert.title}
                    </h3>
                    
                    <div className="text-[10px] font-mono text-cyan-400 mb-3">
                      Issued by: {cert.issuer}
                    </div>

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

                  <div className="pt-2.5 border-t border-[#ffffff08] flex items-center justify-between text-[10px] font-mono text-[#777] group-hover:text-violet-300 transition-colors">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Verified Credential</span>
                    </span>
                    <FileCheck className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              ))}
            </div>

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
                  <span className="text-[#777]">Issuing Body:</span>
                  <span className="text-white font-semibold">{selectedCert.issuer}</span>
                </div>
                <div className="flex justify-between text-[#C0C0C0]">
                  <span className="text-[#777]">Issue Date:</span>
                  <span className="text-white">{selectedCert.date}</span>
                </div>
                <div className="flex justify-between text-[#C0C0C0]">
                  <span className="text-[#777]">Credential Status:</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Valid & Verified
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono uppercase text-[#777] mb-1.5">Verified Subject Areas:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skillsCovered.map(skill => (
                    <span key={skill} className="px-2 py-0.5 rounded bg-[#181818] border border-[#ffffff0a] text-[10px] font-mono text-cyan-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="w-full py-2 rounded-lg bg-[#181818] hover:bg-[#252525] text-white font-semibold text-xs font-mono transition-colors cursor-pointer"
              >
                Close View
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
