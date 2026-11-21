import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  generateOrderId,
  sendOrderToEmail,
  buildWhatsAppUrl,
  type OrderPayload,
} from '../../services/orderService';
import { X, MessageSquare, Mail, Loader2, Check } from 'lucide-react';
import { sanitizeInput, sanitizePhone } from '../../utils/security';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const SERVICE_OPTIONS = [
  'تصميم موقع مخصص',
  'متجر إلكتروني وربط مدفوعات',
  'حوامل تقييمي الذكية (NFC)',
  'بطاقات بوينت باس (Apple Wallet)',
  'نظام فودس للمنيو والطلب الذاتي',
  'تهيئة SEO ودعم فني',
];

const BUDGET_OPTIONS = [
  '10,000 - 25,000 ر.س',
  '25,000 - 50,000 ر.س',
  '50,000+ ر.س',
];

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  preselectedService = '',
}) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: preselectedService || SERVICE_OPTIONS[0],
    budget: BUDGET_OPTIONS[0],
    brief: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
  }>({});

  useEffect(() => {
    if (preselectedService) {
      // Find matching or closest service option
      const found = SERVICE_OPTIONS.find((s) =>
        s.includes(preselectedService) || preselectedService.includes(s)
      );
      setFormData((prev) => ({
        ...prev,
        service: found || preselectedService,
      }));
    }
  }, [preselectedService]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errors: { name?: string; phone?: string } = {};
    if (!formData.name.trim()) {
      errors.name = isAr ? 'يرجى إدخال الاسم أو اسم المنشأة' : 'Please enter your name or company';
    }
    const cleanPhone = sanitizePhone(formData.phone);
    if (!cleanPhone || cleanPhone.length < 9) {
      errors.phone = isAr ? 'يرجى إدخال رقم جوال صحيح' : 'Please enter a valid mobile number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const createPayload = (method: 'whatsapp' | 'email'): OrderPayload => {
    return {
      orderId: generateOrderId(),
      name: sanitizeInput(formData.name),
      phone: sanitizePhone(formData.phone),
      email: formData.email.trim() ? sanitizeInput(formData.email) : undefined,
      service: formData.service,
      budget: formData.budget,
      brief: sanitizeInput(formData.brief),
      sendMethod: method,
      sourceDomain: 'MUHAB.org',
    };
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = createPayload('whatsapp');
    // Background async dispatch to company email for record-keeping
    sendOrderToEmail(payload).catch(() => {});

    // Open WhatsApp
    const url = buildWhatsAppUrl(payload, isAr ? 'ar' : 'en');
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const payload = createPayload('email');
    try {
      await sendOrderToEmail(payload);
      setSuccessMessage(
        isAr
          ? `تم إرسال طلبك بنجاح بالرقم المرجعي [${payload.orderId}]. سنتواصل معك قريباً.`
          : `Your request was sent successfully [${payload.orderId}]. We will be in touch shortly.`
      );
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMessage(null);
        onClose();
      }, 2500);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-[#111214] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col my-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/[0.06] bg-[#09090B]/60 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#F4F4F5] tracking-tight">
              {isAr ? 'ابدأ مشروعك الرقمي' : 'Start Your Project'}
            </h3>
            <p className="text-xs text-[#71717A] mt-0.5">
              {isAr ? 'املأ التفاصيل وسنتواصل معك لمناقشة خطة العمل' : 'Fill in the brief and we will reach out promptly'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-[#A1A1AA] hover:text-[#F4F4F5] border border-white/[0.06] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-4">
          {successMessage ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#A6FF2E]/10 border border-[#A6FF2E]/30 text-[#A6FF2E] flex items-center justify-center mb-4">
                <Check className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[#F4F4F5] max-w-md leading-relaxed">
                {successMessage}
              </p>
            </div>
          ) : (
            <form className="space-y-4">
              {/* Field 1: Name */}
              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                  {isAr ? 'الاسم أو اسم المنشأة *' : 'Full Name or Company *'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                  }}
                  placeholder={isAr ? 'مثال: شركة النخبة' : 'e.g. Al Nokhba Co.'}
                  className="w-full h-10 px-3.5 rounded-lg bg-[#09090B] border border-white/10 text-xs text-[#F4F4F5] placeholder:text-[#71717A] focus:outline-none focus:border-[#A6FF2E] transition-colors"
                />
                {formErrors.name && (
                  <p className="text-[11px] text-red-400 mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Field 2 & 3: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                    {isAr ? 'رقم الجوال / واتساب *' : 'Mobile / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                    }}
                    placeholder="05xxxxxxxx"
                    className="w-full h-10 px-3.5 rounded-lg bg-[#09090B] border border-white/10 text-xs text-[#F4F4F5] placeholder:text-[#71717A] focus:outline-none focus:border-[#A6FF2E] transition-colors"
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-red-400 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                    {isAr ? 'البريد الإلكتروني' : 'Official Email'}
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full h-10 px-3.5 rounded-lg bg-[#09090B] border border-white/10 text-xs text-[#F4F4F5] placeholder:text-[#71717A] focus:outline-none focus:border-[#A6FF2E] transition-colors"
                  />
                </div>
              </div>

              {/* Field 4: Desired Service */}
              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                  {isAr ? 'الخدمة أو المنتج المطلوب' : 'Desired Capability or Product'}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg bg-[#09090B] border border-white/10 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#A6FF2E] transition-colors cursor-pointer"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#111214] text-[#F4F4F5]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 5: Budget */}
              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                  {isAr ? 'الميزانية التقريبية' : 'Estimated Budget'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {BUDGET_OPTIONS.map((b) => {
                    const isSelected = formData.budget === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={`h-9 px-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer truncate ${
                          isSelected
                            ? 'bg-white/[0.1] border-[#A6FF2E] text-[#F4F4F5]'
                            : 'bg-[#09090B] border-white/10 text-[#71717A] hover:text-[#A1A1AA]'
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Field 6: Brief */}
              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                  {isAr ? 'نبذة مختصرة عن المشروع' : 'Project Brief & Goals'}
                </label>
                <textarea
                  rows={3}
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  placeholder={
                    isAr
                      ? 'اكتب لنا بإيجاز عن فكرة المشروع والجدول الزمني المستهدف...'
                      : 'Briefly describe your objectives and target timeline...'
                  }
                  className="w-full p-3 rounded-lg bg-[#09090B] border border-white/10 text-xs text-[#F4F4F5] placeholder:text-[#71717A] focus:outline-none focus:border-[#A6FF2E] transition-colors resize-none"
                />
              </div>

              {/* Submit Action Buttons */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row gap-2.5">
                {/* Primary Button: WhatsApp */}
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="flex-1 h-11 rounded-lg bg-[#A6FF2E] hover:bg-[#b8ff52] text-[#09090B] text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isAr ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}</span>
                </button>

                {/* Secondary Button: Email */}
                <button
                  type="button"
                  onClick={handleSendEmail}
                  disabled={isSubmitting}
                  className="h-11 px-5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-[#F4F4F5] border border-white/10 text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                  <span>{isAr ? 'إرسال عبر البريد الإلكتروني' : 'Send via Email'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
