import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { MuhabEmblemImage } from '../common/MuhabLogo';
import { PhoneMockup } from './PhoneMockup';
import { 
  ShieldCheck,
  Zap,
  Star,
  ArrowUpRight,
  Layers
} from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onSelectProject: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onSelectProject }) => {
  const { language, t } = useLanguage();

  // Mouse tracking for subtle ambient spotlight
  const mouseX = useMotionValue(700);
  const mouseY = useMotionValue(400);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#020a06] text-slate-100 flex flex-col justify-between pt-28 sm:pt-32 pb-16 sm:pb-20 lg:pb-8 px-4 sm:px-8 lg:px-12 overflow-hidden selection:bg-[#a6ff2e]/30 selection:text-[#a6ff2e]"
    >
      {/* Dynamic Cursor Spotlight Following Mouse */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 opacity-50 transition-opacity duration-300"
        style={{
          background: useTransform(
            [smoothMouseX, smoothMouseY],
            ([x, y]) => `radial-gradient(750px circle at ${x}px ${y}px, rgba(166,255,46,0.06), transparent 75%)`
          )
        }}
      />

      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 -start-32 w-96 h-96 bg-[#a6ff2e]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -end-32 w-96 h-96 bg-[#84cc16]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-950/15 rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle background tech grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #a6ff2e 1px, transparent 1px), linear-gradient(to bottom, #a6ff2e 1px, transparent 1px)`,
          backgroundSize: '56px 56px'
        }}
      />

      {/* Hero Interactive Split Grid */}
      <div className="relative z-20 my-auto max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4 sm:py-6">
        
        {/* Column 1: Editorial Value Proposition & CTAs (6 Columns) */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-start"
        >
          {/* Official Muhab Studio Eyebrow Pill */}
          <motion.div 
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mb-5 sm:mb-6"
          >
            <div className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-[#051a11]/90 border border-emerald-500/30 hover:border-[#a6ff2e]/60 text-xs sm:text-sm font-semibold tracking-wide text-slate-200 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(166,255,46,0.12)] transition-all duration-300">
              <div className="relative flex items-center justify-center shrink-0">
                <MuhabEmblemImage size={22} className="drop-shadow-[0_0_8px_rgba(166,255,46,0.4)]" />
              </div>

              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
                </span>
                <span className="text-[#a6ff2e] font-black tracking-wider">
                  {language === 'ar' ? 'صُنّاع المواقع السعودية' : 'MUHAB DIGITAL STUDIO'}
                </span>
              </div>

              <span className="w-1 h-1 rounded-full bg-emerald-500/60 hidden sm:inline-block" />
              <span className="text-slate-300 text-xs hidden sm:inline-block font-medium">
                {language === 'ar' ? 'جدة • استوديو النظم المخصصة' : 'Jeddah HQ • Bespoke Systems'}
              </span>

              <span className="w-1 h-1 rounded-full bg-emerald-500/60 hidden md:inline-block" />
              <span className="text-emerald-400/90 text-xs hidden md:inline-block font-mono">
                {language === 'ar' ? 'سرعة < 0.8s' : 'LATENCY < 0.8s'}
              </span>
            </div>
          </motion.div>

          {/* Main H1 Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[50px] font-black text-white tracking-tight leading-[1.25] sm:leading-[1.18] mb-5 drop-shadow-xl">
            {language === 'ar' ? (
              <>
                <span className="block text-white">
                  نصمم أفضل المواقع
                </span>
                <span className="block text-slate-100/95">
                  والأنظمة الرقمية المخصصة
                </span>
                <div className="relative inline-block mt-1">
                  <div className="absolute -inset-x-6 -inset-y-2 bg-gradient-to-r from-emerald-500/15 via-[#a6ff2e]/25 to-transparent blur-2xl rounded-full pointer-events-none -z-10" />
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#a6ff2e] via-emerald-300 to-[#a6ff2e] drop-shadow-[0_0_30px_rgba(166,255,46,0.35)]">
                    في السعودية
                  </span>
                </div>
              </>
            ) : (
              <>
                <span className="block text-white">
                  Bespoke Digital Systems &{' '}
                </span>
                <div className="relative inline-block mt-1">
                  <div className="absolute -inset-x-6 -inset-y-2 bg-gradient-to-r from-emerald-500/15 via-[#a6ff2e]/25 to-transparent blur-2xl rounded-full pointer-events-none -z-10" />
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#a6ff2e] via-emerald-300 to-[#a6ff2e] drop-shadow-[0_0_30px_rgba(166,255,46,0.35)]">
                    High-Velocity Architecture
                  </span>
                </div>
              </>
            )}
          </h1>

          {/* Supporting Description */}
          <p className="text-sm sm:text-base text-slate-300/90 font-normal leading-[1.8] mb-7 max-w-xl">
            {language === 'ar' ? (
              <>
                استوديو هندسة البرمجيات والواجهات الفاخرة في جدة — نبني منصات ومواقع فائقة الأداء ونطور أنظمة رقمية ذكية لتنمية أعمالك وتوسيع حضورك التجاري.
              </>
            ) : (
              <>
                Jeddah-based digital studio engineering sub-second websites, luxury brand ecosystems, and bespoke SaaS architectures for market leaders.
              </>
            )}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="w-full sm:w-auto"
            >
              <button
                id="hero-cta-contact"
                onClick={onOpenContact}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#a6ff2e] via-[#b6ff4d] to-[#84cc16] text-[#05140d] font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(166,255,46,0.35)] hover:shadow-[0_0_45px_rgba(166,255,46,0.55)] border border-[#c4ff68] transition-all duration-300 cursor-pointer overflow-hidden select-none"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none transform -skew-x-12" />

                <span className="relative z-10 font-bold tracking-wide">
                  {t('heroCtaPrimary')}
                </span>

                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform duration-300 relative z-10" />
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="w-full sm:w-auto"
            >
              <a href="#portfolio" className="block w-full sm:w-auto">
                <button
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-[#071d15]/90 hover:bg-[#0c2a1e] text-slate-200 hover:text-white border border-[#1f4836] hover:border-[#a6ff2e]/70 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl shadow-sm text-sm sm:text-base font-semibold"
                >
                  <div className="p-1 rounded-full bg-[#051a11] text-[#a6ff2e]">
                    <Layers className="w-4 h-4 text-[#a6ff2e]" />
                  </div>
                  <span>
                    {language === 'ar' ? 'استكشف أعمالنا الحية' : 'Explore Live Works'}
                  </span>
                </button>
              </a>
            </motion.div>
          </div>

          {/* Executive Social Proof & Trust Grid (Unified, Clean 3-Card Glass Matrix) */}
          <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {/* 1. Rating & Projects */}
            <div className="group relative flex items-center gap-3 p-3 sm:py-3.5 sm:px-4 rounded-2xl bg-[#051a11]/90 hover:bg-[#072418] border border-emerald-500/25 hover:border-[#a6ff2e]/40 backdrop-blur-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>
              <div className="flex flex-col text-start min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs sm:text-sm font-bold text-white font-mono">4.9/5</span>
                  <span className="text-[10px] text-amber-400 font-bold">{language === 'ar' ? '★ ممتاز' : '★ Top'}</span>
                </div>
                <span className="text-[11px] text-slate-400 truncate">
                  {language === 'ar' ? 'أكثر من 35+ مشروع' : '35+ Projects'}
                </span>
              </div>
            </div>

            {/* 2. Speed & Lighthouse */}
            <div className="group relative flex items-center gap-3 p-3 sm:py-3.5 sm:px-4 rounded-2xl bg-[#051a11]/90 hover:bg-[#072418] border border-emerald-500/25 hover:border-[#a6ff2e]/40 backdrop-blur-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="w-9 h-9 rounded-xl bg-[#a6ff2e]/10 border border-[#a6ff2e]/30 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-[#a6ff2e]" />
              </div>
              <div className="flex flex-col text-start min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold text-[#a6ff2e] font-mono">100/100</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-ping" />
                </div>
                <span className="text-[11px] text-slate-400 truncate font-mono">
                  {language === 'ar' ? 'سرعة < 0.8 ثانية' : '< 0.8s Latency'}
                </span>
              </div>
            </div>

            {/* 3. Gateways */}
            <div className="group relative flex items-center gap-3 p-3 sm:py-3.5 sm:px-4 rounded-2xl bg-[#051a11]/90 hover:bg-[#072418] border border-emerald-500/25 hover:border-[#a6ff2e]/40 backdrop-blur-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex flex-col text-start min-w-0">
                <span className="text-xs sm:text-[13px] font-bold text-white whitespace-nowrap">
                  {language === 'ar' ? 'مدى و Apple Pay' : 'Mada & Apple Pay'}
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  {language === 'ar' ? 'بوابات دفع موثقة' : 'Secure Checkout'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Column 2: iPhone 16 Pro Showcase with Integrated Dock (6 Columns) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center relative w-full mt-8 sm:mt-10 lg:mt-0"
        >
          <PhoneMockup onSelectProject={onSelectProject} />
        </motion.div>

      </div>

      {/* Bottom Status & Scroll Indicator Bar */}
      <div className="relative z-30 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-emerald-500/15 pt-4 mt-8">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-pulse" />
          <span>{language === 'ar' ? 'مرّر لأسفل لاستكشاف حلولنا الذكية والمشاريع' : 'SCROLL TO EXPLORE SMART SYSTEMS & WORK'}</span>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#a6ff2e]" />
            <span>{language === 'ar' ? 'تصاميم مخصصة 100%' : '100% Bespoke Code'}</span>
          </div>
        </div>

        <span className="text-[#a6ff2e] font-bold">MUHAB © 2026</span>
      </div>

    </section>
  );
};

export default HeroSection;
