import React, { useEffect, useRef } from 'react';

/**
 * TextSequence component to reveal text word-by-word in sequence.
 * 
 * Usage:
 * <TextSequence text="Welcome to TCONG Ministries" as="h1" delay={100} wordDelay={80} />
 */
export const TextSequence = ({
  text = '',
  as: Component = 'span',
  delay = 0,
  wordDelay = 25,
  className = '',
  style = {},
  ...props
}) => {
  const ref = useRef(null);
  const words = text.split(' ');

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


  return (
    <Component ref={ref} className={`reveal-text-container ${className}`} style={style} {...props}>
      {words.map((word, idx) => (
        <React.Fragment key={idx}>
          <span
            className="word-reveal"
            style={{
              '--word-delay': `${delay + idx * wordDelay}ms`,
            }}
          >
            {word}
          </span>
          {idx < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </Component>
  );
};

export default TextSequence;
