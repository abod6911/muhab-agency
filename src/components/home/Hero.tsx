import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../lib/i18n";
import { PhoneShowcase } from "../ui/PhoneShowcase";
import { ArrowUpRight } from "lucide-react";
import { motionTokens } from "../../lib/motionTokens";

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const { t, isAr } = useI18n();

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92svh] lg:min-h-[100svh] flex items-center justify-center bg-[#07130F] text-white pt-28 pb-16 lg:pt-24 lg:pb-12 overflow-hidden">
      {/* Restrained Subtle Ambient Illumination */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#064E3B]/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left rtl:lg:text-right order-1">
            
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionTokens.durationMedium, ease: motionTokens.easePrimary }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064E3B]/60 border border-white/10 text-xs font-mono text-[#B9FF38] uppercase tracking-widest font-bold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B9FF38]" />
              <span>{t("hero.eyebrow")}</span>
            </motion.div>

            {/* Masked Headline Reveal */}
            <div className="space-y-1 overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionTokens.durationSlow, delay: 0.1, ease: motionTokens.easePrimary }}
                className="font-display text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.06]"
              >
                {t("hero.headlinePre")}
              </motion.h1>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionTokens.durationSlow, delay: 0.22, ease: motionTokens.easePrimary }}
                className="font-display text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.06]"
              >
                <span>{t("hero.headlineMid")} </span>
                <span className="text-[#B9FF38]">{t("hero.headlineAccent")}</span>
              </motion.h1>
            </div>

            {/* Supporting Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionTokens.durationMedium, delay: 0.35, ease: motionTokens.easePrimary }}
              className="text-[#D8DCD7]/85 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {t("hero.supporting")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionTokens.durationMedium, delay: 0.45, ease: motionTokens.easePrimary }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={onOpenContact}
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#B9FF38] hover:bg-[#CAFF5E] text-[#07130F] font-black text-sm sm:text-base tracking-tight transition-all duration-300 shadow-xl shadow-[#B9FF38]/20 active:scale-[0.98] cursor-pointer"
              >
                <span>{t("hero.ctaPrimary")}</span>
                <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${isAr ? "rotate-[-90deg]" : ""}`} />
              </button>

              <button
                onClick={scrollToWork}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-sm sm:text-base border border-white/15 transition-all duration-300 cursor-pointer"
              >
                <span>{t("hero.ctaSecondary")}</span>
              </button>
            </motion.div>
          </div>

          {/* Physical Phone Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: motionTokens.durationReveal, delay: 0.25, ease: motionTokens.easePrimary }}
            className="lg:col-span-5 flex justify-center items-center order-2"
          >
            <PhoneShowcase />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
