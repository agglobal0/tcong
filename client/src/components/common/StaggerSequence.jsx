import React, { useEffect, useRef } from 'react';

/**
 * StaggerSequence component to reveal children one by one in sequence.
 * 
 * Usage:
 * <StaggerSequence staggerDelay={120} animation="fade-up">
 *   <div>Image 1</div>
 *   <div>Image 2</div>
 *   <div>Image 3</div>
 * </StaggerSequence>
 */
export const StaggerSequence = ({
  children,
  staggerDelay = 20,
  initialDelay = 0,
  animation = 'fade-up',
  duration = 180,
  className = '',
  style = {},
  as: Component = 'div',
  ...props
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const revealItems = () => {
      const items = el.querySelectorAll('.reveal');
      items.forEach((item) => item.classList.add('is-revealed'));
    };

    const rect = el.getBoundingClientRect();
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top <= viewHeight + 150) {
      revealItems();
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      revealItems();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealItems();
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

  const animClass = getAnimationClass();

  const renderedChildren = React.Children.map(children, (child, idx) => {
    if (!React.isValidElement(child)) return child;

    const childDelay = initialDelay + idx * staggerDelay;
    const existingStyle = child.props.style || {};
    const existingClassName = child.props.className || '';

    return React.cloneElement(child, {
      className: `reveal ${animClass} ${existingClassName}`.trim(),
      style: {
        ...existingStyle,
        '--reveal-delay': `${childDelay}ms`,
        '--reveal-duration': `${duration}ms`,
      },
    });
  });

  return (
    <Component ref={containerRef} className={className} style={style} {...props}>
      {renderedChildren}
    </Component>
  );
};

export default StaggerSequence;
