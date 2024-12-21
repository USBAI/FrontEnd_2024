import { detect } from '@fingerprintjs/fingerprintjs';

// Nordic currency configuration
export const NORDIC_CURRENCIES = {
  DK: { code: 'DKK', symbol: 'kr', rate: 0.71 },    // Danish Krone
  FI: { code: 'EUR', symbol: '€', rate: 0.087 },    // Euro
  IS: { code: 'ISK', symbol: 'kr', rate: 12.76 },   // Icelandic Króna
  NO: { code: 'NOK', symbol: 'kr', rate: 1.02 },    // Norwegian Krone
  SE: { code: 'SEK', symbol: 'kr', rate: 1 }        // Swedish Krona (base)
} as const;

// Get user's Nordic country based on browser settings
export const detectNordicCountry = (): keyof typeof NORDIC_CURRENCIES | null => {
  const language = navigator.language.toUpperCase();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Map timezones and languages to Nordic countries
  if (timeZone.includes('Stockholm') || language.includes('SV')) return 'SE';
  if (timeZone.includes('Oslo') || language.includes('NB') || language.includes('NN')) return 'NO';
  if (timeZone.includes('Copenhagen') || language.includes('DA')) return 'DK';
  if (timeZone.includes('Helsinki') || language.includes('FI')) return 'FI';
  if (timeZone.includes('Reykjavik') || language.includes('IS')) return 'IS';
  
  return 'SE'; // Default to Sweden if no Nordic country detected
};

// Convert SEK to target Nordic currency
export const convertFromSEK = (amount: number, targetCountry: keyof typeof NORDIC_CURRENCIES): string => {
  const currency = NORDIC_CURRENCIES[targetCountry];
  const convertedAmount = amount * currency.rate;
  
  return new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(convertedAmount);
};