import React from "react";
import { useI18n } from "../../lib/i18n";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

interface ReputationShowcaseProps {
  onOpenContact: () => void;
}

export const ReputationShowcase: React.FC<ReputationShowcaseProps> = ({ onOpenContact }) => {
  const { t, isAr } = useI18n();

  return (
    <section id="reputation" className="py-28 sm:py-40 bg-[#07130F] text-white relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-16 sm:space-y-24">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B9FF38] uppercase tracking-widest font-bold">
            <span>{t("reputation.eyebrow")}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            {t("reputation.headline")}
          </h2>
          <p className="text-[#D8DCD7]/80 text-base sm:text-lg leading-relaxed font-normal">
            {t("reputation.subheadline")}
          </p>
        </div>

        {/* Experiential Presentation (Left: Realistic Render; Right: 3 Steps) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Physical Product Visual (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0B1F19] border border-white/10 shadow-2xl relative overflow-hidden space-y-8">
              {/* Product Mockup Container */}
              <div className="relative h-56 sm:h-64 rounded-2xl bg-gradient-to-br from-[#064E3B] via-[#0B1F19] to-[#030A08] border border-white/15 p-6 flex flex-col justify-between shadow-inner">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-display font-black text-xl text-white">MUHAB</span>
                    <span className="text-[10px] font-mono text-[#B9FF38] block mt-0.5">SMART REPUTATION HARDWARE</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/80 px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
                    NFC + QR
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">Google Maps Review Access</div>
                  <div className="text-xs font-mono text-[#D8DCD7]/70">One-touch smartphone tap</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#D8DCD7]">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="font-bold text-white block">{t("reputation.cardTitle")}</span>
                  <p className="text-[#D8DCD7]/70">{t("reputation.cardDesc")}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="font-bold text-white block">{t("reputation.standTitle")}</span>
                  <p className="text-[#D8DCD7]/70">{t("reputation.standDesc")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 3-Step Flow & Action (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4 space-y-1">
                <h4 className="font-display text-lg font-bold text-white">
                  {t("reputation.step1Title")}
                </h4>
                <p className="text-sm text-[#D8DCD7]/80">
                  {t("reputation.step1Desc")}
                </p>
              </div>

              <div className="border-b border-white/10 pb-4 space-y-1">
                <h4 className="font-display text-lg font-bold text-white">
                  {t("reputation.step2Title")}
                </h4>
                <p className="text-sm text-[#D8DCD7]/80">
                  {t("reputation.step2Desc")}
                </p>
              </div>

              <div className="border-b border-white/10 pb-4 space-y-1">
                <h4 className="font-display text-lg font-bold text-white">
                  {t("reputation.step3Title")}
                </h4>
                <p className="text-sm text-[#D8DCD7]/80">
                  {t("reputation.step3Desc")}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#B9FF38] hover:bg-[#CAFF5E] text-[#07130F] font-black text-sm transition-all shadow-xl shadow-[#B9FF38]/20"
            >
              <span>{isAr ? "طلب حلول السمعة لنشاطك" : "Equip Your Business"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
