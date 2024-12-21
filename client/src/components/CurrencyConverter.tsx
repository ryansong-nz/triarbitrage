import React, { useState } from 'react';
import { ArrowRight, ArrowLeftRight } from 'lucide-react';
import { CURRENCIES, CURRENCY_SYMBOLS, ConversionResult } from '../types/currency';
import { getConversion } from '../api/currencyApi';

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!amount || isNaN(Number(amount))) return;
    
    setLoading(true);
    try {
      const conversionResult = await getConversion(
        fromCurrency,
        toCurrency,
        Number(amount)
      );
      setResult(conversionResult);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,auto,2fr] gap-4 items-center">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency} ({CURRENCY_SYMBOLS[currency]})
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-center">
            <ArrowLeftRight className="h-6 w-6 text-gray-400" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency} ({CURRENCY_SYMBOLS[currency]})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter amount"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-sm">
                {CURRENCY_SYMBOLS[fromCurrency]}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleConvert}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>

        {result && (
          <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Direct Conversion</h3>
              <p className="mt-1 text-sm text-gray-600">
                Rate: {result.directRate.toFixed(4)}
              </p>
              <p className="text-xl font-semibold text-gray-900">
                {CURRENCY_SYMBOLS[toCurrency]}{result.directAmount.toFixed(2)}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Best Route</h3>
              <div className="flex items-center gap-2 mt-1">
                {result.bestRoute.map((currency, index) => (
                  <React.Fragment key={index}>
                    <span className="text-sm font-medium">{currency}</span>
                    {index < result.bestRoute.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Rate: {result.bestRate.toFixed(4)}
              </p>
              <p className="text-xl font-semibold text-gray-900">
                {CURRENCY_SYMBOLS[toCurrency]}{result.bestAmount.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}