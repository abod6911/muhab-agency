import React, { useRef, useState, useEffect, useCallback, useId } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { defaultSocialItems } from '../../data/socialData';
import type { SocialItem } from '../../data/socialData';

export type { SocialItem };

// ==========================================
// 1. Single Physics-Driven Magnetic Button
// ==========================================

export interface MagneticSocialButtonProps {
  item: SocialItem;
  size?: 'sm' | 'md' | 'lg';
  proximityRadius?: number;
  maxDisplacement?: number;
  showTooltip?: boolean;
  index?: number;
}

export const MagneticSocialButton: React.FC<MagneticSocialButtonProps> = ({
  item,
  size = 'md',
  proximityRadius = 120,
  maxDisplacement = 24,
  showTooltip = true,
  index = 0
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const isNearRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouchDevice] = useState(() => 
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );
  const prefersReducedMotion = useReducedMotion();
  const tooltipId = useId();

  // Motion values for elastic container displacement
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetRotate = useMotionValue(0);
  const targetScale = useMotionValue(1);

  // High-performance spring dampening physics configuration
  const springConfig = {
    stiffness: 380,
    damping: 18,
    mass: 0.25
  };

  const springX = useSpring(targetX, springConfig);
  const springY = useSpring(targetY, springConfig);
  const springRotate = useSpring(targetRotate, { stiffness: 320, damping: 20, mass: 0.3 });
  const springScale = useSpring(targetScale, { stiffness: 450, damping: 22, mass: 0.2 });

  // Inner icon parallax multiplier (creates 2.5D depth separation)
  const innerX = useTransform(springX, (val) => val * 1.35);
  const innerY = useTransform(springY, (val) => val * 1.35);

  // Global mouse proximity tracking for organic magnetic pull
  const handlePointerMove = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion || isTouchDevice || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < proximityRadius) {
      isNearRef.current = true;
      // Proximity falloff ratio (1 at center, 0 at outer boundary)
      const proximity = 1 - distance / proximityRadius;
      // Elastic non-linear pull curve
      const pullFactor = Math.pow(proximity, 1.2);

      const pullX = (deltaX / distance) * (maxDisplacement * pullFactor);
      const pullY = (deltaY / distance) * (maxDisplacement * pullFactor);

      targetX.set(pullX);
      targetY.set(pullY);

      // Rotational wobble based on horizontal entry offset
      const wobble = Math.min(Math.max((deltaX / proximityRadius) * 12, -12), 12);
      targetRotate.set(wobble);
    } else if (isNearRef.current) {
      // Out of proximity range: smooth return to origin once
      isNearRef.current = false;
      targetX.set(0);
      targetY.set(0);
      targetRotate.set(0);
    }
  }, [prefersReducedMotion, isTouchDevice, proximityRadius, maxDisplacement, targetX, targetY, targetRotate]);

  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice) return;

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, [handlePointerMove, prefersReducedMotion, isTouchDevice]);

  // Size styling presets
  const sizeClasses = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const IconComponent = item.icon;
  const activeState = isHovered || isFocused;

  // Staggered gentle sinusoidal resting levitation delay
  const levitationDelay = (index % 5) * 0.4;

  return (
    <motion.div 
      className="relative inline-flex items-center justify-center p-1.5 select-none"
      animate={
        !activeState && !prefersReducedMotion && !isTouchDevice
          ? {
              y: [0, -3, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: levitationDelay
              }
            }
          : undefined
      }
    >
      {/* Dynamic Background Aurora Radial Bloom */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: activeState
            ? `radial-gradient(circle at 50% 50%, ${item.glowColor} 0%, ${item.secondaryGlowColor || item.glowColor} 40%, transparent 75%)`
            : 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.03) 0%, transparent 70%)',
          filter: activeState ? 'blur(14px)' : 'blur(4px)',
          opacity: activeState ? 0.9 : 0.25,
          transform: activeState ? 'scale(1.5)' : 'scale(0.9)',
        }}
      />

      {/* Floating Pill Tooltip */}
      {showTooltip && (
        <div
          id={tooltipId}
          role="tooltip"
          dir="ltr"
          className={`absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide whitespace-nowrap transition-all duration-200 ${
            activeState
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-1.5 scale-90'
          } bg-[#041a12]/95 border border-white/15 text-slate-200 shadow-xl backdrop-blur-md`}
        >
          <span 
            className="w-1.5 h-1.5 rounded-full shrink-0" 
            style={{ backgroundColor: item.brandColor }} 
          />
          <span>{item.name}</span>
          {item.handle && (
            <span className="text-slate-400 font-mono text-[9px] hidden sm:inline opacity-80">
              {item.handle}
            </span>
          )}
        </div>
      )}

      {/* Physics-driven Magnetic Anchor */}
      <motion.a
        ref={buttonRef}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.ariaLabel || `${item.name} profile`}
        aria-describedby={showTooltip ? tooltipId : undefined}
        tabIndex={0}
        onMouseEnter={() => {
          setIsHovered(true);
          targetScale.set(1.25); // Hover scale pulse 1.25
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          targetScale.set(1);
          targetX.set(0);
          targetY.set(0);
          targetRotate.set(0);
        }}
        onFocus={() => {
          setIsFocused(true);
          targetScale.set(1.2);
          targetY.set(-4);
        }}
        onBlur={() => {
          setIsFocused(false);
          targetScale.set(1);
          targetY.set(0);
        }}
        onTouchStart={() => {
          targetScale.set(0.94);
        }}
        onTouchEnd={() => {
          targetScale.set(1);
        }}
        style={{
          x: prefersReducedMotion ? 0 : springX,
          y: prefersReducedMotion ? 0 : springY,
          rotate: prefersReducedMotion ? 0 : springRotate,
          scale: prefersReducedMotion ? 1 : springScale,
          willChange: 'transform'
        }}
        className={`group relative flex items-center justify-center rounded-2xl cursor-pointer ${sizeClasses[size]} transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a6ff2e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020B07] shadow-lg`}
      >
        {/* Glass Container Outer Shell */}
        <div 
          className="absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none"
          style={{
            backgroundColor: activeState ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
            borderColor: activeState ? item.brandColor : 'rgba(16, 185, 129, 0.18)',
            borderWidth: '1px',
            borderStyle: 'solid',
            boxShadow: activeState 
              ? `0 0 20px ${item.glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.3)`
              : 'inset 0 1px 1px rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)'
          }}
        />

        {/* Specular Top Glare Edge */}
        <div 
          className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none transition-opacity duration-300"
          style={{ opacity: activeState ? 0.8 : 0.3 }}
        />

        {/* Inner Parallax Icon */}
        <motion.div
          style={{
            x: prefersReducedMotion ? 0 : innerX,
            y: prefersReducedMotion ? 0 : innerY,
            color: activeState ? item.brandColor : '#94a3b8',
            willChange: 'transform'
          }}
          className="relative z-10 flex items-center justify-center transition-colors duration-250"
        >
          <IconComponent 
            className={iconSizes[size]} 
            isChromatic={item.isChromatic && activeState} 
          />
        </motion.div>
      </motion.a>
    </motion.div>
  );
};

// ==========================================
// 2. Main Magnetic Social Dock Container
// ==========================================

export interface MagneticSocialDockProps {
  items?: SocialItem[];
  size?: 'sm' | 'md' | 'lg';
  proximityRadius?: number;
  maxDisplacement?: number;
  showTooltips?: boolean;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const MagneticSocialDock: React.FC<MagneticSocialDockProps> = ({
  items = defaultSocialItems,
  size = 'md',
  proximityRadius = 120,
  maxDisplacement = 24,
  showTooltips = true,
  className = '',
  orientation = 'horizontal'
}) => {
  return (
    <nav
      aria-label="Social media channels"
      className={`relative inline-flex items-center justify-center p-2 rounded-3xl bg-black/20 border border-white/5 backdrop-blur-md shadow-2xl ${
        orientation === 'vertical' ? 'flex-col space-y-1' : 'flex-row flex-wrap gap-1'
      } ${className}`}
    >
      {items.map((item, index) => (
        <MagneticSocialButton
          key={item.name}
          item={item}
          size={size}
          proximityRadius={proximityRadius}
          maxDisplacement={maxDisplacement}
          showTooltip={showTooltips}
          index={index}
        />
      ))}
    </nav>
  );
};

export default MagneticSocialDock;
