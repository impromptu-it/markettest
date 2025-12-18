import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { marketId, side, shares, userId = 1 } = await req.json();

  const market = await db.market.findUnique({ where: { id: marketId } });
  if (!market) return NextResponse.json({ error: 'Market not found' }, { status: 404 });

  const price = side === 'yes'
    ? market.noShares / (market.yesShares + market.noShares)
    : market.yesShares / (market.yesShares + market.noShares);

  const cost = price * shares;

  const [bet] = await db.$transaction([
    db.bet.create({ data: { userId, marketId, side, shares, price } }),
    db.market.update({
      where: { id: marketId },
      data: side === 'yes'
        ? { yesShares: { increment: shares } }
        : { noShares: { increment: shares } },
    }),
  ]);

  return NextResponse.json({ bet, cost });
}
