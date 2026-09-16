import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  borderAccent?: 'mint' | 'gold' | 'none';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glowOnHover = true,
  borderAccent = 'none',
  onClick,
}) => {
  const borderStyles = {
    none: 'border-emerald-500/15 hover:border-emerald-500/35',
    mint: 'border-[#a6ff2e]/30 hover:border-[#a6ff2e]/60',
    gold: 'border-amber-500/30 hover:border-amber-400/60',
  };

  return (
    <motion.div
      whileHover={onClick ? { y: -4, transition: { duration: 0.25 } } : undefined}
      onClick={onClick}
      className={`relative rounded-2xl bg-[#12261e]/60 backdrop-blur-xl border ${borderStyles[borderAccent]} ${
        glowOnHover ? 'hover:shadow-[0_12px_40px_-10px_rgba(0,229,153,0.18)] transition-all duration-300' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Subtle top glare reflection line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent rounded-t-2xl pointer-events-none" />
      {children}
    </motion.div>
  );
};

