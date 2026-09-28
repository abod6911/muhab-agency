import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { audioSynth } from '../../utils/audioSynth';
import { 
  Compass, 
  Layers, 
  Terminal, 
  Rocket, 
  CheckCircle2, 
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ProcessSectionProps {
  onRequestConsultation?: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  onRequestConsultation,
}) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const steps = [
    {
      num: '01',
      icon: Compass,
      title: isAr ? 'الاكتشاف وتخطيط البنية المعمارية' : 'Discovery & System Architecture',
      desc: isAr
        ? 'تحليل متعمق لأهداف منشأتك، دراسة مسارات التحويل وتجربة العميل، وبناء هيكلية برمجية مدروسة لتحقيق أعلى عائد استثمار.'
        : 'Deep analysis of business objectives, conversion flow engineering, and architecting scalable digital frameworks for maximum ROI.',
      highlights: isAr
        ? ['دراسة رحلة المستخدم (UX)', 'تخطيط مسارات التحويل CRO', 'تحديد البنية التقنية السحابية']
        : ['UX Customer Journey', 'CRO Conversion Funnels', 'Cloud Tech Stack Selection'],
    },
    {
      num: '02',
      icon: Layers,
      title: isAr ? 'التصميم البصري الفاخر والتفاعل' : 'Visual Engineering & 3D Prototyping',
      desc: isAr
        ? 'صياغة واجهات استثنائية تعكس هيبة العلامة التجارية مع لمسات تفاعلية وحركية سلسة تواكب أرقى معايير الجوائز العالمية (Awwwards).'
        : 'Crafting bespoke luxury interfaces that command authority, featuring fluid micro-interactions and Awwwards-grade motion physics.',
      highlights: isAr
        ? ['واجهات مخصصة 100% فريدة', 'حركة سلسة 120 FPS', 'متوافقة بصرياً مع الهوية']
        : ['100% Bespoke UI/UX', '120 FPS Fluid Motion', 'Brand Identity Consistency'],
    },
    {
      num: '03',
      icon: Terminal,
      title: isAr ? 'الهندسة البرمجية والربط السحابي' : 'Cloud Engineering & Integration',
      desc: isAr
        ? 'تطوير كود نظيف فائق الحماية والأداء، مع ربط بوابات الدفع الوطنية (مدى، Apple Pay)، وأنظمة إدارة العمليات السحابية.'
        : 'Writing ultra-performant, bank-grade secure code with seamless integration of Saudi payment gateways and cloud infrastructure.',
      highlights: isAr
        ? ['تشفير 256-bit وحماية متقدمة', 'ربط فوري لبوابات الدفع', 'أعلى معايير الـ SEO التقني']
        : ['256-Bit Bank-Grade Shield', 'Direct Gateway Integration', 'Technical SEO Supremacy'],
    },
    {
      num: '04',
      icon: Rocket,
      title: isAr ? 'فحص الجودة وضمان الإطلاق SLA' : 'QA Audit, 0.8s SLA & Launch',
      desc: isAr
        ? 'فحص شامل عبر 22 معيار إنتاجي، ضمان سرعة تحميل خارقة أقل من 0.8 ثانية، وتدريب فريقك مع توفير دعم فني مستمر 24/7.'
        : 'Rigorous 22-point production readiness audit, sub-0.8s load speed guarantee, team training, and 24/7 continuous mission support.',
      highlights: isAr
        ? ['سرعة تحميل قياسية < 0.8s', 'فحص أمني وتوافقي شامل', 'ضمان استقرار سحابي 99.9%']
        : ['Sub-0.8s Benchmark Speed', 'End-to-End Security Audit', '99.9% Cloud Uptime SLA'],
    },
  ];

  return (
    <section
      id="process"
      className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 bg-[#020a06] text-white overflow-hidden scroll-mt-28"
    >
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(166,255,46,0.08),rgba(2,10,6,0))] pointer-events-none" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a6ff2e]/10 border border-[#a6ff2e]/30 text-[#a6ff2e] text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(166,255,46,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'منهجية العمل المدروسة' : 'Our Engineering Methodology'}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4"
          >
            {isAr ? (
              <>
                من الفكرة إلى الإطلاق،{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a6ff2e] to-emerald-400">
                  خطوات مدروسة
                </span>{' '}
                تضمن النجاح
              </>
            ) : (
              <>
                From Vision to Launch,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a6ff2e] to-emerald-400">
                  Precision-Engineered
                </span>{' '}
                Milestones
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            {isAr
              ? 'لا نعتمد على الصدف أو القوالب الجاهزة؛ نتبع مساراً هندسياً دقيقاً من أربع مراحل لتحويل مشروعك إلى أصل رقمي فاخر يحقق أرقاماً حقيقية.'
              : 'Zero templates or guesswork. We execute a disciplined 4-stage engineering roadmap designed to build digital assets that dominate your market.'}
          </motion.p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                onMouseEnter={() => audioSynth.playTelemetryTick()}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#061f14]/90 via-[#03150d]/95 to-[#010805] border border-emerald-500/25 hover:border-[#a6ff2e]/60 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(166,255,46,0.15)] hover:-translate-y-1.5"
              >
                {/* Top Glowing Beam */}
                <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#a6ff2e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Step Header: Number & Icon */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-[#a6ff2e]/40 group-hover:text-[#a6ff2e] transition-colors drop-shadow-[0_0_12px_rgba(166,255,46,0.2)]">
                      {step.num}
                    </span>

                    <div className="w-12 h-12 rounded-2xl bg-[#a6ff2e]/10 border border-[#a6ff2e]/30 flex items-center justify-center text-[#a6ff2e] group-hover:scale-110 group-hover:bg-[#a6ff2e]/20 transition-all shadow-[0_0_15px_rgba(166,255,46,0.15)]">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[#a6ff2e] transition-colors leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-emerald-500/15 space-y-2 mt-auto">
                  {step.highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-center gap-2 text-xs text-slate-300 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#a6ff2e] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout Bar */}
        {onRequestConsultation && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#041d13] via-[#082b1d] to-[#041d13] border border-[#a6ff2e]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start"
          >
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#a6ff2e] animate-ping" />
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                {isAr
                  ? 'هل ترغب في مناقشة تفاصيل مشروعك وجدول تسليمه مع مهندسينا مباشرة؟'
                  : 'Ready to discuss your project roadmap and delivery schedule directly?'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                audioSynth.playHarmonicSuccess();
                onRequestConsultation();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a6ff2e] text-[#020a06] font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(166,255,46,0.4)] hover:shadow-[0_0_30px_rgba(166,255,46,0.6)] hover:bg-[#b8ff4f] transition-all cursor-pointer shrink-0"
            >
              <span>{isAr ? 'ابدأ مشروعك الآن' : 'Start Your Project'}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
