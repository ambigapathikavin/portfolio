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
  ArrowRight,
  MessageSquare,
  AlertCircle,
  Copy,
  Check,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { trackEvent, trackContactAction, trackProfileLink } from '../utils/analytics';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedBody, setCopiedBody] = useState('');
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copyError, setCopyError] = useState('');

  const handleCopyEmail = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCopyError('');
    try {
      if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      trackContactAction('copy_email');
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(false);
      setCopyError('Could not copy the email address. Select and copy it manually.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setCopyError('');

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    // Reject obviously malformed addresses before submitting to the form service.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setErrorMessage('Please enter a valid email address (e.g. name@company.com).');
      return;
    }

    setIsSubmitting(true);
    trackContactAction('submit_contact_form', {
      subject: formData.subject || 'Inquiry',
      sender_name: name,
      message_length: message.length,
    });

    try {
      const response = await fetch('https://formspree.io/f/mzeedzwo', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          _subject: formData.subject.trim() || `Portfolio enquiry from ${name}`,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      const subject = formData.subject.trim() || `Portfolio enquiry from ${name}`;
      const submittedMessage = `Subject: ${subject}\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      try {
        if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
        await navigator.clipboard.writeText(submittedMessage);
        setCopiedBody(submittedMessage);
      } catch {
        setCopiedBody('');
        setCopyError('Your message was sent, but a clipboard backup could not be created.');
      }

      setSubmitted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#06b6d4', '#38bdf8', '#8b5cf6']
        });
      } catch {
        // Keep the successful submission state if the optional animation fails.
      }
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setErrorMessage('Your message could not be sent. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 sm:scroll-mt-24 py-16 bg-white dark:bg-[#060608] border-t border-slate-200 dark:border-[#ffffff08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#111111] border border-slate-300 dark:border-[#ffffff15] text-cyan-600 dark:text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
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
            
            <div className="p-5 rounded-xl bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-[#ffffff10] space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-white tracking-wide">
                Direct Contact Channels
              </h3>

              <div className="space-y-2.5">
                {PERSONAL_INFO.googleCalendarUrl && (
                  <a
                    href={PERSONAL_INFO.googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContactAction('click_google_calendar_booking')}
                    className="group block rounded-xl bg-gradient-to-br from-cyan-700 to-blue-800 p-4 shadow-md shadow-cyan-950/20 transition-all hover:-translate-y-0.5 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0f0f0f]"
                    aria-label="Open Google Calendar and book a meeting"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white">
                          <Calendar className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-100">
                            Google Calendar
                          </span>
                          <span className="mt-0.5 block text-sm font-bold text-white">
                            Book a 30-minute intro call
                          </span>
                          <span className="mt-0.5 block text-xs text-cyan-100/90">
                            Choose a time; slots display in your local time zone.
                          </span>
                          <span className="mt-1 block text-[11px] leading-relaxed text-cyan-100/80">
                            Discuss analytics, BI dashboards, machine learning, AI, or collaboration.
                          </span>
                        </span>
                      </span>
                      <ArrowRight className="h-5 w-5 shrink-0 text-white transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>
                )}

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#ffffff08] hover:border-cyan-500/40 hover:bg-slate-100 dark:hover:bg-[#141414] transition-all group">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    onClick={() => trackContactAction('click_email_mailto', { email: PERSONAL_INFO.email })}
                    className="flex items-start gap-3 overflow-hidden flex-1 mr-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#ffffff0a] flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-mono text-[#777]">Email Address</div>
                      <div className="text-xs font-semibold text-[#E0E0E0] group-hover:text-cyan-300 transition-colors truncate">
                        {PERSONAL_INFO.email}
                      </div>
                    </div>
                  </a>
                  
                  <div className="relative">
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
                    {copiedEmail && (
                      <div className="absolute right-0 -top-8 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50 text-[10px] font-mono text-emerald-300 shadow-lg pointer-events-none whitespace-nowrap animate-bounce">
                        Copied to clipboard!
                      </div>
                    )}
                  </div>
                </div>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  onClick={() => trackContactAction('click_phone_call', { phone: PERSONAL_INFO.phone })}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#ffffff08] hover:border-cyan-500/40 hover:bg-slate-100 dark:hover:bg-[#141414] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#ffffff0a] flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
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
                    onClick={() => trackProfileLink('LinkedIn', PERSONAL_INFO.linkedin, 'contact')}
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#181818] hover:bg-[#252525] text-xs font-semibold text-[#E0E0E0] border border-[#ffffff0a] hover:border-cyan-500/40 transition-all font-mono"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackProfileLink('GitHub', PERSONAL_INFO.github, 'contact')}
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#181818] hover:bg-[#252525] text-xs font-semibold text-[#E0E0E0] border border-[#ffffff0a] hover:border-cyan-500/40 transition-all font-mono"
                  >
                    <Github className="w-3.5 h-3.5 text-cyan-400" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-6 rounded-xl bg-[#111111] border border-[#ffffff08] shadow-sm">
              
              <h3 className="text-base font-bold text-white mb-0.5">
                Send a Direct Message
              </h3>
              <p className="text-[11px] text-[#777] mb-4">
                Send your message directly through the secure contact form. I’ll follow up by email.
              </p>
              <p className="text-[10px] text-[#777] mb-4">
                Messages are processed by Formspree for delivery. Please don’t include sensitive information.
              </p>

              {copyError && (
                <p role="status" className="mb-3 text-xs text-amber-700 dark:text-amber-300">
{copyError}
                </p>
              )}

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
                  <h4 className="text-base font-bold text-white">Message sent successfully</h4>
                  <p className="text-xs text-[#A3A3A3] max-w-md mx-auto leading-relaxed">
                    Your message has been delivered. I’ll get back to you at the email address you provided.
                  </p>

                  {copiedBody && (
                    <p className="text-xs text-[#A3A3A3] max-w-md mx-auto leading-relaxed">
                      A copy is already on your clipboard as a backup, in case you closed the window.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold cursor-pointer"
                    >
                      Email Me Directly
                    </a>
                    {copiedBody && (
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(copiedBody);
                            setCopiedMessage(true);
                            setTimeout(() => setCopiedMessage(false), 2500);
                          } catch {
                            setErrorMessage('Could not access the clipboard. Please select the text manually.');
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#181818] text-xs font-mono text-cyan-300 hover:bg-[#252525] cursor-pointer"
                      >
                        {copiedMessage ? 'Copied!' : 'Copy Message Again'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setCopiedBody('');
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#181818] text-xs font-mono text-[#A3A3A3] hover:bg-[#252525] cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="contact-name" className="block text-[10px] font-mono text-[#777] mb-1">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Johnson"
                        className="w-full bg-[#0a0a0a] border border-[#ffffff0a] focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-[#555] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-[10px] font-mono text-[#777] mb-1">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full bg-[#0a0a0a] border border-[#ffffff0a] focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-[#555] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-[10px] font-mono text-[#777] mb-1">
                      Subject / Role Title
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Data Scientist Role / Machine Learning Consultation"
                      className="w-full bg-[#0a0a0a] border border-[#ffffff0a] focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-[#555] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[10px] font-mono text-[#777] mb-1">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
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
