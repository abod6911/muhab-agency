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
  const { t } = useLanguage();
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
    <section id="portfolio" className="relative py-28 bg-[#041a12]/80">
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

        {/* Filter Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-14 overflow-x-auto py-1 px-2 no-scrollbar max-w-full">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                try { audioSynth.playHoverBlip(); } catch {}
                setActiveCategory(tab.id as any);
              }}
              className={`relative px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 active:scale-95 cursor-pointer ${
                activeCategory === tab.id
                  ? 'text-[#041a12] shadow-[0_0_20px_rgba(0,229,153,0.35)]'
                  : 'text-slate-300 hover:text-white bg-[#12261e]/60 hover:bg-[#12261e] border border-emerald-500/20'
              }`}
            >
              {activeCategory === tab.id && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-[#a6ff2e] rounded-2xl -z-0"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
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

