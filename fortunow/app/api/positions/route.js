// app/api/positions/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { marketId, side, quantity, price } = await request.json();
    const spent = quantity * price;

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (user.balance < spent) {
      return NextResponse.json(
        { error: 'Solde insuffisant' },
        { status: 400 }
      );
    }

    // Mettre à jour ou créer la position
    const position = await prisma.position.upsert({
      where: {
        userId_marketId_side: {
          userId: session.user.id,
          marketId,
          side
        }
      },
      update: {
        quantity: { increment: quantity },
        spent: { increment: spent }
      },
      create: {
        userId: session.user.id,
        marketId,
        side,
        quantity,
        price,
        spent
      }
    });

    // Mettre à jour le solde utilisateur
    await prisma.user.update({
      where: { id: session.user.id },
      data: { balance: { decrement: spent } }
    });

    // Enregistrer dans l'historique
    await prisma.tradeHistory.create({
      data: {
        userId: session.user.id,
        marketId,
        action: 'BUY',
        side,
        quantity,
        price,
        amount: spent
      }
    });

    return NextResponse.json(position);
  } catch (error) {
    console.error('Erreur création position:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const positions = await prisma.position.findMany({
      where: { userId: session.user.id },
      include: { market: true }
    });

    return NextResponse.json(positions);
  } catch (error) {
    console.error('Erreur fetch positions:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
