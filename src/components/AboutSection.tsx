import React from 'react';
import { Building2, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="about" className="py-16 md:py-24 bg-[#080808] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase: Headquarters Juba & Trading desk */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl border border-[#262626] bg-[#0F0F0F] p-2 overflow-hidden shadow-2xl relative">
              <div className="h-80 sm:h-96 w-full rounded-xl overflow-hidden bg-black relative">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
                  alt="Juba South Sudan Business & Administrative Headquarters"
                  className="w-full h-full object-cover brightness-90"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>

                {/* HQ Location Badge */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-[#0A0A0A]/90 backdrop-blur-md border border-[#2A2A2A] text-start">
                  <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Juba, South Sudan</span>
                  </div>
                  <div className="text-white font-bold text-sm mt-0.5">
                    {lang === 'ar' ? 'المقر الإداري والتجاري للشركة' : 'Commercial Desk & Administrative Headquarters'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 text-start space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17140B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t.aboutSubtitle}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-cairo">
              {t.aboutTitle}
            </h2>

            <p className="text-base sm:text-lg text-[#D1D5DB] leading-relaxed">
              {t.aboutText}
            </p>

            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              {t.aboutCommitment}
            </p>

            {/* Credibility highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#212121] space-y-1">
                <span className="text-xs text-[#D4AF37] font-bold block">
                  {lang === 'ar' ? 'الموقع الجغرافي' : 'Strategic Location'}
                </span>
                <span className="text-sm text-white font-semibold">
                  {lang === 'ar' ? 'العاصمة جوبا - قرب المطارات والخدمات اللوجستية' : 'Juba - Proximity to International Logistics'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#212121] space-y-1">
                <span className="text-xs text-[#D4AF37] font-bold block">
                  {lang === 'ar' ? 'منهجية العمل' : 'Operating Framework'}
                </span>
                <span className="text-sm text-white font-semibold">
                  {lang === 'ar' ? 'وساطة موثوقة وفحص قبل التحويل المالي' : 'Escrow Verification & Pre-Settlement Assay'}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
