import React, { useState } from 'react';
import { Menu, X, Globe, Shield, ArrowUpRight, PhoneCall, MapPin, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenAdmin: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenAdmin,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const navLinks = [
    { id: 'hero', label: t.navHome },
    { id: 'prices', label: t.navPrices },
    { id: 'regions', label: t.navRegions },
    { id: 'brokerage', label: t.navBrokerage },
    { id: 'showcase', label: t.navGold },
    { id: 'we-buy', label: t.navBuyGold },
    { id: 'about', label: t.navAbout },
    { id: 'contact', label: t.navContact },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050505]/95 backdrop-blur-md border-b border-[#262626]">
      {/* Top Utility Bar */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 text-xs text-[#A3A3A3] bg-[#0A0A0A] border-b border-[#1A1A1A]">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-[#D4AF37]">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {lang === 'ar' ? 'سوق الذهب المباشر • جوبا' : 'Live Precious Metals Market • Juba'}
          </span>
          <span className="flex items-center gap-1 text-[#E5E5E5]">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            {lang === 'ar' ? 'العاصمة جوبا، جمهورية جنوب السودان' : 'Juba Capital, Republic of South Sudan'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/249919980435"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors py-0.5 px-2.5 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-xs font-semibold"
            title={lang === 'ar' ? 'تواصل مع الوسيط المعتمد عبر واتساب' : 'Contact Authorized Broker via WhatsApp'}
          >
            <MessageCircle className="w-3 h-3 text-emerald-400 fill-emerald-400/30" />
            <span className="font-outfit">{lang === 'ar' ? 'واتساب الوسيط: 00249919980435' : 'Broker WhatsApp: 00249919980435'}</span>
          </a>

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors py-0.5 px-2 rounded border border-[#262626] hover:border-[#D4AF37]/50"
            title={t.adminPortal}
          >
            <Shield className="w-3 h-3 text-[#D4AF37]" />
            <span>{t.adminPortal}</span>
          </button>
          
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 text-[#E5E5E5] hover:text-[#D4AF37] font-medium transition-colors bg-[#171717] px-2.5 py-0.5 rounded"
          >
            <Globe className="w-3 h-3 text-[#D4AF37]" />
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="text-start focus:outline-none"
            aria-label={t.brandName}
          >
            <Logo lang={lang} />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-sm font-medium text-[#D1D5DB] hover:text-[#D4AF37] transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* CTA & Language Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language button on smaller screens or next to CTA */}
            <button
              onClick={onToggleLang}
              className="xl:hidden flex items-center gap-1.5 text-xs text-[#E5E5E5] hover:text-[#D4AF37] px-2.5 py-1.5 rounded-lg border border-[#262626]"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Primary Action: Sell Gold */}
            <button
              onClick={() => handleLinkClick('sell-form')}
              className="relative group overflow-hidden rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] p-[1px] font-semibold text-black shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_22px_rgba(212,175,55,0.4)] transition-all active:scale-[0.98]"
            >
              <span className="flex items-center gap-2 px-5 py-2.5 rounded-[7px] bg-gradient-to-b from-[#E5C158] to-[#AA7C11] font-bold text-sm tracking-wide text-black hover:brightness-105 transition-all">
                <span>{t.navSellCta}</span>
                <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onToggleLang}
              className="p-2 text-xs font-semibold text-[#D4AF37] border border-[#262626] rounded-md bg-[#121212]"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-[#121212] border border-[#262626] text-[#D1D5DB] hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A0A0A] border-b border-[#262626] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="block w-full text-start py-2.5 px-3 rounded-lg text-base font-medium text-[#E5E5E5] hover:bg-[#1A1A1A] hover:text-[#D4AF37] transition-colors"
            >
              {link.label}
            </button>
          ))}

          <div className="pt-4 border-t border-[#262626] space-y-3">
            <a
              href="https://wa.me/249919980435"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/30" />
              <span>{lang === 'ar' ? 'واتساب الوسيط: 00249919980435' : 'Broker WhatsApp: 00249919980435'}</span>
            </a>

            <button
              onClick={() => handleLinkClick('sell-form')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-[#E5C158] to-[#AA7C11] text-black font-bold text-base shadow-lg"
            >
              <span>{t.navSellCta}</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-[#D4AF37] py-1.5 px-3 rounded border border-[#262626]"
              >
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.adminPortal}</span>
              </button>
              
              <button
                onClick={() => {
                  onToggleLang();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs text-[#E5E5E5] py-1.5 px-3 rounded border border-[#262626] bg-[#171717]"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{lang === 'ar' ? 'English Version' : 'النسخة العربية'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
