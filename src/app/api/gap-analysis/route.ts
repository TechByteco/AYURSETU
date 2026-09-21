import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { LEVEL_SCORES, generateSkillRoadmap } from '@/lib/ai-matcher';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const roleId = searchParams.get('roleId') || 'role_pk_tech';
    const userId = searchParams.get('userId') || 'usr_student_aarav';

    // 1. Fetch Target Role with RoleSkills
    const role = await prisma.role.findUnique({
      where: { id: roleId },
      include: {
        roleSkills: {
          include: { skill: true }
        }
      }
    });

    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }

    // 2. Fetch User Skills
    const userSkills = await prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true }
    });

    const userSkillMap: Record<string, { level: string; score: number }> = {};
    for (const us of userSkills) {
      userSkillMap[us.skillId] = {
        level: us.level,
        score: LEVEL_SCORES[us.level] ?? 0.25
      };
    }

    // 3. Compare and compute gaps
    const comparisons = [];
    const gapList = [];

    for (const rs of role.roleSkills) {
      const skill = rs.skill;
      const targetWeight = rs.weight || 1.0;
      const targetMinScore = targetWeight >= 0.9 ? 0.75 : 0.5; // Advanced or Intermediate
      const targetLevel = targetWeight >= 0.9 ? 'ADVANCED' : 'INTERMEDIATE';

      const userCurrent = userSkillMap[skill.id] || { level: 'NONE', score: 0.0 };
      const scoreDelta = Math.round((targetMinScore - userCurrent.score) * 100) / 100;
      const isMet = userCurrent.score >= targetMinScore;

      comparisons.push({
        skillId: skill.id,
        skillName: skill.name,
        domain: skill.domain,
        targetLevel,
        targetScore: targetMinScore,
        currentLevel: userCurrent.level,
        currentScore: userCurrent.score,
        isMet,
        gap: isMet ? 0 : scoreDelta
      });

      if (!isMet) {
        gapList.push({
          skillName: skill.name,
          requiredLevel: targetLevel,
          domain: skill.domain
        });
      }
    }

    // Overall role readiness
    const totalRequired = comparisons.length;
    const metCount = comparisons.filter((c) => c.isMet).length;
    const readinessPercentage = totalRequired > 0 ? Math.round((metCount / totalRequired) * 100) : 100;

    // 4. Generate structured step-by-step roadmap
    const roadmap = generateSkillRoadmap(role.title, gapList);

    // 5. Check if user already saved this to LearningPlan
    const existingPlan = await prisma.learningPlan.findFirst({
      where: { userId, roleId }
    });

    return NextResponse.json({
      role: {
        id: role.id,
        title: role.title,
        domain: role.domain,
        description: role.description
      },
      readinessPercentage,
      comparisons,
      gaps: gapList,
      roadmap,
      isSavedToPlan: !!existingPlan
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId = 'usr_student_aarav', roleId, gaps = [], roadmap = [] } = body;

    if (!roleId) {
      return NextResponse.json({ error: 'roleId is required' }, { status: 400 });
    }

    const plan = await prisma.learningPlan.create({
      data: {
        userId,
        roleId,
        gapSkills: JSON.stringify(gaps),
        roadmapJson: JSON.stringify(roadmap),
        status: 'ACTIVE'
      }
    });

    await logAudit({
      actorUserId: userId,
      action: 'ADD_TO_LEARNING_PLAN',
      entityType: 'LearningPlan',
      entityId: plan.id,
      metadata: { roleId, gapsCount: gaps.length }
    });

    return NextResponse.json({
      success: true,
      message: 'Role roadmap added to your active Learning Plan!',
      plan
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
