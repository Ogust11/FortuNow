// app/leaderboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Trophy, TrendingUp, Users, Calendar, Medal } from 'lucide-react';
import Header from '@/components/Header';

export default function LeaderboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [period, setPeriod] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && session?.user?.id) {
      fetchLeaderboard();
      setUser(session.user);
    }
  }, [status, session, router, period]);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`/api/leaderboard?period=${period}`);
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data);
      }
    } catch (error) {
      console.error('Erreur chargement leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du classement...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const userRank = leaderboard.find(u => u.id === session.user.id);
  const topThree = leaderboard.slice(0, 3);

  const getMedalColor = (rank) => {
    switch(rank) {
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-orange-600';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900">Classement</h1>
          </div>
          <p className="text-gray-600">Les meilleurs prédicteurs de la plateforme</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Tous les temps', value: 'all' },
              { label: 'Ce mois', value: 'month' },
              { label: 'Cette semaine', value: 'week' }
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setPeriod(opt.value)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  period === opt.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        {topThree.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">🏆 Top 3</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topThree.map((player, idx) => (
                <div
                  key={player.id}
                  className={`rounded-lg shadow-lg p-6 text-center transform transition hover:scale-105 ${
                    idx === 0
                      ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 col-span-full md:col-span-1 md:row-span-2'
                      : idx === 1
                      ? 'bg-gradient-to-br from-gray-300 to-gray-400'
                      : 'bg-gradient-to-br from-orange-300 to-orange-500'
                  }`}
                >
                  <div className={`text-5xl font-bold mb-4 ${getMedalColor(player.rank)}`}>
                    {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{player.name}</h3>
                  <div className="space-y-2 text-white text-sm">
                    <p className="font-semibold">€{player.totalProfit.toFixed(2)}</p>
                    <p className="opacity-90">Profit: {player.profitPercent}%</p>
                    <p className="opacity-90">{player.tradeCount} trades</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Classement complet ({leaderboard.length} joueurs)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Rang</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Joueur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Profit total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">% Profit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Trades</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Solde</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboard.map(player => (
                  <tr
                    key={player.id}
                    className={`hover:bg-gray-50 transition ${
                      player.id === session.user.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {player.rank <= 3 && (
                          <span className="text-lg">
                            {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                          </span>
                        )}
                        <span className="font-bold text-gray-900">{player.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className={`font-semibold ${
                          player.id === session.user.id ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {player.name}
                          {player.id === session.user.id && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded ml-2">
                              Vous
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-600">{player.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-lg font-bold ${
                        player.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        €{player.totalProfit.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        player.profitPercent >= 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {player.profitPercent >= 0 ? '+' : ''}{player.profitPercent}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-medium">{player.tradeCount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-medium">€{player.balance.toFixed(2)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Rank */}
        {userRank && userRank.rank > 3 && (
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Votre classement</p>
                <h3 className="text-3xl font-bold">#{userRank.rank}</h3>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90 mb-2">Profit total</p>
                <p className="text-2xl font-bold">€{userRank.totalProfit.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-12 h-12 opacity-20" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
