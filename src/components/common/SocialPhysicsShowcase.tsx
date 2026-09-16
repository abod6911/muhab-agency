import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticSocialDock } from './MagneticSocialDock';
import { useLanguage } from '../../context/LanguageContext';
import { TikTokIcon, InstagramIcon } from './SocialIcons';
import { audioSynth } from '../../utils/audioSynth';
import { 
  Play, 
  ArrowUpRight, 
  Eye, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  Video
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
      descAr: 'كيف صممنا واجهة حجز طاولات واستعراض قائمة طعام سينمائية زادت نسبة الإشغال إلى 100% دون أي عمولات.',
      descEn: 'Engineering a cinematic reservation & digital dining menu that reached 100% occupancy with 0% intermediary cuts.',
      views: '145K',
      likes: '4.2K',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
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
      descAr: 'تجربة حية وسريعة لشاشات الطلب الفوري مع تكامل Apple Pay ومدى خلال 15 ثانية فقط أثناء ساعات الذروة.',
      descEn: 'Real-time demonstration of high-throughput sub-second ordering with Apple Pay during peak operational hours.',
      views: '290K',
      likes: '8.6K',
      image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=800&q=80',
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
      descAr: 'تحليل عملي لأثر التجربة البسيطة المستوحاة من طوكيو في حجز جلسات تذوق الماتشا النادرة بالكامل لأسابيع قادمة.',
      descEn: 'Analyzing how minimalist Japanese UI principles sold out ceremonial tea tasting flights weeks in advance.',
      views: '112K',
      likes: '3.8K',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
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
      descAr: 'استعراض لمسة الجوال السريعة على حوامل الأكريليك الذكية لفتح نموذج التقييم فوراً وتخطي تقييمات المنافسين على خرائط Google.',
      descEn: 'Behind-the-scenes engineering of contactless NFC smart stands propelling local businesses to top Google rankings.',
      views: '340K',
      likes: '12.1K',
      image: '/taqyeemi-showcase.jpg',
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
      className="relative w-full max-w-6xl mx-auto my-10 py-12 px-5 sm:px-10 lg:px-12 rounded-[36px] bg-gradient-to-b from-[#082217]/90 via-[#04150e]/95 to-[#010905] border border-emerald-500/25 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_50px_rgba(16,185,129,0.1)] overflow-hidden transition-all duration-300 group hover:border-[#a6ff2e]/40"
    >
      {/* Top Luminous Neon Beam */}
      <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#a6ff2e] to-transparent rounded-t-[36px] shadow-[0_0_20px_#a6ff2e]" />

      {/* Interactive Cursor Spotlight Glow */}
      {mousePos.active && (
        <div
          className="absolute w-96 h-96 rounded-full bg-[#a6ff2e]/10 blur-3xl pointer-events-none transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${mousePos.x - 192}px, ${mousePos.y - 192}px)`,
          }}
        />
      )}

      {/* Subtle Background Radial Aura */}
      <div className="absolute top-1/4 -start-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -end-24 w-80 h-80 bg-[#a6ff2e]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. Header Section */}
      <div className="relative z-10 flex flex-col items-center text-center mb-10">
        
        {/* Live Status Pill with Crisp Natural Arabic Typography */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#03150d]/90 border border-emerald-500/30 text-xs font-bold text-[#a6ff2e] shadow-inner mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
          </span>
          <span>
            {language === 'ar'
              ? 'تغطيات المشاريع الحية • إنستغرام وتيك توك'
              : 'Live Projects Showcase • Instagram & TikTok'}
          </span>
        </div>

        {/* Commanding Editorial Headline */}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug max-w-2xl mb-3">
          {language === 'ar' ? (
            <>
              شاهد كواليس مشاريعنا ونتائج العملاء{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a6ff2e] to-emerald-300 drop-shadow-[0_0_25px_rgba(166,255,46,0.3)]">
                لحظة بلحظة
              </span>
            </>
          ) : (
            <>
              Explore Our Live Project Case Studies & Behind The Scenes on{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a6ff2e] to-emerald-300">
                Social Media
              </span>
            </>
          )}
        </h3>

        {/* Explanatory Subtitle */}
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
          {language === 'ar'
            ? 'نوثق يومياً كواليس هندسة المواقع، تجارب رفع المبيعات، واختبارات الأداء الفعلي لمشاريع الشركات والمتاجر في المملكة عبر حساباتنا الرسمية.'
            : 'We actively document website development, sales conversion experiments, and real-world performance tests across our verified official channels.'}
        </p>
      </div>

      {/* 2. Official Channel Master Hubs (Instagram & TikTok) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full">
        
        {/* Instagram Master Hub */}
        <a
          href="https://www.instagram.com/muhabwebmakers?stkn=OTYydnJiejlpN3B2"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => audioSynth.playHoverBlip()}
          className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1b0a16]/85 via-[#120610]/90 to-[#060205] border border-pink-500/30 hover:border-pink-500/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_40px_rgba(225,48,108,0.25)] transition-all duration-300 overflow-hidden"
        >
          {/* Top Accent Gradient Streak */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#E1306C] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[14px] bg-[#0c0509] flex items-center justify-center text-white">
                  <InstagramIcon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-start">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold text-white group-hover:text-pink-300 transition-colors">
                    Instagram
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 font-bold">
                    @muhabwebmakers
                  </span>
                </div>
                <span className="text-xs text-pink-200/70 block mt-0.5 font-medium">
                  {language === 'ar' ? 'معرض المشاريع والريلز الحصرية' : 'Official Portfolio & Case Study Reels'}
                </span>
              </div>
            </div>

            <span className="w-8 h-8 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>

          <div className="pt-3 border-t border-pink-500/15 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-pink-300 font-bold">
              <Video className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'دراسات حالة قبل وبعد' : 'Before & After Showcases'}</span>
            </span>
            <span className="text-[11px] font-medium text-pink-200/80">
              {language === 'ar' ? 'تحديث أسبوعي مستمر' : 'Weekly Project Drops'}
            </span>
          </div>
        </a>

        {/* TikTok Master Hub */}
        <a
          href="https://www.tiktok.com/@muhabmebmakers?_r=1&_t=ZS-99jitaEr8Uu"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => audioSynth.playHoverBlip()}
          className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#06191a]/85 via-[#031112]/90 to-[#020708] border border-cyan-500/30 hover:border-[#00F2FE]/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_40px_rgba(0,242,254,0.2)] transition-all duration-300 overflow-hidden"
        >
          {/* Top Accent Gradient Streak */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-tr from-[#00F2FE] to-[#FE2C55] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[14px] bg-[#020b0c] flex items-center justify-center text-white">
                  <TikTokIcon className="w-6 h-6" isChromatic={true} />
                </div>
              </div>
              <div className="text-start">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    TikTok
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold">
                    @muhabmebmakers
                  </span>
                </div>
                <span className="text-xs text-cyan-200/70 block mt-0.5 font-medium">
                  {language === 'ar' ? 'كواليس البرمجة واختبارات السرعة' : 'Code Behind-The-Scenes & Speed Tests'}
                </span>
              </div>
            </div>

            <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-[#00F2FE] group-hover:text-[#041a12] transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>

          <div className="pt-3 border-t border-cyan-500/15 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
              <span>{language === 'ar' ? 'فيديوهات حصرية سريعة' : 'Viral Speed & UX Demos'}</span>
            </span>
            <span className="text-[11px] font-medium text-cyan-200/80 flex items-center gap-1">
              <span dir="ltr" className="font-mono font-bold">+180K</span>
              <span>{language === 'ar' ? 'مشاهدات شهرية' : 'Monthly Views'}</span>
            </span>
          </div>
        </a>
      </div>

      {/* 3. Filter Navigation Tabs */}
      <div className="relative z-10 flex items-center justify-between flex-wrap gap-3 pb-4 mb-6 border-b border-emerald-500/15">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#a6ff2e]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            {language === 'ar' ? 'أبرز المشاريع المصورة المنشورة' : 'Featured Video Project Showcases'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#03150d] border border-emerald-500/25">
          <button
            onClick={() => {
              audioSynth.playHoverBlip();
              setSelectedPlatform('all');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedPlatform === 'all'
                ? 'bg-[#a6ff2e] text-[#041a12] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? 'الكل' : 'All'}
          </button>
          <button
            onClick={() => {
              audioSynth.playHoverBlip();
              setSelectedPlatform('instagram');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedPlatform === 'instagram'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Instagram
          </button>
          <button
            onClick={() => {
              audioSynth.playHoverBlip();
              setSelectedPlatform('tiktok');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedPlatform === 'tiktok'
                ? 'bg-cyan-500 text-[#021014] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            TikTok
          </button>
        </div>
      </div>

      {/* 4. Interactive Project Reels Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((item, idx) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onMouseEnter={() => audioSynth.playHoverBlip()}
              className="group/reel relative rounded-2xl bg-gradient-to-b from-[#061f14]/90 to-[#020c07]/95 border border-emerald-500/20 hover:border-[#a6ff2e]/60 p-3 flex flex-col justify-between overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_35px_rgba(166,255,46,0.2)] transition-all duration-300"
            >
              {/* Media Preview Container */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-[#020b06]">
                <img 
                  src={item.image} 
                  alt={language === 'ar' ? item.titleAr : item.titleEn}
                  className="w-full h-full object-cover object-center group-hover/reel:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b06]/90 via-[#020b06]/30 to-transparent pointer-events-none" />

                {/* Platform Badge Overlay */}
                <div className="absolute top-2.5 start-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#020a06]/85 backdrop-blur-md border border-emerald-500/30 text-[10px] font-bold text-white shadow-md">
                  {item.platform === 'instagram' ? (
                    <InstagramIcon className="w-3 h-3 text-pink-400" />
                  ) : (
                    <TikTokIcon className="w-3 h-3" isChromatic={true} />
                  )}
                  <span>{item.tag}</span>
                </div>

                {/* Central Glowing Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-[#020b06]/80 border border-[#a6ff2e]/60 group-hover/reel:border-[#a6ff2e] group-hover/reel:bg-[#a6ff2e] text-[#a6ff2e] group-hover/reel:text-[#041a12] flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover/reel:shadow-[0_0_25px_rgba(166,255,46,0.6)] group-hover/reel:scale-115 transition-all duration-300">
                    <Play className="w-4 h-4 fill-current ml-0.5 rtl:mr-0.5" />
                  </div>
                </div>

                {/* Viewership Metric Pill in bottom corner */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[10.5px] font-mono font-bold text-slate-200">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#020a06]/80 backdrop-blur-sm border border-white/10">
                    <Eye className="w-3 h-3 text-[#a6ff2e]" />
                    <span>{item.views}</span>
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#020a06]/80 backdrop-blur-sm border border-white/10 text-pink-300">
                    <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                    <span>{item.likes}</span>
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col flex-1 justify-between text-start">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400/90 uppercase tracking-wider block mb-1">
                    {language === 'ar' ? item.categoryAr : item.categoryEn}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover/reel:text-[#a6ff2e] transition-colors leading-snug line-clamp-2 mb-2">
                    {language === 'ar' ? item.titleAr : item.titleEn}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {language === 'ar' ? item.descAr : item.descEn}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-2 border-t border-emerald-500/15 flex items-center justify-between text-[11px] font-bold text-[#a6ff2e] group-hover/reel:underline">
                  <span>{language === 'ar' ? 'مشاهدة الفيديو على المنصة' : 'Watch on Platform'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#a6ff2e] group-hover/reel:translate-x-0.5 group-hover/reel:-translate-y-0.5 rtl:group-hover/reel:-translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      {/* 5. Minimalist Bottom Action Strip with Magnetic Dock */}
      <div className="relative z-10 pt-6 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
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
            className="bg-[#03150e]/95 border-emerald-500/35 p-2 shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialPhysicsShowcase;

