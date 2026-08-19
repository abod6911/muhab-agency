export type Language = "en" | "ar";

export interface PhoneSlide {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  videoSrc: string;
  poster: string;
  alt: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  titleEn: string;
  titleAr: string;
  clientEn: string;
  clientAr: string;
  categoryEn: string;
  categoryAr: string;
  year: string;
  liveUrl?: string;
  image: string;
  mobileImage?: string;
  videoSrc?: string;
  descEn: string;
  descAr: string;
  scopeEn: string[];
  scopeAr: string[];
  impactEn: string;
  impactAr: string;
}

export interface CompanyProduct {
  id: string;
  number: string;
  name: string;
  categoryEn: string;
  categoryAr: string;
  descEn: string;
  descAr: string;
  statusEn: string;
  statusAr: string;
  isLive: boolean;
  link?: string;
  featuresEn: string[];
  featuresAr: string[];
  image?: string;
}

export interface ServiceRow {
  number: string;
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  descEn: string;
  descAr: string;
  capabilityEn: string;
  capabilityAr: string;
}

export interface ClientPartner {
  id: string;
  nameEn: string;
  nameAr: string;
  industryEn: string;
  industryAr: string;
  location: string;
  logo?: string;
}

export interface Testimonial {
  id: string;
  authorEn: string;
  authorAr: string;
  roleEn: string;
  roleAr: string;
  companyEn: string;
  companyAr: string;
  quoteEn: string;
  quoteAr: string;
  projectSlug: string;
  rating: number;
}

export interface ProcessStep {
  step: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}
