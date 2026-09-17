import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../common/ScrollReveal';
import { Sparkles, Zap, ArrowUpRight } from 'lucide-react';

interface ManifestoSectionProps {
  onOpenContact?: (serviceTitle?: string) => void;
}

export const ManifestoSection: React.FC<ManifestoSectionProps> = ({ onOpenContact }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const manifestoTextAr = 
    "في استوديو مهاب، نحن لا نصنع مواقع تقليدية، بل نبني أصولاً رقمية استثنائية ترتقي بهيبة علامتك التجارية، وتدمج هندسة السرعة الخارقة مع تصاميم سينمائية تأسر عملاءك وتضاعف عوائدك في السوق السعودي.";

  const manifestoTextEn = 
    "At Muhab Studio, we never craft ordinary websites. We architect elite digital flagships that command industry authority, fusing sub-second speed with cinematic design to captivate high-value clientele and maximize revenue.";

  return (
    <section 
      id="manifesto" 
      className="relative py-28 sm:py-36 bg-[#010805] overflow-hidden border-y border-emerald-500/15 scroll-mt-24"
    >
      {/* Ambient background glow & radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(166,255,46,0.05)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#051a11] border border-[#a6ff2e]/30 text-[#a6ff2e] text-xs sm:text-sm font-semibold tracking-wide mb-8 shadow-[0_0_15px_rgba(166,255,46,0.15)]"
        >
          <Sparkles className="w-4 h-4 text-[#a6ff2e]" />
          <span>{isAr ? 'بيان مهاب الهندسي • STUDIO MANIFESTO' : 'THE MUHAB MANIFESTO'}</span>
        </motion.div>

        {/* React Bits ScrollReveal Interactive Component */}
        <div className="py-4">
          <ScrollReveal
            baseOpacity={0.08}
            enableBlur={true}
            baseRotation={isAr ? -2.5 : 2.5}
            blurStrength={8}
            containerClassName="mx-auto"
            textClassName="font-extrabold text-white text-center leading-[1.8] sm:leading-[1.9] tracking-tight selection:bg-[#a6ff2e]/30 selection:text-[#a6ff2e]"
            rotationEnd="center center"
            wordAnimationEnd="center 40%"
          >
            {isAr ? manifestoTextAr : manifestoTextEn}
          </ScrollReveal>
        </div>

        {/* Supporting Micro-Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-10 text-xs sm:text-sm font-mono text-emerald-300/80"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#03140c] border border-emerald-500/25">
            <span className="w-2 h-2 rounded-full bg-[#a6ff2e] animate-pulse" />
            <span>{isAr ? 'زمن تحميل < 0.4 ثانية' : 'Sub-0.4s Latency'}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#03140c] border border-emerald-500/25">
            <Zap className="w-3.5 h-3.5 text-[#a6ff2e]" />
            <span>{isAr ? 'معدل تحديث 120 FPS' : '120 FPS Fluid Motion'}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#03140c] border border-emerald-500/25">
            <span>{isAr ? 'هندسة موجهة للمبيعات' : 'Conversion Engineered'}</span>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <button
            onClick={() => onOpenContact?.(isAr ? 'استشارة تطوير موقع متكامل' : 'Flagship Web Consultation')}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#051a11] hover:bg-[#0c261b] border border-[#a6ff2e]/40 hover:border-[#a6ff2e] text-[#a6ff2e] font-semibold text-sm shadow-[0_0_20px_rgba(166,255,46,0.15)] hover:shadow-[0_0_30px_rgba(166,255,46,0.3)] transition-all cursor-pointer group"
          >
            <span>{isAr ? 'ابدأ رحلة تحويل علامتك الرقمية' : 'Transform Your Digital Presence'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ManifestoSection;
