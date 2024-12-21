import React from 'react';
import { CurrencyPair, CURRENCIES } from '../types/currency';

interface CurrencyTableProps {
  pairs: CurrencyPair[];
}

export function CurrencyTable({ pairs }: CurrencyTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              From
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rate
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pairs.map((pair, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {pair.from}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {pair.to}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {pair.rate.toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}