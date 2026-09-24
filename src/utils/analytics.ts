/**
 * Google Analytics 4 (GA4) Advanced Tracking Architecture
 * Measurement ID: G-N2SWWDYJVP
 * 
 * Provides granular event tracking for visitor actions:
 * - Profile links (LinkedIn, GitHub, Email, Phone, Calendly, Meet)
 * - Resume interactions (modal view, PDF download, plain text copy, print, role switch)
 * - Project exploration (card clicks, deep case study tabs, dwell time, GitHub & Live demos)
 * - Interactive ML/BI simulators (disease selection, Grad-CAM toggle, parameter adjustment)
 * - Skill & Certification evaluations (searches, category filters, verification links, copy ID)
 * - Navigation & UX behaviors (track filters, scroll depth milestones, theme & sound toggles)
 * - High-intent recruiter conversion signals
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-N2SWWDYJVP').trim();

// Session state memory for dwell time and scroll milestones
let sessionStartTime = Date.now();
const triggeredScrollMilestones = new Set<number>();
const activeSectionTimers: Record<string, number> = {};
let highIntentFired = false;
let projectsOpenedInSession = 0;
let resumeInteractedInSession = false;

/**
 * Initializes Google Analytics 4
 */
export const initGoogleAnalytics = (): void => {
  if (typeof window === 'undefined') return;

  sessionStartTime = Date.now();
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: false, // Managed virtually via trackPageView
    });

    console.info(
      `%c[GA4 Active]%c Tracking ID: ${GA_MEASUREMENT_ID} (Granular Telemetry Loaded)`,
      'color: #06b6d4; font-weight: bold;',
      'color: #10b981;'
    );
  }
};

/**
 * Core event tracking function with debug output and error isolation
 */
export const trackEvent = (
  eventName: string,
  eventParams: Record<string, any> = {}
): void => {
  if (typeof window === 'undefined') return;

  const enrichedParams = {
    ...eventParams,
    timestamp: new Date().toISOString(),
    viewport_width: window.innerWidth,
    session_elapsed_sec: Math.round((Date.now() - sessionStartTime) / 1000),
  };

  if (window.gtag) {
    try {
      window.gtag('event', eventName, enrichedParams);
    } catch (err) {
      console.warn(`[GA4 Error] Failed to send ${eventName}:`, err);
    }
  }

  // Developer console logger for instant verification
  console.debug(`%c[GA4 Track]%c ${eventName}`, 'color: #38bdf8; font-weight: bold;', 'color: #e2e8f0;', enrichedParams);

  // Check for recruiter high-intent conversion
  checkRecruiterIntentSignal();
};

/**
 * Tracks virtual SPA Page Views
 */
export const trackPageView = (pagePath: string, pageTitle?: string): void => {
  if (typeof window === 'undefined') return;

  const title = pageTitle || document.title;

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: title,
      page_location: window.location.href,
    });
  }

  console.debug(`[GA4 PageView] ${pagePath} — "${title}"`);
};

// ============================================================================
// 1. RECRUITER & PROFILE LINK TRACKING (LinkedIn, GitHub, Email, Phone, Calendly)
// ============================================================================

export type OutboundPlatform = 
  | 'LinkedIn'
  | 'GitHub'
  | 'Email'
  | 'Phone'
  | 'Calendly'
  | 'GoogleMeet'
  | 'Streamlit'
  | 'TableauPublic'
  | 'PowerBI'
  | 'Coursera'
  | 'HackerRank'
  | 'CredentialPortal'
  | 'External';

export const trackProfileLink = (
  platform: OutboundPlatform | string,
  url: string,
  location: 'hero' | 'navbar' | 'contact' | 'footer' | 'card' | 'modal' | 'cert' | 'header' = 'contact'
): void => {
  trackEvent('profile_outbound_click', {
    platform,
    target_url: url,
    click_location: location,
  });
};

export const trackExternalLink = (platform: string, url: string): void => {
  trackProfileLink(platform, url, 'card');
};

// ============================================================================
// 2. RESUME / CV INTERACTIONS (High Conversion Value)
// ============================================================================

export type ResumeAction = 
  | 'open_modal'
  | 'download_pdf'
  | 'download_txt'
  | 'copy_text'
  | 'print'
  | 'preview_tab'
  | 'close_modal';

