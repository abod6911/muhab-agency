import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import type { Project } from '../../types';
import { Eye, ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onPreview: (project: Project) => void;
  onRequestSimilar: (projectTitle: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({
  project,
  onPreview,
  onRequestSimilar,
}) => {
  const { language, isRTL, t } = useLanguage();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="group relative rounded-3xl bg-[#061811]/90 backdrop-blur-2xl border border-emerald-500/20 hover:border-[#a6ff2e]/50 overflow-hidden flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_55px_-10px_rgba(166,255,46,0.22)] transition-all duration-300"
    >
      {/* Top luminous border shimmer line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#a6ff2e]/35 to-transparent group-hover:via-[#a6ff2e] transition-all duration-500 pointer-events-none z-30" />

      {/* Top Image Preview Container */}
      <div
        onClick={() => onPreview(project)}
        className="relative w-full aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`${t('btnLivePreview')} - ${language === 'ar' ? project.titleAr : project.titleEn}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPreview(project);
          }
        }}
      >
        <img
          src={project.image}
          alt={language === 'ar' ? project.titleAr : project.titleEn}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient dark cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020a06] via-[#020a06]/25 to-black/35 opacity-90 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none" />

        {/* Category Pill Tag */}
        <div className="absolute top-3.5 inset-inline-start-3.5 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-[#020a06]/85 backdrop-blur-md border border-emerald-500/30 text-emerald-300 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-pulse" />
            {language === 'ar' ? project.categoryLabelAr : project.categoryLabelEn}
          </span>
        </div>

        {/* Metric Pill Tag */}
        <div className="absolute bottom-3.5 inset-inline-start-3.5 z-10 pointer-events-none">
          <span className="text-[11px] sm:text-xs font-bold px-3 py-1 rounded-xl bg-[#020a06]/90 backdrop-blur-md border border-[#a6ff2e]/40 text-[#a6ff2e] shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#a6ff2e]" />
            {language === 'ar' ? project.metricsAr : project.metricsEn}
          </span>
        </div>

        {/* Hover Action Overlay on Desktop */}
        <div className="absolute inset-0 bg-[#020a06]/85 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2.5 p-5 z-20">
          <button
            onClick={() => onPreview(project)}
            className="w-full max-w-[210px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#a6ff2e] hover:bg-[#84cc16] text-[#020a06] font-black text-xs shadow-[0_0_25px_rgba(166,255,46,0.35)] transition-all hover:scale-102 active:scale-98 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>{t('btnLivePreview')}</span>
          </button>

          <button
            onClick={() => onRequestSimilar(language === 'ar' ? project.titleAr : project.titleEn)}
            className="w-full max-w-[210px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#071912] hover:bg-[#0c261b] text-white border border-emerald-500/40 hover:border-[#a6ff2e]/50 font-bold text-xs shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer"
          >
            <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
            <span>{t('btnRequestSimilar')}</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-[#a6ff2e] font-mono transition-colors mt-1"
              title={language === 'ar' ? 'فتح الموقع الحي' : 'Open Live Site'}
            >
              <ExternalLink className="w-3 h-3" />
              <span>{language === 'ar' ? 'فتح الرابط المباشر ↗' : 'Direct Live Link ↗'}</span>
            </a>
          )}
        </div>
      </div>

      {/* Card Content Footer */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Subtle English subtitle/identifier */}
          <div className="text-[11px] font-mono text-emerald-400/75 tracking-wider uppercase mb-1">
            {language === 'ar' ? project.titleEn : project.categoryLabelEn}
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white mb-2 group-hover:text-[#a6ff2e] transition-colors duration-200 leading-snug">
            {language === 'ar' ? project.titleAr : project.titleEn}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed line-clamp-2">
            {language === 'ar' ? project.descAr : project.descEn}
          </p>
        </div>

        {/* Tech Stack Pills & Mobile Buttons */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#020a06] border border-emerald-500/20 text-slate-300 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons for touch / mobile viewports (< lg) */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-500/15 lg:hidden">
            <button
              onClick={() => onPreview(project)}
              className="min-h-[40px] py-2 px-3 rounded-xl bg-[#a6ff2e] hover:bg-[#84cc16] text-[#020a06] font-bold text-xs text-center flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-[0_0_15px_rgba(166,255,46,0.2)]"
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t('btnLivePreview')}</span>
            </button>
            <button
              onClick={() => onRequestSimilar(language === 'ar' ? project.titleAr : project.titleEn)}
              className="min-h-[40px] py-2 px-3 rounded-xl bg-[#03130d] hover:bg-[#072418] text-slate-200 font-bold text-xs text-center border border-emerald-500/30 flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span className="truncate">{t('btnRequestSimilar')}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 shrink-0 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

