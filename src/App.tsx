import React, { useState, useEffect } from 'react';
import { Language, Currency, AdminSettings, GoldPriceData, SellGoldSubmission } from './types';
import {
  INITIAL_ADMIN_SETTINGS,
  INITIAL_GOLD_PRICES,
  GOLD_REGIONS,
  SAMPLE_SUBMISSIONS,
} from './data/mockData';
import { fetchLiveGoldRates } from './services/goldPriceService';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GoldPricesSection } from './components/GoldPricesSection';
import { GoldRegionsSection } from './components/GoldRegionsSection';
import { GoldShowcase } from './components/GoldShowcase';
import { WeBuyGoldSection } from './components/WeBuyGoldSection';
import { BrokerageSection } from './components/BrokerageSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SecurityNotice } from './components/SecurityNotice';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { LaptopMockup } from './components/LaptopMockup';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminModal } from './components/AdminModal';

export default function App() {
  // 1. Language State ('ar' or 'en')
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('ss_lang');
    return saved === 'en' ? 'en' : 'ar';
  });

  // 2. Currency State ('USD' or 'SSP')
  const [currency, setCurrency] = useState<Currency>('USD');

  // 3. Admin Settings
  const [settings, setSettings] = useState<AdminSettings>(() => {
    const saved = localStorage.getItem('ss_admin_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_ADMIN_SETTINGS;
  });

  // 4. Gold Prices
  const [goldPrices, setGoldPrices] = useState<GoldPriceData>(INITIAL_GOLD_PRICES);

  // 5. Sell Submissions
  const [submissions, setSubmissions] = useState<SellGoldSubmission[]>(() => {
    const saved = localStorage.getItem('ss_submissions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return SAMPLE_SUBMISSIONS;
  });

  // 6. UI Controls & Modals
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [prefillGoldType, setPrefillGoldType] = useState<string>('');
  const [prefillLocation, setPrefillLocation] = useState<string>('');

  // Synchronize document dir & lang tags
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('ss_lang', lang);
  }, [lang]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('ss_admin_settings', JSON.stringify(settings));
  }, [settings]);

  // Persist submissions
  useEffect(() => {
    localStorage.setItem('ss_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Handle live price refresh
  const refreshPrices = async () => {
    const fresh = await fetchLiveGoldRates(
      settings.useManualGoldPrice ? settings.manualSpotPrice : undefined
    );
    setGoldPrices(fresh);
  };

  const handleUpdateManualGoldPrice = (spot: number, active: boolean, sspRate: number) => {
    const fresh = fetchLiveGoldRates(active ? spot : undefined);
    fresh.then((data) => setGoldPrices(data));
  };

  // Smooth Navigation
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prefill when clicking from region card
  const handleSelectRegionForInquiry = (regionName: string) => {
    setPrefillLocation(regionName);
    scrollToSection('sell-form');
  };

  // Prefill when clicking from showcase
  const handleSelectFormForOffer = (formType: string) => {
    setPrefillGoldType(formType);
    scrollToSection('sell-form');
  };

  // New Sell Submission
  const handleNewSubmission = (newSub: SellGoldSubmission) => {
    setSubmissions((prev) => [newSub, ...prev]);
  };

  // Update Submission Status in Admin
  const handleUpdateSubmissionStatus = (id: string, status: SellGoldSubmission['status']) => {
    setSubmissions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] selection:bg-[#D4AF37] selection:text-black font-sans antialiased overflow-x-hidden">
      
      {/* 1. Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))}
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 2. Hero Section */}
      <main>
        <Hero
          lang={lang}
          onNavigate={scrollToSection}
          onOpenPrices={() => scrollToSection('prices')}
          onOpenSell={() => scrollToSection('we-buy')}
          onOpenBrokerage={() => scrollToSection('brokerage')}
        />

        {/* 3. Gold Prices Section (Live USD & SSP) */}
        <GoldPricesSection
          lang={lang}
          currency={currency}
          onToggleCurrency={() => setCurrency((prev) => (prev === 'USD' ? 'SSP' : 'USD'))}
          prices={goldPrices}
          priceData={goldPrices}
          usdToSspRate={settings.usdToSspRate}
          onRefreshPrices={refreshPrices}
        />

        {/* 4. Gold in South Sudan (Regions & Interactive Map) */}
        <GoldRegionsSection
          lang={lang}
          regions={GOLD_REGIONS}
          onSelectRegionForInquiry={handleSelectRegionForInquiry}
        />

        {/* 5. Gold Showcase (Physical Specifications & Traded Lots) */}
        <GoldShowcase
          lang={lang}
          onSelectFormForOffer={handleSelectFormForOffer}
        />

        {/* 6. We Buy Gold & Submission Form */}
        <WeBuyGoldSection
          lang={lang}
          onNewSubmission={handleNewSubmission}
          prefillGoldType={prefillGoldType}
          prefillLocation={prefillLocation}
        />

        {/* 7. Gold Brokerage & 6-Step Visual Timeline */}
        <BrokerageSection
          lang={lang}
          onInitiateInquiry={() => scrollToSection('sell-form')}
        />

        {/* 8. Why Choose Us (6 Value Pillars) */}
        <WhyChooseUs lang={lang} />

        {/* 9. Security, Compliance & Regulatory Notice */}
        <SecurityNotice lang={lang} />

        {/* 10. About Us (Based in Juba) */}
        <AboutSection lang={lang} />

        {/* 11. Contact Section (Direct WhatsApp, Phone, Email, Headquarters) */}
        <ContactSection
          lang={lang}
          settings={settings}
        />

        {/* 12. Modern Laptop Mockup displaying Platform on screen */}
        <LaptopMockup lang={lang} />
      </main>

      {/* 13. Footer with All Rights & Mandatory Designer Attribution */}
      <Footer
        lang={lang}
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 14. Floating WhatsApp Action Button */}
      <FloatingWhatsApp
        lang={lang}
        whatsappNumber={settings.whatsapp}
      />

      {/* 15. Admin Dashboard Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
        settings={settings}
        onUpdateSettings={setSettings}
        submissions={submissions}
        onUpdateSubmissionStatus={handleUpdateSubmissionStatus}
        goldPrices={goldPrices}
        onUpdateManualGoldPrice={handleUpdateManualGoldPrice}
      />

    </div>
  );
}
