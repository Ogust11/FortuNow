// Fichier: app/api/markets/route.js
import { NextResponse } from 'next/server';

const MOCK_MARKETS = [
  {
    id: 'mkt_1',
    question: "Will the Fed cut rates in December?",
    category: "Economy",
    endDate: "Dec 18, 2024",
    chance: 75,
    image: "bank" 
  },
  {
    id: 'mkt_2',
    question: "Taylor Swift: Album of the Year at Grammys?",
    category: "Culture",
    endDate: "Feb 4, 2025",
    chance: 30,
    image: "music"
  },
  {
    id: 'mkt_3',
    question: "Temperature record broken in Paris this summer?",
    category: "Climate",
    endDate: "Sept 1, 2025",
    chance: 60,
    image: "sun"
  },
  {
    id: 'mkt_4',
    question: "Will Bitcoin exceed $100k in 2024?",
    category: "Crypto",
    endDate: "Dec 31, 2024",
    chance: 12,
    image: "bitcoin"
  }
];

export async function GET() {
  return NextResponse.json(MOCK_MARKETS);
}
