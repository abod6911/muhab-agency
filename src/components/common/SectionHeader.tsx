import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './Badge';

interface SectionHeaderProps {
  badgeText: string;
  badgeVariant?: 'mint' | 'gold' | 'emerald';
  title: string;
  subtitle?: string;
  align?: 'center' | 'start';
  className?: string;
  badgeIcon?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  badgeVariant = 'mint',
  title,
  subtitle,
  align = 'center',
  className = '',
  badgeIcon,
}) => {
  const alignStyles = {
    center: 'text-center items-center mx-auto',
    start: 'text-start items-start',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'transform, opacity' }}
      className={`flex flex-col max-w-3xl ${alignStyles[align]} mb-14 md:mb-20 ${className}`}
    >
      <Badge variant={badgeVariant} pulse icon={badgeIcon} className="mb-4 shadow-[0_0_15px_rgba(166,255,46,0.2)]">
        {badgeText}
      </Badge>
      <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.25] md:leading-[1.2] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

