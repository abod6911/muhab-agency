import React, { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../lib/i18n";
import { Send, CheckCircle2, MessageSquare, Mail, MapPin } from "lucide-react";

export const ContactSection: React.FC = () => {
  const { t, isAr } = useI18n();

  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    service: "web-design",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const servicesOptions = [
    { id: "web-design", labelEn: "Web Design & UX", labelAr: "تصميم المواقع وتجربة المستخدم" },
    { id: "web-dev", labelEn: "Custom Web Development", labelAr: "تطوير وبرمجة مخصصة" },
    { id: "products", labelEn: "Digital Products & Platforms", labelAr: "المنتجات والمنصات الرقمية" },
    { id: "reputation-nfc", labelEn: "Google Reputation & NFC Hardware", labelAr: "بطاقات وستاندات تقييم Google الذكية" },
    { id: "social-brand", labelEn: "Social Media & Brand Assets", labelAr: "إدارة المحتوى والهوية الرقمية" },
    { id: "seo", labelEn: "SEO & Performance Engineering", labelAr: "تحسين محركات البحث والسرعة" },
  ];

  return (
    <section id="contact" className="py-28 sm:py-40 bg-[#07130F] text-white relative overflow-hidden border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B9FF38] uppercase tracking-widest font-bold">
            <span>{t("contact.eyebrow")}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            {t("contact.headline")}
          </h2>
          <p className="text-[#D8DCD7]/80 text-base sm:text-lg leading-relaxed font-normal">
            {t("contact.subheadline")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-[#0B1F19] border border-white/10">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#B9FF38]/10 text-[#B9FF38] flex items-center justify-center mx-auto border border-[#B9FF38]/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {t("contact.successTitle")}
                </h3>
                <p className="text-[#D8DCD7]/80 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  {t("contact.successMessage")}
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", business: "", phone: "", email: "", service: "web-design", message: "" });
                  }}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-all"
                >
                  {t("contact.sendAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-[#D8DCD7]/80">
                      {t("contact.formName")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isAr ? "محمد الأحمدي" : "e.g. Mohammed Al-Ahmadi"}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#07130F] border border-white/15 text-white text-sm focus:outline-none focus:border-[#B9FF38] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-[#D8DCD7]/80">
                      {t("contact.formBusiness")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      placeholder={isAr ? "اسم المنشأة أو الشركة" : "e.g. Damascus Dining"}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#07130F] border border-white/15 text-white text-sm focus:outline-none focus:border-[#B9FF38] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-[#D8DCD7]/80">
                      {t("contact.formPhone")} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="05XXXXXXXX"
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#07130F] border border-white/15 text-white text-sm focus:outline-none focus:border-[#B9FF38] transition-all"
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-[#D8DCD7]/80">
                      {t("contact.formEmail")}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.sa"
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#07130F] border border-white/15 text-white text-sm focus:outline-none focus:border-[#B9FF38] transition-all"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase text-[#D8DCD7]/80">
                    {t("contact.formService")} *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#07130F] border border-white/15 text-white text-sm focus:outline-none focus:border-[#B9FF38] transition-all"
                  >
                    {servicesOptions.map((opt) => (
                      <option key={opt.id} value={opt.id} className="bg-[#07130F] text-white">
                        {isAr ? opt.labelAr : opt.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase text-[#D8DCD7]/80">
                    {t("contact.formMessage")}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isAr
                        ? "اكتب نبذة عن مشروعك، الجدول الزمني، أو أي متطلبات خاصة..."
                        : "Tell us about your project timeline, objectives, and any specific requirements..."
                    }
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#07130F] border border-white/15 text-white text-sm focus:outline-none focus:border-[#B9FF38] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#B9FF38] hover:bg-[#CAFF5E] text-[#07130F] font-black text-sm sm:text-base tracking-tight transition-all duration-300 shadow-xl shadow-[#B9FF38]/20 flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>{isSubmitting ? t("contact.submitting") : t("contact.formSubmit")}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Direct WhatsApp Channel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#0B1F19] border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#B9FF38] text-[#07130F]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-white">
                    {t("contact.directWhatsApp")}
                  </h4>
                  <span className="text-xs text-[#B9FF38] font-mono">
                    {isAr ? "محادثة فورية مع الفريق" : "Instant direct team reply"}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#D8DCD7]/80 leading-relaxed">
                {isAr
                  ? "تواصل مباشرة مع فريق الإدارة الإبداعية والتقنية لمناقشة مشروعك فوراً."
                  : "Start a direct conversation with our creative & technical leadership right now on WhatsApp."}
              </p>

              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 py-3.5 rounded-full bg-white text-[#07130F] font-bold text-xs sm:text-sm hover:bg-[#B9FF38] transition-all"
              >
                <span>{t("contact.directWhatsApp")}</span>
              </a>
            </div>

            <div className="p-8 rounded-3xl bg-[#0B1F19]/50 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D8DCD7]">
                <MapPin className="w-4 h-4 text-[#B9FF38]" />
                <span>Jeddah, Saudi Arabia</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#D8DCD7]">
                <Mail className="w-4 h-4 text-[#B9FF38]" />
                <span>contact@muhab.sa</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
