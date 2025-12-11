// app/api/markets/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const MOCK_MARKETS = [
  {
    question: "Will the Fed cut rates in December?",
    category: "Economy",
    endDate: new Date("2024-12-18"),
    chance: 75,
    image: "bank" 
  },
  {
    question: "Taylor Swift: Album of the Year at Grammys?",
    category: "Culture",
    endDate: new Date("2025-02-04"),
    chance: 30,
    image: "music"
  },
  {
    question: "Temperature record broken in Paris this summer?",
    category: "Climate",
    endDate: new Date("2025-09-01"),
    chance: 60,
    image: "sun"
  },
  {
    question: "Will Bitcoin reach $100k before March 2025?",
    category: "Crypto",
    endDate: new Date("2025-03-01"),
    chance: 45,
    image: "bitcoin"
  }
];

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    let markets = await prisma.market.findMany();

    // Initialiser les marchés s'ils n'existent pas
    if (markets.length === 0) {
      markets = await Promise.all(
        MOCK_MARKETS.map(m => 
          prisma.market.create({ data: m })
        )
      );
    }

    // Ajouter les positions de l'utilisateur si connecté
    if (session?.user?.id) {
      const positions = await prisma.position.findMany({
        where: { userId: session.user.id }
      });

      markets = markets.map(market => {
        const userPosition = positions.find(p => p.marketId === market.id);
        return {
          ...market,
          userPosition: userPosition || null
        };
      });
    }

    return NextResponse.json(markets);
  } catch (error) {
    console.error('Erreur API markets:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
