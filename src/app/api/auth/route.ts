import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username } = await req.json();

  let user = await db.user.findUnique({ where: { username } });
  if (!user) {
    user = await db.user.create({ data: { username } });
  }

  return NextResponse.json({ id: user.id, username: user.username });
}
