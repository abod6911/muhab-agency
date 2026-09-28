import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { audioSynth } from '../../utils/audioSynth';
import { MessageSquare, Sparkles } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  className?: string;
  isModalOpen?: boolean;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '966565114955',
  className = '',
  isModalOpen = false,
}) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [isHovered, setIsHovered] = useState(false);

  if (isModalOpen) return null;

  const handleClick = () => {
    try {
      audioSynth.playHarmonicSuccess();
    } catch {}
    const defaultMsg = isAr
      ? 'السلام عليكم، استوديو مهاب. أود الاستفسار عن تفاصيل وخطوات بدء مشروعي التقني الجديد.'
      : 'Hello Muhab Studio, I would like to inquire about initiating a new custom web project.';
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMsg)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`hidden lg:flex fixed lg:bottom-8 lg:start-8 z-40 select-none ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        audioSynth.playHoverBlip();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center gap-3">
        {/* Main Floating Button */}
        <motion.button
          type="button"
          onClick={handleClick}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#041a10] via-[#092e1e] to-[#041a10] border border-[#a6ff2e]/50 hover:border-[#a6ff2e] flex items-center justify-center text-[#a6ff2e] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(166,255,46,0.35)] cursor-pointer group"
          aria-label={isAr ? 'محادثة مباشرة عبر واتساب' : 'Direct WhatsApp Chat'}
        >
          {/* Radar Ping Beacon Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#a6ff2e]/20 animate-ping pointer-events-none" />

          {/* Glowing Green Core */}
          <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(166,255,46,0.7)]" />

          {/* Active Online Indicator Dot */}
          <span className="absolute top-1 end-1 w-3.5 h-3.5 rounded-full bg-[#a6ff2e] border-2 border-[#020a06] shadow-[0_0_8px_#a6ff2e]" />
        </motion.button>

        {/* Floating Tooltip Pill (Desktop & on hover or subtle beacon) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: isAr ? 10 : -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: isAr ? 10 : -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#041d13]/95 border border-[#a6ff2e]/40 shadow-[0_8px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(166,255,46,0.2)] backdrop-blur-md pointer-events-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#a6ff2e]" />
              <div className="flex flex-col text-start">
                <span className="text-[11px] font-bold text-white leading-tight">
                  {isAr ? 'مستشارنا التقني متواجد' : 'Tech Advisor Online'}
                </span>
                <span className="text-[9.5px] text-[#a6ff2e] font-mono leading-tight">
                  {isAr ? 'رد فوري خلال دقائق' : 'Instant response'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
