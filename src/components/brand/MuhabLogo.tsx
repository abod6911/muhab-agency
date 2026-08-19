import React from "react";

interface MuhabLogoProps {
  className?: string;
  showWordmark?: boolean;
  isLight?: boolean;
}

export const MuhabLogo: React.FC<MuhabLogoProps> = ({
  showWordmark = true,
  isLight = false,
}) => {
  return (
    <div className="inline-flex items-center gap-3 select-none">
      {/* Authentic MUHAB Upward Growth M Mark */}
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(185,255,56,0.25)]"
        >
          {/* Main M Shape with Arrow Head */}
          <path
            d="M16 82V28L48 56L72 32V42L86 28L86 14L72 14L80 22L48 50L26 31V82H16Z"
            fill="url(#muhab_green_grad)"
          />
          <path
            d="M68 82V36L84 20V82H74V50L68 56V82H68Z"
            fill="url(#muhab_lime_grad)"
          />
          {/* Growth Bar 1 */}
          <rect x="36" y="66" width="6" height="16" rx="1" fill="#B9FF38" />
          {/* Growth Bar 2 */}
          <rect x="46" y="56" width="6" height="26" rx="1" fill="#B9FF38" />
          {/* Growth Bar 3 */}
          <rect x="56" y="44" width="6" height="38" rx="1" fill="#B9FF38" />

          <defs>
            <linearGradient id="muhab_green_grad" x1="16" y1="14" x2="86" y2="82" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B9FF38" />
              <stop offset="0.6" stopColor="#064E3B" />
              <stop offset="1" stopColor="#042F24" />
            </linearGradient>
            <linearGradient id="muhab_lime_grad" x1="68" y1="20" x2="84" y2="82" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B9FF38" />
              <stop offset="1" stopColor="#064E3B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showWordmark && (
        <div className="flex flex-col text-left rtl:text-right">
          <span className={`font-display font-black text-base sm:text-lg tracking-wider uppercase leading-none ${isLight ? "text-[#07130F]" : "text-white"}`}>
            MUHAB
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#B9FF38] uppercase font-bold mt-0.5">
            Saudi Webmakers
          </span>
        </div>
      )}
    </div>
  );
};
