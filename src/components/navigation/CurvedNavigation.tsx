import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Curve } from './Curve';
import { NavLink } from './NavLink';
import { MagneticButton } from './MagneticButton';
import { MuhabEmblemImage } from '../common/MuhabLogo';
import { audioSynth } from '../../utils/audioSynth';
import { 
  MapPin, 
  ArrowUpRight, 
  Globe,
  Clock,
  MessageSquare,
  ShieldCheck,
  Zap,
  X
} from 'lucide-react';


interface CurvedNavigationProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: () => void;
  onOpenContact?: () => void;
  isIntroActive?: boolean;
  isModalOpen?: boolean;
}

export const CurvedNavigation: React.FC<CurvedNavigationProps> = ({
  isOpen: controlledIsOpen,
  onOpen: controlledOnOpen,
  onClose: controlledOnClose,
  onToggle: controlledOnToggle,
  onOpenContact,
  isIntroActive = false,
  isModalOpen = false,
}) => {
  const { language, isRTL, toggleLanguage, t } = useLanguage();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [saudiTime, setSaudiTime] = useState('');

  // Allow controlled or uncontrolled operation
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Real-time Riyadh Clock (GMT+3)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Riyadh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setSaudiTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    if (controlledOnToggle) {
      controlledOnToggle();
    } else if (isControlled) {
      if (isOpen) {
        controlledOnClose?.();
      } else {
        controlledOnOpen?.();
      }
    } else {
      setInternalIsOpen((prev) => !prev);
    }
  };

  const handleClose = useCallback(() => {
    try {
      audioSynth.playHoverBlip();
    } catch {}
    if (isControlled) {
      controlledOnClose?.();
    } else {
      setInternalIsOpen(false);
    }
  }, [isControlled, controlledOnClose]);

  const [showMagnetic, setShowMagnetic] = useState(false);

  // Show magnetic button on scroll or when drawer is open
  useEffect(() => {
    let lastShow = false;
    const handleScroll = () => {
      const show = window.scrollY > 120;
      if (show !== lastShow) {
        lastShow = show;
        setShowMagnetic(show);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const navItems = [
    {
      label: language === 'ar' ? 'الرئيسية' : 'Home',
      sublabel: language === 'ar' ? 'البداية ورؤية الاستوديو' : 'The Studio Vision',
      href: '#hero',
    },
    {
      label: language === 'ar' ? 'مشاريعنا' : 'Selected Works',
      sublabel: language === 'ar' ? 'أحدث النماذج الرقمية الحية' : 'Curated Live Showcases',
      href: '#portfolio',
    },
    {
      label: language === 'ar' ? 'بيان الاستوديو' : 'Studio Manifesto',
      sublabel: language === 'ar' ? 'فلسفة الهندسة والأداء الفائق' : 'Our Engineering Philosophy',
      href: '#manifesto',
    },
    {
      label: language === 'ar' ? 'منظومتنا الرقمية' : 'Digital Ecosystem',
      sublabel: language === 'ar' ? 'تقييمي، بوينت باس، فودس' : 'Taqyeemi, PointPass, Foodus',
      href: '#ecosystem',
    },
    {
      label: language === 'ar' ? 'خدماتنا' : 'Our Services',
      sublabel: language === 'ar' ? 'تصميم، تطوير، بوابات دفع، SEO' : 'Bespoke UI, Next.js, SEO',
      href: '#services',
    },
    {
      label: language === 'ar' ? 'المسارات التفاعلية' : 'Kinetic Disciplines',
      sublabel: language === 'ar' ? 'العرض الانسيابي الحي 120 FPS' : '120 FPS Flowing Menu Preview',
      href: '#disciplines',
    },
    {
      label: language === 'ar' ? 'النتائج والسرعة' : 'Metrics & Proof',
      sublabel: language === 'ar' ? 'أرقام حقيقية للسوق السعودي' : 'Sub-Second Performance',
      href: '#metrics',
    },
    {
      label: language === 'ar' ? 'المعمارية التقنية' : 'Bento Architecture',
      sublabel: language === 'ar' ? 'أركان المنظومة الهندسية الفائقة' : 'Interactive 3D Bento Grid',
      href: '#bento-architecture',
    },
    {
      label: language === 'ar' ? 'تواصل معنا' : 'Contact & Booking',
      sublabel: language === 'ar' ? 'استشارة فورية وحساب التكلفة' : 'Direct Inquiry & Proposal',
      href: '#contact',
    },
  ];

  const socials = [
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'X', href: 'https://x.com' },
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'GitHub', href: 'https://github.com' },
  ];

  // Snappy 0.28s Bezier Curtain Wipe Variants (Zero lag, instantaneous response)
  const drawerVariants: Variants = {
    initial: {
      x: isRTL ? '-100%' : '100%',
    },
    enter: {
      x: '0%',
      transition: {
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      x: isRTL ? '-100%' : '100%',
      transition: {
        duration: 0.18,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Staggered list container variants
  const navListVariants: Variants = {
    initial: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
    enter: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.04,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.01,
        staggerDirection: -1,
      },
    },
  };

  // Sub-content fade in
  const subContentVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.35,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.15 },
    },
  };

  return (
    <>
      {/* Floating Magnetic Menu Button Trigger (Only when drawer is closed and page is scrolled) */}
      <AnimatePresence>
        {!isIntroActive && !isModalOpen && !isOpen && showMagnetic && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-5 end-6 z-[130] pointer-events-auto hidden lg:block"
          >
            <MagneticButton
              isOpen={false}
              onClick={handleToggle}
              isRTL={isRTL}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AnimatePresence for Backdrop & Curved Drawer (Instant fast rendering) */}
      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="fixed inset-0 z-[120]"
          >
            {/* Deep Ambient Obsidian Backdrop (Optimized blur for zero frame drops) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              className="fixed inset-0 bg-[#010805]/85 backdrop-blur-sm"
            />

            {/* Curved SVG Morphing Drawer */}
            <motion.aside
              variants={drawerVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className={`fixed top-0 h-[100dvh] max-h-[100dvh] w-full sm:w-[480px] md:w-[580px] lg:w-[680px] bg-gradient-to-b from-[#072418]/98 via-[#041a12]/98 to-[#010a05] text-white shadow-2xl z-[125] flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto overscroll-contain touch-pan-y border-[#1b4d3b] ${
                isRTL
                  ? 'left-0 border-r border-[#1b4d3b]/60'
                  : 'right-0 border-l border-[#1b4d3b]/60'
              }`}
            >
              {/* Top Luminous Neon Beam */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#a6ff2e] to-transparent shadow-[0_0_15px_#a6ff2e]" />

              {/* Dynamic SVG Curve attached to the drawer leading edge (Desktop / Tablet only) */}
              <div className="hidden md:block pointer-events-none">
                <Curve isRTL={isRTL} />
              </div>

              {/* Drawer Top Header Area with Dedicated Close Button */}
              <div className="flex items-center justify-between border-b border-[#1b4d3b]/40 pb-3 shrink-0 gap-3">
                {/* Official Logo Brand */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-[#a6ff2e] via-[#84cc16] to-[#041a12] p-0.5 shadow-[0_0_15px_rgba(166,255,46,0.25)] shrink-0">
                    <div className="w-full h-full bg-[#020a06] rounded-[7px] flex items-center justify-center p-0.5 overflow-hidden">
                      <MuhabEmblemImage size={20} />
                    </div>
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#a6ff2e] rounded-full ring-2 ring-[#020a06] animate-pulse" />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-black text-white text-xs sm:text-base tracking-wider leading-tight flex items-center gap-1">
                      MUHAB <span className="text-[#a6ff2e] font-semibold text-[9px] tracking-widest px-1 py-0.2 rounded bg-[#a6ff2e]/10 border border-[#a6ff2e]/30">STUDIO</span>
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-[#a6ff2e]/90 font-medium tracking-wider truncate max-w-[130px] sm:max-w-none">
                      {language === 'ar' ? 'صُنّاع المواقع السعودية' : 'Saudi Webmakers'}
                    </span>
                  </div>
                </div>

                {/* Header Controls & Explicit Close Button */}
                <div className="flex items-center gap-2">
                  {/* Status Indicator */}
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 text-[10px] font-mono font-bold text-[#a6ff2e]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-ping" />
                    <span>{language === 'ar' ? 'متاح للمشاريع' : 'AVAILABLE'}</span>
                  </div>

                  {/* Language Switcher - ALWAYS VISIBLE ON ALL SCREENS */}
                  <button
                    type="button"
                    onClick={() => {
                      try { audioSynth.playHoverBlip(); } catch {}
                      toggleLanguage();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#12261e] border border-[#234939] text-[#a6ff2e] hover:bg-[#a6ff2e]/20 active:scale-95 transition-all cursor-pointer shadow-sm touch-manipulation min-h-[36px]"
                    aria-label="Switch Language"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#a6ff2e]" />
                    <span>{language === 'ar' ? 'English' : 'العربية'}</span>
                  </button>

                  {/* Dedicated Close Button */}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#12261e] hover:bg-[#a6ff2e]/20 text-slate-200 hover:text-[#a6ff2e] border border-[#234939] hover:border-[#a6ff2e]/50 transition-all cursor-pointer shrink-0 active:scale-95 shadow-sm touch-manipulation font-bold text-xs min-h-[36px]"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-3.5 h-3.5 text-[#a6ff2e]" />
                    <span>{language === 'ar' ? 'إغلاق' : 'Close'}</span>
                  </button>
                </div>
              </div>

              {/* Main Content Area: Split Navigation & Executive Showcase on Desktop */}
              <div className="my-auto py-3 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-center">
                {/* Main Nav Links (Staggered Entrance) */}
                <motion.nav
                  variants={navListVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="md:col-span-7 flex flex-col gap-1 sm:gap-2"
                >
                  {navItems.map((item, idx) => (
                    <NavLink
                      key={item.href}
                      index={idx}
                      label={item.label}
                      sublabel={item.sublabel}
                      href={item.href}
                      isRTL={isRTL}
                      onClick={handleClose}
                    />
                  ))}
                </motion.nav>

                {/* Executive VIP Showcase Panel (Desktop / Tablet) */}
                <motion.div
                  variants={subContentVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="hidden md:flex md:col-span-5 flex-col gap-4 border-s border-[#1b4d3b]/40 ps-6"
                >
                  {/* Real-time Saudi Telemetry */}
                  <div className="p-4 rounded-2xl bg-[#0a2318]/50 border border-emerald-500/20 backdrop-blur-md shadow-inner space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#a6ff2e]">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'توقيت الرياض (KSA)' : 'Riyadh Time'}</span>
                      </span>
                      <span className="font-bold tracking-wider">{saudiTime || '11:00:00 AM'}</span>
                    </div>

                    <div className="text-xs text-slate-300 flex items-center gap-1.5 pt-1 border-t border-emerald-500/15">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{language === 'ar' ? 'فريق التطوير متاح للاستشارات' : 'Senior engineers available'}</span>
                    </div>
                  </div>

                  {/* Direct VIP WhatsApp Consultation Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0c2a1e] to-[#05170f] border border-[#a6ff2e]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-3 relative overflow-hidden group">
                    <div className="absolute top-0 end-0 w-24 h-24 bg-[#a6ff2e]/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#a6ff2e]/15 border border-[#a6ff2e]/30 flex items-center justify-center text-[#a6ff2e]">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-white">
                        {language === 'ar' ? 'استشارة واتساب مباشرة' : 'VIP WhatsApp Direct'}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {language === 'ar'
                        ? 'تواصل فوري خلال 5 دقائق لمناقشة فكرة مشروعك وحساب التكلفة بدقة.'
                        : 'Connect in 5 minutes with our lead architect to discuss your project.'}
                    </p>

                    <a
                      href="https://wa.me/966565114955?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%D9%8A%D9%88%20%D9%85%D9%87%D8%A7%D8%A8%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%85%D8%A8%D8%A7%D8%B4%D8%B1%D8%A9%20%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9%D9%8A"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        try { audioSynth.playHarmonicSuccess(); } catch {}
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#a6ff2e] to-[#84cc16] text-[#020a06] text-xs font-black flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(166,255,46,0.3)] hover:shadow-[0_0_25px_rgba(166,255,46,0.5)] transition-all cursor-pointer"
                    >
                      <span>{language === 'ar' ? 'تواصل مع المهندس الآن' : 'Chat With Lead Architect'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Proof Trust Seals */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#0a2318]/40 border border-emerald-500/15">
                      <Zap className="w-3 h-3 text-[#a6ff2e]" />
                      <span>100/100 Speed</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#0a2318]/40 border border-emerald-500/15">
                      <ShieldCheck className="w-3 h-3 text-[#a6ff2e]" />
                      <span>Cloudflare DDoS</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Drawer Sub-Content Footer */}
              <motion.div
                variants={subContentVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="pt-3 border-t border-[#1b4d3b]/40 flex flex-col gap-3 shrink-0"
              >
                {/* Location Badge, WhatsApp & Primary CTA */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="flex items-center justify-between sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a2318] border border-emerald-500/25 text-[10px] text-[#a6ff2e] font-medium">
                      <MapPin className="w-3 h-3 text-[#a6ff2e]" />
                      <span>{t('locationPill')}</span>
                    </span>

                    {/* Mobile WhatsApp Quick Action */}
                    <a
                      href="https://wa.me/966565114955?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%D9%8A%D9%88%20%D9%85%D9%87%D8%A7%D8%A8%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%85%D8%A8%D8%A7%D8%B4%D8%B1%D8%A9%20%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9%D9%8A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="md:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] active:scale-95 transition-all touch-manipulation"
                    >
                      <MessageSquare className="w-3 h-3 text-[#25D366]" />
                      <span>واتساب</span>
                    </a>
                  </div>

                  {/* Direct Contact Button */}
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      if (onOpenContact) onOpenContact();
                    }}
                    className="w-full sm:w-auto py-2.5 px-5 rounded-full bg-[#a6ff2e] hover:bg-[#b6ff4d] text-[#09110d] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(166,255,46,0.35)] active:scale-95 transition-all cursor-pointer touch-manipulation min-h-[40px]"
                  >
                    <span>{t('ctaStartProject')}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                  </button>
                </div>

                {/* Social Links Row */}
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-medium text-slate-400">
                    {language === 'ar' ? 'تابع استوديو مهاب' : 'Follow MUHAB'}
                  </span>

                  <div className="flex items-center gap-3">
                    {socials.map((s, idx) => (
                      <a
                        key={idx}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#a6ff2e] transition-colors font-medium hover:underline text-[11px]"
                      >
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

