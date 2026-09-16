import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { audioSynth } from '../../utils/audioSynth';

interface MagneticButtonProps {
  isOpen: boolean;
  onClick: () => void;
  label?: string;
  isRTL?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  isOpen,
  onClick,
  label,
  isRTL = false,
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  // Framer Motion Springs for magnetic pull
  const springConfig = { damping: 15, stiffness: 220, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Attract cursor by 35% distance
    x.set(middleX * 0.35);
    y.set(middleY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => {
        try { audioSynth.playHoverBlip(); } catch {}
      }}
      onClick={() => {
        try { audioSynth.playHoverBlip(); } catch {}
        onClick();
      }}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
      data-testid="floating-magnetic-menu"
      whileTap={{ scale: 0.92 }}
      className={`relative z-[100] flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-xl border transition-colors duration-300 select-none cursor-pointer group shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${
        isOpen
          ? 'bg-[#041a12]/95 border-[#a6ff2e]/60 text-white shadow-[0_0_25px_rgba(166,255,46,0.35)]'
          : 'bg-[#12261e]/90 hover:bg-[#18352a] border-[#234939] hover:border-[#a6ff2e]/50 text-slate-100 hover:text-white'
      }`}
    >
      {/* Morphing Hamburger / Close Icon */}
      <div className="relative w-5 h-4 flex flex-col justify-between items-center overflow-visible">
        {/* Top bar */}
        <motion.span
          animate={
            isOpen
              ? { rotate: 45, y: 7, backgroundColor: '#a6ff2e' }
              : { rotate: 0, y: 0, backgroundColor: '#ffffff' }
          }
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="w-5 h-[2px] rounded-full origin-center block"
        />
        {/* Middle bar */}
        <motion.span
          animate={
            isOpen
              ? { opacity: 0, scaleX: 0 }
              : { opacity: 1, scaleX: 1, backgroundColor: '#a6ff2e' }
          }
          transition={{ duration: 0.2 }}
          className="w-3.5 h-[2px] self-start rounded-full block group-hover:w-5 transition-all duration-300"
        />
        {/* Bottom bar */}
        <motion.span
          animate={
            isOpen
              ? { rotate: -45, y: -7, backgroundColor: '#a6ff2e' }
              : { rotate: 0, y: 0, backgroundColor: '#ffffff' }
          }
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="w-5 h-[2px] rounded-full origin-center block"
        />
      </div>

      {/* Button Text Label */}
      <span className="text-xs font-black tracking-widest uppercase text-white group-hover:text-[#a6ff2e] transition-colors">
        {label || (isOpen ? (isRTL ? 'إغلاق' : 'CLOSE') : (isRTL ? 'القائمة' : 'MENU'))}
      </span>

      {/* Subtle pulsing status dot when closed */}
      {!isOpen && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-pulse shadow-[0_0_8px_#a6ff2e]" />
      )}
    </motion.button>
  );
};

