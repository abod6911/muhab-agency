import React from "react";
import { useI18n } from "../../lib/i18n";
import { processData } from "../../data/process";

export const Process: React.FC = () => {
  const { t, isAr } = useI18n();

  return (
    <section id="process" className="py-28 sm:py-40 bg-[#030A08] text-white relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left / Sticky Title (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <div className="text-xs font-mono text-[#B9FF38] uppercase tracking-widest font-bold">
              {t("process.eyebrow")}
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              {t("process.headline")}
            </h2>
            <p className="text-[#D8DCD7]/80 text-base sm:text-lg leading-relaxed font-normal">
              {t("process.subheadline")}
            </p>
          </div>

          {/* Right / Scrolling Clean Stages (7 cols) */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-12">
            {processData.map((step) => (
              <div
                key={step.step}
                className="border-b border-white/10 pb-8 sm:pb-12 space-y-4"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-[#B9FF38]">
                    {step.step}
                  </span>
                  <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                    {isAr ? step.titleAr : step.titleEn}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#D8DCD7]/80 leading-relaxed font-normal">
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
