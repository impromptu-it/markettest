import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const market = await db.market.findUnique({ where: { id: parseInt(params.id) } });
  if (!market) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const yesPrice = market.noShares / (market.yesShares + market.noShares);
  const noPrice = market.yesShares / (market.yesShares + market.noShares);

  return NextResponse.json({ ...market, yesPrice, noPrice });
}
