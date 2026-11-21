import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PhoneMockup } from './PhoneMockup';

interface HeroSectionProps {
  onOpenContact: () => void;
  onSelectProject: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onSelectProject }) => {
  const { t } = useLanguage();

  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#work');
    if (target) {
      const topOffset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative w-full min-h-[90vh] flex items-center pt-28 pb-20 md:py-32 bg-[#09090B] text-[#F4F4F5] border-b border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Right Column in RTL (6 Cols): Typography, Value Proposition & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-start">
          
          {/* Subtle Unboxed Meta Eyebrow (No Glowing Pills) */}
          <div className="text-xs font-medium text-[#71717A] tracking-wider mb-5">
            {t('heroMeta')}
          </div>

          {/* Crisp Editorial H1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-[#F4F4F5] leading-[1.25] mb-6">
            {t('heroH1')}
          </h1>

          {/* Concise 1-Sentence Subheadline */}
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-[1.8] max-w-xl mb-8">
            {t('heroSub')}
          </p>

          {/* Clean Dual CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
            {/* Primary Solid Lime CTA */}
            <button
              type="button"
              onClick={onOpenContact}
              className="h-11 px-6 rounded-md bg-[#A6FF2E] hover:bg-[#b8ff52] text-[#09090B] text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center active:scale-[0.98] shadow-sm"
            >
              <span>{t('heroCtaPrimary')}</span>
            </button>

            {/* Secondary Ghost Hairline Button */}
            <a
              href="#work"
              onClick={handleScrollToWork}
              className="h-11 px-6 rounded-md bg-transparent hover:bg-white/[0.04] border border-white/[0.12] hover:border-white/20 text-[#F4F4F5] text-xs font-medium transition-colors flex items-center justify-center cursor-pointer"
            >
              <span>{t('heroCtaSecondary')}</span>
            </a>
          </div>

          {/* Quiet Proof Strip (Plain text separated by clean dots, NO boxes/icons clutter) */}
          <div className="pt-6 border-t border-white/[0.06] w-full flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#71717A] font-medium">
            <span>{t('heroProof1')}</span>
            <span className="text-white/20">•</span>
            <span>{t('heroProof2')}</span>
            <span className="text-white/20">•</span>
            <span>{t('heroProof3')}</span>
          </div>

        </div>

        {/* Left Column in RTL (5 Cols): Clean Interactive Phone Showcase (Zero Clutter) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <PhoneMockup onSelectProject={onSelectProject} />
        </div>

      </div>
    </section>
  );
};
