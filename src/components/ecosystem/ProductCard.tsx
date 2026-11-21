import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { EcosystemProduct } from '../../types';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: EcosystemProduct;
  onOrderProduct: (productName: string) => void;
  index?: number;
}

const servicePreselectMap: Record<string, string> = {
  taqyeemi: 'حوامل تقييمي الذكية (NFC)',
  pointpass: 'بطاقات بوينت باس (Apple Wallet)',
  foodus: 'نظام فودس للمنيو والطلب الذاتي',
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOrderProduct }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const handleOrder = () => {
    const serviceName = servicePreselectMap[product.id] || (isAr ? product.nameAr : product.nameEn);
    onOrderProduct(serviceName);
  };

  const bullets = isAr ? product.featuresAr.slice(0, 3) : product.featuresEn.slice(0, 3);
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="rounded-2xl bg-[#111214] border border-white/[0.08] hover:border-white/[0.16] p-7 sm:p-8 flex flex-col justify-between transition-all duration-200">
      <div>
        {/* Top Tag & Title */}
        <div className="mb-4">
          <div className="text-xs font-medium text-[#71717A] mb-2">
            {isAr ? product.taglineAr : product.taglineEn}
          </div>
          <h3 className="text-xl font-bold text-[#F4F4F5] tracking-tight">
            {isAr ? product.nameAr : product.nameEn}
          </h3>
        </div>

        {/* Headline Metric */}
        <div className="mb-5 py-2.5 px-3.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-semibold text-[#A6FF2E] tabular-nums">
          {isAr ? product.highlightMetricAr : product.highlightMetricEn}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6">
          {isAr ? product.descAr : product.descEn}
        </p>

        {/* 3 Crisp Bullets */}
        <div className="space-y-3 mb-8">
          {bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-[#D4D4D8] leading-relaxed">
              <Check className="w-4 h-4 text-[#A6FF2E] shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={handleOrder}
        className="w-full h-11 rounded-lg bg-white/[0.06] hover:bg-[#A6FF2E] hover:text-[#09090B] text-[#F4F4F5] border border-white/[0.08] hover:border-[#A6FF2E] text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
      >
        <span>{isAr ? product.ctaAr : product.ctaEn}</span>
        <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-[-2px] rtl:group-hover:translate-x-[-2px] ltr:group-hover:translate-x-[2px] transition-transform" />
      </button>
    </div>
  );
};
