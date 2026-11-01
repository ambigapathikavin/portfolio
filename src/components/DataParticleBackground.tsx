import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulseAngle: number;
}

export const DataParticleBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = motionPreference.matches;
    const mouse = { x: -1000, y: -1000, radius: 140 };

    // Keep the decorative network within the portfolio's cyan/teal accent palette.
    const colors = [
      'rgba(6, 182, 212,',
      'rgba(45, 212, 191,',
    ];

    let isVisible = true;
    const initParticles = () => {
      particles = [];
      const isMobile = width < 640;
      // Calculate particle density based on canvas area, mobile friendly
      const maxCount = isMobile ? 20 : 42;
      const count = Math.min(Math.floor((width * height) / 24000), maxCount);

      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 1.8 + 1.2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.24,
          vy: (Math.random() - 0.5) * 0.24,
          radius: radius,
          baseRadius: radius,
          color: color,
          alpha: Math.random() * 0.28 + 0.12,
          pulseSpeed: Math.random() * 0.012 + 0.006,
          pulseAngle: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particle network with neural vectors
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse animation
        if (!reduceMotion) p.pulseAngle += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulseAngle) * 0.12;

        // Mouse interaction (gentle attraction / vector connect)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);

        if (!reduceMotion && mouseDist < mouse.radius) {
          const force = (1 - mouseDist / mouse.radius) * 1.5;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 0.6;
          p.y += Math.sin(angle) * force * 0.6;

          // Draw mouse link line
          const mouseLineAlpha = (1 - mouseDist / mouse.radius) * 0.28;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${mouseLineAlpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }

        // Movement
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
        }

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.max(0.05, Math.min(1, currentAlpha))})`;
        ctx.fill();

        // Subtle glowing outer ring on some nodes
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color} ${Math.max(0.02, currentAlpha * 0.18)})`;
          ctx.fill();
        }
      }

      if (isVisible && !reduceMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      cancelAnimationFrame(animationFrameId);
      render();
    };

    // Initialize observer for responsive sizing
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });

    // Pause particle animations when scrolled out of viewport
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    motionPreference.addEventListener('change', handleMotionPreferenceChange);
    resize();
    render();

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove, { passive: true });
      parent.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionPreference.removeEventListener('change', handleMotionPreferenceChange);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};
