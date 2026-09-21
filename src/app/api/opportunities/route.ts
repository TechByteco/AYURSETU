import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { calculateOpportunityMatch } from '@/lib/ai-matcher';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'usr_student_aarav';
    const type = searchParams.get('type');
    const remote = searchParams.get('remote');
    const search = searchParams.get('search');

    // 1. Fetch user skills
    const userSkills = await prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true }
    });

    const formattedUserSkills = userSkills.map((us) => ({
      skillId: us.skillId,
      level: us.level,
      name: us.skill.name
    }));

    // 2. Query opportunities
    const where: any = { status: 'ACTIVE' };
    if (type && type !== 'ALL') where.type = type;
    if (remote === 'true') where.remote = true;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { location: { contains: search } }
      ];
    }

    const opportunities = await prisma.opportunity.findMany({
      where,
      include: {
        organization: true,
        applications: {
          where: { userId }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // 3. Compute cosine match scores
    const opportunitiesWithScores = opportunities.map((opp) => {
      let requiredSkills = [];
      try {
        requiredSkills = JSON.parse(opp.requiredSkills || '[]');
      } catch (e) {
        requiredSkills = [];
      }

      const matchResult = calculateOpportunityMatch(formattedUserSkills, requiredSkills, opp.type, opp.title);

      return {
        id: opp.id,
        title: opp.title,
        type: opp.type,
        description: opp.description,
        stipend: opp.stipend,
        durationWeeks: opp.durationWeeks,
        location: opp.location,
        remote: opp.remote,
        mentorName: opp.mentorName,
        mentorTitle: opp.mentorTitle,
        nsqfLevel: opp.nsqfLevel,
        verified: opp.verified,
        organization: {
          id: opp.organization.id,
          name: opp.organization.name,
          type: opp.organization.type,
          verified: opp.organization.verified,
          ayushGridId: opp.organization.ayushGridId
        },
        requiredSkills,
        matchScore: matchResult.matchScore,
        matchPercentage: matchResult.matchPercentage,
        hiringTrack: matchResult.hiringTrack,
        subScores: matchResult.subScores,
        ncismReadiness: matchResult.ncismReadiness,
        topMissingSkills: matchResult.topMissingSkills,
        aiExplanation: matchResult.aiExplanation,
        hasApplied: opp.applications.length > 0,
        applicationStatus: opp.applications[0]?.status || null
      };
    });

    // Sort by match score descending
    opportunitiesWithScores.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({ opportunities: opportunitiesWithScores });
  } catch (error: any) {
    console.error('Opportunities GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orgId = 'inst_dabur_002',
      title,
      type = 'INTERNSHIP',
      description,
      requiredSkills = [],
      stipend = 15000,
      durationWeeks = 8,
      location = 'Remote',
      remote = false,
      mentorName,
      mentorTitle,
      nsqfLevel = 5
    } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const opportunity = await prisma.opportunity.create({
      data: {
        orgId,
        title,
        type,
        description,
        requiredSkills: JSON.stringify(requiredSkills),
        stipend: parseInt(stipend.toString()),
        durationWeeks: parseInt(durationWeeks.toString()),
        location,
        remote: Boolean(remote),
        mentorName,
        mentorTitle,
        nsqfLevel: parseInt(nsqfLevel.toString()),
        verified: true,
        status: 'ACTIVE'
      },
      include: { organization: true }
    });

    await logAudit({
      actorUserId: orgId,
      action: 'POST_OPPORTUNITY',
      entityType: 'Opportunity',
      entityId: opportunity.id,
      metadata: { title, type, nsqfLevel }
    });

    return NextResponse.json({
      success: true,
      message: 'Opportunity posted successfully!',
      opportunity
    });
  } catch (error: any) {
    console.error('Post opportunity error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
