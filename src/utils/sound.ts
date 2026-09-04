// Professional subtle tactile sound engine using Web Audio API
let audioCtx: AudioContext | null = null;
let soundEnabled = typeof window !== 'undefined' ? localStorage.getItem('portfolio_sfx_enabled') !== 'false' : true;

export const isSoundEnabled = () => soundEnabled;

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio_sfx_enabled', enabled ? 'true' : 'false');
    window.dispatchEvent(new CustomEvent('sfx-toggle', { detail: { enabled } }));
  }
};

export const toggleSound = () => {
  setSoundEnabled(!soundEnabled);
  if (soundEnabled) {
    playTactileClick('switch');
  }
  return soundEnabled;
};

/**
 * Plays an ultra-subtle, tactile mechanical tap sound for buttons and interactive controls.
 * Pure synthetic Web Audio API - zero network latency, non-intrusive, studio volume.
 */
export const playTactileClick = (type: 'tap' | 'pop' | 'switch' = 'tap') => {
  if (!soundEnabled || typeof window === 'undefined') return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    if (type === 'switch') {
      // Crisp filter sweep
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.Q.setValueAtTime(1.8, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.022);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } else if (type === 'pop') {
      // Soft bubble pop
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.02);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } else {
      // Default tactile keycap tap
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(1.4, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(820, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.018);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    }
  } catch {
    // Fail silently without interrupting UI
  }
};

/**
 * Initializes a document-wide delegated event listener to trigger tactile clicks
 * for buttons, links with role="button", and interactive tabs.
 */
export const initGlobalTactileClicks = () => {
  if (typeof window === 'undefined') return () => {};

  const handlePointerDown = (e: MouseEvent | TouchEvent) => {
    const target = (e.target as HTMLElement)?.closest('button, [role="button"], a.cursor-pointer, input[type="radio"], input[type="checkbox"]');
    if (target) {
      playTactileClick('tap');
    }
  };

  window.addEventListener('pointerdown', handlePointerDown, { passive: true });
  return () => {
    window.removeEventListener('pointerdown', handlePointerDown);
  };
};
