import React from 'react';
import { Home, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { MuhabEmblemImage } from './MuhabLogo';

interface NotFoundPageProps {
  onOpenContact?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onOpenContact }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleContact = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      window.location.href = 'https://wa.me/966565114955';
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020a06] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Top Luminous Neon Beam */}
      <div className="fixed top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-emerald-500 via-[#a6ff2e] to-emerald-400 shadow-[0_0_15px_#a6ff2e]" />

      {/* Ambient Radial Lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#a6ff2e]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Central Glassmorphic Card */}
      <div className="relative z-10 max-w-lg w-full bg-gradient-to-b from-[#08281b]/90 via-[#04170f]/95 to-[#010905] border border-emerald-500/35 rounded-3xl p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_40px_rgba(166,255,46,0.12)] text-center">
        
        {/* Studio Emblem Badge */}
        <div className="flex justify-center mb-6">
          <div className="relative p-1 rounded-2xl bg-gradient-to-br from-[#a6ff2e] via-emerald-500 to-[#041a12] shadow-[0_0_30px_rgba(166,255,46,0.35)]">
            <div className="w-14 h-14 bg-[#020a06] rounded-[14px] flex items-center justify-center p-2">
              <MuhabEmblemImage size={40} />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#a6ff2e] rounded-full ring-2 ring-[#020a06] animate-ping" />
          </div>
        </div>

        {/* 404 Headline */}
        <div className="relative inline-block mb-3">
          <span className="text-7xl sm:text-8xl font-black font-mono tracking-tighter bg-gradient-to-b from-white via-slate-200 to-emerald-400/40 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(166,255,46,0.35)]">
            404
          </span>
          <span className="absolute -bottom-1 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#a6ff2e] to-transparent" />
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
          {isAr ? 'الصفحة المطلوبة غير موجودة' : 'Page Not Found'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto mb-8">
          {isAr
            ? 'يبدو أنك سلكت مساراً غير صحيح أو تم تحديث الرابط ضمن بنية استوديو مهاب الرقمية الجديدة.'
            : 'The link you followed may be broken or the page has been moved within MUHAB Studio digital architecture.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleGoHome}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#a6ff2e] via-[#b8ff52] to-[#a6ff2e] text-[#020a06] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(166,255,46,0.4)] hover:shadow-[0_0_35px_rgba(166,255,46,0.65)] hover:scale-102 active:scale-98 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#020a06]" />
            <span>{isAr ? 'العودة للرئيسية' : 'Back to Homepage'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleContact}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-emerald-300 hover:text-[#a6ff2e] font-bold text-xs sm:text-sm border border-emerald-500/25 hover:border-[#a6ff2e]/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
          </button>
        </div>

        {/* Studio Identity Tagline */}
        <div className="mt-8 pt-6 border-t border-emerald-500/20 text-[11px] text-slate-400 font-mono flex items-center justify-center gap-2">
          <span className="text-[#a6ff2e] font-bold">MUHAB.org</span>
          <span>•</span>
          <span>{isAr ? 'صُنّاع المواقع السعودية' : 'Saudi Webmakers'}</span>
        </div>
      </div>
    </div>
  );
};
