import React, { useState } from 'react';
import { MapPin, Info, ArrowUpRight, Sparkles, X } from 'lucide-react';
import { GoldRegion, Language } from '../types';
import { translations } from '../data/translations';

interface SouthSudanMapProps {
  lang: Language;
  regions: GoldRegion[];
  onSelectRegionForInquiry: (regionName: string) => void;
}

export const SouthSudanMap: React.FC<SouthSudanMapProps> = ({
  lang,
  regions,
  onSelectRegionForInquiry,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<GoldRegion | null>(regions[0]);
  const t = translations[lang];

  return (
    <div className="rounded-2xl bg-[#0A0A0A] border border-[#262626] p-6 lg:p-8 relative overflow-hidden shadow-2xl">
      {/* Background Accent */}
      <div className="absolute top-0 end-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1F1F1F]">
        <div className="text-start">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.mapTitle}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 font-cairo">
            {t.mapSubtitle}
          </h3>
          <p className="text-xs sm:text-sm text-[#737373] mt-0.5">
            {t.mapHint}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-[#E5E5E5]">
            <span className="w-3 h-3 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]"></span>
            <span>{lang === 'ar' ? 'مؤشرات ذهب معروفة' : 'Documented Gold Indicator'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#E5E5E5]">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]"></span>
            <span>{lang === 'ar' ? 'المقر الإداري (جوبا)' : 'Corporate HQ (Juba)'}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Interactive SVG Map Vector of South Sudan */}
        <div className="lg:col-span-8 relative flex items-center justify-center p-2 min-h-[380px] sm:min-h-[460px] bg-[#050505] rounded-xl border border-[#1A1A1A]">
          
          <svg
            viewBox="0 0 800 500"
            className="w-full h-full max-h-[480px] drop-shadow-[0_0_25px_rgba(0,0,0,0.8)] select-none"
          >
            <defs>
              <linearGradient id="mapFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#171717" />
                <stop offset="50%" stopColor="#121212" />
                <stop offset="100%" stopColor="#0B0B0B" />
              </linearGradient>
              <linearGradient id="riverGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
              </linearGradient>
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Geographical Silhouette of South Sudan */}
            <path
              d="M 120 180 
                 L 220 140 
                 L 320 120 
                 L 410 70 
                 L 530 80 
                 L 640 140 
                 L 720 220 
                 L 740 310 
                 L 690 380 
                 L 610 430 
                 L 480 470 
                 L 380 430 
                 L 260 410 
                 L 140 340 
                 L 90 280 
                 Z"
              fill="url(#mapFill)"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeOpacity="0.4"
              className="transition-all duration-300 hover:stroke-opacity-70"
            />

            {/* State Internal Stylized Boundary Lines */}
            <path
              d="M 320 120 Q 340 260 380 430"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
            />
            <path
              d="M 530 80 Q 510 240 480 470"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
            />
            <path
              d="M 220 280 L 690 380"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
            />

            {/* White Nile River Vector (flows from Nimule -> Juba -> Bor -> Sudd -> Malakal) */}
            <path
              d="M 520 460 Q 496 390 490 340 T 480 230 T 560 140 T 570 85"
              stroke="url(#riverGrad)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <text x="500" y="320" fill="#3B82F6" fontSize="10" opacity="0.6" fontStyle="italic">
              White Nile River
            </text>

            {/* Corporate Headquarters: Juba Capital Marker */}
            <g
              transform="translate(496, 390)"
              className="cursor-pointer group"
              onClick={() => {
                // Juba focal point
              }}
            >
              <circle r="12" fill="#10B981" fillOpacity="0.25" className="animate-ping" />
              <circle r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
              <text
                x="12"
                y="4"
                fill="#FFFFFF"
                fontSize="12"
                fontWeight="bold"
                className="pointer-events-none drop-shadow-md"
              >
                {lang === 'ar' ? '★ جوبا (المقر الرئيسي)' : '★ Juba (HQ)'}
              </text>
            </g>

            {/* Interactive Gold Region Hotspots */}
            {regions.map((region) => {
              // Convert coordinate percentages to 800x500 svg viewBox
              const cx = (region.mapCoordinates.x / 100) * 700 + 50;
              const cy = (region.mapCoordinates.y / 100) * 440 + 40;
              const isSelected = selectedRegion?.id === region.id;

              return (
                <g
                  key={region.id}
                  transform={`translate(${cx}, ${cy})`}
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => setSelectedRegion(region)}
                >
                  {/* Outer Pulsing Glow on Selected */}
                  {isSelected && (
                    <circle r="18" fill="#D4AF37" fillOpacity="0.3" className="animate-pulse" />
                  )}
                  
                  {/* Pin Dot */}
                  <circle
                    r={isSelected ? 8 : 6}
                    fill={isSelected ? '#FFF2A3' : '#D4AF37'}
                    stroke="#050505"
                    strokeWidth="2"
                    filter="url(#goldGlow)"
                  />

                  {/* Region Label Tag */}
                  <rect
                    x="-40"
                    y="12"
                    width="80"
                    height="18"
                    rx="4"
                    fill="#0A0A0A"
                    fillOpacity="0.85"
                    stroke={isSelected ? '#D4AF37' : '#333333'}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="24"
                    fill={isSelected ? '#F3E5AB' : '#D1D5DB'}
                    fontSize="9.5"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="select-none"
                  >
                    {lang === 'ar' ? region.nameAr : region.nameEn}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick instructions in corner */}
          <div className="absolute bottom-3 start-3 px-2.5 py-1 rounded bg-[#0A0A0A]/80 backdrop-blur border border-[#262626] text-[11px] text-[#A3A3A3]">
            {lang === 'ar' ? 'انقر على أي موقع للاطلاع على تفاصيل النشاط' : 'Click any marker to view mining field profile'}
          </div>
        </div>

        {/* Selected Region Detailed Card */}
        <div className="lg:col-span-4 text-start">
          {selectedRegion ? (
            <div className="rounded-xl bg-[#121212] border border-[#332A10] p-6 space-y-4 relative shadow-xl">
              {/* Region Image */}
              <div className="relative h-40 w-full rounded-lg overflow-hidden bg-black border border-[#262626]">
                <img
                  src={selectedRegion.imageUrl}
                  alt={selectedRegion.nameEn}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 start-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur border border-[#D4AF37]/40 text-[10px] text-[#F3E5AB]">
                  {t.illustrativeNotice}
                </div>
                <div className="absolute bottom-2 start-2 px-2.5 py-1 rounded-md bg-[#050505]/90 text-xs font-bold text-white">
                  {lang === 'ar' ? selectedRegion.nameAr : selectedRegion.nameEn}
                </div>
              </div>

              {/* State */}
              <div>
                <div className="text-xs text-[#737373] uppercase font-semibold">
                  {t.stateLabel}
                </div>
                <div className="text-base font-bold text-[#D4AF37]">
                  {lang === 'ar' ? selectedRegion.stateAr : selectedRegion.stateEn}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                {lang === 'ar' ? selectedRegion.descriptionAr : selectedRegion.descriptionEn}
              </p>

              {/* Activity */}
              <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#212121] space-y-1">
                <span className="text-[11px] text-[#A3A3A3] font-semibold block">
                  {t.activityLabel}
                </span>
                <span className="text-xs text-[#F3F4F6]">
                  {lang === 'ar' ? selectedRegion.miningActivityAr : selectedRegion.miningActivityEn}
                </span>
              </div>

              {/* Geological Indicators */}
              <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#212121] space-y-1">
                <span className="text-[11px] text-[#A3A3A3] font-semibold block">
                  {t.indicatorsLabel}
                </span>
                <span className="text-xs text-[#F3F4F6]">
                  {lang === 'ar' ? selectedRegion.indicatorsAr : selectedRegion.indicatorsEn}
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectRegionForInquiry(lang === 'ar' ? selectedRegion.nameAr : selectedRegion.nameEn)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#1F1C12] border border-[#D4AF37]/60 hover:bg-[#D4AF37] hover:text-black text-xs font-bold text-[#F3E5AB] transition-all"
              >
                <span>{lang === 'ar' ? `تقديم عرض لذهب ${selectedRegion.nameAr}` : `Submit Inquiry for ${selectedRegion.nameEn}`}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-8 text-center text-[#737373] border border-dashed border-[#262626] rounded-xl">
              <Info className="w-8 h-8 mx-auto text-[#D4AF37]/50 mb-2" />
              <span>{t.mapHint}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
