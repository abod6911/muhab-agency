import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { 
  MessageSquare, 
  Phone, 
  Clock, 
  Star, 
  ArrowUpRight,
  Flame 
} from 'lucide-react';
import { ParticleWaveCanvas } from '../common/ParticleWaveCanvas';
import { audioSynth } from '../../utils/audioSynth';
import { getAssetUrl } from '../../utils/assets';

interface ConsultationBannerProps {
  onOpenContact: () => void;
}

export const ConsultationBanner: React.FC<ConsultationBannerProps> = ({ onOpenContact }) => {
  const { t, language } = useLanguage();

  // 3D Perspective Spring Tilt for VIP Studio Seal Card
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 350, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 350, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 14);
    rotateY.set(x * 14);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handlePrimaryClick = () => {
    try {
      audioSynth.playHarmonicSuccess();
    } catch {
      // Fallback
    }
    onOpenContact();
  };

  const handleHoverSound = () => {
    try {
      audioSynth.playHoverBlip();
    } catch {
      // Fallback
    }
  };

  return (
    <section id="consultation" className="relative py-20 sm:py-32 scroll-mt-24 bg-[#020704] overflow-hidden">
      {/* Interactive Particle Wave Physics Background */}
      <ParticleWaveCanvas 
        className="absolute inset-0 w-full h-full pointer-events-auto opacity-50 z-0" 
        repulsionRadius={160}
      />

      {/* Ambient background neon beams */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#a6ff2e]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-[#08281b]/95 via-[#03150e]/95 to-[#010905]/98 border border-emerald-500/30 p-7 sm:p-12 lg:p-14 overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.9),0_0_60px_rgba(16,185,129,0.15)]"
        >
          {/* Top Specular Shimmer Edge Beam */}
          <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#a6ff2e] to-transparent rounded-t-[36px] shadow-[0_0_20px_#a6ff2e]" />
          
          {/* Subtle Ambient Radial Blooms inside Card */}
          <div className="absolute -top-24 -start-24 w-96 h-96 bg-[#a6ff2e]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -end-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Grid Layout: Main Message & Actions (7 Cols) + VIP Hologram Card (5 Cols) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Wing (lg:col-span-7): Headline, Guarantees & Primary Action */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start">
              
              {/* Executive Availability Status Bar */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 p-1.5 px-3.5 rounded-full bg-[#03150d]/90 border border-emerald-500/30 backdrop-blur-xl mb-6 shadow-inner text-xs">
                <div className="flex items-center gap-2 text-[#a6ff2e] font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
                  </span>
                  <span>{language === 'ar' ? 'حجوزات الاستوديو مفتوحة' : 'Studio Intake Active'}</span>
                </div>
                <span className="text-emerald-500/40 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'ar' ? 'متبقي مشروعين فقط هذا الشهر' : '2 Priority Slots Left'}</span>
                </div>
                <span className="text-emerald-500/40 hidden md:inline">•</span>
                <div className="hidden md:flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#a6ff2e]" />
                  <span>{language === 'ar' ? 'رد سريع < 15 دقيقة' : '< 15m Fast Response'}</span>
                </div>
              </div>

              {/* Main Cinematic Heading */}
              <h3 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black text-white leading-[1.2] tracking-tight mb-5">
                <span>{language === 'ar' ? 'جاهز لنقل علامتك التجارية إلى' : 'Ready to elevate your brand to an'}</span>{' '}
                <span className="block mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a6ff2e] to-emerald-300 drop-shadow-[0_0_35px_rgba(166,255,46,0.35)]">
                  {language === 'ar' ? 'القمة الرقمية الاستثنائية؟' : 'exceptional digital echelon?'}
                </span>
              </h3>

              {/* Persuasive Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-7 font-normal">
                {language === 'ar' 
                  ? 'تواصل مباشرة مع استوديو مهاب، ودعنا نبتكر ونهندس منصتك الرقمية القادمة بأرقى معايير التقنية العالمية، بهندسة معمارية تضمن مضاعفة معدلات التحويل وترسيخ هيبة ومكانة علامتك.' 
                  : 'Connect directly with MUHAB Studio. Let us engineer your upcoming bespoke flagship digital platform with cutting-edge tech that maximizes conversion and brand prestige.'}
              </p>

              {/* 3 Executive Trust Pillars with Prominent 3D Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8 w-full">
                {/* Pillar 1 */}
                <div className="group/pillar relative flex items-center gap-3.5 p-3.5 rounded-2xl bg-gradient-to-b from-[#072418]/90 via-[#03150e]/90 to-[#010905] border border-emerald-500/25 hover:border-[#a6ff2e]/60 transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_25px_rgba(166,255,46,0.2)] overflow-hidden">
                  <div className="relative w-12 h-12 rounded-xl p-0.5 bg-gradient-to-br from-[#143d2a] via-[#082216] to-[#020b06] border border-emerald-500/40 group-hover/pillar:border-[#a6ff2e] shrink-0 overflow-hidden shadow-md">
                    <img 
                      src={getAssetUrl('assets/icons/saudi-shield.jpg')} 
                      alt="Official SLA" 
                      className="w-full h-full object-cover rounded-[10px] group-hover/pillar:scale-115 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent pointer-events-none rounded-[10px]" />
                  </div>
                  <div className="flex flex-col text-start min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-white group-hover/pillar:text-[#a6ff2e] transition-colors leading-snug">
                      {language === 'ar' ? 'عقد رسمي وضمان تسليم' : 'Official SLA & Contract'}
                    </span>
                    <span className="text-[10px] text-emerald-400/80 font-mono mt-0.5">
                      {language === 'ar' ? 'موثق ومحمي نظامياً' : 'Legally Enforced SLA'}
                    </span>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="group/pillar relative flex items-center gap-3.5 p-3.5 rounded-2xl bg-gradient-to-b from-[#072418]/90 via-[#03150e]/90 to-[#010905] border border-emerald-500/25 hover:border-[#a6ff2e]/60 transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_25px_rgba(166,255,46,0.2)] overflow-hidden">
                  <div className="relative w-12 h-12 rounded-xl p-0.5 bg-gradient-to-br from-[#143d2a] via-[#082216] to-[#020b06] border border-[#a6ff2e]/50 group-hover/pillar:border-[#a6ff2e] shrink-0 overflow-hidden shadow-md">
                    <img 
                      src={getAssetUrl('assets/icons/speed-crystal.jpg')} 
                      alt="Sub-second Speed" 
                      className="w-full h-full object-cover rounded-[10px] group-hover/pillar:scale-115 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent pointer-events-none rounded-[10px]" />
                  </div>
                  <div className="flex flex-col text-start min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-white group-hover/pillar:text-[#a6ff2e] transition-colors leading-snug">
                      {language === 'ar' ? 'سرعة فائقة < 0.8s' : '< 0.8s Sub-Second'}
                    </span>
                    <span className="text-[10px] text-emerald-400/80 font-mono mt-0.5">
                      {language === 'ar' ? 'صفر قوالب جاهزة' : 'Zero Generic Bloat'}
                    </span>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="group/pillar relative flex items-center gap-3.5 p-3.5 rounded-2xl bg-gradient-to-b from-[#072418]/90 via-[#03150e]/90 to-[#010905] border border-emerald-500/25 hover:border-[#a6ff2e]/60 transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_25px_rgba(166,255,46,0.2)] overflow-hidden">
                  <div className="relative w-12 h-12 rounded-xl p-0.5 bg-gradient-to-br from-[#143d2a] via-[#082216] to-[#020b06] border border-emerald-500/40 group-hover/pillar:border-[#a6ff2e] shrink-0 overflow-hidden shadow-md">
                    <img 
                      src={getAssetUrl('assets/icons/seo-growth.jpg')} 
                      alt="Free Strategy" 
                      className="w-full h-full object-cover rounded-[10px] group-hover/pillar:scale-115 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent pointer-events-none rounded-[10px]" />
                  </div>
                  <div className="flex flex-col text-start min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-white group-hover/pillar:text-[#a6ff2e] transition-colors leading-snug">
                      {language === 'ar' ? 'استشارة مجانية 100%' : '100% Free Strategy'}
                    </span>
                    <span className="text-[10px] text-emerald-400/80 font-mono mt-0.5">
                      {language === 'ar' ? 'مخطط فني ومعماري' : 'Bespoke Architecture'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Hub: High Impact WhatsApp CTA + Direct Call */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
                <button
                  onClick={handlePrimaryClick}
                  onMouseEnter={handleHoverSound}
                  className="relative group/btn flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl font-black text-sm text-[#041a12] bg-gradient-to-r from-[#a6ff2e] via-[#b8ff4f] to-[#a6ff2e] hover:brightness-105 shadow-[0_0_35px_rgba(166,255,46,0.45),0_10px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(166,255,46,0.7)] active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  <MessageSquare className="w-5 h-5 text-[#041a12] fill-[#041a12]" />
                  <span>{t('consultationCta')}</span>
                </button>

                <a
                  href="tel:+966565114955"
                  onMouseEnter={handleHoverSound}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-xs text-slate-200 hover:text-white bg-[#051a11] hover:bg-[#0c261b] border border-emerald-500/30 hover:border-[#a6ff2e]/60 active:scale-95 transition-all shadow-md"
                >
                  <Phone className="w-4 h-4 text-[#a6ff2e]" />
                  <span dir="ltr" className="font-mono tracking-wider font-bold">+966 56 511 4955</span>
                </a>
              </div>

              {/* Micro Status Hint */}
              <div className="mt-4 flex items-center justify-center lg:justify-start gap-2.5 text-xs text-slate-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
                </span>
                <span className="font-medium text-slate-300">
                  {language === 'ar' 
                    ? 'فريق مهاب متصل الآن • جاهزون لبدء مناقشة فكرة مشروعك وتقديم الرؤية الهندسية فورياً' 
                    : 'MUHAB engineering team online now • Ready to consult on your project'}
                </span>
              </div>
            </div>

            {/* Right Wing (lg:col-span-5): 3D Perspective Obsidian Titanium VIP Sovereign Pass */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleHoverSound}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full max-w-[390px] rounded-3xl bg-gradient-to-b from-[#0c261b]/95 via-[#061911]/95 to-[#020d07] border border-emerald-500/40 p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(166,255,46,0.15)] group overflow-hidden transition-all duration-300"
              >
                {/* Ambient Backlight Glow behind the card */}
                <div className="absolute -top-10 -end-10 w-48 h-48 bg-[#a6ff2e]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#a6ff2e]/35 transition-colors duration-500" />

                {/* Diagonal Specular Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent pointer-events-none rounded-3xl" />

                {/* Physical 3D Titanium Pass Visual Showcase */}
                <div 
                  className="relative w-full aspect-[1/1] rounded-2xl overflow-hidden p-0.5 bg-gradient-to-br from-[#1b4d36] via-[#092217] to-[#020b06] border border-emerald-500/50 group-hover:border-[#a6ff2e] shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(166,255,46,0.2)] transition-all duration-500 mb-5"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <img 
                    src={getAssetUrl('assets/icons/vip-black-card.jpg')} 
                    alt="MUHAB VIP Sovereign Obsidian Pass"
                    className="w-full h-full object-cover rounded-[14px] transform group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020d07]/90 via-transparent to-white/10 pointer-events-none rounded-[14px]" />
                  
                  {/* Live Authenticated HUD Tag in card corner */}
                  <div className="absolute top-3 start-3 px-2.5 py-1 rounded-full bg-[#020a06]/85 backdrop-blur-md border border-[#a6ff2e]/40 flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-[#a6ff2e] tracking-wider">
                      VIP ACCESS // 2026
                    </span>
                  </div>

                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] font-mono text-emerald-300/90 bg-[#020a06]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/25">
                    <span>JEDDAH // RIYADH</span>
                    <span className="text-[#a6ff2e] font-bold">TIER-1 SLA</span>
                  </div>
                </div>

                {/* 3 VIP Trust Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-4" style={{ transform: 'translateZ(20px)' }}>
                  <div className="bg-[#03150d]/90 border border-emerald-500/25 group-hover:border-[#a6ff2e]/40 rounded-xl p-2.5 text-center flex flex-col justify-center transition-colors">
                    <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-black mb-0.5">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>4.95</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-medium">
                      {language === 'ar' ? 'تقييم العملاء' : 'Client Rating'}
                    </span>
                  </div>

                  <div className="bg-[#03150d]/90 border border-emerald-500/25 group-hover:border-[#a6ff2e]/40 rounded-xl p-2.5 text-center flex flex-col justify-center transition-colors">
                    <span className="text-xs font-black text-[#a6ff2e] mb-0.5">100%</span>
                    <span className="text-[9px] text-slate-400 font-medium">
                      {language === 'ar' ? 'كود مخصص' : 'Bespoke Code'}
                    </span>
                  </div>

                  <div className="bg-[#03150d]/90 border border-emerald-500/25 group-hover:border-[#a6ff2e]/40 rounded-xl p-2.5 text-center flex flex-col justify-center transition-colors">
                    <span className="text-xs font-black text-emerald-300 mb-0.5">&lt; 0.8s</span>
                    <span className="text-[9px] text-slate-400 font-medium">
                      {language === 'ar' ? 'سرعة قياسية' : 'Sub-Second'}
                    </span>
                  </div>
                </div>

                {/* Sovereign Direct Action Button */}
                <button
                  onClick={handlePrimaryClick}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#143d2a] to-[#0a2318] hover:from-[#1b4d36] hover:to-[#0f3223] border border-emerald-500/40 hover:border-[#a6ff2e]/70 text-xs font-bold text-white flex items-center justify-center gap-2 shadow-md transition-all group-hover:shadow-[0_0_20px_rgba(166,255,46,0.25)] cursor-pointer"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  <span>{language === 'ar' ? 'طلب استشارة فورية لعلامتك' : 'Request VIP Brand Consultation'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#a6ff2e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                </button>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationBanner;

