import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ecosystemProducts } from '../../data/portfolioData';
import { ProductCard } from './ProductCard';

interface EcosystemSectionProps {
  onOrderProduct: (productName: string) => void;
}

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({ onOrderProduct }) => {
  const { t } = useLanguage();

  return (
    <section id="products" className="py-24 sm:py-32 bg-[#09090B] border-b border-white/[0.06] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] mb-3">
            {t('productsTitle')}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t('productsSubtitle')}
          </p>
        </div>

        {/* 3-Column Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ecosystemProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrderProduct={onOrderProduct}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
