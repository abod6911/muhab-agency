import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'mint' | 'gold' | 'emerald' | 'subtle';
  pulse?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'mint',
  pulse = false,
  icon,
  className = '',
}) => {
  const variantStyles = {
    mint: 'bg-[#0a2b20] text-[#a6ff2e] border-[#1b4d3b] shadow-[0_0_15px_rgba(166,255,46,0.15)]',
    gold: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    emerald: 'bg-[#12261e] text-[#a6ff2e] border-[#234939]',
    subtle: 'bg-white/5 text-slate-300 border-white/10',
  };

  const dotColors = {
    mint: 'bg-[#a6ff2e]',
    gold: 'bg-amber-400',
    emerald: 'bg-[#a6ff2e]',
    subtle: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border backdrop-blur-md ${variantStyles[variant]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[variant]}`}
          />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

