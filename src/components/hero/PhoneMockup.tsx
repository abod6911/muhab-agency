import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { projects } from '../../data/portfolioData';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Star, 
  ShoppingBag, 
  CheckCircle2,
  Battery,
  Wifi,
  Signal,
  Zap,
  TrendingUp,
  Coffee,
  UtensilsCrossed,
  Sparkles,
  Flame
} from 'lucide-react';


import { audioSynth } from '../../utils/audioSynth';

interface PhoneMockupProps {
  onSelectProject: (projectId: string) => void;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ onSelectProject }) => {
  const { language, isRTL } = useLanguage();
  // We showcase the 4 authentic flagship projects from muhab.org: Gotcha Tea, Al-Khal, Ueno Saryo, Lavoa Lounge
  const showcaseProjects = projects.slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const current = showcaseProjects[currentIndex];
  const preview = current.devicePreview;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + showcaseProjects.length) % showcaseProjects.length);
  };

  // Auto slide every 8 seconds if idle and not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseProjects.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [showcaseProjects.length, isPaused]);

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative flex flex-col items-center justify-center w-full max-w-[290px] xs:max-w-[305px] sm:max-w-[320px] xl:max-w-[335px] mx-auto select-none"
    >
      {/* Flagship Segmented Capsule Control Bar (Unified, Perfectly Aligned) */}
      <div className="w-full mb-3.5 bg-[#051a11]/95 border border-emerald-500/35 rounded-2xl p-1 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.6)] z-30">
        <div className="grid grid-cols-4 gap-1 w-full">
          {showcaseProjects.map((p, idx) => {
            const isActive = currentIndex === idx;
            const shortTitle = language === 'ar' 
              ? (p.id === 'gotcha-fresh-tea' ? 'جوتشا' : p.id === 'alkhal-aldimashki' ? 'الخال' : p.id === 'ueno-saryo' ? 'أوينو' : 'لافوا')
              : (p.id === 'gotcha-fresh-tea' ? 'Gotcha' : p.id === 'alkhal-aldimashki' ? 'Al-Khal' : p.id === 'ueno-saryo' ? 'Ueno' : 'Lavoa');
            
            const renderTabIcon = () => {
              if (idx === 0) return <Coffee className="w-3.5 h-3.5" />;
              if (idx === 1) return <UtensilsCrossed className="w-3.5 h-3.5" />;
              if (idx === 2) return <Flame className="w-3.5 h-3.5" />;
              return <Sparkles className="w-3.5 h-3.5" />;
            };

            return (
              <button
                key={p.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  audioSynth.playHoverBlip();
                }}
                className={`relative py-2 px-1 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 overflow-hidden select-none ${
                  isActive
                    ? 'text-[#020704] font-black'
                    : 'text-slate-300 hover:text-white hover:bg-emerald-500/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSegmentIndicator"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#a6ff2e] via-[#84cc16] to-[#a6ff2e] shadow-[0_0_18px_rgba(166,255,46,0.65)]"
                    transition={{ type: 'spring', damping: 24, stiffness: 350 }}
                  />
                )}
                <span className="relative z-10">{renderTabIcon()}</span>
                <span className="relative z-10 text-[11px] truncate tracking-tight">{shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ambient background glow behind the phone */}
      <div 
        className="absolute -inset-4 sm:-inset-8 rounded-[60px] opacity-40 blur-3xl pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, #a6ff2e33 0%, rgba(15, 40, 20, 0.4) 50%, transparent 80%)`,
        }}
      />

      {/* Floating Spatial Card 1: Sub-second Google Score (Top Outer Flank) */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:flex absolute top-10 -end-6 xl:-end-12 z-40 items-center gap-2.5 p-2.5 rounded-2xl bg-[#041a12]/95 border border-[#a6ff2e]/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(166,255,46,0.25)] select-none hover:scale-105 transition-transform"
      >
        <div className="w-7 h-7 rounded-xl bg-[#a6ff2e]/15 border border-[#a6ff2e]/35 flex items-center justify-center text-[#a6ff2e] shadow-sm">
          <Zap className="w-3.5 h-3.5 fill-[#a6ff2e]" />
        </div>
        <div className="flex flex-col text-start">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-ping" />
            <span className="text-[9px] font-mono text-[#a6ff2e] font-bold tracking-wider">LIGHTHOUSE 100</span>
          </div>
          <span className="text-[11px] font-black text-white whitespace-nowrap">
            {language === 'ar' ? 'سرعة قياسية < 0.8s' : 'Sub-Second < 0.8s'}
          </span>
        </div>
      </motion.div>

      {/* Floating Spatial Card 2: Growth & Payment Gateway (Bottom-Start Flank) */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="hidden lg:flex absolute bottom-24 -start-6 xl:-start-12 z-40 items-center gap-2.5 p-2.5 rounded-2xl bg-[#041a12]/95 border border-emerald-500/35 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.2)] select-none hover:scale-105 transition-transform"
      >
        <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400 shadow-sm">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div className="flex flex-col text-start">
          <span className="text-[9px] font-mono text-emerald-400 font-bold tracking-wider">
            {language === 'ar' ? 'نمو المبيعات' : 'SALES ROI'}
          </span>
          <span className="text-[11px] font-black text-white whitespace-nowrap">
            {language === 'ar' ? '+140% • Apple Pay' : '+140% • Apple Pay'}
          </span>
        </div>
      </motion.div>

      {/* =========================================================================
          VIEW A: MOBILE NATIVE LUXURY SHOWCASE CARD (lg:hidden)
          Clean, borderless, zero fake status bar, no double-phone clipping
      ========================================================================== */}
      <div className="block lg:hidden w-full relative z-20">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#051c12]/95 via-[#03130c]/98 to-[#020a06] border border-emerald-500/35 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(166,255,46,0.12)] backdrop-blur-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + '-mobile'}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              {/* Header: Project Badge & Verified Rating */}
              <div className="flex items-center justify-between mb-2.5">
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
                  style={{
                    backgroundColor: `${current.accentColor}15`,
                    borderColor: `${current.accentColor}40`,
                    color: current.accentColor,
                  }}
                >
                  {language === 'ar' ? preview.badgeAr : preview.badgeEn}
                </span>

                <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-full border border-white/10 text-xs">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white text-[11px]">{preview.rating}</span>
                  <span className="text-[10px] text-slate-400">({preview.reviewCount})</span>
                </div>
              </div>

              {/* Showcase Image with Glowing Tag */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-3 border border-emerald-500/25">
                <img
                  src={current.image}
                  alt={current.titleAr}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020a06]/95 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 inset-inline-start-2.5 text-[10px] font-black bg-[#020a06]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[#a6ff2e] border border-emerald-500/30">
                  {language === 'ar' ? preview.highlightTagAr : preview.highlightTagEn}
                </span>
              </div>

              {/* Project Title & Price/Metric */}
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h4 className="text-sm font-black text-white leading-snug truncate">
                  {language === 'ar' ? preview.heroTitleAr : preview.heroTitleEn}
                </h4>
                <span className="text-xs font-black text-[#a6ff2e] shrink-0 font-mono">
                  {language === 'ar' ? preview.priceTagAr : preview.priceTagEn}
                </span>
              </div>

              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-2.5">
                {language === 'ar' ? current.descAr : current.descEn}
              </p>

              {/* Bullet Features (High-Trust Points) */}
              <div className="space-y-1 mb-3 bg-[#072418]/60 p-2.5 rounded-xl border border-emerald-500/15">
                {(language === 'ar' ? preview.subItemsAr : preview.subItemsEn).slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-200">
                    <CheckCircle2 className="w-3 h-3 text-[#a6ff2e] shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>

              {/* High-Contrast Interactive CTA Button */}
              <button
                onClick={() => {
                  try { audioSynth.playHarmonicSuccess(); } catch {}
                  onSelectProject(current.id);
                }}
                className="w-full py-3 rounded-xl font-black text-xs text-[#020b06] bg-[#a6ff2e] hover:bg-[#8ee622] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(166,255,46,0.35)] active:scale-98 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? preview.ctaTextAr : preview.ctaTextEn}</span>
                <ExternalLink className="w-3.5 h-3.5 ms-1 opacity-70" />
              </button>

              {/* Integrated Bottom Pagination & Speed Badge */}
              <div className="mt-3 pt-2.5 border-t border-emerald-500/15 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={() => {
                    try { audioSynth.playHoverBlip(); } catch {}
                    if (isRTL) { nextSlide(); } else { prevSlide(); }
                  }}
                  className="p-1 rounded-lg hover:text-[#a6ff2e] active:scale-90 transition-colors"
                  aria-label="Previous Slide"
                >
                  {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <div className="flex items-center gap-1.5">
                  {showcaseProjects.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        try { audioSynth.playHoverBlip(); } catch {}
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentIndex === idx
                            ? 'w-4 bg-[#a6ff2e] shadow-[0_0_8px_#a6ff2e]'
                          : 'w-1.5 bg-[#234939]'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    try { audioSynth.playHoverBlip(); } catch {}
                    if (isRTL) { prevSlide(); } else { nextSlide(); }
                  }}
                  className="p-1 rounded-lg hover:text-[#a6ff2e] active:scale-90 transition-colors"
                  aria-label="Next Slide"
                >
                  {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Micro-Telemetry Badge on Mobile */}
              <div className="mt-2 text-center">
                <span className="text-[10px] font-mono text-[#a6ff2e]/80">
                  {language === 'ar' ? '⚡ استجابة < 0.8 ثانية • معتمد بنسبة 100%' : '⚡ < 0.8s Sub-Second Speed • 100% Certified'}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* =========================================================================
          VIEW B: DESKTOP iPHONE 16 PRO TITANIUM CHASSIS FRAME (hidden lg:block)
          Authentic slender, elongated iPhone 16 Pro silhouette (19.5:9 Golden Ratio)
      ========================================================================== */}
      <div className="hidden lg:block relative w-[280px] xl:w-[295px] h-[585px] xl:h-[615px] bg-gradient-to-b from-[#24332a] via-[#101713] to-[#070c09] p-[8.5px] rounded-[52px] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.12),0_0_45px_rgba(166,255,46,0.15)] border border-[#2a3c32]/80 transition-all duration-300 hover:shadow-[0_35px_100px_-10px_rgba(0,0,0,0.95),0_0_0_1px_rgba(166,255,46,0.3),0_0_60px_rgba(166,255,46,0.25)]">
        
        {/* Hardware side buttons - Precision iPhone 16 Pro Titanium */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-6 bg-[#2e4035] rounded-l-sm border-l border-white/25 shadow-sm" title="Action Button" />
        <div className="absolute -left-[3px] top-34 w-[3px] h-10 bg-[#25352b] rounded-l-sm border-l border-white/10" title="Volume Up" />
        <div className="absolute -left-[3px] top-48 w-[3px] h-10 bg-[#25352b] rounded-l-sm border-l border-white/10" title="Volume Down" />
        
        <div className="absolute -right-[3px] top-32 w-[3px] h-14 bg-[#25352b] rounded-r-sm border-r border-white/10" title="Side Button" />
        <div className="absolute -right-[2.5px] top-54 w-[2.5px] h-12 bg-[#1e2a22] rounded-r-sm border-r border-[#a6ff2e]/40 shadow-[0_0_8px_rgba(166,255,46,0.2)]" title="Camera Control" />

        {/* Screen Bezel & Container (Ultra-thin symmetrical 1.15mm bezel) */}
        <div className="relative w-full h-full bg-[#020905] rounded-[44px] overflow-hidden flex flex-col justify-between border border-black/80 ring-1 ring-white/5">
          
          {/* Status Bar */}
          <div className="relative z-30 pt-2.5 px-4 flex items-center justify-between text-slate-300 text-[10px] font-semibold tracking-tight">
            <span className="font-mono text-[11px] font-bold text-slate-200">20:59</span>

            {/* Dynamic Island Pill with Interactive Status */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-24 h-5.5 bg-black rounded-full flex items-center justify-between px-2 shadow-inner border border-white/10 z-40 group cursor-default">
              {/* TrueDepth Lens */}
              <div className="w-2 h-2 rounded-full bg-[#041009] flex items-center justify-center border border-white/10">
                <div className="w-1 h-1 rounded-full bg-emerald-400/90 shadow-[0_0_6px_#a6ff2e]" />
              </div>
              {/* Micro Live Wave */}
              <div className="flex items-center gap-0.5 opacity-80">
                <span className="w-0.5 h-1.5 bg-[#a6ff2e] rounded-full animate-pulse" />
                <span className="w-0.5 h-2.5 bg-[#a6ff2e] rounded-full animate-pulse delay-75" />
                <span className="w-0.5 h-1 bg-[#a6ff2e] rounded-full animate-pulse delay-150" />
              </div>
              {/* Front Camera */}
              <div className="w-2 h-2 rounded-full bg-[#0b1622] border border-blue-500/20" />
            </div>

            <div className="flex items-center gap-1 text-slate-200">
              <Signal className="w-2.5 h-2.5 text-slate-300" />
              <Wifi className="w-2.5 h-2.5 text-slate-300" />
              <div className="flex items-center gap-0.5 text-[#a6ff2e]">
                <Battery className="w-3 h-3 fill-[#a6ff2e]" />
              </div>
            </div>
          </div>

          {/* Screen Content Slider with Animation */}
          <div className="relative flex-1 overflow-hidden pt-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.96, y: 12, filter: 'blur(3px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.02, y: -8, filter: 'blur(3px)' }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full flex flex-col justify-between p-4"
              >
                {/* App Header */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md border"
                      style={{
                        backgroundColor: `${current.accentColor}15`,
                        borderColor: `${current.accentColor}35`,
                        color: current.accentColor,
                      }}
                    >
                      {language === 'ar' ? preview.badgeAr : preview.badgeEn}
                    </span>

                    <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full border border-white/5">
                      <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-bold text-white">{preview.rating}</span>
                      <span className="text-[9px] text-slate-400">({preview.reviewCount})</span>
                    </div>
                  </div>

                  {/* Product Hero Image / Showcase Card */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-2.5 border border-[#1b4d3b] group">
                    <img 
                      src={current.image} 
                      alt={current.titleAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020a06] via-transparent to-black/20" />
                    
                    <span className="absolute bottom-2 inset-inline-start-2 text-[10px] font-bold bg-[#020a06]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[#a6ff2e] border border-[#1b4d3b]">
                      {language === 'ar' ? preview.highlightTagAr : preview.highlightTagEn}
                    </span>
                  </div>

                  {/* Product Title & Highlight Metrics */}
                  <h4 className="text-sm font-extrabold text-white leading-snug mb-1">
                    {language === 'ar' ? preview.heroTitleAr : preview.heroTitleEn}
                  </h4>

                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-2.5">
                    {language === 'ar' ? current.descAr : current.descEn}
                  </p>

                  {/* Feature Sub-items list (2 high-impact verified items) */}
                  <div className="space-y-1 mb-2.5">
                    {(language === 'ar' ? preview.subItemsAr : preview.subItemsEn).slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-[#a6ff2e] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom App Action Bar with Price & Checkout CTA */}
                <div className="pt-2 border-t border-[#1b4d3b]/30 bg-[#12261e]/90 backdrop-blur-md -mx-4 -mb-4 p-2.5 rounded-b-[40px]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-slate-400">
                      {language === 'ar' ? 'السعر الشامل' : 'Total Price'}
                    </span>
                    <span className="text-xs font-black text-[#a6ff2e]">
                      {language === 'ar' ? preview.priceTagAr : preview.priceTagEn}
                    </span>
                  </div>

                  <button 
                    onClick={() => {
                      try { audioSynth.playHarmonicSuccess(); } catch {}
                      onSelectProject(current.id);
                    }}
                    className="w-full py-2.5 rounded-full font-black text-xs text-[#05140c] bg-gradient-to-r from-[#a6ff2e] via-[#b6ff4d] to-[#84cc16] hover:brightness-110 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(166,255,46,0.4)] active:scale-98 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? preview.ctaTextAr : preview.ctaTextEn}</span>
                  </button>

                  <div className="text-center mt-1">
                    <span className="text-[9px] text-[#a6ff2e]/80">
                      {language === 'ar' ? preview.primaryMetricAr : preview.primaryMetricEn}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="relative z-30 pb-2 flex justify-center pointer-events-none">
            <div className="w-28 h-1 bg-white/40 rounded-full" />
          </div>

          {/* Screen Glass Glare Diagonal Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Unified Executive Project Dock (Single-Row Glass Capsule) */}
      <div className="hidden lg:flex mt-3.5 items-center justify-between w-full bg-[#051a11]/95 border border-emerald-500/35 px-3 py-2 rounded-2xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.7)] gap-2.5 z-30">
        {/* Active Project Info */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-7 h-7 rounded-xl bg-[#020b06] border border-emerald-500/30 flex items-center justify-center shrink-0 text-[#a6ff2e]">
            {currentIndex === 0 && <Coffee className="w-3.5 h-3.5" />}
            {currentIndex === 1 && <UtensilsCrossed className="w-3.5 h-3.5" />}
            {currentIndex === 2 && <Flame className="w-3.5 h-3.5" />}
            {currentIndex === 3 && <Sparkles className="w-3.5 h-3.5" />}
          </div>
          <div className="flex flex-col min-w-0 text-start">
            <span className="text-xs font-bold text-white truncate">
              {language === 'ar' ? current.titleAr.split('|')[0].trim() : current.titleEn.split('|')[0].trim()}
            </span>
            <span className="text-[10px] text-emerald-400/90 font-medium truncate">
              {language === 'ar' ? current.categoryLabelAr : current.categoryLabelEn}
            </span>
          </div>
        </div>

        {/* Direct Live Preview Button */}
        <button
          onClick={() => {
            try { audioSynth.playHarmonicSuccess(); } catch {}
            onSelectProject(current.id);
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-[#05140d] bg-gradient-to-r from-[#a6ff2e] to-[#8ee622] hover:brightness-110 px-3.5 py-1.5 rounded-xl transition-all active:scale-95 shadow-[0_0_12px_rgba(166,255,46,0.3)] shrink-0 cursor-pointer"
        >
          <span>{language === 'ar' ? 'معاينة حية' : 'Live Demo'}</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

