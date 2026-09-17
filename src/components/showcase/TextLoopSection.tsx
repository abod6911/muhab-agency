import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TextLoop } from '../common/TextLoop';
import { Waves, Sparkles, Layers } from 'lucide-react';

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

  // Professional Tier-1 Agency Copywriting for Ribbon 1 (Engineering & Architectural Authority)
  const ribbon1Text = language === 'ar'
    ? 'استوديو مهاب ✦ معمارية برمجية سيادية ✦ استجابة لحظية فائقة السرعة ✦ كود نقي بدون قوالب ✦ أداء استثنائي 120 FPS'
    : 'MUHAB STUDIO ✦ SOVEREIGN DIGITAL ARCHITECTURE ✦ SUB-SECOND EXECUTION ✦ 100% HANDCRAFTED CODE ✦ ENTERPRISE TIER-1 SLA ✦ 120 FPS VELOCITY';

  // Professional Tier-1 Agency Copywriting for Ribbon 2 (Commercial Growth & ROI Dominance)
  const ribbon2Text = language === 'ar'
    ? 'مضاعفة المبيعات بنسبة +27% ✦ بوابات دفع معتمدة مدى و Apple Pay ✦ علامة 100/100 على Google ✦ تجارب مستخدم حائزة على جوائز'
    : '+27% CONVERSION GROWTH ✦ CERTIFIED SAUDI PAYMENT GATEWAYS ✦ 100/100 GOOGLE LIGHTHOUSE ✦ AWARD-WINNING UX ✦ STRATEGIC SCALE';

  return (
    <section 
      id="text-loop-wave"
      className="relative w-full py-10 sm:py-16 md:py-22 bg-gradient-to-b from-[#020a06] via-[#03130c] to-[#020a06] overflow-hidden border-y border-emerald-500/15 select-none"
      aria-label="Dual Kinetic Vision Ribbon"
    >
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-80 sm:w-[32rem] h-80 sm:h-[32rem] bg-[#a6ff2e]/8 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 translate-y-1/2 w-80 sm:w-[32rem] h-80 sm:h-[32rem] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Prestige Guidance Pill Header */}
      <div className="flex items-center justify-center mb-4 sm:mb-7 px-4">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#051a11]/90 border border-emerald-500/30 backdrop-blur-md text-[11px] sm:text-xs font-medium text-emerald-300 shadow-sm whitespace-nowrap">
          <Layers className="w-3.5 h-3.5 text-[#a6ff2e] shrink-0" />
          <span className="font-semibold tracking-wide">
            {language === 'ar' ? 'منظومة التميز الحركي المزدوج' : 'Dual Kinetic Vision Architecture'}
          </span>
          <span className="w-1 h-1 rounded-full bg-emerald-500/60 shrink-0" />
          <div className="flex items-center gap-1.5 text-slate-400">
            <Waves className="w-3.5 h-3.5 text-[#a6ff2e]/85 shrink-0" />
            <span className="text-[10px] sm:text-[11px]">
              {language === 'ar' ? 'موجات متناغمة تفاعلية' : 'Harmonic Kinetic Waves'}
            </span>
          </div>
        </div>
      </div>

      {/* Dual Interlocking Wave Ribbons Container */}
      <div className="relative w-full overflow-hidden flex flex-col items-center">
        {/* Ribbon 1: Upper Wave (Obsidian Forest + Sovereign White Text) */}
        <div className="relative w-full z-10 drop-shadow-[0_12px_28px_rgba(2,10,6,0.85)]">
          <TextLoop
            text={ribbon1Text}
            shape="wave"
            speed={isMobile ? 70 : 86}
            direction="forward"
            separator="✦"
            curviness={isMobile ? 44 : 70}
            fontSize={isMobile ? 29 : 40}
            fontWeight={900}
            letterSpacing={isMobile ? 0.5 : 1.5}
            uppercase={language === 'en'}
            color="#ffffff"
            ribbon={true}
            ribbonColor="#042013"
            ribbonWidth={isMobile ? 58 : 76}
            pauseOnHover={true}
            className="hover:scale-[1.01] transition-transform duration-300"
          />
        </div>

        {/* Ribbon 2: Counter Wave (Emerald Obsidian + Neon Mint Glow Text) with Interlocking Negative Margin */}
        <div className="relative w-full z-20 -mt-6 sm:-mt-12 md:-mt-16 drop-shadow-[0_0_35px_rgba(166,255,46,0.14)]">
          <TextLoop
            text={ribbon2Text}
            shape="wave-reverse"
            speed={isMobile ? 64 : 78}
            direction="reverse"
            separator="✦"
            curviness={isMobile ? 44 : 70}
            fontSize={isMobile ? 29 : 40}
            fontWeight={900}
            letterSpacing={isMobile ? 0.5 : 1.5}
            uppercase={language === 'en'}
            color="#a6ff2e"
            ribbon={true}
            ribbonColor="#062f1a"
            ribbonWidth={isMobile ? 58 : 76}
            pauseOnHover={true}
            className="hover:scale-[1.01] transition-transform duration-300"
          />
        </div>
      </div>

      {/* Corporate Value Proposition Subtitle Bar */}
      <div className="relative z-10 text-center mt-5 sm:mt-8 px-4">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm md:text-base text-emerald-300/90 font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#a6ff2e] shrink-0" />
          <span>
            {language === 'ar'
              ? 'معمارية برمجية سيادية • سرعة استجابة فائقة • شراكات نمو تجاري موثقة بالأرقام'
              : 'Sovereign Digital Architecture • Sub-Second Performance • Proven Commercial ROI'}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#a6ff2e] shrink-0" />
        </div>
      </div>

      {/* Top and Bottom Subtle Linear Edge Masks */}
      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#020a06] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#020a06] to-transparent pointer-events-none" />
    </section>
  );
};

export default TextLoopSection;
