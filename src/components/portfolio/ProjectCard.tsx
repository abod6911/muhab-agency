import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { Project } from '../../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onPreview: (project: Project) => void;
  onRequestSimilar?: (projectTitle: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({
  project,
  onPreview,
}) => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="group rounded-2xl bg-[#111214] border border-white/[0.08] hover:border-white/[0.16] overflow-hidden flex flex-col transition-all duration-200">
      {/* 16:10 Large Image Preview (Zero Clutter Overlays, Subtle Zoom on Hover) */}
      <div
        onClick={() => onPreview(project)}
        className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900 cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`${t('btnProjectDetails')} - ${isAr ? project.titleAr : project.titleEn}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPreview(project);
          }
        }}
      >
        <img
          src={project.image}
          alt={isAr ? project.titleAr : project.titleEn}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      {/* Card Content Below Image */}
      <div className="p-6 flex flex-col justify-between flex-1 gap-4">
        <div>
          {/* Project Title + Category on One Line */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="text-base font-semibold text-[#F4F4F5] tracking-tight group-hover:text-[#A6FF2E] transition-colors">
              {isAr ? project.titleAr : project.titleEn}
            </h3>
            <span className="text-xs text-[#71717A] shrink-0 font-medium">
              {isAr ? project.categoryLabelAr : project.categoryLabelEn}
            </span>
          </div>

          {/* 1-Line Concrete Summary */}
          <p className="text-xs sm:text-sm text-[#A1A1AA] line-clamp-2 leading-relaxed mb-3">
            {isAr ? project.descAr : project.descEn}
          </p>

          {/* 1 Concise Result Metric in Muted Accent */}
          <div className="text-xs font-medium text-[#A6FF2E] tabular-nums">
            {isAr ? project.metricsAr : project.metricsEn}
          </div>
        </div>

        {/* Action Links Row */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => onPreview(project)}
            className="font-medium text-[#F4F4F5] hover:text-[#A6FF2E] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>{t('btnProjectDetails')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#71717A] hover:text-[#F4F4F5] transition-colors flex items-center gap-1"
            >
              <span>{t('btnVisitLive')}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
});
