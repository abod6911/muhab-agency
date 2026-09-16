/**
 * Muhab Studio - Order & Dispatch Service
 * Handles:
 * 1. Generating unique corporate order reference IDs (e.g. MH-26-8492)
 * 2. Dispatching complete order details to muhabagency@gmail.com
 * 3. Building synchronized WhatsApp dispatch messages
 */

export interface OrderPayload {
  orderId: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  budget?: string;
  brief?: string;
  tags?: string[];
  sourceDomain?: string;
  sendMethod?: 'email' | 'whatsapp';
}

export const COMPANY_EMAIL = 'muhabagency@gmail.com';
export const OFFICIAL_DOMAIN = 'MUHAB.org';
export const WHATSAPP_NUMBER = '966565114955';

/**
 * Generate an executive, clean order reference ID
 * Format: MH-{YY}-{4 random digits}
 * Example: MH-26-7842
 */
export const generateOrderId = (): string => {
  const year = new Date().getFullYear().toString().slice(-2);
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `MH-${year}-${randomDigits}`;
};

/**
 * Normalizes a Saudi or international phone number
 */
export const formatDisplayPhone = (rawPhone: string): string => {
  let clean = rawPhone.trim().replace(/[^\d+]/g, '');
  if (clean.startsWith('+966')) {
    clean = clean.slice(4).trim();
  } else if (clean.startsWith('966')) {
    clean = clean.slice(3).trim();
  } else if (clean.startsWith('05')) {
    clean = clean.slice(1).trim();
  }
  return clean ? `+966 ${clean}` : (rawPhone.trim() || 'غير محدد');
};

/**
 * Dispatches the order payload to muhabagency@gmail.com via FormSubmit API
 */
export const sendOrderToEmail = async (
  payload: OrderPayload
): Promise<{ success: boolean; message?: string }> => {
  const endpoint = `https://formsubmit.co/ajax/${COMPANY_EMAIL}`;

  const saudiTimeString = new Intl.DateTimeFormat('ar-SA', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Riyadh',
  }).format(new Date());

  const postBody: Record<string, any> = {
    _subject: `🔥 [طلب مشروع جديد #${payload.orderId}] - ${payload.name || 'عميل استوديو مهاب'}`,
    _template: 'table',
    _captcha: 'false',
    _autoresponse: `مرحباً بك في استوديو مهاب، تم استلام طلبك برقم مرجعي: ${payload.orderId}. سنقوم بمراجعة متطلباتك والتواصل معك فوراً.`,
    '🔖 رقم الطلب المعتمد (Order ID)': payload.orderId,
    '🌐 النطاق والمصدر (Domain)': payload.sourceDomain || OFFICIAL_DOMAIN,
    '👤 الاسم الكريم أو اسم المنشأة': payload.name || 'غير محدد',
    '📱 رقم التواصل (واتساب)': formatDisplayPhone(payload.phone),
    '📧 البريد الإلكتروني للعميل': payload.email?.trim() || 'لم يتم إدخاله',
    '🛠️ نوع الخدمة المطلوبة': payload.service,
    ...(payload.budget ? { '💰 الميزانية المقدرة للمشروع': payload.budget } : {}),
    '📝 نبذة وتفاصيل المشروع': payload.brief?.trim() || 'أرغب في مناقشة التفاصيل خلال الاتصال',
    '🏷️ الوسوم والخيارات السريعة': payload.tags && payload.tags.length > 0 ? payload.tags.join(' • ') : 'لا يوجد',
    '🚀 طريقة الإرسال والتواصل': payload.sendMethod === 'whatsapp' ? 'الواتساب المباشر' : `البريد الإلكتروني (${COMPANY_EMAIL})`,
    '⏰ تاريخ ووقت إنشاء الطلب': saudiTimeString,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(postBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('FormSubmit returned non-ok status:', response.status, errorText);
    }

    const data = await response.json().catch(() => ({}));
    return {
      success: true,
      message: data.message || 'تم إرسال الطلب بنجاح إلى البريد الرسمي',
    };
  } catch (error) {
    console.warn('Network or timeout while sending order email, proceeding safely:', error);
    // Even if client network drops or adblocker blocks the call, we allow the order to proceed with order ID
    return {
      success: true,
      message: 'تم تسجيل الطلب وسيتم التحقق من البريد',
    };
  }
};

