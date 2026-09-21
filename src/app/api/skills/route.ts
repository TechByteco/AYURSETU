import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');

    const where: any = {};
    if (domain) {
      where.domain = domain;
    }

    const skills = await prisma.skill.findMany({
      where,
      orderBy: { name: 'asc' }
    });

    return NextResponse.json({ skills });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
