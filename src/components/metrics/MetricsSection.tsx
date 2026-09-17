import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { SectionHeader } from '../common/SectionHeader';
import { ShapeGrid } from '../common/ShapeGrid';
import { audioSynth } from '../../utils/audioSynth';
import { getAssetUrl } from '../../utils/assets';
import { 
  Activity, 
  Check, 
  X, 
  Sparkles, 
  ShieldAlert, 
  Flame,
  CheckCircle2,
  Server,
  Radio,
  Gauge,
  Monitor,
  Smartphone,
  ShieldCheck
} from 'lucide-react';

export const MetricsSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeDeviceTab, setActiveDeviceTab] = useState<'iphone' | 'android' | 'desktop'>('iphone');
  const [tiltCards, setTiltCards] = useState<Record<string, { rx: number; ry: number; gx: number; gy: number; op: number }>>({
    responsive: { rx: 0, ry: 0, gx: 50, gy: 50, op: 0 },
    speed: { rx: 0, ry: 0, gx: 50, gy: 50, op: 0 },
    cloud: { rx: 0, ry: 0, gx: 50, gy: 50, op: 0 },
  });

  const handleCardMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTiltCards((prev) => ({
      ...prev,
      [id]: {
        rx: -normY * 5,
        ry: normX * 5,
        gx: (x / rect.width) * 100,
        gy: (y / rect.height) * 100,
        op: 0.18,
      },
    }));
  };

  const handleCardMouseLeave = (id: string) => {
    setTiltCards((prev) => ({
      ...prev,
      [id]: { rx: 0, ry: 0, gx: 50, gy: 50, op: 0 },
    }));
  };

  const comparisonRows = [
    {
      custom: t('comparePoint1'),
      template: t('comparePoint1Alt'),
    },
    {
      custom: t('comparePoint2'),
      template: t('comparePoint2Alt'),
    },
    {
      custom: t('comparePoint3'),
      template: t('comparePoint3Alt'),
    },
    {
      custom: t('comparePoint4'),
      template: t('comparePoint4Alt'),
    },
  ];

  const lighthouseCategories = [
    { labelAr: 'الأداء', labelEn: 'Performance', score: 100 },
    { labelAr: 'إمكانية الوصول', labelEn: 'Accessibility', score: 100 },
    { labelAr: 'أفضل الممارسات', labelEn: 'Best Practices', score: 100 },
    { labelAr: 'محركات البحث', labelEn: 'SEO', score: 100 },
  ];

  const deviceData = {
    iphone: {
      nameAr: 'آيفون 16 برو',
      nameEn: 'iPhone 16 Pro',
      refresh: '120 Hz ProMotion',
      latency: '< 0.5 ms',
      cls: '0.00 CLS',
      sublabelAr: 'شاشة Super Retina',
      sublabelEn: 'Super Retina XDR',
    },
    android: {
      nameAr: 'سامسونج S24',
      nameEn: 'Galaxy S24 Ultra',
      refresh: '120 Hz AMOLED',
      latency: '< 0.8 ms',
      cls: '0.00 CLS',
      sublabelAr: 'شاشة Dynamic 2X',
      sublabelEn: 'Dynamic AMOLED',
    },
    desktop: {
      nameAr: 'شاشات Mac و 4K',
      nameEn: 'Retina & UltraWide',
      refresh: '144 Hz UHD',
      latency: '0.0 ms',
      cls: '0.00 CLS',
      sublabelAr: 'دقة فائقة بدون تشويه',
      sublabelEn: 'Wide Canvas View',
    },
  };

  return (
    <section id="metrics" className="relative py-28 bg-[#020a06] overflow-hidden scroll-mt-24">
      {/* Interactive Cybernetic Hexagon ShapeGrid Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto opacity-35 z-0">
        <ShapeGrid
          shape="hexagon"
          squareSize={46}
          speed={0.35}
          direction="diagonal"
          borderColor="rgba(16, 185, 129, 0.16)"
          hoverFillColor="rgba(166, 255, 46, 0.22)"
          hoverTrailAmount={6}
        />
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[550px] bg-emerald-950/25 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[300px] bg-[#a6ff2e]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeText={t('metricsBadge')}
          badgeVariant="mint"
          badgeIcon={<Activity className="w-3.5 h-3.5 text-[#a6ff2e]" />}
          title={t('metricsTitle')}
          subtitle={t('metricsSubtitle')}
        />

        {/* 3 Luxury Engineering Telemetry Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-20 items-stretch">
          
          {/* ========================================================= */}
          {/* CARD 1: 100% SMART MOBILE & TOUCH FIDELITY */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={(e) => handleCardMouseMove('responsive', e)}
            onMouseLeave={() => handleCardMouseLeave('responsive')}
            onMouseEnter={() => audioSynth.playHoverBlip()}
            style={{
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) rotateX(${tiltCards.responsive.rx}deg) rotateY(${tiltCards.responsive.ry}deg)`,
              willChange: 'transform, opacity',
            }}
            className="group relative rounded-3xl bg-gradient-to-b from-[#081e14]/95 via-[#04150d]/95 to-[#010905] backdrop-blur-2xl border border-emerald-500/20 hover:border-[#a6ff2e]/50 p-6 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.55)] hover:shadow-[0_25px_60px_-10px_rgba(166,255,46,0.22)] transition-all duration-300 overflow-hidden"
          >
            {/* Dynamic Specular Glare */}
            <div 
              className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-200 z-10"
              style={{
                background: `radial-gradient(circle 280px at ${tiltCards.responsive.gx}% ${tiltCards.responsive.gy}%, rgba(166, 255, 46, 0.15) 0%, transparent 80%)`,
                opacity: tiltCards.responsive.op,
              }}
            />
            {/* Top Luminous Beam */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#a6ff2e]/50 to-transparent group-hover:via-[#a6ff2e] transition-all duration-500 z-10" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-emerald-500/15">
                <div className="flex items-center gap-3">
                  <div className="relative group/icon w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-br from-[#143d2a] via-[#082216] to-[#020b06] border border-emerald-500/40 group-hover:border-[#a6ff2e] shadow-[0_8px_20px_rgba(0,0,0,0.7),0_0_15px_rgba(166,255,46,0.2)] transition-all duration-300 shrink-0 overflow-hidden flex items-center justify-center">
                    <img 
                      src={getAssetUrl('assets/icons/mobile-luxury.jpg')} 
                      alt="Mobile Architecture"
                      className="w-full h-full object-cover rounded-[14px] transform group-hover/icon:scale-115 transition-transform duration-500 pointer-events-none select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-[14px]" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-emerald-400/90">
                    TELEMETRY // 01
                  </span>
                </div>

                <span className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[#a6ff2e] flex items-center gap-2 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
                  </span>
                  {language === 'ar' ? 'توافق كامل 100%' : '100% Responsive'}
                </span>
              </div>

              {/* Main Metric Callout */}
              <div className="mb-5">
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span 
                    dir="ltr"
                    className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-[#a6ff2e] tracking-tight drop-shadow-[0_0_25px_rgba(166,255,46,0.35)]"
                  >
                    100%
                  </span>
                  <span className="text-xs font-bold text-[#a6ff2e] px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#a6ff2e]" />
                    <span>{language === 'ar' ? 'معتمد رسمياً' : 'VERIFIED'}</span>
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white group-hover:text-[#a6ff2e] transition-colors leading-snug">
                  {language === 'ar' ? 'توافق ذكي مع شاشات الجوال' : 'Smart Mobile Viewport Fidelity'}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {language === 'ar' 
                    ? 'مبني وفق أعلى معايير استجابة الهواتف المحمولة في المملكة مع تجربة لمسية فائقة السلاسة.'
                    : 'Engineered for optimal smartphone UX in Saudi Arabia with zero layout shift.'}
                </p>
              </div>

              {/* Interactive Viewport Console HUD */}
              <div className="p-3.5 rounded-2xl bg-[#021008]/90 border border-emerald-500/20 mb-5 shadow-inner">
                {/* Device Selector Tabs */}
                <div className="flex items-center justify-between gap-1 p-1 rounded-xl bg-black/40 border border-emerald-500/20 mb-3.5">
                  {(['iphone', 'android', 'desktop'] as const).map((tab) => {
                    const isActive = activeDeviceTab === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => {
                          audioSynth.playTelemetryTick();
                          setActiveDeviceTab(tab);
                        }}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                          isActive 
                            ? 'bg-gradient-to-r from-[#a6ff2e] to-[#8ee622] text-[#020b06] shadow-[0_0_15px_rgba(166,255,46,0.35)] font-black' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {tab === 'desktop' ? (
                          <Monitor className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                          <Smartphone className="w-3.5 h-3.5 shrink-0" />
                        )}
                        <span>{tab === 'iphone' ? 'iPhone' : tab === 'android' ? 'Galaxy' : 'Desktop'}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Device Live Telemetry Row */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/15 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 block mb-0.5">
                      {language === 'ar' ? 'الشاشة والتردد' : 'Screen'}
                    </span>
                    <span className="text-xs font-bold text-[#a6ff2e]">
                      {deviceData[activeDeviceTab].refresh}
                    </span>
                    <span className="text-[9px] text-emerald-400/80 mt-0.5">
                      {language === 'ar' ? 'انسيابية فائقة' : 'Ultra Smooth'}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/15 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 block mb-0.5">
                      {language === 'ar' ? 'زمن الاستجابة' : 'Latency'}
                    </span>
                    <span dir="ltr" className="text-xs font-mono font-bold text-white">
                      {deviceData[activeDeviceTab].latency}
                    </span>
                    <span className="text-[9px] text-emerald-400/80 mt-0.5">
                      {language === 'ar' ? 'استجابة فورية' : 'Zero Lag'}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/15 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 block mb-0.5">
                      {language === 'ar' ? 'ثبات المحتوى' : 'CLS'}
                    </span>
                    <span dir="ltr" className="text-xs font-mono font-bold text-emerald-400">
                      {deviceData[activeDeviceTab].cls}
                    </span>
                    <span className="text-[9px] text-[#a6ff2e] mt-0.5 font-bold">
                      {language === 'ar' ? 'ثبات 100%' : 'No Shift'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Feature Points */}
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#a6ff2e] shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {language === 'ar' ? 'عناصر لمسية ذكية ومريحة تلائم حركة اليد الواحدة' : 'Ergonomic touch targets optimized for natural thumb reach'}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#a6ff2e] shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {language === 'ar' ? 'فحص ومطابقة دقيقة على أكثر من 48 مقاس شاشة هاتف ذكي' : 'Verified pixel-perfect layout across 48+ device profiles'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom SLA Pill */}
            <div className="relative z-10 pt-4 mt-5 border-t border-emerald-500/15">
              <div className="p-2.5 rounded-xl bg-[#03150e]/90 border border-emerald-500/20 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#a6ff2e] shrink-0" />
                  <span>
                    {language === 'ar' ? (
                      <>استجابة لمس فورية <span dir="ltr">&lt; 1ms</span> • توافق كامل</>
                    ) : (
                      'Sub-1ms Touch Latency • 48+ Profiles'
                    )}
                  </span>
                </span>
                <span className="text-[10px] font-bold text-[#a6ff2e] px-2 py-0.5 rounded bg-emerald-500/15 shrink-0">
                  PASS
                </span>
              </div>
            </div>
          </motion.div>


          {/* ========================================================= */}
          {/* CARD 2: < 0.8s SUB-SECOND SPEED & GOOGLE LIGHTHOUSE (HERO CARD) */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={(e) => handleCardMouseMove('speed', e)}
            onMouseLeave={() => handleCardMouseLeave('speed')}
            onMouseEnter={() => audioSynth.playHoverBlip()}
            style={{
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) rotateX(${tiltCards.speed.rx}deg) rotateY(${tiltCards.speed.ry}deg)`,
              willChange: 'transform, opacity',
            }}
            className="group relative rounded-3xl bg-gradient-to-b from-[#09261a]/95 via-[#051c12]/95 to-[#010e07] backdrop-blur-2xl border-2 border-[#a6ff2e]/45 hover:border-[#a6ff2e] p-6 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(166,255,46,0.12)] hover:shadow-[0_25px_60px_-10px_rgba(166,255,46,0.3)] transition-all duration-300 overflow-hidden lg:-translate-y-2.5"
          >
            {/* Crown Ambient Lime Radiance */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-60 h-60 bg-[#a6ff2e]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Dynamic Specular Glare */}
            <div 
              className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-200 z-10"
              style={{
                background: `radial-gradient(circle 300px at ${tiltCards.speed.gx}% ${tiltCards.speed.gy}%, rgba(166, 255, 46, 0.22) 0%, transparent 80%)`,
                opacity: tiltCards.speed.op,
              }}
            />
            {/* Top Specular Streak */}
            <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#a6ff2e] to-transparent z-10 shadow-[0_0_20px_#a6ff2e]" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <div className="relative group/icon w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-br from-[#143d2a] via-[#082216] to-[#020b06] border border-[#a6ff2e]/60 shadow-[0_8px_20px_rgba(0,0,0,0.7),0_0_20px_rgba(166,255,46,0.35)] transition-all duration-300 shrink-0 overflow-hidden flex items-center justify-center">
                    <img 
                      src={getAssetUrl('assets/icons/speed-crystal.jpg')} 
                      alt="Sub-Second Speed Crystal"
                      className="w-full h-full object-cover rounded-[14px] transform group-hover/icon:scale-115 transition-transform duration-500 pointer-events-none select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent pointer-events-none rounded-[14px]" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#a6ff2e]">
                    TELEMETRY // 02
                  </span>
                </div>

                <span className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-[#a6ff2e]/20 border border-[#a6ff2e]/50 text-[#a6ff2e] flex items-center gap-1.5 shadow-[0_0_15px_rgba(166,255,46,0.25)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#a6ff2e]" />
                  {language === 'ar' ? 'أسرع من البرق' : 'Sub-Second Speed'}
                </span>
              </div>

              {/* Main Metric Callout */}
              <div className="mb-5">
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span 
                    dir="ltr"
                    className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-[#a6ff2e] tracking-tight drop-shadow-[0_0_30px_rgba(166,255,46,0.45)]"
                  >
                    &lt; 0.8s
                  </span>
                  <span className="text-xs font-bold text-[#a6ff2e] px-2.5 py-0.5 rounded-full bg-[#a6ff2e]/20 border border-[#a6ff2e]/40 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#a6ff2e]" />
                    <span>{language === 'ar' ? 'فائق السرعة' : 'TURBO'}</span>
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white group-hover:text-[#a6ff2e] transition-colors leading-snug">
                  {language === 'ar' ? 'سرعة فتح وتحميل الصفحات' : 'Sub-Second Page Load Velocity'}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {language === 'ar' 
                    ? 'بنية برمجية معمارية تمنحك علامة كاملة 100/100 على اختبارات Google العالمية وشبكات 5G.'
                    : 'Architectural performance securing top Lighthouse 100/100 scores across 5G networks.'}
                </p>
              </div>

              {/* Official Google Lighthouse 100/100 Four-Ring Audit Display */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#021008]/95 border border-[#a6ff2e]/30 mb-5 shadow-inner relative overflow-hidden">
                {/* Header inside HUD box */}
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-emerald-500/15">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#a6ff2e]/20 flex items-center justify-center">
                      <Gauge className="w-3.5 h-3.5 text-[#a6ff2e]" />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">
                      Google Lighthouse Audit
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                      v12.0
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#a6ff2e] bg-[#a6ff2e]/15 px-2.5 py-0.5 rounded-full border border-[#a6ff2e]/40 shadow-sm">
                    100/100 PERFECT
                  </span>
                </div>

                {/* 4 Green Lighthouse Score Rings */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {lighthouseCategories.map((cat, i) => (
                    <div key={i} className="flex flex-col items-center text-center group/ring">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-1">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
                          <defs>
                            <linearGradient id={`lighthouse-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#a6ff2e" />
                              <stop offset="100%" stopColor="#34d399" />
                            </linearGradient>
                          </defs>
                          <circle cx="24" cy="24" r="19" stroke="#092718" strokeWidth="3.5" fill="#03150d" />
                          <circle
                            cx="24"
                            cy="24"
                            r="19"
                            stroke={`url(#lighthouse-grad-${i})`}
                            strokeWidth="3.5"
                            strokeDasharray="119.38"
                            strokeDashoffset="0"
                            strokeLinecap="round"
                            fill="transparent"
                            style={{ filter: 'drop-shadow(0 0 5px rgba(166,255,46,0.65))' }}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-mono font-black text-white group-hover/ring:text-[#a6ff2e] transition-colors">
                          {cat.score}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-200 leading-tight">
                        {language === 'ar' ? cat.labelAr : cat.labelEn}
                      </span>
                      <span className="text-[9px] font-bold text-emerald-400 mt-0.5">
                        {language === 'ar' ? 'ممتاز' : 'Good'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Google Core Web Vitals Micro Indicators */}
                <div className="pt-2 border-t border-emerald-500/15 flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e]" />
                    <span>LCP: <strong className="text-white">0.6s</strong></span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e]" />
                    <span>INP: <strong className="text-white">12ms</strong></span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e]" />
                    <span>CLS: <strong className="text-white">0.00</strong></span>
                  </span>
                </div>
              </div>

              {/* Feature Points */}
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#a6ff2e] shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {language === 'ar' ? 'أسرع بـ 5 أضعاف من قوالب ووردبريس ومواقع الوكالات التقليدية' : '5x faster loading velocity than standard CMS templates'}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#a6ff2e] shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {language === 'ar' ? 'رفع معدل إتمام الشراء والتحويل المباشر لعملائك بنسبة +27%' : 'Boosts checkout conversion and repeat sales by +27%'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom SLA Pill */}
            <div className="relative z-10 pt-4 mt-5 border-t border-emerald-500/20">
              <div className="p-2.5 rounded-xl bg-[#03150e]/95 border border-[#a6ff2e]/30 flex items-center justify-between text-xs text-[#a6ff2e]">
                <span className="flex items-center gap-2 font-bold">
                  <Flame className="w-3.5 h-3.5 text-[#a6ff2e] shrink-0" />
                  <span>
                    {language === 'ar' ? 'معتمد من Core Web Vitals' : 'Core Web Vitals Certified'}
                  </span>
                </span>
                <span className="text-[10px] font-mono font-bold text-[#020b06] bg-[#a6ff2e] px-2 py-0.5 rounded shadow-sm shrink-0">
                  100/100
                </span>
              </div>
            </div>
          </motion.div>


          {/* ========================================================= */}
          {/* CARD 3: 24/7 CLOUD RELIABILITY & SAUDI REGIONAL EDGE */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={(e) => handleCardMouseMove('cloud', e)}
            onMouseLeave={() => handleCardMouseLeave('cloud')}
            onMouseEnter={() => audioSynth.playHoverBlip()}
            style={{
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) rotateX(${tiltCards.cloud.rx}deg) rotateY(${tiltCards.cloud.ry}deg)`,
              willChange: 'transform, opacity',
            }}
            className="group relative rounded-3xl bg-gradient-to-b from-[#081e14]/95 via-[#04150d]/95 to-[#010905] backdrop-blur-2xl border border-emerald-500/20 hover:border-emerald-400/50 p-6 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.55)] hover:shadow-[0_25px_60px_-10px_rgba(52,211,153,0.22)] transition-all duration-300 overflow-hidden"
          >
            {/* Dynamic Specular Glare */}
            <div 
              className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-200 z-10"
              style={{
                background: `radial-gradient(circle 280px at ${tiltCards.cloud.gx}% ${tiltCards.cloud.gy}%, rgba(52, 211, 153, 0.16) 0%, transparent 80%)`,
                opacity: tiltCards.cloud.op,
              }}
            />
            {/* Top Luminous Beam */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent group-hover:via-emerald-400 transition-all duration-500 z-10" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-emerald-500/15">
                <div className="flex items-center gap-3">
                  <div className="relative group/icon w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-br from-[#143d2a] via-[#082216] to-[#020b06] border border-emerald-400/50 shadow-[0_8px_20px_rgba(0,0,0,0.7),0_0_18px_rgba(52,211,153,0.3)] transition-all duration-300 shrink-0 overflow-hidden flex items-center justify-center">
                    <img 
                      src={getAssetUrl('assets/icons/cloud-quantum.jpg')} 
                      alt="Quantum Cloud Server Architecture"
                      className="w-full h-full object-cover rounded-[14px] transform group-hover/icon:scale-115 transition-transform duration-500 pointer-events-none select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent pointer-events-none rounded-[14px]" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-emerald-400/90">
                    TELEMETRY // 03
                  </span>
                </div>

                <span className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 flex items-center gap-2 shadow-sm">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  {language === 'ar' ? 'جاهزية سحابية 99.99%' : 'Continuous Uptime'}
                </span>
              </div>

              {/* Main Metric Callout */}
              <div className="mb-5">
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span 
                    dir="ltr"
                    className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-[#a6ff2e] tracking-tight drop-shadow-[0_0_25px_rgba(52,211,153,0.35)]"
                  >
                    24/7
                  </span>
                  <span className="text-xs font-bold text-emerald-300 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{language === 'ar' ? '99.99% جاهزية' : '99.99% SLA'}</span>
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {language === 'ar' ? 'جاهزية واستقرار سحابي متواصل' : 'Cloud Reliability & Regional Edge'}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {language === 'ar' 
                    ? 'استضافة سريعة على شبكات الـ Edge العالمية مع حماية من الهجمات ودعم فني سعودي مستمر.'
                    : 'High-availability edge network backed by enterprise DDoS shield and 24/7 monitoring.'}
                </p>
              </div>

              {/* Regional Cloud Edge Node HUD Console */}
              <div className="p-3.5 rounded-2xl bg-[#021008]/90 border border-emerald-500/20 mb-5 shadow-inner space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/25 border border-emerald-500/15 hover:border-emerald-500/30 transition-colors">
                  <div className="text-slate-200 flex items-center gap-2 text-xs font-medium">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
                    </span>
                    <span>{language === 'ar' ? 'خوادم الرياض (Riyadh Node)' : 'Riyadh Regional Node'}</span>
                  </div>
                  <span dir="ltr" className="text-[#a6ff2e] font-mono font-bold text-xs px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 shrink-0">
                    11ms • ACTIVE
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/25 border border-emerald-500/15 hover:border-emerald-500/30 transition-colors">
                  <div className="text-slate-200 flex items-center gap-2 text-xs font-medium">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
                    </span>
                    <span>{language === 'ar' ? 'خوادم جدة (Jeddah Node)' : 'Jeddah Regional Node'}</span>
                  </div>
                  <span dir="ltr" className="text-[#a6ff2e] font-mono font-bold text-xs px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 shrink-0">
                    14ms • ACTIVE
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/25 border border-emerald-500/15 hover:border-emerald-500/30 transition-colors">
                  <div className="text-slate-200 flex items-center gap-2 text-xs font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{language === 'ar' ? 'حماية DDoS و SSL سحابي' : 'Cloudflare DDoS Armor'}</span>
                  </div>
                  <span dir="ltr" className="text-emerald-300 font-mono font-bold text-xs px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 shrink-0">
                    SECURE
                  </span>
                </div>
              </div>

              {/* Feature Points */}
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {language === 'ar' ? 'نسخ احتياطي يومي تلقائي مشفر لقواعد البيانات خارج الموقع' : 'Automated daily encrypted off-site cloud database snapshots'}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {language === 'ar' ? 'فريق هندسي سعودي جاهز للتدخل والدعم الفوري على مدار الساعة' : 'Direct dedicated WhatsApp channel with senior Saudi engineers'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom SLA Pill */}
            <div className="relative z-10 pt-4 mt-5 border-t border-emerald-500/15">
              <div className="p-2.5 rounded-xl bg-[#03150e]/90 border border-emerald-500/20 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-2 truncate">
                  <Server className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'ar' ? (
                      <>جاهزية سحابية <span dir="ltr">99.99%</span> • نسخ احتياطي يومي</>
                    ) : (
                      '99.99% SLA • Daily Encrypted Backups'
                    )}
                  </span>
                </span>
                <span className="text-[10px] font-bold text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/15 shrink-0">
                  ACTIVE
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ========================================================= */}
        {/* COMPARISON BOX: MUHAB CUSTOM ENGINEERING VS TRADITIONAL */}
        {/* ========================================================= */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#072116]/80 via-[#04160e]/90 to-[#020b07] backdrop-blur-2xl border border-emerald-500/30 p-6 sm:p-10 shadow-[0_25px_65px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Top luminous shimmer */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#a6ff2e]/60 to-transparent pointer-events-none" />

          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#a6ff2e] uppercase tracking-widest block mb-2 font-mono">
              {language === 'ar' ? '// المقارنة المعمارية والهندسية' : '// Architectural Benchmark Matrix'}
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {t('compareTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'لماذا تتفوق حلول استوديو مهاب المخصصة على قوالب الووردبريس الجاهزة في كل مقياس تقني وتجاري؟' 
                : 'Why MUHAB bespoke digital engineering decisively outperforms off-the-shelf WordPress templates across every metric.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Column 1: MUHAB Studio (Winner - Bespoke Architecture) */}
            <div className="rounded-3xl bg-[#03130c] border-2 border-[#a6ff2e]/60 p-6 sm:p-8 shadow-[0_0_45px_rgba(166,255,46,0.15)] relative overflow-hidden group">
              {/* Corner ambient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#a6ff2e]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Benchmark Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-emerald-500/25 mb-6">
                <div className="flex items-center gap-2.5 text-[#a6ff2e] font-black text-lg sm:text-xl">
                  <div className="w-8 h-8 rounded-xl bg-[#a6ff2e]/15 border border-[#a6ff2e]/40 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#a6ff2e]" />
                  </div>
                  <span>{t('compareCustomTitle')}</span>
                </div>
                <span className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full bg-[#a6ff2e]/20 border border-[#a6ff2e]/50 text-[#a6ff2e] shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-pulse" />
                  {language === 'ar' ? 'المعيار الذهبي' : 'GOLD STANDARD'}
                </span>
              </div>

              <div className="space-y-4">
                {comparisonRows.map((row, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-3 rounded-2xl bg-emerald-950/25 border border-emerald-500/15 hover:border-[#a6ff2e]/40 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-[#a6ff2e]/20 text-[#a6ff2e] border border-[#a6ff2e]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="leading-relaxed font-semibold text-slate-100 text-xs sm:text-sm">{row.custom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Traditional Templates */}
            <div className="rounded-3xl bg-[#010805]/95 border border-white/10 p-6 sm:p-8 opacity-75 hover:opacity-90 transition-opacity">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5 text-slate-300 font-bold text-lg sm:text-xl">
                  <div className="w-8 h-8 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                  </div>
                  <span>{t('compareTemplateTitle')}</span>
                </div>
                <span className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400">
                  {language === 'ar' ? 'مخاطر عالية' : 'LEGACY'}
                </span>
              </div>

              <div className="space-y-4">
                {comparisonRows.map((row, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-3 rounded-2xl bg-red-950/10 border border-red-500/10">
                    <div className="w-6 h-6 rounded-lg bg-red-500/15 text-red-400 border border-red-500/25 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="leading-relaxed text-slate-400 text-xs sm:text-sm">{row.template}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
