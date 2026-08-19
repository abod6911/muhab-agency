import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../../lib/i18n";
import { MuhabLogo } from "../brand/MuhabLogo";
import { X, ArrowUpRight, Globe } from "lucide-react";
import { motionTokens } from "../../lib/motionTokens";

interface FullNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const FullNavigation: React.FC<FullNavigationProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  const { t, lang, toggleLang, isAr } = useI18n();

  const navItems = [
    { number: "01", href: "#work", label: t("nav.work") },
    { number: "02", href: "#products", label: t("nav.products") },
    { number: "03", href: "#services", label: t("nav.services") },
    { number: "04", href: "#reputation", label: t("nav.reputation") },
    { number: "05", href: "#process", label: t("nav.approach") },
    { number: "06", href: "#about", label: t("nav.about") },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: motionTokens.durationFast, ease: motionTokens.easePrimary }}
          className="fixed inset-0 z-[100] bg-[#07130F]/98 backdrop-blur-2xl text-white flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <MuhabLogo />

            <div className="flex items-center gap-4">
              <button
                onClick={toggleLang}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#D8DCD7]/80 hover:text-white border border-white/15 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#B9FF38]" />
                <span className="font-bold">{lang === "ar" ? "English" : "عربي"}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Editorial Nav Links */}
          <div className="py-12 max-w-2xl">
            <nav className="space-y-4 sm:space-y-6">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: isAr ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: motionTokens.durationMedium, ease: motionTokens.easePrimary }}
                >
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 text-3xl sm:text-5xl font-black text-white/80 hover:text-white transition-all"
                  >
                    <span className="text-xs sm:text-sm font-mono text-[#B9FF38]">
                      {item.number}
                    </span>
                    <span className="group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform">
                      {item.label}
                    </span>
                  </a>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Bottom Information & CTA */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xs text-[#D8DCD7]/70 font-mono">
              <span>Jeddah, Saudi Arabia · contact@muhab.sa</span>
            </div>

            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#B9FF38] text-[#07130F] font-black text-sm hover:bg-[#CAFF5E] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#B9FF38]/20"
            >
              <span>{t("nav.cta")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
