// app/markets/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Search, Filter, TrendingUp, Calendar, DollarSign, 
  X, Plus, AlertCircle, CheckCircle, Star
} from 'lucide-react';
import Header from '@/components/Header';

export default function MarketsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [markets, setMarkets] = useState([]);
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Modal
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [betAmount, setBetAmount] = useState(10);
  const [side, setSide] = useState('YES');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Get unique categories
  const categories = ['all', ...new Set(markets.map(m => m.category))];

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && session?.user?.id) {
      fetchMarkets();
      fetchFavorites();
      setUser(session.user);
    }
  }, [status, session, router]);

  const fetchFavorites = async () => {
    try {
      const res = await fetch('/api/favorites');
      if (res.ok) {
        const data = await res.json();
        setFavorites(data.map(f => f.marketId));
      }
    } catch (error) {
      console.error('Erreur chargement favoris:', error);
    }
  };

  const fetchMarkets = async () => {
    try {
      const res = await fetch('/api/markets');
      if (res.ok) {
        const data = await res.json();
        setMarkets(data);
      }
    } catch (error) {
      console.error('Erreur chargement marchés:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...markets];

    // Filtrer par favoris
    if (showOnlyFavorites) {
      filtered = filtered.filter(m => favorites.includes(m.id));
    }

    // Filtrer par recherche
    if (searchQuery.trim()) {
      filtered = filtered.filter(m =>
        m.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrer par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(m => m.category === selectedCategory);
    }

    // Filtrer par plage de prix
    filtered = filtered.filter(m => 
      m.chance >= priceRange.min && m.chance <= priceRange.max
    );

    // Trier
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'highest':
          return b.chance - a.chance;
        case 'lowest':
          return a.chance - b.chance;
        case 'closing':
          return new Date(a.endDate) - new Date(b.endDate);
        default:
          return 0;
      }
    });

    setFilteredMarkets(filtered);
  }, [searchQuery, selectedCategory, sortBy, priceRange, markets, favorites, showOnlyFavorites]);

  const toggleFavorite = async (marketId) => {
    try {
      if (favorites.includes(marketId)) {
        // Remove from favorites
        const res = await fetch(`/api/favorites?marketId=${marketId}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setFavorites(prev => prev.filter(id => id !== marketId));
        }
      } else {
        // Add to favorites
        const res = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ marketId })
        });
        if (res.ok) {
          setFavorites(prev => [...prev, marketId]);
        }
      }
    } catch (error) {
      console.error('Erreur toggle favoris:', error);
    }
  };

  const handlePlaceBet = async () => {
    if (!selectedMarket || !betAmount || betAmount <= 0) {
      setMessage({ type: 'error', text: 'Montant invalide' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const price = side === 'YES' 
        ? selectedMarket.chance / 100 
        : 1 - (selectedMarket.chance / 100);

      const res = await fetch('/api/positions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marketId: selectedMarket.id,
          side,
          quantity: betAmount / price,
          price
        })
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Pari placé avec succès !' });
        setSelectedMarket(null);
        setBetAmount(10);
        setSide('YES');
        setTimeout(() => fetchMarkets(), 1000);
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Erreur lors du pari' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur serveur' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des marchés...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marchés de prédiction</h1>
          <p className="text-gray-600">Découvrez et pariez sur les événements futurs</p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Recherche */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-2" />
                Recherche
              </label>
              <input
                type="text"
                placeholder="Chercher un marché..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'Toutes les catégories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Plage de prix */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Probabilité
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* Tri */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Trier par
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="newest">Plus récents</option>
                <option value="oldest">Plus anciens</option>
                <option value="highest">Probabilité haute</option>
                <option value="lowest">Probabilité basse</option>
                <option value="closing">Clôture proche</option>
              </select>
            </div>
          </div>

          {/* Résumé des filtres */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition ${
                showOnlyFavorites
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Star className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
              Favoris ({favorites.length})
            </button>
            {searchQuery && (
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Recherche: {searchQuery}
                <button onClick={() => setSearchQuery('')} className="hover:opacity-70">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {selectedCategory !== 'all' && (
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="hover:opacity-70">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="text-sm text-gray-600">
              {filteredMarkets.length} marché{filteredMarkets.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Marchés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map(market => (
            <div
              key={market.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
            >
              {/* Card Header with Favorite Button */}
              <div className="p-4 border-b border-gray-200 flex items-start justify-between">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {market.category}
                </span>
                <button
                  onClick={() => toggleFavorite(market.id)}
                  className="text-gray-400 hover:text-yellow-500 transition"
                >
                  <Star
                    className={`w-5 h-5 ${
                      favorites.includes(market.id) ? 'fill-yellow-500 text-yellow-500' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="p-6">
                {/* Question */}
                <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-3">
                  {market.question}
                </h3>

                {/* Stats */}
                <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Probabilité OUI</span>
                    <span className="text-lg font-bold text-green-600">{market.chance}%</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition"
                      style={{ width: `${market.chance}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Clôture</span>
                    <span className="text-sm font-medium text-gray-900">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {new Date(market.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Position utilisateur */}
                {market.userPosition && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-600 font-semibold">Votre position</p>
                    <p className="text-sm text-blue-900">
                      {market.userPosition.side} • {market.userPosition.quantity.toFixed(2)} parts
                    </p>
                  </div>
                )}

                {/* Button */}
                <button
                  onClick={() => setSelectedMarket(market)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2 group-hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  Placer un pari
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">Aucun marché ne correspond à vos critères</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceRange({ min: 0, max: 100 });
                setShowOnlyFavorites(false);
              }}
              className="text-blue-600 font-semibold hover:underline mt-4"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </main>

      {/* Modal Pari */}
      {selectedMarket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold text-gray-900">Placer un pari</h2>
                <button
                  onClick={() => setSelectedMarket(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">{selectedMarket.question}</p>
            </div>

            <div className="p-6 space-y-6">
              {message.text && (
                <div className={`p-4 rounded-lg flex items-start gap-3 ${
                  message.type === 'error'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-green-50 text-green-700 border border-green-200'
                }`}>
                  {message.type === 'error' ? (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm">{message.text}</p>
                </div>
              )}

              {/* Choix OUI/NON */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Je parie sur...
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSide('YES')}
                    className={`py-3 px-4 rounded-lg font-semibold transition ${
                      side === 'YES'
                        ? 'bg-green-100 text-green-800 border-2 border-green-600'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:border-green-300'
                    }`}
                  >
                    ✓ OUI
                  </button>
                  <button
                    onClick={() => setSide('NO')}
                    className={`py-3 px-4 rounded-lg font-semibold transition ${
                      side === 'NO'
                        ? 'bg-red-100 text-red-800 border-2 border-red-600'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:border-red-300'
                    }`}
                  >
                    ✗ NON
                  </button>
                </div>
              </div>

              {/* Montant */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant à parier (€)
                </label>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(parseFloat(e.target.value))}
                  min="1"
                  step="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Solde: €{user?.balance?.toFixed(2) || '0.00'}
                </p>
              </div>

              {/* Résumé */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">
                  Prix par part: €{(side === 'YES' ? selectedMarket.chance / 100 : 1 - (selectedMarket.chance / 100)).toFixed(2)}
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  Parts: {(betAmount / (side === 'YES' ? selectedMarket.chance / 100 : 1 - (selectedMarket.chance / 100))).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setSelectedMarket(null)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={handlePlaceBet}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50"
              >
                {isSubmitting ? 'En cours...' : 'Placer le pari'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
