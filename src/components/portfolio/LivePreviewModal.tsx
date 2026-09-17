import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import type { Project } from '../../types';
import { Button } from '../common/Button';
import { 
  X, 
  Monitor, 
  Smartphone, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';


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
  const { language, isRTL, t } = useLanguage();
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#020B07]/90 backdrop-blur-xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
          className="relative w-full max-w-5xl bg-[#041a12] border border-emerald-500/30 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] z-10 flex flex-col my-auto max-h-[92vh]"
        >
          {/* Modal Header Bar */}
          <div className="p-3.5 sm:p-5 border-b border-emerald-500/20 bg-[#12261e]/60 backdrop-blur-md flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[170px] xs:max-w-xs sm:max-w-md">
                {language === 'ar' ? project.titleAr : project.titleEn}
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[#a6ff2e]">
                {language === 'ar' ? project.categoryLabelAr : project.categoryLabelEn}
              </span>
            </div>

            {/* View Mode Toggle Switcher */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center bg-[#041a12] p-1 rounded-xl border border-emerald-500/20">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'desktop'
                      ? 'bg-[#a6ff2e] text-[#041a12] shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>{t('modalDesktopView')}</span>
                </button>

                <button
                  onClick={() => setViewMode('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'mobile'
                      ? 'bg-[#a6ff2e] text-[#041a12] shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{t('modalMobileView')}</span>
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl bg-black/40 hover:bg-[#12261e] text-slate-300 hover:text-white border border-white/10 transition-colors active:scale-95 cursor-pointer"
                aria-label={t('modalClose')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Viewport Simulation Frame */}
            <div className="w-full flex justify-center bg-black/50 p-3 sm:p-6 rounded-2xl border border-emerald-500/15 overflow-hidden">
              <div
                className={`transition-all duration-500 rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl relative ${
                  viewMode === 'desktop'
                    ? 'w-full aspect-[16/9]'
                    : 'w-[320px] aspect-[9/18]'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.titleAr}
                  className="w-full h-full object-cover"
                />
                
                {/* Live simulation watermark badge */}
                <div className="absolute top-3 inset-inline-end-3 bg-[#041a12]/85 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 text-[11px] font-bold text-[#a6ff2e] flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#a6ff2e] animate-ping" />
                  <span>MUHAB Bespoke Engine 100/100</span>
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#041a12] via-[#041a12]/80 to-transparent p-4 sm:p-6 flex flex-col justify-end">
                  <span className="text-xs font-bold text-[#a6ff2e] mb-1">
                    {language === 'ar' ? project.metricsAr : project.metricsEn}
                  </span>
                  <h4 className="text-lg sm:text-2xl font-black text-white">
                    {language === 'ar' ? project.titleAr : project.titleEn}
                  </h4>
                </div>
              </div>
            </div>

            {/* Project Deep Scope Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Col 1 & 2: Overview & Achievements */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {language === 'ar' ? 'نبذة عن المشروع والهندسة الرقمية' : 'Project Architecture & Scope'}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {language === 'ar' ? project.fullDescAr : project.fullDescEn}
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#a6ff2e]" />
                    <span>{t('modalHighlights')}</span>
                  </h4>
                  <div className="space-y-2">
                    {(language === 'ar' ? project.highlightPointsAr : project.highlightPointsEn).map((point, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#a6ff2e] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Col 3: Tech Stack & Request Action Card */}
              <div className="rounded-2xl bg-[#12261e]/70 p-5 border border-emerald-500/20 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white mb-3">
                    {t('modalTechStack')}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#041a12] text-emerald-300 border border-emerald-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#a6ff2e]/15 hover:bg-[#a6ff2e]/25 text-[#a6ff2e] border border-[#a6ff2e]/40 font-bold text-xs transition-all shadow-sm active:scale-98"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{language === 'ar' ? 'فتح الموقع الحي في نافذة جديدة' : 'Open Live Website in New Tab'}</span>
                    </a>
                  )}

                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      onClose();
                      onRequestSimilar(language === 'ar' ? project.titleAr : project.titleEn);
                    }}
                    icon={<ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />}
                    className="w-full justify-center"
                  >
                    {t('btnRequestSimilar')}
                  </Button>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

