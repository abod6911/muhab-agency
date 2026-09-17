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
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative rounded-3xl bg-[#071912]/85 backdrop-blur-xl border border-emerald-500/20 hover:border-[#a6ff2e]/50 overflow-hidden flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_50px_-10px_rgba(166,255,46,0.2)] transition-[border-color,box-shadow,background-color] duration-300"
    >
      {/* Top luminous border shimmer line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#a6ff2e]/30 to-transparent group-hover:via-[#a6ff2e] transition-all duration-500 pointer-events-none" />

      {/* Top Image Preview Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
        <img
          src={project.image}
          alt={project.titleAr}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020a06] via-transparent to-black/30 opacity-85 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Category Pill Tag */}
        <div className="absolute top-4 inset-inline-start-4 z-10">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#020a06]/90 backdrop-blur-md border border-emerald-500/30 text-emerald-300 shadow-md">
            {language === 'ar' ? project.categoryLabelAr : project.categoryLabelEn}
          </span>
        </div>

        {/* Live Preview Floating Quick Pill */}
        <div className="absolute top-4 inset-inline-end-4 z-10">
          <button
            onClick={() => onPreview(project)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 hover:bg-[#a6ff2e] text-slate-200 hover:text-[#020a06] backdrop-blur-md border border-white/10 hover:border-[#a6ff2e] text-xs font-mono font-bold transition-all duration-200 shadow-md cursor-pointer"
          >
            <span>{t('btnLivePreview')}</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
          </button>
        </div>

        {/* Metric Pill Tag */}
        <div className="absolute bottom-4 inset-inline-start-4 z-10">
          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-[#a6ff2e]/15 backdrop-blur-md border border-[#a6ff2e]/40 text-[#a6ff2e] shadow-md flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            {language === 'ar' ? project.metricsAr : project.metricsEn}
          </span>
        </div>

        {/* Hover Action Overlay on Desktop */}
        <div className="absolute inset-0 bg-[#020a06]/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-wrap items-center justify-center gap-2.5 p-4 z-20">
          <button
            onClick={() => onPreview(project)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#a6ff2e] hover:bg-[#84cc16] text-[#020a06] font-black text-xs shadow-[0_0_25px_rgba(166,255,46,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>{t('btnLivePreview')}</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#12261e] hover:bg-[#1c3a2f] text-[#a6ff2e] border border-[#a6ff2e]/30 font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
              title={language === 'ar' ? 'فتح الموقع الحي' : 'Open Live Site'}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'رابط حي' : 'Live Site'}</span>
            </a>
          )}

          <button
            onClick={() => onRequestSimilar(language === 'ar' ? project.titleAr : project.titleEn)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#071912] hover:bg-[#0c261b] text-white border border-emerald-500/40 font-bold text-xs shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
            <span>{t('btnRequestSimilar')}</span>
          </button>
        </div>
      </div>

      {/* Card Content Footer */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#a6ff2e] transition-colors duration-200">
            {language === 'ar' ? project.titleAr : project.titleEn}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed line-clamp-2 mb-4">
            {language === 'ar' ? project.descAr : project.descEn}
          </p>
        </div>

        {/* Tech Stack Pills & Mobile Buttons */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#020a06] border border-emerald-500/20 text-slate-300 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Fallback buttons for touch/mobile devices */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-500/15 lg:hidden">
            <button
              onClick={() => onPreview(project)}
              className="min-h-[42px] py-2.5 px-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-[#a6ff2e] font-bold text-xs text-center border border-emerald-500/30 flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <Eye className="w-4 h-4 shrink-0" />
              <span className="truncate">{t('btnLivePreview')}</span>
            </button>
            <button
              onClick={() => onRequestSimilar(language === 'ar' ? project.titleAr : project.titleEn)}
              className="min-h-[42px] py-2.5 px-2 rounded-xl bg-[#071912] hover:bg-[#0c261b] text-slate-200 font-bold text-xs text-center border border-emerald-500/20 flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm"
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

