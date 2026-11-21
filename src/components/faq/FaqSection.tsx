import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { faqs } from '../../data/portfolioData';
import { Plus, Minus } from 'lucide-react';

interface FaqSectionProps {
  onOpenContact?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = () => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#09090B] border-b border-white/[0.06] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] mb-3">
            {t('faqTitle')}
          </h2>
          <p className="text-sm text-[#A1A1AA]">
            {t('faqSubtitle')}
          </p>
        </div>

        {/* Clean Hairline Accordion Rows */}
        <div className="border-t border-white/[0.08]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b border-white/[0.08] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 flex items-center justify-between text-start gap-4 cursor-pointer focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#F4F4F5] group-hover:text-[#A6FF2E] transition-colors">
                    {isAr ? faq.questionAr : faq.questionEn}
                  </span>
                  <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 text-[#A1A1AA] group-hover:text-[#F4F4F5] transition-colors">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-6 pt-1 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-3xl">
                    {isAr ? faq.answerAr : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
