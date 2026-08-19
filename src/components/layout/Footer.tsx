import React from "react";
import { useI18n } from "../../lib/i18n";
import { MuhabLogo } from "../brand/MuhabLogo";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const { t, isAr } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { href: "#work", label: t("nav.work") },
    { href: "#products", label: t("nav.products") },
    { href: "#services", label: t("nav.services") },
    { href: "#reputation", label: t("nav.reputation") },
    { href: "#process", label: t("nav.approach") },
    { href: "#about", label: t("nav.about") },
  ];

  return (
    <footer className="bg-[#030A08] text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-16">
        
        {/* Top Row: Brand & Back to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div className="space-y-2">
            <MuhabLogo />
            <p className="text-xs font-mono text-[#D8DCD7]/60 tracking-widest uppercase">
              {t("footer.tagline")}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#D8DCD7]/70 hover:text-white transition-colors"
          >
            <span>{isAr ? "العودة للأعلى" : "Back to top"}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#B9FF38]" />
          </button>
        </div>

        {/* Middle Row: Links & Location */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8 flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs sm:text-sm font-medium text-[#D8DCD7]/75 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="md:col-span-4 text-left rtl:text-right text-xs font-mono text-[#D8DCD7]/60 space-y-1">
            <p>{t("footer.location")}</p>
            <p>contact@muhab.sa</p>
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#D8DCD7]/50">
          <p>{t("footer.rights")}</p>
          <p>{isAr ? "صُنع بإتقان في المملكة العربية السعودية" : "Engineered in Saudi Arabia"}</p>
        </div>

      </div>
    </footer>
  );
};
