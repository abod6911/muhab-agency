import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface CurveProps {
  isRTL?: boolean;
}

export const Curve: React.FC<CurveProps> = ({ isRTL = false }) => {
  // LTR: Drawer is pinned to right, curve sits on its left (-left-[99px])
  // Initial: flat along x=100 (M100 0 L100 100 Q100 50 100 0)
  // Enter curve: bows outwards to x=0 (M100 0 L100 100 Q0 50 100 0)
  // Target: settles flat along x=100 (M100 0 L100 100 Q100 50 100 0)
  const initialPathLTR = 'M100 0 L100 100 Q100 50 100 0';
  const curvedPathLTR = 'M100 0 L100 100 Q0 50 100 0';
  const targetPathLTR = 'M100 0 L100 100 Q100 50 100 0';

  // RTL: Drawer is pinned to left, curve sits on its right (-right-[99px])
  // Initial: flat along x=0 (M0 0 L0 100 Q0 50 0 0)
  // Enter curve: bows outwards to x=100 (M0 0 L0 100 Q100 50 0 0)
  // Target: settles flat along x=0 (M0 0 L0 100 Q0 50 0 0)
  const initialPathRTL = 'M0 0 L0 100 Q0 50 0 0';
  const curvedPathRTL = 'M0 0 L0 100 Q100 50 0 0';
  const targetPathRTL = 'M0 0 L0 100 Q0 50 0 0';

  const curveVariants: Variants = {
    initial: {
      d: isRTL ? initialPathRTL : initialPathLTR,
    },
    enter: {
      d: isRTL
        ? [initialPathRTL, curvedPathRTL, targetPathRTL]
        : [initialPathLTR, curvedPathLTR, targetPathLTR],
      transition: {
        duration: 0.9,
        times: [0, 0.45, 1],
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      d: isRTL
        ? [targetPathRTL, curvedPathRTL, initialPathRTL]
        : [targetPathLTR, curvedPathLTR, initialPathLTR],
      transition: {
        duration: 0.8,
        times: [0, 0.45, 1],
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <svg
      className={`absolute top-0 w-[100px] h-full pointer-events-none overflow-visible z-10 ${
        isRTL ? '-right-[99px]' : '-left-[99px]'
      }`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#072418" />
          <stop offset="50%" stopColor="#041a12" />
          <stop offset="100%" stopColor="#020a06" />
        </linearGradient>
        <filter id="curveNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#a6ff2e" floodOpacity="0.25" />
        </filter>
      </defs>
      <motion.path
        fill="url(#curveGradient)"
        stroke="#a6ff2e"
        strokeWidth="0.5"
        strokeOpacity="0.3"
        filter="url(#curveNeonGlow)"
        variants={curveVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
};

