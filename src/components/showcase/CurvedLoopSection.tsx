import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CurvedLoop } from '../common/CurvedLoop';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export const CurvedLoopSection: React.FC = () => {
  const { language } = useLanguage();

  const marqueeText = language === 'ar'
    ? '✦ استوديو مهاب الرقمي ✦ هندسة برمجية فاخرة ✦ مواقع فائقة السرعة ✦ واجهات معمارية استثنائية ✦ كود نظيف بدون قوالب ✦ أداء 120 FPS ✦ نمو أعمال موثق ✦'
    : '✦ MUHAB DIGITAL STUDIO ✦ BESPOKE WEB ARCHITECTURE ✦ SUB-SECOND PERFORMANCE ✦ NO GENERIC TEMPLATES ✦ 120 FPS VELOCITY ✦ HIGH CONVERSION ✦';

  return (
    <section 
      id="kinetic-ribbon"
      className="relative w-full py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#020a06] via-[#04160d] to-[#020a06] overflow-hidden border-y border-emerald-500/15 select-none"
      aria-label="Kinetic Studio Ribbon"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#a6ff2e]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Micro-Header Guidance Pill */}
      <div className="flex items-center justify-center mb-4 sm:mb-6 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#051a11]/80 border border-emerald-500/25 backdrop-blur-md text-[11px] font-medium text-emerald-300 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#a6ff2e]" />
          <span>
            {language === 'ar' ? 'شريط الرؤية الحركي التفاعلي' : 'Interactive Kinetic Vision Ribbon'}
          </span>
          <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
          <div className="flex items-center gap-1 text-slate-400">
            <MoveHorizontal className="w-3 h-3 text-[#a6ff2e]/80" />
            <span className="text-[10px]">
              {language === 'ar' ? 'اسحب للتفاعل' : 'Drag to steer'}
            </span>
          </div>
        </div>
      </div>

      {/* React Bits CurvedLoop Component */}
      <div className="relative w-full overflow-visible">
        <CurvedLoop
          marqueeText={marqueeText}
          speed={1.6}
          curveAmount={140}
          direction={language === 'ar' ? 'right' : 'left'}
          interactive={true}
          containerClassName="min-h-[140px] sm:min-h-[180px] md:min-h-[220px]"
          className="fill-white hover:fill-[#a6ff2e] transition-colors duration-300 drop-shadow-[0_0_25px_rgba(166,255,46,0.25)] font-black"
        />
      </div>

      {/* Bottom Subtle Linear Gradient Edge Mask */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#020a06] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#020a06] to-transparent pointer-events-none" />
    </section>
  );
};

export default CurvedLoopSection;
