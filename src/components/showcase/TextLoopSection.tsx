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

  const text = language === 'ar'
    ? 'استوديو مهاب ✦ نخبة المواقع السعودية ✦ سرعة فائقة ✦ كود مخصص 100% ✦ أداء 120 FPS ✦ تجارب رقمية فاخرة'
    : 'MUHAB DIGITAL STUDIO ✦ BESPOKE WEB ARCHITECTURE ✦ SUB-SECOND PERFORMANCE ✦ NO GENERIC TEMPLATES ✦ 120 FPS VELOCITY';

  return (
    <section 
      id="text-loop-wave"
      className="relative w-full py-8 sm:py-12 md:py-16 bg-gradient-to-b from-[#020a06] via-[#03130c] to-[#020a06] overflow-hidden border-y border-emerald-500/15 select-none"
      aria-label="Interactive Wave Text Loop"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#a6ff2e]/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Guidance Badge */}
      <div className="flex items-center justify-center mb-2 sm:mb-4 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#051a11]/85 border border-emerald-500/30 backdrop-blur-md text-[10px] sm:text-xs font-medium text-emerald-300 shadow-sm whitespace-nowrap">
          <Waves className="w-3.5 h-3.5 text-[#a6ff2e] shrink-0" />
          <span className="font-semibold tracking-wide">
            {language === 'ar' ? 'موجة الانسيابية الرقمية' : 'Kinetic Wave Loop'}
          </span>
          <span className="w-1 h-1 rounded-full bg-emerald-500/60 shrink-0" />
          <div className="flex items-center gap-1 text-slate-400">
            <Sparkles className="w-3 h-3 text-[#a6ff2e]/80 shrink-0" />
            <span className="text-[9px] sm:text-[10px]">
              {language === 'ar' ? 'انسيابية تفاعلية' : 'Interactive Wave'}
            </span>
          </div>
        </div>
      </div>

      {/* React Bits TextLoop Component */}
      <div className="relative w-full overflow-hidden">
        <TextLoop
          text={text}
          shape="wave"
          speed={isMobile ? 80 : 95}
          direction="forward"
          separator="✦"
          curviness={isMobile ? 55 : 85}
          fontSize={isMobile ? 36 : 46}
          fontWeight={900}
          letterSpacing={isMobile ? 1 : 2}
          uppercase={language === 'en'}
          color="#ffffff"
          ribbon={true}
          ribbonColor="#052617"
          ribbonWidth={isMobile ? 66 : 82}
          pauseOnHover={true}
          className="hover:scale-[1.01] transition-transform duration-300 drop-shadow-[0_4px_25px_rgba(166,255,46,0.15)]"
        />
      </div>

      {/* Subtitle Bar */}
      <div className="relative z-10 text-center mt-2 sm:mt-4 px-4">
        <p className="text-[11px] sm:text-xs md:text-sm text-emerald-300/80 font-medium tracking-wide">
          {language === 'ar'
            ? 'تصاميم مخصصة وانسيابية رقمية فائقة السرعة تضاعف حضورك التجاري'
            : 'Award-Winning Bespoke Web Craft • 120 FPS Fluid Motion • High Conversion Rate'}
        </p>
      </div>

      {/* Edge Gradient Fades */}
      <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#020a06] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#020a06] to-transparent pointer-events-none" />
    </section>
  );
};

export default TextLoopSection;
