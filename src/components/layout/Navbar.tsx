import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../common/Button';
import { MuhabEmblemImage } from '../common/MuhabLogo';
import { 
  Menu, 
  Globe
} from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenMenu }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#portfolio', label: language === 'ar' ? 'مشاريعنا' : 'Projects' },
    { href: '#ecosystem', label: language === 'ar' ? 'أعمالنا' : 'Our Work' },
    { href: '#services', label: language === 'ar' ? 'الخدمات' : 'Services' },
    { href: '#contact', label: language === 'ar' ? 'تواصل معنا' : 'Contact Us' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    try {
      audioSynth.playHoverBlip();
    } catch {}
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts: any) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(href, { offset: -80, duration: 1.2 });
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
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
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#a6ff2e] via-[#84cc16] to-[#041a12] p-0.5 shadow-[0_0_20px_rgba(166,255,46,0.3)] group-hover:shadow-[0_0_30px_rgba(166,255,46,0.55)] transition-all duration-300">
              <div className="w-full h-full bg-[#020a06] rounded-[10px] flex items-center justify-center p-1 overflow-hidden">
                <MuhabEmblemImage size={28} />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#a6ff2e] rounded-full ring-2 ring-[#020a06] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-white text-lg tracking-wider leading-tight flex items-center gap-1.5">
                MUHAB <span className="text-[#a6ff2e] font-semibold text-[10px] tracking-widest px-1.5 py-0.5 rounded bg-[#a6ff2e]/10 border border-[#a6ff2e]/30">STUDIO</span>
              </span>
              <span className="text-[10px] text-[#a6ff2e]/80 font-medium tracking-wider">
                {language === 'ar' ? 'صُنّاع المواقع السعودية' : 'Saudi Webmakers'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 bg-[#12261e]/60 border border-[#234939] px-7 py-2 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-slate-300 hover:text-[#a6ff2e] transition-colors duration-200 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#a6ff2e] scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher Pill (ع / EN) */}
            <button
              onClick={() => {
                try { audioSynth.playHoverBlip(); } catch {}
                toggleLanguage();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#12261e] hover:bg-[#18352a] border border-[#234939] text-slate-200 hover:text-[#a6ff2e] transition-all duration-200 shadow-sm cursor-pointer active:scale-95"
              title="Switch Language (AR / EN)"
            >
              <Globe className="w-3.5 h-3.5 text-[#a6ff2e]" />
              <span className="tracking-wider">{language === 'ar' ? 'ع / EN' : 'AR / EN'}</span>
            </button>

            {/* High-visibility Primary CTA Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                try { audioSynth.playHarmonicSuccess(); } catch {}
                onOpenContact();
              }}
              className="font-black active:scale-95 shadow-[0_0_20px_rgba(166,255,46,0.3)] hover:shadow-[0_0_30px_rgba(166,255,46,0.5)]"
            >
              {t('ctaStartProject')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                try { audioSynth.playHoverBlip(); } catch {}
                toggleLanguage();
              }}
              className="min-h-[40px] px-3.5 py-2 rounded-full text-xs font-bold bg-[#12261e] hover:bg-[#18352a] border border-[#234939] text-[#a6ff2e] active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Switch Language"
            >
              {language === 'ar' ? 'ع / EN' : 'AR / EN'}
            </button>
            <button
              onClick={() => {
                try { audioSynth.playHoverBlip(); } catch {}
                onOpenMenu?.();
              }}
              className="min-h-[40px] min-w-[40px] p-2.5 rounded-full bg-[#12261e] hover:bg-[#18352a] border border-[#234939] text-slate-200 hover:text-[#a6ff2e] focus:outline-none flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-[#a6ff2e]" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

