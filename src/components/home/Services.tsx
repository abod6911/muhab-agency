import React, { useState } from "react";
import { useI18n } from "../../lib/i18n";
import { servicesData } from "../../data/services";
import { ArrowUpRight } from "lucide-react";

interface ServicesProps {
  onOpenContact: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenContact }) => {
  const { t, isAr } = useI18n();
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <section id="services" className="py-28 sm:py-40 bg-[#F3F3ED] text-[#07130F] relative overflow-hidden border-t border-black/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-16 sm:space-y-24">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#064E3B] uppercase tracking-widest font-bold">
            <span>{t("services.eyebrow")}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#07130F] leading-[1.1]">
            {t("services.headline")}
          </h2>
        </div>

        {/* Simplified Editorial Numbered 1px Rows */}
        <div className="border-t border-black/15">
          {servicesData.map((service, idx) => {
            const isActive = activeRow === idx;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveRow(idx)}
                onMouseLeave={() => setActiveRow(null)}
                onClick={onOpenContact}
                className="border-b border-black/15 py-8 sm:py-10 transition-all duration-300 group cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Number (1 col) */}
                  <div className="lg:col-span-1">
                    <span className="font-mono text-xl sm:text-2xl font-black text-[#064E3B]">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Capabilities (6 cols) */}
                  <div className="lg:col-span-6 space-y-1">
                    <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-[#07130F] group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300">
                      {isAr ? service.titleAr : service.titleEn}
                    </h3>
                    <span className="text-xs font-mono text-[#07130F]/60 block pt-1">
                      {isAr ? service.capabilityAr : service.capabilityEn}
                    </span>
                  </div>

                  {/* Concise Description (4 cols) */}
                  <div className="lg:col-span-4">
                    <p className="text-[#07130F]/80 text-sm sm:text-base leading-relaxed font-normal">
                      {isAr ? service.descAr : service.descEn}
                    </p>
                  </div>

                  {/* Action Arrow (1 col) */}
                  <div className="lg:col-span-1 flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-black/5 group-hover:bg-[#064E3B] group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:scale-110 ${isAr ? "rotate-[-90deg]" : ""}`} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
