import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { LEVEL_SCORES } from '@/lib/ai-matcher';
import { logAudit } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId = 'usr_student_aarav', answers = [] } = body;

    // 1. Upsert UserSkill rows
    for (const ans of answers) {
      const { skillId, level = 'INTERMEDIATE' } = ans;
      if (!skillId) continue;

      await prisma.userSkill.upsert({
        where: {
          userId_skillId: { userId, skillId }
        },
        update: {
          level,
          evidenceCount: { increment: 1 }
        },
        create: {
          userId,
          skillId,
          level,
          evidenceCount: 1
        }
      });
    }

    // 2. Fetch all user's updated skills
    const userSkills = await prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true }
    });

    const userSkillMap: Record<string, number> = {};
    for (const us of userSkills) {
      userSkillMap[us.skillId] = LEVEL_SCORES[us.level] ?? 0.25;
    }

    // 3. Compute readinessScore for all roles
    const roles = await prisma.role.findMany({
      include: {
        roleSkills: {
          include: { skill: true }
        }
      }
    });

    const recommendations = roles.map((role) => {
      if (!role.roleSkills || role.roleSkills.length === 0) {
        return {
          roleId: role.id,
          title: role.title,
          domain: role.domain,
          readinessScore: 0.5,
          totalSkills: 0,
          matchedSkills: 0
        };
      }

      let totalWeight = 0;
      let achievedWeight = 0;
      let matchedCount = 0;

      for (const rs of role.roleSkills) {
        const weight = rs.weight || 1.0;
        totalWeight += weight;

        const userScore = userSkillMap[rs.skillId] || 0.0;
        achievedWeight += userScore * weight;

        if (userScore >= 0.5) {
          matchedCount++;
        }
      }

      const readinessScore = totalWeight > 0 ? Math.round((achievedWeight / totalWeight) * 100) / 100 : 0.5;

      return {
        roleId: role.id,
        title: role.title,
        domain: role.domain,
        readinessScore,
        readinessPercent: Math.round(readinessScore * 100),
        totalSkills: role.roleSkills.length,
        matchedSkills: matchedCount
      };
    });

    recommendations.sort((a, b) => b.readinessScore - a.readinessScore);

    await logAudit({
      actorUserId: userId,
      action: 'SUBMIT_ASSESSMENT',
      entityType: 'UserSkill',
      entityId: userId,
      metadata: { totalAnswered: answers.length, topRole: recommendations[0]?.title }
    });

    return NextResponse.json({
      success: true,
      message: 'Assessment analyzed and skill vectors updated.',
      userSkillsCount: userSkills.length,
      topRecommendedRoles: recommendations.slice(0, 3),
      allRoleReadiness: recommendations
    });
  } catch (error: any) {
    console.error('Assessment submit error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
