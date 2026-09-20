import React, { useState } from 'react';
import {
  X,
  Shield,
  Coins,
  FileText,
  Phone,
  DollarSign,
  Save,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Eye,
  Filter,
} from 'lucide-react';
import { AdminSettings, GoldPriceData, Language, SellGoldSubmission } from '../types';
import { translations } from '../data/translations';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  settings: AdminSettings;
  onUpdateSettings: (newSettings: AdminSettings) => void;
  submissions: SellGoldSubmission[];
  onUpdateSubmissionStatus: (id: string, status: SellGoldSubmission['status']) => void;
  goldPrices: GoldPriceData;
  onUpdateManualGoldPrice: (spot: number, active: boolean, sspRate: number) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  lang,
  settings,
  onUpdateSettings,
  submissions,
  onUpdateSubmissionStatus,
  goldPrices,
  onUpdateManualGoldPrice,
}) => {
  const t = translations[lang];

  // Active Tab: 'requests' | 'prices' | 'settings'
  const [activeTab, setActiveTab] = useState<'requests' | 'prices' | 'settings'>('requests');

  // Requests Filter
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<SellGoldSubmission | null>(null);

  // Settings local state
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [locationAr, setLocationAr] = useState(settings.locationAr);
  const [locationEn, setLocationEn] = useState(settings.locationEn);

  // Price Management local state
  const [usdToSspRate, setUsdToSspRate] = useState(settings.usdToSspRate.toString());
  const [useManualPrice, setUseManualPrice] = useState(settings.useManualGoldPrice);
  const [manualSpotPrice, setManualSpotPrice] = useState(
    settings.manualSpotPrice ? settings.manualSpotPrice.toString() : goldPrices.spotPerOz.toString()
  );

  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AdminSettings = {
      ...settings,
      whatsapp,
      phone,
      email,
      locationAr,
      locationEn,
      usdToSspRate: Number(usdToSspRate) || 1550,
      useManualGoldPrice: useManualPrice,
      manualSpotPrice: Number(manualSpotPrice) || 2845.80,
    };
    onUpdateSettings(updated);
    onUpdateManualGoldPrice(Number(manualSpotPrice) || 2845.80, useManualPrice, Number(usdToSspRate) || 1550);

    setSaveMessage(lang === 'ar' ? 'تم حفظ التعديلات بنجاح' : 'Settings saved successfully');
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const filteredSubmissions =
    statusFilter === 'all'
      ? submissions
      : submissions.filter((s) => s.status === statusFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#0A0A0A] border border-[#2E2E2E] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F1F1F] bg-[#0E0E0E]">
          <div className="flex items-center gap-2.5 text-start">
            <div className="w-8 h-8 rounded-lg bg-[#1C180C] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-cairo">
                {t.adminTitle}
              </h3>
              <p className="text-xs text-[#737373]">
                {t.adminSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#737373] hover:text-white hover:bg-[#1A1A1A] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-[#1A1A1A] bg-[#0A0A0A] text-xs">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'requests'
                ? 'bg-[#D4AF37] text-black'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.adminTabRequests} ({submissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('prices')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'prices'
                ? 'bg-[#D4AF37] text-black'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>{t.adminTabPrices}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'settings'
                ? 'bg-[#D4AF37] text-black'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{t.adminTabSettings}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 text-start">
          
          {/* TAB 1: Submissions Management */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              {/* Filter controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1C1C1C]">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#737373]">{t.adminStatusFilter}</span>
                  {(['all', 'new', 'in_review', 'verified', 'completed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize transition-colors ${
                        statusFilter === st
                          ? 'bg-[#262626] text-[#D4AF37] border border-[#D4AF37]/40'
                          : 'text-[#737373] hover:text-white'
                      }`}
                    >
                      {st === 'all' ? t.adminAll : st.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <span className="text-xs text-[#737373]">
                  {filteredSubmissions.length} {lang === 'ar' ? 'طلب مسجل' : 'Inquiries'}
                </span>
              </div>

              {/* Submissions List */}
              {filteredSubmissions.length === 0 ? (
                <div className="p-12 text-center text-[#737373]">
                  {lang === 'ar' ? 'لا توجد طلبات مسجلة ضمن هذا التصنيف.' : 'No inquiries found in this view.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-xl bg-[#121212] border border-[#212121] hover:border-[#383838] space-y-3 transition-colors text-start"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold text-[#D4AF37] font-outfit">
                            {sub.id}
                          </span>
                          <h4 className="text-sm font-bold text-white">
                            {sub.fullName}
                          </h4>
                        </div>

                        <select
                          value={sub.status}
                          onChange={(e) =>
                            onUpdateSubmissionStatus(sub.id, e.target.value as any)
                          }
                          className="text-xs px-2 py-1 rounded bg-[#1A1A1A] border border-[#333333] text-white focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="in_review">In Review</option>
                          <option value="verified">Verified</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[#737373] block">{lang === 'ar' ? 'الكمية والوحدة:' : 'Quantity:'}</span>
                          <span className="text-white font-bold font-outfit">
                            {sub.quantity} {sub.unit}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#737373] block">{lang === 'ar' ? 'العيار المقدر:' : 'Estimated Karat:'}</span>
                          <span className="text-[#D4AF37] font-semibold">{sub.purityKarat}</span>
                        </div>
                        <div>
                          <span className="text-[#737373] block">{lang === 'ar' ? 'الهاتف / واتساب:' : 'Phone / WA:'}</span>
                          <span className="text-white font-outfit">{sub.phone}</span>
                        </div>
                        <div>
                          <span className="text-[#737373] block">{lang === 'ar' ? 'الموقع الجغرافي:' : 'Location:'}</span>
                          <span className="text-white">{sub.location}</span>
                        </div>
                      </div>

                      {sub.notes && (
                        <p className="text-xs text-[#A3A3A3] bg-[#0A0A0A] p-2 rounded border border-[#1A1A1A] line-clamp-2">
                          {sub.notes}
                        </p>
                      )}

                      <div className="pt-2 flex items-center justify-between text-[11px] text-[#737373]">
                        <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                        <a
                          href={`https://wa.me/${sub.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D4AF37] hover:underline font-medium"
                        >
                          {lang === 'ar' ? 'مراسلة عبر واتساب' : 'WhatsApp Contact'}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Gold Prices & Currencies */}
          {activeTab === 'prices' && (
            <div className="max-w-xl space-y-6">
              <div className="p-4 rounded-xl bg-[#141208] border border-[#3A3015] space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'ربط وتعديل أسعار الذهب' : 'Live Feeds & Manual Overrides'}</span>
                </h4>
                <p className="text-xs text-[#A3A3A3]">
                  {lang === 'ar'
                    ? 'يمكن تفعيل التحديث المباشر من مزودي الأسعار أو تحديد سعر فوري مخصص، وتعديل سعر صرف الجنيه الجنوب سوداني (SSP).'
                    : 'Configure live market polling or enforce manual spot benchmarks and local currency peg (SSP per USD).'}
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="p-4 rounded-xl bg-[#121212] border border-[#262626] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white">
                      {lang === 'ar' ? 'وضع التسعير اليدوي / المخصص' : 'Enable Manual Price Override'}
                    </label>
                    <input
                      type="checkbox"
                      checked={useManualPrice}
                      onChange={(e) => setUseManualPrice(e.target.checked)}
                      className="w-4 h-4 accent-[#D4AF37]"
                    />
                  </div>

                  {useManualPrice && (
                    <div className="space-y-1.5 pt-2">
                      <label className="text-xs text-[#A3A3A3]">
                        {lang === 'ar' ? 'سعر الأونصة المخصص (USD):' : 'Custom Spot Price per Ounce (USD):'}
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={manualSpotPrice}
                        onChange={(e) => setManualSpotPrice(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#333] text-white text-xs font-outfit"
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-[#121212] border border-[#262626] space-y-2">
                  <label className="text-xs font-semibold text-white block">
                    {lang === 'ar' ? 'سعر صرف الجنيه الجنوب سوداني (SSP لكل 1 دولار)' : 'Exchange Rate (SSP per 1 USD):'}
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={usdToSspRate}
                    onChange={(e) => setUsdToSspRate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#333] text-white text-xs font-outfit"
                  />
                  <span className="text-[11px] text-[#737373]">
                    {lang === 'ar' ? 'يُستخدم لحساب أسعار الجرام والكيلو بالعملة المحلية للمستخدمين.' : 'Applied to convert all gold denominations into local currency.'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 py-2.5 px-6 rounded-lg bg-[#D4AF37] text-black font-bold text-xs hover:brightness-105"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{t.adminSave}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: Communication & Company Data */}
          {activeTab === 'settings' && (
            <div className="max-w-xl space-y-6">
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#D1D5DB]">
                    {lang === 'ar' ? 'رقم الواتساب الرسمي (بدون مسافات)' : 'Official WhatsApp Number:'}
                  </label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="249919980435"
                    className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-white text-xs font-outfit"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#D1D5DB]">
                    {lang === 'ar' ? 'رقم هاتف الاتصال المباشر (جوبا)' : 'Direct Telephone Number (Juba):'}
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+211 9..."
                    className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-white text-xs font-outfit"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#D1D5DB]">
                    {lang === 'ar' ? 'البريد الإلكتروني للشركة' : 'Corporate Email Address:'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="info@ssgoldexchange.com"
                    className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-white text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#D1D5DB]">
                    {lang === 'ar' ? 'عنوان المقر في جوبا (عربي)' : 'Address in Juba (Arabic):'}
                  </label>
                  <input
                    type="text"
                    value={locationAr}
                    onChange={(e) => setLocationAr(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-white text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#D1D5DB]">
                    {lang === 'ar' ? 'عنوان المقر في جوبا (إنجليزي)' : 'Address in Juba (English):'}
                  </label>
                  <input
                    type="text"
                    value={locationEn}
                    onChange={(e) => setLocationEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-white text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 py-2.5 px-6 rounded-lg bg-[#D4AF37] text-black font-bold text-xs hover:brightness-105"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{t.adminSave}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {saveMessage && (
            <div className="mt-4 p-3 rounded-lg bg-emerald-950/70 border border-emerald-600/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{saveMessage}</span>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#1F1F1F] bg-[#0A0A0A] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] text-xs font-semibold text-white transition-colors"
          >
            {t.adminClose}
          </button>
        </div>

      </div>
    </div>
  );
};
