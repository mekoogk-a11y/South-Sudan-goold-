import React from 'react';
import { ShieldAlert, Scale, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface SecurityNoticeProps {
  lang: Language;
}

export const SecurityNotice: React.FC<SecurityNoticeProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="py-12 bg-[#050505] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#17130A] via-[#120F08] to-[#0D0B05] border border-[#473812] p-6 sm:p-8 relative overflow-hidden shadow-xl text-start">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="w-12 h-12 rounded-xl bg-[#261E0A] border border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#E5C158]">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white font-cairo">
                  {t.securityAlertTitle}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#F3E5AB]">
                  Regulatory Protocol
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed max-w-4xl">
                {t.securityAlertText}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#A3A3A3]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'التحقق من الهوية (KYC)' : 'KYC Due Diligence'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'فحص النقاء المخبري' : 'Assay Verification'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'الالتزام بقوانين المعادن في جنوب السودان' : 'Full South Sudan Mining Law Compliance'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
