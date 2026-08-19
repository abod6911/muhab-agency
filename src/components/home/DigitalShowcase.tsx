import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../lib/i18n";
import { Laptop, Smartphone, Monitor, Sparkles, Zap, Shield, CheckCircle2 } from "lucide-react";

export const DigitalShowcase: React.FC = () => {
  const { t, isAr } = useI18n();

  return (
    <section id="showcase" className="py-24 sm:py-36 bg-[#030A08] text-white relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064E3B] text-[#B9FF38] text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("showcase.eyebrow")}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            {t("showcase.headline")}
          </h2>
          <p className="text-[#D8DCD7]/80 text-base sm:text-lg leading-relaxed">
            {t("showcase.subheadline")}
          </p>
        </div>

        {/* Cinematic Multi-Device Composition */}
        <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-b from-[#0B1F19] to-[#07130F] border border-white/10 overflow-hidden shadow-2xl">
          {/* Subtle Stage Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[#064E3B]/30 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Desktop Mockup Preview (7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-[#030A08] border border-white/15 shadow-2xl group"
            >
              {/* Browser Bar */}
              <div className="p-3 bg-[#07130F] border-b border-white/10 flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="mx-auto px-4 py-1 rounded-md bg-white/5 text-[11px] font-mono text-[#D8DCD7]/60">
                  https://gotcha-fresh-tea-jeddah.sa
                </div>
              </div>

              {/* Display Content */}
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85"
                  alt="Desktop Showcase"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#B9FF38] text-[#07130F] font-bold text-xs">
                      Live Client System
                    </span>
                    <h4 className="font-display text-xl font-bold text-white mt-2">
                      Gotcha Fresh Tea — Interactive Menu & E-Commerce
                    </h4>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mobile Device Mockup (5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[280px] rounded-[36px] bg-[#030A08] border-[6px] border-[#112C24] p-2 shadow-2xl group">
                {/* Dynamic Island / Notch */}
                <div className="w-24 h-4 bg-[#112C24] rounded-full mx-auto mb-2" />

                <div className="aspect-[9/16] rounded-[24px] overflow-hidden bg-[#07130F] relative">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                    alt="Mobile Showcase"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                    <span className="text-[10px] font-mono text-[#B9FF38] uppercase">
                      Mobile Touch Optimised
                    </span>
                    <h5 className="font-bold text-sm text-white">
                      Damascene Heritage Dining Menu
                    </h5>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Highlights Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              t("showcase.feature1"),
              t("showcase.feature2"),
              t("showcase.feature3"),
              t("showcase.feature4"),
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 text-xs font-semibold text-[#D8DCD7]">
                <CheckCircle2 className="w-4 h-4 text-[#B9FF38]" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
