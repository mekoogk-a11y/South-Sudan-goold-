import React from 'react';
import { GitBranch, ShieldCheck, CheckCircle, ArrowRight, ArrowLeft, Building2, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { BROKERAGE_STEPS } from '../data/mockData';

interface BrokerageSectionProps {
  lang: Language;
  onInitiateInquiry: () => void;
}

export const BrokerageSection: React.FC<BrokerageSectionProps> = ({ lang, onInitiateInquiry }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section id="brokerage" className="py-16 md:py-24 bg-[#080808] border-b border-[#1A1A1A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-start space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17140B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
            <GitBranch className="w-3.5 h-3.5" />
            <span>{t.brokerageSubtitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-cairo">
            {t.brokerageTitle}
          </h2>

          <p className="text-base sm:text-lg text-[#A3A3A3] leading-relaxed">
            {t.brokerageDesc}
          </p>
        </div>

        {/* 6-Step Visual Timeline */}
        <div className="space-y-8">
          <div className="text-start">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-cairo">
              {t.brokerageTimelineTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#737373] mt-1">
              {lang === 'ar'
                ? 'مسار وساطة منظم يضمن الامتثال القانوني وحماية مصالح جميع الأطراف من البداية حتى استلام المستحقات.'
                : 'A structured institutional pathway ensuring legal compliance and escrow integrity from inception to settlement.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {BROKERAGE_STEPS.map((step, idx) => (
              <div
                key={step.stepNumber}
                className="rounded-2xl bg-[#0D0D0D] border border-[#262626] hover:border-[#D4AF37]/60 p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 shadow-xl text-start relative group"
              >
                {/* Step Top Header: Step Number & Accent */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-black text-[#D4AF37] font-outfit tracking-tighter drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
                    {step.stepNumber}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#171717] border border-[#2E2E2E] flex items-center justify-center text-xs font-bold text-[#A3A3A3] group-hover:text-white group-hover:border-[#D4AF37]/50">
                    {idx + 1}/6
                  </span>
                </div>

                {/* Step Content */}
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white group-hover:text-[#F3E5AB] transition-colors">
                    {lang === 'ar' ? step.titleAr : step.titleEn}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                    {lang === 'ar' ? step.descAr : step.descEn}
                  </p>
                </div>

                {/* Bottom Step Indicator Bar */}
                <div className="pt-3 border-t border-[#1C1C1C] flex items-center gap-2">
                  <div className="h-1 flex-1 rounded-full bg-[#1F1F1F] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#AA7C11] to-[#D4AF37]"
                      style={{ width: `${((idx + 1) / 6) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brokerage Inquiry CTA Card with Direct Broker WhatsApp Contact */}
        <div className="rounded-2xl bg-[#141208] border border-[#3A3015] p-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-start">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-bold text-emerald-400">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تواصل الوسيط المباشر عبر واتساب: 00249919980435' : 'Direct Broker WhatsApp: 00249919980435'}</span>
            </div>
            <h4 className="text-xl font-bold text-white font-cairo">
              {lang === 'ar' ? 'هل ترغب في فتح وساطة لصفقة تجارية في جوبا؟' : 'Ready to Structure a Gold Deal in Juba?'}
            </h4>
            <p className="text-xs sm:text-sm text-[#A3A3A3] max-w-xl">
              {lang === 'ar'
                ? 'فريقنا في جوبا والوسيط المعتمد يقدم الاستشارات المبدئية ويرتب قنوات التواصل الرسمية لصفقات شراء وتصدير الذهب.'
                : 'Our commercial team in Juba coordinates official bilateral discussions between domestic mining groups and verified buyers.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/249919980435?text=${encodeURIComponent(
                lang === 'ar'
                  ? 'السلام عليكم، أود التواصل المباشر مع الوسيط بشأن صفقة وساطة ذهب في جنوب السودان.'
                  : 'Hello, I would like to directly contact the gold broker regarding a transaction in South Sudan.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{lang === 'ar' ? 'واتساب الوسيط: 00249919980435' : 'Broker WhatsApp: 00249919980435'}</span>
            </a>

            <button
              onClick={onInitiateInquiry}
              className="flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black font-extrabold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all"
            >
              <span>{lang === 'ar' ? 'بدء طلب وساطة' : 'Initiate Brokerage'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
