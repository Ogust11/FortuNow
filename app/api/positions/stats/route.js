// app/api/positions/stats/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Récupérer toutes les positions avec les marchés
    const positions = await prisma.position.findMany({
      where: { userId: session.user.id },
      include: { market: true }
    });

    // Récupérer l'historique des trades
    const trades = await prisma.tradeHistory.findMany({
      where: { userId: session.user.id }
    });

    // Calculer les statistiques
    const stats = {
      totalInvested: positions.reduce((sum, pos) => sum + pos.spent, 0),
      totalPositions: positions.length,
      yesPositions: positions.filter(p => p.side === 'YES').length,
      noPositions: positions.filter(p => p.side === 'NO').length,
      totalProfitLoss: trades.reduce((sum, t) => sum + (t.profit || 0), 0),
      totalTrades: trades.length,
      avgPositionSize: positions.length > 0 
        ? (positions.reduce((sum, pos) => sum + pos.spent, 0) / positions.length).toFixed(2)
        : 0,
      winRate: trades.length > 0
        ? ((trades.filter(t => t.profit > 0).length / trades.length) * 100).toFixed(2)
        : 0,
      profitFactor: (() => {
        const wins = trades.filter(t => t.profit > 0).reduce((sum, t) => sum + t.profit, 0);
        const losses = Math.abs(trades.filter(t => t.profit < 0).reduce((sum, t) => sum + t.profit, 0));
        return losses > 0 ? (wins / losses).toFixed(2) : wins > 0 ? Infinity : 0;
      })(),
      bestTrade: trades.length > 0 
        ? trades.reduce((max, t) => (t.profit > max.profit ? t : max)).profit.toFixed(2)
        : 0,
      worstTrade: trades.length > 0
        ? trades.reduce((min, t) => (t.profit < min.profit ? t : min)).profit.toFixed(2)
        : 0,
      avgProfit: trades.length > 0
        ? (trades.reduce((sum, t) => sum + (t.profit || 0), 0) / trades.length).toFixed(2)
        : 0
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erreur statistiques:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
