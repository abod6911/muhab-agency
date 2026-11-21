import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { projects } from '../../data/portfolioData';
import type { Project } from '../../types';
import { ProjectCard } from './ProjectCard';

interface PortfolioSectionProps {
  onPreviewProject: (project: Project) => void;
  onRequestSimilar: (projectTitle: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onPreviewProject,
  onRequestSimilar,
}) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'fnb' | 'tea' | 'ecommerce'>('all');

  const filterTabs = [
    { id: 'all', label: t('filterAll') },
    { id: 'fnb', label: t('filterFnb') },
    { id: 'tea', label: t('filterTea') },
    { id: 'ecommerce', label: t('filterEcommerce') },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-24 sm:py-32 bg-[#09090B] border-b border-white/[0.06] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header: Quiet Editorial Typography (No glowing pill badges) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] mb-3">
              {t('portfolioTitle')}
            </h2>
            <p className="text-sm text-[#A1A1AA] max-w-xl">
              {t('portfolioSubtitle')}
            </p>
          </div>

          {/* Clean Minimal Filter Tabs (Subtle Dark Pill) */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#111214] border border-white/[0.08] overflow-x-auto self-start md:self-auto">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white/[0.1] text-[#F4F4F5]'
                      : 'text-[#71717A] hover:text-[#A1A1AA]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean 2-Column Editorial Grid (gap-8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPreview={onPreviewProject}
              onRequestSimilar={onRequestSimilar}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
