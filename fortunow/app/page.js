// Fichier: app/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Globe, DollarSign, ArrowRight, Clock, Search, X, Zap } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('markets');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [markets, setMarkets] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  
  const [balance, setBalance] = useState(1000.00);
  const [portfolio, setPortfolio] = useState([]);
  const [betAmount, setBetAmount] = useState(10);
  const [side, setSide] = useState('YES');

  useEffect(() => {
    fetch('/api/markets')
      .then((res) => res.json())
      .then((data) => {
        setMarkets(data);
        setIsLoading(false);
      })
      .catch(err => console.error("Erreur API:", err));
  }, []);

  const getPrice = (market, direction) => {
    return direction === 'YES' ? market.chance / 100 : 1 - (market.chance / 100);
  };
  
  const potentialPayout = selectedMarket ? (betAmount / getPrice(selectedMarket, side)).toFixed(2) : "0.00";
  const potentialProfit = selectedMarket ? (potentialPayout - betAmount).toFixed(2) : "0.00";

  const handleBuy = () => {
    if (balance < betAmount) return alert("Insufficient funds");
    setBalance(prev => prev - betAmount);
    setPortfolio([...portfolio, {
      id: Date.now(),
      marketId: selectedMarket.id,
      question: selectedMarket.question,
      amount: betAmount,
      side: side,
      payout: potentialPayout
    }]);
    setSelectedMarket(null);
    alert(`Order executed on FortuNow! You bet $${betAmount} on ${side}`);
  };

  const Navbar = () => (
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
