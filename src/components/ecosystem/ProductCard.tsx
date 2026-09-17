import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import type { EcosystemProduct } from '../../types';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { 
  Star, 
  CreditCard, 
  UtensilsCrossed, 
  CheckCircle2, 
  ArrowUpRight, 
  QrCode,
  Sparkles,
  Zap,
  Radio
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assets';

interface ProductCardProps {
  product: EcosystemProduct;
  onOrderProduct: (productName: string) => void;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOrderProduct, index }) => {
  const { language, isRTL } = useLanguage();

  const getProductIcon = () => {
    switch (product.icon) {
      case 'Star':
        return <Star className="w-5 h-5 text-[#a6ff2e] fill-[#a6ff2e]/20" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-amber-400" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-emerald-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#a6ff2e]" />;
    }
  };

  const accentColor = product.accent === 'gold' ? '#F59E0B' : product.accent === 'emerald' ? '#10B981' : '#a6ff2e';
  const shimmerBorder = product.accent === 'gold' ? 'via-amber-400/80' : 'via-[#a6ff2e]/80';

  const getReassurance = () => {
    if (product.id === 'taqyeemi') {
      return language === 'ar' ? 'شحن فوري بالمملكة • مدى الحياة' : 'Lifetime hardware • Instant Saudi delivery';
    }
    if (product.id === 'pointpass') {
      return language === 'ar' ? 'تفعيل سحابي فوري • بدون تطبيقات' : 'Instant Cloud setup • Zero App Store friction';
    }
    return language === 'ar' ? 'ربط سحابي متكامل • تدريب مجاني' : 'Direct Cloud Sync • Free onboarding';
  };

  const getPricingHighlight = () => {
    if (product.id === 'taqyeemi') {
      return language === 'ar' ? 'بدون اشتراك شهري' : 'No Monthly Fees';
    }
    if (product.id === 'pointpass') {
      return language === 'ar' ? 'إشعارات غير محدودة' : 'Unlimited Push Alerts';
    }
    return language === 'ar' ? '0% عمولات مبيعات' : '0% Sales Commission';
  };

  // Curate 4 high-impact, punchy capabilities for clean vertical harmony
  const displayFeatures = (language === 'ar' ? product.featuresAr : product.featuresEn).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className="relative rounded-[26px] bg-gradient-to-b from-[#061a12]/95 via-[#03130c]/90 to-[#020b06]/95 backdrop-blur-2xl border border-emerald-500/20 hover:border-[#a6ff2e]/50 p-5 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group transition-all duration-300"
    >
      {/* Top luminous border shimmer line matching product accent */}
      <div className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#a6ff2e]/30 to-transparent group-hover:${shimmerBorder} transition-all duration-500 pointer-events-none`} />

      {/* Background ambient gradient glow halo */}
      <div 
        className="absolute -top-20 -end-20 w-56 h-56 rounded-full opacity-15 blur-3xl pointer-events-none group-hover:opacity-25 transition-opacity duration-500"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex flex-col">
        {/* Tier 1: Category Badge & Jewel Icon Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={product.accent === 'gold' ? 'gold' : 'mint'} className="text-[10px] sm:text-[11px] font-bold py-1 px-3 shadow-sm">
            {language === 'ar' ? product.badgeAr : product.badgeEn}
          </Badge>

          <div className="relative group/picon w-10 h-10 rounded-xl p-0.5 bg-gradient-to-br from-[#143d2a] via-[#082216] to-[#020b06] border border-emerald-500/40 group-hover:border-[#a6ff2e] shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_12px_rgba(166,255,46,0.2)] shrink-0 flex items-center justify-center transition-all duration-300 overflow-hidden">
            <div className="w-full h-full rounded-[9px] bg-[#020a06]/90 flex items-center justify-center group-hover/picon:scale-110 transition-transform duration-300">
              {getProductIcon()}
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent pointer-events-none rounded-[9px]" />
          </div>
        </div>

        {/* Tier 2: Product Name & Moniker */}
        <div className="mb-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-none">
              {language === 'ar' ? product.nameAr.split('|')[0].trim() : product.nameEn.split('|')[0].trim()}
            </h3>
            <span className="text-xs sm:text-sm font-mono text-emerald-400/90 font-bold">
              {language === 'ar' ? (product.nameAr.split('|')[1]?.trim() || '') : (product.nameEn.split('|')[1]?.trim() || '')}
            </span>
          </div>
          <p className="text-xs sm:text-[13px] text-emerald-400/95 font-medium mt-1 leading-snug">
            {language === 'ar' ? product.taglineAr : product.taglineEn}
          </p>
        </div>

        {/* Short Value Proposition Description */}
        <p className="text-xs sm:text-[13px] text-slate-300/80 leading-relaxed mb-4 line-clamp-2">
          {language === 'ar' ? product.descAr : product.descEn}
        </p>

        {/* Product Visual Interactive Stage */}
        <div className="relative w-full rounded-2xl bg-[#020a06]/95 border border-emerald-500/25 p-3 sm:p-3.5 mb-5 overflow-hidden shadow-inner min-h-[190px] flex flex-col justify-center">
          
          {/* Mockup 1: Taqyeemi NFC Stand Showcase */}
          {product.mockupType === 'nfc' && (
            <div className="relative w-full h-[180px] rounded-xl overflow-hidden border border-emerald-500/20 group/stand flex flex-col justify-end">
              <img
                src={getAssetUrl('taqyeemi-showcase.jpg')}
                alt="Taqyeemi Google Maps Review Stand & Dashboard"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover/stand:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020a06]/95 via-[#020a06]/35 to-transparent pointer-events-none" />
              
              {/* NFC Sensor Pulse Tag */}
              <div className="absolute top-2.5 inset-inline-start-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#a6ff2e]/40 text-[10px] font-mono text-[#a6ff2e] shadow-[0_0_12px_rgba(166,255,46,0.3)] z-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff2e] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a6ff2e]"></span>
                </span>
                <span className="font-bold tracking-wider">NFC TAP ACTIVE</span>
              </div>

              {/* Floating Google Rating Pill & Metric */}
              <div className="relative z-10 p-2 sm:p-2.5 flex flex-wrap items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5 bg-black/85 backdrop-blur-md px-2 py-1 rounded-lg border border-amber-500/30 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-[11px] sm:text-xs font-black text-white">4.9 / 5.0 Google Maps</span>
                </div>
                <div className="px-2 py-1 rounded-lg bg-emerald-950/90 backdrop-blur-md border border-[#a6ff2e]/40 text-[#a6ff2e] text-[10px] sm:text-[11px] font-bold shadow-lg">
                  {language === 'ar' ? product.highlightMetricAr : product.highlightMetricEn}
                </div>
              </div>
            </div>
          )}

          {/* Mockup 2: PointPass Apple & Google Wallet Card */}
          {product.mockupType === 'wallet' && (
            <div className="relative w-full h-[180px] rounded-xl overflow-hidden p-3 bg-gradient-to-br from-[#1a1205] via-[#09150e] to-[#020a06] border border-amber-500/35 flex flex-col justify-between">
              {/* Top Pass Brand Header */}
              <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <QrCode className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-amber-300 font-bold uppercase tracking-wider block leading-none">
                      Apple Wallet • VIP
                    </span>
                    <span className="text-[11px] font-black text-white leading-tight">
                      PointPass Card
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[9px] font-mono text-amber-300 font-bold">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  <span>VIP GOLD</span>
                </div>
              </div>

              {/* Pass Content: Points & Cardholder */}
              <div className="grid grid-cols-2 gap-2 py-1">
                <div>
                  <span className="text-[9px] text-slate-400 block font-mono">
                    {language === 'ar' ? 'رصيد النقاط' : 'POINT BALANCE'}
                  </span>
                  <span className="text-lg font-black text-amber-300 leading-tight">
                    2,450 <span className="text-[9px] text-amber-400/80 font-normal">{language === 'ar' ? 'نقطة' : 'PTS'}</span>
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-mono">
                    {language === 'ar' ? 'حامل البطاقة' : 'MEMBER'}
                  </span>
                  <span className="text-xs font-bold text-white truncate block leading-tight">
                    {language === 'ar' ? 'عبدالله الشريف' : 'Abdullah A.'}
                  </span>
                </div>
              </div>

              {/* Floating Lock-Screen Push Notification Simulation */}
              <div className="p-2 rounded-lg bg-black/85 backdrop-blur-md border border-amber-500/30 flex items-center gap-2 shadow-lg">
                <div className="w-5 h-5 rounded bg-amber-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[9px] text-amber-400/90 font-mono">
                    <span>Apple Wallet</span>
                    <span>{language === 'ar' ? 'الآن' : 'Now'}</span>
                  </div>
                  <p className="text-[10px] text-slate-200 truncate font-medium">
                    {language === 'ar' ? 'تمت إضافة 50 نقطة بنجاح لرصيدك!' : '50 points added to your pass!'}
                  </p>
                </div>
              </div>

              {/* Bottom Metric Pill */}
              <div className="flex items-center justify-between pt-1 text-[10px]">
                <span className="text-slate-400 font-mono flex items-center gap-1">
                  <Radio className="w-3 h-3 text-amber-400" />
                  <span>NFC Contactless</span>
                </span>
                <span className="font-bold text-amber-300">
                  {language === 'ar' ? product.highlightMetricAr : product.highlightMetricEn}
                </span>
              </div>
            </div>
          )}

          {/* Mockup 3: Foodus POS & Cloud Dining Tablet */}
          {product.mockupType === 'pos' && (
            <div className="relative w-full h-[180px] rounded-xl overflow-hidden p-3 bg-gradient-to-br from-[#041a10] via-[#06180f] to-[#020a06] border border-emerald-500/35 flex flex-col justify-between">
              {/* Dining POS Header */}
              <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[#a6ff2e]">
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold block leading-none">
                      {language === 'ar' ? 'طاولة رقم #14' : 'TABLE #14'}
                    </span>
                    <span className="text-[11px] font-black text-white leading-tight">
                      {language === 'ar' ? 'قائمة الطعام الرقمية' : 'Digital Menu & POS'}
                    </span>
                  </div>
                </div>

                <div className="px-2 py-0.5 rounded-full bg-[#a6ff2e]/20 border border-[#a6ff2e]/40 text-[9px] font-mono text-[#a6ff2e] font-bold">
                  APPLE PAY
                </div>
              </div>

              {/* Gourmet Dish Preview */}
              <div className="flex items-center gap-2.5 p-1.5 rounded-lg bg-black/70 border border-emerald-500/20">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80"
                  alt="Fine dining dish"
                  className="w-11 h-11 rounded-md object-cover border border-white/10 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-[11px] font-bold text-white truncate">
                    {language === 'ar' ? 'ستيك تندرلوين بالترفل الفاخر' : 'Prime Truffle Tenderloin'}
                  </h5>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[11px] font-black text-[#a6ff2e]">84 ر.س</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/25 text-emerald-300 font-bold">
                      {language === 'ar' ? 'طلب بلمسة واحدة' : 'Instant Pay'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Kitchen Status Tracker */}
              <div className="p-1.5 rounded-md bg-emerald-950/70 border border-emerald-500/25 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff2e] animate-pulse" />
                  <span className="text-slate-200 font-medium">
                    {language === 'ar' ? 'جاري التحضير في المطبخ' : 'Preparing in kitchen'}
                  </span>
                </div>
                <span className="text-emerald-400 font-mono font-bold">
                  {language === 'ar' ? '8 دقائق' : '8 mins'}
                </span>
              </div>

              {/* Bottom Metric Pill */}
              <div className="flex items-center justify-between pt-1 text-[10px]">
                <span className="text-slate-400 font-mono flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#a6ff2e]" />
                  <span>Cloud Sync POS</span>
                </span>
                <span className="font-bold text-[#a6ff2e]">
                  {language === 'ar' ? product.highlightMetricAr : product.highlightMetricEn}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* High-Impact Differentiator Feature Matrix (Compact 4-Item List) */}
        <div className="space-y-2 mb-6">
          {displayFeatures.map((feature, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-200/95">
              <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-[#a6ff2e]" />
              </div>
              <span className="leading-snug">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prominent Action Bar (Always Visible & Aligned) */}
      <div className="pt-4 border-t border-emerald-500/15 mt-auto">
        <div className="flex items-center justify-between gap-2 mb-3 text-[11px]">
          <span className="flex items-center gap-1 text-slate-300 font-medium">
            <Sparkles className="w-3 h-3 text-[#a6ff2e] shrink-0" />
            <span>{getReassurance()}</span>
          </span>
          <span className="font-mono text-emerald-400 font-bold shrink-0">
            {getPricingHighlight()}
          </span>
        </div>

        <Button
          variant={product.accent === 'gold' ? 'gold' : 'primary'}
          size="md"
          onClick={() => onOrderProduct(language === 'ar' ? product.nameAr : product.nameEn)}
          icon={<ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />}
          className="w-full justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(166,255,46,0.35)] transition-all font-bold"
        >
          {language === 'ar' ? product.ctaAr : product.ctaEn}
        </Button>
      </div>
    </motion.div>
  );
};

