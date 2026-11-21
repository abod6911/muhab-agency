import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { projects } from '../../data/portfolioData';
import { Star } from 'lucide-react';

interface PhoneMockupProps {
  onSelectProject: (projectId: string) => void;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ onSelectProject }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  // The 3 flagship showcase projects from the brief: Gotcha, Al-Khal, Lavoa
  const showcaseProjects = projects.filter((p) =>
    ['gotcha-fresh-tea', 'alkhal-aldimashki', 'lavoa'].includes(p.id)
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const current = showcaseProjects[activeIndex] || showcaseProjects[0];
  const preview = current.devicePreview;

  const tabLabels: Record<string, { ar: string; en: string }> = {
    'gotcha-fresh-tea': { ar: 'جوتشا', en: 'Gotcha' },
    'alkhal-aldimashki': { ar: 'الخال الدمشقي', en: 'Al-Khal' },
    'lavoa': { ar: 'لافوا', en: 'Lavoa' },
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Sleek iPhone 16 Pro Frame (Dark Obsidian Hairline) */}
      <div className="relative w-[285px] sm:w-[310px] h-[580px] sm:h-[610px] rounded-[48px] bg-[#09090B] p-3.5 border border-white/[0.12] shadow-2xl overflow-hidden select-none">
        {/* Dynamic Island Speaker Pill */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-end px-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
        </div>

        {/* Screen Display Area */}
        <div className="relative w-full h-full rounded-[38px] bg-[#111214] border border-white/[0.04] overflow-hidden flex flex-col justify-between text-start">
          {/* Status Bar */}
          <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-medium text-zinc-400 z-20">
            <span className="tabular-nums font-semibold text-zinc-200">09:41</span>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="text-[10px] font-bold">5G</span>
              <div className="w-4 h-2 rounded-xs border border-zinc-400 p-0.5 flex items-center">
                <div className="w-full h-full bg-zinc-200 rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Device Content Viewport */}
          <div className="flex-1 flex flex-col justify-between p-4 pt-1 overflow-hidden">
            {/* Top Brand Tag & Rating */}
            <div className="flex items-center justify-between pt-1 pb-3 border-b border-white/[0.06]">
              <span className="text-[11px] font-semibold text-[#A6FF2E] tracking-tight">
                {isAr ? current.titleAr : current.titleEn}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-zinc-300">
                <Star className="w-3 h-3 text-[#A6FF2E] fill-[#A6FF2E]" />
                <span className="font-semibold tabular-nums">{preview.rating}</span>
              </div>
            </div>

            {/* Dish / Showcase Visual Hero */}
            <div className="my-auto py-2 flex flex-col items-center text-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/[0.08] mb-3 bg-zinc-900">
                <img
                  src={current.image}
                  alt={current.titleEn}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-sm font-semibold text-[#F4F4F5] line-clamp-1 mb-1">
                {isAr ? preview.heroTitleAr : preview.heroTitleEn}
              </h3>
              <p className="text-[11px] text-[#A1A1AA] line-clamp-2 leading-relaxed px-1">
                {isAr ? current.descAr : current.descEn}
              </p>
              <div className="mt-2 text-xs font-semibold text-[#F4F4F5] tabular-nums">
                {isAr ? preview.priceTagAr : preview.priceTagEn}
              </div>
            </div>

            {/* Bottom In-Device Actions */}
            <div className="pt-2 border-t border-white/[0.06] flex flex-col gap-2">
              <div className="text-[10px] text-[#71717A] text-center">
                {isAr ? preview.primaryMetricAr : preview.primaryMetricEn}
              </div>
              <button
                type="button"
                onClick={() => onSelectProject(current.id)}
                className="w-full py-2 px-3 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] text-[#F4F4F5] text-xs font-medium text-center transition-colors cursor-pointer"
              >
                {isAr ? preview.ctaTextAr : preview.ctaTextEn}
              </button>
            </div>
          </div>

          {/* Home Indicator Bar */}
          <div className="pb-2 pt-1 flex justify-center">
            <div className="w-28 h-1 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Clean Minimal Switcher Tabs & Live Visit Link Underneath */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
        {/* Switcher Tabs */}
        <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#111214] border border-white/[0.08]">
          {showcaseProjects.map((p, idx) => {
            const isActive = activeIndex === idx;
            const label = tabLabels[p.id] ? (isAr ? tabLabels[p.id].ar : tabLabels[p.id].en) : p.titleEn;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white/[0.1] text-[#F4F4F5]'
                    : 'text-[#71717A] hover:text-[#A1A1AA]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Live Preview Link */}
        {current.liveUrl && (
          <a
            href={current.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#A1A1AA] hover:text-[#A6FF2E] transition-colors"
          >
            <span>{isAr ? 'معاينة الموقع ↗' : 'Live Site ↗'}</span>
          </a>
        )}
      </div>
    </div>
  );
};
