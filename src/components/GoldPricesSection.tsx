import React, { useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle, DollarSign, Clock, ShieldAlert } from 'lucide-react';
import { GoldPriceData, Language, Currency } from '../types';
import { translations } from '../data/translations';
import { PRICE_HISTORY, INITIAL_GOLD_PRICES } from '../data/mockData';

interface GoldPricesSectionProps {
  lang: Language;
  priceData?: GoldPriceData;
  prices?: GoldPriceData;
  currency?: Currency;
  onToggleCurrency?: () => void;
  usdToSspRate: number;
  onRefreshPrices: () => void;
  isRefreshing?: boolean;
}

export const GoldPricesSection: React.FC<GoldPricesSectionProps> = ({
  lang,
  priceData,
  prices,
  currency: externalCurrency,
  onToggleCurrency,
  usdToSspRate,
  onRefreshPrices,
  isRefreshing = false,
}) => {
  const [internalCurrency, setInternalCurrency] = useState<Currency>('USD');
  const selectedCurrency = externalCurrency || internalCurrency;
  
  const handleCurrencyChange = (c: Currency) => {
    if (onToggleCurrency && externalCurrency !== c) {
      onToggleCurrency();
    }
    setInternalCurrency(c);
  };

  const activeData: GoldPriceData = priceData || prices || INITIAL_GOLD_PRICES;
  const t = translations[lang] || translations.ar;

  // Currency multiplier
  const multiplier = selectedCurrency === 'SSP' ? (usdToSspRate || 1) : 1;
  const currencySymbol = selectedCurrency === 'SSP' ? 'SSP ' : '$';

  const formatPrice = (val?: number) => {
    const safeVal = typeof val === 'number' && !isNaN(val) ? val : 0;
    const converted = safeVal * multiplier;
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(converted);
  };

  const change24h = activeData?.change24h ?? 0;
  const changePercent = activeData?.changePercent ?? 0;
  const isPositive = change24h >= 0;

  // Render SVG Sparkline / Mini Chart for gold trend
  const historyList = PRICE_HISTORY && PRICE_HISTORY.length > 0 ? PRICE_HISTORY : [{ time: '00:00', price: 2780 }];
  const minPrice = Math.min(...historyList.map((p) => p.price));
  const maxPrice = Math.max(...historyList.map((p) => p.price));
  const chartHeight = 80;
  const chartWidth = 320;

  const points = historyList.map((pt, idx) => {
    const x = (idx / Math.max(historyList.length - 1, 1)) * chartWidth;
    const y = chartHeight - ((pt.price - minPrice) / (maxPrice - minPrice || 1)) * (chartHeight - 15) - 8;
    return `${x},${y}`;
  }).join(' ');

  return (
    <section id="prices" className="py-16 md:py-24 bg-[#080808] border-b border-[#1A1A1A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#1F1F1F]">
          <div className="space-y-2 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17140B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t.marketStatusLive}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-cairo">
              {t.pricesTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] max-w-2xl">
              {t.pricesDesc}
            </p>
          </div>

          {/* Controls: Currency Toggle & Refresh */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Currency Selector */}
            <div className="flex items-center bg-[#121212] border border-[#262626] rounded-lg p-1">
              <span className="text-xs text-[#737373] px-2.5 hidden sm:inline">
                {t.currencySelect}
              </span>
              <button
                onClick={() => handleCurrencyChange('USD')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  selectedCurrency === 'USD'
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'text-[#A3A3A3] hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => handleCurrencyChange('SSP')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  selectedCurrency === 'SSP'
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'text-[#A3A3A3] hover:text-white'
                }`}
              >
                SSP (جنوب السودان)
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={onRefreshPrices}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#141414] border border-[#2E2E2E] hover:border-[#D4AF37]/60 text-xs font-semibold text-[#D1D5DB] hover:text-white transition-all disabled:opacity-50"
              title={t.refreshPrices}
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#D4AF37] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{t.refreshPrices}</span>
            </button>
          </div>
        </div>

        {/* Primary Trading Board Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Gold Card (Hero Asset) */}
          <div className="lg:col-span-8 rounded-2xl bg-gradient-to-b from-[#141208] to-[#0A0A0A] border border-[#3A3015] p-6 sm:p-8 relative overflow-hidden shadow-xl">
            <div className="absolute -top-24 -end-24 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header with Asset Badge and 24h Delta */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                    XAU / {selectedCurrency}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#F3E5AB]">
                    Standard Benchmark
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {t.spotPrice}
                </h3>
              </div>

              {/* 24h Change Badge */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold ${
                  isPositive
                    ? 'bg-emerald-950/70 border border-emerald-600/40 text-emerald-400'
                    : 'bg-rose-950/70 border border-rose-600/40 text-rose-400'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>
                  {isPositive ? '+' : ''}
                  {formatPrice(change24h)} ({isPositive ? '+' : ''}
                  {changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            {/* Huge Spot Price Display */}
            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-outfit">
                {currencySymbol}
                {formatPrice(activeData?.spotPerOz)}
              </span>
              <span className="text-sm sm:text-base text-[#A3A3A3] font-medium">
                / {t.perOunce} (Troy Oz)
              </span>
            </div>

            {/* Mini Intraday Trajectory Chart */}
            <div className="mt-6 pt-4 border-t border-[#262112]">
              <div className="flex items-center justify-between text-xs text-[#737373] mb-2">
                <span>{t.chartTitle}</span>
                <span className="text-[#D4AF37] font-medium">Intraday Band: ${minPrice} – ${maxPrice}</span>
              </div>
              <div className="h-20 w-full relative">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="goldChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <polygon
                    points={`0,${chartHeight} ${points} ${chartWidth},${chartHeight}`}
                    fill="url(#goldChartGrad)"
                  />
                  {/* Stroke Line */}
                  <polyline
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>
            </div>

            {/* Gram & Karat Granular Rates (24K, 22K, 21K, 18K) */}
            <div className="mt-8 pt-6 border-t border-[#262112] grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-[#0D0B05] border border-[#2B230C]">
                <div className="text-xs text-[#9CA3AF] font-medium">{t.karat24}</div>
                <div className="text-lg sm:text-xl font-bold text-white mt-1 font-outfit">
                  {currencySymbol}{formatPrice(activeData?.rates?.g24k)}
                </div>
                <div className="text-[11px] text-[#737373]">{t.perGram}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D0B05] border border-[#2B230C]">
                <div className="text-xs text-[#9CA3AF] font-medium">{t.karat22}</div>
                <div className="text-lg sm:text-xl font-bold text-white mt-1 font-outfit">
                  {currencySymbol}{formatPrice(activeData?.rates?.g22k)}
                </div>
                <div className="text-[11px] text-[#737373]">{t.perGram}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D0B05] border border-[#2B230C]">
                <div className="text-xs text-[#9CA3AF] font-medium">{t.karat21}</div>
                <div className="text-lg sm:text-xl font-bold text-white mt-1 font-outfit">
                  {currencySymbol}{formatPrice(activeData?.rates?.g21k)}
                </div>
                <div className="text-[11px] text-[#737373]">{t.perGram}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D0B05] border border-[#2B230C]">
                <div className="text-xs text-[#9CA3AF] font-medium">{t.karat18}</div>
                <div className="text-lg sm:text-xl font-bold text-white mt-1 font-outfit">
                  {currencySymbol}{formatPrice(activeData?.rates?.g18k)}
                </div>
                <div className="text-[11px] text-[#737373]">{t.perGram}</div>
              </div>
            </div>

            {/* Kilogram Rate */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#0F0C06] border border-[#332A10] flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-[#D4AF37]">
                {t.perKilo} (24K Gold Ingot 1kg)
              </span>
              <span className="text-lg sm:text-2xl font-black text-white font-outfit">
                {currencySymbol}{formatPrice(activeData?.rates?.kg)}
              </span>
            </div>

          </div>

          {/* Secondary Precious Metals Sidebar (Silver & Platinum) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Silver Ticker Card */}
            <div className="rounded-2xl bg-[#0F0F0F] border border-[#262626] p-6 text-start shadow-md hover:border-[#404040] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
                    XAG / {selectedCurrency}
                  </span>
                  <h4 className="text-xl font-bold text-white mt-0.5">
                    {t.silverPriceLabel}
                  </h4>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#1C1C1C] border border-[#333333] flex items-center justify-center text-xs font-bold text-[#E5E5E5]">
                  Ag
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-outfit">
                  {currencySymbol}{formatPrice(activeData?.silverPerOz)}
                </span>
                <span className="text-xs text-[#737373]">/ {t.perOunce}</span>
              </div>
              <div className="mt-2 text-xs text-[#737373]">
                {lang === 'ar' ? 'سعر الجرام:' : 'Gram:'} {currencySymbol}{formatPrice((activeData?.silverPerOz || 32.5) / 31.1035)}
              </div>
            </div>

            {/* Platinum Ticker Card */}
            <div className="rounded-2xl bg-[#0F0F0F] border border-[#262626] p-6 text-start shadow-md hover:border-[#404040] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
                    XPT / {selectedCurrency}
                  </span>
                  <h4 className="text-xl font-bold text-white mt-0.5">
                    {t.platinumPriceLabel}
                  </h4>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#1C1C1C] border border-[#333333] flex items-center justify-center text-xs font-bold text-[#E5E5E5]">
                  Pt
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-outfit">
                  {currencySymbol}{formatPrice(activeData?.platinumPerOz)}
                </span>
                <span className="text-xs text-[#737373]">/ {t.perOunce}</span>
              </div>
              <div className="mt-2 text-xs text-[#737373]">
                {lang === 'ar' ? 'سعر الجرام:' : 'Gram:'} {currencySymbol}{formatPrice((activeData?.platinumPerOz || 980) / 31.1035)}
              </div>
            </div>

            {/* Last Updated Timestamp Box */}
            <div className="rounded-xl bg-[#0A0A0A] border border-[#212121] p-4 flex items-center gap-3 text-xs text-[#A3A3A3]">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <div>
                <span className="block font-medium text-white">{t.lastUpdated}</span>
                <span>{new Date(activeData?.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} • UTC+2 (Juba Local Time)</span>
              </div>
            </div>

          </div>

        </div>

        {/* Mandated Explicit Disclaimer Notice */}
        <div className="mt-8 rounded-xl bg-[#120F08] border border-[#423512] p-4 flex items-start gap-3 text-start">
          <ShieldAlert className="w-5 h-5 text-[#E5C158] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed">
            {t.disclaimerGoldPrices}
          </p>
        </div>

      </div>
    </section>
  );
};
