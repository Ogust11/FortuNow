// components/DetailedStats.js
'use client';

import { BarChart3, TrendingUp, TrendingDown, Target, Zap, Award } from 'lucide-react';

export default function DetailedStats({ stats }) {
  const statCards = [
    {
      icon: Target,
      label: 'Capital investi',
      value: `€${parseFloat(stats.totalInvested).toFixed(2)}`,
      color: 'blue'
    },
    {
      icon: TrendingUp,
      label: 'Profit/Perte',
      value: `€${parseFloat(stats.totalProfitLoss).toFixed(2)}`,
      color: stats.totalProfitLoss >= 0 ? 'green' : 'red'
    },
    {
      icon: Zap,
      label: 'Taux de victoire',
      value: `${parseFloat(stats.winRate).toFixed(1)}%`,
      color: 'purple'
    },
    {
      icon: Award,
      label: 'Meilleur trade',
      value: `€${parseFloat(stats.bestTrade).toFixed(2)}`,
      color: 'green'
    },
    {
      icon: TrendingDown,
      label: 'Pire trade',
      value: `€${parseFloat(stats.worstTrade).toFixed(2)}`,
      color: 'red'
    },
    {
      icon: BarChart3,
      label: 'Profit moyen',
      value: `€${parseFloat(stats.avgProfit).toFixed(2)}`,
      color: 'indigo'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      red: 'bg-red-50 border-red-200 text-red-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      orange: 'bg-orange-50 border-orange-200 text-orange-700'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        Statistiques détaillées
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          const colorClass = getColorClasses(stat.color);

          return (
            <div key={idx} className={`border rounded-lg p-4 ${colorClass}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-medium opacity-75 mb-1">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 opacity-20 flex-shrink-0" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Row */}
      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-gray-600 mb-1">Total positions</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalPositions}</p>
          <p className="text-xs text-gray-500 mt-1">
            {stats.yesPositions} OUI • {stats.noPositions} NON
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Total trades</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalTrades}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Taille moyenne</p>
          <p className="text-2xl font-bold text-gray-900">€{parseFloat(stats.avgPositionSize).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Profit Factor</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats.profitFactor === Infinity ? '∞' : parseFloat(stats.profitFactor).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
