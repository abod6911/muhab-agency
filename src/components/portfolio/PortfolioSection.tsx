import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { projects } from '../../data/portfolioData';
import type { Project } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { ProjectCard } from './ProjectCard';
import { Briefcase } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

interface PortfolioSectionProps {
  onPreviewProject: (project: Project) => void;
  onRequestSimilar: (projectTitle: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onPreviewProject,
  onRequestSimilar,
}) => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'ecommerce' | 'fnb' | 'tea'>('all');

  const filterTabs = [
    { id: 'all', label: t('filterAll') },
    { id: 'ecommerce', label: t('filterEcommerce') },
    { id: 'fnb', label: t('filterFnb') },
    { id: 'tea', label: t('filterTea') },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-12 sm:py-16 md:py-20 bg-[#041a12]/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -start-20 w-80 h-80 bg-emerald-700/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -end-20 w-80 h-80 bg-[#a6ff2e]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeText={t('portfolioBadge')}
          badgeVariant="mint"
          badgeIcon={<Briefcase className="w-3.5 h-3.5 text-[#a6ff2e]" />}
          title={t('portfolioTitle')}
          subtitle={t('portfolioSubtitle')}
        />

        {/* Filter Tabs Bar with Animated Sliding Pill */}
        <div className="flex items-center justify-start sm:justify-center mb-8 sm:mb-12 overflow-x-auto py-2 px-3 sm:px-4 no-scrollbar max-w-full scroll-smooth">
          <div
            role="tablist"
            aria-label={language === 'ar' ? 'تصنيفات المشاريع' : 'Portfolio Categories'}
            className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-[#061811]/90 backdrop-blur-2xl border border-emerald-500/25 shadow-[0_10px_35px_rgba(0,0,0,0.5)] gap-1 shrink-0 mx-auto sm:mx-0"
          >
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    if (activeCategory !== tab.id) {
                      try { audioSynth.playHoverBlip(); } catch {}
                      setActiveCategory(tab.id as any);
                    }
                  }}
                  className={`relative z-10 px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer select-none whitespace-nowrap focus:outline-none ${
                    isActive
                      ? 'text-[#020a06]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="portfolioActiveTabPill"
                      className="absolute inset-0 bg-[#a6ff2e] rounded-full shadow-[0_0_25px_rgba(166,255,46,0.35)] -z-10"
                      transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                    />
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid Container with Stable Min-Height */}
        <div className="min-h-[460px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onPreview={onPreviewProject}
                  onRequestSimilar={onRequestSimilar}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

