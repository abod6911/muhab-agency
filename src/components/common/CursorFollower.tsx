import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CursorFollower: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.3 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if hovering over clickable or interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('[role="button"]') ||
          target.closest('.group') ||
          target.getAttribute('tabindex')
        );
        setIsHoveringInteractive(isInteractive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Luminous Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#a6ff2e]/40 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: smoothX,
          y: smoothY,
          width: isHoveringInteractive ? 48 : 28,
          height: isHoveringInteractive ? 48 : 28,
          backgroundColor: isHoveringInteractive ? 'rgba(166,255,46,0.12)' : 'rgba(166,255,46,0.02)',
          boxShadow: isHoveringInteractive ? '0 0 25px rgba(166,255,46,0.45)' : 'none',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, box-shadow 0.2s',
        }}
      />
      {/* Center Pinpoint Core */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#a6ff2e] pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#a6ff2e]"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isHoveringInteractive ? 0 : 1,
          transition: 'scale 0.15s',
        }}
      />
    </div>
  );
};
