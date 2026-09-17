import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'end',
  glow = true,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 select-none cursor-pointer overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-5 py-2 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5 font-bold',
  };

  const variantStyles = {
    primary: `bg-[#a6ff2e] hover:bg-[#b6ff4d] text-[#09110d] font-black tracking-wide ${
      glow ? 'shadow-[0_0_25px_rgba(166,255,46,0.45)] hover:shadow-[0_0_35px_rgba(166,255,46,0.65)]' : ''
    } border border-[#a6ff2e]`,
    secondary: 'bg-[#12261e] hover:bg-[#18352a] text-white border border-[#234939] hover:border-[#a6ff2e]/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)]',
    outline: 'bg-[#12261e]/70 hover:bg-[#12261e] text-slate-100 hover:text-white border border-[#234939] hover:border-[#a6ff2e]/60 shadow-[0_0_15px_rgba(166,255,46,0.05)] hover:shadow-[0_0_25px_rgba(166,255,46,0.25)]',
    gold: `bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold ${
      glow ? 'shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.55)]' : ''
    } border border-amber-300`,
    ghost: 'bg-transparent text-slate-300 hover:text-[#a6ff2e] hover:bg-white/5 border border-transparent',
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...(props as any)}
    >
      {/* Shimmer sweep effect on primary buttons */}
      {variant === 'primary' && (
        <span className="absolute inset-0 -translate-x-full hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none transform -skew-x-12" />
      )}

      {icon && iconPosition === 'start' && <span className="shrink-0">{icon}</span>}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {icon && iconPosition === 'end' && <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </motion.button>
  );
};

