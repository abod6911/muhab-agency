import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { audioSynth } from '../../utils/audioSynth';
import { 
  ChevronDown, 
  HelpCircle, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Search, 
  Sliders, 
  CreditCard 
} from 'lucide-react';

interface FaqSectionProps {
  onOpenContact?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenContact }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      icon: Clock,
      question: isAr 
        ? 'كم المدة الزمنية المتوقعة لتصميم وبرمجة المشروع بالكامل؟' 
        : 'What is the estimated delivery timeframe for a custom web project?',
      answer: isAr
        ? 'تستغرق المشاريع عادةً ما بين 7 إلى 21 يوم عمل حسب نطاق العمل والخصائص البرمجية المطلوبة. نلتزم منذ اليوم الأول بجدول زمني دقيق ومحطات إنجاز واضحة، مع تسليم نسخة تجريبية حية للمراجعة قبل الإطلاق الرسمي.'
        : 'Custom projects typically take between 7 to 21 business days depending on functional scope and architecture. We establish milestone checkpoints on day one with live staging previews before final deployment.',
    },
    {
      icon: Search,
      question: isAr 
        ? 'هل المواقع والمنصات التي تطورونها مهيأة لمحركات البحث (SEO) وللأجهزة الذكية؟' 
        : 'Are your websites and platforms fully responsive and SEO optimized?',
      answer: isAr
        ? 'نعم بكل تأكيد؛ جميع حلولنا البرمجية مبنية بمعايير الـ Semantic HTML مع هيكلة بيانات متقدمة (Schema.org) للظهور التلقائي في نتائج بحث Google. كما تخضع لفحص دقيق لضمان تجاوب استثنائي 100% مع مختلف شاشات الهواتف والأجهزة اللوحية.'
        : 'Absolutely. Every build follows semantic web standards, Schema.org rich snippets for Google search domination, and passes strict 100% multi-device responsive audits.',
    },
    {
      icon: ShieldCheck,
      question: isAr 
        ? 'كيف تضمنون أمان الموقع وحماية بيانات العملاء وبوابات الدفع؟' 
        : 'How do you safeguard user data, payment transactions, and server security?',
      answer: isAr
        ? 'نطبق حماية بنكية متعددة الطبقات تشمل تشفير 256-bit SSL، جدار ناري سحابي لحجب هجمات DDoS واختراق النماذج، ونربط بوابات الدفع السعودية الرسمية (مدى، Apple Pay، تمارا) عبر واجهات API مشفرة دون تخزين بيانات بطاقات العملاء في الموقع.'
        : 'We enforce multi-layered bank-grade security: 256-bit SSL encryption, Cloudflare WAF DDoS mitigation, zero-stored card credentials, and direct PCI-DSS compliant Saudi payment gateway integration.',
    },
    {
      icon: Sliders,
      question: isAr 
        ? 'هل نحتاج لخبرة تقنية أو معرفة برمجية لإدارة وتعديل المحتوى بعد الإطلاق؟' 
        : 'Do we need programming expertise to manage and edit content after launch?',
      answer: isAr
        ? 'إطلاقاً؛ نصمم لك لوحة تحكم عصرية وسهلة الاستخدام تمكنك وفريقك من تعديل النصوص، الصور، المنتجات، والأسعار بكل سلاسة وبضغطة زر، بالإضافة إلى توفير دليل فيديو إرشادي خاص بمنشأتك.'
        : 'Never. We empower your team with an intuitive, streamlined content dashboard to update texts, media, products, and prices in clicks, backed by custom video walkthrough training.',
    },
    {
      icon: Zap,
      question: isAr 
        ? 'ما هو نطاق الضمان والدعم الفني المقدم بعد تسليم المشروع؟' 
        : 'What warranty and technical support coverage do you provide post-launch?',
      answer: isAr
        ? 'نقدم ضماناً تشغيلياً شاملاً مع دعم فني مستمر، يشمل مراقبة استقرار السيرفرات 24/7، نسخ احتياطي تلقائي، وتحديثات أمنية دورية لضمان عمل منصتك بأعلى كفاءة واستقرار بنسبة 99.9% دون أي انقطاع.'
        : 'We provide an end-to-end operational warranty with 24/7 server health telemetry, automated backups, security patching, and a 99.9% uptime SLA to keep your business operating continuously.',
    },
    {
      icon: CreditCard,
      question: isAr 
        ? 'ما هي آلية بدء التعاقد وطرق الدفع المعتمدة؟' 
        : 'What is the contract initiation workflow and accepted payment methods?',
      answer: isAr
        ? 'يبدأ التعاقد بجلسة استكشافية سريعة لفهم أهدافك، ثم إرسال العرض المالي والعقد الرقمي الموثق. نقسم الدفعات على مراحل إنجاز مريحة (دفعة بدء، دفعة اعتماد التصميم، ودفعة التسليم النهائي) عبر التحويل البنكي أو البطاقات الإلكترونية.'
        : 'We initiate with a discovery session, followed by a formal corporate proposal. Payments are partitioned into milestone phases (kickoff, design sign-off, and production launch) via corporate bank wire or credit.',
    },
  ];

  const toggleAccordion = (index: number) => {
    audioSynth.playTelemetryTick();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 bg-[#020a06] text-white overflow-hidden scroll-mt-28 border-t border-emerald-500/15"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(166,255,46,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a6ff2e]/10 border border-[#a6ff2e]/30 text-[#a6ff2e] text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(166,255,46,0.15)]"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isAr ? 'إجابات واضحة وشفافة' : 'Transparent Answers'}</span>
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
                الأسئلة الشائعة حول{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a6ff2e] to-emerald-400">
                  حلولنا وخدماتنا
                </span>
              </>
            ) : (
              <>
                Frequently Asked Questions About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a6ff2e] to-emerald-400">
                  Our Engineering
                </span>
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto"
          >
            {isAr
              ? 'كل ما تحتاج لمعرفته حول مدة التنفيذ، مستوى الأمان، وآلية التعاقد لتبدأ مشروعك بثقة واطمئنان كامل.'
              : 'Key details regarding timelines, bank-grade security protocols, and engagement terms to launch with certainty.'}
          </motion.p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = faq.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                  isOpen
                    ? 'bg-gradient-to-b from-[#072418]/95 to-[#03150e]/95 border-[#a6ff2e]/45 shadow-[0_8px_30px_rgba(166,255,46,0.1)]'
                    : 'bg-[#04170f]/70 hover:bg-[#061d13] border-emerald-500/20 hover:border-emerald-500/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-start cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isOpen
                          ? 'bg-[#a6ff2e] text-[#020a06] shadow-[0_0_15px_rgba(166,255,46,0.4)]'
                          : 'bg-[#a6ff2e]/10 text-[#a6ff2e] border border-[#a6ff2e]/25'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <h3
                      className={`text-sm sm:text-base font-bold transition-colors ${
                        isOpen ? 'text-[#a6ff2e]' : 'text-white hover:text-slate-200'
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#a6ff2e]/20 text-[#a6ff2e]'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-emerald-500/15 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Direct Question CTA */}
        {onOpenContact && (
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-3.5 sm:px-6 sm:py-3 rounded-2xl bg-[#04170f]/80 border border-emerald-500/25">
              <span className="text-xs sm:text-sm text-slate-300">
                {isAr
                  ? 'لديك استفسار مخصص لم تجد إجابته هنا؟'
                  : 'Have a bespoke technical question not covered above?'}
              </span>
              <button
                type="button"
                onClick={() => {
                  audioSynth.playHoverBlip();
                  onOpenContact();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#a6ff2e]/15 hover:bg-[#a6ff2e]/25 text-[#a6ff2e] border border-[#a6ff2e]/40 font-bold text-xs transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isAr ? 'تحدث مباشرة مع مستشارنا التقني' : 'Ask Our Tech Lead'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
