// components/PortfolioStats.js
'use client';

import { BarChart3, TrendingUp, Target, CheckCircle } from 'lucide-react';

export default function PortfolioStats({ positions }) {
  const yesPositions = positions.filter(p => p.side === 'YES').length;
  const noPositions = positions.filter(p => p.side === 'NO').length;
  const avgPrice = positions.length > 0 
    ? (positions.reduce((sum, p) => sum + p.price, 0) / positions.length).toFixed(2)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        Statistiques du portefeuille
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">Paris "OUI"</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{yesPositions}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />
            <span className="text-sm text-gray-600">Paris "NON"</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{noPositions}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-gray-600">Prix moyen</span>
          </div>
          <span className="text-lg font-bold text-gray-900">€{avgPrice}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Total positions</span>
          </div>
          <span className="text-lg font-bold text-blue-900">{positions.length}</span>
        </div>
      </div>
    </div>
  );
}
