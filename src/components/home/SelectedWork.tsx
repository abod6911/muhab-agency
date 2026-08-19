import React from "react";
import { useI18n } from "../../lib/i18n";
import { projectsData } from "../../data/projects";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export const SelectedWork: React.FC = () => {
  const { t, isAr } = useI18n();

  const [p1, p2, p3, p4] = projectsData;

  return (
    <section id="work" className="py-24 sm:py-36 bg-[#F3F3ED] text-[#07130F] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-24 sm:space-y-36">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#064E3B] uppercase tracking-widest font-bold">
            <span>{t("work.eyebrow")}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#07130F] leading-[1.08]">
            {t("work.headline")}
          </h2>
          <p className="text-[#07130F]/75 text-base sm:text-xl leading-relaxed font-normal">
            {t("work.subheadline")}
          </p>
        </div>

        {/* Project 01: Gotcha Fresh Tea (Text Left, Giant Media Right) */}
        {p1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-3 text-xs font-mono text-[#064E3B] font-bold uppercase">
                <span>{p1.number}</span>
                <span className="w-1 h-1 rounded-full bg-[#064E3B]/40" />
                <span>{isAr ? p1.categoryAr : p1.categoryEn}</span>
                <span className="w-1 h-1 rounded-full bg-[#064E3B]/40" />
                <span>{p1.year}</span>
              </div>

              <h3 className="font-display text-3xl sm:text-5xl font-black text-[#07130F] leading-[1.1]">
                {isAr ? p1.titleAr : p1.titleEn}
              </h3>

              <p className="text-[#07130F]/80 text-sm sm:text-base leading-relaxed font-normal">
                {isAr ? p1.descAr : p1.descEn}
              </p>

              <div className="text-xs font-mono text-[#07130F]/70 pt-2">
                <span className="font-bold">{t("work.scope")} </span>
                <span>{(isAr ? p1.scopeAr : p1.scopeEn).join(" · ")}</span>
              </div>

              <div className="pt-2">
                <a
                  href={p1.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-black text-[#064E3B] hover:text-[#07130F] transition-colors group"
                >
                  <span>{t("work.viewLive")}</span>
                  <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isAr ? "rotate-[-90deg]" : ""}`} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <a
                href={p1.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-3xl overflow-hidden bg-[#07130F] shadow-xl aspect-[16/10]"
              >
                <img
                  src={p1.image}
                  alt={isAr ? p1.titleAr : p1.titleEn}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-6 right-6 rtl:right-auto rtl:left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 text-white text-xs font-mono font-bold border border-white/20 group-hover:bg-[#B9FF38] group-hover:text-[#07130F] transition-all">
                  <span>{t("work.viewLive")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>
        )}

        {/* Project 02: Damascene Heritage Restaurant (Giant Media Left, Text Right) */}
        {p2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <a
                href={p2.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-3xl overflow-hidden bg-[#07130F] shadow-xl aspect-[16/10]"
              >
                <img
                  src={p2.image}
                  alt={isAr ? p2.titleAr : p2.titleEn}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-6 right-6 rtl:right-auto rtl:left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 text-white text-xs font-mono font-bold border border-white/20 group-hover:bg-[#B9FF38] group-hover:text-[#07130F] transition-all">
                  <span>{t("work.viewLive")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3 text-xs font-mono text-[#064E3B] font-bold uppercase">
                <span>{p2.number}</span>
                <span className="w-1 h-1 rounded-full bg-[#064E3B]/40" />
                <span>{isAr ? p2.categoryAr : p2.categoryEn}</span>
                <span className="w-1 h-1 rounded-full bg-[#064E3B]/40" />
                <span>{p2.year}</span>
              </div>

              <h3 className="font-display text-3xl sm:text-5xl font-black text-[#07130F] leading-[1.1]">
                {isAr ? p2.titleAr : p2.titleEn}
              </h3>

              <p className="text-[#07130F]/80 text-sm sm:text-base leading-relaxed font-normal">
                {isAr ? p2.descAr : p2.descEn}
              </p>

              <div className="text-xs font-mono text-[#07130F]/70 pt-2">
                <span className="font-bold">{t("work.scope")} </span>
                <span>{(isAr ? p2.scopeAr : p2.scopeEn).join(" · ")}</span>
              </div>

              <div className="pt-2">
                <a
                  href={p2.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-black text-[#064E3B] hover:text-[#07130F] transition-colors group"
                >
                  <span>{t("work.viewLive")}</span>
                  <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isAr ? "rotate-[-90deg]" : ""}`} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Project 03: Ueno Saryo Japanese Teahouse (Full-Width Media with Details Below) */}
        {p3 && (
          <div className="space-y-8">
            <a
              href={p3.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-3xl overflow-hidden bg-[#07130F] shadow-xl aspect-[21/9] sm:aspect-[2.4/1]"
            >
              <img
                src={p3.image}
                alt={isAr ? p3.titleAr : p3.titleEn}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-6 right-6 rtl:right-auto rtl:left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 text-white text-xs font-mono font-bold border border-white/20 group-hover:bg-[#B9FF38] group-hover:text-[#07130F] transition-all">
                <span>{t("work.viewLive")}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline justify-between pt-2">
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center gap-3 text-xs font-mono text-[#064E3B] font-bold uppercase">
                  <span>{p3.number}</span>
                  <span className="w-1 h-1 rounded-full bg-[#064E3B]/40" />
                  <span>{isAr ? p3.categoryAr : p3.categoryEn}</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-black text-[#07130F]">
                  {isAr ? p3.titleAr : p3.titleEn}
                </h3>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <p className="text-[#07130F]/80 text-sm sm:text-base leading-relaxed">
                  {isAr ? p3.descAr : p3.descEn}
                </p>
                <div className="text-xs font-mono text-[#07130F]/70">
                  <span className="font-bold">{t("work.scope")} </span>
                  <span>{(isAr ? p3.scopeAr : p3.scopeEn).join(" · ")}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project 04: LAVOA Café & Lounge (Split Desktop & Mobile Showcase) */}
        {p4 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-6">
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3 text-xs font-mono text-[#064E3B] font-bold uppercase">
                <span>{p4.number}</span>
                <span className="w-1 h-1 rounded-full bg-[#064E3B]/40" />
                <span>{isAr ? p4.categoryAr : p4.categoryEn}</span>
                <span className="w-1 h-1 rounded-full bg-[#064E3B]/40" />
                <span>{p4.year}</span>
              </div>

              <h3 className="font-display text-3xl sm:text-5xl font-black text-[#07130F] leading-[1.1]">
                {isAr ? p4.titleAr : p4.titleEn}
              </h3>

              <p className="text-[#07130F]/80 text-sm sm:text-base leading-relaxed font-normal">
                {isAr ? p4.descAr : p4.descEn}
              </p>

              <div className="text-xs font-mono text-[#07130F]/70 pt-2">
                <span className="font-bold">{t("work.scope")} </span>
                <span>{(isAr ? p4.scopeAr : p4.scopeEn).join(" · ")}</span>
              </div>

              <div className="pt-2">
                <a
                  href={p4.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-black text-[#064E3B] hover:text-[#07130F] transition-colors group"
                >
                  <span>{t("work.viewLive")}</span>
                  <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isAr ? "rotate-[-90deg]" : ""}`} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <a
                href={p4.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-3xl overflow-hidden bg-[#07130F] shadow-xl aspect-[16/10]"
              >
                <img
                  src={p4.image}
                  alt={isAr ? p4.titleAr : p4.titleEn}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-6 right-6 rtl:right-auto rtl:left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 text-white text-xs font-mono font-bold border border-white/20 group-hover:bg-[#B9FF38] group-hover:text-[#07130F] transition-all">
                  <span>{t("work.viewLive")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
