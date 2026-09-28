import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Award, Lock, Zap } from 'lucide-react';

interface TrustBadgesProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  className = '',
  variant = 'full',
}) => {
  const { language } = useLanguage();

  const badges = [
    {
      icon: Award,
      title: language === 'ar' ? 'توثيق رسمي معتمد' : 'Saudi Business Center',
      subtitle: language === 'ar' ? 'المركز السعودي للأعمال' : 'Officially Registered Entity',
      badge: language === 'ar' ? 'معتمد' : 'Verified',
      glow: 'rgba(166,255,46,0.35)',
    },
    {
      icon: ShieldCheck,
      title: language === 'ar' ? 'سجل تجاري نظامي' : 'Official Commercial Reg.',
      subtitle: language === 'ar' ? 'موثق ومعتمد تجارياً' : 'Compliant & Verified CR',
      badge: language === 'ar' ? 'رسمي' : 'Official',
      glow: 'rgba(16,185,129,0.35)',
    },
    {
      icon: Lock,
      title: language === 'ar' ? 'تشفير 256-bit بنكي' : '256-Bit Bank Grade SSL',
      subtitle: language === 'ar' ? 'حماية بيانات ودفع مشفرة' : 'Encrypted & Secure Payments',
      badge: language === 'ar' ? 'مشفر' : 'Encrypted',
      glow: 'rgba(52,211,153,0.35)',
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'ضمان أداء < 0.8s' : 'Ultra-Fast 0.8s SLA',
      subtitle: language === 'ar' ? 'استقرار سحابي 99.9%' : '99.9% Uptime Guarantee',
      badge: '99.9% SLA',
      glow: 'rgba(166,255,46,0.4)',
    },
  ];

  if (variant === 'compact') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 ${className}`}>
        {badges.map((b, i) => {
          const Icon = b.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-xl bg-[#03150d]/80 border border-emerald-500/20 hover:border-[#a6ff2e]/40 transition-all text-start"
            >
              <div className="w-7 h-7 rounded-lg bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 flex items-center justify-center shrink-0 text-[#a6ff2e]">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-white truncate leading-tight">
                  {b.title}
                </p>
                <p className="text-[9.5px] text-slate-400 truncate">
                  {b.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {badges.map((b, i) => {
          const Icon = b.icon;
          return (
            <div
              key={i}
              className="group relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#061d13]/90 to-[#020b07] border border-emerald-500/25 hover:border-[#a6ff2e]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(166,255,46,0.12)] flex items-center gap-3.5"
            >
              {/* Glowing icon badge */}
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#a6ff2e]/20 to-emerald-950/60 border border-[#a6ff2e]/30 flex items-center justify-center text-[#a6ff2e] shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(166,255,46,0.2)]">
                <Icon className="w-5 h-5" />
                <div
                  className="absolute inset-0 rounded-xl blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: b.glow }}
                />
              </div>

              {/* Text content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1.5 mb-0.5">
                  <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#a6ff2e] transition-colors truncate">
                    {b.title}
                  </h5>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-[#a6ff2e]/10 text-[#a6ff2e] border border-[#a6ff2e]/25 shrink-0">
                    {b.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  {b.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
