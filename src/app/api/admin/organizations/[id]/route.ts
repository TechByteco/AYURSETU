import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logAudit } from '@/lib/audit';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json().catch(() => ({}));
    const { verified = true, ayushGridId } = body;

    const org = await prisma.institution.findUnique({ where: { id } });
    if (!org) {
      return NextResponse.json({ error: 'Institution not found' }, { status: 404 });
    }

    const updated = await prisma.institution.update({
      where: { id },
      data: {
        verified,
        ayushGridId: ayushGridId || org.ayushGridId || `AG-${org.type}-${Date.now().toString().slice(-4)}`
      }
    });

    await logAudit({
      actorUserId: 'usr_admin_ministry',
      action: 'VERIFY_ORGANIZATION',
      entityType: 'Institution',
      entityId: id,
      metadata: { verified, ayushGridId: updated.ayushGridId }
    });

    return NextResponse.json({
      success: true,
      message: `Institution ${updated.name} has been verified with Ministry Ayush Grid seal.`,
      institution: updated
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
