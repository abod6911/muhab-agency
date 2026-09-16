import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  MapPin, 
  MessageSquare, 
  Mail, 
  Phone
} from 'lucide-react';
import { MagneticSocialDock } from '../common/MagneticSocialDock';
import { MuhabEmblemImage } from '../common/MuhabLogo';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const { language, t } = useLanguage();

  const quickLinks = [
    { href: '#hero', label: t('navHome') },
    { href: '#portfolio', label: t('navWork') },
    { href: '#ecosystem', label: t('navProducts') },
    { href: '#services', label: t('navServices') },
    { href: '#metrics', label: t('navMetrics') },
  ];

  const serviceLinks = language === 'ar' ? [
    'تصميم المواقع المخصصة الفاخرة',
    'برمجة وتطوير المواقع والمنصات (Next.js)',
    'ربط بوابات الدفع الوطنية (مدى و Apple Pay)',
    'حوامل تقييمي الذكية لخرائط Google',
    'بطاقات ولاء بوينت باس الرقمية',
    'الصيانة السحابية والدعم الفني 24/7'
  ] : [
    'Bespoke Web Design & UI/UX',
    'Modern Full-Stack Web Development',
    'Saudi Payment Rails & Apple Pay',
    'Taqyeemi NFC Review Stands',
    'PointPass Mobile Wallet Loyalty',
    '24/7 Managed Cloud Support'
  ];


  return (
    <footer id="contact" className="relative bg-[#020B07] border-t border-emerald-500/20 pt-16 sm:pt-20 pb-28 lg:pb-12 overflow-hidden text-slate-300 text-sm">
      {/* Subtle top glare reflection line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a6ff2e]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-emerald-500/15">
          
          {/* Col 1: Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a href="#hero" className="flex items-center gap-3 mb-5 group">
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

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              {t('footerDesc')}
            </p>

            {/* Location Pill */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-[#12261e]/80 border border-emerald-500/25 px-3.5 py-2 rounded-xl mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#a6ff2e]" />
              <span>{t('footerLocation')}</span>
            </div>

            {/* Availability Status Indicator */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#a6ff2e]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#a6ff2e]" />
              </span>
              <span>{t('footerStatus')}</span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-base mb-5">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-[#a6ff2e] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-base mb-5">
              {t('footerServicesTitle')}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((srv, idx) => (
                <li key={idx}>
                  <button
                    onClick={onOpenContact}
                    className="text-start text-xs sm:text-sm text-slate-400 hover:text-[#a6ff2e] transition-colors duration-200"
                  >
                    {srv}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Socials (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-base mb-5">
              {t('footerContactTitle')}
            </h4>

            <div className="space-y-3.5 mb-6">
              <a
                href="https://wa.me/966565114955"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-[#a6ff2e] hover:underline font-bold"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>{t('footerWhatsApp')}</span>
              </a>

              <a
                href="mailto:muhabagency@gmail.com"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('footerEmail')}</span>
              </a>

              <a
                href="tel:+966565114955"
                dir="ltr"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors text-start"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('footerPhone')}</span>
              </a>
            </div>

            {/* Physics-Driven Awwwards Magnetic Social Dock */}
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-3">
                {language === 'ar' ? 'تابعنا على المنصات' : 'Follow Our Studio'}
              </span>
              <MagneticSocialDock 
                size="sm" 
                proximityRadius={100} 
                maxDisplacement={18} 
                className="bg-black/40 border-emerald-500/20"
              />
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t('footerRights')}</p>

          <div className="flex items-center gap-6">
            <span className="text-[#a6ff2e] font-medium flex items-center gap-1.5">
              {t('madeInKsa')}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#a6ff2e] transition-colors">
              {language === 'ar' ? 'خريطة الموقع' : 'Sitemap'}
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">{t('footerPrivacy')}</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">{t('footerTerms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

