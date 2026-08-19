import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "../types";

const translations = {
  ar: {
    // Navigation
    "nav.work": "أعمالنا",
    "nav.products": "منتجاتنا",
    "nav.services": "خدماتنا",
    "nav.reputation": "السمعة الرقمية",
    "nav.approach": "منهجيتنا",
    "nav.about": "عن مُهاب",
    "nav.contact": "تواصل معنا",
    "nav.cta": "ابدأ مشروعك",

    // Hero
    "hero.eyebrow": "مُهاب — شركة سعودية للحلول الرقمية",
    "hero.headlinePre": "نصنع حضورًا رقميًا",
    "hero.headlineMid": "يدفع أعمالك",
    "hero.headlineAccent": "إلى الأمام.",
    "hero.supporting": "من المواقع والمنتجات الرقمية إلى حلول السمعة وإدارة الحضور الإلكتروني، نبني تجارب تساعد الأعمال على الظهور بشكل أقوى وتقديم تجربة أفضل لعملائها.",
    "hero.ctaPrimary": "ابدأ مشروعك",
    "hero.ctaSecondary": "استكشف أعمالنا",

    // Phone Showcase
    "phone.badge": "مشاريع حية وموثوقة",
    "phone.prev": "المشروع السابق",
    "phone.next": "المشروع التالي",
    "phone.pause": "إيقاف العرض",
    "phone.play": "تشغيل العرض",

    // Manifesto
    "manifesto.line1": "لا نبني مجرد مواقع.",
    "manifesto.line2Pre": "نبني تجارب رقمية",
    "manifesto.line2Accent": "تعمل لصالح أعمالك.",
    "manifesto.supporting": "نربط بين التصميم والتقنية وفهم احتياجات النشاط التجاري لنصنع تجربة تخدم العميل وتدعم أهداف المشروع.",

    // Selected Work
    "work.eyebrow": "01 — أعمال مختارة",
    "work.headline": "تجارب رقمية صُممت لتقود النمو.",
    "work.subheadline": "مشاريع حية ومنصات رقمية قمنا بتصميمها وتطويرها لعلامات تجارية طموحة.",
    "work.viewLive": "استعرض الموقع المباشر",
    "work.scope": "نطاق العمل:",

    // Products / Our Companies
    "products.eyebrow": "02 — منتجاتنا الرقمية",
    "products.headline": "لا نكتفي بتقديم الخدمات. نطوّر منتجات رقمية أيضًا.",
    "products.subheadline": "نحوّل بعض التحديات التي نراها في السوق إلى منتجات نبنيها ونطوّرها داخل مُهاب.",
    "products.visit": "زيارة المنصة",
    "products.inDev": "قيد التطوير",

    // Clients / Trust
    "clients.eyebrow": "03 — شركاء وثقوا بنا",
    "clients.headline": "عملاء اختاروا مُهاب لبناء تجربتهم الرقمية.",

    // Services
    "services.eyebrow": "04 — خدماتنا",
    "services.headline": "نجمع بين الاستراتيجية والتصميم والتقنية لبناء تجارب تصنع قيمة حقيقية للأعمال.",
    "services.capabilities": "القدرات:",

    // Reputation
    "reputation.eyebrow": "05 — تقنية السمعة والتقييمات",
    "reputation.headline": "حلول تجعل التقييم أسهل، وإدارة السمعة أوضح.",
    "reputation.subheadline": "بطاقات وستاندات ذكية بتقنية NFC وQR تربط العميل بتجربة التقييم خلال لحظات، مع حلول تساعد النشاط على متابعة الملاحظات وبناء حضور رقمي أقوى.",
    "reputation.cardTitle": "بطاقات التقييم الذكية NFC",
    "reputation.cardDesc": "بطاقات مخصصة بهوية المنشأة توضع في نقاط البيع لتسهيل وصول العميل لصفحة التقييم فوراً.",
    "reputation.standTitle": "ستاندات الطاولات الأكريليكية",
    "reputation.standDesc": "مصنوعة بعناية من خامات فاخرة لتناسب المطاعم والمقاهي وصالات العرض الراقية.",
    "reputation.step1Title": "1. اللمس أو المسح",
    "reputation.step1Desc": "يلمس العميل هاتفه بالبطاقة أو يمسح رمز QR.",
    "reputation.step2Title": "2. فتح مباشر",
    "reputation.step2Desc": "تفتح صفحة التقييم المباشرة على Google خلال ثوانٍ.",
    "reputation.step3Title": "3. متابعة وملاحظات",
    "reputation.step3Desc": "جمع الملاحظات وتحسين التجربة المستمرة للعملاء.",

    // Process
    "process.eyebrow": "06 — منهجيتنا",
    "process.headline": "خطوات واضحة تقود لإطلاق متقن.",
    "process.subheadline": "منهجية واضحة ومدروسة تضمن دقة التنفيذ والتسليم في المواعيد المحددة.",

    // About
    "about.eyebrow": "07 — عن مُهاب",
    "about.headline": "شركة سعودية تبني تجارب وحلولًا رقمية للأعمال الطموحة.",
    "about.body": "مُهاب شركة سعودية للحلول الرقمية مقرها جدة. نصمّم ونطوّر المواقع والمنتجات والحلول التي تساعد الأعمال على تقديم تجربة أفضل لعملائها وبناء حضور رقمي أقوى.",

    // Contact
    "contact.eyebrow": "تواصل معنا",
    "contact.headline": "لنبدأ محادثة حول مشروعك القادم.",
    "contact.subheadline": "شاركنا تفاصيل فكرتك، وسيقوم فريقنا بالتواصل معك لمناقشة خطة العمل والجدول الزمني المناسب.",
    "contact.formName": "الاسم الكامل",
    "contact.formBusiness": "اسم المنشأة أو المشروع",
    "contact.formPhone": "رقم الهاتف / الواتساب",
    "contact.formEmail": "البريد الإلكتروني",
    "contact.formService": "الخدمة المطلوبة",
    "contact.formMessage": "تفاصيل المشروع أو المتطلبات",
    "contact.formSubmit": "إرسال الطلب",
    "contact.submitting": "جاري الإرسال...",
    "contact.successTitle": "تم استلام طلبك بنجاح",
    "contact.successMessage": "شكراً لتواصلك مع مُهاب. سيقوم فريقنا بمراجعة التفاصيل والتواصل معك في أقرب وقت.",
    "contact.sendAnother": "إرسال طلب آخر",
    "contact.directWhatsApp": "تواصل عبر واتساب",

    // Final CTA
    "finalCTA.headline": "لديك مشروع يستحق حضورًا رقميًا أقوى؟",
    "finalCTA.subheadline": "لنصنعه معًا.",
    "finalCTA.ctaPrimary": "ابدأ مشروعك",
    "finalCTA.ctaWhatsApp": "تواصل عبر واتساب",

    // Footer
    "footer.tagline": "مواقع. نمو. سمعة.",
    "footer.rights": "© 2026 مُهاب — صُناع الويب السعوديون. جميع الحقوق محفوظة.",
    "footer.location": "جدة، المملكة العربية السعودية",
  },
  en: {
    // Navigation
    "nav.work": "Work",
    "nav.products": "Products",
    "nav.services": "Services",
    "nav.reputation": "Reputation",
    "nav.approach": "Approach",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cta": "Start a Project",

    // Hero
    "hero.eyebrow": "MUHAB — SAUDI DIGITAL SOLUTIONS",
    "hero.headlinePre": "We craft digital presence",
    "hero.headlineMid": "that moves business",
    "hero.headlineAccent": "forward.",
    "hero.supporting": "From bespoke websites and digital products to reputation solutions and presence management, we build experiences that help businesses stand out and deliver exceptional customer journeys.",
    "hero.ctaPrimary": "Start a Project",
    "hero.ctaSecondary": "Explore Our Work",

    // Phone Showcase
    "phone.badge": "Live Verified Work",
    "phone.prev": "Previous project",
    "phone.next": "Next project",
    "phone.pause": "Pause showcase",
    "phone.play": "Play showcase",

    // Manifesto
    "manifesto.line1": "We don't just build websites.",
    "manifesto.line2Pre": "We craft digital experiences that",
    "manifesto.line2Accent": "work for your business.",
    "manifesto.supporting": "Connecting design, technology, and commercial understanding to create experiences that serve customers and advance business goals.",

    // Selected Work
    "work.eyebrow": "01 — SELECTED WORK",
    "work.headline": "Digital experiences built to lead.",
    "work.subheadline": "Live projects and custom digital platforms engineered for ambitious commercial brands.",
    "work.viewLive": "View Live Website",
    "work.scope": "Scope:",

    // Products / Our Companies
    "products.eyebrow": "02 — OUR PRODUCTS",
    "products.headline": "We don't just build websites. We build products.",
    "products.subheadline": "We transform real market challenges into scalable digital products built and operated in-house at MUHAB.",
    "products.visit": "Visit Platform",
    "products.inDev": "In Development",

    // Clients / Trust
    "clients.eyebrow": "03 — CLIENT TRUST",
    "clients.headline": "Brands that chose MUHAB for their digital experience.",

    // Services
    "services.eyebrow": "04 — CAPABILITIES",
    "services.headline": "We bring strategy, design and technology together to build digital experiences that create real business value.",
    "services.capabilities": "Capabilities:",

    // Reputation
    "reputation.eyebrow": "05 — REPUTATION & HARDWARE",
    "reputation.headline": "Making reviews effortless, and reputation management clearer.",
    "reputation.subheadline": "Smart NFC and QR hardware connecting customers to review pages in moments, backed by solutions helping businesses capture feedback and strengthen online presence.",
    "reputation.cardTitle": "Smart Google Review NFC Cards",
    "reputation.cardDesc": "Custom-branded cards kept at point of sale to streamline review access for guests instantly.",
    "reputation.standTitle": "Luxury Tabletop Acrylic Stands",
    "reputation.standDesc": "Engineered with premium materials tailored for upscale dining, cafes, and flagship showrooms.",
    "reputation.step1Title": "1. Tap or Scan",
    "reputation.step1Desc": "Customer taps their phone or scans the QR code.",
    "reputation.step2Title": "2. Direct Launch",
    "reputation.step2Desc": "Google review destination opens immediately in seconds.",
    "reputation.step3Title": "3. Insights & Feedback",
    "reputation.step3Desc": "Capture feedback and continually elevate guest satisfaction.",

    // Process
    "process.eyebrow": "06 — HOW WE WORK",
    "process.headline": "A disciplined path from concept to launch.",
    "process.subheadline": "A clear, milestone-driven methodology ensuring precision delivery on schedule.",

    // About
    "about.eyebrow": "07 — ABOUT MUHAB",
    "about.headline": "A Saudi digital company crafting experiences for ambitious businesses.",
    "about.body": "MUHAB is a Saudi digital company based in Jeddah. We design and develop websites, products, and solutions that help businesses deliver a superior customer experience and build a stronger online presence.",

    // Contact
    "contact.eyebrow": "START A PROJECT",
    "contact.headline": "Let's build something exceptional together.",
    "contact.subheadline": "Share your project goals, and our team will get back to you with a direct proposal and strategic roadmap.",
    "contact.formName": "Full Name",
    "contact.formBusiness": "Business / Company Name",
    "contact.formPhone": "Phone / WhatsApp",
    "contact.formEmail": "Email Address",
    "contact.formService": "Service Needed",
    "contact.formMessage": "Project Overview / Scope",
    "contact.formSubmit": "Submit Inquiry",
    "contact.submitting": "Sending...",
    "contact.successTitle": "Inquiry Received Successfully",
    "contact.successMessage": "Thank you for reaching out to MUHAB. Our creative and technical team will review your inquiry and follow up promptly.",
    "contact.sendAnother": "Send another inquiry",
    "contact.directWhatsApp": "Direct WhatsApp",

    // Final CTA
    "finalCTA.headline": "Have a business worth noticing?",
    "finalCTA.subheadline": "Let's build the digital experience it deserves.",
    "finalCTA.ctaPrimary": "Start a Project",
    "finalCTA.ctaWhatsApp": "Direct WhatsApp",

    // Footer
    "footer.tagline": "WEBSITES. GROWTH. REPUTATION.",
    "footer.rights": "© 2026 MUHAB — Saudi Webmakers. All rights reserved.",
    "footer.location": "Jeddah, Saudi Arabia",
  },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
  isAr: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("muhab_lang") as Language;
      if (saved === "en" || saved === "ar") return saved;
    }
    return "ar";
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("muhab_lang", newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    }
  };

  const toggleLang = () => {
    setLang(lang === "ar" ? "en" : "ar");
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const t = (key: string): string => {
    const dict = translations[lang] as Record<string, string>;
    if (dict && dict[key]) {
      return dict[key];
    }
    const fallback = translations["ar"] as Record<string, string>;
    return fallback[key] || key;
  };

  const isAr = lang === "ar";

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang, t, isAr }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
