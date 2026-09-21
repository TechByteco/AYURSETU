import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'usr_student_aarav';
    const role = searchParams.get('role'); // if ACADEMICIAN, can view pending to approve

    let entries;
    if (role === 'ACADEMICIAN') {
      entries = await prisma.logbookEntry.findMany({
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      entries = await prisma.logbookEntry.findMany({
        where: { userId },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      });
    }

    // Compute domain coverage heatmap
    const domainStats: Record<string, { totalCases: number; approvedCases: number; doapBreakdown: Record<string, number> }> = {
      CLINICAL: { totalCases: 0, approvedCases: 0, doapBreakdown: { DO: 0, OA: 0, AP: 0, PE: 0 } },
      PHARMA: { totalCases: 0, approvedCases: 0, doapBreakdown: { DO: 0, OA: 0, AP: 0, PE: 0 } },
      RESEARCH: { totalCases: 0, approvedCases: 0, doapBreakdown: { DO: 0, OA: 0, AP: 0, PE: 0 } },
      WELLNESS: { totalCases: 0, approvedCases: 0, doapBreakdown: { DO: 0, OA: 0, AP: 0, PE: 0 } },
      DIGITAL_HEALTH: { totalCases: 0, approvedCases: 0, doapBreakdown: { DO: 0, OA: 0, AP: 0, PE: 0 } },
      EMPLOYABILITY: { totalCases: 0, approvedCases: 0, doapBreakdown: { DO: 0, OA: 0, AP: 0, PE: 0 } }
    };

    let totalCasesLogged = 0;
    let approvedCount = 0;
    let advancedProcedureCount = 0; // AP or PE

    for (const e of entries) {
      const d = e.domain || 'CLINICAL';
      if (!domainStats[d]) {
        domainStats[d] = { totalCases: 0, approvedCases: 0, doapBreakdown: { DO: 0, OA: 0, AP: 0, PE: 0 } };
      }

      domainStats[d].totalCases += e.count;
      totalCasesLogged += e.count;

      if (e.approved) {
        domainStats[d].approvedCases += e.count;
        approvedCount += e.count;
      }

      const lvl = e.level || 'DO';
      domainStats[d].doapBreakdown[lvl] = (domainStats[d].doapBreakdown[lvl] || 0) + e.count;

      if (lvl === 'AP' || lvl === 'PE') {
        advancedProcedureCount += e.count;
      }
    }

    const milestoneEligible = advancedProcedureCount >= 10;

    return NextResponse.json({
      entries,
      summary: {
        totalEntries: entries.length,
        totalCasesLogged,
        approvedCount,
        pendingCount: entries.filter((e) => !e.approved).length,
        advancedProcedureCount,
        milestoneEligible
      },
      domainStats
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId = 'usr_student_aarav',
      competencyCode,
      competencyName,
      domain = 'CLINICAL',
      level = 'PE',
      count = 1,
      notes = '',
      attachments = [],
      noPatientIdentifiableInfo = true
    } = body;

    if (!competencyCode || !competencyName) {
      return NextResponse.json({ error: 'Competency code and name are required' }, { status: 400 });
    }

    if (!noPatientIdentifiableInfo) {
      return NextResponse.json({
        error: 'You must confirm that no patient-identifiable information (PHI) is included in the logbook entry.'
      }, { status: 400 });
    }

    const entry = await prisma.logbookEntry.create({
      data: {
        userId,
        competencyCode,
        competencyName,
        domain,
        level,
        count: parseInt(count.toString()) || 1,
        notes,
        attachments: JSON.stringify(attachments),
        mentorId: 'usr_acad_sharma',
        approved: false,
        noPatientIdentifiableInfo: true
      }
    });

    await logAudit({
      actorUserId: userId,
      action: 'CREATE_LOGBOOK_ENTRY',
      entityType: 'LogbookEntry',
      entityId: entry.id,
      metadata: { competencyCode, level, count }
    });

    return NextResponse.json({
      success: true,
      message: 'Competency procedure logged in e-Logbook! Awaiting mentor review.',
      entry
    });
  } catch (error: any) {
    console.error('Logbook POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
