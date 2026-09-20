import React from 'react';
import {
  Compass,
  Building2,
  ShieldCheck,
  MessageSquare,
  Scale,
  Smartphone,
  Check,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { WHY_CHOOSE_US } from '../data/mockData';

interface WhyChooseUsProps {
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const t = translations[lang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#D4AF37]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#D4AF37]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-[#D4AF37]" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-[#D4AF37]" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#050505] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-start space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17140B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
            <Check className="w-3.5 h-3.5" />
            <span>{t.whySubtitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-cairo">
            {t.whyTitle}
          </h2>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#0D0D0D] border border-[#262626] hover:border-[#D4AF37]/50 p-6 sm:p-8 space-y-4 text-start transition-all duration-300 hover:-translate-y-1 shadow-xl group"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-[#17140B] border border-[#332A10] flex items-center justify-center group-hover:scale-110 transition-transform">
                {getIcon(item.iconName)}
              </div>

              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#F3E5AB] transition-colors">
                  {lang === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <span className="text-xs font-semibold text-[#D4AF37] block font-outfit">
                  {lang === 'ar' ? item.titleEn : item.titleAr}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                {lang === 'ar' ? item.descAr : item.descEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
