import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ProjectTab } from './types';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickStats } from './components/QuickStats';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { DataJourney } from './components/DataJourney';
import { EducationCertifications } from './components/EducationCertifications';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { initGlobalTactileClicks } from './utils/sound';
import { 
  initCookielessAnalytics,
  trackPageView, 
  trackProjectView, 
  trackResumeInteraction, 
  trackSectionScroll,
  initScrollDepthTracking,
  initSectionDwellTracking,
  trackRoleFilterChange
} from './utils/analytics';
import { PERSONAL_INFO, PROJECTS } from './data/portfolioData';

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
  // Section requested by the launcher (card button / in-page prev-next link).
  // Consumed once by ProjectPage, then reset so a manual tab click sticks.
  const [pendingTab, setPendingTab] = useState<ProjectTab | undefined>(undefined);

  useEffect(() => {
    const project = activeProjectId
      ? PROJECTS.find(item => item.id === activeProjectId)
      : undefined;
    const title = project
      ? `${project.title} | ${PERSONAL_INFO.name} Portfolio`
      : 'Ambigapathi V | Data Analyst & Data Scientist Portfolio';
    const descriptionText = project?.shortDescription
      ?? 'Ambigapathi V is a Data Analyst and Data Scientist specializing in Python, SQL, Power BI, Machine Learning, NLP and AI.';
    const description = descriptionText.length > 160
      ? `${descriptionText.slice(0, 157).trimEnd()}...`
      : descriptionText;

    document.title = title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute('content', description);
  }, [activeProjectId]);

  useEffect(() => {
    if (activeProjectId) return;
    const sectionId = window.location.hash.slice(1);
    if (!sectionId || sectionId.startsWith('project-')) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeProjectId]);

  // Initialize interaction tracking & sync browser back/forward and hash changes
  useEffect(() => {
    initCookielessAnalytics();
    const cleanupSounds = initGlobalTactileClicks();
    const cleanupScrollDepth = initScrollDepthTracking();
    const cleanupSectionDwell = initSectionDwellTracking();

    // Initial pageview
    if (activeProjectId) {
      const proj = PROJECTS.find(p => p.id === activeProjectId);
      trackProjectView(activeProjectId, proj?.title || activeProjectId, { roleTrack: proj?.roleType, category: proj?.category });
    } else {
      trackPageView('/', 'Ambigapathi V | Data Analyst & Data Scientist Portfolio');
    }

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project-')) {
        const id = hash.replace('#', '');
        setActiveProjectId(id);
        const proj = PROJECTS.find(p => p.id === id);
        trackProjectView(id, proj?.title || id, { roleTrack: proj?.roleType, category: proj?.category });
      } else if (hash === '' || hash === '#home' || hash === '#projects') {
        setActiveProjectId(null);
        setPendingTab(undefined);
        trackPageView('/#projects', 'Ambigapathi V | Projects Showcase');
        if (hash) {
          window.setTimeout(() => {
            document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        setActiveProjectId(null);
        setPendingTab(undefined);
        trackSectionScroll(hash.replace('#', ''));
        window.setTimeout(() => {
          document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      cleanupSounds();
      cleanupScrollDepth();
      cleanupSectionDwell();
    };
  }, []);

  const handleRoleModeChange = (mode: 'ALL' | 'DATA_ANALYST' | 'DATA_SCIENTIST') => {
    setRoleMode(mode);
    trackRoleFilterChange(mode, 'navbar');
  };

  const handleOpenResume = (role?: 'DATA_ANALYST' | 'DATA_SCIENTIST', triggerSource: string = 'navbar') => {
    const selected = role || (roleMode === 'DATA_ANALYST' || roleMode === 'DATA_SCIENTIST' ? roleMode : 'DATA_ANALYST');
    setResumeRole(selected);
    trackResumeInteraction(selected, 'open_modal', triggerSource);
    setIsResumeOpen(true);
  };

  // `initialTab` lets a card's "Live Simulator" / "Case Study" buttons deep-link
  // to a specific section instead of always landing on the default tab.
  const handleSelectProject = (projectId: string, initialTab?: ProjectTab) => {
    setPendingTab(initialTab);
    setActiveProjectId(projectId);
    window.location.hash = projectId;
    const proj = PROJECTS.find(p => p.id === projectId);
    if (proj) {
      trackProjectView(projectId, proj.title, { roleTrack: proj.roleType, category: proj.category });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToOverview = () => {
    setActiveProjectId(null);
    if (window.location.hash !== '#projects') {
      window.location.hash = 'projects';
    } else {
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToSection = (id: string) => {
    trackSectionScroll(id);
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
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-200 bg-white dark:bg-[#060608] text-slate-900 dark:text-[#d9d9e3]">
        <ScrollProgressBar />
        <Navbar 
          onOpenResume={handleOpenResume}
          roleMode={roleMode}
          onRoleModeChange={handleRoleModeChange}
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
            initialTab={pendingTab}
            onInitialTabConsumed={() => setPendingTab(undefined)}
            onBack={handleBackToOverview}
            onSelectProject={handleSelectProject}
          />
        </Suspense>

        <Footer 
          onOpenResume={handleOpenResume} 
        />
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
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200 bg-white dark:bg-[#060608] text-slate-900 dark:text-[#d9d9e3]">
      {/* Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* Sticky Top Navigation */}
      <Navbar 
        onOpenResume={handleOpenResume}
        roleMode={roleMode}
        onRoleModeChange={handleRoleModeChange}
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
          onRoleModeChange={handleRoleModeChange}
        />

        {/* Interactive 5-Category Skills Section */}
        <Skills roleMode={roleMode} />

        {/* Portfolio counts and project overview */}
        <QuickStats />

        {/* Show project work early so visitors can quickly assess relevant experience. */}
        <ProjectsShowcase 
          onSelectProject={handleSelectProject} 
          onOpenResumeModal={handleOpenResume}
          roleMode={roleMode}
        />

        {/* Executive Profile & Two Visual Specialization Tracks */}
        <About onOpenResume={handleOpenResume} />

        {/* Work & Engineering Experience Timeline */}
        <ExperienceTimeline />

        {/* Interactive 9-Stage Data & AI Lifecycle Journey */}
        <DataJourney />

        {/* Education & Verified Certifications */}
        <EducationCertifications />

        {/* Direct Contact & Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer with Back to Top */}
      <Footer 
        onOpenResume={handleOpenResume} 
      />
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
