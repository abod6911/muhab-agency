import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { trustRibbonData } from '../../data/portfolioData';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import { getAssetUrl } from '../../utils/assets';

interface BentoTrustCardProps {
  item: typeof trustRibbonData[0];
  index: number;
}

const BentoTrustCard: React.FC<BentoTrustCardProps> = ({ item, index }) => {
  const { language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  // 3D Perspective Spring Tilt
  const rotateX = useSpring(0, { stiffness: 320, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 320, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 14);
    rotateY.set(x * 14);

    setGlarePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.22,
    });
  };

  const handleMouseEnter = () => {
    try {
      audioSynth.playHoverBlip();
    } catch {}
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const badgeText = language === 'ar' 
    ? (item.badgeAr || 'معايير مؤسسية') 
    : (item.badgeEn || 'Enterprise Standard');

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -6 }}
      className="relative rounded-3xl bg-gradient-to-b from-[#0b2419]/90 via-[#05170f]/95 to-[#020a06] border border-emerald-500/25 hover:border-[#a6ff2e]/80 p-6 sm:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),0_0_40px_rgba(166,255,46,0.2)] transition-all duration-500 group flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Shimmer Specular Light Streak */}
      <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#a6ff2e] to-transparent rounded-t-3xl opacity-40 group-hover:opacity-100 group-hover:shadow-[0_0_15px_#a6ff2e] transition-all duration-500 pointer-events-none" />

      {/* Dynamic Cursor-following Specular Glare */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(166, 255, 46, 0.18) 0%, transparent 80%)`,
          opacity: glarePos.opacity,
        }}
      />

      {/* Ambient Background Corner Radiance */}
      <div 
        className="absolute -top-16 -end-16 w-44 h-44 rounded-full bg-[#a6ff2e]/10 blur-3xl pointer-events-none group-hover:bg-[#a6ff2e]/25 transition-all duration-500" 
      />

      <div className="relative z-20" style={{ transform: 'translateZ(25px)' }}>
        {/* Top Header: 3D Bespoke Realistic Icon Box + Verified Metric Chip */}
        <div className="flex items-center justify-between gap-3 mb-6">
          
          {/* Hyper-Realistic 3D Icon Badge Container */}
          <div className="relative group/icon flex items-center justify-center shrink-0">
            {/* Ambient Aura Halo behind the icon */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/40 via-[#a6ff2e]/30 to-emerald-500/40 blur-md opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Outer Physical Frame */}
            <div className="relative w-15 h-15 sm:w-16 sm:h-16 p-1 rounded-2xl bg-gradient-to-b from-[#143d2a] via-[#082216] to-[#020b06] border border-emerald-500/40 group-hover:border-[#a6ff2e] shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_18px_rgba(166,255,46,0.18)] group-hover:shadow-[0_12px_35px_rgba(0,0,0,0.9),0_0_28px_rgba(166,255,46,0.45)] transition-all duration-500 overflow-hidden flex items-center justify-center">
              {item.image ? (
                <img 
                  src={getAssetUrl(item.image)} 
                  alt={language === 'ar' ? item.titleAr : item.titleEn}
                  className="w-full h-full object-cover rounded-xl transform group-hover/icon:scale-110 group-hover/icon:rotate-2 transition-transform duration-500 select-none pointer-events-none"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#a6ff2e]">
                  <Sparkles className="w-6 h-6" />
                </div>
              )}

              {/* Specular Diagonal Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent pointer-events-none rounded-xl" />
            </div>
          </div>

          {/* Metric Status Badge */}
          <span className="text-[10.5px] sm:text-[11px] font-mono font-bold px-3 py-1.5 rounded-full bg-[#051c12]/90 border border-emerald-500/30 text-[#a6ff2e] group-hover:bg-[#a6ff2e]/15 group-hover:border-[#a6ff2e]/50 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-pulse" />
            <span>{badgeText}</span>
          </span>
        </div>

        {/* Title with Interactive Arrow */}
        <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[#a6ff2e] transition-colors duration-200 tracking-tight mb-2.5 flex items-center justify-between">
          <span>{language === 'ar' ? item.titleAr : item.titleEn}</span>
          <ArrowUpRight className="w-4 h-4 text-emerald-400/50 group-hover:text-[#a6ff2e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 transition-transform shrink-0" />
        </h3>

        {/* Subtitle / Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed group-hover:text-slate-100 transition-colors font-normal">
          {language === 'ar' ? item.subtitleAr : item.subtitleEn}
        </p>
      </div>

      {/* Bottom Technical Indicator Line */}
      <div className="relative z-20 mt-6 pt-4 border-t border-emerald-500/15 flex items-center justify-between text-[10.5px] font-mono text-emerald-400/70">
        <span className="tracking-wider">0{index + 1} // BESPOKE SYSTEM</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all shadow-[0_0_8px_#a6ff2e]" />
          <span className="text-[9px] text-slate-400 group-hover:text-[#a6ff2e] transition-colors uppercase">MUHAB</span>
        </div>
      </div>
    </motion.div>
  );
};

export const TrustRibbon: React.FC = () => {
  return (
    <section id="trust-ribbon" className="relative z-20 pt-6 sm:pt-10 pb-8 sm:pb-12 border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustRibbonData.map((item, index) => (
            <BentoTrustCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustRibbon;
