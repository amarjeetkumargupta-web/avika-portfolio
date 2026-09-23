import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/cursor.css';

const TRAIL_COUNT = 6;

export default function CustomCursor() {
  const outerRef = useRef(null);
  const dotRef = useRef(null);
  const trailRefs = useRef([]);
  const mouse = useRef({ x: -100, y: -100 });
  const outerPos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef(Array(TRAIL_COUNT).fill({ x: -100, y: -100 }));
  const raf = useRef(null);
  const [cursorState, setCursorState] = useState('default');
  const [cursorLabel, setCursorLabel] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const onMouseMove = useCallback((e) => {
    mouse.current = { x: e.clientX, y: e.clientY };
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    }
    setIsVisible(true);
  }, []);

  const onMouseDown = useCallback(() => setCursorState(prev => prev === 'default' ? 'clicking' : prev), []);
  const onMouseUp = useCallback(() => setCursorState(prev => prev === 'clicking' ? 'default' : prev), []);
  const onMouseLeave = useCallback(() => setIsVisible(false), []);
  const onMouseEnter = useCallback(() => setIsVisible(true), []);

  // Handle hover detection
  useEffect(() => {
    const handleOver = (e) => {
      const target = e.target;
      if (!target) return;

      const el = target.closest('a, button, [data-cursor="pointer"]');
      const textEl = target.closest('input, textarea, [data-cursor="text"]');
      const viewEl = target.closest('[data-cursor="view"]');

      if (viewEl) {
        setCursorState('hovering');
        setCursorLabel(viewEl.getAttribute('data-cursor-label') || 'View');
      } else if (el) {
        setCursorState('hovering');
        setCursorLabel('');
      } else if (textEl) {
        setCursorState('on-text');
        setCursorLabel('');
      } else {
        setCursorState('default');
        setCursorLabel('');
      }
    };

    document.addEventListener('mouseover', handleOver);
    return () => document.removeEventListener('mouseover', handleOver);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      // Smooth follow for outer ring
      const dx = mouse.current.x - outerPos.current.x;
      const dy = mouse.current.y - outerPos.current.y;
      outerPos.current.x += dx * 0.15;
      outerPos.current.y += dy * 0.15;

      if (outerRef.current) {
        const size = cursorState === 'hovering' ? 64 : cursorState === 'clicking' ? 32 : cursorState === 'on-text' ? 4 : 40;
        const offsetX = cursorState === 'on-text' ? 2 : size / 2;
        const offsetY = cursorState === 'on-text' ? 14 : size / 2;
        outerRef.current.style.transform = `translate(${outerPos.current.x - offsetX}px, ${outerPos.current.y - offsetY}px)`;
      }

      // Trail
      for (let i = trailRefs.current.length - 1; i >= 0; i--) {
        const prev = i === 0 ? outerPos.current : trailPositions.current[i - 1];
        trailPositions.current[i] = {
          x: trailPositions.current[i].x + (prev.x - trailPositions.current[i].x) * 0.3,
          y: trailPositions.current[i].y + (prev.y - trailPositions.current[i].y) * 0.3,
        };
        if (trailRefs.current[i]) {
          const opacity = (1 - i / TRAIL_COUNT) * 0.3;
          const scale = 1 - i / TRAIL_COUNT * 0.5;
          trailRefs.current[i].style.transform = `translate(${trailPositions.current[i].x - 2}px, ${trailPositions.current[i].y - 2}px) scale(${scale})`;
          trailRefs.current[i].style.opacity = opacity;
        }
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [cursorState]);

  // Attach global listeners
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [onMouseMove, onMouseDown, onMouseUp, onMouseLeave, onMouseEnter]);

  // Detect touch device
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  if (isTouchDevice) return null;

  const outerClassName = `cursor-outer ${cursorState === 'hovering' ? 'hovering' : ''} ${cursorState === 'clicking' ? 'clicking' : ''} ${cursorState === 'on-text' ? 'on-text' : ''}`;

  return (
    <>
      <div
        ref={outerRef}
        className={outerClassName}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {cursorLabel && <span className="cursor-label">{cursorLabel}</span>}
      </div>
      <div
        ref={dotRef}
        className={`cursor-dot ${cursorState !== 'default' ? 'hidden' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => trailRefs.current[i] = el}
          className="cursor-trail"
        />
      ))}
    </>
  );
}
