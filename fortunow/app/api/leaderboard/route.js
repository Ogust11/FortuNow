// app/api/leaderboard/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'all'; // all, month, week

    // Calculer la date limite selon la période
    let dateLimit = null;
    const now = new Date();
    
    if (period === 'week') {
      dateLimit = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (period === 'month') {
      dateLimit = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Récupérer tous les utilisateurs avec leurs performances
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        balance: true,
        createdAt: true,
        tradeHistory: {
          where: dateLimit ? { createdAt: { gte: dateLimit } } : undefined,
          select: { profit: true, amount: true }
        }
      }
    });

    // Calculer les statistiques pour chaque utilisateur
    const leaderboard = users
      .map(user => {
        const totalProfit = user.tradeHistory.reduce((sum, t) => sum + (t.profit || 0), 0);
        const totalTraded = user.tradeHistory.reduce((sum, t) => sum + t.amount, 0);
        const tradeCount = user.tradeHistory.length;
        const profitPercent = totalTraded > 0 ? ((totalProfit / totalTraded) * 100).toFixed(2) : 0;

        return {
          id: user.id,
          name: user.name || user.email.split('@')[0],
          email: user.email,
          balance: user.balance,
          totalProfit,
          profitPercent: parseFloat(profitPercent),
          tradeCount,
          joinDate: user.createdAt
        };
      })
      .sort((a, b) => b.totalProfit - a.totalProfit)
      .map((user, index) => ({ ...user, rank: index + 1 }));

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Erreur leaderboard:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
