import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

interface NavLinkProps {
  index: number;
  label: string;
  href: string;
  sublabel?: string;
  isActive?: boolean;
  isRTL?: boolean;
  onClick: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
  index,
  label,
  href,
  sublabel,
  isActive = false,
  isRTL = false,
  onClick,
}) => {
  const formattedIndex = String(index + 1).padStart(2, '0');

  // Staggered crisp masked slide-up (No tilted wobble - 120 FPS pure fluidity)
  const linkItemVariants: Variants = {
    initial: {
      y: '100%',
      opacity: 0,
    },
    enter: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      y: '40%',
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      audioSynth.playHarmonicSuccess();
    } catch {}

    // Unlock body scroll immediately so the page can scroll
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    const lenis = (window as unknown as { __lenis?: any }).__lenis;
    if (lenis && typeof lenis.start === 'function') {
      try {
        lenis.start();
      } catch {}
    }

    if (href.startsWith('#')) {
      e.preventDefault();

      // Trigger drawer close
      onClick();

      const targetEl = document.querySelector(href) as HTMLElement | null;
      if (targetEl) {
        const headerOffset = 75;
        const targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        const clampedTop = Math.max(0, targetTop);

        // Direct native browser scroll
        window.scrollTo({
          top: clampedTop,
          behavior: 'smooth',
        });

        // Lenis programmatic scroll with force flag to override any paused state
        if (lenis && typeof lenis.scrollTo === 'function') {
          try {
            lenis.scrollTo(clampedTop, {
              duration: 0.8,
              force: true,
              immediate: false,
            });
          } catch {}
        }

        // Secondary fallback to guarantee arrival on mobile WebKit
        setTimeout(() => {
          document.body.style.overflow = '';
          const currentPos = window.pageYOffset;
          if (Math.abs(currentPos - clampedTop) > 120) {
            window.scrollTo({
              top: clampedTop,
              behavior: 'smooth',
            });
          }
        }, 120);

        try {
          window.history.pushState(null, '', href);
        } catch {}
      } else if (href === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    try {
      audioSynth.playHoverBlip();
    } catch {}
  };

  return (
    <div className="overflow-hidden py-0.5">
      <motion.div variants={linkItemVariants}>
        <a
          href={href}
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          className="group relative flex items-center justify-between p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-white/5 hover:border-[#a6ff2e]/40 active:border-[#a6ff2e]/60 transition-all duration-200 select-none block bg-white/[0.03] hover:bg-[#072418]/80 active:bg-[#a6ff2e]/10 cursor-pointer touch-manipulation min-h-[50px]"
        >
          {/* Ambient Glow Background on Hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#a6ff2e]/10 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none -z-0" />

          {/* Leading Section: Index Badge + Typography */}
          <div className="flex items-center gap-2 sm:gap-3 z-10">
            {/* Cyber Architectural Index Capsule */}
            <div className="flex items-center justify-center px-1.5 py-0.5 rounded-lg bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 text-[#a6ff2e] text-[9px] sm:text-[10px] font-mono font-bold tracking-wider shrink-0 shadow-[0_0_10px_rgba(166,255,46,0.12)] group-hover:bg-[#a6ff2e] group-hover:text-[#020a06] transition-all duration-200">
              //{formattedIndex}
            </div>

            {/* Label and Sublabel Stack */}
            <div className="flex flex-col">
              <span
                className={`text-base sm:text-lg md:text-xl font-bold tracking-tight text-white transition-all duration-200 flex items-center gap-1.5 group-hover:text-[#a6ff2e] ${
                  isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                } ${isActive ? 'text-[#a6ff2e]' : ''}`}
              >
                {label}
                {/* Active / Hover neon pulse dot */}
                <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-[0_0_8px_#a6ff2e]" />
              </span>

              {sublabel && (
                <span className="text-[10px] sm:text-[11px] text-slate-400 group-hover:text-slate-200 transition-colors mt-0.5 font-medium">
                  {sublabel}
                </span>
              )}
            </div>
          </div>

          {/* Trailing Directional Arrow Indicator */}
          <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-[#a6ff2e] text-slate-400 group-hover:text-[#020a06] border border-white/10 group-hover:border-[#a6ff2e] flex items-center justify-center transition-all duration-200 shrink-0 z-10 shadow-sm">
            <ArrowUpRight
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isRTL ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
              } group-hover:-translate-y-0.5`}
            />
          </div>
        </a>
      </motion.div>
    </div>
  );
};

