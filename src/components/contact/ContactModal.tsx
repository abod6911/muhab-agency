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

  // Lock body scroll when modal is active
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const lenis = (window as unknown as { __lenis?: any }).__lenis;
      lenis?.stop();
    }
    return () => {
      document.body.style.overflow = '';
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
    
    // Clean and normalize phone number for the message
    let cleanPhone = formData.phone.trim();
    if (cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.slice(1);
    }
    if (cleanPhone.startsWith('+966')) {
      cleanPhone = cleanPhone.slice(4).trim();
    } else if (cleanPhone.startsWith('966')) {
      cleanPhone = cleanPhone.slice(3).trim();
    }
    const displayPhone = cleanPhone ? `+966 ${cleanPhone}` : (formData.phone || 'غير محدد');

    const message = language === 'ar'
      ? `مرحباً استوديو مهاب 👋
أود استشارة وبدء مشروع رقمي جديد معكم:
• الاسم / المنشأة: ${formData.name || 'غير محدد'}
• رقم التواصل: ${displayPhone}
• الخدمة المطلوبة: ${formData.service}
• الميزانية التقريبية: ${formData.budget}
• تفاصيل المشروع: ${formData.brief || 'أرغب في مناقشة التفاصيل خلال الاتصال'}`
      : `Hello MUHAB Studio 👋
I would like to start a new digital project consultation:
• Name / Brand: ${formData.name || 'N/A'}
• Phone: ${displayPhone}
• Service Required: ${formData.service}
• Budget Estimate: ${formData.budget}
• Brief: ${formData.brief || 'Let\'s discuss on call'}`;

    // Standard high-reliability WhatsApp endpoint
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${agencyNumber}&text=${encodeURIComponent(message)}`;
    
    // On mobile devices, assigning window.location.href directly launches the native WhatsApp app without popup blocker issues
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || ('ontouchstart' in window);
    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = whatsappUrl;
      }
    }

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
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 overflow-y-auto overscroll-contain select-none"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Deep Backdrop */}
          <motion.div
            key="contact-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            onClick={() => {
              audioSynth.playHoverBlip();
              onClose();
            }}
            className="fixed inset-0 bg-[#010805]/92 backdrop-blur-md"
          />

          {/* Modal Window Vault with Fast Snappy Pop */}
          <motion.div
            key="contact-dialog-vault"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="relative w-full max-w-lg bg-gradient-to-b from-[#09281b]/98 via-[#04170f]/98 to-[#010905] border border-emerald-500/35 hover:border-[#a6ff2e]/45 rounded-2xl sm:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(166,255,46,0.12)] z-10 p-3.5 sm:p-5.5 my-auto max-h-[90vh] overflow-y-auto transition-colors duration-300 [&::-webkit-scrollbar]:hidden"
          >
            {/* Top Luminous Beam */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#a6ff2e] to-transparent shadow-[0_0_15px_#a6ff2e]" />

            {/* Ambient Corner Lighting */}
            <div className="absolute -top-24 -left-24 w-52 h-52 bg-[#a6ff2e]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Premium Animated Close (X) Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={() => {
                audioSynth.playHoverBlip();
                onClose();
              }}
              className="absolute top-3.5 sm:top-4 rtl:left-3.5 rtl:sm:left-5 rtl:right-auto ltr:right-3.5 ltr:sm:right-5 ltr:left-auto w-8 h-8 rounded-full bg-white/5 hover:bg-[#a6ff2e]/20 text-slate-400 hover:text-[#a6ff2e] border border-white/10 hover:border-[#a6ff2e]/50 flex items-center justify-center transition-colors cursor-pointer z-20 shadow-[0_3px_12px_rgba(0,0,0,0.4)]"
              aria-label="Close modal"
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>

          {/* Modal Header */}
          <div className="mb-3 relative z-10 pe-10 rtl:pe-0 rtl:ps-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#a6ff2e]/10 border border-[#a6ff2e]/30 text-[#a6ff2e] text-[10px] font-bold shadow-[0_0_10px_rgba(166,255,46,0.12)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-ping" />
                <Sparkles className="w-2.5 h-2.5 text-[#a6ff2e]" />
                <span>{language === 'ar' ? 'استشارة VIP مباشرة • متاح الآن' : 'VIP DIRECT LINE • ONLINE'}</span>
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
              {t('contactModalTitle')}
            </h3>
            <p className="text-[11.5px] sm:text-xs text-slate-300 mt-0.5 leading-relaxed">
              {t('contactModalSubtitle')}
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 flex flex-col items-center justify-center text-center space-y-3 relative z-10"
            >
              <div className="w-14 h-14 rounded-full bg-[#a6ff2e]/20 border border-[#a6ff2e] flex items-center justify-center text-[#a6ff2e] shadow-[0_0_25px_rgba(166,255,46,0.4)]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                {language === 'ar' ? 'تم توجيه طلبك للواتساب بنجاح!' : 'Redirected to WhatsApp!'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {language === 'ar' ? 'سيتواصل معك مهندسنا التقني فوراً عبر الدردشة.' : 'Our lead engineer is connecting with you now.'}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5 relative z-10">
              {/* Name & Phone in 2-column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Name / Company field */}
                <div className="group/field">
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 flex items-center justify-center">
                      <User className="w-2 h-2 text-[#a6ff2e]" />
                    </div>
                    <span>{language === 'ar' ? 'الاسم الكريم أو اسم الشركة' : 'Full Name or Company'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'ar' ? 'اكتب اسمك أو اسم شركتك هنا' : 'Enter your name or company'}
                    style={{ fontSize: '16px' }}
                    className="w-full px-3 py-2 rounded-xl bg-[#0a2318]/70 border border-emerald-500/25 hover:border-emerald-500/45 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#a6ff2e] focus:ring-1 focus:ring-[#a6ff2e]/30 transition-all shadow-inner"
                  />
                </div>

                {/* Phone field with dedicated Saudi Prefix container */}
                <div className="group/field">
                  <label className="w-full text-[11px] sm:text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 flex items-center justify-center">
                      <Phone className="w-2 h-2 text-[#a6ff2e]" />
                    </div>
                    <span>{t('formPhone')}</span>
                  </label>
                  <div 
                    className="flex items-center rounded-xl bg-[#0a2318]/70 border border-emerald-500/25 hover:border-emerald-500/45 focus-within:border-[#a6ff2e] focus-within:ring-1 focus-within:ring-[#a6ff2e]/30 overflow-hidden shadow-inner transition-all"
                    dir="ltr"
                  >
                    <div className="flex items-center gap-1 px-2.5 py-2 bg-[#051810] border-r border-emerald-500/25 text-[11px] font-mono font-bold text-[#a6ff2e] select-none shrink-0">
                      <span className="text-xs">🇸🇦</span>
                      <span>+966</span>
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      required
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => {
                        // Keep numeric digits, spaces and hyphens clean
                        const val = e.target.value.replace(/[^\d\s-]/g, '');
                        setFormData({ ...formData, phone: val });
                      }}
                      placeholder="5X XXX XXXX"
                      style={{ fontSize: '16px' }}
                      className="w-full px-2.5 py-2 bg-transparent text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none font-mono text-left"
                    />
                  </div>
                </div>
              </div>

              {/* Service Select */}
              <div className="group/field">
                <label className="block text-[11px] sm:text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 flex items-center justify-center">
                    <Layers className="w-2 h-2 text-[#a6ff2e]" />
                  </div>
                  <span>{t('formService')}</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{ fontSize: '16px' }}
                    className="w-full px-3 py-2 rounded-xl bg-[#0a2318]/90 border border-emerald-500/25 hover:border-emerald-500/45 text-white text-xs sm:text-sm focus:outline-none focus:border-[#a6ff2e] focus:ring-1 focus:ring-[#a6ff2e]/30 transition-all cursor-pointer appearance-none shadow-inner"
                  >
                    {serviceOptions.map((opt, i) => (
                      <option key={i} value={opt} className="bg-[#03150d] text-white py-2">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-400">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Budget Range Selection */}
              <div>
                <label className="w-full text-[11px] sm:text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-amber-400/10 border border-amber-400/25 flex items-center justify-center">
                      <Coins className="w-2 h-2 text-amber-400" />
                    </div>
                    <span>{t('formBudget')}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400/80 font-medium">
                    {language === 'ar' ? 'اختر النطاق الملائم' : 'Select Tier'}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {budgetOptions.map((budget, i) => (
                    <motion.button
                      type="button"
                      key={i}
                      whileHover={{ y: -1, scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      onClick={() => {
                        audioSynth.playTelemetryTick();
                        setFormData({ ...formData, budget });
                      }}
                      className={`h-9 sm:h-10 px-1.5 rounded-xl text-[10px] sm:text-xs font-bold border transition-all cursor-pointer relative overflow-hidden text-center flex items-center justify-center ${
                        formData.budget === budget
                          ? 'bg-gradient-to-r from-[#a6ff2e] to-[#bbfd5c] text-[#020a06] font-black border-[#a6ff2e] shadow-[0_0_15px_rgba(166,255,46,0.3)]'
                          : 'bg-[#0a2318]/60 text-slate-300 border-emerald-500/20 hover:border-emerald-500/50 hover:text-white hover:bg-[#0d2e20]/80'
                      }`}
                    >
                      <span className="leading-tight line-clamp-1">{budget}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Brief field with Quick Suggestions */}
              <div>
                <label className="w-full text-[11px] sm:text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 flex items-center justify-center">
                      <FileText className="w-2 h-2 text-[#a6ff2e]" />
                    </div>
                    <span>{t('formDetails')}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {language === 'ar' ? 'اختياري' : 'Optional'}
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  placeholder={t('formDetailsPlaceholder')}
                  style={{ fontSize: '16px' }}
                  className="w-full px-3 py-1.5 rounded-xl bg-[#0a2318]/70 border border-emerald-500/25 hover:border-emerald-500/45 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#a6ff2e] focus:ring-1 focus:ring-[#a6ff2e]/30 transition-all resize-none shadow-inner"
                />

                {/* Quick Suggestion Chips */}
                <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                  <span className="text-[9.5px] text-slate-400 font-medium me-1">
                    {language === 'ar' ? 'إضافة سريعة:' : 'Quick tags:'}
                  </span>
                  {quickTags.map((tag, idx) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <motion.button
                        key={idx}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => toggleTag(tag)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9.5px] font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#a6ff2e] text-[#020a06] border-[#a6ff2e] shadow-[0_0_10px_rgba(166,255,46,0.25)]'
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
              <div className="pt-1">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative overflow-hidden py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#a6ff2e] via-[#b8ff52] to-[#a6ff2e] text-[#020a06] font-black text-xs sm:text-sm flex items-center justify-between shadow-[0_0_25px_rgba(166,255,46,0.35)] hover:shadow-[0_0_35px_rgba(166,255,46,0.55)] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#020a06]" />
                    <span>{t('btnSubmitWhatsApp')}</span>
                  </div>
                  <div className="w-5 h-5 rounded-md bg-[#020a06]/15 flex items-center justify-center">
                    <ArrowUpRight className="w-3 h-3 text-[#020a06] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-2 text-[9.5px] font-medium text-slate-400 mt-2 text-center flex-wrap">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#a6ff2e]" />
                    <span>{language === 'ar' ? 'خصوصية مشفرة' : '100% Encrypted'}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#a6ff2e]" />
                    <span>{language === 'ar' ? 'رد خلال دقائق' : 'Fast Reply'}</span>
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
