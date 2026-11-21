import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MuhabEmblemImage } from '../common/MuhabLogo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: t('navWork'), href: '#work' },
    { label: t('navProducts'), href: '#products' },
    { label: t('navServices'), href: '#services' },
    { label: t('navFaq'), href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
      try {
        window.history.pushState(null, '', href);
      } catch {}
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
          isScrolled
            ? 'backdrop-blur-md bg-[#09090B]/85 border-b border-white/[0.06] py-3.5'
            : 'bg-[#09090B]/60 backdrop-blur-sm border-b border-white/[0.04] py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo (Right in RTL, Left in LTR) */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#111214] border border-white/10 flex items-center justify-center p-1 transition-colors group-hover:border-white/20">
              <MuhabEmblemImage size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#F4F4F5] tracking-tight flex items-center gap-1.5">
                MUHAB <span className="text-xs font-normal text-[#71717A]">STUDIO</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation (Center: 4 Clean Links) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-medium text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions (Left in RTL, Right in LTR) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Minimal Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="text-xs font-medium text-[#71717A] hover:text-[#F4F4F5] transition-colors px-2 py-1 cursor-pointer focus:outline-none"
              aria-label="Toggle language"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>

            {/* Primary Solid Lime CTA Button */}
            <button
              type="button"
              onClick={onOpenContact}
              className="h-9 px-4 rounded-md bg-[#A6FF2E] hover:bg-[#b8ff52] text-[#09090B] text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
            >
              <span>{t('ctaStartProject')}</span>
            </button>
          </div>

          {/* Mobile Actions: Language + Menu Burger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="text-xs font-medium text-[#A1A1AA] hover:text-[#F4F4F5] px-2 py-1"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-9 h-9 rounded-md bg-[#111214] border border-white/10 flex items-center justify-center text-[#F4F4F5] hover:border-white/20 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Clean Slide-Over Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xs ms-auto h-full bg-[#09090B] border-s border-white/[0.08] p-6 flex flex-col justify-between shadow-2xl">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#111214] border border-white/10 flex items-center justify-center p-1">
                    <MuhabEmblemImage size={18} />
                  </div>
                  <span className="text-sm font-semibold text-[#F4F4F5]">MUHAB STUDIO</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-md bg-[#111214] border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-[#F4F4F5]"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm font-medium text-[#A1A1AA] hover:text-[#F4F4F5] py-2 transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A]" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full h-10 rounded-md bg-[#A6FF2E] hover:bg-[#b8ff52] text-[#09090B] text-xs font-semibold transition-colors flex items-center justify-center"
              >
                {t('ctaStartProject')}
              </button>
              <div className="text-[11px] text-[#71717A] text-center">
                {isAr ? 'جدة، المملكة العربية السعودية' : 'Jeddah, Saudi Arabia'}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
