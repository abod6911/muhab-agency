import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { I18nProvider, useI18n } from "./lib/i18n";
import { Header } from "./components/layout/Header";
import { FullNavigation } from "./components/layout/FullNavigation";
import { Hero } from "./components/home/Hero";
import { Manifesto } from "./components/home/Manifesto";
import { SelectedWork } from "./components/home/SelectedWork";
import { ProductsSection } from "./components/home/ProductsSection";
import { ClientsTrust } from "./components/home/ClientsTrust";
import { Services } from "./components/home/Services";
import { ReputationShowcase } from "./components/home/ReputationShowcase";
import { Process } from "./components/home/Process";
import { AboutMuhab } from "./components/home/AboutMuhab";
import { ContactSection } from "./components/home/ContactSection";
import { FinalCTA } from "./components/home/FinalCTA";
import { Footer } from "./components/layout/Footer";

function MainContent() {
  const { isAr } = useI18n();
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // Disable JS smooth scroll on touch devices & small screens for 120Hz native hardware speed
    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen bg-[#07130F] text-[#FCFCFA] selection:bg-[#B9FF38] selection:text-[#07130F] ${isAr ? "font-arabic" : "font-sans"}`}>
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[99999] px-4 py-2 bg-[#B9FF38] text-[#07130F] font-bold rounded-lg"
      >
        {isAr ? "الانتقال للمحتوى الرئيسي" : "Skip to main content"}
      </a>

      {/* Clean Editorial Navigation */}
      <Header onOpenContact={handleOpenContact} onOpenNav={() => setIsNavOpen(true)} />

      {/* Fullscreen Mobile / Desktop Drawer Navigation */}
      <FullNavigation
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        onOpenContact={() => {
          setIsNavOpen(false);
          handleOpenContact();
        }}
      />

      {/* Main Page Flow */}
      <main id="main-content" className="relative z-10">
        {/* 01 Hero with realistic phone & real video demo */}
        <Hero onOpenContact={handleOpenContact} />

        {/* 02 Manifesto Typographic Statement */}
        <Manifesto />

        {/* 03 Selected Work (Warm Off-White Editorial Spreads) */}
        <SelectedWork />

        {/* 04 MUHAB Products / Our Companies (Taqyeemi & Wasel) */}
        <ProductsSection />

        {/* 05 Clients & Trust */}
        <ClientsTrust />

        {/* 06 Capabilities & Services (Numbered 1px Rule Rows) */}
        <Services onOpenContact={handleOpenContact} />

        {/* 07 Reputation Solutions & Smart Hardware */}
        <ReputationShowcase onOpenContact={handleOpenContact} />

        {/* 08 5-Stage Disciplined Delivery Process */}
        <Process />

        {/* 09 About MUHAB (Saudi Roots & Jeddah Studio) */}
        <AboutMuhab />

        {/* 10 Contact & Direct WhatsApp Inquiry */}
        <ContactSection />

        {/* 11 Final Closing CTA */}
        <FinalCTA onOpenContact={handleOpenContact} />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <I18nProvider>
      <MainContent />
    </I18nProvider>
  );
}

export default App;
