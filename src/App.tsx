import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import { initGlobalTactileClicks } from './utils/sound';

// Lazy load heavy components to drastically improve LCP and initial bundle size
const ResumeModal = lazy(() => import('./components/ResumeModal').then(m => ({ default: m.ResumeModal })));
const ProjectPage = lazy(() => import('./components/ProjectPage').then(m => ({ default: m.ProjectPage })));

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [resumeRole, setResumeRole] = useState<'DATA_ANALYST' | 'DATA_SCIENTIST'>('DATA_ANALYST');
  const [roleMode, setRoleMode] = useState<'ALL' | 'DATA_ANALYST' | 'DATA_SCIENTIST'>('ALL');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#project-')) {
      return hash.replace('#', '');
    }
    return null;
  });

  // Sync browser back/forward and hash changes
  useEffect(() => {
    const cleanupSounds = initGlobalTactileClicks();

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project-')) {
        setActiveProjectId(hash.replace('#', ''));
      } else if (hash === '' || hash === '#home' || hash === '#projects') {
        setActiveProjectId(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      cleanupSounds();
    };
  }, []);

  const handleOpenResume = (role?: 'DATA_ANALYST' | 'DATA_SCIENTIST') => {
    if (role === 'DATA_ANALYST' || role === 'DATA_SCIENTIST') {
      setResumeRole(role);
    } else if (roleMode === 'DATA_ANALYST' || roleMode === 'DATA_SCIENTIST') {
      setResumeRole(roleMode);
    } else {
      setResumeRole('DATA_ANALYST');
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
        <Navbar 
          onOpenResume={handleOpenResume}
          roleMode={roleMode}
          onRoleModeChange={setRoleMode}
          onNavigate={(href) => scrollToSection(href.replace('#', ''))}
          isProjectActive={true}
        />
        
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
          </div>
        }>
          <ProjectPage
            projectId={activeProjectId}
            onBack={handleBackToOverview}
            onSelectProject={handleSelectProject}
          />
        </Suspense>

        <Footer onOpenResume={handleOpenResume} />
        
        {isResumeOpen && (
          <Suspense fallback={null}>
            <ResumeModal
              isOpen={isResumeOpen}
              onClose={() => setIsResumeOpen(false)}
              initialRole={resumeRole}
            />
          </Suspense>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* Sticky Top Navigation */}
      <Navbar 
        onOpenResume={handleOpenResume}
        roleMode={roleMode}
        onRoleModeChange={setRoleMode}
        onNavigate={(href) => scrollToSection(href.replace('#', ''))}
        isProjectActive={false}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenResume={handleOpenResume}
          onOpenContact={() => scrollToSection('contact')}
          onViewWork={() => scrollToSection('projects')}
          roleMode={roleMode}
          onRoleModeChange={setRoleMode}
        />

        {/* Quick Quantifiable Professional Stats */}
        <QuickStats />

        {/* Executive Profile & Two Visual Specialization Tracks */}
        <About onOpenResume={handleOpenResume} />

        {/* Value Proposition Cards */}
        <WhatIBring />

        {/* Interactive 5-Category Skills Section */}
        <Skills roleMode={roleMode} />

        {/* Featured Projects Showcase with Dedicated Case Study Pages */}
        <ProjectsShowcase 
          onSelectProject={handleSelectProject} 
          onOpenResumeModal={handleOpenResume}
          roleMode={roleMode}
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

      {/* Interactive Comprehensive Dual Resume Modal (Loaded on demand) */}
      {isResumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
            initialRole={resumeRole}
          />
        </Suspense>
      )}
    </div>
  );
}
