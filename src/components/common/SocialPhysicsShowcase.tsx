import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticSocialDock } from './MagneticSocialDock';
import { useLanguage } from '../../context/LanguageContext';
import { TikTokIcon, InstagramIcon } from './SocialIcons';
import { audioSynth } from '../../utils/audioSynth';
import { getAssetUrl } from '../../utils/assets';
import { 
  Play, 
  ArrowUpRight, 
  Eye, 
  Heart, 
  CheckCircle2, 
  Layers,
  Video,
  BadgeCheck,
  TrendingUp
} from 'lucide-react';

interface SocialProjectPost {
  id: string;
  platform: 'instagram' | 'tiktok';
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  descAr: string;
  descEn: string;
  views: string;
  likes: string;
  image: string;
  url: string;
  tag: string;
}

export const SocialPhysicsShowcase: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'instagram' | 'tiktok'>('all');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  const socialProjects: SocialProjectPost[] = [
    {
      id: 'lavoa-reel',
      platform: 'instagram',
      titleAr: 'كواليس تجربة حجز واستعراض أطباق لاونج لافوا الفاخر',
      titleEn: 'Behind The Scenes: Lavoa Luxury Lounge Booking Architecture',
      categoryAr: 'المطاعم والكافيهات الفاخرة',
      categoryEn: 'Fine Dining & Hospitality',
      descAr: 'هندسة واجهة حجز طاولات سينمائية رفعت نسبة الإشغال إلى 100% دون وسيط.',
      descEn: 'Cinematic table reservation architecture driving 100% occupancy with 0% intermediary cuts.',
      views: '145K',
      likes: '4.2K',
      image: getAssetUrl('assets/projects/lavoa/hero-desktop.png'),
      url: 'https://www.instagram.com/muhabwebmakers?stkn=OTYydnJiejlpN3B2',
      tag: 'Instagram Reel'
    },
    {
      id: 'gotcha-tiktok',
      platform: 'tiktok',
      titleAr: 'منيو رقمي فائق السرعة ضاعف مبيعات استلام السيارة 230%',
      titleEn: 'Ultra-Fast Digital Menu Boosting Drive-Thru Sales by +230%',
      categoryAr: 'سلاسل المشروبات والعصائر',
      categoryEn: 'Specialty Beverage & Drive-Thru',
      descAr: 'استعراض شاشات الطلب الفوري مع Apple Pay لإنهاء المعاملة خلال 15 ثانية فقط.',
      descEn: 'Instant ordering display with Apple Pay completing drive-thru orders in just 15 seconds.',
      views: '290K',
      likes: '8.6K',
      image: getAssetUrl('assets/projects/gotcha/hero-desktop.png'),
      url: 'https://www.tiktok.com/@muhabmebmakers?_r=1&_t=ZS-99jitaEr8Uu',
      tag: 'TikTok Viral'
    },
    {
      id: 'ueno-reel',
      platform: 'instagram',
      titleAr: 'فلسفة الواجهات الهادئة والسرعة القياسية 0.8s لمقهى أوينو ساريو',
      titleEn: 'Minimalist Zen UX & 0.8s Sub-Second Speed for Ueno Saryo',
      categoryAr: 'المقاهي والشاي المتخصص',
      categoryEn: 'Zen Specialty Tea Lounge',
      descAr: 'واجهات مستوحاة من طوكيو ساهمت في حجز جلسات التذوق المتخصصة لأسابيع مقدماً.',
      descEn: 'Tokyo-inspired minimalist interfaces booking out ceremonial tasting sessions weeks in advance.',
      views: '112K',
      likes: '3.8K',
      image: getAssetUrl('assets/icons/speed-crystal.jpg'),
      url: 'https://www.instagram.com/muhabwebmakers?stkn=OTYydnJiejlpN3B2',
      tag: 'Instagram Reel'
    },
    {
      id: 'taqyeemi-tiktok',
      platform: 'tiktok',
      titleAr: 'كواليس برمجة حوامل تقييمي الذكية ونقل الفروع إلى 5 نجوم',
      titleEn: 'Engineering Taqyeemi Smart NFC Hardware for 5-Star Reviews',
      categoryAr: 'حلول السمعة والـ NFC',
      categoryEn: 'Smart Hardware & Reputation',
      descAr: 'لمسة جوال واحدة على الحامل الذكي تفتح تقييم Google فوراً وتتصدر بالفرع محلياً.',
      descEn: 'A single phone tap on the contactless stand opens Google Reviews to lead local rankings.',
      views: '340K',
      likes: '12.1K',
      image: getAssetUrl('taqyeemi-showcase.jpg'),
      url: 'https://www.tiktok.com/@muhabmebmakers?_r=1&_t=ZS-99jitaEr8Uu',
      tag: 'TikTok Tech'
    }
  ];

  const filteredProjects = selectedPlatform === 'all' 
    ? socialProjects 
    : socialProjects.filter(p => p.platform === selectedPlatform);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-6xl mx-auto my-4 py-12 px-4 sm:px-8 lg:px-10 rounded-3xl bg-gradient-to-b from-[#05180f]/90 via-[#030e09]/95 to-[#010604] border border-emerald-500/20 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 scroll-mt-24"
    >
      {/* Top Laser Accent Beam */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#a6ff2e]/80 to-transparent shadow-[0_0_15px_#a6ff2e]" />

      {/* Interactive Cursor Spotlight Glow */}
      {mousePos.active && (
        <div
          className="absolute w-[450px] h-[450px] rounded-full bg-[#a6ff2e]/8 blur-3xl pointer-events-none transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${mousePos.x - 225}px, ${mousePos.y - 225}px)`,
          }}
        />
      )}

      {/* Ambient Radial Lighting */}
      <div className="absolute top-0 start-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-[#a6ff2e]/6 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. Header Section */}
      <div className="relative z-10 flex flex-col items-center text-center mb-10">
        
        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/45 border border-emerald-500/30 text-xs font-semibold text-[#a6ff2e] shadow-sm mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
          </span>
          <span className="tracking-wide">
            {language === 'ar'
              ? 'تغطيات المشاريع الحية • إنستغرام وتيك توك'
              : 'Live Project Showcases • Instagram & TikTok'}
          </span>
        </div>

        {/* Commanding Editorial Headline */}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-normal max-w-4xl mb-3">
          {language === 'ar' ? (
            <>
              شاهد كواليس مشاريعنا ونتائج العملاء{' '}
              <span className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-[#a6ff2e] to-emerald-400 drop-shadow-[0_0_20px_rgba(166,255,46,0.35)]">
                لحظة بلحظة
              </span>
            </>
          ) : (
            <>
              Behind-the-Scenes & Real Client Outcomes{' '}
              <span className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-[#a6ff2e] to-emerald-400">
                In Real Time
              </span>
            </>
          )}
        </h3>

        {/* Explanatory Subtitle */}
        <p className="text-xs sm:text-sm text-slate-300/90 max-w-2xl leading-relaxed">
          {language === 'ar'
            ? 'نوثق يومياً كواليس هندسة المواقع، تجارب رفع المبيعات، واختبارات الأداء الفعلي لمشاريع الشركات والمتاجر في المملكة عبر حساباتنا الرسمية.'
            : 'We document code architecture, conversion rate tests, and sub-second performance audits across our verified official social channels.'}
        </p>
      </div>

      {/* 2. Official Channel Master Hubs (Instagram & TikTok) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 w-full">
        
        {/* Instagram Master Hub */}
        <a
          href="https://www.instagram.com/muhabwebmakers?stkn=OTYydnJiejlpN3B2"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => audioSynth.playHoverBlip()}
          className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#071d13]/85 via-[#04120b]/90 to-[#020705] border border-white/10 hover:border-pink-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_40px_rgba(225,48,108,0.18)] transition-all duration-300 overflow-hidden"
        >
          {/* Subtle Top Ambient Hue */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -top-16 -end-16 w-36 h-36 bg-pink-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-pink-500/20 transition-colors" />

          <div className="mb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl p-[2px] bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[10px] bg-[#0c050a] flex items-center justify-center text-white">
                  <InstagramIcon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-start flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                    Instagram
                  </span>
                  <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span dir="ltr" className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium">
                    @muhabwebmakers
                  </span>
                </div>
                <span className="text-xs text-slate-300 block mt-1">
                  {language === 'ar' ? 'معرض المشاريع والريلز الحصرية' : 'Official Case Study & Project Reels'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Video className="w-3.5 h-3.5 text-pink-400" />
              <span>{language === 'ar' ? 'دراسات حالة موثقة' : 'Verified Case Studies'}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 group-hover:bg-pink-500/20 group-hover:border-pink-500/40 text-[11px] font-semibold text-pink-300 group-hover:text-pink-200 transition-all flex items-center gap-1.5">
              <span>{language === 'ar' ? 'زيارة الحساب الرسمي' : 'Follow on Instagram'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
            </span>
          </div>
        </a>

        {/* TikTok Master Hub */}
        <a
          href="https://www.tiktok.com/@muhabmebmakers?_r=1&_t=ZS-99jitaEr8Uu"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => audioSynth.playHoverBlip()}
          className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#071d13]/85 via-[#04120b]/90 to-[#020705] border border-white/10 hover:border-cyan-400/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_40px_rgba(0,242,254,0.18)] transition-all duration-300 overflow-hidden"
        >
          {/* Subtle Top Ambient Hue */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -top-16 -end-16 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-colors" />

          <div className="mb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl p-[2px] bg-gradient-to-tr from-[#00F2FE] via-[#25F4EE] to-[#FE2C55] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[10px] bg-[#020b0c] flex items-center justify-center text-white">
                  <TikTokIcon className="w-6 h-6" isChromatic={true} />
                </div>
              </div>
              <div className="text-start flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    TikTok
                  </span>
                  <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span dir="ltr" className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium">
                    @muhabmebmakers
                  </span>
                </div>
                <span className="text-xs text-slate-300 block mt-1">
                  {language === 'ar' ? 'كواليس البرمجة واختبارات السرعة' : 'Code Behind-The-Scenes & Speed Tests'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span dir="ltr" className="font-mono font-bold text-white">+180K</span>
              <span>{language === 'ar' ? 'مشاهدات شهرية' : 'Monthly Views'}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/40 text-[11px] font-semibold text-cyan-300 group-hover:text-cyan-200 transition-all flex items-center gap-1.5">
              <span>{language === 'ar' ? 'زيارة الحساب الرسمي' : 'Follow on TikTok'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
            </span>
          </div>
        </a>
      </div>

      {/* 3. Filter Navigation Tabs */}
      <div className="relative z-10 flex items-center justify-between flex-wrap gap-4 pb-4 mb-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#a6ff2e]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            {language === 'ar' ? 'أبرز المشاريع المصورة المنشورة' : 'Featured Video Showcases'}
          </span>
        </div>

        <div className="inline-flex items-center p-1 rounded-xl bg-[#020b06] border border-emerald-500/20 shadow-inner">
          <button
            onClick={() => {
              audioSynth.playHoverBlip();
              setSelectedPlatform('all');
            }}
            className={`relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedPlatform === 'all'
                ? 'bg-[#a6ff2e] text-[#03150d] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? 'جميع التغطيات (4)' : 'All (4)'}
          </button>
          <button
            onClick={() => {
              audioSynth.playHoverBlip();
              setSelectedPlatform('instagram');
            }}
            className={`relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedPlatform === 'instagram'
                ? 'bg-gradient-to-r from-[#FD1D1D] to-[#E1306C] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Instagram (2)
          </button>
          <button
            onClick={() => {
              audioSynth.playHoverBlip();
              setSelectedPlatform('tiktok');
            }}
            className={`relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedPlatform === 'tiktok'
                ? 'bg-cyan-400 text-[#021014] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            TikTok (2)
          </button>
        </div>
      </div>

      {/* 4. Interactive Project Reels Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 items-stretch">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((item, idx) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              onMouseEnter={() => audioSynth.playHoverBlip()}
              className="group/card relative rounded-2xl bg-gradient-to-b from-[#061e13]/85 via-[#03110a]/90 to-[#020604] border border-white/10 hover:border-[#a6ff2e]/50 p-3.5 flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_40px_rgba(166,255,46,0.15)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Media Preview Container */}
              <div className="relative w-full aspect-[4/3.2] rounded-xl overflow-hidden mb-3.5 bg-[#020905]">
                <img 
                  src={item.image} 
                  alt={language === 'ar' ? item.titleAr : item.titleEn}
                  className="w-full h-full object-cover object-center group-hover/card:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Cinematic Ambient Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020a06]/95 via-[#020a06]/35 to-black/20 pointer-events-none" />

                {/* Platform Badge Overlay */}
                <div className="absolute top-2.5 start-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10.5px] font-bold text-white shadow-md">
                  {item.platform === 'instagram' ? (
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                  ) : (
                    <TikTokIcon className="w-3.5 h-3.5" isChromatic={true} />
                  )}
                  <span>{item.tag}</span>
                </div>

                {/* Luxury Frosted Glass Play Orb Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/30 text-white group-hover/card:bg-[#a6ff2e] group-hover/card:text-[#03150d] group-hover/card:border-[#a6ff2e] flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.8)] group-hover/card:shadow-[0_0_25px_rgba(166,255,46,0.7)] group-hover/card:scale-110 transition-all duration-300">
                    <Play className="w-5 h-5 fill-current ml-0.5 rtl:mr-0.5" />
                  </div>
                </div>

                {/* Viewership Metric Pill */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[11px] font-mono font-bold text-white">
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    <Eye className="w-3 h-3 text-[#a6ff2e]" />
                    <span>{item.views}</span>
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-pink-300">
                    <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                    <span>{item.likes}</span>
                  </span>
                </div>
              </div>

              {/* Text Information Body */}
              <div className="flex flex-col flex-1 justify-between text-start">
                <div>
                  <span className="text-[10.5px] font-bold text-emerald-400 tracking-wider uppercase block mb-1.5">
                    {language === 'ar' ? item.categoryAr : item.categoryEn}
                  </span>
                  
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover/card:text-[#a6ff2e] transition-colors leading-snug line-clamp-2 mb-2">
                    {language === 'ar' ? item.titleAr : item.titleEn}
                  </h4>
                  
                  <p className="text-[11.5px] text-slate-300/90 leading-relaxed mb-3">
                    {language === 'ar' ? item.descAr : item.descEn}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#a6ff2e] group-hover/card:text-white transition-colors">
                  <span>{language === 'ar' ? 'مشاهدة الفيديو على المنصة' : 'Watch Full Showcase'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#a6ff2e] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 rtl:group-hover/card:-translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      {/* 5. Minimalist Bottom Action Strip with Magnetic Dock */}
      <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-[#a6ff2e] shrink-0" />
          <span>
            {language === 'ar'
              ? 'هل ترغب بأن يكون موقعك القادم قصة النجاح التالية التي ننشرها على حساباتنا؟'
              : 'Want your upcoming website to be our next featured social media success story?'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <MagneticSocialDock
            size="sm"
            proximityRadius={80}
            maxDisplacement={16}
            showTooltips={false}
            className="bg-[#020b06]/95 border-emerald-500/30 p-2 shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialPhysicsShowcase;
