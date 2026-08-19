import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../lib/i18n";

export const Manifesto: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="py-24 sm:py-36 bg-[#030A08] text-white relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 text-center space-y-8">
        
        {/* Typographic Statement */}
        <div className="space-y-3 font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#D8DCD7]/60"
          >
            {t("manifesto.line1")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-white"
          >
            <span>{t("manifesto.line2Pre")} </span>
            <span className="text-[#B9FF38]">{t("manifesto.line2Accent")}</span>
          </motion.p>
        </div>

        {/* Supporting Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-[#D8DCD7]/80 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          {t("manifesto.supporting")}
        </motion.p>

      </div>
    </section>
  );
};
