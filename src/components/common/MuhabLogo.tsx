import React from 'react';

interface MuhabLogoMarkProps {
  className?: string;
  size?: number | string;
  animate?: boolean;
}

export const MuhabLogoMark: React.FC<MuhabLogoMarkProps> = ({ 
  className = '', 
  size = 48,
  animate = false 
}) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      width={size} 
      height={size} 
      className={`shrink-0 ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Deep emerald to luminous lime gradient for the M body */}
        <linearGradient id="muhabMGrad" x1="20" y1="180" x2="180" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#08301d" />
          <stop offset="35%" stopColor="#0f5132" />
          <stop offset="70%" stopColor="#198754" />
          <stop offset="90%" stopColor="#84cc16" />
          <stop offset="100%" stopColor="#a6ff2e" />
        </linearGradient>

        {/* Arrowhead vibrant gradient */}
        <linearGradient id="muhabArrowGrad" x1="120" y1="80" x2="180" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#65a30d" />
          <stop offset="50%" stopColor="#84cc16" />
          <stop offset="100%" stopColor="#c5ff4a" />
        </linearGradient>

        {/* Growth Bars gradient */}
        <linearGradient id="muhabBarsGrad" x1="75" y1="170" x2="125" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="50%" stopColor="#84cc16" />
          <stop offset="100%" stopColor="#a6ff2e" />
        </linearGradient>

        {/* Neon Glow Filter */}
        <filter id="muhabGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#a6ff2e" floodOpacity="0.35" />
        </filter>

        {/* Subtle 3D Edge Bevel */}
        <filter id="muhabBevel" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>

      <g filter="url(#muhabBevel)">
        {/* Main Architectural M Polygon with Integrated Growth Arrow */}
        <path
          d="M 38 42
             L 76 42
             L 76 102
             L 100 130
             L 124 102
             L 124 58
             L 110 68
             L 155 24
             L 165 72
             L 142 54
             L 142 168
             L 124 168
             L 124 122
             L 100 148
             L 76 122
             L 76 168
             L 38 168
             Z"
          fill="url(#muhabMGrad)"
          stroke="#a6ff2e"
          strokeWidth={animate ? "1.5" : "0.5"}
          strokeOpacity="0.4"
          filter="url(#muhabGlow)"
        />

        {/* 3 Rising Growth Bars Inside the M Basin */}
        {/* Bar 1 (Short) */}
        <rect 
          x="79" 
          y="146" 
          width="11" 
          height="22" 
          rx="2.5" 
          fill="url(#muhabBarsGrad)" 
        />
        
        {/* Bar 2 (Medium) */}
        <rect 
          x="95" 
          y="128" 
          width="11" 
          height="40" 
          rx="2.5" 
          fill="url(#muhabBarsGrad)" 
        />

        {/* Bar 3 (Tall) */}
        <rect 
          x="111" 
          y="108" 
          width="11" 
          height="60" 
          rx="2.5" 
          fill="url(#muhabBarsGrad)" 
        />
      </g>
    </svg>
  );
};

export const MuhabLogoImage: React.FC<{ 
  className?: string; 
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'custom';
  customClass?: string;
}> = ({ 
  className = '', 
  size = 'md',
  customClass = ''
}) => {
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-16 sm:h-20',
    xl: 'h-24 sm:h-32',
    hero: 'w-full max-w-sm sm:max-w-md md:max-w-lg h-auto',
    custom: customClass
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <img
        src="/muhab-logo.webp"
        alt="MUHAB Studio - Saudi Webmakers"
        className={`object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] ${sizeClasses[size]}`}
      />
    </div>
  );
};

export const MuhabEmblemImage: React.FC<{
  size?: number | string;
  className?: string;
}> = ({ size = 36, className = '' }) => {
  return (
    <img
      src="/muhab-emblem.png"
      alt="MUHAB Emblem"
      style={{ width: size, height: size }}
      className={`object-contain shrink-0 drop-shadow-[0_4px_12px_rgba(166,255,46,0.3)] ${className}`}
    />
  );
};

export const MuhabLogoFull: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <MuhabLogoMark size={72} className="mb-2" />
      <div className="flex flex-col items-center">
        <span className="font-black text-white text-2xl tracking-[0.25em] leading-none">
          MUHAB
        </span>
        <div className="flex items-center gap-2 my-1">
          <span className="w-5 h-[1px] bg-[#a6ff2e]/60" />
          <span className="text-[10px] font-bold text-[#a6ff2e] tracking-[0.2em] uppercase">
            Saudi Webmakers
          </span>
          <span className="w-5 h-[1px] bg-[#a6ff2e]/60" />
        </div>
        <span className="text-[8px] text-slate-400 tracking-[0.3em] font-semibold uppercase mt-0.5">
          Websites. Growth. Reputation.
        </span>
      </div>
    </div>
  );
};
