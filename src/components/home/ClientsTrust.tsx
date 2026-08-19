import React from "react";
import { useI18n } from "../../lib/i18n";
import { clientPartners } from "../../data/clients";

export const ClientsTrust: React.FC = () => {
  const { t, isAr } = useI18n();

  return (
    <section className="py-20 sm:py-28 bg-[#030A08] text-white relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono text-[#B9FF38] uppercase tracking-widest font-bold">
            {t("clients.eyebrow")}
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-black text-white">
            {t("clients.headline")}
          </h2>
        </div>

        {/* Clean Typographic Partner Wall (No identical boxes) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-4 border-y border-white/10 items-center">
          {clientPartners.map((partner) => (
            <div
              key={partner.id}
              className="space-y-1 text-center sm:text-left rtl:sm:text-right group"
            >
              <span className="font-display font-black text-lg sm:text-xl text-white/90 group-hover:text-[#B9FF38] transition-colors block">
                {isAr ? partner.nameAr : partner.nameEn}
              </span>
              <span className="text-xs font-mono text-[#D8DCD7]/50 block">
                {isAr ? partner.industryAr : partner.industryEn}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
