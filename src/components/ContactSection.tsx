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
    <section id="contact" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-14 bg-white dark:bg-[#080808] border-t border-slate-200 dark:border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#111111] border border-slate-300 dark:border-[#ffffff15] text-cyan-600 dark:text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
            <Mail className="w-3 h-3" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Let’s talk about your project.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
            For project inquiries, opportunities, or collaboration, feel free to get in touch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-5 rounded-xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Contact details
              </h3>

              <div className="space-y-2.5">
                {PERSONAL_INFO.googleCalendarUrl && (
                  <a
                    href={PERSONAL_INFO.googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContactAction('click_google_calendar_booking')}
                    className="group block rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-cyan-300 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-[#17191c] dark:hover:border-cyan-800 dark:hover:bg-[#1b2226] dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-[#111111]"
                    aria-label="Open Google Calendar and book a meeting"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-200 bg-white text-cyan-800 dark:border-white/10 dark:bg-[#202428] dark:text-cyan-300">
                          <Calendar className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-medium text-cyan-800 dark:text-cyan-300">
                            Book a meeting
                          </span>
                          <span className="mt-0.5 block text-sm font-semibold text-slate-900 dark:text-white">
                            Schedule a 30-minute call
                          </span>
                          <span className="mt-1 block text-xs text-slate-600 dark:text-slate-300">
                            Available times are shown in your local time zone.
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                            Talk about a project, opportunity, or collaboration.
                          </span>
                        </span>
                      </span>
                      <ArrowRight className="h-5 w-5 shrink-0 text-cyan-700 transition-transform group-hover:translate-x-1 dark:text-cyan-300" />
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
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Email</div>
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors truncate">
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
                          : 'bg-slate-100 hover:bg-cyan-50 text-cyan-800 hover:text-cyan-900 border border-slate-200 hover:border-cyan-300 dark:bg-[#181818] dark:hover:bg-cyan-500/20 dark:text-cyan-300 dark:hover:text-cyan-200 dark:border-white/10 dark:hover:border-cyan-500/40'
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
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Phone</div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                      +91 {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#181818] border border-slate-200 dark:border-white/10 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Location</div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-2">
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                  Profiles
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackProfileLink('LinkedIn', PERSONAL_INFO.linkedin, 'contact')}
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-50 hover:bg-cyan-50 dark:bg-[#181818] dark:hover:bg-[#252525] text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackProfileLink('GitHub', PERSONAL_INFO.github, 'contact')}
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-50 hover:bg-cyan-50 dark:bg-[#181818] dark:hover:bg-[#252525] text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all"
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
            <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 shadow-sm">
              
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-0.5">
                Send a message
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
                I’ll follow up by email.
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">
                Don’t include sensitive information.
              </p>

              {copyError && (
                <p role="status" className="mb-3 text-xs text-amber-700 dark:text-amber-300">
{copyError}
                </p>
              )}

              {errorMessage && (
                <div className="mb-3 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/30 text-xs text-red-800 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-red-700 dark:text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Message sent</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your message has been delivered. I’ll reply to the email address you provided.
                  </p>

                  {copiedBody && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      A backup copy is on your clipboard.
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
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-xs font-medium text-cyan-800 dark:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-[#252525] cursor-pointer"
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
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#252525] cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="contact-name" className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
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
                        className="w-full bg-white dark:bg-[#0a0a0a] border border-slate-300 dark:border-white/10 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
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
                        className="w-full bg-white dark:bg-[#0a0a0a] border border-slate-300 dark:border-white/10 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="What would you like to discuss?"
                      className="w-full bg-white dark:bg-[#0a0a0a] border border-slate-300 dark:border-white/10 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message..."
                      className="w-full bg-white dark:bg-[#0a0a0a] border border-slate-300 dark:border-white/10 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-lg bg-cyan-700 hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
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
