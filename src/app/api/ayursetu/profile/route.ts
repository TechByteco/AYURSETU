import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { calculateOpportunityMatch } from '@/lib/ai-matcher';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'usr_student_aarav';

    // 1. Fetch Student Profile with College & Skills
    const student = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        institution: true,
        skills: {
          include: { skill: true }
        },
        applications: {
          include: {
            opportunity: {
              include: { organization: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        logbookEntries: {
          where: { approved: true }
        }
      }
    });

    if (!student) {
      return NextResponse.json({ error: 'Student record not found' }, { status: 404 });
    }

    const formattedSkills = student.skills.map((s) => ({
      skillId: s.skillId,
      name: s.skill.name,
      domain: s.skill.domain,
      level: s.level,
      evidenceCount: s.evidenceCount
    }));

    // 2. Background AI Recommendation Engine:
    // Fetch all active opportunities and rank them personalized for this student
    const activeOpportunities = await prisma.opportunity.findMany({
      where: { status: 'ACTIVE' },
      include: { organization: true }
    });

    const studentGradMarks = student.graduationMarks || 75.0;

    const scoredRecommendations = activeOpportunities.map((opp) => {
      let requiredSkills = [];
      try {
        requiredSkills = JSON.parse(opp.requiredSkills || '[]');
      } catch {
        requiredSkills = [];
      }

      // Calculate multidimensional match
      const matchResult = calculateOpportunityMatch(
        formattedSkills,
        requiredSkills,
        opp.type,
        opp.title
      );

      // Check academic merit eligibility
      const minRequiredMarks = opp.minGraduationMarks || 55.0;
      const meetsMeritCutoff = studentGradMarks >= minRequiredMarks;
      
      // Bonus if student exceeds cutoff
      const meritBonus = meetsMeritCutoff ? 0.05 : -0.15;
      const compositeMatchScore = Math.min(
        1.0,
        Math.max(0.0, Math.round((matchResult.matchScore + meritBonus) * 100) / 100)
      );

      return {
        id: opp.id,
        title: opp.title,
        type: opp.type,
        organization: {
          name: opp.organization.name,
          type: opp.organization.type,
          city: opp.location
        },
        stipend: opp.stipend,
        durationWeeks: opp.durationWeeks,
        location: opp.location,
        remote: opp.remote,
        minGraduationMarks: minRequiredMarks,
        meetsMeritCutoff,
        nsqfLevel: opp.nsqfLevel,
        matchScore: compositeMatchScore,
        compositeScore: compositeMatchScore,
        matchPercentage: Math.round(compositeMatchScore * 100),
        hiringTrack: matchResult.hiringTrack,
        subScores: matchResult.subScores,
        ncismReadiness: matchResult.ncismReadiness,
        aiExplanation: matchResult.aiExplanation,
        topMissingSkills: matchResult.topMissingSkills,
        hasApplied: student.applications.some((app) => app.opportunityId === opp.id)
      };
    });

    // Sort descending by personalized match score
    scoredRecommendations.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        ayurId: student.ayurId || 'AYUR-2026-AIIA-0042',
        stream: student.stream || 'BAMS',
        year: student.year || 4,
        graduationMarks: student.graduationMarks || 84.5,
        cgpa: student.cgpa || 8.8,
        meritRank: student.meritRank || 3,
        collegeRollNo: student.collegeRollNo || 'AIIA/BAMS/2022/042',
        passingYear: student.passingYear || 2026,
        isCollegeVerified: student.isCollegeVerified || true,
        abhaId: student.abhaId,
        college: student.institution
          ? {
              id: student.institution.id,
              name: student.institution.name,
              ayushAffiliationNo: student.institution.ayushAffiliationNo || 'AYUSH-NCISM-DL-001',
              accreditationGrade: student.institution.accreditationGrade || 'NCISM Category-1 / NAAC A++',
              principalName: student.institution.principalName || 'Prof. (Dr.) Tanuja Nesari'
            }
          : null,
        verifiedSkills: formattedSkills,
        verifiedProceduresCount: student.logbookEntries.length
      },
      recommendations: scoredRecommendations,
      aiRecommendations: scoredRecommendations,
      applications: student.applications.map((app) => ({
        id: app.id,
        opportunityId: app.opportunityId,
        opportunityTitle: app.opportunity.title,
        organizationName: app.opportunity.organization.name,
        status: app.status,
        matchScore: app.matchScore,
        appliedAt: app.createdAt,
        feedback: app.feedback
      }))
    });
  } catch (error: any) {
    console.error('Error fetching AYURSETU profile:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
