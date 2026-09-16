import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { audioSynth } from '../../utils/audioSynth';
import { 
  X, 
  MessageSquare, 
  Sparkles, 
  Phone, 
  User, 
  Layers, 
  Coins, 
  FileText,
  CheckCircle2,
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  preselectedService = '',
}) => {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: preselectedService || 'تصميم وبرمجة موقع مخصص فاخر',
    budget: '25,000 - 50,000 ر.س',
    brief: '',
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Update service when prop changes
  React.useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  // Handle Escape key to close modal with smooth transition
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        audioSynth.playHoverBlip();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll and prevent background moving when modal is active
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overflow = 'hidden';
      const lenis = (window as unknown as { __lenis?: any }).__lenis;
      lenis?.stop();
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      const lenis = (window as unknown as { __lenis?: any }).__lenis;
      lenis?.start();
    };
  }, [isOpen]);

  const toggleTag = (tag: string) => {
    audioSynth.playTelemetryTick();
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
      const regex = new RegExp(`( • )?${tag}( • )?`, 'g');
      setFormData((prev) => ({
        ...prev,
        brief: prev.brief.replace(regex, ' ').trim(),
      }));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
      const separator = formData.brief.trim() ? ' • ' : '';
      setFormData((prev) => ({
        ...prev,
        brief: formData.brief.trim() + separator + tag,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioSynth.playHarmonicSuccess();

    // Prepare WhatsApp Message URL
    const agencyNumber = '966565114955'; // Official Muhab Studio WhatsApp
    const message = language === 'ar'
      ? `مرحباً استوديو مهاب 👋
أود استشارة وبدء مشروع رقمي جديد معكم:
• الاسم / المنشأة: ${formData.name || 'غير محدد'}
• رقم التواصل: ${formData.phone || 'غير محدد'}
• الخدمة المطلوبة: ${formData.service}
• الميزانية التقريبية: ${formData.budget}
• تفاصيل المشروع: ${formData.brief || 'أرغب في مناقشة التفاصيل خلال الاتصال'}`
      : `Hello MUHAB Studio 👋
I would like to start a new digital project consultation:
• Name / Brand: ${formData.name || 'N/A'}
• Phone: ${formData.phone || 'N/A'}
• Service Required: ${formData.service}
• Budget Estimate: ${formData.budget}
• Brief: ${formData.brief || 'Let\'s discuss on call'}`;

    const whatsappUrl = `https://wa.me/${agencyNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const budgetOptions = [
    t('budget1'),
    t('budget2'),
    t('budget3'),
  ];

  const serviceOptions = language === 'ar' ? [
    'تصميم وبرمجة موقع مخصص فاخر',
    'طلب حوامل تقييمي NFC لخرائط جوجل',
    'تفعيل بطاقات ولاء بوينت باس (Apple Wallet)',
    'نظام قائمة طعام فودس السحابية للمطاعم',
    'ربط بوابات الدفع والتقسيط (مدى، أبل باي، تمارا)',
    'استشارة تقنية وتطويرية شاملة'
  ] : [
    'Bespoke Luxury Web Design & Engineering',
    'Taqyeemi Smart NFC Google Review Stands',
    'PointPass Apple & Google Wallet Loyalty',
    'Foodus Cloud QR Restaurant Dining Menu',
    'Saudi Payment Gateways (Mada, Apple Pay, BNPL)',
    'Comprehensive Digital Strategy & Consultation'
  ];

  const quickTags = language === 'ar' ? [
    'متجر إلكتروني وسلة مبيعات',
    'قائمة مطعم وكافيه تفاعلية',
    'دفع إلكتروني عبر Apple Pay',
    'إعادة تصميم وهوية رقمية'
  ] : [
    'E-Commerce & Checkout',
    'Interactive F&B Menu',
    'Apple Pay Integration',
    'Complete Redesign'
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div 
          key="contact-modal-overlay"
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto overscroll-contain select-none"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Deep Backdrop */}
          <motion.div
            key="contact-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            onClick={() => {
              audioSynth.playHoverBlip();
              onClose();
            }}
            className="fixed inset-0 bg-[#010805]/92 backdrop-blur-2xl"
          />

          {/* Modal Window Vault with 3D Pop & Smooth Exit */}
          <motion.div
            key="contact-dialog-vault"
            initial={{ opacity: 0, scale: 0.90, y: 28, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.88, y: 22, filter: 'blur(12px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="relative w-full max-w-xl bg-gradient-to-b from-[#09281b]/98 via-[#04170f]/98 to-[#010905] border border-emerald-500/35 hover:border-[#a6ff2e]/45 rounded-3xl sm:rounded-[2rem] shadow-[0_25px_90px_rgba(0,0,0,0.95),0_0_40px_rgba(166,255,46,0.14)] z-10 p-4.5 sm:p-7 my-auto max-h-[88vh] sm:max-h-[92vh] overflow-y-auto transition-colors duration-500 [&::-webkit-scrollbar]:hidden"
          >
            {/* Top Luminous Beam */}
            <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#a6ff2e] to-transparent shadow-[0_0_20px_#a6ff2e]" />

            {/* Ambient Corner Lighting */}
            <div className="absolute -top-28 -left-28 w-64 h-64 bg-[#a6ff2e]/12 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-28 -right-28 w-64 h-64 bg-emerald-500/12 rounded-full blur-3xl pointer-events-none" />

            {/* Premium Animated Close (X) Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.85, rotate: -45 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              onClick={() => {
                audioSynth.playHoverBlip();
                onClose();
              }}
              className="absolute top-4 sm:top-5.5 rtl:left-4 rtl:sm:left-6 rtl:right-auto ltr:right-4 ltr:sm:right-6 ltr:left-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-[#a6ff2e]/20 text-slate-400 hover:text-[#a6ff2e] border border-white/10 hover:border-[#a6ff2e]/50 flex items-center justify-center transition-colors cursor-pointer z-20 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </motion.button>

          {/* Modal Header */}
          <div className="mb-3.5 sm:mb-4 relative z-10 pe-10 rtl:pe-0 rtl:ps-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#a6ff2e]/10 border border-[#a6ff2e]/30 text-[#a6ff2e] text-[11px] font-bold shadow-[0_0_12px_rgba(166,255,46,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-ping" />
                <Sparkles className="w-3 h-3 text-[#a6ff2e]" />
                <span>{language === 'ar' ? 'استشارة VIP مباشرة • متاح الآن' : 'VIP DIRECT LINE • ONLINE'}</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
              {t('contactModalTitle')}
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-300 mt-1 leading-relaxed">
              {t('contactModalSubtitle')}
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-4 relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-[#a6ff2e]/20 border border-[#a6ff2e] flex items-center justify-center text-[#a6ff2e] shadow-[0_0_30px_rgba(166,255,46,0.4)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">
                {language === 'ar' ? 'تم توجيه طلبك للواتساب بنجاح!' : 'Redirected to WhatsApp!'}
              </h4>
              <p className="text-sm text-slate-300">
                {language === 'ar' ? 'سيتواصل معك مهندسنا التقني فوراً عبر الدردشة.' : 'Our lead engineer is connecting with you now.'}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
              {/* Name & Phone in 2-column grid on tablet/desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {/* Name field */}
                <div className="group/field">
                  <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-md bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 flex items-center justify-center">
                      <User className="w-2.5 h-2.5 text-[#a6ff2e]" />
                    </div>
                    <span>{t('formName')}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('formNamePlaceholder')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a2318]/70 border border-emerald-500/25 hover:border-emerald-500/45 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#a6ff2e] focus:ring-1 focus:ring-[#a6ff2e]/30 transition-all shadow-inner"
                  />
                </div>

                {/* Phone field */}
                <div className="group/field">
                  <label className="w-full text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-md bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 flex items-center justify-center">
                      <Phone className="w-2.5 h-2.5 text-[#a6ff2e]" />
                    </div>
                    <span>{t('formPhone')}</span>
                  </label>
                  <div className="relative flex items-center" dir="ltr">
                    <div className="absolute left-2.5 pointer-events-none flex items-center gap-1 text-[11px] font-mono font-bold text-[#a6ff2e] bg-[#a6ff2e]/10 px-1.5 py-0.5 rounded border border-[#a6ff2e]/25 z-10 select-none">
                      <span className="text-xs">🇸🇦</span>
                      <span dir="ltr">+966</span>
                    </div>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('formPhonePlaceholder')}
                      className="w-full pl-22 pr-3.5 py-2.5 rounded-xl bg-[#0a2318]/70 border border-emerald-500/25 hover:border-emerald-500/45 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#a6ff2e] focus:ring-1 focus:ring-[#a6ff2e]/30 transition-all shadow-inner text-left font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Service Select */}
              <div className="group/field">
                <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-md bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 flex items-center justify-center">
                    <Layers className="w-2.5 h-2.5 text-[#a6ff2e]" />
                  </div>
                  <span>{t('formService')}</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a2318]/90 border border-emerald-500/25 hover:border-emerald-500/45 text-white text-xs sm:text-sm focus:outline-none focus:border-[#a6ff2e] focus:ring-1 focus:ring-[#a6ff2e]/30 transition-all cursor-pointer appearance-none shadow-inner"
                  >
                    {serviceOptions.map((opt, i) => (
                      <option key={i} value={opt} className="bg-[#03150d] text-white py-2">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Budget Range Selection */}
              <div>
                <label className="w-full text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-md bg-amber-400/10 border border-amber-400/25 flex items-center justify-center">
                      <Coins className="w-2.5 h-2.5 text-amber-400" />
                    </div>
                    <span>{t('formBudget')}</span>
                  </div>
                  <span className="text-[10.5px] text-emerald-400/80 font-medium">
                    {language === 'ar' ? 'اختر النطاق الملائم' : 'Select Tier'}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {budgetOptions.map((budget, i) => (
                    <motion.button
                      type="button"
                      key={i}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      onClick={() => {
                        audioSynth.playTelemetryTick();
                        setFormData({ ...formData, budget });
                      }}
                      className={`h-11 sm:h-12 px-2 rounded-xl text-[11px] sm:text-xs font-bold border transition-all cursor-pointer relative overflow-hidden text-center flex items-center justify-center ${
                        formData.budget === budget
                          ? 'bg-gradient-to-r from-[#a6ff2e] to-[#bbfd5c] text-[#020a06] font-black border-[#a6ff2e] shadow-[0_0_20px_rgba(166,255,46,0.35)]'
                          : 'bg-[#0a2318]/60 text-slate-300 border-emerald-500/20 hover:border-emerald-500/50 hover:text-white hover:bg-[#0d2e20]/80'
                      }`}
                    >
                      <span className="leading-tight">{budget}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Brief field with Quick Suggestions */}
              <div>
                <label className="w-full text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-md bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 flex items-center justify-center">
                      <FileText className="w-2.5 h-2.5 text-[#a6ff2e]" />
                    </div>
                    <span>{t('formDetails')}</span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 font-medium">
                    {language === 'ar' ? 'اختياري' : 'Optional'}
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  placeholder={t('formDetailsPlaceholder')}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0a2318]/70 border border-emerald-500/25 hover:border-emerald-500/45 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#a6ff2e] focus:ring-1 focus:ring-[#a6ff2e]/30 transition-all resize-none shadow-inner"
                />

                {/* Quick Suggestion Chips */}
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-medium me-1">
                    {language === 'ar' ? 'إضافة سريعة:' : 'Quick tags:'}
                  </span>
                  {quickTags.map((tag, idx) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <motion.button
                        key={idx}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleTag(tag)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#a6ff2e] text-[#020a06] border-[#a6ff2e] shadow-[0_0_12px_rgba(166,255,46,0.3)]'
                            : 'bg-emerald-950/40 text-slate-300 hover:text-[#a6ff2e] border-emerald-500/25 hover:border-[#a6ff2e]/40 hover:bg-[#a6ff2e]/10'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-2.5 h-2.5 text-[#020a06]" />
                        ) : (
                          <span className="text-[#a6ff2e]">+</span>
                        )}
                        <span>{tag}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button & Trust Reassurance */}
              <div className="pt-1.5">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative overflow-hidden py-3 px-6 rounded-xl bg-gradient-to-r from-[#a6ff2e] via-[#b8ff52] to-[#a6ff2e] text-[#020a06] font-black text-sm sm:text-base flex items-center justify-between shadow-[0_0_30px_rgba(166,255,46,0.4)] hover:shadow-[0_0_45px_rgba(166,255,46,0.65)] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#020a06]" />
                    <span>{t('btnSubmitWhatsApp')}</span>
                  </div>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#020a06]/15 flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#020a06] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-2.5 text-[10.5px] font-medium text-slate-400 mt-2.5 text-center flex-wrap">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#a6ff2e]" />
                    <span>{language === 'ar' ? 'خصوصية مشفرة' : '100% Encrypted'}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#a6ff2e]" />
                    <span>{language === 'ar' ? 'رد خلال 5 دقائق' : '5min Fast Reply'}</span>
                  </span>
                  <span>•</span>
                  <span>{language === 'ar' ? '🇸🇦 استوديو سعودي معتمد' : '🇸🇦 Saudi Verified'}</span>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
};
