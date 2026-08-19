import React from "react";
import { useI18n } from "../../lib/i18n";
import { MuhabLogo } from "../brand/MuhabLogo";
import { MapPin } from "lucide-react";

export const AboutMuhab: React.FC = () => {
  const { t, isAr } = useI18n();

  return (
    <section id="about" className="py-28 sm:py-40 bg-[#07130F] text-white relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="text-xs font-mono text-[#B9FF38] uppercase tracking-widest font-bold">
              {t("about.eyebrow")}
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              {t("about.headline")}
            </h2>

            <p className="text-[#D8DCD7]/85 text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-2xl">
              {t("about.body")}
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-[#D8DCD7]/70">
              <MapPin className="w-4 h-4 text-[#B9FF38]" />
              <span>Jeddah, Saudi Arabia</span>
            </div>
          </div>

          {/* Visual Brand Identity (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0B1F19] border border-white/10 text-center space-y-6 max-w-sm w-full shadow-2xl">
              <MuhabLogo showWordmark={false} />
              <div>
                <h3 className="font-display text-2xl font-black text-white">MUHAB</h3>
                <span className="text-xs font-mono text-[#B9FF38] uppercase tracking-wider block mt-1 font-bold">
                  {isAr ? "صُناع الويب السعوديون" : "Saudi Webmakers"}
                </span>
              </div>
              <p className="text-xs text-[#D8DCD7]/70 leading-relaxed font-mono">
                Websites · Growth · Reputation
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
