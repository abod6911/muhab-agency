import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../lib/i18n";
import { productsData } from "../../data/products";
import { CheckCircle2, ArrowUpRight, QrCode, Layers } from "lucide-react";

export const ProductsSection: React.FC = () => {
  const { t, isAr } = useI18n();

  return (
    <section id="products" className="py-28 sm:py-36 bg-[#07130F] text-white relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-16 sm:space-y-24">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B9FF38] uppercase tracking-widest font-bold">
            <span>{t("products.eyebrow")}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            {t("products.headline")}
          </h2>
          <p className="text-[#D8DCD7]/80 text-base sm:text-lg leading-relaxed font-normal">
            {t("products.subheadline")}
          </p>
        </div>

        {/* Products Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {productsData.map((prod, idx) => (
            <div
              key={prod.id}
              className="p-8 sm:p-12 rounded-3xl bg-[#0B1F19] border border-white/10 flex flex-col justify-between space-y-8 hover:border-[#B9FF38]/30 transition-all duration-400"
            >
              <div className="space-y-6">
                {/* Status Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#B9FF38] font-bold">
                    {prod.number} / PRODUCT
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold ${prod.isLive ? "bg-[#064E3B] text-[#B9FF38]" : "bg-white/10 text-[#D8DCD7]"}`}>
                    {isAr ? prod.statusAr : prod.statusEn}
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <h3 className="font-display text-3xl sm:text-4xl font-black text-white">
                    {prod.name}
                  </h3>
                  <span className="text-xs font-mono text-[#D8DCD7]/70 uppercase block">
                    {isAr ? prod.categoryAr : prod.categoryEn}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#D8DCD7]/80 text-sm sm:text-base leading-relaxed font-normal">
                  {isAr ? prod.descAr : prod.descEn}
                </p>

                {/* Features */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  {(isAr ? prod.featuresAr : prod.featuresEn).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#D8DCD7]">
                      <CheckCircle2 className="w-4 h-4 text-[#B9FF38] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                {prod.isLive && prod.link ? (
                  <a
                    href={prod.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B9FF38] hover:bg-[#CAFF5E] text-[#07130F] font-black text-xs sm:text-sm transition-all shadow-md shadow-[#B9FF38]/10"
                  >
                    <span>{t("products.visit")}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-[#D8DCD7]/50 block">
                    {t("products.inDev")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
