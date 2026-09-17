import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { MagicBento, type BentoCardProps } from '../common/MagicBento';
import { 
  Server, 
  CreditCard, 
  Zap, 
  Radio, 
  Cpu, 
  ShieldCheck, 
  Sparkles,
  MousePointer
} from 'lucide-react';

interface MagicBentoSectionProps {
  onOpenContact?: (serviceTitle?: string) => void;
}

export const MagicBentoSection: React.FC<MagicBentoSectionProps> = ({ onOpenContact }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const bentoCards: BentoCardProps[] = [
    {
      color: '#04170f',
      title: isAr ? 'شبكة سحابية عالمية فائقة الاستجابة' : 'Global Edge Infrastructure',
      description: isAr 
        ? 'بنية تحتية موزعة عالمياً عبر مراكز بيانات سحابية متقدمة تضمن استجابة فورية أقل من 40ms واستقراراً دائماً.'
        : 'Globally distributed CDN clusters ensuring sub-40ms latency and 99.99% uptime for enterprise operations.',
      label: isAr ? 'بنية سحابية • 99.99%' : 'Cloud Edge • 99.99%',
      icon: <Server className="w-5 h-5 text-[#a6ff2e]" />,
      stats: isAr ? 'استجابة < 40ms • توافر 99.99%' : '< 40ms Latency • 99.99% SLA'
    },
    {
      color: '#04170f',
      title: isAr ? 'بوابات دفع وطنية معتمدة' : 'Native Saudi Payment Gateways',
      description: isAr 
        ? 'ربط فوري وتشفير بنكي معتمد مع مدى، Apple Pay، تابي، وتمارا مع تسوية مالية مؤتمتة وتقارير دقيقة.'
        : 'PCI-DSS certified checkout with Mada, Apple Pay, Tabby, and Tamara with instant automated settlements.',
      label: isAr ? 'تقنية مالية • FINTECH' : 'Fintech Integration',
      icon: <CreditCard className="w-5 h-5 text-[#a6ff2e]" />,
      stats: isAr ? 'تشفير بنكي 256-bit • تسوية لحظية' : '256-bit SSL • Instant Settlement'
    },
    {
      color: '#04170f',
      title: isAr ? 'واجهات تفاعلية سينمائية بمعدل 120 إطاراً' : 'Cinema-Grade 120 FPS Motion Interfaces',
      description: isAr 
        ? 'محرك حركي هجين يجمع بين Three.js و WebGL و GSAP مع فيزياء سائلة خالية تماماً من التقطيع، مصمم لرفع معدلات التحويل وإبهار الزوار.'
        : 'High-performance physics engine combining Three.js, WebGL, and GSAP with zero frame drops, engineered to elevate conversion rates.',
      label: isAr ? 'محرك حركي • 120 FPS' : 'Motion Physics • 120 FPS',
      icon: <Zap className="w-6 h-6 text-[#a6ff2e]" />,
      stats: isAr ? 'تسريع عتادي GPU • زمن تأخير 0ms' : 'GPU Hardware Acceleration • 0ms Lag'
    },
    {
      color: '#04170f',
      title: isAr ? 'عتاد NFC والربط الميداني الذكي' : 'Bespoke Encrypted NFC Touchpoints',
      description: isAr 
        ? 'دمج العالم الواقعي بالرقمي عبر بطاقات معدنية مخصصة وتجهيزات ذكية تنقل عملاءك بلمسة واحدة لمنصتك دون الحاجة لتطبيقات.'
        : 'Bridging physical and digital interactions with custom-milled metal NFC cards and smart touchpoints launching web apps instantly.',
      label: isAr ? 'عتاد ذكي • SMART NFC' : 'Smart Hardware • NFC',
      icon: <Radio className="w-6 h-6 text-[#a6ff2e]" />,
      stats: isAr ? 'رقائق NDEF مشفرة • ربط فوري 0.1 ثانية' : 'Encrypted NDEF • 0.1s Instant Link'
    },
    {
      color: '#04170f',
      title: isAr ? 'وكلاء أذكياء وأتمتة شاملة 24/7' : 'Autonomous AI Operations & Workflows',
      description: isAr 
        ? 'أتمتة العمليات وخدمة العملاء الذاتية وتحليل البيانات عبر نماذج ذكاء اصطناعي مخصصة تلبي سرعة نمو نشاطك.'
        : 'Automated operational pipelines, lead scoring, and 24/7 client interactions powered by fine-tuned AI agents.',
      label: isAr ? 'ذكاء اصطناعي • AGENTIC AI' : 'Agentic AI • Autopilot',
      icon: <Cpu className="w-5 h-5 text-[#a6ff2e]" />,
      stats: isAr ? 'خدمة ذاتية 24/7 • وفر زمني 80%' : '24/7 Autopilot • 80% Time Saved'
    },
    {
      color: '#04170f',
      title: isAr ? 'أمن سيبراني صارم ومعايير وطنية' : 'Zero-Trust Enterprise Cybersecurity',
      description: isAr 
        ? 'حماية استباقية ضد هجمات DDoS مع جدران نارية سحابية WAF وتشفير كامل للبيانات وفق ضوابط الهيئة الوطنية للأمن السيبراني.'
        : 'Hardened WAF perimeter, active DDoS mitigation, and complete alignment with Saudi National Cybersecurity Authority frameworks.',
      label: isAr ? 'أمان مصرفي • ZERO-TRUST' : 'Zero-Trust • Security',
      icon: <ShieldCheck className="w-5 h-5 text-[#a6ff2e]" />,
      stats: isAr ? 'امتثال كامل NCA • فحص دوري مستمر' : 'Full NCA Standards • Continuous Audit'
    }
  ];

  return (
    <section 
      id="bento-architecture" 
      className="relative py-12 sm:py-16 md:py-20 bg-[#020a06] overflow-hidden border-t border-emerald-500/15 scroll-mt-28"
    >
      {/* Background Ambience & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(166,255,46,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#051a11] border border-[#a6ff2e]/30 text-[#a6ff2e] text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-[0_0_15px_rgba(166,255,46,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-[#a6ff2e]" />
            <span>{isAr ? 'الهندسة المعمارية التفاعلية • BENTO ARCHITECTURE' : 'INTERACTIVE BENTO ARCHITECTURE'}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5"
          >
            {isAr ? (
              <>
                معمارية برمجية متكاملة <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a6ff2e] via-emerald-400 to-[#a6ff2e]">مصممة للأداء المطلق</span>
              </>
            ) : (
              <>
                Next-Gen Architecture <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a6ff2e] via-emerald-400 to-[#a6ff2e]">Engineered for Scale</span>
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg leading-relaxed"
          >
            {isAr
              ? 'استكشف أركان المنظومة التقنية لمهاب: تفاعل مع البطاقات لتجربة الإضاءة والفيزياء ثلاثية الأبعاد وجاذبية المؤشر، واضغط على أي بطاقة لتفعيل موجة الطاقة.'
              : 'Explore Muhab\'s architectural pillars: interact with cards to experience 3D tilt, magnetic pull, and neon spotlight. Click any card to trigger an energy pulse.'}
          </motion.p>

          {/* Interactive Feature Hints */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 text-xs text-emerald-400/90 font-mono"
          >
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20">
              <MousePointer className="w-3.5 h-3.5 text-[#a6ff2e]" />
              {isAr ? 'ميلان ثلاثي الأبعاد 3D' : '3D Tilt Physics'}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5 text-[#a6ff2e]" />
              {isAr ? 'نجوم تفاعلية متحركة' : 'Star Particles'}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20">
              <Zap className="w-3.5 h-3.5 text-[#a6ff2e]" />
              {isAr ? 'إضاءة نيون موجهة' : 'Neon Spotlight'}
            </span>
          </motion.div>
        </div>

        {/* React Bits MagicBento Component Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MagicBento
            cards={bentoCards}
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={320}
            particleCount={14}
            glowColor="166, 255, 46"
          />
        </motion.div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <button
            onClick={() => onOpenContact?.(isAr ? 'استشارة معمارية تقنية' : 'Technical Architecture Consultation')}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-[#84cc16] to-[#a6ff2e] text-[#020a06] font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(166,255,46,0.35)] hover:shadow-[0_0_40px_rgba(166,255,46,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{isAr ? 'اطلب دراسة معمارية لمشروعك' : 'Request Architecture Consultation'}</span>
            <Zap className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MagicBentoSection;
