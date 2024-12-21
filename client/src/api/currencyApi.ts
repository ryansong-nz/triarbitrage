import { CurrencyPair, ConversionResult } from '../types/currency';

const API_ENDPOINT = 'YOUR_API_ENDPOINT';

export async function fetchCurrencyPairs(): Promise<CurrencyPair[]> {
  const response = await fetch(`${API_ENDPOINT}/pairs`);
  return response.json();
}

export async function getConversion(
  from: string,
  to: string,
  amount: number
): Promise<ConversionResult> {
  const response = await fetch(
    `${API_ENDPOINT}/convert?from=${from}&to=${to}&amount=${amount}`
  );
  return response.json();
}