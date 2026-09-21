import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get('state');
    const search = searchParams.get('search');

    const where: any = { type: 'COLLEGE', verified: true };
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { ayushAffiliationNo: { contains: search } },
        { ayushGridId: { contains: search } }
      ];
    }

    const colleges = await prisma.institution.findMany({
      where,
      include: {
        users: {
          where: { role: 'STUDENT' },
          select: { id: true, name: true, ayurId: true, stream: true, graduationMarks: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    const formattedColleges = colleges.map((col) => {
      let parsedAddress: any = {};
      try {
        parsedAddress = JSON.parse(col.address || '{}');
      } catch {
        parsedAddress = {};
      }

      return {
        id: col.id,
        name: col.name,
        type: col.type,
        verified: col.verified,
        ayushGridId: col.ayushGridId,
        ayushAffiliationNo: col.ayushAffiliationNo || 'AYUSH-NCISM-GEN-001',
        accreditationGrade: col.accreditationGrade || 'NCISM Category-1 / NAAC A++',
        sanctionedIntake: col.sanctionedIntake || 100,
        principalName: col.principalName || 'Prof. (Dr.) Dean Academics',
        contactEmail: col.contactEmail,
        contactPhone: col.contactPhone,
        address: parsedAddress,
        city: parsedAddress.city || 'New Delhi',
        state: parsedAddress.state || 'Delhi',
        qualifiedStudentsCount: col.users.length,
        students: col.users
      };
    });

    const filtered = state && state !== 'ALL'
      ? formattedColleges.filter((c) => c.state.toLowerCase() === state.toLowerCase())
      : formattedColleges;

    return NextResponse.json({ colleges: filtered, totalCount: filtered.length });
  } catch (error: any) {
    console.error('Error fetching verified colleges:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
