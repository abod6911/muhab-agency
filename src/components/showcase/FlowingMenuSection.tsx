import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FlowingMenu, type FlowingMenuItem } from '../common/FlowingMenu';
import { SectionHeader } from '../common/SectionHeader';
import { getAssetUrl } from '../../utils/assets';
import { Sparkles, MousePointerClick, ArrowUpRight } from 'lucide-react';

interface FlowingMenuSectionProps {
  onOpenContact: (serviceTitle?: string) => void;
  onSelectProject: (projectId: string) => void;
}

export const FlowingMenuSection: React.FC<FlowingMenuSectionProps> = ({
  onOpenContact,
  onSelectProject,
}) => {
  const { language } = useLanguage();

  const menuItems: FlowingMenuItem[] = language === 'ar' ? [
    {
      text: 'المواقع والمنصات الفاخرة المخصصة',
      image: getAssetUrl('assets/projects/lavoa/hero-desktop.png'),
      onClick: () => onSelectProject('lavoa'),
    },
    {
      text: 'أنظمة تقييمي الذكية لخرائط جوجل NFC',
      image: getAssetUrl('taqyeemi-showcase.jpg'),
      onClick: () => onOpenContact('طلب حوامل تقييمي NFC لخرائط جوجل'),
    },
    {
      text: 'متاجر التجارة الإلكترونية فائقة السرعة',
      image: getAssetUrl('assets/projects/gotcha/hero-desktop.png'),
      onClick: () => onSelectProject('gotcha'),
    },
    {
      text: 'بطاقات الولاء الرقمية Apple & Google Wallet',
      image: getAssetUrl('assets/icons/vip-black-card.jpg'),
      onClick: () => onOpenContact('تفعيل بطاقات ولاء بوينت باس (Apple Wallet)'),
    },
    {
      text: 'قوائم الطعام السحابية الذكية للمطاعم',
      image: getAssetUrl('assets/icons/mobile-luxury.jpg'),
      onClick: () => onOpenContact('نظام قائمة طعام فودس السحابية للمطاعم'),
    },
  ] : [
    {
      text: 'Bespoke Luxury Web Architecture',
      image: getAssetUrl('assets/projects/lavoa/hero-desktop.png'),
      onClick: () => onSelectProject('lavoa'),
    },
    {
      text: 'Taqyeemi Smart NFC Google Review Stands',
      image: getAssetUrl('taqyeemi-showcase.jpg'),
      onClick: () => onOpenContact('Taqyeemi Smart NFC Google Review Stands'),
    },
    {
      text: 'Sub-Second E-Commerce & Checkout Engines',
      image: getAssetUrl('assets/projects/gotcha/hero-desktop.png'),
      onClick: () => onSelectProject('gotcha'),
    },
    {
      text: 'Apple & Google Wallet Digital Loyalty Passes',
      image: getAssetUrl('assets/icons/vip-black-card.jpg'),
      onClick: () => onOpenContact('PointPass Apple & Google Wallet Loyalty'),
    },
    {
      text: 'Foodus Interactive Cloud Dining Systems',
      image: getAssetUrl('assets/icons/mobile-luxury.jpg'),
      onClick: () => onOpenContact('Foodus Cloud QR Restaurant Dining Menu'),
    },
  ];

  return (
    <section id="disciplines" className="relative py-12 sm:py-16 md:py-20 bg-[#020a06] overflow-hidden scroll-mt-20">
      {/* Ambient background glow & grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#092c1c14_1px,transparent_1px),linear-gradient(to_bottom,#092c1c14_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#a6ff2e]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badgeText={language === 'ar' ? 'انسيابية تفاعلية حية • INTERACTIVE FLOW' : 'INTERACTIVE FLOW • LIVE PREVIEW'}
          badgeVariant="mint"
          badgeIcon={<Sparkles className="w-3.5 h-3.5 text-[#a6ff2e]" />}
          title={language === 'ar' ? 'المسارات الإبداعية والحلول الهندسية' : 'Creative Disciplines & Digital Systems'}
          subtitle={
            language === 'ar'
              ? 'مرر المؤشر فوق أي مسار لتشهد الانسيابية البصرية الفائقة، واضغط للاطلاع على المشروع أو بدء الاستشارة.'
              : 'Hover over any discipline to preview dynamic real-time momentum, and click to explore the live system or launch inquiry.'
          }
        />

        {/* Floating Interaction Hint Banner */}
        <div className="flex items-center justify-center gap-2 mb-6 text-xs sm:text-sm text-slate-400 font-medium">
          <MousePointerClick className="w-4 h-4 text-[#a6ff2e] animate-bounce" />
          <span>
            {language === 'ar'
              ? 'تفاعل ديناميكي: مرر المؤشر للمعاينة • اضغط لاختيار الخدمة'
              : 'Dynamic interaction: Hover to trigger live stream • Click to consult'}
          </span>
        </div>

        {/* FlowingMenu Container Vault */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl sm:rounded-3xl border border-emerald-500/25 bg-[#031109]/90 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(166,255,46,0.06)] overflow-hidden h-[520px] sm:h-[580px] md:h-[640px] backdrop-blur-xl flex flex-col"
        >
          {/* Top Luminous Neon Beam */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#a6ff2e] to-transparent shadow-[0_0_15px_#a6ff2e] z-20 pointer-events-none" />

          {/* React Bits FlowingMenu Component */}
          <div className="flex-1 min-h-0 w-full relative">
            <FlowingMenu
              items={menuItems}
              speed={14}
              textColor="#f8fafc"
              bgColor="transparent"
              marqueeBgColor="#a6ff2e"
              marqueeTextColor="#020a06"
              borderColor="rgba(16, 185, 129, 0.18)"
            />
          </div>

          {/* Bottom Luxury Sub-footer Bar */}
          <div className="px-5 py-2.5 bg-[#020a06]/95 border-t border-emerald-500/20 backdrop-blur-md flex items-center justify-between text-[11px] sm:text-xs text-slate-400 z-20 pointer-events-none shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a6ff2e] animate-pulse" />
              <span className="font-mono text-slate-300">
                {language === 'ar' ? 'استوديو مهاب • محرك العرض التفاعلي 120 FPS' : 'MUHAB STUDIO • 120 FPS FLOW ENGINE'}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span>{language === 'ar' ? 'جاهز للتنفيذ الفوري' : 'Ready for deployment'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
