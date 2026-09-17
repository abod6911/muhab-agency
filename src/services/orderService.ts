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
    _subject: `طلب مشروع رسمي [${payload.orderId}] - ${payload.name || 'استوديو مهاب'}`,
    _template: 'table',
    _captcha: 'false',
    ...(payload.email?.trim() ? { _replyto: payload.email.trim() } : {}),
    _autoresponse: `شكراً لتواصلكم مع استوديو مهاب للحلول الرقمية. تم توثيق وتسجيل طلبكم رسمياً بالرقم المرجعي: [${payload.orderId}]. سيقوم فريقنا الاستشاري والهندسي بمراجعة متطلباتكم والتواصل معكم خلال وقت وجيز.`,
    'الرقم المرجعي المعتمد (Order ID)': payload.orderId,
    'الجهة أو اسم العميل': payload.name || 'غير محدد',
    'رقم التواصل (هاتف / واتساب)': formatDisplayPhone(payload.phone),
    'البريد الإلكتروني للعميل': payload.email?.trim() || 'لم يتم إدخاله',
    'نوع الخدمة المطلوبة': payload.service,
    ...(payload.budget ? { 'الميزانية المقدرة': payload.budget } : {}),
    'نطاق وتفاصيل المشروع': payload.brief?.trim() || 'مناقشة التفاصيل ونطاق العمل خلال الاجتماع الاستشاري',
    'المواصفات والخيارات المختارة': payload.tags && payload.tags.length > 0 ? payload.tags.join(' | ') : 'مواصفات قياسية مخصصة',
    'قناة التواصل المعتمدة': payload.sendMethod === 'whatsapp' ? 'متابعة مباشرة عبر الواتساب' : `البريد الإلكتروني الرسمي (${COMPANY_EMAIL})`,
    'تاريخ وتوقيت الطلب (بتوقيت مكة المكرمة)': saudiTimeString,
    'منصة ومصدر الطلب': `${payload.sourceDomain || OFFICIAL_DOMAIN} (بوابة الطلبات الرسمية)`,
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
 * Builds the prefilled WhatsApp URL with the exact matching Order ID (zero emojis, executive tone)
 */
export const buildWhatsAppUrl = (payload: OrderPayload, language: 'ar' | 'en' = 'ar'): string => {
  const displayPhone = formatDisplayPhone(payload.phone);
  
  const textAr = `السلام عليكم ورحمة الله، استوديو مهاب للحلول الرقمية.
طلب استشارة وبدء مشروع رقمي رسمي:

- الرقم المرجعي للطلب: [${payload.orderId}]
- منصة المصدر: ${payload.sourceDomain || OFFICIAL_DOMAIN}
- الاسم / اسم المنشأة: ${payload.name || 'غير محدد'}
- رقم الاتصال: ${displayPhone}
${payload.email ? `- البريد الإلكتروني: ${payload.email}\n` : ''}- نوع الخدمة: ${payload.service}
- نطاق ومواصفات المشروع: ${payload.brief || 'مناقشة التفاصيل خلال الاتصال'}
${payload.tags && payload.tags.length > 0 ? `- الخيارات المختارة: ${payload.tags.join(' | ')}\n` : ''}`;

  const textEn = `Official Project Inquiry - MUHAB Studio
Reference Order ID: [${payload.orderId}]
Source: ${payload.sourceDomain || OFFICIAL_DOMAIN}

- Client / Entity: ${payload.name || 'N/A'}
- Contact Phone: ${displayPhone}
${payload.email ? `- Email: ${payload.email}\n` : ''}- Requested Service: ${payload.service}
- Project Scope: ${payload.brief || 'To be discussed during consultation'}
${payload.tags && payload.tags.length > 0 ? `- Selected Options: ${payload.tags.join(' | ')}\n` : ''}`;

  const message = language === 'ar' ? textAr : textEn;
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
};

/**
 * Builds direct mailto: URL for instant email composition to muhabagency@gmail.com (zero emojis, executive corporate standard)
 */
export const buildEmailMailtoUrl = (payload: OrderPayload, language: 'ar' | 'en' = 'ar'): string => {
  const displayPhone = formatDisplayPhone(payload.phone);
  
  const subject = language === 'ar'
    ? `طلب مشروع جديد [${payload.orderId}] - ${payload.name || 'استوديو مهاب'}`
    : `Official Project Inquiry [${payload.orderId}] - ${payload.name || 'MUHAB Studio'}`;

  const bodyAr = `السادة إدارة استوديو مهاب للحلول الرقمية المحترمين،
تحية طيبة وبعد،

أود رفع طلب استشارة وبدء مشروع رقمي وفق البيانات التالية:

الرقم المرجعي للطلب: [${payload.orderId}]
بوابة الطلبات: ${payload.sourceDomain || OFFICIAL_DOMAIN}

بيانات العميل والمشروع:
- الاسم / اسم المنشأة: ${payload.name || 'غير محدد'}
- رقم الاتصال: ${displayPhone}
- البريد الإلكتروني: ${payload.email || 'غير محدد'}
- الخدمة المطلوبة: ${payload.service}
- نطاق ومتطلبات العمل: ${payload.brief || 'مناقشة التفاصيل خلال الاجتماع'}
${payload.tags && payload.tags.length > 0 ? `- الخيارات المحددة: ${payload.tags.join(' | ')}\n` : ''}

وتفضلوا بقبول خالص الشكر والتقدير.`;

  const bodyEn = `To MUHAB Studio Management,

Please find the details of our official project inquiry below:

Reference Order ID: [${payload.orderId}]
Portal: ${payload.sourceDomain || OFFICIAL_DOMAIN}

Client & Project Specifications:
- Name / Entity: ${payload.name || 'N/A'}
- Contact Number: ${displayPhone}
- Email Address: ${payload.email || 'N/A'}
- Requested Service: ${payload.service}
- Project Scope: ${payload.brief || 'To be discussed during consultation'}
${payload.tags && payload.tags.length > 0 ? `- Selected Options: ${payload.tags.join(' | ')}\n` : ''}

Kind regards.`;

  const body = language === 'ar' ? bodyAr : bodyEn;
  return `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
