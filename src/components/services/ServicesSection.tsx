import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { services } from '../../data/portfolioData';
import { SectionHeader } from '../common/SectionHeader';
import { ServiceCard } from './ServiceCard';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

interface ServicesSectionProps {
  onRequestService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onRequestService }) => {
  const { language, t } = useLanguage();

  return (
    <section id="services" className="relative py-12 sm:py-16 md:py-20 bg-[#020a06] overflow-hidden scroll-mt-24">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#092c1c1a_1px,transparent_1px),linear-gradient(to_bottom,#092c1c1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#a6ff2e]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[350px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeText={t('servicesBadge')}
          badgeVariant="mint"
          badgeIcon={<Cpu className="w-3.5 h-3.5 text-[#a6ff2e]" />}
          title={t('servicesTitle')}
          subtitle={t('servicesSubtitle')}
        />

        {/* 6-Card Services Grid with 3D Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              onRequestService={onRequestService}
              index={idx}
            />
          ))}
        </div>

        {/* Bottom Luxury Engineering Assurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-r from-[#041a12]/90 via-[#072418]/90 to-[#041a12]/90 border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#a6ff2e]/10 border border-[#a6ff2e]/30 flex items-center justify-center shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6 text-[#a6ff2e]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{language === 'ar' ? 'معايير الجودة والتسليم المضمونة' : 'Guaranteed Production & SLA Standards'}</span>
                <span className="w-2 h-2 rounded-full bg-[#a6ff2e] animate-ping" />
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {language === 'ar' 
                  ? 'كود مخصص 100% بدون قوالب جاهزة • سرعة فائقة أقل من ثانية • عقود قانونية موثقة • تسليم في الموعد المحدد بدقة.'
                  : '100% bespoke code without templates • Sub-second speed • Officially contracted • Guaranteed milestone delivery.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <div className="px-4 py-2.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 text-xs font-mono font-bold text-[#a6ff2e] flex items-center gap-2 w-full md:w-auto justify-center">
              <Zap className="w-3.5 h-3.5 text-[#a6ff2e]" />
              <span>{language === 'ar' ? 'جاهزية إطلاق سريعة' : 'Rapid Launch Delivery'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
