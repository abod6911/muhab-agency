import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../common/Button';
import { MuhabEmblemImage } from '../common/MuhabLogo';
import { 
  Menu, 
  Globe
} from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import { GooeyNav, type GooeyNavItem } from '../common/GooeyNav';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenMenu }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gooeyNavItems: GooeyNavItem[] = [
    {
      label: language === 'ar' ? 'مشاريعنا' : 'Portfolio',
      href: '#portfolio',
      onClick: (e) => handleNavClick(e as any, '#portfolio'),
    },
    {
      label: language === 'ar' ? 'المسارات التفاعلية' : 'Disciplines',
      href: '#disciplines',
      onClick: (e) => handleNavClick(e as any, '#disciplines'),
    },
    {
      label: language === 'ar' ? 'خدماتنا' : 'Services',
      href: '#services',
      onClick: (e) => handleNavClick(e as any, '#services'),
    },
    {
      label: language === 'ar' ? 'النتائج والسرعة' : 'Metrics',
      href: '#metrics',
      onClick: (e) => handleNavClick(e as any, '#metrics'),
    },
    {
      label: language === 'ar' ? 'تواصل معنا' : 'Contact',
      href: '#contact',
      onClick: (e) => handleNavClick(e as any, '#contact'),
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    try {
      audioSynth.playHoverBlip();
    } catch {}

    const targetEl = document.querySelector(href) as HTMLElement | null;
    if (targetEl) {
      const headerOffset = 75;
      const targetTop = Math.max(0, targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset);

      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      const lenis = (window as unknown as { __lenis?: any }).__lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        try {
          lenis.scrollTo(targetTop, { duration: 0.8, force: true });
        } catch {}
      }

      try {
        window.history.pushState(null, '', href);
      } catch {}
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      audioSynth.playHoverBlip();
    } catch {}
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: any) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#041a12]/95 backdrop-blur-xl border-b border-[#1b4d3b]/40 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
            : 'bg-[#041a12]/50 backdrop-blur-md border-b border-[#1b4d3b]/20 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#hero"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#a6ff2e] via-[#84cc16] to-[#041a12] p-0.5 shadow-[0_0_15px_rgba(166,255,46,0.25)] group-hover:shadow-[0_0_25px_rgba(166,255,46,0.4)] transition-all duration-300">
              <div className="w-full h-full bg-[#020a06] rounded-[9px] flex items-center justify-center p-0.5 overflow-hidden">
                <MuhabEmblemImage size={22} />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#a6ff2e] rounded-full ring-2 ring-[#020a06] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-white text-sm sm:text-base tracking-wider leading-tight flex items-center gap-1.5">
                MUHAB <span className="text-[#a6ff2e] font-semibold text-[9px] tracking-widest px-1.5 py-0.5 rounded bg-[#a6ff2e]/10 border border-[#a6ff2e]/30">STUDIO</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#a6ff2e]/80 font-medium tracking-wider">
                {language === 'ar' ? 'صُنّاع المواقع السعودية' : 'Saudi Webmakers'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with React Bits GooeyNav */}
          <div className="hidden lg:flex items-center bg-[#071d14]/85 border border-emerald-500/25 p-1 rounded-full backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <GooeyNav
              items={gooeyNavItems}
              animationTime={500}
              particleCount={14}
              particleDistances={[70, 8]}
              particleR={85}
              colors={[1, 2, 3, 1, 2, 4]}
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Language Switcher Pill (ع / EN) */}
            <button
              onClick={() => {
                toggleLanguage();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#12261e] hover:bg-[#18352a] border border-[#234939] text-slate-200 hover:text-[#a6ff2e] transition-all duration-200 shadow-sm cursor-pointer active:scale-95"
              title="Switch Language (AR / EN)"
            >
              <Globe className="w-3 h-3 text-[#a6ff2e]" />
              <span className="tracking-wider">{language === 'ar' ? 'ع / EN' : 'AR / EN'}</span>
            </button>

            {/* High-visibility Primary CTA Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onOpenContact();
              }}
              className="font-bold text-xs py-2 px-4 shadow-[0_0_15px_rgba(166,255,46,0.25)]"
            >
              {t('ctaStartProject')}
            </Button>
          </div>

          {/* Mobile & Tablet Menu Button - Instant Click Response */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => {
                toggleLanguage();
              }}
              className="min-h-[36px] px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#12261e] hover:bg-[#18352a] border border-[#234939] text-[#a6ff2e] active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Switch Language"
            >
              {language === 'ar' ? 'ع / EN' : 'AR / EN'}
            </button>
            <button
              onClick={() => {
                onOpenMenu?.();
              }}
              className="w-9 h-9 rounded-full bg-[#12261e] hover:bg-[#18352a] border border-[#234939] text-slate-200 hover:text-[#a6ff2e] focus:outline-none flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-4 h-4 text-[#a6ff2e]" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

