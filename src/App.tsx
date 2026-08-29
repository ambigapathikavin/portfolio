import React, { useState, useEffect } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickStats } from './components/QuickStats';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { DataJourney } from './components/DataJourney';
import { WhatIBring } from './components/WhatIBring';
import { EducationCertifications } from './components/EducationCertifications';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProjectPage } from './components/ProjectPage';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [resumeRole, setResumeRole] = useState<'DATA_ANALYST' | 'DATA_SCIENTIST'>('DATA_ANALYST');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#project-')) {
      return hash.replace('#', '');
    }
    return null;
  });

  // Sync browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project-')) {
        setActiveProjectId(hash.replace('#', ''));
      } else if (hash === '' || hash === '#home' || hash === '#projects') {
        setActiveProjectId(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenResume = (role?: 'DATA_ANALYST' | 'DATA_SCIENTIST') => {
    if (role) {
      setResumeRole(role);
    }
    setIsResumeOpen(true);
  };

  const handleSelectProject = (projectId: string) => {
    setActiveProjectId(projectId);
    window.location.hash = projectId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToOverview = () => {
    setActiveProjectId(null);
    window.location.hash = 'projects';
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollToSection = (id: string) => {
    if (activeProjectId) {
      setActiveProjectId(null);
      window.location.hash = id;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If a dedicated project page is active, display the standalone dedicated ProjectPage!
  if (activeProjectId) {
    return (
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
        <ScrollProgressBar />
        <Navbar onOpenResume={handleOpenResume} />
        
        <ProjectPage
          projectId={activeProjectId}
          onBack={handleBackToOverview}
          onSelectProject={handleSelectProject}
        />

        <Footer onOpenResume={handleOpenResume} />
        
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
          initialRole={resumeRole}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* Sticky Top Navigation */}
      <Navbar onOpenResume={handleOpenResume} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenResume={handleOpenResume}
          onOpenContact={() => scrollToSection('contact')}
          onViewWork={() => scrollToSection('projects')}
        />

        {/* Quick Quantifiable Professional Stats */}
        <QuickStats />

        {/* Executive Profile & Two Visual Specialization Tracks */}
        <About onOpenResume={handleOpenResume} />

        {/* Value Proposition Cards */}
        <WhatIBring />

        {/* Interactive 5-Category Skills Section */}
        <Skills />

        {/* Featured Projects Showcase with Dedicated Case Study Pages */}
        <ProjectsShowcase 
          onSelectProject={handleSelectProject} 
          onOpenResumeModal={handleOpenResume}
        />

        {/* Interactive 9-Stage Data & AI Lifecycle Journey */}
        <DataJourney />

        {/* Work & Engineering Experience Timeline */}
        <ExperienceTimeline />

        {/* Education & Verified Certifications */}
        <EducationCertifications />

        {/* Direct Contact & Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer with Back to Top */}
      <Footer onOpenResume={handleOpenResume} />

      {/* Interactive Comprehensive Dual Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        initialRole={resumeRole}
      />
    </div>
  );
}
