export type Language = 'ar' | 'en';
export type Currency = 'USD' | 'SSP';

export interface GoldPriceData {
  spotPerOz: number; // USD per Troy Ounce
  change24h: number;
  changePercent: number;
  timestamp: string;
  silverPerOz: number;
  platinumPerOz: number;
  rates: {
    oz: number;
    kg: number;
    g24k: number;
    g22k: number;
    g21k: number;
    g18k: number;
  };
}

export interface GoldRegion {
  id: string;
  nameAr: string;
  nameEn: string;
  stateAr: string;
  stateEn: string;
  descriptionAr: string;
  descriptionEn: string;
  miningActivityAr: string;
  miningActivityEn: string;
  indicatorsAr: string;
  indicatorsEn: string;
  imageUrl: string;
  isIllustrative: boolean;
  mapCoordinates: { x: number; y: number }; // percentage on SVG map
}

export interface SellGoldSubmission {
  id: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  country: string;
  city: string;
  goldType: string;
  quantity: number;
  unit: 'Gram' | 'Ounce' | 'Kilogram';
  purityKarat: '24K' | '22K' | '21K' | '18K' | 'Unassayed / Raw';
  location: string;
  requestedPrice: string;
  preferredContact: 'WhatsApp' | 'Phone' | 'Email';
  notes?: string;
  imageUrl?: string;
  status: 'new' | 'in_review' | 'verified' | 'rejected' | 'completed';
  createdAt: string;
}

export interface BrokerageStep {
  stepNumber: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export interface AdminSettings {
  companyNameAr: string;
  companyNameEn: string;
  phone: string;
  whatsapp: string;
  email: string;
  locationAr: string;
  locationEn: string;
  usdToSspRate: number; // e.g. 1500 SSP per USD
  useManualGoldPrice: boolean;
  manualSpotPrice: number;
}
