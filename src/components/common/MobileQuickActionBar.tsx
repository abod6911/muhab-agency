import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { MessageSquare, Sparkles } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

interface MobileQuickActionBarProps {
  onOpenContact: () => void;
  isVisible?: boolean;
}

export const MobileQuickActionBar: React.FC<MobileQuickActionBarProps> = ({
  onOpenContact,
  isVisible = true,
}) => {
  const { language } = useLanguage();

  if (!isVisible) return null;

  const handleWhatsAppClick = () => {
    try {
      audioSynth.playHarmonicSuccess();
    } catch {}
    const defaultMsg = language === 'ar'
      ? 'السلام عليكم، استوديو مهاب. أرغب في استشارة وبدء مشروع رقمي جديد.'
      : 'Hello MUHAB Studio, I would like to inquire about starting a new digital project.';
    window.open(`https://wa.me/966565114955?text=${encodeURIComponent(defaultMsg)}`, '_blank');
  };

  const handleConsultClick = () => {
    try {
      audioSynth.playHoverBlip();
    } catch {}
    onOpenContact();
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 inset-x-4 z-40 lg:hidden pointer-events-auto"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="relative w-full max-w-md mx-auto rounded-full bg-[#041a12]/92 backdrop-blur-2xl border border-emerald-500/35 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.75),0_0_25px_rgba(166,255,46,0.18)] flex items-center justify-between gap-2">
        {/* Top luminous border line */}
        <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#a6ff2e]/60 to-transparent" />

        {/* 1. Direct WhatsApp Instant Line */}
        <button
          onClick={handleWhatsAppClick}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-[#0a271b] hover:bg-[#0f3827] text-white border border-emerald-500/30 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm group"
          aria-label={language === 'ar' ? 'واتساب مباشر' : 'Direct WhatsApp'}
        >
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-[#a6ff2e]" />
            <span className="absolute -top-0.5 -end-0.5 w-2 h-2 rounded-full bg-[#a6ff2e] animate-ping" />
          </div>
          <span className="truncate">
            {language === 'ar' ? 'واتساب مباشر' : 'WhatsApp'}
          </span>
        </button>

        {/* 2. Primary Consultation Modal Trigger */}
        <button
          onClick={handleConsultClick}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-[#a6ff2e] hover:bg-[#8ee622] text-[#020b06] text-xs font-black transition-all active:scale-95 cursor-pointer shadow-[0_0_18px_rgba(166,255,46,0.35)] group"
          aria-label={language === 'ar' ? 'طلب استشارة VIP' : 'Book VIP Call'}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#020b06]" />
          <span className="truncate">
            {language === 'ar' ? 'طلب استشارة VIP' : 'Book VIP Call'}
          </span>
        </button>
      </div>
    </motion.div>
  );
};
