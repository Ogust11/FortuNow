// components/PerformanceChart.js
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function PerformanceChart({ trades }) {
  // Préparer les données cumulatives
  const prepareData = () => {
    const sortedTrades = [...trades].sort((a, b) => 
      new Date(a.createdAt) - new Date(b.createdAt)
    );

    let cumulative = 0;
    const data = [];
    const dailyData = {};

    sortedTrades.forEach(trade => {
      const date = new Date(trade.createdAt).toLocaleDateString();
      cumulative += trade.profit || 0;

      if (!dailyData[date]) {
        dailyData[date] = 0;
      }
      dailyData[date] += trade.profit || 0;

      data.push({
        date,
        cumulative: parseFloat(cumulative.toFixed(2)),
        profit: trade.profit || 0
      });
    });

    return data.length > 0 ? data : [{ date: 'Pas de données', cumulative: 0, profit: 0 }];
  };

  const data = prepareData();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        Performance au fil du temps
      </h3>

      <div className="overflow-x-auto">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              interval={Math.floor(data.length / 5)}
            />
            <YAxis 
              label={{ value: 'Profit (€)', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => `€${parseFloat(value).toFixed(2)}`}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
            />
            <Line 
              type="monotone" 
              dataKey="cumulative" 
              stroke="#2563eb" 
              strokeWidth={2}
              name="Profit cumulé"
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>Conseil:</strong> Suivez votre performance au fil du temps pour identifier les tendances et ajuster votre stratégie.
        </p>
      </div>
    </div>
  );
}
