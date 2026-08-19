import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../lib/i18n";
import { ArrowUpRight, MessageSquare } from "lucide-react";

interface FinalCTAProps {
  onOpenContact: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenContact }) => {
  const { t, isAr } = useI18n();

  return (
    <section className="py-32 sm:py-44 bg-[#030A08] text-white relative overflow-hidden border-t border-white/10">
      {/* Restrained Center Illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#064E3B]/25 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative z-10 text-center space-y-8">
        
        <div className="space-y-3 font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
          <p>{t("finalCTA.headline")}</p>
          <p className="text-[#B9FF38]">{t("finalCTA.subheadline")}</p>
        </div>

        {/* Clean Primary CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#B9FF38] hover:bg-[#CAFF5E] text-[#07130F] font-black text-sm sm:text-base tracking-tight transition-all duration-300 shadow-2xl shadow-[#B9FF38]/25 active:scale-[0.98]"
          >
            <span>{t("finalCTA.ctaPrimary")}</span>
            <ArrowUpRight className={`w-5 h-5 ${isAr ? "rotate-[-90deg]" : ""}`} />
          </button>

          <a
            href="https://wa.me/966500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm sm:text-base transition-all duration-300"
          >
            <MessageSquare className="w-4 h-4 text-[#B9FF38]" />
            <span>{t("finalCTA.ctaWhatsApp")}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
