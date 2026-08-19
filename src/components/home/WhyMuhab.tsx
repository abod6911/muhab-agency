import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../lib/i18n";
import { MapPin, Sparkles, Zap, Star, ShieldCheck, Users, Layers, Award } from "lucide-react";

export const WhyMuhab: React.FC = () => {
  const { t, isAr } = useI18n();

  const points = [
    { icon: MapPin, title: t("whyMuhab.point1Title"), desc: t("whyMuhab.point1Desc") },
    { icon: Sparkles, title: t("whyMuhab.point2Title"), desc: t("whyMuhab.point2Desc") },
    { icon: Zap, title: t("whyMuhab.point3Title"), desc: t("whyMuhab.point3Desc") },
    { icon: Star, title: t("whyMuhab.point4Title"), desc: t("whyMuhab.point4Desc") },
    { icon: Layers, title: t("whyMuhab.point5Title"), desc: t("whyMuhab.point5Desc") },
    { icon: Users, title: t("whyMuhab.point6Title"), desc: t("whyMuhab.point6Desc") },
  ];

  return (
    <section className="py-24 sm:py-36 bg-[#07130F] text-white relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064E3B] text-[#B9FF38] text-xs font-mono uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>{t("whyMuhab.eyebrow")}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            {t("whyMuhab.headline")}
          </h2>
          <p className="text-[#D8DCD7]/80 text-base sm:text-lg leading-relaxed">
            {t("whyMuhab.subheadline")}
          </p>
        </div>

        {/* 6 Strategic Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="p-8 rounded-3xl bg-[#0B1F19]/70 border border-white/10 hover:border-[#B9FF38]/40 transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#064E3B]/60 text-[#B9FF38] flex items-center justify-center border border-[#B9FF38]/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-[#B9FF38] transition-colors">
                  {pt.title}
                </h3>
                <p className="text-sm text-[#D8DCD7]/75 leading-relaxed font-normal">
                  {pt.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
