import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { calculateOpportunityMatch } from '@/lib/ai-matcher';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'usr_student_aarav';

    const opp = await prisma.opportunity.findUnique({
      where: { id },
      include: {
        organization: true,
        applications: {
          include: {
            user: {
              include: { skills: { include: { skill: true } } }
            }
          }
        }
      }
    });

    if (!opp) {
      return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
    }

    let requiredSkills = [];
    try {
      requiredSkills = JSON.parse(opp.requiredSkills || '[]');
    } catch {
      requiredSkills = [];
    }

    // Compute match for the requesting user
    const userSkills = await prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true }
    });

    const formattedUserSkills = userSkills.map((us) => ({
      skillId: us.skillId,
      level: us.level,
      name: us.skill.name
    }));

    const matchResult = calculateOpportunityMatch(formattedUserSkills, requiredSkills, opp.type, opp.title);

    // Format applicants list (for recruiter view)
    const applicants = opp.applications.map((app) => ({
      id: app.id,
      userId: app.userId,
      candidateName: app.user.name,
      candidateEmail: app.user.email,
      stream: app.user.stream,
      year: app.user.year,
      status: app.status,
      matchScore: app.matchScore,
      matchPercentage: Math.round(app.matchScore * 100),
      resumeUrl: app.resumeUrl,
      coverLetter: app.coverLetter,
      feedback: app.feedback,
      appliedAt: app.createdAt
    }));

    // Sort applicants by matchScore descending
    applicants.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      opportunity: {
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
        status: opp.status,
        organization: opp.organization,
        requiredSkills,
        matchScore: matchResult.matchScore,
        matchPercentage: matchResult.matchPercentage,
        hiringTrack: matchResult.hiringTrack,
        subScores: matchResult.subScores,
        ncismReadiness: matchResult.ncismReadiness,
        topMissingSkills: matchResult.topMissingSkills,
        aiExplanation: matchResult.aiExplanation
      },
      applicants
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