export const trackResumeInteraction = (
  role: 'DATA_ANALYST' | 'DATA_SCIENTIST',
  actionType: ResumeAction,
  location: string = 'hero',
  details?: Record<string, any>
): void => {
  resumeInteractedInSession = true;

  trackEvent('resume_interaction', {
    resume_role: role,
    interaction_action: actionType,
    trigger_location: location,
    ...details,
  });
};

export const trackResumeDownload = (
  role: 'DATA_ANALYST' | 'DATA_SCIENTIST',
  actionType: 'open_modal' | 'download_pdf' | 'copy_link' = 'open_modal'
): void => {
  trackResumeInteraction(role, actionType as ResumeAction, 'direct_button');
};

// ============================================================================
// 3. PROJECT SHOWCASE, CARDS & SEARCH
// ============================================================================

export const trackProjectCardClick = (
  projectId: string,
  projectTitle: string,
  roleTrack?: string,
  category?: string,
  cardPosition?: number
): void => {
  projectsOpenedInSession += 1;

  trackEvent('select_project_card', {
    project_id: projectId,
    project_title: projectTitle,
    role_track: roleTrack,
    category,
    card_grid_index: cardPosition,
  });
};

export const trackProjectView = (
  projectId: string,
  projectTitle: string,
  roleTrack?: string,
  category?: string
): void => {
  projectsOpenedInSession += 1;

  trackEvent('view_project_case_study', {
    project_id: projectId,
    project_title: projectTitle,
    role_track: roleTrack,
    project_category: category,
  });
  trackPageView(`/project/${projectId}`, `${projectTitle} | Case Study`);
};

export const trackProjectDwellTime = (
  projectId: string,
  projectTitle: string,
  dwellTimeSeconds: number
): void => {
  trackEvent('project_case_study_dwell', {
    project_id: projectId,
    project_title: projectTitle,
    dwell_time_sec: dwellTimeSeconds,
    read_in_depth: dwellTimeSeconds >= 45,
  });
};

export const trackProjectTabSwitch = (
  projectId: string,
  tabId: string,
  tabLabel?: string
): void => {
  trackEvent('switch_project_tab', {
    project_id: projectId,
    tab_id: tabId,
    tab_label: tabLabel || tabId,
  });
};

export const trackProjectSearch = (
  query: string,
  resultsCount: number,
  context: 'projects' | 'skills' = 'projects'
): void => {
  if (!query || query.trim().length === 0) return;

  trackEvent('search_query', {
    search_context: context,
    query_text: query.trim().toLowerCase(),
    results_found: resultsCount,
  });
};

export const trackRoleFilterChange = (
  newRole: 'ALL' | 'DATA_ANALYST' | 'DATA_SCIENTIST',
  source: 'navbar' | 'showcase' = 'showcase'
): void => {
  trackEvent('filter_role_track', {
    selected_role: newRole,
    trigger_source: source,
  });
};

export const trackCategoryFilterChange = (
  category: string,
  resultsCount?: number
): void => {
  trackEvent('filter_project_category', {
    category_name: category,
    projects_count: resultsCount,
  });
};

// ============================================================================
// 4. INTERACTIVE SIMULATORS & MODEL INFERENCE
// ============================================================================

export const trackSimulatorAction = (
  projectId: string,
  dashboardType: string,
  action: string,
  meta?: Record<string, any>
): void => {
  trackEvent('interact_simulator', {
    project_id: projectId,
    dashboard_type: dashboardType,
    simulator_action: action,
    ...meta,
  });
};

// ============================================================================
// 5. SKILLS & CERTIFICATIONS EXPLORATION
// ============================================================================

export const trackSkillCategorySwitch = (category: string): void => {
  trackEvent('switch_skill_category', {
    category_id: category,
  });
};

export const trackSkillPillClick = (skillName: string, categoryId?: string): void => {
  trackEvent('click_skill_pill', {
    skill_name: skillName,
    skill_category: categoryId,
  });
};

export const trackCertificateAction = (
  certTitle: string,
  issuer: string,
  action: 'view_modal' | 'verify_external' | 'copy_credential_id',
  credentialId?: string
): void => {
  trackEvent('certificate_interaction', {
    cert_title: certTitle,
    cert_issuer: issuer,
    action_type: action,
    credential_id: credentialId,
  });
};

