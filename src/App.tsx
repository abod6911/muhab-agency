import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';

import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { PortfolioSection } from './components/portfolio/PortfolioSection';
import { EcosystemSection } from './components/ecosystem/EcosystemSection';
import { CapabilitiesSection } from './components/services/CapabilitiesSection';
import { FaqSection } from './components/faq/FaqSection';
import { ConsultationBanner } from './components/contact/ConsultationBanner';
import { Footer } from './components/layout/Footer';

import { LivePreviewModal } from './components/portfolio/LivePreviewModal';
import { ContactModal } from './components/contact/ContactModal';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { projects } from './data/portfolioData';
import type { Project } from './types';

export function AppContent() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

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

  // Prevent background scrolling only when modals are active
  useEffect(() => {
    const isLocked = contactModalOpen || previewProject !== null;
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [contactModalOpen, previewProject]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#09090B] text-[#F4F4F5] flex flex-col selection:bg-[#A6FF2E]/20 selection:text-[#A6FF2E]">
      
      {/* 1. Minimal Sticky Navbar */}
      <Navbar onOpenContact={() => handleOpenContact()} />

      <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">
        {/* 2. Focused Editorial Split Hero */}
        <HeroSection
          onOpenContact={() => handleOpenContact()}
          onSelectProject={handleSelectProjectId}
        />

        {/* 3. Selected Work / Portfolio Showcase (Moved UP right after Hero) */}
        <PortfolioSection
          onPreviewProject={(project) => setPreviewProject(project)}
          onRequestSimilar={(title) => handleOpenContact(title)}
        />

        {/* 4. Ready-to-Deploy Digital Products (المنظومة الرقمية) */}
        <EcosystemSection
          onOrderProduct={(productName) => handleOpenContact(productName)}
        />

        {/* 5. Core Capabilities & Process (Merged, Ultra-Clean) */}
        <CapabilitiesSection
          onRequestService={(serviceTitle) => handleOpenContact(serviceTitle)}
        />

        {/* 6. Direct FAQ (Accordion — 5 Essential Questions Only) */}
        <FaqSection />

        {/* 7. Quiet Luxury CTA Block */}
        <ConsultationBanner onOpenContact={() => handleOpenContact()} />
      </main>

      {/* Clean Minimal Architectural Footer */}
      <Footer />

      {/* Subtle, Clean Floating WhatsApp Button */}
      <FloatingWhatsApp
        isModalOpen={contactModalOpen || previewProject !== null}
      />

      {/* Live Interactive Project Device Modal */}
      <LivePreviewModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
        onRequestSimilar={(title) => handleOpenContact(title)}
      />

      {/* Interactive Contact & Order Modal */}
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
