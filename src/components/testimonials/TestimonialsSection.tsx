import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { audioSynth } from '../../utils/audioSynth';
import { 
  Star, 
  Quote, 
  BadgeCheck, 
  TrendingUp, 
  Zap, 
  Repeat, 
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const reviews = [
    {
      author: isAr ? 'ريان الغامدي' : 'Rayan Al-Ghamdi',
      role: isAr ? 'المؤسس والرئيس التنفيذي' : 'Founder & CEO',
      company: isAr ? 'سلسلة جوتشا (GOTCHA)' : 'GOTCHA Cloud Kitchens',
      category: isAr ? 'مطاعم وسحابية' : 'F&B & Hospitality',
      quote: isAr
        ? 'تحولنا الرقمي مع ستوديو مهاب عبر منظومة فودس السحابية وتقييمي الذكية رفع مبيعات فروعنا بنسبة 35% وخفض وقت انتظار العملاء إلى النصف. الاحترافية وسرعة التنفيذ فاقت توقعاتنا.'
        : 'Partnering with Muhab Studio for our Foodus cloud menu and Taqyeemi smart stands skyrocketed our branch sales by 35% and halved customer wait times. World-class delivery speed.',
      metric: isAr ? '+35% نمو المبيعات' : '+35% Sales Growth',
      metricIcon: TrendingUp,
      avatarBg: 'from-amber-500/20 to-emerald-900/40',
    },
    {
      author: isAr ? 'م. طارق النابلسي' : 'Eng. Tariq Al-Nabulsi',
      role: isAr ? 'الشريك الإداري' : 'Managing Partner',
      company: isAr ? 'شركة الخال للاستشارات' : 'Al-Khal Advisory & Hospitality',
      category: isAr ? 'استشارات فاخرة' : 'B2B Corporate & Luxury',
      quote: isAr
        ? 'صمم فريق مهاب موقعنا الرسمي بأعلى معايير الفخامة العالمية. سرعة استجابة مذهلة، كود فائق الخفة، وتصميم يليق بشركتنا أمام كبار الشركاء والمستثمرين في المملكة.'
        : 'Muhab Studio engineered our corporate presence to absolute perfection. Unmatched elegance, blazing speed, and a look that establishes trust with top-tier investors.',
      metric: isAr ? '0.4s سرعة التصفح' : '0.4s Ultra-Fast Load',
      metricIcon: Zap,
      avatarBg: 'from-emerald-500/20 to-teal-900/40',
    },
    {
      author: isAr ? 'سارة العتيبي' : 'Sarah Al-Otaibi',
      role: isAr ? 'مديرة التسويق والنمو' : 'Head of Marketing',
      company: isAr ? 'علامة لومي ماتشا (LUMI)' : 'LUMI Matcha Specialty',
      category: isAr ? 'كافيهات وعلامات تجارية' : 'Specialty Retail & Cafes',
      quote: isAr
        ? 'بطاقات الولاء الرقمية PointPass المربوطة بمحفظة Apple Wallet كانت نقلة نوعية؛ رفعت معدل عودة العملاء 3 أضعاف خلال أول 60 يوماً بدون الحاجة لتحميل أي تطبيق معقد.'
        : 'Deploying PointPass digital loyalty cards directly into Apple Wallet tripled our customer retention rate in under 60 days without forcing clients to install bulky apps.',
      metric: isAr ? '3x زيادة عودة الزبائن' : '3x Customer Retention',
      metricIcon: Repeat,
      avatarBg: 'from-lime-500/20 to-emerald-950/40',
    },
    {
      author: isAr ? 'عبدالرحمن السديري' : 'Abdulrahman Al-Sudairi',
      role: isAr ? 'المدير التقني' : 'Chief Technology Officer',
      company: isAr ? 'منصة سكن العقارية (SAKAN)' : 'SAKAN Real Estate Tech',
      category: isAr ? 'منصات رقمية وعقارية' : 'PropTech Platform',
      quote: isAr
        ? 'أقوى بنية تحتية سحابية تعاملنا معها. أمان فائق ضد الهجمات، وسرعة معالجة للبيانات لحظية، مع استقرار تام 99.9% في أصعب أوقات ذروة حركة الزوار.'
        : 'The most solid cloud architecture we have ever deployed. Enterprise-grade security against attacks, instantaneous data rendering, and flawless 99.9% uptime during peak spikes.',
      metric: isAr ? '99.9% استقرار سحابي' : '99.9% Cloud Uptime',
      metricIcon: ShieldCheck,
      avatarBg: 'from-emerald-600/20 to-green-950/40',
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 bg-[#010805] text-white overflow-hidden scroll-mt-28 border-t border-emerald-500/15"
    >
      {/* Background Lighting Beam */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#a6ff2e]/25 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#a6ff2e]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

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
            <span>{isAr ? 'قصص النجاح والتحول' : 'Client Success Stories'}</span>
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
                نتائج حقيقية لعلامات تجارية{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a6ff2e] to-emerald-400">
                  تتصدر السوق السعودي
                </span>
              </>
            ) : (
              <>
                Proven Impact for Brands That{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a6ff2e] to-emerald-400">
                  Lead The Saudi Market
                </span>
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
              ? 'نفخر بأن شراكاتنا لا تنتهي عند تسليم الكود، بل تبدأ منها رحلة التوسع وتحقيق عوائد استثمارية مضاعفة.'
              : 'Our partnerships transcend code delivery. We empower our clients with compounding digital leverage and measurable revenue growth.'}
          </motion.p>
        </div>

        {/* Testimonials 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviews.map((rev, idx) => {
            const MetricIcon = rev.metricIcon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                onMouseEnter={() => audioSynth.playTelemetryTick()}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#061d13]/90 via-[#03150d]/95 to-[#010805] border border-emerald-500/25 hover:border-[#a6ff2e]/55 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_45px_rgba(166,255,46,0.12)] hover:-translate-y-1"
              >
                {/* Background Quote Watermark */}
                <Quote className="absolute top-6 end-6 w-16 h-16 text-emerald-500/10 group-hover:text-[#a6ff2e]/15 transition-colors pointer-events-none" />

                <div>
                  {/* Top Row: Stars & Metric Pill */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    {/* 5 Golden Stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#a6ff2e] text-[#a6ff2e] drop-shadow-[0_0_6px_rgba(166,255,46,0.6)]"
                        />
                      ))}
                    </div>

                    {/* Highlight Metric Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a6ff2e]/10 border border-[#a6ff2e]/30 text-[#a6ff2e] font-mono text-xs font-bold shadow-[0_0_12px_rgba(166,255,46,0.15)]">
                      <MetricIcon className="w-3.5 h-3.5" />
                      <span>{rev.metric}</span>
                    </div>
                  </div>

                  {/* Quote Body */}
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6 font-normal">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Author Card Footer */}
                <div className="pt-5 border-t border-emerald-500/20 flex items-center justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${rev.avatarBg} border border-[#a6ff2e]/30 flex items-center justify-center text-[#a6ff2e] font-black text-base shadow-[0_0_12px_rgba(166,255,46,0.2)]`}
                    >
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#a6ff2e] transition-colors">
                          {rev.author}
                        </h4>
                        <BadgeCheck className="w-4 h-4 text-[#a6ff2e] shrink-0" />
                      </div>
                      <p className="text-xs text-slate-400">
                        {rev.role} • <span className="text-emerald-400 font-medium">{rev.company}</span>
                      </p>
                    </div>
                  </div>

                  {/* Category Pill */}
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/40 border border-emerald-500/20 text-[11px] text-slate-400 font-medium">
                    <Building2 className="w-3 h-3 text-emerald-400" />
                    <span>{rev.category}</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
