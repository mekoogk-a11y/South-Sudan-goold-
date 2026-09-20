import React from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MessageCircle, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate, onOpenAdmin }) => {
  const t = translations[lang];

  return (
    <footer className="bg-[#050505] border-t border-[#1F1F1F] text-start text-[#A3A3A3] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Logo lang={lang} />
            <div className="text-xs sm:text-sm font-semibold text-[#D4AF37] font-outfit uppercase tracking-wider">
              Gold Buying & Brokerage • Juba, South Sudan
            </div>
            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed max-w-sm">
              {t.footerDesc}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E5E5E5] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'ar' ? 'العاصمة جوبا، جمهورية جنوب السودان' : 'Juba Capital, Republic of South Sudan'}</span>
            </div>
            <div className="pt-1">
              <a
                href="https://wa.me/249919980435"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-400/30" />
                <span>{lang === 'ar' ? 'واتساب الوسيط: 00249919980435' : 'Broker WhatsApp: 00249919980435'}</span>
              </a>
            </div>
          </div>

          {/* Fast Links */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              {lang === 'ar' ? 'أقسام المنصة' : 'Navigation'}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('hero')}
                className="text-start text-[#A3A3A3] hover:text-[#D4AF37] transition-colors py-1"
              >
                {t.navHome}
              </button>
              <button
                onClick={() => onNavigate('showcase')}
                className="text-start text-[#A3A3A3] hover:text-[#D4AF37] transition-colors py-1"
              >
                {t.navGold}
              </button>
              <button
                onClick={() => onNavigate('prices')}
                className="text-start text-[#A3A3A3] hover:text-[#D4AF37] transition-colors py-1"
              >
                {t.navPrices}
              </button>
              <button
                onClick={() => onNavigate('regions')}
                className="text-start text-[#A3A3A3] hover:text-[#D4AF37] transition-colors py-1"
              >
                {t.navRegions}
              </button>
              <button
                onClick={() => onNavigate('brokerage')}
                className="text-start text-[#A3A3A3] hover:text-[#D4AF37] transition-colors py-1"
              >
                {t.navBrokerage}
              </button>
              <button
                onClick={() => onNavigate('we-buy')}
                className="text-start text-[#A3A3A3] hover:text-[#D4AF37] transition-colors py-1"
              >
                {t.navBuyGold}
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-start text-[#A3A3A3] hover:text-[#D4AF37] transition-colors py-1"
              >
                {t.navAbout}
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-start text-[#A3A3A3] hover:text-[#D4AF37] transition-colors py-1"
              >
                {t.navContact}
              </button>
            </div>
          </div>

          {/* Quick Legal / Portal Column */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              {lang === 'ar' ? 'النزاهة والتنظيم' : 'Compliance & Governance'}
            </div>
            <p className="text-xs text-[#737373] leading-relaxed">
              {lang === 'ar'
                ? 'نعمل وفق ضوابط الامتثال والتحقق المخبري المسبق لضمان سلامة التعاملات المالية والتجارية.'
                : 'Operating in accordance with pre-settlement laboratory assay standards and KYC protocol requirements.'}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-[#D4AF37] py-1 px-2.5 rounded border border-[#262626] hover:border-[#D4AF37]/50 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.adminPortal}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Rights & Mandatory Designer Attribution Section */}
        <div className="pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          {/* Copyright text */}
          <div className="text-[#737373]">
            <span>© {new Date().getFullYear()} South Sudan Gold Exchange & Brokerage. </span>
            <span className="text-white font-medium">{t.footerCopyright}</span>
          </div>

          {/* Designer Credit (Exact mandate: Designed by Kamal Jaafar Zakaria / تم تصميم الموقع بواسطة كمال جعفر زكريا + Clickable WhatsApp: 00249919980435) */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-3 rounded-xl bg-[#0D0D0D] border border-[#262626] text-center">
            <span className="text-[#E5E5E5] font-semibold">
              {lang === 'ar' ? 'تم تصميم الموقع بواسطة كمال جعفر زكريا' : 'Designed by Kamal Jaafar Zakaria'}
            </span>
            <span className="text-[#404040] hidden sm:inline">•</span>
            <a
              href="https://wa.me/249919980435"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#D4AF37] hover:text-[#FFF2A3] font-bold font-outfit transition-colors underline decoration-[#D4AF37]/50 underline-offset-2"
              title="Contact Designer via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: 00249919980435</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
