import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Optimized custom hook to initialize IntersectionObserver for reveal animations on scroll.
 * Uses requestAnimationFrame and IntersectionObserver with rootMargin for smooth 60fps scrolling.
 */
export function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    // Fallback if IntersectionObserver isn't available
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      const allReveals = document.querySelectorAll(
        '.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-zoom, .reveal-flip, .reveal-blur, [data-reveal]'
      );
      allReveals.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '120px 0px 120px 0px', // trigger early so animations start smoothly before entering viewport
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    let rafId;
    const scanAndObserve = () => {
      const elements = document.querySelectorAll(
        '.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-zoom, .reveal-flip, .reveal-blur, [data-reveal]'
      );
      elements.forEach((el) => {
        if (!el.classList.contains('is-revealed')) {
          observer.observe(el);
        }
      });
    };

    rafId = requestAnimationFrame(scanAndObserve);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [location.pathname, location.search]);
}


