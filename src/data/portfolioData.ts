import type { Project, EcosystemProduct } from '../types';
import { getAssetUrl } from '../utils/assets';

export interface CapabilityItem {
  number: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export interface ProcessStepItem {
  step: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export interface FaqItem {
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export const projects: Project[] = [
  {
    id: 'gotcha-fresh-tea',
    slug: 'gotcha-fresh-tea',
    titleAr: 'جوتشا فريش تي — جدة',
    titleEn: 'Gotcha Fresh Tea | Jeddah',
    category: 'tea',
    categoryLabelAr: 'مقاهي وشاي',
    categoryLabelEn: 'Specialty Tea',
    descAr: 'منيو تفاعلي وطلب سريع للمشروبات الطازجة والبوبا مع تخصيص الإضافات ودفع مباشر عبر Apple Pay ومدى.',
    descEn: 'Interactive beverage menu and rapid mobile ordering with custom toppings, boba levels, and native Apple Pay & Mada.',
    fullDescAr: 'صممنا وطورنا لعلامة جوتشا العالمية في جدة تجربة رقمية استثنائية وقائمة طعام تفاعلية تبرز أصناف الشاي الطازج وتفاصيل الإضافات والبوبا ونسب السكر، مع خيارات طلب سريع واستلام مباشر ودفع رقمي سلس.',
    fullDescEn: 'Engineered an interactive ordering portal for Gotcha Fresh Tea in Jeddah, offering deep drink customization and frictionless mobile checkout.',
    metricsAr: '+190% طلبات مباشرة • استلام خلال 6 دقائق',
    metricsEn: '+190% Direct Orders • 6-Min Pickup',
    tags: ['Next.js', 'Apple Pay', 'QR Ordering'],
    accentColor: '#A6FF2E',
    gradientBg: 'from-zinc-900 to-zinc-950',
    image: getAssetUrl('assets/projects/gotcha/hero-desktop.png'),
    liveUrl: 'https://gotcha-fresh-tea-jeddah-jwmw.vercel.app',
    devicePreview: {
      badgeAr: 'شاي البوبا والفاكهة الطازجة',
      badgeEn: 'Signature Fresh Boba',
      heroTitleAr: 'شاي الماتشا بالجبنة والبوبا',
      heroTitleEn: 'Cheese Foam Matcha Boba',
      rating: '4.9',
      reviewCount: '1,450+',
      priceTagAr: '24 ر.س',
      priceTagEn: '24 SAR',
      ctaTextAr: 'طلب فوري واستلام من الفرع',
      ctaTextEn: 'Express Pickup Order',
      primaryMetricAr: 'جاهز للاستلام خلال 6 دقائق',
      primaryMetricEn: 'Pickup Ready in 6 Mins',
      accentBg: '#111214',
      highlightTagAr: 'الأكثر طلباً',
      highlightTagEn: 'Top Seller',
      subItemsAr: ['حليب طازج مع ماتشا عالية الجودة', 'كرات البوبا طازجة يومياً', 'تخصيص مستوى السكر والثلج بلمسة واحدة'],
      subItemsEn: ['Fresh dairy paired with premium matcha', 'Artisanal daily-cooked boba pearls', 'Customizable ice and sweetness level'],
    },
    highlightPointsAr: [
      'زيادة حجم الطلبات المباشرة بنسبة +190% عبر الجوال',
      'قائمة تفاعلية تختصر وقت انتظار العميل أمام الكاشير',
      'سرعة تحميل استثنائية 0.7 ثانية على شبكات 5G',
      'ربط كامل وسلس مع نقاط البيع وطباعة الفواتير الفورية'
    ],
    highlightPointsEn: [
      '+190% direct order volume via mobile browser',
      'Interactive visual menu drastically reducing cashier queue time',
      'Sub-second 0.7s loading speed across Saudi 5G networks',
      'Seamless POS synchronization and instant receipt routing'
    ],
  },
  {
    id: 'alkhal-aldimashki',
    slug: 'alkhal-aldimashki',
    titleAr: 'مطعم الخال الدمشقي',
    titleEn: 'Al-Khal Al-Dimashqi',
    category: 'fnb',
    categoryLabelAr: 'مطاعم وكافيهات',
    categoryLabelEn: 'Dining & Cafes',
    descAr: 'قائمة طعام رقمية سريعة للأطباق الشامية والشاورما تدعم الطلب المباشر من الطاولة والاستلام السريع.',
    descEn: 'Ultra-fast digital menu for heritage Levantine dining and authentic shawarma, supporting table self-ordering and express pickup.',
    fullDescAr: 'بنينا لمطعم الخال الدمشقي منظومة قائمة طعام رقمية سريعة جداً تجمع بين عراقة الطهي الشامي وسرعة تجربة الطلب الحديثة، مع استعراض صور عالية الدقة للشاورما والمشاوي، ودعم الطلب المباشر للطاولات والتوصيل.',
    fullDescEn: 'Architected a high-speed visual ordering portal for Al-Khal Al-Dimashqi in Jeddah, showcasing heritage Levantine grills and seamless dine-in / takeout ordering.',
    metricsAr: '+230% طلبات المنيو • تقييم 4.9★',
    metricsEn: '+230% Menu Orders • 4.9★ Rating',
    tags: ['Next.js', 'POS Integration', 'Apple Pay'],
    accentColor: '#A6FF2E',
    gradientBg: 'from-zinc-900 to-zinc-950',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://damascene.vercel.app/#cat-chicken-shawarma',
    devicePreview: {
      badgeAr: 'شاورما على السيخ الشامي',
      badgeEn: 'Authentic Damascene Shawarma',
      heroTitleAr: 'صحن شاورما الخال المميز',
      heroTitleEn: 'Al-Khal Signature Shawarma Platter',
      rating: '4.9',
      reviewCount: '2,840+',
      priceTagAr: '38 ر.س',
      priceTagEn: '38 SAR',
      ctaTextAr: 'طلب الوجبة الآن',
      ctaTextEn: 'Order Platter Now',
      primaryMetricAr: 'تحضير طازج على الحطب والمشواة',
      primaryMetricEn: 'Fresh Charcoal Grill Prep',
      accentBg: '#111214',
      highlightTagAr: 'الأعلى طلباً',
      highlightTagEn: 'Top Selling Dish',
      subItemsAr: ['دجاج طازج متبل بالخلطة الشامية العريقة', 'ثومية كريمية ومخللات منزلية طازجة', 'خبز صاج مخبوز طازجاً مع كل وجبة'],
      subItemsEn: ['Fresh chicken marinated with heritage spices', 'Homemade creamy garlic dip & crisp pickles', 'Fresh stone-baked saj bread included'],
    },
    highlightPointsAr: [
      'نمو كبير في طلبات المنيو الرقمي بنسبة +230%',
      'تخفيف الضغط على موظفي الكاشير خلال ساعات الذروة',
      'عرض دقيق للأطباق ومكوناتها ومسببات الحساسية',
      'دعم الدفع الفوري عبر أبل باي ومدى'
    ],
    highlightPointsEn: [
      '+230% digital menu order growth',
      'Frictionless peak-hour customer ordering',
      'Full allergen disclosure and high-res imagery',
      'Instant Saudi checkout with Apple Pay & Mada'
    ],
  },
  {
    id: 'lavoa',
    slug: 'lavoa',
    titleAr: 'لاونج ومقهى لافوا',
    titleEn: 'Lavoa Lounge & Cafe',
    category: 'fnb',
    categoryLabelAr: 'مطاعم وكافيهات',
    categoryLabelEn: 'Dining & Cafes',
    descAr: 'منصة ضيافة فاخرة لاستعراض القائمة وحجز طاولات الـ VIP وتنسيق الفعاليات بتأكيد فوري عبر واتساب.',
    descEn: 'Luxury hospitality platform for menu exploration, VIP table reservations, and concierge event coordination with instant WhatsApp confirmations.',
    fullDescAr: 'قمنا بهندسة المنصة الرقمية للاونج لافوا بأسلوب راقٍ. توفر المنصة حجوزات VIP للطاولات، واستعراض قائمة المشروبات والمخبوزات الطازجة، وتنسيق الفعاليات الخاصة بلمسة واحدة.',
    fullDescEn: 'Architected a luxury hospitality portal for Lavoa Lounge, delivering VIP table reservations, dynamic menu showcases, and direct concierge event bookings.',
    metricsAr: '+160% حجوزات VIP • خوادم Edge فائقة السرعة',
    metricsEn: '+160% VIP Bookings • Ultra-Fast Edge Servers',
    tags: ['React', 'Cloudflare Workers', 'VIP Booking'],
    accentColor: '#A6FF2E',
    gradientBg: 'from-zinc-900 to-zinc-950',
    image: getAssetUrl('assets/projects/lavoa/hero-desktop.png'),
    liveUrl: 'https://lavoa.hgendi3.workers.dev/',
    devicePreview: {
      badgeAr: 'لاونج وضيافة فاخرة',
      badgeEn: 'Luxury Lounge Concierge',
      heroTitleAr: 'قهوة لافوا المقطرة الخاصة',
      heroTitleEn: 'Lavoa Reserve Pour-Over',
      rating: '4.95',
      reviewCount: '1,720+',
      priceTagAr: '42 ر.س',
      priceTagEn: '42 SAR',
      ctaTextAr: 'حجز طاولة VIP الآن',
      ctaTextEn: 'Book VIP Lounge Table',
      primaryMetricAr: 'خدمة ضيافة كونسيرج 24/7',
      primaryMetricEn: '24/7 Concierge Hospitality',
      accentBg: '#111214',
      highlightTagAr: 'الأكثر تميزاً',
      highlightTagEn: 'Signature Reserve',
      subItemsAr: ['محاصيل قهوة إثيوبية وكولومبية نادرة', 'حلويات ومخبوزات فرنسية طازجة يومياً', 'أجواء موسيقية راقية وإطلالة مميزة'],
      subItemsEn: ['Rare Ethiopian and Geisha coffee varietals', 'Daily baked artisanal French patisserie', 'Ambient acoustic setting with skyline view'],
    },
    highlightPointsAr: [
      'ارتفاع حجوزات الطاولات الخاصة بنسبة +160%',
      'تجربة مستخدم راقية تعكس مستوى اللاونج الفندقي',
      'إشعارات حجز وتأكيد فوري عبر الواتساب',
      'بنية سحابية فائقة السرعة على خوادم Edge'
    ],
    highlightPointsEn: [
      '+160% increase in private lounge table reservations',
      'High-touch hospitality design language',
      'Instant WhatsApp booking confirmation dispatch',
      'Ultra-fast Cloudflare Edge cloud architecture'
    ],
  },
  {
    id: 'ueno-saryo',
    slug: 'ueno-saryo',
    titleAr: 'مقهى أوينو ساريو',
    titleEn: 'Ueno Saryo Matcha',
    category: 'tea',
    categoryLabelAr: 'مقاهي وشاي',
    categoryLabelEn: 'Specialty Tea',
    descAr: 'تجربة رقمية هادئة لمقهى ماتشا ياباني، تتيح استكشاف درجات الماتشا وحجز جلسات التذوق الخاصة.',
    descEn: 'Serene Japanese specialty matcha digital experience, featuring ceremonial grade tastings and private flight reservations.',
    fullDescAr: 'صممنا تجربة رقمية فائقة الهدوء والأناقة تعكس الفلسفة اليابانية لمقهى أوينو ساريو. تتيح المنصة استكشاف درجات الماتشا الاحتفالية، وحجز جلسات التذوق الخاصة، وطلب المشروبات مع دعم كامل للدفع الفوري.',
    fullDescEn: 'Crafted a serene digital platform reflecting Japanese minimalist aesthetics for Ueno Saryo, enabling ceremonial matcha tasting flights and table bookings.',
    metricsAr: 'إشغال كامل لجلسات التذوق',
    metricsEn: '100% Fully Booked Tasting Sessions',
    tags: ['Custom UI', 'Booking Flow'],
    accentColor: '#A6FF2E',
    gradientBg: 'from-zinc-900 to-zinc-950',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    devicePreview: {
      badgeAr: 'ماتشا احتفالي أصيل',
      badgeEn: 'Ceremonial Japanese Matcha',
      heroTitleAr: 'جلسة تذوق شاي أوجي الخاصة',
      heroTitleEn: 'Uji Master Tasting Flight',
      rating: '4.98',
      reviewCount: '980+',
      priceTagAr: '65 ر.س',
      priceTagEn: '65 SAR',
      ctaTextAr: 'حجز جلسة التذوق',
      ctaTextEn: 'Book Tasting Flight',
      primaryMetricAr: 'جلسات تذوق خاصة محدودة',
      primaryMetricEn: 'Exclusive Limited Slots',
      accentBg: '#111214',
      highlightTagAr: 'حجز مسبق',
      highlightTagEn: 'Advance Booking',
      subItemsAr: ['ماتشا عضوية من مزارع أوجي بكيوتو', 'تحضير يدوي بأدوات البامبو اليابانية', 'تقديم مع حلوى الواغاشي التقليدية'],
      subItemsEn: ['Single-origin organic Uji harvest', 'Whisked with handcrafted chasen bamboo', 'Paired with artisan seasonal wagashi'],
    },
    highlightPointsAr: [
      'حجوزات مكتملة لجلسات التذوق لأسابيع مقدماً',
      'واجهة هادئة تعكس الثقافة والضيافة اليابانية الأصيلة',
      'سرعة تحميل فائقة على كافة شبكات الهواتف',
      'تأكيد حجز لحظي عبر رسائل الجوال'
    ],
    highlightPointsEn: [
      'Tasting sessions booked out weeks in advance',
      'Zen minimalist interface reflecting Japanese hospitality',
      'Sub-second mobile rendering',
      'Automated real-time reservation confirmations'
    ],
  },
  {
    id: 'lumi-matcha',
    slug: 'lumi-matcha',
    titleAr: 'متجر ماتشا لومي',
    titleEn: 'Lumi Matcha Store',
    category: 'ecommerce',
    categoryLabelAr: 'متاجر وعقار',
    categoryLabelEn: 'E-Commerce & Real Estate',
    descAr: 'متجر إلكتروني سريع يدعم الاشتراكات الشهرية والدفع عبر مدى وتابي وتمارا مع تتبع الشحن في الرياض وجدة.',
    descEn: 'High-speed boutique e-commerce for Japanese ceremonial matcha in Riyadh & Jeddah with subscription tiers, Tabby, Tamara, and live tracking.',
    fullDescAr: 'قمنا بتصميم وهندسة المنصة بأسلوب بصري هادئ. تم بناء بنية شراء فائقة السرعة ترفع معدل التحويل وتدعم نظام الاشتراكات الدورية والدفع السلس عبر مدى وتابي وتمارا مع تتبع مباشر للشحنات.',
    fullDescEn: 'Engineered a modern e-commerce experience achieving high conversion rates with recurring subscriptions and seamless Saudi payment rails.',
    metricsAr: '6.4% معدل تحويل • +140% نمو المبيعات',
    metricsEn: '6.4% Conversion Rate • +140% Sales Growth',
    tags: ['Next.js', 'Shopify Headless', 'Tabby & Tamara'],
    accentColor: '#A6FF2E',
    gradientBg: 'from-zinc-900 to-zinc-950',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=80',
    devicePreview: {
      badgeAr: 'ماتشا احتفالي أصلي',
      badgeEn: 'Ceremonial Grade',
      heroTitleAr: 'ماتشا أوجي الفاخرة',
      heroTitleEn: 'Uji Ceremonial Matcha',
      rating: '4.95',
      reviewCount: '1,240+',
      priceTagAr: '185 ر.س',
      priceTagEn: '185 SAR',
      ctaTextAr: 'طلب فوري عبر Apple Pay',
      ctaTextEn: 'Express Apple Pay',
      primaryMetricAr: 'توصيل في نفس اليوم بالرياض وجدة',
      primaryMetricEn: 'Same-day Riyadh & Jeddah Delivery',
      accentBg: '#111214',
      highlightTagAr: 'الأكثر طلباً',
      highlightTagEn: 'Best Seller',
      subItemsAr: ['عبوة 50 غرام عضوية معتمدة', 'مخفقة بامبو تشاسن يابانية', 'شحن مجاني للطلبات فوق 250 ر.س'],
      subItemsEn: ['50g Organic Certified Tin', 'Japanese Chasen Bamboo Whisk', 'Free Shipping over 250 SAR'],
    },
    highlightPointsAr: [
      'زيادة المبيعات بنسبة +140% في أول شهرين من الإطلاق',
      'ربط كامل وسلس مع أبل باي وبوابات التقسيط السعودية',
      'تصميم واجهة مستخدم مخصصة تعكس جودة المنتج',
      'سرعة تحميل فائقة بلغت 0.8 ثانية على شبكات الجوال'
    ],
    highlightPointsEn: [
      '+140% sales velocity in initial 2 months of launch',
      'Seamless Apple Pay and Saudi installment gateway integrations',
      'Bespoke interface reflecting product quality',
      'Sub-second 0.8s load time across Saudi mobile carriers'
    ],
  },
  {
    id: 'sakan-luxury',
    slug: 'sakan-luxury',
    titleAr: 'سكن العقارية',
    titleEn: 'Sakan Living',
    category: 'ecommerce',
    categoryLabelAr: 'متاجر وعقار',
    categoryLabelEn: 'E-Commerce & Real Estate',
    descAr: 'منصة عرض وتسويق مشاريع سكنية بالرياض مع فلاتر بحث دقيقة وطلب مخططات ومعاينة مباشرة عبر واتساب.',
    descEn: 'Architectural showcase platform for residential projects in Riyadh, featuring smart search filters, floor plan downloads, and direct broker chat.',
    fullDescAr: 'تصميم تجربة معمارية رفيعة المستوى لشركة تطوير عقاري، تشمل فلاتر بحث بالحي والمساحة وطلب عروض الأسعار والمخططات بلمسة واحدة.',
    fullDescEn: 'A high-end architectural web platform providing property specifications, interactive master plans, and direct lead generation.',
    metricsAr: '450+ عميل مؤهل في الشهر الأول',
    metricsEn: '450+ Qualified Leads in Month One',
    tags: ['Next.js', 'Interactive Maps', 'CRM & WhatsApp'],
    accentColor: '#A6FF2E',
    gradientBg: 'from-zinc-900 to-zinc-950',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    devicePreview: {
      badgeAr: 'مشروع نرجس الفاخر',
      badgeEn: 'Narjis Luxury Estate',
      heroTitleAr: 'فيلا الذكاء المعماري الحديث',
      heroTitleEn: 'Modern Smart Architectural Villa',
      rating: '4.92',
      reviewCount: '430+',
      priceTagAr: '3.8M ر.س',
      priceTagEn: '3.8M SAR',
      ctaTextAr: 'حجز موعد معاينة خاصة',
      ctaTextEn: 'Schedule Private Viewing',
      primaryMetricAr: 'شمال الرياض - حي النرجس',
      primaryMetricEn: 'North Riyadh - Al Narjis',
      accentBg: '#111214',
      highlightTagAr: 'جاهز للإفراغ',
      highlightTagEn: 'Move-in Ready',
      subItemsAr: ['مساحة 520 متر بنظام منزل ذكي كامل', 'مسبح خاص وحديقة علوية بانورامية', 'تسهيلات تمويلية مع البنوك المعتمدة'],
      subItemsEn: ['520 sqm with full smart home OS', 'Private pool and rooftop sky garden', 'Saudi accredited bank financing'],
    },
    highlightPointsAr: [
      'توليد أكثر من 450 عميل محتمل مؤهل خلال الشهر الأول',
      'تكامل فوري مع أنظمة الـ CRM وإشعارات الواتساب للمسؤولين',
      'سرعة استثنائية وثبات عالٍ على كافة محركات البحث'
    ],
    highlightPointsEn: [
      'Generated 450+ high-intent leads in the first month',
      'Instant CRM sync and WhatsApp sales alerts',
      'Sub-second page speeds with top local search rankings'
    ],
  },
];

export const ecosystemProducts: EcosystemProduct[] = [
  {
    id: 'taqyeemi',
    slug: 'taqyeemi',
    nameAr: 'تقييمي — Taqyeemi',
    nameEn: 'Taqyeemi NFC Review Stand',
    taglineAr: 'حوامل NFC لتقييمات خرائط جوجل',
    taglineEn: 'NFC Stands for Google Maps Reviews',
    badgeAr: 'حوامل NFC لتقييمات خرائط جوجل',
    badgeEn: 'NFC Stands for Google Reviews',
    descAr: 'حوامل أكريليك وخشب فاخر بشريحة NFC ورمز QR تفتح صفحة تقييم فرعك على جوجل بلمسة واحدة، بدون اشتراكات شهرية.',
    descEn: 'Luxury acrylic and wood desktop stands with embedded NFC and dynamic QR, launching your Google review page with a single tap. Zero recurring fees.',
    featuresAr: [
      'فلترة ذكية تحوّل التقييمات الإيجابية لجوجل والملاحظات لإدارتك مباشرة.',
      'لوحة متابعة لقياس أداء التقييمات لكل فرع وموظف.',
      'توريد وبرمجة كاملة تدوم مدى الحياة بدون رسوم متكررة.'
    ],
    featuresEn: [
      'Smart sentiment filter routing 5-stars to Google and private feedback to management.',
      'Live tracking dashboard measuring daily review performance by branch and staff.',
      'Turnkey hardware configuration with lifetime functionality and zero monthly fees.'
    ],
    highlightMetricAr: '+340% زيادة في التقييمات خلال 30 يوماً',
    highlightMetricEn: '+340% Google Reviews within 30 days',
    icon: 'Star',
    accent: 'mint',
    ctaAr: 'اطلب باقة تقييمي ←',
    ctaEn: 'Order Taqyeemi Bundle ←',
    mockupType: 'nfc',
  },
  {
    id: 'pointpass',
    slug: 'pointpass',
    nameAr: 'بوينت باس — PointPass',
    nameEn: 'PointPass Mobile Wallet Loyalty',
    taglineAr: 'بطاقات ولاء داخل Apple & Google Wallet',
    taglineEn: 'Apple & Google Wallet Loyalty Passes',
    badgeAr: 'بطاقات ولاء داخل Apple & Google Wallet',
    badgeEn: 'Native Wallet Loyalty Pass',
    descAr: 'بطاقة عضوية ونقاط تضاف مباشرة لمحفظة جوال العميل بمسحة واحدة، بدون تحميل أي تطبيق.',
    descEn: 'Digital membership and points card added directly to your customer mobile wallet with a single scan. Zero app downloads required.',
    featuresAr: [
      'إشعارات ترويجية مجانية تظهر على شاشة القفل عند اقتراب العميل من فرعك.',
      'نظام نقاط ومستويات VIP مرتبط بأجهزة الكاشير وماسح الباركود.',
      'بناء قاعدة بيانات عملاء نظامية تملكها علامتك بالكامل.'
    ],
    featuresEn: [
      'Free geo-targeted promotional notifications appearing on lock screens near your branches.',
      'Dynamic points and VIP tiers synchronized with existing POS scanners.',
      'Compliant first-party customer database owned 100% by your brand.'
    ],
    highlightMetricAr: '78% نسبة عودة العملاء حاملي البطاقة',
    highlightMetricEn: '78% Customer Repeat Purchase Rate',
    icon: 'CreditCard',
    accent: 'gold',
    ctaAr: 'فعّل بوينت باس لعلامتك ←',
    ctaEn: 'Deploy PointPass ←',
    mockupType: 'wallet',
  },
  {
    id: 'foodus',
    slug: 'foodus',
    nameAr: 'فودس — Foodus',
    nameEn: 'Foodus QR Dining & Self-Checkout',
    taglineAr: 'منيو رقمي وطلب مباشر بدون عمولات',
    taglineEn: 'QR Digital Menu & Self-Order with 0% Commission',
    badgeAr: 'منيو رقمي وطلب مباشر بدون عمولات',
    badgeEn: 'Zero Commission Digital Dining',
    descAr: 'قائمة طعام تفاعلية سريعة بالصور والسعرات، مع طلب ودفع فوري من الطاولة أو السيارة عبر Apple Pay ومدى.',
    descEn: 'Fast visual food menu with photos and calorie counts, supporting table self-checkout and curbside pickup via Apple Pay and Mada.',
    featuresAr: [
      'طلب من الطاولة أو استلام من السيارة (Drive-Thru) بإشعار فوري.',
      'ربط سحابي مباشر مع طابعات وشاشات المطبخ بدون تأخير.',
      '100% من أرباح الطلبات تبقى لك دون أي وسيط.'
    ],
    featuresEn: [
      'Table self-ordering or curbside drive-thru pickup with instant vehicle alerts.',
      'Direct cloud link to kitchen thermal printers and chef prep displays.',
      'Keep 100% of order revenue with absolutely zero third-party commission fees.'
    ],
    highlightMetricAr: '0% عمولة • توفير يتجاوز 18,000 ر.س شهرياً',
    highlightMetricEn: '0% Commission • Save 18,000+ SAR Monthly',
    icon: 'UtensilsCrossed',
    accent: 'emerald',
    ctaAr: 'اطلب تجربة فودس ←',
    ctaEn: 'Start Foodus Trial ←',
    mockupType: 'pos',
  },
];

export const capabilities: CapabilityItem[] = [
  {
    number: '01',
    titleAr: 'مواقع وهويات رقمية مخصصة',
    titleEn: 'Bespoke Websites & Digital Identities',
    descAr: 'تصميم UI/UX حصري بدون قوالب، مبني على React وNext.js بسرعة تحميل أقل من ثانية وتجاوب تام مع الجوال ودعم عربي/إنجليزي.',
    descEn: 'Bespoke UI/UX design with zero templates, engineered on React and Next.js with sub-second speeds, flawless mobile ergonomics, and bidirectional Arabic/English.'
  },
  {
    number: '02',
    titleAr: 'المتاجر وربط المدفوعات السعودية',
    titleEn: 'Saudi E-Commerce & Payment Rails',
    descAr: 'ربط رسمي مباشر مع مدى، Apple Pay، تابي، وتمارا، مع توافق كامل مع الفوترة الإلكترونية (ZATCA) وأتمتة إشعارات واتساب.',
    descEn: 'Native direct integration with Mada, Apple Pay, Tabby, and Tamara, fully aligned with ZATCA electronic invoicing and automated WhatsApp order alerts.'
  },
  {
    number: '03',
    titleAr: 'تهيئة محركات البحث (Technical SEO)',
    titleEn: 'Technical SEO & Search Authority',
    descAr: 'بنية برمجية نظيفة وبيانات منظمة (Schema) تساعد موقعك على تصدر نتائج البحث في السعودية دون الاعتماد الكلي على الإعلانات.',
    descEn: 'Clean semantic markup and Schema structured data engineered to capture top Google rankings across Saudi markets without excessive ad spend.'
  },
  {
    number: '04',
    titleAr: 'استضافة سحابية ودعم مستمر',
    titleEn: 'Cloud Edge Hosting & Continuous Support',
    descAr: 'استضافة على خوادم Edge سريعة، حماية SSL وجدار ناري، نسخ احتياطي يومي، ودعم فني مباشر من داخل المملكة.',
    descEn: 'Enterprise Edge hosting, SSL and WAF firewalls, automated daily off-site backups, and responsive technical engineering from within Saudi Arabia.'
  }
];

export const processSteps: ProcessStepItem[] = [
  {
    step: '01',
    titleAr: 'الاكتشاف والتخطيط',
    titleEn: 'Discovery & Architecture',
    descAr: 'تحديد الأهداف وهيكلة تجربة المستخدم ومسار التحويل.',
    descEn: 'Defining objectives, mapping conversion funnels, and structuring UX.'
  },
  {
    step: '02',
    titleAr: 'التصميم التفاعلي',
    titleEn: 'Interactive Design',
    descAr: 'تصميم واجهة حصرية متوافقة مع هوية علامتك ومراجعتها معك.',
    descEn: 'Crafting bespoke interfaces aligned with your brand identity for your review.'
  },
  {
    step: '03',
    titleAr: 'البرمجة والربط',
    titleEn: 'Engineering & Integration',
    descAr: 'كتابة كود نظيف وربط بوابات الدفع ونقاط البيع والـ SEO.',
    descEn: 'Writing clean code and integrating payment rails, POS systems, and SEO.'
  },
  {
    step: '04',
    titleAr: 'الفحص والإطلاق',
    titleEn: 'Audit & Launch',
    descAr: 'اختبار السرعة والأمان وتسليم لوحة التحكم مع ضمان الدعم.',
    descEn: 'Speed and security audit, dashboard handoff, and ongoing support warranty.'
  }
];

export const faqs: FaqItem[] = [
  {
    questionAr: 'كم يستغرق تنفيذ الموقع بالكامل؟',
    questionEn: 'How long does a full custom web project take?',
    answerAr: 'من 7 إلى 21 يوم عمل حسب حجم المشروع، مع جدول زمني واضح ورابط معاينة حي قبل الإطلاق الرسمي.',
    answerEn: 'Typically between 7 to 21 business days depending on scope, with transparent milestones and a live staging link prior to launch.'
  },
  {
    questionAr: 'هل أستطيع تعديل النصوص والمنتجات بنفسي بعد التسليم؟',
    questionEn: 'Can we manage and update content ourselves after launch?',
    answerAr: 'نعم، نسلّمك لوحة تحكم بسيطة تمكّن فريقك من تعديل الأسعار والصور والمحتوى بسهولة، مع فيديو شرح مختصر.',
    answerEn: 'Yes, we provide an intuitive dashboard allowing your team to update prices, photos, and texts with ease, accompanied by a brief video guide.'
  },
  {
    questionAr: 'هل تدعم المواقع مدى وApple Pay والفوترة الإلكترونية؟',
    questionEn: 'Do your platforms support Mada, Apple Pay, and ZATCA invoicing?',
    answerAr: 'نعم، نربط الموقع مباشرة ببوابات الدفع السعودية (مدى، Apple Pay، تابي، تمارا) وفق متطلبات هيئة الزكاة والضريبة (ZATCA) وبأعلى معايير التشفير.',
    answerEn: 'Yes, we integrate natively with official Saudi payment rails (Mada, Apple Pay, Tabby, Tamara) fully compliant with ZATCA Phase 2 standards.'
  },
  {
    questionAr: 'ماذا يشمل الضمان والدعم الفني بعد الإطلاق؟',
    questionEn: 'What does the post-launch support and warranty cover?',
    answerAr: 'مراقبة مستمرة لاستقرار السيرفر، نسخ احتياطي تلقائي، تحديثات أمنية، ودعم فني سريع لمعالجة أي تعديل أو طارئ.',
    answerEn: 'Continuous server health monitoring, automatic backups, security updates, and rapid technical support for any inquiries or adjustments.'
  },
  {
    questionAr: 'كيف نبدأ العمل وما آلية الدفع؟',
    questionEn: 'How do we kick off and what is the payment schedule?',
    answerAr: 'نبدأ بمكالمة أو محادثة سريعة لفهم متطلباتك، ثم نرسل عرضاً واضحاً وعقداً رقمياً، وتُقسّم الدفعات على مراحل الإنجاز عبر التحويل البنكي أو البطاقات.',
    answerEn: 'We start with a quick brief to understand requirements, follow with a clear proposal and contract, and split payments across delivery milestones.'
  }
];

export const translations = {
  ar: {
    brandName: 'MUHAB STUDIO',
    brandTagline: 'استوديو مهاب الرقمي',
    navWork: 'الأعمال',
    navProducts: 'المنتجات',
    navServices: 'الخدمات',
    navFaq: 'الأسئلة الشائعة',
    ctaStartProject: 'ابدأ مشروعك',

    // Hero
    heroMeta: 'استوديو رقمي — جدة، السعودية',
    heroH1: 'نصمّم مواقع ومنتجات رقمية مخصصة ترفع مبيعات علامتك.',
    heroSub: 'نطوّر مواقع سريعة بدون قوالب جاهزة، مع ربط مباشر بمدى وApple Pay وأنظمة تشغيل ذكية للمطاعم والمتاجر في السعودية.',
    heroCtaPrimary: 'ابدأ مشروعك',
    heroCtaSecondary: 'تصفّح أعمالنا',
    heroProof1: 'تحميل < 0.8 ثانية',
    heroProof2: 'ربط مدى و Apple Pay',
    heroProof3: 'كود مخصص 100%',
    heroPhonePreview: 'معاينة الموقع ↗',

    // Portfolio
    portfolioTitle: 'أعمال نفّذناها',
    portfolioSubtitle: 'مواقع ومنصات حية تعمل اليوم لعلامات في السوق السعودي.',
    filterAll: 'الكل',
    filterFnb: 'مطاعم وكافيهات',
    filterTea: 'مقاهي وشاي',
    filterEcommerce: 'متاجر وعقار',
    btnProjectDetails: 'تفاصيل المشروع',
    btnVisitLive: 'زيارة الموقع ↗',
    btnRequestSimilar: 'اطلب مشروعاً مشابهاً',

    // Products
    productsTitle: 'منتجاتنا الرقمية',
    productsSubtitle: 'حلول عملية جاهزة للتشغيل ترفع مبيعات الفروع وتلغي العمولات.',

    // Capabilities
    capabilitiesTitle: 'الخدمات ومنهجية العمل',
    capabilitiesSubtitle: 'هندسة رقمية مخصصة ومسار تنفيذ مدروس يضمن النتائج.',
    servicesHeader: 'الخدمات الأساسية',
    processHeader: 'كيف نعمل',

    // FAQ
    faqTitle: 'الأسئلة الشائعة',
    faqSubtitle: 'إجابات مباشرة على استفساراتك قبل بدء المشروع.',

    // CTA & Footer
    preFooterTitle: 'عندك مشروع؟ خلّينا نبدأ.',
    preFooterSub: 'تواصل معنا مباشرة لمناقشة فكرتك والحصول على تصور مبدئي وخطة تنفيذ واضحة.',
    btnWhatsApp: 'تواصل عبر واتساب',
    btnModalConsult: 'احجز استشارة عبر النموذج',
    footerStudioDesc: 'استوديو سعودي لتصميم المواقع والمنتجات الرقمية المخصصة.',
    footerLocation: 'جدة - حي الشاطئ، المملكة العربية السعودية',
    footerStatus: 'متاح لمشاريع جديدة',
    footerRights: '© 2026 استوديو مهاب — MUHAB STUDIO. جميع الحقوق محفوظة.',
  },
  en: {
    brandName: 'MUHAB STUDIO',
    brandTagline: 'Bespoke Digital Studio',
    navWork: 'Work',
    navProducts: 'Products',
    navServices: 'Services',
    navFaq: 'FAQ',
    ctaStartProject: 'Start Project',

    // Hero
    heroMeta: 'Digital Studio — Jeddah, Saudi Arabia',
    heroH1: 'We architect bespoke digital flagships and products that scale your brand.',
    heroSub: 'Engineering sub-second web platforms with zero generic templates, direct Mada & Apple Pay rails, and smart operations for Saudi brands.',
    heroCtaPrimary: 'Start Project',
    heroCtaSecondary: 'Explore Work',
    heroProof1: 'Sub-0.8s Load',
    heroProof2: 'Mada & Apple Pay',
    heroProof3: '100% Bespoke Code',
    heroPhonePreview: 'Live Preview ↗',

    // Portfolio
    portfolioTitle: 'Selected Work',
    portfolioSubtitle: 'Live platforms operating today for leading brands in the Saudi market.',
    filterAll: 'All',
    filterFnb: 'Dining & Cafes',
    filterTea: 'Specialty Tea',
    filterEcommerce: 'E-Commerce & Real Estate',
    btnProjectDetails: 'Project Details',
    btnVisitLive: 'Live Site ↗',
    btnRequestSimilar: 'Request Similar Project',

    // Products
    productsTitle: 'Digital Products',
    productsSubtitle: 'Turnkey operational software driving branch revenue and eliminating commissions.',

    // Capabilities
    capabilitiesTitle: 'Capabilities & Process',
    capabilitiesSubtitle: 'Disciplined engineering frameworks designed for measurable business growth.',
    servicesHeader: 'Core Capabilities',
    processHeader: 'How We Work',

    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Clear, direct answers to common questions about our delivery.',

    // CTA & Footer
    preFooterTitle: 'Have a project in mind? Let’s talk.',
    preFooterSub: 'Connect with us directly to discuss your objectives and receive a clear scope and roadmap.',
    btnWhatsApp: 'Chat via WhatsApp',
    btnModalConsult: 'Book Consultation Form',
    footerStudioDesc: 'A Saudi studio dedicated to bespoke web architecture and digital products.',
    footerLocation: 'Jeddah - Al-Shati District, Kingdom of Saudi Arabia',
    footerStatus: 'Available for New Projects',
    footerRights: '© 2026 MUHAB STUDIO. All rights reserved.',
  }
};
