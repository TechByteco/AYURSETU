import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const roles = await prisma.role.findMany({
      include: {
        roleSkills: {
          include: { skill: true }
        }
      },
      orderBy: { title: 'asc' }
    });

    return NextResponse.json({ roles });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
