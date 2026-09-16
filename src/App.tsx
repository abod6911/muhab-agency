import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowUp } from 'lucide-react';
import { LanguageProvider } from './context/LanguageContext';

import { Navbar } from './components/layout/Navbar';
import { CurvedNavigation } from './components/navigation';
import { HeroSection } from './components/hero/HeroSection';
import { TrustRibbon } from './components/trust/TrustRibbon';
import { EcosystemSection } from './components/ecosystem/EcosystemSection';
import { PortfolioSection } from './components/portfolio/PortfolioSection';
import { ServicesSection } from './components/services/ServicesSection';
import { MetricsSection } from './components/metrics/MetricsSection';
import { ConsultationBanner } from './components/contact/ConsultationBanner';
import { SocialPhysicsShowcase, IntroSplashScreen, MobileQuickActionBar } from './components/common';
import { AgencyLandingPage } from './components/agency';
import { Footer } from './components/layout/Footer';
import { LivePreviewModal } from './components/portfolio/LivePreviewModal';
import { ContactModal } from './components/contact/ContactModal';
import { projects } from './data/portfolioData';
import type { Project } from './types';

export function AppContent() {
  const [activeView] = useState<'classic' | 'agency'>(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('view=agency')) {
      return 'agency';
    }
    return 'classic';
  });
  const [introExiting, setIntroExiting] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [curvedNavOpen, setCurvedNavOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Global scroll tracking for top neon beam
  const { scrollYProgress, scrollY } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 350, damping: 30 });

  // Initialize Global Lenis 120 FPS Inertial Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
    });

    (window as unknown as { __lenis: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const unsub = scrollY.on('change', (latest) => {
      setShowBackToTop(latest > 900);
    });

    return () => {
      cancelAnimationFrame(rafId);
      unsub();
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [scrollY]);

  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      setPreselectedService(serviceTitle);
    }
    setContactModalOpen(true);
  };

  const handleSelectProjectId = (id: string) => {
    const found = projects.find((p) => p.id === id);
    if (found) {
      setPreviewProject(found);
    }
  };

  // Prevent background scrolling and pause Lenis when modal or navigation drawer is active
  useEffect(() => {
    const isLocked = contactModalOpen || previewProject !== null || curvedNavOpen;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;

    if (isLocked) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      lenis?.start();
    };
  }, [contactModalOpen, previewProject, curvedNavOpen]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#020a06] text-slate-100 flex flex-col selection:bg-[#a6ff2e]/30 selection:text-[#a6ff2e] ambient-glow-bg">
      {/* 120 FPS Global Neon Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 inset-x-0 z-[70] h-[2.5px] bg-gradient-to-r from-emerald-500 via-[#a6ff2e] to-emerald-400 origin-left rtl:origin-right shadow-[0_0_12px_#a6ff2e,0_0_20px_rgba(166,255,46,0.6)] pointer-events-none"
        style={{ scaleX: smoothProgress }}
      />

      {/* Floating Back-to-Top Quick Glide Capsule */}
      <AnimatePresence>
        {showBackToTop && !contactModalOpen && !previewProject && !curvedNavOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-24 end-4 lg:bottom-6 lg:end-6 z-40 p-3 rounded-full bg-[#051a11]/90 hover:bg-[#0c261b] border border-emerald-500/35 hover:border-[#a6ff2e] text-[#a6ff2e] shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(166,255,46,0.25)] backdrop-blur-xl transition-all cursor-pointer group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>


      {/* Mobile High-Converting Floating Quick Action Bar */}
      <AnimatePresence>
        {(introFinished || introExiting) && !contactModalOpen && !previewProject && !curvedNavOpen && (
          <MobileQuickActionBar onOpenContact={() => handleOpenContact()} />
        )}
      </AnimatePresence>

      {/* Luxury Cinematic Awwwards Entry Splash Screen */}
      <IntroSplashScreen 
        onStartExit={() => setIntroExiting(true)} 
        onComplete={() => setIntroFinished(true)}
      />

      {/* Sticky Global Navigation */}
      <Navbar 
        onOpenContact={() => handleOpenContact()} 
        onOpenMenu={() => setCurvedNavOpen(true)}
      />

      {/* Modern Curved SVG Path Wipe Navigation Drawer */}
      <CurvedNavigation
        isOpen={curvedNavOpen}
        onClose={() => setCurvedNavOpen(false)}
        onOpen={() => setCurvedNavOpen(true)}
        onToggle={() => setCurvedNavOpen((prev) => !prev)}
        onOpenContact={() => handleOpenContact()}
        isIntroActive={!introFinished}
        isModalOpen={contactModalOpen || previewProject !== null}
      />

      {activeView === 'agency' ? (
        <AgencyLandingPage onOpenContact={() => handleOpenContact()} />
      ) : (
        <>
          {/* Main Content Sections with Seamless Cinematic Camera Zoom Landing (120 FPS GPU Hardware-Accelerated) */}
          <motion.main 
            animate={{
              scale: introExiting ? 1 : 0.97,
              opacity: introExiting ? 1 : 0.4,
              y: introExiting ? 0 : 16,
            }}
            style={{ willChange: 'transform, opacity' }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col origin-center w-full max-w-full overflow-x-hidden"
          >
            {/* Split Hero Section with iPhone 16 Pro Mockup Showcase */}
            <HeroSection
              onOpenContact={() => handleOpenContact()}
              onSelectProject={handleSelectProjectId}
            />

            {/* 4-Card Trust & Core Differentiators Ribbon */}
            <TrustRibbon />

            {/* Digital Ecosystem & SaaS Products ("لا نبني مجرد مواقع، بل نبتكر منتجات متكاملة") */}
            <EcosystemSection
              onOrderProduct={(productName) => handleOpenContact(productName)}
            />

            {/* Filterable Portfolio & Live Showcases Grid */}
            <PortfolioSection
              onPreviewProject={(project) => setPreviewProject(project)}
              onRequestSimilar={(title) => handleOpenContact(title)}
            />

            {/* 6-Card Services Grid Matrix */}
            <ServicesSection
              onRequestService={(serviceTitle) => handleOpenContact(serviceTitle)}
            />

            {/* Metrics, Proof & Engineering Comparison Section */}
            <MetricsSection />

            {/* Awwwards Physics-Driven Interactive Social Showcase */}
            <section id="social-showcase" className="relative py-8 bg-[#020a06] px-4 sm:px-6 lg:px-8">
              <SocialPhysicsShowcase />
            </section>

            {/* Pre-Footer High-Converting Consultation Banner with Interactive Particle Wave Background */}
            <ConsultationBanner onOpenContact={() => handleOpenContact()} />
          </motion.main>

          {/* Comprehensive Modern 4-Column Luxury Footer */}
          <Footer onOpenContact={() => handleOpenContact()} />
        </>
      )}

      {/* Live Interactive Project Device Modal */}
      <LivePreviewModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
        onRequestSimilar={(title) => handleOpenContact(title)}
      />

      {/* Instant WhatsApp Project Inquiry Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => {
          setContactModalOpen(false);
          setPreselectedService('');
        }}
        preselectedService={preselectedService}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

