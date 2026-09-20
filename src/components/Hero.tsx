import React from 'react';
import { ArrowRight, ArrowLeft, ShieldCheck, Scale, Compass, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
  onOpenPrices?: () => void;
  onOpenSell?: () => void;
  onOpenBrokerage?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onNavigate,
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section id="hero" className="relative overflow-hidden bg-[#050505] pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-[#1A1A1A]">
      {/* Background Luxury Lighting & Dark Gold Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep ambient gold glow in center-top */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-gradient-to-b from-[#D4AF37]/15 to-transparent blur-[120px] rounded-full"></div>
        {/* Subtle geometric grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        {/* Dark vignette corners */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050505]/60 to-[#050505]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 text-start space-y-7">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14120B] border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              <Sparkles className="w-4 h-4 text-[#E5C158] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-[#F3E5AB] tracking-wide">
                {t.heroBadge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.2] tracking-tight font-cairo">
              {t.heroTitle}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-[#A3A3A3] leading-relaxed max-w-2xl">
              {t.heroDesc}
            </p>

            {/* Action Buttons: 3 required buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Button 1: View Gold / عرض الذهب */}
              <button
                onClick={() => onNavigate('showcase')}
                className="px-6 py-3.5 rounded-lg bg-[#171717] border border-[#333333] hover:border-[#D4AF37] text-white hover:text-[#D4AF37] font-semibold text-sm transition-all shadow-md hover:bg-[#202020] active:scale-[0.98]"
              >
                {t.heroBtnExplore}
              </button>

              {/* Button 2: Contact Us / تواصل معنا */}
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 rounded-lg bg-transparent border border-[#3A3A3A] hover:border-[#D4AF37]/80 text-[#E5E5E5] hover:text-white font-semibold text-sm transition-all hover:bg-[#141414] active:scale-[0.98]"
              >
                {t.heroBtnContact}
              </button>

              {/* Button 3: Sell Gold Request / طلب بيع الذهب (Prominent) */}
              <button
                onClick={() => onNavigate('sell-form')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-black font-extrabold text-sm tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all hover:brightness-105 active:scale-[0.98]"
              >
                <span>{t.heroBtnSell}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Institutional Stat Metrics */}
            <div className="pt-6 border-t border-[#1F1F1F] grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="block text-xs text-[#737373] uppercase tracking-wider">
                  {t.heroStat1Label}
                </span>
                <div className="flex items-center gap-1.5 text-white font-bold text-sm sm:text-base">
                  <Compass className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{t.heroStat1Val}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="block text-xs text-[#737373] uppercase tracking-wider">
                  {t.heroStat2Label}
                </span>
                <div className="flex items-center gap-1.5 text-white font-bold text-sm sm:text-base">
                  <Scale className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{t.heroStat2Val}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="block text-xs text-[#737373] uppercase tracking-wider">
                  {t.heroStat3Label}
                </span>
                <div className="flex items-center gap-1.5 text-white font-bold text-sm sm:text-base">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{t.heroStat3Val}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Visual Showcase Column: High-end Gold Ingot & Raw Gold Composition */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Gold Halo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 via-transparent to-[#F3E5AB]/10 blur-2xl rounded-2xl"></div>

            <div className="relative rounded-2xl border border-[#262626] bg-gradient-to-b from-[#141414] to-[#0A0A0A] p-2 shadow-2xl overflow-hidden group">
              {/* Gold Imagery */}
              <div className="relative h-[340px] sm:h-[400px] w-full rounded-xl overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=85"
                  alt="Gold bars and raw gold trade in South Sudan"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-105"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent"></div>

                {/* Floating Floating Ingot Badge */}
                <div className="absolute top-4 start-4 px-3 py-1.5 rounded-lg bg-[#050505]/85 backdrop-blur-md border border-[#D4AF37]/40 text-xs font-semibold text-[#F3E5AB] flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
                  <span>999.9 Fine Gold Standard</span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-[#0A0A0A]/90 backdrop-blur-md border border-[#2A2A2A] text-start space-y-1">
                  <div className="flex items-center justify-between text-xs text-[#A3A3A3]">
                    <span>{lang === 'ar' ? 'مركز تداول الذهب الفوري' : 'Precious Metals Trading Hub'}</span>
                    <span className="text-[#D4AF37] font-bold">Juba, South Sudan</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {lang === 'ar' ? 'سوق الذهب الحرفي والمكرر - جمهورية جنوب السودان' : 'Artisanal & Refined Bullion Gateway'}
                  </div>
                  <p className="text-xs text-[#808080] line-clamp-1">
                    {lang === 'ar' ? 'فحص مخبري • شفافية سعرية • تسوية تجارية آمنة' : 'Assay protocols • Transparent benchmarking • Escrow settlement'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
