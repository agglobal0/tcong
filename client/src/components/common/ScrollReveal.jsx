import React, { useEffect, useRef } from 'react';

/**
 * ScrollReveal component to animate any block on scroll.
 * 
 * Usage:
 * <ScrollReveal animation="fade-up" delay={200}>
 *   <h2>My Heading</h2>
 * </ScrollReveal>
 */
export const ScrollReveal = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 180,
  stagger = false,
  className = '',
  style = {},
  as: Component = 'div',
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkAndReveal = () => {
      const rect = el.getBoundingClientRect();
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= viewHeight + 150) {
        el.classList.add('is-revealed');
        return true;
      }
      return false;
    };

    if (checkAndReveal()) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      el.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
          observer.unobserve(el);
        }
      },
      {
        root: null,
        rootMargin: '150px 0px 150px 0px',
        threshold: 0,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);


  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-down':
        return 'reveal-down';
      case 'fade-left':
        return 'reveal-left';
      case 'fade-right':
        return 'reveal-right';
      case 'zoom-in':
        return 'reveal-zoom';
      case 'zoom-out':
        return 'reveal-zoom-out';
      case 'blur':
        return 'reveal-blur';
      case 'flip-up':
        return 'reveal-flip';
      case 'fade-up':
      default:
        return 'reveal-up';
    }
  };

  const combinedStyle = {
    ...style,
    '--reveal-delay': `${delay}ms`,
    '--reveal-duration': `${duration}ms`,
  };

  const classes = [
    'reveal',
    getAnimationClass(),
    stagger ? 'reveal-stagger' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component ref={ref} className={classes} style={combinedStyle} {...props}>
      {children}
    </Component>
  );
};

export default ScrollReveal;
