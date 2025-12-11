// components/TradeHistory.js
'use client';

import { 
  Calendar, DollarSign, TrendingUp, ArrowUpRight, ArrowDownLeft,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export default function TradeHistory({ trades }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(trades.length / itemsPerPage);

  const startIdx = currentPage * itemsPerPage;
  const paginatedTrades = trades.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Historique des trades
        </h3>
        <p className="text-sm text-gray-600 mt-1">Total: {trades.length} transactions</p>
      </div>

      {trades.length === 0 ? (
        <div className="p-12 text-center">
          <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Aucune transaction pour le moment</p>
          <p className="text-gray-400 text-sm mt-1">Commencez à trader pour voir votre historique ici</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Marché</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Côté</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Quantité</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Montant</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Profit/Perte</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedTrades.map((trade, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(trade.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                      {trade.marketId}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        trade.action === 'BUY' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {trade.action === 'BUY' ? (
                          <ArrowDownLeft className="w-3 h-3" />
                        ) : (
                          <ArrowUpRight className="w-3 h-3" />
                        )}
                        {trade.action}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        trade.side === 'YES' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {trade.side}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {trade.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      €{trade.amount?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-semibold ${
                        (trade.profit || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {(trade.profit || 0) >= 0 ? '+' : ''}
                        €{(trade.profit || 0).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} sur {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
