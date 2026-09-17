export type Language = 'ar' | 'en';

export interface ProjectDevicePreview {
  badgeAr: string;
  badgeEn: string;
  heroTitleAr: string;
  heroTitleEn: string;
  rating: string;
  reviewCount: string;
  priceTagAr: string;
  priceTagEn: string;
  ctaTextAr: string;
  ctaTextEn: string;
  primaryMetricAr: string;
  primaryMetricEn: string;
  accentBg: string;
  highlightTagAr: string;
  highlightTagEn: string;
  subItemsAr: string[];
  subItemsEn: string[];
}

export interface Project {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  category: 'ecommerce' | 'fnb' | 'tea' | 'all';
  categoryLabelAr: string;
  categoryLabelEn: string;
  descAr: string;
  descEn: string;
  fullDescAr: string;
  fullDescEn: string;
  metricsAr: string;
  metricsEn: string;
  tags: string[];
  accentColor: string;
  gradientBg: string;
  image: string;
  liveUrl?: string;
  devicePreview: ProjectDevicePreview;
  highlightPointsAr: string[];
  highlightPointsEn: string[];
}

export interface EcosystemProduct {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  badgeAr: string;
  badgeEn: string;
  descAr: string;
  descEn: string;
  featuresAr: string[];
  featuresEn: string[];
  highlightMetricAr: string;
  highlightMetricEn: string;
  icon: string;
  accent: 'mint' | 'gold' | 'emerald';
  ctaAr: string;
  ctaEn: string;
  mockupType: 'nfc' | 'wallet' | 'pos';
}

export interface ServiceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  deliverablesAr: string[];
  deliverablesEn: string[];
  icon: string;
  tagAr: string;
  tagEn: string;
  accent: string;
}

export interface TrustPill {
  id: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  image?: string;
  badgeAr?: string;
  badgeEn?: string;
}

export interface MetricItem {
  value: string;
  labelAr: string;
  labelEn: string;
  subAr: string;
  subEn: string;
  glow: string;
}

export interface InquiryData {
  clientName: string;
  phone: string;
  serviceType: string;
  budgetRange: string;
  projectBrief: string;
}

