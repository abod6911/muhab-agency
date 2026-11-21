import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MuhabEmblemImage } from '../common/MuhabLogo';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  const quickLinks = [
    { href: '#work', label: t('navWork') },
    { href: '#products', label: t('navProducts') },
    { href: '#services', label: t('navServices') },
    { href: '#faq', label: t('navFaq') },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#09090B] border-t border-white/[0.08] pt-16 pb-12 text-[#A1A1AA] text-xs">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* 3 Clean Architectural Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Col 1 (5 Cols): Brand & Location & Availability */}
          <div className="md:col-span-5 flex flex-col items-start gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#111214] border border-white/10 flex items-center justify-center p-1">
                <MuhabEmblemImage size={18} />
              </div>
              <span className="text-sm font-semibold text-[#F4F4F5] tracking-tight">
                MUHAB STUDIO
              </span>
            </div>

            <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-sm mt-1">
              {t('footerStudioDesc')}
            </p>

            <div className="text-xs text-[#71717A] mt-1">
              {t('footerLocation')}
            </div>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-[#A6FF2E] mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A6FF2E]" />
              <span>{t('footerStatus')}</span>
            </div>
          </div>

          {/* Col 2 (3 Cols): Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#F4F4F5]">
              {isAr ? 'روابط سريعة' : 'Navigation'}
            </span>
            <ul className="space-y-2 mt-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 (4 Cols): Direct Contacts & Social */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#F4F4F5]">
              {isAr ? 'تواصل وتابعنا' : 'Connect'}
            </span>

            <div className="space-y-2 mt-1">
              <div>
                <a
                  href="https://wa.me/966565114955"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A1A1AA] hover:text-[#A6FF2E] transition-colors tabular-nums"
                >
                  +966 56 511 4955
                </a>
              </div>
              <div>
                <a
                  href="mailto:muhabagency@gmail.com"
                  className="text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
                >
                  muhabagency@gmail.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://www.tiktok.com/@muhabmebmakers?_r=1&_t=ZS-99jitaEr8Uu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors flex items-center gap-1"
              >
                <span>TikTok</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://www.instagram.com/muhabwebmakers?stkn=OTYydnJiejlpN3B2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors flex items-center gap-1"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71717A]">
          <div>{t('footerRights')}</div>
          <div>{isAr ? 'صُنع بإتقان في المملكة العربية السعودية 🇸🇦' : 'Proudly Engineered in Saudi Arabia 🇸🇦'}</div>
        </div>

      </div>
    </footer>
  );
};
