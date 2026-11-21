import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { Project } from '../../types';
import { X, ExternalLink, ArrowUpRight, Check } from 'lucide-react';

interface LivePreviewModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestSimilar: (title: string) => void;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  project,
  onClose,
  onRequestSimilar,
}) => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container (Clean Dark Obsidian #111214) */}
      <div className="relative w-full max-w-4xl bg-[#111214] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col my-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.06] bg-[#09090B]/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h3 className="text-sm sm:text-base font-semibold text-[#F4F4F5] truncate">
              {isAr ? project.titleAr : project.titleEn}
            </h3>
            <span className="text-xs text-[#71717A] px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
              {isAr ? project.categoryLabelAr : project.categoryLabelEn}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-[#A1A1AA] hover:text-[#F4F4F5] border border-white/[0.06] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* Sharp 16:9 Image Preview Frame */}
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.08]">
            <img
              src={project.image}
              alt={isAr ? project.titleAr : project.titleEn}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Left 2 Cols: Description & Highlights */}
            <div className="md:col-span-2 space-y-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-2">
                  {isAr ? 'نبذة عن المشروع' : 'Project Overview'}
                </h4>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {isAr ? project.fullDescAr : project.fullDescEn}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-3">
                  {isAr ? 'النتائج والمخرجات' : 'Key Outcomes'}
                </h4>
                <div className="space-y-2">
                  {(isAr ? project.highlightPointsAr : project.highlightPointsEn).map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4F4F5]">
                      <Check className="w-4 h-4 text-[#A6FF2E] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Stack & Actions */}
            <div className="p-5 rounded-xl bg-[#09090B] border border-white/[0.06] flex flex-col justify-between gap-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-3">
                  {isAr ? 'التقنيات المستخدمة' : 'Tech Stack'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-[#A1A1AA] px-2.5 py-1 rounded-md bg-[#16181B] border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-10 flex items-center justify-center gap-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-[#F4F4F5] text-xs font-medium border border-white/[0.08] transition-colors"
                  >
                    <span>{t('btnVisitLive')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRequestSimilar(isAr ? project.titleAr : project.titleEn);
                  }}
                  className="w-full h-10 flex items-center justify-center gap-1.5 rounded-md bg-[#A6FF2E] hover:bg-[#b8ff52] text-[#09090B] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>{t('btnRequestSimilar')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
