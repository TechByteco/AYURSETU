import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { calculateOpportunityMatch } from '@/lib/ai-matcher';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'usr_student_aarav';

    const applications = await prisma.application.findMany({
      where: { userId },
      include: {
        opportunity: {
          include: { organization: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formatted = applications.map((app) => ({
      id: app.id,
      opportunityId: app.opportunityId,
      title: app.opportunity.title,
      type: app.opportunity.type,
      organizationName: app.opportunity.organization.name,
      location: app.opportunity.location,
      remote: app.opportunity.remote,
      stipend: app.opportunity.stipend,
      durationWeeks: app.opportunity.durationWeeks,
      status: app.status,
      matchScore: app.matchScore,
      matchPercentage: Math.round(app.matchScore * 100),
      resumeUrl: app.resumeUrl,
      coverLetter: app.coverLetter,
      feedback: app.feedback,
      appliedAt: app.createdAt,
      updatedAt: app.updatedAt
    }));

    return NextResponse.json({ applications: formatted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      opportunityId,
      userId = 'usr_student_aarav',
      coverLetter = 'I am keen to apply my clinical and pharmacopoeial competencies in this role.',
      resumeUrl = 'https://storage.ayushbridge.gov.in/resumes/default_resume.pdf'
    } = body;

    if (!opportunityId) {
      return NextResponse.json({ error: 'opportunityId is required' }, { status: 400 });
    }

    // Check if already applied
    const existing = await prisma.application.findUnique({
      where: {
        opportunityId_userId: { opportunityId, userId }
      }
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Already applied to this opportunity.',
        application: existing
      });
    }

    // Calculate match score
    const opp = await prisma.opportunity.findUnique({ where: { id: opportunityId } });
    if (!opp) {
      return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
    }

    let requiredSkills = [];
    try {
      requiredSkills = JSON.parse(opp.requiredSkills || '[]');
    } catch {
      requiredSkills = [];
    }

    const userSkills = await prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true }
    });

    const formattedUserSkills = userSkills.map((us) => ({
      skillId: us.skillId,
      level: us.level,
      name: us.skill.name
    }));

    const matchResult = calculateOpportunityMatch(formattedUserSkills, requiredSkills);

    const application = await prisma.application.create({
      data: {
        opportunityId,
        userId,
        status: 'APPLIED',
        matchScore: matchResult.matchScore,
        coverLetter,
        resumeUrl
      },
      include: {
        opportunity: {
          include: { organization: true }
        }
      }
    });

    await logAudit({
      actorUserId: userId,
      action: 'APPLY_OPPORTUNITY',
      entityType: 'Application',
      entityId: application.id,
      metadata: { opportunityId, matchScore: matchResult.matchScore }
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      application
    });
  } catch (error: any) {
    console.error('Apply error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
