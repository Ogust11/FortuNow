// Fichier: app/page.js
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TrendingUp, Globe, DollarSign, ArrowRight, Zap, BarChart3, Lock, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Navigation */}
      <nav className="border-b border-blue-700 backdrop-blur-md bg-blue-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-white">FortuNow</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/auth/signin"
                className="text-blue-100 hover:text-white transition"
              >
                Se connecter
              </Link>
              <Link
                href="/auth/signup"
                className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:shadow-lg transition"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Prédisez le futur
            <span className="block text-blue-300">et gagnez de l'argent réel</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            FortuNow est la plateforme de prédiction où vos prédictions se transforment en profits.
            Pariez sur les événements futurs et constituez votre portefeuille.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:shadow-2xl transition transform hover:scale-105 flex items-center gap-2"
            >
              Démarrer gratuitement
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/auth/signin"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
            >
              Accédez à votre compte
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition">
            <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Marchés illimités</h3>
            <p className="text-blue-100">
              Accédez à des centaines de marchés dans l'économie, la culture, le climat, et plus encore.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition">
            <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-green-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Gains réels</h3>
            <p className="text-blue-100">
              Gagnez de véritables revenus basés sur la précision de vos prédictions.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition">
            <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-purple-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Sécurisé</h3>
            <p className="text-blue-100">
              Vos données et vos fonds sont protégés par les meilleurs standards de sécurité.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Comment ça marche</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Inscrivez-vous',
                description: 'Créez votre compte en 30 secondes'
              },
              {
                step: '2',
                title: 'Explorez',
                description: 'Découvrez des centaines de marchés'
              },
              {
                step: '3',
                title: 'Pariez',
                description: 'Placez vos paris et attendez les résultats'
              },
              {
                step: '4',
                title: 'Gagnez',
                description: 'Encaissez vos gains réels'
              }
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl text-white">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-blue-200 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-white mb-2">50K+</p>
            <p className="text-blue-200">Utilisateurs actifs</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-2">500M€</p>
            <p className="text-blue-200">Volume de paris</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-2">99.9%</p>
            <p className="text-blue-200">Disponibilité garantie</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à commencer ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers de prédicteurs et commencez à gagner aujourd'hui.
          </p>
          <Link
            href="/auth/signup"
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:shadow-2xl transition transform hover:scale-105 inline-flex items-center gap-2"
          >
            S'inscrire gratuitement
            <Zap className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-700 mt-16 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-blue-200 text-sm">
          <p>© 2024 FortuNow. Tous les droits réservés.</p>
          <p className="mt-2">Veuillez jouer de manière responsable.</p>
        </div>
      </footer>
    </div>
  );
}
    <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2 text-indigo-900">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white rotate-3">
            <Zap size={20} fill="currentColor" />
          </div>
          FortuNow
        </h1>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
          <button onClick={() => setActiveTab('markets')} className={`${activeTab === 'markets' ? 'text-indigo-900' : 'hover:text-indigo-900'}`}>Markets</button>
          <button onClick={() => setActiveTab('portfolio')} className={`${activeTab === 'portfolio' ? 'text-indigo-900' : 'hover:text-indigo-900'}`}>Portfolio</button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-sm font-semibold text-indigo-900">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          ${balance.toFixed(2)}
        </div>
      </div>
    </nav>
  );

  const BuyModal = () => {
    if (!selectedMarket) return null;
    const price = getPrice(selectedMarket, side);

    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-6 border-b border-slate-100 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold pr-8 text-indigo-950">{selectedMarket.question}</h2>
              <span className="text-xs text-slate-400 mt-1 block">FortuNow Verified Market</span>
            </div>
            <button onClick={() => setSelectedMarket(null)} className="p-1 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl">
              <button onClick={() => setSide('YES')} className={`py-2 rounded-lg text-sm font-bold transition-all ${side === 'YES' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500'}`}>YES ({(selectedMarket.chance)}¢)</button>
              <button onClick={() => setSide('NO')} className={`py-2 rounded-lg text-sm font-bold transition-all ${side === 'NO' ? 'bg-white text-red-700 shadow-sm' : 'text-slate-500'}`}>NO ({(100 - selectedMarket.chance)}¢)</button>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Amount ($)</label>
              <input type="number" value={betAmount} onChange={(e) => setBetAmount(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-lg outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 flex justify-between items-center">
               <span className="text-slate-900 font-bold">Potential Profit</span>
               <span className="text-green-600 font-black text-lg">+${potentialProfit}</span>
            </div>
            <button onClick={handleBuy} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">Place Order <ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'markets' ? (
          <>
            <div className="mb-10 text-center py-10">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-indigo-950">Predict future. <span className="text-indigo-600">Build fortune.</span></h2>
              <div className="max-w-xl mx-auto relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="text" placeholder="Search markets..." className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            {isLoading ? (
               <div className="text-center p-10 text-slate-400">Loading Markets...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {markets.map(market => (
                  <div key={market.id} onClick={() => setSelectedMarket(market)} className="group bg-white rounded-xl border border-slate-200 p-4 hover:border-indigo-500/50 hover:shadow-xl cursor-pointer flex flex-col justify-between h-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-indigo-500 transition-colors"></div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-2">{market.category}</div>
                      <h3 className="font-bold text-lg leading-tight mb-2 pl-2 group-hover:text-indigo-900">{market.question}</h3>
                      <p className="text-xs text-slate-500 mb-6 pl-2 flex items-center gap-1"><Clock size={12}/> Ends: {market.endDate}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-auto pl-2">
                      <div className="bg-green-50 p-2 rounded-lg text-center"><div className="text-xs text-green-700 font-semibold">YES</div><div className="text-lg font-bold text-green-800">{market.chance}%</div></div>
                      <div className="bg-red-50 p-2 rounded-lg text-center"><div className="text-xs text-red-700 font-semibold">NO</div><div className="text-lg font-bold text-red-800">{100 - market.chance}%</div></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-indigo-950">My Portfolio</h2>
            {portfolio.length === 0 ? <p className="text-slate-500">No active positions.</p> : 
              portfolio.map(pos => (
                 <div key={pos.id} className="bg-white p-4 mb-2 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                    <div><h4 className="font-bold text-sm text-indigo-950">{pos.question}</h4><span className="text-xs text-slate-500">Stake: ${pos.amount} on {pos.side}</span></div>
                    <div className="font-bold text-green-600">${pos.payout}</div>
                 </div>
              ))
            }
          </div>
        )}
      </main>
      <BuyModal />
    </div>
  );
}
