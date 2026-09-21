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
    const { mentorId = 'usr_acad_sharma' } = body;

    const entry = await prisma.logbookEntry.findUnique({
      where: { id }
    });

    if (!entry) {
      return NextResponse.json({ error: 'Logbook entry not found' }, { status: 404 });
    }

    const updated = await prisma.logbookEntry.update({
      where: { id },
      data: {
        approved: true,
        approvedAt: new Date(),
        mentorId
      }
    });

    await logAudit({
      actorUserId: mentorId,
      action: 'APPROVE_LOGBOOK_ENTRY',
      entityType: 'LogbookEntry',
      entityId: id,
      metadata: { competencyCode: entry.competencyCode, studentId: entry.userId }
    });

    return NextResponse.json({
      success: true,
      message: 'Logbook entry verified and signed by academic mentor.',
      entry: updated
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
