import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MessageSquare } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  isModalOpen?: boolean;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '966565114955',
  isModalOpen = false,
}) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  if (isModalOpen) return null;

  const handleClick = () => {
    const defaultMsg = isAr
      ? 'السلام عليكم، استوديو مهاب. أود الاستفسار عن تفاصيل وخطوات بدء مشروعي التقني الجديد.'
      : 'Hello Muhab Studio, I would like to inquire about initiating a new custom web project.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMsg)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-6 end-6 z-40 w-12 h-12 rounded-full bg-[#111214] hover:bg-[#16181B] border border-white/[0.12] hover:border-[#A6FF2E]/40 text-[#F4F4F5] hover:text-[#A6FF2E] flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer focus:outline-none active:scale-95 group"
      aria-label={isAr ? 'محادثة مباشرة عبر واتساب' : 'Direct WhatsApp Chat'}
    >
      <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-105" />
      <span className="sr-only">{isAr ? 'تواصل عبر واتساب' : 'WhatsApp'}</span>
    </button>
  );
};
