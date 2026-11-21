import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MessageSquare, ArrowUpRight } from 'lucide-react';

interface ConsultationBannerProps {
  onOpenContact: () => void;
}

export const ConsultationBanner: React.FC<ConsultationBannerProps> = ({ onOpenContact }) => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  const defaultMsg = isAr
    ? 'السلام عليكم، استوديو مهاب. أود مناقشة مشروعي الرقمي الجديد معكم.'
    : 'Hello Muhab Studio, I would like to discuss my new digital project with you.';
  const whatsappUrl = `https://wa.me/966565114955?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#09090B] border-b border-white/[0.06] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F4F5] mb-4">
          {t('preFooterTitle')}
        </h2>

        {/* Subtext */}
        <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-xl mx-auto mb-10">
          {t('preFooterSub')}
        </p>

        {/* Dual Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Primary WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-6 rounded-md bg-[#A6FF2E] hover:bg-[#b8ff52] text-[#09090B] text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t('btnWhatsApp')}</span>
          </a>

          {/* Secondary Modal Button */}
          <button
            type="button"
            onClick={onOpenContact}
            className="h-11 px-6 rounded-md bg-transparent hover:bg-white/[0.04] border border-white/[0.12] hover:border-white/20 text-[#F4F4F5] text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>{t('btnModalConsult')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
