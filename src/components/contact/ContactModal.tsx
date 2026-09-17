import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { audioSynth } from '../../utils/audioSynth';
import {
  generateOrderId,
  sendOrderToEmail,
  buildWhatsAppUrl,
  buildEmailMailtoUrl,
  COMPANY_EMAIL,
  OFFICIAL_DOMAIN,
  type OrderPayload,
} from '../../services/orderService';
import { 
  X, 
  MessageSquare, 
  Sparkles, 
  Phone, 
  User, 
  Mail,
  Layers, 
  FileText,
  CheckCircle2,
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Check,
  Copy,
  Loader2,
  Send,
  ExternalLink
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
    email: '',
    service: preselectedService || 'تصميم وبرمجة موقع مخصص فاخر',
    brief: '',
  });

  const [sendMethod, setSendMethod] = useState<'email' | 'whatsapp'>('email');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<OrderPayload | null>(null);
  const [copied, setCopied] = useState(false);

  // Synchronize service when prop changes (React recommended pattern)
  const [prevPropService, setPrevPropService] = useState(preselectedService);
  if (preselectedService && preselectedService !== prevPropService) {
    setPrevPropService(preselectedService);
    setFormData((prev) => ({ ...prev, service: preselectedService }));
  }

  const handleCloseModal = React.useCallback(() => {
    onClose();
    // Delay resetting state so animations exit gracefully
    setTimeout(() => {
      setCreatedOrder(null);
      setIsSubmitting(false);
      setCopied(false);
    }, 400);
  }, [onClose]);

  // Handle Escape key to close modal with smooth transition
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        audioSynth.playHoverBlip();
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleCloseModal]);

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

  const processOrder = async (targetMethod: 'email' | 'whatsapp') => {
    if (isSubmitting) return;

    // Validate email if submitting via email channel
    if (targetMethod === 'email' && !formData.email.trim()) {
      audioSynth.playTelemetryTick();
      const emailInput = document.getElementById('contact-email-input');
      emailInput?.focus();
      return;
    }

    setIsSubmitting(true);
    audioSynth.playTelemetryTick();

    // 1. Generate unique corporate Order ID (e.g. MH-26-8492)
    const orderId = generateOrderId();

    const payload: OrderPayload = {
      orderId,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      service: formData.service,
      brief: formData.brief.trim(),
      tags: selectedTags,
      sourceDomain: OFFICIAL_DOMAIN,
      sendMethod: targetMethod,
    };

    // 2. Dispatch complete details directly to muhabagency@gmail.com
    await sendOrderToEmail(payload);

    audioSynth.playHarmonicSuccess();
    setCreatedOrder(payload);
    setIsSubmitting(false);

    // 3. If WhatsApp method, launch WhatsApp directly
    if (targetMethod === 'whatsapp') {
      const whatsappUrl = buildWhatsAppUrl(payload, language === 'ar' ? 'ar' : 'en');
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || ('ontouchstart' in window);
      if (isMobile) {
        window.location.href = whatsappUrl;
      } else {
        const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        if (!win) {
          window.location.href = whatsappUrl;
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await processOrder(sendMethod);
  };

  const handleCopyOrderId = () => {
    if (!createdOrder) return;
    audioSynth.playHoverBlip();
    navigator.clipboard.writeText(createdOrder.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleOpenWhatsApp = () => {
    if (!createdOrder) return;
    audioSynth.playHarmonicSuccess();
    const whatsappUrl = buildWhatsAppUrl(createdOrder, language === 'ar' ? 'ar' : 'en');
    
    // Direct mobile app invocation or safe desktop open
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || ('ontouchstart' in window);
    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = whatsappUrl;
      }
    }
  };

  const handleOpenMailApp = () => {
    if (!createdOrder) return;
    audioSynth.playHarmonicSuccess();
    const mailtoUrl = buildEmailMailtoUrl(createdOrder, language === 'ar' ? 'ar' : 'en');
    window.location.href = mailtoUrl;
  };

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
            className="relative w-full max-w-lg bg-gradient-to-b from-[#09281b]/98 via-[#04170f]/98 to-[#010905] border border-emerald-500/35 hover:border-[#a6ff2e]/45 rounded-2xl sm:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(166,255,46,0.12)] z-10 px-4 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5 my-auto max-h-[92vh] overflow-y-auto transition-colors duration-300 [&::-webkit-scrollbar]:hidden"
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
                handleCloseModal();
              }}
              className="absolute top-3 sm:top-4 rtl:left-3 rtl:sm:left-4 rtl:right-auto ltr:right-3 ltr:sm:right-4 ltr:left-auto w-7.5 h-7.5 rounded-full bg-white/5 hover:bg-[#a6ff2e]/20 text-slate-400 hover:text-[#a6ff2e] border border-white/10 hover:border-[#a6ff2e]/50 flex items-center justify-center transition-colors cursor-pointer z-20 shadow-[0_3px_12px_rgba(0,0,0,0.4)]"
              aria-label="Close modal"
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>

          {/* Modal Header (Only shown when form is open) */}
          {!createdOrder && (
            <div className="mb-3 relative z-10 pe-8 rtl:pe-0 rtl:ps-0">
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
          )}

          {createdOrder ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="py-1 sm:py-2 flex flex-col items-center justify-center text-center space-y-2.5 relative z-10"
            >
              {/* Glowing Success Ring */}
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#a6ff2e]/15 border-2 border-[#a6ff2e] flex items-center justify-center text-[#a6ff2e] shadow-[0_0_30px_rgba(166,255,46,0.45)]">
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="absolute -inset-1 bg-[#a6ff2e]/20 rounded-full blur-md -z-10 animate-pulse" />
              </div>

              {/* Title & Email Dispatch Notification */}
              <div>
                <h4 className="text-base sm:text-lg font-black text-white">
                  {language === 'ar' ? 'تم توثيق وإرسال طلبك بنجاح!' : 'Order Verified & Sent!'}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 max-w-sm mx-auto leading-relaxed">
                  {language === 'ar' 
                    ? 'تم إرسال كافة تفاصيل ومواصفات طلبك رسمياً إلى بريد الشركة:'
                    : 'All order specifications sent officially to the agency email:'}
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#a6ff2e]/10 border border-[#a6ff2e]/30 text-[#a6ff2e] font-mono text-[11px] sm:text-xs font-bold mt-1 shadow-[0_0_12px_rgba(166,255,46,0.15)]">
                  <Mail className="w-3 h-3" />
                  <span>{COMPANY_EMAIL}</span>
                </div>
              </div>

              {/* VIP Order Reference ID Card */}
              <div className="w-full bg-[#051810]/95 border border-emerald-500/35 rounded-2xl p-2.5 sm:p-3 shadow-inner text-center relative overflow-hidden">
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 mb-0.5 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-ping" />
                  <span>{language === 'ar' ? 'رقم الطلب المرجعي الرسمي (احفظ هذا الرقم):' : 'Official Order Reference ID:'}</span>
                </div>

                <div className="flex items-center justify-center gap-2.5 my-1">
                  <span className="text-lg sm:text-xl font-black font-mono text-[#a6ff2e] tracking-widest drop-shadow-[0_0_12px_rgba(166,255,46,0.6)]">
                    {createdOrder.orderId}
                  </span>

                  <button
                    type="button"
                    onClick={handleCopyOrderId}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#a6ff2e]/15 hover:bg-[#a6ff2e]/30 text-[#a6ff2e] text-[10px] font-bold border border-[#a6ff2e]/40 transition-all cursor-pointer select-none active:scale-95"
                    title="نسخ رقم الطلب"
                  >
                    {copied ? (
                      <>
                        <Check className="w-2.5 h-2.5 text-[#a6ff2e]" />
                        <span>{language === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-2.5 h-2.5" />
                        <span>{language === 'ar' ? 'نسخ الرقم' : 'Copy ID'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Brief Summary Pill */}
                <div className="mt-1.5 pt-1.5 border-t border-emerald-500/20 flex items-center justify-center gap-2 text-[10px] sm:text-[10.5px] text-slate-300 flex-wrap font-medium">
                  <span className="text-white font-semibold">{createdOrder.name}</span>
                  <span className="text-emerald-500/50">•</span>
                  <span className="text-slate-300">{createdOrder.service}</span>
                  <span className="text-emerald-500/50">•</span>
                  <span className="text-[#a6ff2e] font-mono">{OFFICIAL_DOMAIN}</span>
                </div>
              </div>

              {/* Dual Action Options on Success */}
              <div className="w-full space-y-2 pt-1">
                {/* Mail App Direct Confirmation */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOpenMailApp}
                  className="w-full group py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#a6ff2e] via-[#b8ff52] to-[#a6ff2e] text-[#020a06] font-black text-xs sm:text-sm flex items-center justify-between shadow-[0_0_25px_rgba(166,255,46,0.4)] hover:shadow-[0_0_35px_rgba(166,255,46,0.65)] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#020a06]" />
                    <span>
                      {language === 'ar' ? 'فتح تطبيق البريد مباشرة للتأكيد والإرسال' : 'Open Mail App to Verify & Send'}
                    </span>
                  </div>
                  <div className="w-5 h-5 rounded-md bg-[#020a06]/15 flex items-center justify-center">
                    <ExternalLink className="w-3 h-3 text-[#020a06] group-hover:scale-110 transition-transform" />
                  </div>
                </motion.button>

                {/* WhatsApp VIP Follow-up */}
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-emerald-300 hover:text-[#a6ff2e] text-xs font-bold border border-emerald-500/25 hover:border-[#a6ff2e]/40 flex items-center justify-between transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>
                      {language === 'ar' ? 'أو متابعة فورية مع المهندس عبر الواتساب' : 'Or Direct Follow-up via WhatsApp'}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'إغلاق والعودة للموقع' : 'Close and Return'}
                </button>
              </div>
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

              {/* Service Select & Optional Email in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                      className="w-full ps-3 pe-8 py-2 rounded-xl bg-[#0a2318]/90 border border-emerald-500/25 hover:border-emerald-500/45 text-white text-xs sm:text-sm focus:outline-none focus:border-[#a6ff2e] focus:ring-1 focus:ring-[#a6ff2e]/30 transition-all cursor-pointer appearance-none shadow-inner"
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

                {/* Email field (Highlighted) */}
                <div className="group/field">
                  <label className="w-full text-[11px] sm:text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 flex items-center justify-center">
                        <Mail className="w-2 h-2 text-[#a6ff2e]" />
                      </div>
                      <span>{language === 'ar' ? 'البريد الإلكتروني للعميل' : 'Client Email'}</span>
                    </div>
                    <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap ${sendMethod === 'email' ? 'bg-[#a6ff2e]/20 text-[#a6ff2e] border border-[#a6ff2e]/40' : 'text-slate-400'}`}>
                      {sendMethod === 'email' ? (language === 'ar' ? 'مطلوب للإرسال' : 'Required') : (language === 'ar' ? 'اختياري' : 'Optional')}
                    </span>
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    required={sendMethod === 'email'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    style={{ fontSize: '16px' }}
                    className={`w-full px-3 py-2 rounded-xl bg-[#0a2318]/70 border text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none transition-all shadow-inner ${
                      sendMethod === 'email' 
                        ? 'border-[#a6ff2e]/40 focus:border-[#a6ff2e] focus:ring-1 focus:ring-[#a6ff2e]/30' 
                        : 'border-emerald-500/25 hover:border-emerald-500/45 focus:border-[#a6ff2e]'
                    }`}
                  />
                </div>
              </div>

              {/* Preferred Sending & Contact Channel Selector */}
              <div>
                <label className="w-full text-[11px] sm:text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-[#a6ff2e]/10 border border-[#a6ff2e]/25 flex items-center justify-center">
                      <Send className="w-2 h-2 text-[#a6ff2e]" />
                    </div>
                    <span>{language === 'ar' ? 'طريقة إرسال الطلب والتواصل المفضلة' : 'Preferred Submission Method'}</span>
                  </div>
                  <span className="text-[10px] text-[#a6ff2e] font-medium">
                    {language === 'ar' ? 'إرسال فوري ومباشر' : 'Instant Dispatch'}
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {/* Email Option */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      audioSynth.playTelemetryTick();
                      setSendMethod('email');
                    }}
                    className={`h-11 sm:h-12 px-2.5 sm:px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-start gap-2 relative ${
                      sendMethod === 'email'
                        ? 'bg-gradient-to-r from-[#a6ff2e]/25 via-[#a6ff2e]/10 to-transparent border-[#a6ff2e] text-[#a6ff2e] shadow-[0_0_15px_rgba(166,255,46,0.25)] ring-1 ring-[#a6ff2e]/30'
                        : 'bg-[#0a2318]/60 text-slate-300 border-emerald-500/20 hover:border-emerald-500/40 hover:text-white'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${sendMethod === 'email' ? 'bg-[#a6ff2e] text-[#020a06]' : 'bg-white/5 text-slate-400'}`}>
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-start leading-tight min-w-0">
                      <div className="text-[11px] sm:text-xs font-black truncate">
                        {language === 'ar' ? 'عبر البريد الإلكتروني' : 'Via Official Email'}
                      </div>
                      <div className="text-[9px] text-slate-400 font-mono truncate">
                        muhabagency@gmail.com
                      </div>
                    </div>
                  </motion.button>

                  {/* WhatsApp Option */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      audioSynth.playTelemetryTick();
                      setSendMethod('whatsapp');
                    }}
                    className={`h-11 sm:h-12 px-2.5 sm:px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-start gap-2 relative ${
                      sendMethod === 'whatsapp'
                        ? 'bg-gradient-to-r from-emerald-500/25 via-emerald-500/10 to-transparent border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/30'
                        : 'bg-[#0a2318]/60 text-slate-300 border-emerald-500/20 hover:border-emerald-500/40 hover:text-white'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${sendMethod === 'whatsapp' ? 'bg-emerald-400 text-[#020a06]' : 'bg-white/5 text-slate-400'}`}>
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-start leading-tight min-w-0">
                      <div className="text-[11px] sm:text-xs font-black truncate">
                        {language === 'ar' ? 'عبر الواتساب المباشر' : 'Via Direct WhatsApp'}
                      </div>
                      <div className="text-[9px] text-slate-400 font-mono truncate">
                        +966 56 511 4955
                      </div>
                    </div>
                  </motion.button>
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

              {/* Submit Buttons & Trust Reassurance */}
              <div className="pt-1 space-y-2">
                {sendMethod === 'email' ? (
                  <>
                    {/* Primary Button: Email */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full group relative overflow-hidden py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-[#a6ff2e] via-[#b8ff52] to-[#a6ff2e] text-[#020a06] font-black text-xs sm:text-sm flex items-center justify-between shadow-[0_0_25px_rgba(166,255,46,0.35)] hover:shadow-[0_0_35px_rgba(166,255,46,0.55)] transition-all cursor-pointer disabled:opacity-80"
                    >
                      {isSubmitting ? (
                        <div className="w-full flex items-center justify-center gap-2 py-0.5">
                          <Loader2 className="w-4 h-4 animate-spin text-[#020a06]" />
                          <span>{language === 'ar' ? 'جاري إرسال طلبك فوراً إلى بريد الشركة...' : 'Sending to muhabagency@gmail.com...'}</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#020a06]" />
                            <span>{language === 'ar' ? 'إرسال الطلب فوراً إلى إيميل الشركة' : 'Send Order to Agency Email'}</span>
                          </div>
                          <div className="w-5 h-5 rounded-md bg-[#020a06]/15 flex items-center justify-center">
                            <ArrowUpRight className="w-3 h-3 text-[#020a06] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </>
                      )}
                    </motion.button>

                    {/* Alternate Direct Action: WhatsApp */}
                    <button
                      type="button"
                      onClick={() => processOrder('whatsapp')}
                      disabled={isSubmitting}
                      className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-emerald-500/15 text-emerald-300 hover:text-[#a6ff2e] text-[11px] sm:text-xs font-bold border border-emerald-500/20 hover:border-[#a6ff2e]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{language === 'ar' ? 'أو الإرسال والاستشارة مباشرة عبر الواتساب' : 'Or Send & Consult via WhatsApp'}</span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Primary Button: WhatsApp */}
                    <motion.button
                      type="button"
                      onClick={() => processOrder('whatsapp')}
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full group relative overflow-hidden py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-[#a6ff2e] via-[#b8ff52] to-[#a6ff2e] text-[#020a06] font-black text-xs sm:text-sm flex items-center justify-between shadow-[0_0_25px_rgba(166,255,46,0.35)] hover:shadow-[0_0_35px_rgba(166,255,46,0.55)] transition-all cursor-pointer disabled:opacity-80"
                    >
                      {isSubmitting ? (
                        <div className="w-full flex items-center justify-center gap-2 py-0.5">
                          <Loader2 className="w-4 h-4 animate-spin text-[#020a06]" />
                          <span>{language === 'ar' ? 'جاري توثيق وفتح المحادثة...' : 'Connecting to WhatsApp...'}</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-[#020a06]" />
                            <span>{language === 'ar' ? 'إرسال واستشارة فورية عبر الواتساب' : 'Send & Chat Instantly on WhatsApp'}</span>
                          </div>
                          <div className="w-5 h-5 rounded-md bg-[#020a06]/15 flex items-center justify-center">
                            <ArrowUpRight className="w-3 h-3 text-[#020a06] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </>
                      )}
                    </motion.button>

                    {/* Alternate Direct Action: Email */}
                    <button
                      type="button"
                      onClick={() => processOrder('email')}
                      disabled={isSubmitting}
                      className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-emerald-500/15 text-emerald-300 hover:text-[#a6ff2e] text-[11px] sm:text-xs font-bold border border-emerald-500/20 hover:border-[#a6ff2e]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#a6ff2e]" />
                      <span>{language === 'ar' ? 'أو إرسال الطلب فوراً إلى بريد الشركة' : 'Or Send to Agency Email'}</span>
                    </button>
                  </>
                )}

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-2 text-[9px] sm:text-[9.5px] font-medium text-slate-400 pt-0.5 text-center flex-wrap">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#a6ff2e]" />
                    <span>{language === 'ar' ? 'إرسال مباشر إلى muhabagency@gmail.com' : 'Direct to muhabagency@gmail.com'}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#a6ff2e]" />
                    <span>{language === 'ar' ? 'MUHAB.org موثق' : 'MUHAB.org Verified'}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#a6ff2e]" />
                    <span>{language === 'ar' ? 'رد خلال دقائق معدودة' : 'Reply in minutes'}</span>
                  </span>
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
