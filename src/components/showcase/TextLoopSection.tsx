import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TextLoop } from '../common/TextLoop';
import { Waves, Sparkles } from 'lucide-react';

export const TextLoopSection: React.FC = () => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Elite Agency Copywriting: Architecture, Speed, and Proven ROI
  const ribbonText = language === 'ar'
    ? 'استوديو مهاب ✦ معمارية برمجية سيادية ✦ استجابة لحظية فائقة السرعة ✦ كود نقي بدون قوالب ✦ مضاعفة المبيعات بنسبة +27% ✦ أداء 120 FPS'
    : 'MUHAB STUDIO ✦ SOVEREIGN DIGITAL ARCHITECTURE ✦ SUB-SECOND VELOCITY ✦ 100% HANDCRAFTED CODE ✦ +27% CONVERSION GROWTH ✦ 120 FPS';

  return (
    <section 
      id="text-loop-wave"
      className="relative w-full py-4 sm:py-6 md:py-8 bg-gradient-to-b from-[#020a06] via-[#03130c] to-[#020a06] overflow-hidden border-y border-emerald-500/15 select-none"
      aria-label="Kinetic Wave Vision Ribbon"
    >
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-[#a6ff2e]/8 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Prestige Guidance Pill Header */}
      <div className="flex items-center justify-center mb-2 sm:mb-3 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#051a11]/90 border border-emerald-500/30 backdrop-blur-md text-[10px] sm:text-xs font-medium text-emerald-300 shadow-sm whitespace-nowrap">
          <Waves className="w-3 h-3 text-[#a6ff2e] shrink-0" />
          <span className="font-semibold tracking-wide">
            {language === 'ar' ? 'منظومة الانسيابية الحركية' : 'Kinetic Wave Architecture'}
          </span>
          <span className="w-1 h-1 rounded-full bg-emerald-500/60 shrink-0" />
          <div className="flex items-center gap-1 text-slate-400">
            <Sparkles className="w-3 h-3 text-[#a6ff2e]/85 shrink-0" />
            <span className="text-[9px] sm:text-[10px]">
              {language === 'ar' ? 'تدفق مستمر 120 FPS' : 'Continuous 120 FPS Flow'}
            </span>
          </div>
        </div>
      </div>

      {/* Single Dynamic Wave Ribbon */}
      <div className="relative w-full overflow-hidden flex items-center justify-center drop-shadow-[0_0_25px_rgba(166,255,46,0.15)]">
        <TextLoop
          text={ribbonText}
          shape="wave"
          speed={isMobile ? 75 : 90}
          direction="forward"
          separator="✦"
          curviness={isMobile ? 22 : 32}
          fontSize={isMobile ? 22 : 30}
          fontWeight={900}
          letterSpacing={isMobile ? 0.5 : 1.5}
          uppercase={language === 'en'}
          color="#a6ff2e"
          ribbon={true}
          ribbonColor="#042013"
          ribbonWidth={isMobile ? 46 : 56}
          pauseOnHover={false}
          className="hover:scale-[1.005] transition-transform duration-300"
        />
      </div>

      {/* Corporate Value Proposition Subtitle Bar */}
      <div className="relative z-10 text-center mt-2 sm:mt-3 px-4">
        <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs md:text-sm text-emerald-300/90 font-medium tracking-wide">
          <Sparkles className="w-3 h-3 text-[#a6ff2e] shrink-0" />
          <span>
            {language === 'ar'
              ? 'معمارية برمجية سيادية • سرعة استجابة فائقة • شراكات نمو تجاري موثقة بالأرقام'
              : 'Sovereign Digital Architecture • Sub-Second Performance • Proven Commercial ROI'}
          </span>
          <Sparkles className="w-3 h-3 text-[#a6ff2e] shrink-0" />
        </div>
      </div>

      {/* Top and Bottom Subtle Linear Edge Masks */}
      <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#020a06] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#020a06] to-transparent pointer-events-none" />
    </section>
  );
};

export default TextLoopSection;