export const trackCertificateVerify = (
  certTitle: string,
  issuer: string,
  credentialUrl?: string
): void => {
  trackEvent('certificate_verify_click', {
    cert_title: certTitle,
    cert_issuer: issuer,
    credential_url: credentialUrl,
  });
};

// ============================================================================
// 6. CONTACT FORM & DIRECT CHANNELS
// ============================================================================

export const trackContactAction = (
  actionType: 
    | 'copy_email'
    | 'copy_phone'
    | 'copy_calendly_link'
    | 'click_calendly_booking'
    | 'click_google_meet'
    | 'click_phone_call'
    | 'click_email_mailto'
    | 'submit_contact_form',
  meta?: Record<string, any>
): void => {
  trackEvent('contact_channel_action', {
    action_type: actionType,
    ...meta,
  });
};

// ============================================================================
// 7. UX, THEME & SYSTEM PREFERENCES
// ============================================================================

export const trackThemeToggle = (newTheme: 'dark' | 'light'): void => {
  trackEvent('toggle_theme_mode', {
    new_theme: newTheme,
  });
};

export const trackSoundToggle = (soundEnabled: boolean): void => {
  trackEvent('toggle_sound_effects', {
    sound_enabled: soundEnabled,
  });
};

export const trackSectionScroll = (sectionId: string): void => {
  trackEvent('section_navigation', {
    section_id: sectionId,
  });
};

// ============================================================================
// 8. AUTOMATIC SCROLL MILESTONES & SECTION TIME MONITOR
// ============================================================================

/**
 * Initializes automatic scroll depth milestone tracking (25%, 50%, 75%, 90%, 100%)
 */
export const initScrollDepthTracking = (): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;

    const currentPercent = Math.min(100, Math.round((scrollY / totalHeight) * 100));

    const milestones = [25, 50, 75, 90, 100];
    for (const milestone of milestones) {
      if (currentPercent >= milestone && !triggeredScrollMilestones.has(milestone)) {
        triggeredScrollMilestones.add(milestone);
        trackEvent('scroll_depth_milestone', {
          percent_scrolled: milestone,
          page_path: window.location.pathname + window.location.hash,
        });
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};

/**
 * Initializes IntersectionObserver to track which portfolio sections visitors spend time reading
 */
export const initSectionDwellTracking = (): (() => void) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return () => {};

  const sectionIds = [
    'home',
    'about',
    'skills',
    'projects',
    'data-journey',
    'experience',
    'testimonials',
    'certifications',
    'contact',
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (!id) return;

        if (entry.isIntersecting) {
          activeSectionTimers[id] = Date.now();
          trackEvent('section_enter_viewport', { section_id: id });
        } else if (activeSectionTimers[id]) {
          const dwellSeconds = Math.round((Date.now() - activeSectionTimers[id]) / 1000);
          delete activeSectionTimers[id];

          if (dwellSeconds >= 3) {
            trackEvent('section_dwell_time', {
              section_id: id,
              dwell_seconds: dwellSeconds,
            });
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
};

// ============================================================================
// 9. HIGH-INTENT RECRUITER CONVERSION SIGNAL
// ============================================================================

function checkRecruiterIntentSignal() {
  if (highIntentFired) return;

  const sessionDuration = (Date.now() - sessionStartTime) / 1000;

  // High intent condition:
  // Either: (Downloaded resume OR interacted with contact) AND (Spent > 45s OR opened 2+ projects)
  const isHighIntent = 
    (resumeInteractedInSession && sessionDuration > 30) ||
    (projectsOpenedInSession >= 2 && sessionDuration > 60) ||
    (sessionDuration > 120 && projectsOpenedInSession >= 1);

  if (isHighIntent) {
    highIntentFired = true;
    trackEvent('high_intent_recruiter_detected', {
      session_duration_sec: Math.round(sessionDuration),
      projects_opened_count: projectsOpenedInSession,
      resume_interacted: resumeInteractedInSession,
      conversion_quality: resumeInteractedInSession ? 'exceptional' : 'high',
    });
  }
}
