export interface CurrencyPair {
  from: string;
  to: string;
  rate: number;
}

export interface ConversionResult {
  directRate: number;
  directAmount: number;
  bestRoute: string[];
  bestRate: number;
  bestAmount: number;
}

export const CURRENCIES = ['EUR', 'USD', 'GBP', 'JPY', 'AUD', 'CNY', 'CAD', 'SGD', 'HKD', 'NZD'] as const;

export const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CNY: '¥',
  CAD: 'C$',
  SGD: 'S$',
  HKD: 'HK$',
  NZD: 'NZ$'
};