import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const markets = await db.market.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(markets);
}

export async function POST(req: Request) {
  try {
    const { question, creatorId = 1 } = await req.json();
    const market = await db.market.create({
      data: { question, creatorId },
    });
    return NextResponse.json({ id: market.id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