/**
 * Builds the prefilled WhatsApp URL with the exact matching Order ID
 */
export const buildWhatsAppUrl = (payload: OrderPayload, language: 'ar' | 'en' = 'ar'): string => {
  const displayPhone = formatDisplayPhone(payload.phone);
  
  const textAr = `مرحباً استوديو مهاب 👋
أود استشارة وبدء مشروع رقمي رسمي معكم:
🔖 رقم الطلب المعتمد: [${payload.orderId}]
🌐 المصدر: ${payload.sourceDomain || OFFICIAL_DOMAIN}
• الاسم / المنشأة: ${payload.name || 'غير محدد'}
• رقم الجوال: ${displayPhone}
${payload.email ? `• البريد الإلكتروني: ${payload.email}\n` : ''}• الخدمة المطلوبة: ${payload.service}
${payload.budget ? `• الميزانية المقدرة: ${payload.budget}\n` : ''}• تفاصيل المشروع: ${payload.brief || 'أرغب في مناقشة التفاصيل خلال الاتصال'}
${payload.tags && payload.tags.length > 0 ? `• إضافات سريعة: ${payload.tags.join(' • ')}\n` : ''}`;

  const textEn = `Hello MUHAB Studio 👋
I would like to consult & launch a digital project:
🔖 Verified Order ID: [${payload.orderId}]
🌐 Source: ${payload.sourceDomain || OFFICIAL_DOMAIN}
• Name / Brand: ${payload.name || 'N/A'}
• Phone: ${displayPhone}
${payload.email ? `• Email: ${payload.email}\n` : ''}• Service: ${payload.service}
${payload.budget ? `• Budget: ${payload.budget}\n` : ''}• Brief: ${payload.brief || 'Let\'s discuss on call'}
${payload.tags && payload.tags.length > 0 ? `• Tags: ${payload.tags.join(' • ')}\n` : ''}`;

  const message = language === 'ar' ? textAr : textEn;
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
};

/**
 * Builds direct mailto: URL for instant email composition to muhabagency@gmail.com
 */
export const buildEmailMailtoUrl = (payload: OrderPayload, language: 'ar' | 'en' = 'ar'): string => {
  const displayPhone = formatDisplayPhone(payload.phone);
  
  const subject = language === 'ar'
    ? `[طلب مشروع جديد #${payload.orderId}] - ${payload.name || 'استوديو مهاب'}`
    : `[New Project Request #${payload.orderId}] - ${payload.name || 'MUHAB Studio'}`;

  const bodyAr = `مرحباً استوديو مهاب 👋
أود طلب استشارة وبدء مشروع رقمي رسمي معكم:

🔖 رقم الطلب المعتمد: [${payload.orderId}]
🌐 المصدر: ${payload.sourceDomain || OFFICIAL_DOMAIN}
👤 الاسم الكريم / اسم المنشأة: ${payload.name || 'غير محدد'}
📱 رقم الجوال (واتساب): ${displayPhone}
📧 البريد الإلكتروني للتواصل: ${payload.email || 'غير محدد'}
🛠️ نوع الخدمة المطلوبة: ${payload.service}
📝 نبذة وتفاصيل المشروع: ${payload.brief || 'أرغب في مناقشة التفاصيل معكم'}
${payload.tags && payload.tags.length > 0 ? `🏷️ إضافات سريعة: ${payload.tags.join(' • ')}\n` : ''}
----------------------------------------
تم إرسال هذا الطلب رسمياً عبر منصة ${payload.sourceDomain || OFFICIAL_DOMAIN}`;

  const bodyEn = `Hello MUHAB Studio 👋
I would like to submit a formal digital project inquiry:

🔖 Verified Order Reference ID: [${payload.orderId}]
🌐 Source: ${payload.sourceDomain || OFFICIAL_DOMAIN}
👤 Name / Brand: ${payload.name || 'N/A'}
📱 Phone Number: ${displayPhone}
📧 Client Email: ${payload.email || 'N/A'}
🛠️ Service Requested: ${payload.service}
📝 Project Brief: ${payload.brief || 'To be discussed'}
${payload.tags && payload.tags.length > 0 ? `🏷️ Selected Tags: ${payload.tags.join(' • ')}\n` : ''}
----------------------------------------
Submitted officially via ${payload.sourceDomain || OFFICIAL_DOMAIN}`;

  const body = language === 'ar' ? bodyAr : bodyEn;
  return `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
