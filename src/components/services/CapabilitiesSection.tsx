import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { capabilities, processSteps } from '../../data/portfolioData';

interface CapabilitiesSectionProps {
  onRequestService?: (serviceTitle?: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onRequestService }) => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#09090B] border-b border-white/[0.06] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] mb-3">
            {t('capabilitiesTitle')}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t('capabilitiesSubtitle')}
          </p>
        </div>

        {/* Part A — الخدمات (Clean 2x2 Minimal Grid with subtle dividers, zero heavy boxes) */}
        <div className="mb-20">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-8 pb-3 border-b border-white/[0.06]">
            {t('servicesHeader')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {capabilities.map((item) => (
              <div
                key={item.number}
                className="group flex flex-col justify-between pt-2 cursor-pointer"
                onClick={() => onRequestService?.(isAr ? item.titleAr : item.titleEn)}
              >
                <div>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-xs font-mono font-medium text-[#A6FF2E] tabular-nums">
                      {item.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-[#F4F4F5] group-hover:text-[#A6FF2E] transition-colors">
                      {isAr ? item.titleAr : item.titleEn}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    {isAr ? item.descAr : item.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part B — كيف نعمل (Compact Horizontal 4-Step Strip directly below, separated by thin hairline) */}
        <div className="pt-12 border-t border-white/[0.06]">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-8 pb-3 border-b border-white/[0.06]">
            {t('processHeader')}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="flex flex-col">
                <span className="text-xs font-mono font-semibold text-[#71717A] mb-2 tabular-nums">
                  {step.step}
                </span>
                <h4 className="text-sm font-semibold text-[#F4F4F5] mb-2">
                  {isAr ? step.titleAr : step.titleEn}
                </h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {isAr ? step.descAr : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
