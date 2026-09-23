import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

// ── TextReveal: Animates words in as they enter viewport ──
export function TextReveal({ children, className = '', delay = 0, as = 'div' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Tag = motion[as] || motion.div;

  const words = typeof children === 'string' ? children.split(' ') : [children];

  return (
    <Tag ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// ── SplitText: Per-character animation ──
export function SplitText({ children, className = '', delay = 0, stagger = 0.03, hover = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const text = typeof children === 'string' ? children : '';
  const chars = text.split('');

  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ y: '100%', opacity: 0 }}
          animate={isInView ? {
            y: 0,
            opacity: 1,
            scale: hover && hoveredIdx === i ? 1.3 : 1,
            color: hover && hoveredIdx === i ? 'var(--color-accent)' : undefined,
          } : { y: '100%', opacity: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
          onMouseEnter={hover ? () => setHoveredIdx(i) : undefined}
          onMouseLeave={hover ? () => setHoveredIdx(null) : undefined}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// ── AnimatedCounter: Counts up from 0 ──
export function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target, 10);
    if (isNaN(num)) return;

    let start = 0;
    const step = Math.ceil(num / (duration * 60));
    const interval = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(num);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

// ── FadeInView: Simple fade + slide on scroll ──
export function FadeInView({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: -60 },
    right: { y: 0, x: 60 },
  };

  const offset = directionMap[direction] || directionMap.up;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset.x, y: offset.y }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── MagneticButton: Button that pulls toward cursor ──
export function MagneticButton({ children, className = '', onClick, as = 'button', href, to, ...props }) {
  const ref = useRef(null);

  const handleMouse = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)';
    }
  }, []);

  const Tag = as === 'a' ? 'a' : 'button';
  const linkProps = as === 'a' ? { href } : {};

  return (
    <Tag
      ref={ref}
      className={`magnetic ${className}`}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
      {...linkProps}
      {...props}
    >
      {children}
    </Tag>
  );
}
