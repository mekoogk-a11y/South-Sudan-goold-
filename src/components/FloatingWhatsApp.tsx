import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FloatingWhatsAppProps {
  lang: Language;
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang, whatsappNumber }) => {
  const t = translations[lang];
  const cleanNumber = whatsappNumber.replace(/\D/g, '').replace(/^0+/, '') || '249919980435';
  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً، أود التواصل مع وسيط الذهب للاستفسار عن الصفقات والخدمات في جوبا.'
      : 'Hello, I would like to contact the gold broker regarding transactions and services in Juba.'
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-[0_4px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_30px_rgba(16,185,129,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
        <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-white"></span>
      </div>
      <span className="font-cairo tracking-wide">
        {t.floatingWhatsapp}
      </span>
    </a>
  );
};
