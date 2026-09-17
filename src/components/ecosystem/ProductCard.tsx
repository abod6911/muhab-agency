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
  Sparkles
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

  const accentColor = product.accent === 'gold' ? '#F59E0B' : '#a6ff2e';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className="relative rounded-3xl bg-[#071912]/85 backdrop-blur-2xl border border-emerald-500/20 hover:border-[#a6ff2e]/50 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] group transition-all duration-300"
    >
      {/* Top luminous border shimmer line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#a6ff2e]/30 to-transparent group-hover:via-[#a6ff2e]/80 transition-all duration-500 pointer-events-none" />

      {/* Background ambient gradient glow */}
      <div 
        className="absolute -top-24 -end-24 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none group-hover:opacity-25 transition-opacity"
        style={{ backgroundColor: accentColor }}
      />

      <div>
        {/* Top Product Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="relative group/picon w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-br from-[#143d2a] via-[#082216] to-[#020b06] border border-emerald-500/40 group-hover:border-[#a6ff2e] shadow-[0_6px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(166,255,46,0.2)] shrink-0 flex items-center justify-center transition-all duration-300 overflow-hidden">
              <div className="w-full h-full rounded-[14px] bg-[#020a06]/90 flex items-center justify-center group-hover/picon:scale-110 transition-transform duration-300">
                {getProductIcon()}
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent pointer-events-none rounded-[14px]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {language === 'ar' ? product.nameAr : product.nameEn}
              </h3>
              <span className="text-xs text-emerald-400 font-medium">
                {language === 'ar' ? product.taglineAr : product.taglineEn}
              </span>
            </div>
          </div>

          <Badge variant={product.accent === 'gold' ? 'gold' : 'mint'} className="text-[11px]">
            {language === 'ar' ? product.badgeAr : product.badgeEn}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {language === 'ar' ? product.descAr : product.descEn}
        </p>

        {/* Product Visual Interactive Mockup Banner */}
        <div className="relative w-full rounded-2xl bg-[#020a06]/95 border border-emerald-500/25 p-4 mb-6 overflow-hidden shadow-inner">
          
          {/* Mockup 1: Taqyeemi NFC Stand Showcase with High-Res 3D Render */}
          {product.mockupType === 'nfc' && (
            <div className="relative w-full rounded-xl overflow-hidden border border-emerald-500/20 group/stand">
              <img
                src={getAssetUrl('taqyeemi-showcase.jpg')}
                alt="Taqyeemi Google Maps Review Stand & Dashboard"
                className="w-full h-48 sm:h-56 object-cover object-center group-hover/stand:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020a06]/90 via-[#020a06]/20 to-transparent pointer-events-none" />
              
              {/* NFC Sensor Pulse Tag */}
              <div className="absolute top-3 inset-inline-start-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#a6ff2e]/30 text-[11px] font-mono text-[#a6ff2e]">
                <span className="w-2 h-2 rounded-full bg-[#a6ff2e] animate-ping inline-block" />
                <span>NFC TAP ACTIVE</span>
              </div>

              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="text-xs font-black text-white ms-1">4.9 / 5.0 Google Maps</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-lg">
                  {language === 'ar' ? product.highlightMetricAr : product.highlightMetricEn}
                </div>
              </div>
            </div>
          )}

          {/* Mockup 2: PointPass Realistic Apple / Google Wallet Card */}
          {product.mockupType === 'wallet' && (
            <div className="relative w-full rounded-xl overflow-hidden p-3.5 bg-gradient-to-br from-amber-950/30 via-[#05170f] to-[#020a06] border border-amber-500/30">
              {/* Top Pass Brand Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider block leading-tight">
                      Apple Wallet • VIP
                    </span>
                    <span className="text-xs font-black text-white leading-tight">
                      PointPass Card
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-[10px] font-mono text-amber-300">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>VIP GOLD</span>
                </div>
              </div>

              {/* Pass Content: Points & Cardholder */}
              <div className="grid grid-cols-2 gap-3 py-2 px-1">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {language === 'ar' ? 'رصيد النقاط' : 'POINT BALANCE'}
                  </span>
                  <span className="text-xl font-black text-amber-300">
                    2,450 <span className="text-[10px] text-amber-400/80 font-normal">{language === 'ar' ? 'نقطة' : 'PTS'}</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {language === 'ar' ? 'حامل البطاقة' : 'MEMBER'}
                  </span>
                  <span className="text-sm font-bold text-white truncate block">
                    {language === 'ar' ? 'عبدالله الشريف' : 'Abdullah A.'}
                  </span>
                </div>
              </div>

              {/* Floating Lock-Screen Push Notification */}
              <div className="mt-3 p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-amber-500/25 flex items-center gap-2.5 shadow-xl">
                <div className="w-6 h-6 rounded-md bg-amber-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] text-amber-400/80 font-mono">
                    <span>Apple Wallet</span>
                    <span>{language === 'ar' ? 'الآن' : 'Now'}</span>
                  </div>
                  <p className="text-[11px] text-slate-200 truncate font-medium">
                    {language === 'ar' ? 'تمت إضافة 50 نقطة بنجاح لرصيدك!' : '50 points added to your pass!'}
                  </p>
                </div>
              </div>

              {/* Bottom Metric Pill */}
              <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-amber-500/15 text-[11px]">
                <span className="text-slate-400 font-mono">NFC Contactless</span>
                <span className="font-bold text-amber-400">
                  {language === 'ar' ? product.highlightMetricAr : product.highlightMetricEn}
                </span>
              </div>
            </div>
          )}

          {/* Mockup 3: Foodus POS & Cloud Dining Tablet Showcase */}
          {product.mockupType === 'pos' && (
            <div className="relative w-full rounded-xl overflow-hidden p-3.5 bg-gradient-to-br from-emerald-950/30 via-[#05170f] to-[#020a06] border border-emerald-500/30">
              {/* Dining POS Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-emerald-500/20 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[#a6ff2e]">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block leading-tight">
                      {language === 'ar' ? 'طاولة رقم #14' : 'TABLE #14'}
                    </span>
                    <span className="text-xs font-black text-white leading-tight">
                      {language === 'ar' ? 'قائمة الطعام الرقمية' : 'Digital Menu & POS'}
                    </span>
                  </div>
                </div>

                <div className="px-2 py-0.5 rounded-full bg-[#a6ff2e]/20 border border-[#a6ff2e]/30 text-[10px] font-mono text-[#a6ff2e] font-bold">
                  APPLE PAY
                </div>
              </div>

              {/* Dish Card Preview with Image */}
              <div className="flex items-center gap-3 p-2 rounded-xl bg-black/60 border border-emerald-500/20 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80"
                  alt="Fine dining dish"
                  className="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-bold text-white truncate">
                    {language === 'ar' ? 'ستيك تندرلوين بالترفل الفاخر' : 'Prime Truffle Tenderloin'}
                  </h5>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-black text-[#a6ff2e]">84 ر.س</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      {language === 'ar' ? 'طلب بلمسة واحدة' : 'Instant Pay'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Kitchen Status Bar */}
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#a6ff2e] animate-pulse" />
                  <span className="text-slate-200 font-medium">
                    {language === 'ar' ? 'جاري التحضير في المطبخ' : 'Preparing in kitchen'}
                  </span>
                </div>
                <span className="text-emerald-400 font-mono font-bold">
                  {language === 'ar' ? '8 دقائق' : '8 mins'}
                </span>
              </div>

              {/* Bottom Metric Pill */}
              <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-emerald-500/15 text-[11px]">
                <span className="text-slate-400 font-mono">Cloud Sync POS</span>
                <span className="font-bold text-[#a6ff2e]">
                  {language === 'ar' ? product.highlightMetricAr : product.highlightMetricEn}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Feature Checklist */}
        <div className="space-y-2.5 mb-8">
          {(language === 'ar' ? product.featuresAr : product.featuresEn).map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#a6ff2e] shrink-0 mt-0.5" />
              <span className="leading-snug">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-4 border-t border-emerald-500/15">
        <Button
          variant={product.accent === 'gold' ? 'gold' : 'primary'}
          size="md"
          onClick={() => onOrderProduct(language === 'ar' ? product.nameAr : product.nameEn)}
          icon={<ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />}
          className="w-full justify-center"
        >
          {language === 'ar' ? product.ctaAr : product.ctaEn}
        </Button>
      </div>
    </motion.div>
  );
};

