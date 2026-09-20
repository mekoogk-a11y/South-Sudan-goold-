import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { AdminSettings, Language } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  lang: Language;
  settings: AdminSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, settings }) => {
  const t = translations[lang];
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryMessage.trim()) return;
    setIsSent(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
      setIsSent(false);
    }, 4000);
  };

  // WhatsApp clean link
  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '').replace(/^0+/, '') || '249919980435';
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً، أود التواصل مع وسيط الذهب للاستفسار عن شراء ووساطة الذهب في جنوب السودان.'
      : 'Hello, I would like to contact the gold broker regarding buying and brokerage services in South Sudan.'
  )}`;

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#080808] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-start space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17140B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Juba • South Sudan</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-cairo">
            {t.contactTitle}
          </h2>

          <p className="text-base sm:text-lg text-[#A3A3A3]">
            {t.contactSubtitle}
          </p>
        </div>

        {/* 3 Clickable Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-start">
          
          {/* Card 1: WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-[#0D0D0D] border border-[#262626] hover:border-emerald-500/60 p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 shadow-xl group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-600/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                {lang === 'ar' ? 'تواصل مباشر مع الوسيط' : 'Direct Broker Contact'}
              </span>
              <h3 className="text-xl font-bold text-white">
                {lang === 'ar' ? 'واتساب الوسيط' : 'Broker WhatsApp'}
              </h3>
              <p className="text-sm font-bold text-emerald-400 font-outfit tracking-wider">
                {settings.whatsapp}
              </p>
            </div>

            <div className="pt-2 text-xs font-bold text-emerald-400 flex items-center gap-1">
              <span>{lang === 'ar' ? 'فتح المحادثة الآن' : 'Start WhatsApp Chat'}</span>
              <span>→</span>
            </div>
          </a>

          {/* Card 2: Direct Call */}
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="rounded-2xl bg-[#0D0D0D] border border-[#262626] hover:border-[#D4AF37]/60 p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 shadow-xl group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#17140B] border border-[#332A10] flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                {lang === 'ar' ? 'مكتب جوبا التجاري' : 'Juba Commercial Desk'}
              </span>
              <h3 className="text-xl font-bold text-white">
                {t.btnCall}
              </h3>
              <p className="text-xs text-[#A3A3A3] font-outfit">
                {settings.phone}
              </p>
            </div>

            <div className="pt-2 text-xs font-bold text-[#D4AF37] flex items-center gap-1">
              <span>{lang === 'ar' ? 'الاتصال المباشر' : 'Place Call'}</span>
              <span>→</span>
            </div>
          </a>

          {/* Card 3: Email */}
          <a
            href={`mailto:${settings.email}`}
            className="rounded-2xl bg-[#0D0D0D] border border-[#262626] hover:border-blue-500/60 p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 shadow-xl group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-950/40 border border-blue-600/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                {lang === 'ar' ? 'المراسلات الرسمية' : 'Formal Correspondence'}
              </span>
              <h3 className="text-xl font-bold text-white">
                {t.btnEmail}
              </h3>
              <p className="text-xs text-[#A3A3A3] font-outfit truncate">
                {settings.email}
              </p>
            </div>

            <div className="pt-2 text-xs font-bold text-blue-400 flex items-center gap-1">
              <span>{lang === 'ar' ? 'إرسال بريد رسمي' : 'Send Official Mail'}</span>
              <span>→</span>
            </div>
          </a>

        </div>

        {/* Corporate Address & Quick Message */}
        <div className="rounded-2xl bg-[#0D0D0D] border border-[#262626] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-start">
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-lg font-bold text-white">
              {lang === 'ar' ? 'المقر الرئيسي والمواعيد' : 'Headquarters & Hours'}
            </h4>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              {lang === 'ar' ? settings.locationAr : settings.locationEn}
            </p>
            <div className="pt-2 text-xs text-[#737373] space-y-1">
              <div>{lang === 'ar' ? 'ساعات العمل: الإثنين – الجمعة: 8:30 ص – 5:00 م' : 'Working Hours: Monday – Friday: 8:30 AM – 5:00 PM'}</div>
              <div>{lang === 'ar' ? 'التوقيت المحلي: جوبا (GMT+2)' : 'Local Time: Juba (GMT+2)'}</div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSend} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder={lang === 'ar' ? 'الاسم' : 'Your Name'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#2B2B2B] text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  placeholder={lang === 'ar' ? 'البريد الإلكتروني أو الهاتف' : 'Email or Phone'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#2B2B2B] text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <textarea
                rows={3}
                required
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                placeholder={lang === 'ar' ? 'رسالتك أو استفسارك التجاري...' : 'Your inquiry or commercial request...'}
                className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#2B2B2B] text-white text-xs focus:border-[#D4AF37] focus:outline-none resize-none"
              ></textarea>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="flex items-center gap-2 py-2.5 px-6 rounded-lg bg-[#D4AF37] text-black font-bold text-xs hover:brightness-105 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                </button>

                {isSent && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'تم الإرسال بنجاح' : 'Message dispatched'}</span>
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
