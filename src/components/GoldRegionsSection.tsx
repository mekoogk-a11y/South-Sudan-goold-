import React, { useState } from 'react';
import { Sparkles, MapPin, Compass, ShieldAlert, ArrowRight, ArrowLeft } from 'lucide-react';
import { GoldRegion, Language } from '../types';
import { translations } from '../data/translations';
import { SouthSudanMap } from './SouthSudanMap';

interface GoldRegionsSectionProps {
  lang: Language;
  regions: GoldRegion[];
  onSelectRegionForInquiry: (regionName: string) => void;
}

export const GoldRegionsSection: React.FC<GoldRegionsSectionProps> = ({
  lang,
  regions,
  onSelectRegionForInquiry,
}) => {
  const [filterState, setFilterState] = useState<string>('all');
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const states = Array.from(new Set(regions.map((r) => (lang === 'ar' ? r.stateAr : r.stateEn))));

  const filteredRegions =
    filterState === 'all'
      ? regions
      : regions.filter((r) => (lang === 'ar' ? r.stateAr : r.stateEn) === filterState);

  return (
    <section id="regions" className="py-16 md:py-24 bg-[#050505] border-b border-[#1A1A1A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 text-start max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17140B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.regionsSubtitle}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-cairo">
            {t.regionsSectionTitle}
          </h2>

          <p className="text-base sm:text-lg text-[#A3A3A3] leading-relaxed">
            {t.regionsDesc}
          </p>

          {/* Factual Mandated Integrity Note */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#120F08] border border-[#423512] text-xs text-[#E5C158]">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{t.regionsNotice}</span>
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <SouthSudanMap
          lang={lang}
          regions={regions}
          onSelectRegionForInquiry={onSelectRegionForInquiry}
        />

        {/* Region Cards Grid */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-cairo text-start">
              {lang === 'ar' ? 'المناطق الجغرافية ومراكز التمعدن' : 'Field Profiles & Documented Mining Corridors'}
            </h3>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFilterState('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  filterState === 'all'
                    ? 'bg-[#D4AF37] text-black'
                    : 'bg-[#141414] text-[#A3A3A3] hover:text-white border border-[#262626]'
                }`}
              >
                {t.allRegions}
              </button>
              {states.slice(0, 4).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterState(st)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    filterState === st
                      ? 'bg-[#D4AF37] text-black'
                      : 'bg-[#141414] text-[#A3A3A3] hover:text-white border border-[#262626]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRegions.map((region) => (
              <div
                key={region.id}
                className="group rounded-2xl bg-[#0D0D0D] border border-[#262626] hover:border-[#D4AF37]/60 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg text-start"
              >
                {/* Image Header with Label & Illustrative Notice */}
                <div className="relative h-48 w-full overflow-hidden bg-black">
                  <img
                    src={region.imageUrl}
                    alt={region.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/30"></div>

                  {/* Illustrative Notice Badge */}
                  {region.isIllustrative && (
                    <div className="absolute top-3 start-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-[#D4AF37]/30 text-[10px] font-medium text-[#F3E5AB]">
                      {t.illustrativeNotice}
                    </div>
                  )}

                  {/* Region Name on Card Banner */}
                  <div className="absolute bottom-3 start-4">
                    <span className="text-xl font-bold text-white tracking-wide">
                      {lang === 'ar' ? region.nameAr : region.nameEn}
                    </span>
                    <span className="block text-xs font-medium text-[#D4AF37]">
                      {lang === 'ar' ? region.stateAr : region.stateEn}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                      {lang === 'ar' ? region.descriptionAr : region.descriptionEn}
                    </p>

                    {/* Mining Activity */}
                    <div className="p-3 rounded-lg bg-[#080808] border border-[#1C1C1C] space-y-1">
                      <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wide">
                        {t.activityLabel}
                      </div>
                      <div className="text-xs text-[#E5E5E5]">
                        {lang === 'ar' ? region.miningActivityAr : region.miningActivityEn}
                      </div>
                    </div>

                    {/* Geological Indicators */}
                    <div className="p-3 rounded-lg bg-[#080808] border border-[#1C1C1C] space-y-1">
                      <div className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wide">
                        {t.indicatorsLabel}
                      </div>
                      <div className="text-xs text-[#D1D5DB]">
                        {lang === 'ar' ? region.indicatorsAr : region.indicatorsEn}
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-3 border-t border-[#1C1C1C]">
                    <button
                      onClick={() => onSelectRegionForInquiry(lang === 'ar' ? region.nameAr : region.nameEn)}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#141414] hover:bg-[#D4AF37] text-xs font-bold text-white hover:text-black transition-colors group-hover:border-[#D4AF37]"
                    >
                      <span>{lang === 'ar' ? `طلب شراء أو بيع من ${region.nameAr}` : `Inquire on ${region.nameEn}`}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
