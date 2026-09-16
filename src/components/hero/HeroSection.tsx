import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { MuhabEmblemImage } from '../common/MuhabLogo';
import { PhoneMockup } from './PhoneMockup';
import { 
  Sparkles, 
  Compass, 
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

  const trustHighlights = [
    {
      icon: Zap,
      image: '/assets/icons/speed-crystal.jpg',
      label: language === 'ar' ? 'سرعة قياسية < 0.8 ثانية' : '< 0.8s Sub-Second Speed',
      detail: language === 'ar' ? 'استجابة فورية فائقة' : 'Ultra Fast Latency',
      color: 'text-[#a6ff2e]'
    },
    {
      icon: ShieldCheck,
      image: '/assets/icons/saudi-shield.jpg',
      label: language === 'ar' ? 'بوابات دفع معتمدة' : 'Verified Gateways',
      detail: language === 'ar' ? 'مدى و Apple Pay' : 'Mada & Apple Pay',
      color: 'text-emerald-400'
    },
    {
      icon: Sparkles,
      image: '/assets/icons/mobile-luxury.jpg',
      label: language === 'ar' ? 'تصاميم مخصصة 100%' : '100% Bespoke Code',
      detail: language === 'ar' ? 'برمجة نقية بدون قوالب' : 'Zero Generic Templates',
      color: 'text-teal-300'
    },
  ];

  return (
    <section 
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#020a06] text-slate-100 flex flex-col justify-between pt-24 sm:pt-28 pb-28 sm:pb-32 lg:pb-8 px-4 sm:px-8 lg:px-12 overflow-hidden selection:bg-[#a6ff2e]/30 selection:text-[#a6ff2e]"
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
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #a6ff2e 1px, transparent 1px), linear-gradient(to bottom, #a6ff2e 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* 1. HUD Telemetry Ribbon (Balanced High-Tech Command Bar) */}
      <div className="relative z-30 mb-2.5 sm:mb-3 py-1.5 sm:py-2 px-3 sm:px-4 rounded-2xl bg-[#041a12]/75 border border-emerald-500/25 backdrop-blur-xl shadow-inner flex items-center justify-between gap-2 text-[10px] sm:text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
          </span>
          <span className="font-bold text-[#a6ff2e]">
            <span className="inline sm:hidden">{language === 'ar' ? 'متصل // سرعة < 0.8 ثانية' : 'ONLINE // 12ms'}</span>
            <span className="hidden sm:inline">{language === 'ar' ? 'الحالة التقنية // متصل • سرعة < 0.8 ثانية' : 'SYS.STATUS // ONLINE • LATENCY 12ms'}</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#072418]/90 border border-[#a6ff2e]/30 text-[11px] font-bold text-slate-100 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#a6ff2e] animate-pulse" />
          <span>
            {language === 'ar' 
              ? 'استوديو مهاب الرقمي • هندسة الأنظمة الفاخرة' 
              : 'MUHAB STUDIO • BESPOKE DIGITAL SYSTEMS'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-300 shrink-0">
          <Compass className="w-3 h-3 text-[#a6ff2e]" />
          <span className="flex items-center gap-1">
            <span>{language === 'ar' ? 'جدة' : 'JEDDAH'}</span>
            <span className="hidden sm:inline">📍</span>
            <span dir="ltr" className="font-mono hidden xs:inline">21°32'N 39°10'E</span>
          </span>
        </div>
      </div>

      {/* 2. Hero Interactive Split Grid (Editorial Column + Dedicated iPhone 16 Pro Mockup Column) */}
      <div className="relative z-20 my-auto max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center py-2 sm:py-4">
        
        {/* Column 1: Editorial Value Proposition & CTAs (Balanced 6 Columns) */}
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
            className="mb-4 sm:mb-6"
          >
            <div className="group relative inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#051a11]/90 border border-emerald-500/30 hover:border-[#a6ff2e]/60 text-xs sm:text-sm font-semibold tracking-wide text-slate-200 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(166,255,46,0.12)] transition-all duration-300">
              {/* Subtle ambient border light sweep */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#a6ff2e]/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative flex items-center justify-center shrink-0">
                <MuhabEmblemImage size={20} className="drop-shadow-[0_0_8px_rgba(166,255,46,0.4)]" />
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
            </div>
          </motion.div>

          {/* Main H1 Headline (Comfortable, Elegant Hierarchy) */}
          <h1 className="text-[22px] xs:text-[25px] sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[46px] font-black text-white tracking-tight leading-[1.3] sm:leading-[1.2] mb-4 sm:mb-5 drop-shadow-xl">
            {language === 'ar' ? (
              <>
                <span className="block text-white">
                  نصمم أفضل المواقع
                </span>
                <span className="block text-slate-100/95 whitespace-normal xl:whitespace-nowrap">
                  والأنظمة الرقمية المخصصة
                </span>
                <div className="relative inline-block mt-0.5">
                  {/* Ambient glowing aura behind "في السعودية" */}
                  <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-emerald-500/15 via-[#a6ff2e]/20 to-teal-400/10 blur-xl rounded-full pointer-events-none -z-10" />
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#a6ff2e] to-teal-200 drop-shadow-[0_0_25px_rgba(166,255,46,0.35)]">
                    في السعودية
                  </span>
                </div>
              </>
            ) : (
              <>
                <span className="block text-white">
                  Bespoke Digital Systems &{' '}
                </span>
                <div className="relative inline-block mt-0.5">
                  <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-emerald-500/15 via-[#a6ff2e]/20 to-teal-400/10 blur-xl rounded-full pointer-events-none -z-10" />
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#a6ff2e] to-teal-200 drop-shadow-[0_0_25px_rgba(166,255,46,0.35)]">
                    High-Velocity Architecture
                  </span>
                </div>
              </>
            )}
          </h1>

          {/* Supporting Description */}
          <p className="text-xs sm:text-sm text-slate-300/90 font-normal leading-[1.8] mb-5 max-w-lg">
            {language === 'ar' ? (
              <>
                استوديو هندسة البرمجيات والواجهات الفاخرة في جدة – نبني منصات ومواقع فائقة الأداء ونطور أنظمة رقمية ذكية لتنمية أعمالك وتوسيع حضورك التجاري.
              </>
            ) : (
              <>
                Jeddah-based digital studio engineering sub-second websites, luxury brand ecosystems, and bespoke SaaS architectures for market leaders.
              </>
            )}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-5 w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="w-full sm:w-auto"
            >
              <button
                id="hero-cta-contact"
                onClick={onOpenContact}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-gradient-to-r from-[#a6ff2e] via-[#b6ff4d] to-[#84cc16] text-[#05140d] font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(166,255,46,0.3)] hover:shadow-[0_0_40px_rgba(166,255,46,0.5)] border border-[#c4ff68] transition-all duration-300 cursor-pointer overflow-hidden select-none"
              >
                {/* Liquid shimmer sweep */}
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
              <a href="#ecosystem" className="block w-full sm:w-auto">
                <button
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-full bg-[#071d15]/90 hover:bg-[#0c2a1e] text-slate-200 hover:text-white border border-[#1f4836] hover:border-[#a6ff2e]/70 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl shadow-sm"
                >
                  <div className="p-1 rounded-full bg-[#051a11] text-[#a6ff2e]">
                    <Layers className="w-3.5 h-3.5 text-[#a6ff2e]" />
                  </div>
                  <span className="font-semibold text-xs sm:text-sm">
                    {language === 'ar' ? 'استكشف شركاتنا والحلول' : t('heroCtaSecondary')}
                  </span>
                </button>
              </a>
            </motion.div>
          </div>

          {/* Executive Social Proof & Trust Strip (Comfortable, Compact) */}
          <div className="relative group w-full max-w-lg mb-5">
            <div className="relative flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-2 gap-x-3 py-2 px-3.5 rounded-xl bg-[#051a11]/90 border border-emerald-500/25 backdrop-blur-xl text-xs">
              {/* 1. Rating */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-white font-mono text-xs">4.9/5</span>
                  <span className="text-slate-400 text-[10px]">
                    {language === 'ar' ? '(+35 مشروع)' : '(35+ Projects)'}
                  </span>
                </div>
              </div>

              <div className="hidden sm:block w-[1px] h-4 bg-emerald-500/30 shrink-0" />

              {/* 2. Lighthouse */}
              <div className="flex items-center gap-1 text-slate-200 shrink-0">
                <div className="p-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                  <Zap className="w-2.5 h-2.5 text-[#a6ff2e]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#a6ff2e] font-mono font-bold text-[11px] leading-none">100/100</span>
                  <span className="text-slate-400 text-[8px] uppercase tracking-wider font-mono">Speed</span>
                </div>
              </div>

              <div className="hidden sm:block w-[1px] h-4 bg-emerald-500/30 shrink-0" />

              {/* 3. Verified Security */}
              <div className="flex items-center gap-1 text-slate-200 shrink-0">
                <ShieldCheck className="w-3 h-3 text-[#a6ff2e]" />
                <span className="text-[10px] text-slate-300 font-medium">
                  {language === 'ar' ? 'Apple Pay ومدى معتمد' : 'Verified Gateways'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Feature Micro-Pills */}
          <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {trustHighlights.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#061e14]/90 border border-emerald-500/20 backdrop-blur-md transition-all duration-200 cursor-default overflow-hidden"
                >
                  <div className="relative w-7 h-7 rounded-lg p-0.5 bg-[#143d2a] border border-emerald-500/30 shrink-0 overflow-hidden flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.label} 
                      className="w-full h-full object-cover rounded-[5px] select-none pointer-events-none"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 justify-center">
                    <span className="text-[10.5px] font-bold text-slate-200 group-hover:text-white transition-colors leading-tight">
                      {item.label}
                    </span>
                    <span className="text-[9px] text-emerald-400/90 font-mono mt-0.5">
                      {item.detail}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Column 2: iPhone 16 Pro Showcase with Integrated Dock (Balanced 6 Columns) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center relative w-full mt-8 sm:mt-10 lg:mt-0"
        >
          {/* The Core iPhone 16 Pro Mockup with Integrated Metrics Dock */}
          <PhoneMockup onSelectProject={onSelectProject} />
        </motion.div>

      </div>

      {/* 3. Bottom Status & Scroll Indicator Bar */}
      <div className="relative z-30 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-emerald-500/15 pt-3">
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
