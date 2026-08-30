import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ArrowRight,
  MessageSquare,
  AlertCircle,
  Copy,
  Check,
  Calendar,
  Video,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedScheduleLink, setCopiedScheduleLink] = useState(false);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2500);
  };

  const handleCopyScheduleLink = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigator.clipboard.writeText(PERSONAL_INFO.scheduleCallUrl);
    setCopiedScheduleLink(true);
    setTimeout(() => {
      setCopiedScheduleLink(false);
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending message + trigger mailto link fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#06b6d4', '#38bdf8', '#8b5cf6']
        });
      } catch (err) {
        // Safe fallback
      }

      // Prepopulate email client
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Hi Ambigapathi,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      // Try opening mail client in new window/tab safely
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section id="contact" className="py-16 bg-[#050505] border-t border-[#ffffff08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#111111] border border-[#ffffff15] text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
            <Mail className="w-3 h-3" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Let's turn data into something meaningful.
          </h2>
          <p className="text-[#A3A3A3] text-xs sm:text-sm mt-1 leading-relaxed">
            Whether you're looking for a data analyst, data scientist or machine learning professional, I'd be happy to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-5 rounded-xl bg-[#111111] border border-[#ffffff08] space-y-4">
              <h3 className="text-sm font-bold text-white tracking-wide">
                Direct Contact Channels
              </h3>

              <div className="space-y-2.5">
                {/* Schedule a Call / Interview Feature Box */}
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1624] via-[#09101a] to-[#060a12] border border-cyan-500/30 hover:border-cyan-400/60 transition-all shadow-md group">
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 group-hover:scale-105 transition-transform">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Schedule an Intro Call</span>
                        </div>
                        <div className="text-xs font-bold text-white font-mono">
                          15 / 30 Min Discussion
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyScheduleLink}
                      title="Copy Calendly booking link"
                      className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono transition-all shrink-0 cursor-pointer ${
                        copiedScheduleLink
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-[#141e2e] hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {copiedScheduleLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedScheduleLink ? 'Copied' : 'Copy Link'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-[#A0AEC0] mb-3 leading-relaxed">
                    Pick a convenient time directly on my calendar for project discovery, technical interviews, or recruitment calls.
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={PERSONAL_INFO.scheduleCallUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono transition-all shadow-sm group/btn"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book on Calendly</span>
                      <ExternalLink className="w-3 h-3 opacity-70 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>

                    <a
                      href={PERSONAL_INFO.googleMeetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#141e2e] hover:bg-[#1c2a3f] text-cyan-300 hover:text-white border border-cyan-500/30 text-xs font-semibold font-mono transition-all"
                    >
                      <Video className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Google Meet</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a] border border-[#ffffff08] hover:border-cyan-500/40 hover:bg-[#141414] transition-all group">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-start gap-3 overflow-hidden flex-1 mr-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#181818] border border-[#ffffff0a] flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-mono text-[#777]">Email Address</div>
                      <div className="text-xs font-semibold text-[#E0E0E0] group-hover:text-cyan-300 transition-colors truncate">
                        {PERSONAL_INFO.email}
                      </div>
                    </div>
                  </a>
                  
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono transition-all shrink-0 cursor-pointer shadow-sm active:scale-95 ${
                      copiedEmail
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-[#181818] hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 border border-[#ffffff10] hover:border-cyan-500/40'
                    }`}
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#0a0a0a] border border-[#ffffff08] hover:border-cyan-500/40 hover:bg-[#141414] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#181818] border border-[#ffffff0a] flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#777]">Phone Number</div>
                    <div className="text-xs font-semibold text-[#E0E0E0] group-hover:text-cyan-300 transition-colors">
                      +91 {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#0a0a0a] border border-[#ffffff08]">
                  <div className="w-8 h-8 rounded-lg bg-[#181818] border border-[#ffffff0a] flex items-center justify-center text-emerald-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#777]">Current Location</div>
                    <div className="text-xs font-semibold text-[#E0E0E0]">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-3 border-t border-[#ffffff08] space-y-2">
                <div className="text-[10px] font-mono text-[#777] uppercase">
                  Professional Networks:
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[110px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#181818] hover:bg-[#252525] text-xs font-semibold text-[#E0E0E0] border border-[#ffffff0a] hover:border-cyan-500/40 transition-all font-mono"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.resumeAppUrl || 'https://linked-to-my-resume.lovable.app/'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#181818] hover:bg-violet-950/40 text-xs font-semibold text-[#E0E0E0] border border-[#ffffff0a] hover:border-violet-500/40 transition-all font-mono"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span>Online Resume</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[90px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#181818] hover:bg-[#252525] text-xs font-semibold text-[#E0E0E0] border border-[#ffffff0a] hover:border-cyan-500/40 transition-all font-mono"
                  >
                    <Github className="w-3.5 h-3.5 text-cyan-400" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Recruiter Note */}
            <div className="p-3.5 rounded-xl bg-[#0a1512] border border-cyan-500/20 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-xs text-[#A0A0A0] leading-relaxed">
                Available for full-time, contract, and remote roles in Data Analytics, Machine Learning Engineering, and Data Science.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-6 rounded-xl bg-[#111111] border border-[#ffffff08] shadow-sm">
              
              <h3 className="text-base font-bold text-white mb-0.5">
                Send a Direct Message
              </h3>
              <p className="text-[11px] text-[#777] mb-4">
                Fill out the form below to initiate discussion on a project or role.
              </p>

              {errorMessage && (
                <div className="mb-3 p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Thank You for Reaching Out!</h4>
                  <p className="text-xs text-[#A3A3A3] max-w-md mx-auto leading-relaxed">
                    Your message has been initiated. If your default email client opened, please press send. You can also email directly at <strong className="text-cyan-400">{PERSONAL_INFO.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-[#181818] text-xs font-mono text-cyan-300 hover:bg-[#252525] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-[#777] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Johnson"
                        className="w-full bg-[#0a0a0a] border border-[#ffffff0a] focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-[#555] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#777] mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full bg-[#0a0a0a] border border-[#ffffff0a] focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-[#555] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#777] mb-1">
                      Subject / Role Title
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Data Scientist Role / Machine Learning Consultation"
                      className="w-full bg-[#0a0a0a] border border-[#ffffff0a] focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-[#555] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#777] mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your dataset, business opportunity, or open role..."
                      className="w-full bg-[#0a0a0a] border border-[#ffffff0a] focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-[#555] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Processing...' : 'Send Message'}</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Floating Success Toast Notification for Email Copy */}
      <AnimatePresence>
        {copiedEmail && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0d131a]/95 border border-cyan-500/50 shadow-2xl backdrop-blur-md"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                <span>Email Copied to Clipboard</span>
                <span className="text-[10px] text-emerald-400">✓</span>
              </div>
              <div className="text-[11px] text-cyan-300 font-mono">
                {PERSONAL_INFO.email}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
