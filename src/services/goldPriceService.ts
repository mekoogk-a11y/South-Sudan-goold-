import { GoldPriceData } from '../types';
import { INITIAL_GOLD_PRICES } from '../data/mockData';

export function calculateGoldRates(spotPerOz: number): GoldPriceData['rates'] {
  const gram24k = spotPerOz / 31.1034768; // 1 Troy Ounce = 31.1035 grams
  return {
    oz: spotPerOz,
    kg: gram24k * 1000,
    g24k: Number(gram24k.toFixed(2)),
    g22k: Number((gram24k * 0.9166).toFixed(2)),
    g21k: Number((gram24k * 0.875).toFixed(2)),
    g18k: Number((gram24k * 0.75).toFixed(2)),
  };
}

export async function fetchLiveGoldRates(manualSpot?: number): Promise<GoldPriceData> {
  // If manual spot is configured, use it directly
  if (manualSpot && manualSpot > 0) {
    const rates = calculateGoldRates(manualSpot);
    return {
      spotPerOz: manualSpot,
      change24h: 12.5,
      changePercent: 0.44,
      timestamp: new Date().toISOString(),
      silverPerOz: 32.20,
      platinumPerOz: 986.00,
      rates,
    };
  }

  // Otherwise simulate micro market tick on top of benchmark spot
  // In a production setup, this seamlessly fetches from GoldAPI / Metals-API / Frankfurter
  try {
    const randomDelta = (Math.random() - 0.48) * 3.5;
    const baseSpot = 2845.80 + randomDelta;
    const rates = calculateGoldRates(baseSpot);

    return {
      spotPerOz: Number(baseSpot.toFixed(2)),
      change24h: Number((18.40 + randomDelta).toFixed(2)),
      changePercent: Number(((18.40 + randomDelta) / baseSpot * 100).toFixed(2)),
      timestamp: new Date().toISOString(),
      silverPerOz: Number((32.15 + (randomDelta * 0.05)).toFixed(2)),
      platinumPerOz: Number((985.40 + (randomDelta * 0.2)).toFixed(2)),
      rates,
    };
  } catch {
    return INITIAL_GOLD_PRICES;
  }
}
