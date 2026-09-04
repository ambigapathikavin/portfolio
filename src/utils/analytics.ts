/**
 * Google Analytics 4 (GA4) Integration for Ambigapathi V Portfolio
 * Direct integration with Google tag (gtag.js) Measurement ID: G-N2SWWDYJVP
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-N2SWWDYJVP').trim();

/**
 * Initializes Google Analytics 4 helper hooks for React Single Page Application.
 * The primary gtag.js tag is placed directly in the <head> of index.html for instant verification.
 */
export const initGoogleAnalytics = (): void => {
  if (typeof window === 'undefined') return;

  // Ensure dataLayer & gtag are present
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  // Configure GA4 for SPA virtual routing
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    console.info(
      `%c[Google Analytics 4]%c Tag active with Measurement ID: ${GA_MEASUREMENT_ID}`,
      'color: #06b6d4; font-weight: bold;',
      'color: #10b981;'
    );
  }
};

/**
 * Tracks a virtual pageview in the Single Page Application
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

  console.debug(`[GA4 PageView] ${pagePath} - "${title}"`);
};

/**
 * Tracks custom events with parameters to Google Analytics
 */
export const trackEvent = (
  eventName: string,
  eventParams: Record<string, any> = {}
): void => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  console.debug(`[GA4 Event] ${eventName}:`, eventParams);
};

// Specialized tracking helpers for the portfolio

export const trackProjectView = (
  projectId: string,
  projectTitle: string,
  category?: string
): void => {
  trackEvent('view_project_case_study', {
    project_id: projectId,
    project_title: projectTitle,
    project_category: category,
  });
  trackPageView(`/project/${projectId}`, `${projectTitle} | Case Study`);
};

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

export const trackResumeDownload = (
  role: 'DATA_ANALYST' | 'DATA_SCIENTIST',
  actionType: 'open_modal' | 'download_pdf' | 'copy_link' = 'open_modal'
): void => {
  trackEvent('resume_interaction', {
    role_track: role,
    interaction_type: actionType,
  });
};

export const trackExternalLink = (platform: string, url: string): void => {
  trackEvent('outbound_social_click', {
    platform,
    target_url: url,
  });
};

export const trackSectionScroll = (sectionId: string): void => {
  trackEvent('section_navigation', {
    section_id: sectionId,
  });
};

