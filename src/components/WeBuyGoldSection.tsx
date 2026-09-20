import React, { useState } from 'react';
import {
  Coins,
  ShieldCheck,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  X,
  FileCheck,
} from 'lucide-react';
import { Language, SellGoldSubmission } from '../types';
import { translations } from '../data/translations';

interface WeBuyGoldSectionProps {
  lang: Language;
  onNewSubmission: (sub: SellGoldSubmission) => void;
  prefillGoldType?: string;
  prefillLocation?: string;
}

export const WeBuyGoldSection: React.FC<WeBuyGoldSectionProps> = ({
  lang,
  onNewSubmission,
  prefillGoldType = '',
  prefillLocation = '',
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('جنوب السودان');
  const [city, setCity] = useState(prefillLocation || 'جوبا');
  const [goldType, setGoldType] = useState(prefillGoldType || 'alluvial');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<'Gram' | 'Ounce' | 'Kilogram'>('Gram');
  const [purity, setPurity] = useState<'24K' | '22K' | '21K' | '18K' | 'Unassayed / Raw'>('22K');
  const [location, setLocation] = useState(prefillLocation || 'جوبا (خزينة خاصة)');
  const [requestedPrice, setRequestedPrice] = useState('');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone' | 'Email'>('WhatsApp');
  const [notes, setNotes] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Sync prefilled values if props change
  React.useEffect(() => {
    if (prefillGoldType) setGoldType(prefillGoldType);
    if (prefillLocation) {
      setCity(prefillLocation);
      setLocation(`${prefillLocation} - جنوب السودان`);
    }
  }, [prefillGoldType, prefillLocation]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!fullName.trim() || !phone.trim() || !quantity || Number(quantity) <= 0) {
      setFormError(
        lang === 'ar'
          ? 'يرجى إدخال الاسم، رقم الهاتف/الواتساب، والكمية بصورة صحيحة.'
          : 'Please provide your full name, phone/WhatsApp number, and valid quantity.'
      );
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newEntry: SellGoldSubmission = {
        id: `REQ-${Date.now().toString().slice(-5)}`,
        fullName,
        phone,
        whatsapp: phone,
        country,
        city,
        goldType,
        quantity: Number(quantity),
        unit,
        purityKarat: purity,
        location,
        requestedPrice: requestedPrice || (lang === 'ar' ? 'سعر السوق العالمي' : 'Market Spot Rate'),
        preferredContact,
        notes,
        imageUrl: selectedFileName ? 'Uploaded document verified' : undefined,
        status: 'new',
        createdAt: new Date().toISOString(),
      };

      onNewSubmission(newEntry);
      setIsSubmitting(false);
      setShowSuccessModal(true);

      // Reset form fields
      setFullName('');
      setPhone('');
      setQuantity('');
      setRequestedPrice('');
      setNotes('');
      setSelectedFileName(null);
    }, 800);
  };

  return (
    <section id="we-buy" className="py-16 md:py-24 bg-[#050505] border-b border-[#1A1A1A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 8: "We Buy Gold" Feature Intro */}
        <div className="rounded-3xl bg-gradient-to-r from-[#17140B] via-[#0D0D0D] to-[#0A0A0A] border border-[#332A10] p-8 md:p-12 relative overflow-hidden shadow-2xl text-start">
          <div className="absolute top-0 end-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1B0F] border border-[#D4AF37]/40 text-xs font-semibold text-[#F3E5AB]">
              <Coins className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.weBuySubtitle}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-cairo">
              {t.weBuyTitle}
            </h2>

            <p className="text-base sm:text-lg text-[#D1D5DB] leading-relaxed">
              {t.weBuyDesc}
            </p>

            {/* Value Pillars */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs font-semibold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.weBuyPill1}</span>
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs font-semibold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.weBuyPill2}</span>
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs font-semibold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.weBuyPill3}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Section 9: The Sell Gold Request Form */}
        <div id="sell-form" className="rounded-3xl bg-[#0A0A0A] border border-[#262626] p-6 sm:p-10 md:p-12 shadow-2xl relative">
          
          <div className="text-start space-y-3 pb-8 border-b border-[#1C1C1C]">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-cairo">
              {t.sellFormTitle}
            </h3>
            <p className="text-sm text-[#9CA3AF]">
              {t.sellFormSubtitle}
            </p>
          </div>

          {formError && (
            <div className="mt-6 p-4 rounded-xl bg-rose-950/60 border border-rose-600/50 text-rose-300 text-sm flex items-center gap-3 text-start">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-start">
            {/* Grid 1: Full Name & Phone/WhatsApp */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D1D5DB]">
                  {t.formFullName} <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: محمد عبد الله / John Deng' : 'e.g. John Deng / Mohamed'}
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#262626] text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D1D5DB]">
                  {t.formPhone} <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+211 9... / +249 9..."
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#262626] text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors font-outfit"
                />
              </div>
            </div>

            {/* Grid 2: Country & City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D1D5DB]">
                  {t.formCountry}
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder={lang === 'ar' ? 'جمهورية جنوب السودان' : 'Republic of South Sudan'}
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#262626] text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D1D5DB]">
                  {t.formCity}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={lang === 'ar' ? 'جوبا، كابويتا، إلخ' : 'Juba, Kapoeta, etc.'}
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#262626] text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            {/* Grid 3: Gold Type, Quantity & Unit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D1D5DB]">
                  {t.formGoldType}
                </label>
                <select
                  value={goldType}
                  onChange={(e) => setGoldType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#262626] text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="alluvial">{t.formGoldTypeOpt1}</option>
                  <option value="nuggets">{t.formGoldTypeOpt2}</option>
                  <option value="dore">{t.formGoldTypeOpt3}</option>
                  <option value="scrap">{t.formGoldTypeOpt4}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D1D5DB]">
                  {t.formQuantity} <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="500"
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#262626] text-white text-sm focus:border-[#D4AF37] focus:outline-none font-outfit"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D1D5DB]">
                  {t.formUnit}
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#262626] text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="Gram">{t.unitGram}</option>
                  <option value="Ounce">{t.unitOunce}</option>
                  <option value="Kilogram">{t.unitKg}</option>
                </select>
              </div>
            </div>

            {/* Grid 4: Purity & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D1D5DB]">
                  {t.formPurity}
                </label>
                <select
                  value={purity}
                  onChange={(e) => setPurity(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#262626] text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="24K">{t.purity24k}</option>
                  <option value="22K">{t.purity22k}</option>
                  <option value="21K">{t.purity21k}</option>
                  <option value="18K">{t.purity18k}</option>
                  <option value="Unassayed / Raw">{t.purityUnassayed}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D1D5DB]">
                  {t.formLocation}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={lang === 'ar' ? 'جوبا، كابويتا، خزينة معتمدة' : 'Juba, Kapoeta, Bonded Vault'}
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#262626] text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            {/* Grid 5: Requested Price & Contact Preference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D1D5DB]">
                  {t.formRequestedPrice}
                </label>
                <input
                  type="text"
                  value={requestedPrice}
                  onChange={(e) => setRequestedPrice(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: سعر البورصة أو خصم 2%' : 'e.g. Spot Price minus 2%'}
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#262626] text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D1D5DB]">
                  {t.formContactPref}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['WhatsApp', 'Phone', 'Email'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPreferredContact(method)}
                      className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                        preferredContact === method
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md'
                          : 'bg-[#121212] text-[#A3A3A3] border-[#262626] hover:text-white'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid 6: Photo Upload Simulation & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D1D5DB]">
                  {t.formUploadLabel}
                </label>
                <div className="relative border-2 border-dashed border-[#2E2E2E] hover:border-[#D4AF37]/60 rounded-xl p-5 text-center cursor-pointer bg-[#0D0D0D] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <UploadCloud className="w-8 h-8 mx-auto text-[#D4AF37] mb-2" />
                  <span className="block text-xs font-medium text-white">
                    {selectedFileName ? selectedFileName : t.formUploadHint}
                  </span>
                  <span className="block text-[11px] text-[#737373] mt-1">
                    PNG, JPG, JPEG (Max 10MB)
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#D1D5DB]">
                  {t.formNotes}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'ar' ? 'أي تفاصيل عن مصدر الذهب أو الرغبة في معاينة بجوبا...' : 'Any details about batch provenance, timeline, or assay logs...'}
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#262626] text-white text-sm focus:border-[#D4AF37] focus:outline-none resize-none"
                ></textarea>
              </div>
            </div>

            {/* Critical Regulatory Note on Submission */}
            <div className="p-4 rounded-xl bg-[#120F08] border border-[#3A2E10] text-xs text-[#E5C158] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{t.formNoticeCrucial}</span>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[240px] flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-black font-extrabold text-base shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all disabled:opacity-50 active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <span>{t.formSubmitting}</span>
                ) : (
                  <>
                    <span>{t.formSubmitBtn}</span>
                    <ArrowIcon className="w-4 h-4 text-black" />
                  </>
                )}
              </button>
            </div>
          </form>

        </div>

      </div>

      {/* Success Confirmation Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative max-w-md w-full bg-[#0F0F0F] border border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 end-4 p-1.5 rounded-lg text-[#737373] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#1C180C] border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
              <FileCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl sm:text-2xl font-bold text-white font-cairo">
                {t.formSuccessTitle}
              </h4>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                {t.formSuccessDesc}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#141414] border border-[#262626] text-xs text-[#E5E5E5]">
              {lang === 'ar'
                ? 'رقم المعاملة المسجلة: '
                : 'Inquiry Reference: '}
              <span className="font-bold text-[#D4AF37] font-outfit">
                REQ-{Math.floor(10000 + Math.random() * 90000)}
              </span>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm hover:brightness-105 transition-all"
            >
              {lang === 'ar' ? 'حسناً، تم الفهم' : 'Acknowledged'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
