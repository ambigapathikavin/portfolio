import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollDistance = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (windowHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      
      const currentPercent = (scrollTop / windowHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, currentPercent)));
    };

    window.addEventListener('scroll', calculateScrollDistance, { passive: true });
    window.addEventListener('resize', calculateScrollDistance, { passive: true });
    
    // Initial calculation
    calculateScrollDistance();

    return () => {
      window.removeEventListener('scroll', calculateScrollDistance);
      window.removeEventListener('resize', calculateScrollDistance);
    };
  }, []);

  return (
    <div 
      id="scroll-progress-container"
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-[#ffffff0a] pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        id="scroll-progress-bar"
        className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-violet-500 shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
