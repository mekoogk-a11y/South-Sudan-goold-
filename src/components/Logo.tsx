import React from 'react';

interface LogoProps {
  className?: string;
  isCompact?: boolean;
  lang?: 'ar' | 'en';
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-10', isCompact = false, lang = 'ar' }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Gold Bar Icon Emblem */}
      <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]">
          <defs>
            <linearGradient id="logoGoldBar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4B8" />
              <stop offset="30%" stopColor="#E5C158" />
              <stop offset="65%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8C6407" />
            </linearGradient>
            <linearGradient id="logoShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A2210" />
              <stop offset="100%" stopColor="#0B0904" />
            </linearGradient>
            <linearGradient id="logoRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#4A370A" />
            </linearGradient>
          </defs>
          
          {/* Subtle Outer Geometric Shield */}
          <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#logoShadow)" stroke="url(#logoRing)" strokeWidth="2" />

          {/* 3D Gold Bar Top Face */}
          <polygon points="26,38 50,22 74,38 50,54" fill="url(#logoGoldBar)" />
          {/* Left Facet */}
          <polygon points="26,38 50,54 50,76 26,60" fill="#996F0A" />
          {/* Right Facet */}
          <polygon points="74,38 50,54 50,76 74,60" fill="#C59B27" />

          {/* Precision Ingot Mark: SS */}
          <path
            d="M44 42 C44 38, 56 38, 56 42 C56 45, 44 47, 44 50 C44 54, 56 54, 56 50"
            stroke="#1B1303"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Light Glint Spark */}
          <circle cx="50" cy="22" r="3" fill="#FFFCE6" />
        </svg>
      </div>

      {/* Brand Typography */}
      {!isCompact && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-extrabold text-base md:text-lg tracking-tight font-cairo">
              {lang === 'ar' ? 'بورصة ووساطة الذهب' : 'South Sudan Gold'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
          </div>
          <span className="text-[#D4AF37] font-semibold text-xs tracking-wider uppercase font-outfit">
            {lang === 'ar' ? 'جنوب السودان • جوبا' : 'Exchange & Brokerage • Juba'}
          </span>
        </div>
      )}
    </div>
  );
};
