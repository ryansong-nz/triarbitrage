import React, { useEffect, useState } from 'react';
import { CurrencyTable } from './components/CurrencyTable';
import { CurrencyConverter } from './components/CurrencyConverter';
import { CurrencyPair } from './types/currency';
import { fetchCurrencyPairs } from './api/currencyApi';
import { Coins } from 'lucide-react';

function App() {
  const [pairs, setPairs] = useState<CurrencyPair[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPairs = async () => {
      try {
        const data = await fetchCurrencyPairs();
        setPairs(data);
      } catch (error) {
        console.error('Failed to fetch currency pairs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPairs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Coins className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Currency Exchange
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Currency Converter
            </h2>
            <CurrencyConverter />
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Current Exchange Rates
            </h2>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading exchange rates...</p>
              </div>
            ) : (
              <CurrencyTable pairs={pairs} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;