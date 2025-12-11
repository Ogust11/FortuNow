// app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  LogOut, TrendingUp, DollarSign, Activity, Target, 
  BarChart3, Clock, Calendar, Search, Filter, Zap
} from 'lucide-react';
import Header from '@/components/Header';
import PortfolioStats from '@/components/PortfolioStats';
import PerformanceChart from '@/components/PerformanceChart';
import TradeHistory from '@/components/TradeHistory';
import DetailedStats from '@/components/DetailedStats';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [positions, setPositions] = useState([]);
  const [trades, setTrades] = useState([]);
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && session?.user?.id) {
      fetchData();
    }
  }, [status, session, router]);

  const fetchData = async () => {
    try {
      const [posRes, tradesRes, statsRes] = await Promise.all([
        fetch('/api/positions'),
        fetch('/api/trade-history'),
        fetch('/api/positions/stats')
      ]);

      if (posRes.ok) {
        const posData = await posRes.json();
        setPositions(posData);
      }

      if (tradesRes.ok) {
        const tradesData = await tradesRes.json();
        setTrades(tradesData);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      setUser(session.user);
    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // Calculer les stats du portefeuille
  const totalInvested = positions.reduce((sum, pos) => sum + pos.spent, 0);
  const currentValue = positions.reduce((sum, pos) => sum + (pos.quantity * pos.price), 0);
  const profit = currentValue - totalInvested;
  const profitPercent = totalInvested > 0 ? ((profit / totalInvested) * 100).toFixed(2) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header avec stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Bienvenue, {user?.name || user?.email}</p>
            </div>
            <button
              onClick={() => signOut({ redirect: true })}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
          </div>

          {/* Stats principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Solde disponible</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    €{user?.balance?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <DollarSign className="w-10 h-10 text-blue-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Investi</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    €{totalInvested.toFixed(2)}
                  </p>
                </div>
                <Target className="w-10 h-10 text-orange-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Profit/Perte</p>
                  <p className={`text-2xl font-bold mt-2 ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    €{profit.toFixed(2)}
                  </p>
                  <p className={`text-xs mt-1 ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {profit >= 0 ? '+' : ''}{profitPercent}%
                  </p>
                </div>
                <TrendingUp className={`w-10 h-10 opacity-20 ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Positions actives</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{positions.length}</p>
                </div>
                <Activity className="w-10 h-10 text-purple-500 opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'stats'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Zap className="w-4 h-4 inline mr-2" />
              Statistiques détaillées
            </button>
            <button
              onClick={() => setActiveTab('trades')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'trades'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Activity className="w-4 h-4 inline mr-2" />
              Historique des trades
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PerformanceChart trades={trades} />
            </div>
            <div>
              <PortfolioStats positions={positions} />
            </div>
          </div>
        )}

        {activeTab === 'stats' && stats && (
          <DetailedStats stats={stats} />
        )}

        {activeTab === 'trades' && (
          <TradeHistory trades={trades} />
        )}
      </main>
    </div>
  );
}
