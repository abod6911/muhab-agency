import { CompanyProduct } from "../types";

export const productsData: CompanyProduct[] = [
  {
    id: "taqyeemi",
    number: "01",
    name: "TAQYEEMI · تقييمي",
    categoryEn: "Customer Experience & Reputation System",
    categoryAr: "منظومة تجربة العميل والسمعة الرقمية",
    descEn: "A dedicated customer experience and reputation system that empowers businesses to gather direct feedback, simplify review access, and monitor customer satisfaction clearly.",
    descAr: "منظومة لتجربة العميل والسمعة الرقمية تساعد الأنشطة على جمع الملاحظات، تسهيل الوصول إلى التقييم، ومتابعة تجربة عملائها بصورة أوضح.",
    statusEn: "Live Product",
    statusAr: "منتج نشط ومتاح",
    isLive: true,
    link: "https://taqyeemi.pages.dev/",
    featuresEn: [
      "Smart NFC Cards & Acrylic Stands",
      "Direct QR & One-Touch Access",
      "Customer Feedback Collection",
      "Centralized Review Analytics Dashboard"
    ],
    featuresAr: [
      "بطاقات وستاندات ذكية بتقنية NFC و QR",
      "تسهيل وصول العميل لصفحة التقييم بلمسة واحدة",
      "جمع الملاحظات المباشرة وتحسين التجربة",
      "لوحة تحكم مركزية لمتابعة الأداء"
    ]
  },
  {
    id: "wasel",
    number: "02",
    name: "WASEL · واصل",
    categoryEn: "Restaurant Operations & Customer CRM",
    categoryAr: "منظومة إدارة وتشغيل المطاعم",
    descEn: "An integrated operating suite in active development by MUHAB, engineered to unify customer relationships, reservations, and branch operations within a simpler interface.",
    descAr: "منصة قيد التطوير لإدارة عمليات المطاعم وعلاقات العملاء ضمن تجربة واحدة أكثر بساطة.",
    statusEn: "In Development",
    statusAr: "قيد التطوير",
    isLive: false,
    featuresEn: [
      "Customer Relationship Management",
      "Smart Table & Reservation Routing",
      "Multi-Branch Operations Overview",
      "Direct POS & Kitchen Synchronization"
    ],
    featuresAr: [
      "إدارة بيانات وعلاقات العملاء",
      "تنظيم الحجوزات وتوزيع الطاولات",
      "متابعة موحدة لعمليات الفروع",
      "ربط مباشر مع نقاط البيع والتشغيل"
    ]
  }
];
