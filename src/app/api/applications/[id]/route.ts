import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logAudit } from '@/lib/audit';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status, feedback, actorUserId = 'usr_ind_dabur' } = body;

    const existing = await prisma.application.findUnique({
      where: { id },
      include: { opportunity: true, user: true }
    });

    if (!existing) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        status: status || existing.status,
        feedback: feedback !== undefined ? feedback : existing.feedback
      }
    });

    await logAudit({
      actorUserId,
      action: 'UPDATE_APPLICATION_STATUS',
      entityType: 'Application',
      entityId: id,
      metadata: { previousStatus: existing.status, newStatus: status, feedback }
    });

    return NextResponse.json({
      success: true,
      message: `Applicant status updated to ${status}.`,
      application: updated
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
