import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ecosystemProducts } from '../../data/portfolioData';
import { SectionHeader } from '../common/SectionHeader';
import { ProductCard } from './ProductCard';
import { Layers } from 'lucide-react';

interface EcosystemSectionProps {
  onOrderProduct: (productName: string) => void;
}

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({ onOrderProduct }) => {
  const { t } = useLanguage();

  return (
    <section id="ecosystem" className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-[#020a06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeText={t('ecosystemBadge')}
          badgeVariant="mint"
          badgeIcon={<Layers className="w-3.5 h-3.5 text-[#a6ff2e]" />}
          title={t('ecosystemTitle')}
          subtitle={t('ecosystemSubtitle')}
          className="mb-8 sm:mb-12"
        />

        {/* 3-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ecosystemProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrderProduct={onOrderProduct}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

