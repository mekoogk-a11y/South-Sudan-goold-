import React from 'react';
import { Layers, ShieldCheck, Scale, FileText, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import rawGoldKapoetaImg from '../assets/images/raw_gold_kapoeta_1789539611191.jpg';

interface GoldShowcaseProps {
  lang: Language;
  onSelectFormForOffer: (formType: string) => void;
}

export const GoldShowcase: React.FC<GoldShowcaseProps> = ({ lang, onSelectFormForOffer }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const lots = [
    {
      id: 'raw-alluvial',
      title: t.lotRawTitle,
      subtitle: lang === 'ar' ? 'إنتاج تعدين حرفي تقليدي' : 'Artisanal Riverbed Placer Production',
      desc: t.lotRawDesc,
      purity: '88% - 93% (21K - 22.5K)',
      typicalLots: '100g – 2,000g',
      assayStatus: lang === 'ar' ? 'فحص الكثافة النوعية والوزن الهيدروستاتيكي' : 'Hydrostatic & Specific Gravity Checked',
      image: rawGoldKapoetaImg,
    },
    {
      id: 'dore-bars',
      title: t.lotDoreTitle,
      subtitle: lang === 'ar' ? 'سبائك مصهورة غير مكررة' : 'Semi-Refined Cooperative Smelts',
      desc: t.lotDoreDesc,
      purity: '90% - 95% (21.5K - 22.8K)',
      typicalLots: '1.0kg – 5.0kg Bars',
      assayStatus: lang === 'ar' ? 'تحليل مخبري أولي معتمد في جوبا' : 'Initial Commercial Assay in Juba',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'refined-bullion',
      title: t.lotRefinedTitle,
      subtitle: lang === 'ar' ? 'سبائك استثمارية دولية معتمدة' : 'Hallmarked Investment Grade Bullion',
      desc: t.lotRefinedDesc,
      purity: '99.99% (24K Pure)',
      typicalLots: '100g, 500g, 1,000g (1kg)',
      assayStatus: lang === 'ar' ? 'شهادة نقاء رسمية مختومة 999.9' : 'Full Laboratory Certification (999.9)',
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="showcase" className="py-16 md:py-24 bg-[#080808] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-start space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17140B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.showcaseSubtitle}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-cairo">
            {t.showcaseTitle}
          </h2>

          <p className="text-sm sm:text-base text-[#A3A3A3]">
            {lang === 'ar'
              ? 'نعرض أصناف الذهب المتداولة والمطلوبة في سوق جنوب السودان مع الالتزام الصارم بالشفافية والمطابقة المخبرية قبل أي إتمام للصفقات.'
              : 'Standardized physical precious metal specifications handled across South Sudan trade channels, adhering to rigorous pre-settlement verification.'}
          </p>
        </div>

        {/* 3 Physical Forms Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {lots.map((lot) => (
            <div
              key={lot.id}
              className="rounded-2xl bg-[#0D0D0D] border border-[#262626] hover:border-[#D4AF37]/50 p-6 flex flex-col justify-between space-y-6 transition-all shadow-xl text-start group"
            >
              <div className="space-y-4">
                {/* Visual Thumbnail */}
                <div className="relative h-44 w-full rounded-xl overflow-hidden bg-black border border-[#212121]">
                  <img
                    src={lot.image}
                    alt={lot.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 start-2 px-2 py-0.5 rounded bg-black/80 border border-[#D4AF37]/30 text-[10px] text-[#F3E5AB]">
                    {t.illustrativeNotice}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                    {lot.subtitle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                    {lot.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                  {lot.desc}
                </p>

                {/* Specs Pill List */}
                <div className="space-y-2 pt-2 border-t border-[#1C1C1C]">
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="text-[#737373]">{lang === 'ar' ? 'مستوى النقاء:' : 'Purity Grade:'}</span>
                    <span className="font-bold text-[#F3E5AB] font-outfit">{lot.purity}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="text-[#737373]">{lang === 'ar' ? 'أحجام الدفعات المتداولة:' : 'Trade Lot Range:'}</span>
                    <span className="font-bold text-white font-outfit">{lot.typicalLots}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs py-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{lot.assayStatus}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectFormForOffer(lot.title)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#141414] hover:bg-[#D4AF37] text-xs font-bold text-white hover:text-black transition-all border border-[#2E2E2E] hover:border-[#D4AF37]"
              >
                <span>{lang === 'ar' ? 'طلب وساطة أو بيع هذا الصنف' : 'Inquire on This Lot'}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
