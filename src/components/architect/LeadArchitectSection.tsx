import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ProfileCard } from '../common/ProfileCard';
import { getAssetUrl } from '../../utils/assets';
import { audioSynth } from '../../utils/audioSynth';
import { 
  ShieldCheck, 
  Zap, 
  Cpu, 
  ArrowUpRight, 
  MessageSquare,
  Sparkles,
  Award
} from 'lucide-react';

interface LeadArchitectSectionProps {
  onOpenContact: (subject?: string) => void;
}

export const LeadArchitectSection: React.FC<LeadArchitectSectionProps> = ({ onOpenContact }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const handleConsultClick = () => {
    try {
      audioSynth.playHarmonicSuccess();
    } catch {
      // Audio fallback
    }
    onOpenContact(
      isAr 
        ? 'استشارة معمارية مباشرة مع كبير المهندسين' 
        : 'Direct Consultation with Lead Solutions Architect'
    );
  };

  const handleHoverSound = () => {
    try {
      audioSynth.playHoverBlip();
    } catch {
      // Audio fallback
    }
  };

  const pillars = [
    {
      icon: Cpu,
      titleAr: 'كود مخصص 100% بدون قوالب',
      titleEn: '100% Bespoke Zero-Template Code',
      descAr: 'هندسة معمارية نظيفة ومحكمة من الصفر تلائم احتياجات علامتك بدون أي قوالب ووردبريس أو إضافات بطيئة.',
      descEn: 'Clean, handwritten architectural code engineered from scratch without bloated templates or plugins.'
    },
    {
      icon: Zap,
      titleAr: 'سرعة قياسية معتمدة < 0.8 ثانية',
      titleEn: 'Sub-0.8s Ultra-Fast Performance',
      descAr: 'تحقيق أعلى تصنيف 100/100 على معايير Google Core Web Vitals لضمان بقاء الزائر ومضاعفة المبيعات.',
      descEn: 'Achieving perfect 100/100 Google PageSpeed scores to maximize buyer retention and boost sales.'
    },
    {
      icon: ShieldCheck,
      titleAr: 'إشراف معماري مباشر وحصري',
      titleEn: 'Direct Executive Architectural Oversight',
      descAr: 'تواصل وتخطيط مباشر مع مهندس الحلول في كافة مراحل التطوير دون وسطاء أو شركات طرف ثالث.',
      descEn: 'Direct executive communication with the lead architect across all phases with zero middlemen.'
    }
  ];

  return (
    <section 
      id="architect" 
      className="relative py-20 sm:py-28 bg-[#020905] overflow-hidden border-t border-emerald-500/15 scroll-mt-24"
    >
      {/* Background Ambient Glowing Beams */}
      <div className="absolute top-1/3 -start-40 w-96 h-96 bg-[#a6ff2e]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -end-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041910] border border-emerald-500/30 text-xs font-semibold text-[#a6ff2e] shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#a6ff2e]" />
            <span>
              {isAr 
                ? 'القيادة الهندسية • استشر كبير مهندسي الحلول مباشرة' 
                : 'ENGINEERING LEADERSHIP • DIRECT ARCHITECT CONSULTATION'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mb-4">
            {isAr ? (
              <>
                إشراف معماري مباشر وهندسة برمجية{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-[#a6ff2e] to-emerald-400 drop-shadow-[0_0_20px_rgba(166,255,46,0.35)]">
                  تفوق التوقعات
                </span>
              </>
            ) : (
              <>
                Direct Architectural Oversight &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-[#a6ff2e] to-emerald-400">
                  World-Class Engineering
                </span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {isAr 
              ? 'في استوديو مهاب، لا نوكل مشاريعك لوسطاء أو مبرمجين مبتدئين. كل منصة يتم تخطيطها وهندستها بإشراف مباشر لضمان أعلى معايير الأمان ومضاعفة عوائدك التجارية.'
              : 'At Muhab Studio, your mission-critical web platforms are never outsourced. Every flagship architecture is directed by our lead solutions engineer.'}
          </p>
        </motion.div>

        {/* 2-Column Split: Editorial Value Pillars (Left) + Interactive 3D ProfileCard (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Wing (7 Cols): The 3 Pillars + Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start">
            
            {/* Live Availability Status */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#03150d]/80 border border-emerald-500/25 text-xs text-slate-300 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]" />
              </span>
              <span className="font-medium">
                {isAr 
                  ? 'جلسات التخطيط المعماري مفتوحة لعملاء الـ VIP لعام 2026' 
                  : 'Architectural consulting open for 2026 priority partners'}
              </span>
            </div>

            {/* 3 Pillars List */}
            <div className="space-y-4 w-full mb-8">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div 
                    key={idx}
                    onMouseEnter={handleHoverSound}
                    className="group relative flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#051a11]/90 to-[#020b06]/95 border border-white/10 hover:border-[#a6ff2e]/50 transition-all duration-300 shadow-md text-start"
                  >
                    <div className="w-11 h-11 rounded-xl bg-black/40 border border-emerald-500/30 flex items-center justify-center text-[#a6ff2e] group-hover:scale-110 group-hover:border-[#a6ff2e] transition-all shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#a6ff2e] transition-colors mb-1">
                        {isAr ? pillar.titleAr : pillar.titleEn}
                      </h4>
                      <p className="text-xs text-slate-300/90 leading-relaxed">
                        {isAr ? pillar.descAr : pillar.descEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
              <button
                onClick={handleConsultClick}
                onMouseEnter={handleHoverSound}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#03150d] bg-[#a6ff2e] hover:bg-[#b9ff52] hover:shadow-[0_0_25px_rgba(166,255,46,0.5)] transition-all cursor-pointer group shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>
                  {isAr ? 'حجز جلسة استشارة معمارية مباشرة' : 'Book Direct Architectural Consultation'}
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-300/80 px-3 py-2 rounded-lg bg-black/30 border border-emerald-500/20">
                <Award className="w-4 h-4 text-[#a6ff2e]" />
                <span>{isAr ? 'ضمان جودة معمارية TIER-1' : 'TIER-1 Architecture SLA'}</span>
              </div>
            </div>
          </div>

          {/* Right Wing (5 Cols): React Bits ProfileCard Component with 3D Holographic Physics */}
          <div className="lg:col-span-5 flex items-center justify-center w-full">
            <ProfileCard
              name={isAr ? 'م. مهاب الغامدي' : 'Eng. Muhab'}
              title={isAr ? 'المؤسس وكبير مهندسي الحلول' : 'Founding Solutions Architect'}
              handle="muhabstudio"
              status={isAr ? 'متاح للحجوزات الخاصة' : 'Available • Q3/Q4 Intake'}
              contactText={isAr ? 'استشارة مباشرة ↗' : 'Consult ↗'}
              avatarUrl={getAssetUrl('assets/icons/vip-black-card.jpg')}
              miniAvatarUrl={getAssetUrl('muhab-emblem.png')}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={true}
              mobileTiltSensitivity={6}
              behindGlowEnabled={true}
              behindGlowColor="rgba(166, 255, 46, 0.65)"
              behindGlowSize="45%"
              innerGradient="linear-gradient(145deg, rgba(8, 38, 24, 0.95) 0%, rgba(3, 18, 11, 0.98) 50%, rgba(166, 255, 46, 0.15) 100%)"
              onContactClick={handleConsultClick}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default LeadArchitectSection;
