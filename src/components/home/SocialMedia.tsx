import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../lib/i18n";
import { Share2, Instagram, Sparkles, ArrowUpRight } from "lucide-react";

export const SocialMedia: React.FC = () => {
  const { t, isAr } = useI18n();

  return (
    <section className="py-20 sm:py-28 bg-[#0B1F19] text-white relative overflow-hidden border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#B9FF38] text-xs font-mono uppercase">
              <Share2 className="w-3.5 h-3.5" />
              <span>{t("socialMoment.eyebrow")}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black text-white">
              {t("socialMoment.headline")}
            </h2>
            <p className="text-[#D8DCD7]/80 text-sm sm:text-base leading-relaxed max-w-xl">
              {t("socialMoment.subheadline")}
            </p>
          </div>

          {/* Action and Visual (5 cols) */}
          <div className="lg:col-span-5 flex flex-wrap gap-4 items-center lg:justify-end">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/10"
            >
              <Instagram className="w-4 h-4 text-[#B9FF38]" />
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <div className="px-4 py-2 rounded-xl bg-[#07130F] border border-[#B9FF38]/20 text-xs font-mono text-[#B9FF38]">
              {t("socialMoment.badge")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
