import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import type { ServiceItem } from '../../types';
import { audioSynth } from '../../utils/audioSynth';
import { 
  Layout, 
  Code, 
  CreditCard, 
  Star, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  onRequestService: (serviceTitle: string) => void;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onRequestService,
  index,
}) => {
  const { language, isRTL, t } = useLanguage();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const getServiceIcon = () => {
    switch (service.icon) {
      case 'Layout':
        return <Layout className="w-6 h-6 text-[#a6ff2e]" />;
      case 'Code':
        return <Code className="w-6 h-6 text-emerald-400" />;
      case 'CreditCard':
        return <CreditCard className="w-6 h-6 text-amber-400" />;
      case 'Star':
        return <Star className="w-6 h-6 text-[#a6ff2e]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-emerald-300" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-amber-400" />;
      default:
        return <Layout className="w-6 h-6 text-[#a6ff2e]" />;
    }
  };

  const serviceCategories = [
    '01 // UI/UX ARCHITECTURE',
    '02 // FULL-STACK ENGINE',
    '03 // FINANCIAL RAILS',
    '04 // REPUTATION MATRIX',
    '05 // SEO DOMINANCE',
    '06 // ENTERPRISE CLOUD',
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;
    
    setTilt({
      rotateX: -normY * 7,
      rotateY: normX * 7,
    });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.16,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const handleMouseEnter = () => {
    audioSynth.playHoverBlip();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        willChange: 'transform, opacity',
      }}
      className="group relative rounded-3xl bg-gradient-to-b from-[#091f16]/90 via-[#061710]/95 to-[#020b07] backdrop-blur-2xl border border-emerald-500/25 hover:border-[#a6ff2e]/60 p-6 sm:p-7 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_50px_-10px_rgba(166,255,46,0.22)] transition-all duration-300 overflow-hidden"
    >
      {/* Dynamic Specular Glare Layer */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-200 z-10"
        style={{
          background: `radial-gradient(circle 280px at ${glare.x}% ${glare.y}%, rgba(166, 255, 46, 0.15) 0%, transparent 80%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Top luminous accent shimmer line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#a6ff2e]/50 to-transparent group-hover:via-[#a6ff2e] transition-all duration-500 z-10" />

      {/* Ambient background corner glow */}
      <div 
        className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none duration-500"
        style={{ backgroundColor: service.accent || '#a6ff2e' }}
      />

      <div className="relative z-10">
        {/* Architectural Code & Category Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-emerald-500/15">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#a6ff2e]/80 uppercase">
            {serviceCategories[index] || `0${index + 1} // ARCHITECTURE`}
          </span>

          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[#a6ff2e] shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-pulse" />
            {language === 'ar' ? service.tagAr : service.tagEn}
          </span>
        </div>

        {/* Icon Pedestal & Service Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative group/sicon w-13 h-13 p-0.5 rounded-2xl bg-gradient-to-br from-[#143d2a] via-[#082216] to-[#020b06] border border-emerald-500/40 group-hover:border-[#a6ff2e] shadow-[0_8px_25px_rgba(0,0,0,0.7),0_0_18px_rgba(166,255,46,0.2)] group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(166,255,46,0.4)] transition-all duration-300 shrink-0 overflow-hidden flex items-center justify-center">
            <div className="w-full h-full rounded-[14px] bg-[#03150e]/90 flex items-center justify-center group-hover/sicon:scale-110 transition-transform duration-300">
              {getServiceIcon()}
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent pointer-events-none rounded-[14px]" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-[#a6ff2e] transition-colors duration-200 leading-snug">
              {language === 'ar' ? service.titleAr : service.titleEn}
            </h3>
            <span className="text-[11px] font-mono text-emerald-400/80 mt-0.5 inline-block">
              {language === 'ar' ? 'معايير هندسية متقدمة' : 'Production Grade SLA'}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
          {language === 'ar' ? service.descAr : service.descEn}
        </p>

        {/* Deliverables Checklist as Sleek Micro-Pills */}
        <div className="space-y-2 mb-6">
          {(language === 'ar' ? service.deliverablesAr : service.deliverablesEn).map((item, idx) => (
            <div 
              key={idx} 
              className="group/item flex items-start gap-2.5 p-2 rounded-xl bg-emerald-950/25 border border-emerald-500/10 hover:border-[#a6ff2e]/30 hover:bg-emerald-950/45 transition-all duration-200"
            >
              <div className="w-4 h-4 rounded-md bg-[#a6ff2e]/10 border border-[#a6ff2e]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#a6ff2e]/20 group-hover/item:scale-110 transition-all">
                <CheckCircle2 className="w-3 h-3 text-[#a6ff2e]" />
              </div>
              <span className="text-xs text-slate-200 font-medium leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Hub */}
      <div className="relative z-10 pt-4 border-t border-emerald-500/15">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            audioSynth.playHarmonicSuccess();
            onRequestService(language === 'ar' ? service.titleAr : service.titleEn);
          }}
          className="w-full relative group/btn overflow-hidden rounded-2xl py-3 px-4 bg-gradient-to-r from-[#072418] via-[#0b3323] to-[#072418] hover:from-[#a6ff2e] hover:via-[#baff54] hover:to-[#a6ff2e] border border-emerald-500/35 hover:border-[#a6ff2e] text-white hover:text-[#020a06] font-bold text-xs sm:text-sm flex items-center justify-between transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(166,255,46,0.35)] cursor-pointer"
        >
          <div className="flex items-center gap-2 font-black">
            <Sparkles className="w-3.5 h-3.5 text-[#a6ff2e] group-hover/btn:text-[#020a06] transition-colors" />
            <span>{t('serviceRequestBtn')}</span>
          </div>
          <div className="w-6 h-6 rounded-lg bg-white/10 group-hover/btn:bg-[#020a06]/15 flex items-center justify-center transition-colors">
            <ArrowUpRight className={`w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};
