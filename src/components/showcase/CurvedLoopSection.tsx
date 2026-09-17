import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CurvedLoop } from '../common/CurvedLoop';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export const CurvedLoopSection: React.FC = () => {
  const { language } = useLanguage();

  const marqueeText = '✦ MUHAB DIGITAL STUDIO ✦ BESPOKE WEB ARCHITECTURE ✦ SUB-SECOND SPEED ✦ NO GENERIC TEMPLATES ✦ 120 FPS VELOCITY ✦ HIGH CONVERSION ✦';

  return (
    <section 
      id="kinetic-ribbon"
      className="relative w-full py-8 sm:py-14 md:py-18 bg-gradient-to-b from-[#020a06] via-[#04160d] to-[#020a06] overflow-hidden border-y border-emerald-500/15 select-none"
      aria-label="Kinetic Studio Ribbon"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#a6ff2e]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Micro-Header Guidance Pill */}
      <div className="flex items-center justify-center mb-3 sm:mb-5 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#051a11]/80 border border-emerald-500/25 backdrop-blur-md text-[10px] sm:text-[11px] font-medium text-emerald-300 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#a6ff2e]" />
          <span>
            {language === 'ar' ? 'شريط الرؤية الحركي' : 'Interactive Kinetic Vision Ribbon'}
          </span>
          <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
          <div className="flex items-center gap-1 text-slate-400">
            <MoveHorizontal className="w-3 h-3 text-[#a6ff2e]/80" />
            <span className="text-[9px] sm:text-[10px]">
              {language === 'ar' ? 'اسحب للتوجيه' : 'Drag to steer'}
            </span>
          </div>
        </div>
      </div>

      {/* React Bits CurvedLoop Component */}
      <div className="relative w-full overflow-visible">
        <CurvedLoop
          marqueeText={marqueeText}
          speed={1.6}
          curveAmount={80}
          direction="left"
          interactive={true}
          containerClassName="min-h-[75px] sm:min-h-[130px] md:min-h-[170px]"
          className="fill-white hover:fill-[#a6ff2e] transition-colors duration-300 drop-shadow-[0_0_25px_rgba(166,255,46,0.25)] font-black"
        />
      </div>

      {/* Arabic Value Proposition Subtitle Bar */}
      <div className="relative z-10 text-center mt-2.5 sm:mt-4 px-4">
        <p className="text-[11px] sm:text-xs md:text-sm text-emerald-300/90 font-medium tracking-wide">
          {language === 'ar'
            ? 'هندسة برمجية فاخرة • مواقع فائقة السرعة < 0.8 ثانية • كود مخصص بدون قوالب جاهزة'
            : 'Bespoke Web Architecture • Sub-Second Performance < 0.8s • 100% Handcrafted Code'}
        </p>
      </div>

      {/* Bottom Subtle Linear Gradient Edge Mask */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#020a06] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#020a06] to-transparent pointer-events-none" />
    </section>
  );
};

export default CurvedLoopSection;
