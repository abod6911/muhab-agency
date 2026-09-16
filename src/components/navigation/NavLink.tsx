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
      y: '70%',
      opacity: 0,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      audioSynth.playHarmonicSuccess();
    } catch {}

    if (href.startsWith('#')) {
      e.preventDefault();
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts: any) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(href, { offset: -80, duration: 1.2 });
      } else {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    onClick();
  };

  const handleMouseEnter = () => {
    try {
      audioSynth.playHoverBlip();
    } catch {}
  };

  return (
    <div className="overflow-hidden py-1">
      <motion.div variants={linkItemVariants}>
        <a
          href={href}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          className="group relative flex items-center justify-between p-2 sm:px-4 sm:py-3 rounded-2xl border border-transparent hover:border-[#a6ff2e]/35 transition-all duration-300 select-none block bg-white/[0.02] hover:bg-[#072418]/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(166,255,46,0.12)] cursor-pointer"
        >
          {/* Ambient Glow Background on Hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#a6ff2e]/10 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-0" />

          {/* Leading Section: Index Badge + Typography */}
          <div className="flex items-center gap-2.5 sm:gap-4 z-10">
            {/* Cyber Architectural Index Capsule */}
            <div className="flex items-center justify-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 text-[#a6ff2e] text-[10px] sm:text-xs font-mono font-bold tracking-wider shrink-0 shadow-[0_0_12px_rgba(166,255,46,0.15)] group-hover:bg-[#a6ff2e] group-hover:text-[#020a06] transition-all duration-300">
              //{formattedIndex}
            </div>

            {/* Label and Sublabel Stack */}
            <div className="flex flex-col">
              <span
                className={`text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-white transition-all duration-300 flex items-center gap-2 group-hover:text-[#a6ff2e] ${
                  isRTL ? 'group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5'
                } ${isActive ? 'text-[#a6ff2e]' : ''}`}
              >
                {label}
                {/* Active / Hover neon pulse dot */}
                <span className="w-2 h-2 rounded-full bg-[#a6ff2e] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_#a6ff2e]" />
              </span>

              {sublabel && (
                <span className="text-[11px] sm:text-xs text-slate-400 group-hover:text-slate-200 transition-colors mt-0.5 font-medium">
                  {sublabel}
                </span>
              )}
            </div>
          </div>

          {/* Trailing Directional Arrow Indicator */}
          <div className="w-8 h-8 rounded-xl bg-white/5 group-hover:bg-[#a6ff2e] text-slate-400 group-hover:text-[#020a06] border border-white/10 group-hover:border-[#a6ff2e] flex items-center justify-center transition-all duration-300 shrink-0 z-10 shadow-sm">
            <ArrowUpRight
              className={`w-4 h-4 transition-transform duration-300 ${
                isRTL ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
              } group-hover:-translate-y-0.5`}
            />
          </div>
        </a>
      </motion.div>
    </div>
  );
};

