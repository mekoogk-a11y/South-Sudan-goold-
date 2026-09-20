import React from 'react';
import { Sparkles, Monitor, TrendingUp, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface LaptopMockupProps {
  lang: Language;
}

export const LaptopMockup: React.FC<LaptopMockupProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="py-14 bg-[#050505] border-b border-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Modern Laptop Vector Illustration */}
        <div className="relative mx-auto max-w-2xl group">
          {/* Subtle Screen Ambient Backlight */}
          <div className="absolute -inset-2 bg-gradient-to-t from-[#D4AF37]/15 to-transparent blur-2xl rounded-3xl pointer-events-none"></div>

          {/* Laptop Lid / Bezel */}
          <div className="relative rounded-t-2xl bg-[#1A1A1A] p-2.5 sm:p-3 border-t border-x border-[#333333] shadow-2xl">
            {/* Camera dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#000000] border border-[#333333] mx-auto mb-2"></div>

            {/* Laptop Display Screen */}
            <div className="relative rounded-lg bg-[#080808] border border-[#262626] overflow-hidden aspect-[16/10] p-4 text-start flex flex-col justify-between select-none">
              {/* Screen Top Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-[#1F1F1F]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500/80"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                </div>
                <div className="text-[10px] text-[#A3A3A3] font-outfit px-3 py-0.5 rounded bg-[#141414] border border-[#2A2A2A]">
                  ssgoldexchange.com/juba
                </div>
                <div className="w-4"></div>
              </div>

              {/* Screen Simulated Platform Interface */}
              <div className="space-y-3 my-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-wider block">
                      South Sudan Gold Exchange • Juba
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-white">
                      XAU / USD: $2,845.80
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/30 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +0.65%
                  </span>
                </div>

                {/* Simulated Mini Data Blocks */}
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-[#121212] border border-[#262626]">
                    <span className="text-[#737373] block">Kapoeta Belt</span>
                    <span className="text-white font-bold">Placer Alluvial</span>
                  </div>
                  <div className="p-2 rounded bg-[#121212] border border-[#262626]">
                    <span className="text-[#737373] block">Luri Basin</span>
                    <span className="text-white font-bold">Near Juba</span>
                  </div>
                  <div className="p-2 rounded bg-[#121212] border border-[#262626]">
                    <span className="text-[#737373] block">Assay Status</span>
                    <span className="text-[#D4AF37] font-bold">24K Verified</span>
                  </div>
                </div>
              </div>

              {/* Screen Bottom Status */}
              <div className="flex items-center justify-between text-[9px] text-[#737373] pt-2 border-t border-[#1F1F1F]">
                <span>Republic of South Sudan Digital Precious Metals Hub</span>
                <span className="text-[#D4AF37]">Active Secure Channel</span>
              </div>
            </div>
          </div>

          {/* Laptop Base / Keyboard Hinge & Edge */}
          <div className="relative h-3.5 sm:h-4 bg-gradient-to-b from-[#2A2A2A] to-[#141414] rounded-b-xl border-b border-x border-[#333333] shadow-xl flex items-center justify-center">
            {/* Opening Notch */}
            <div className="w-16 h-1 rounded-full bg-[#3D3D3D]"></div>
          </div>
        </div>

        {/* Mandated Caption Label */}
        <div className="space-y-1 pt-2">
          <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#D4AF37] font-outfit tracking-wide">
            <Monitor className="w-4 h-4" />
            <span>Digital Platform for South Sudan Gold</span>
          </div>
          <p className="text-xs text-[#737373]">
            {t.laptopArLabel}
          </p>
        </div>

      </div>
    </section>
  );
};
