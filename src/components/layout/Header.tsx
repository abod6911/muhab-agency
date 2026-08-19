import React, { useState, useEffect } from "react";
import { useI18n } from "../../lib/i18n";
import { MuhabLogo } from "../brand/MuhabLogo";
import { Globe, Menu, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  onOpenContact: () => void;
  onOpenNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, onOpenNav }) => {
  const { t, isAr, toggleLang } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
        isScrolled
          ? "bg-[#07130F]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none">
          <MuhabLogo showWordmark={true} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono font-medium text-[#D8DCD7] tracking-wider uppercase">
          <a
            href="#work"
            className="hover:text-[#B9FF38] transition-colors duration-200 py-1"
          >
            {t("nav.work")}
          </a>
          <a
            href="#products"
            className="hover:text-[#B9FF38] transition-colors duration-200 py-1"
          >
            {t("nav.products")}
          </a>
          <a
            href="#services"
            className="hover:text-[#B9FF38] transition-colors duration-200 py-1"
          >
            {t("nav.services")}
          </a>
          <a
            href="#reputation"
            className="hover:text-[#B9FF38] transition-colors duration-200 py-1"
          >
            {t("nav.reputation")}
          </a>
          <a
            href="#process"
            className="hover:text-[#B9FF38] transition-colors duration-200 py-1"
          >
            {t("nav.approach")}
          </a>
          <a
            href="#about"
            className="hover:text-[#B9FF38] transition-colors duration-200 py-1"
          >
            {t("nav.about")}
          </a>
        </nav>

        {/* Actions (Language Switch + Solid Lime CTA) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#D8DCD7] text-xs font-mono font-medium border border-white/15 transition-all cursor-pointer"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-[#B9FF38]" />
            <span>{isAr ? "English" : "عربي"}</span>
          </button>

          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B9FF38] hover:bg-[#CAFF5E] text-[#07130F] text-xs font-mono font-black tracking-tight transition-all duration-300 shadow-md shadow-[#B9FF38]/20 cursor-pointer active:scale-95"
          >
            <span>{t("nav.cta")}</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${isAr ? "rotate-[-90deg]" : ""}`} />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={onOpenNav}
            className="lg:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-colors cursor-pointer"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
};
