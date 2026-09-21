import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logAudit } from '@/lib/audit';

const AYUSH_KEYWORD_RULES = [
  { name: 'Panchakarma Procedures & Purvakarma', domain: 'CLINICAL', regex: /panchakarma|shodhana|virechana|basti/i },
  { name: 'Shirodhara & Murdhni Taila', domain: 'CLINICAL', regex: /shirodhara|murdhni taila/i },
  { name: 'Nadi Pariksha (Pulse Diagnosis)', domain: 'CLINICAL', regex: /nadi pariksha|radial pulse|pulse diagnosis/i },
  { name: 'HPLC Standardization & Chromatography', domain: 'PHARMA', regex: /hplc|chromatography|fingerprinting/i },
  { name: 'GMP Documentation & Batch Manufacturing Records (BMR)', domain: 'PHARMA', regex: /gmp|bmr|good manufacturing/i },
  { name: 'Ayush Good Clinical Practice (GCP) Guidelines', domain: 'RESEARCH', regex: /gcp|clinical trial|ethics committee/i },
  { name: 'Ayush Grid Architecture & EMR Data Entry', domain: 'DIGITAL_HEALTH', regex: /ayush grid|emr|namaste portal/i },
  { name: 'Patient Communication & Empathic History Taking', domain: 'EMPLOYABILITY', regex: /communication|counseling|patient rapport/i },
  { name: 'Heavy Metal & Toxic Element Testing (AAS/ICP-MS)', domain: 'PHARMA', regex: /heavy metal|lead|mercury|aas/i }
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text = '', roleId = 'role_pk_tech', documentName = 'CCRAS_Curriculum_Update.pdf' } = body;

    // 1. Extract skills from text
    const extractedSkills: any[] = [];

    // Attempt calling Python FastAPI microservice if running
    try {
      const pyRes = await fetch('http://localhost:8000/extract-skills-from-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (pyRes.ok) {
        const pyData = await pyRes.json();
        if (pyData.skills && pyData.skills.length > 0) {
          extractedSkills.push(...pyData.skills);
        }
      }
    } catch {
      // Fallback to local rule engine
    }

    if (extractedSkills.length === 0) {
      for (const rule of AYUSH_KEYWORD_RULES) {
        if (rule.regex.test(text)) {
          extractedSkills.push({
            name: rule.name,
            domain: rule.domain,
            confidence: 0.88
          });
        }
      }
    }

    // 2. Fetch target role before update
    const roleBefore = await prisma.role.findUnique({
      where: { id: roleId },
      include: {
        roleSkills: {
          include: { skill: true }
        }
      }
    });

    if (!roleBefore) {
      return NextResponse.json({ error: 'Target role not found' }, { status: 404 });
    }

    // 3. For any matched skill that exists in DB, update or add RoleSkill
    const newAddedSkills: string[] = [];
    for (const item of extractedSkills) {
      const skill = await prisma.skill.findFirst({
        where: { name: { contains: item.name.split(' ')[0] } }
      });

      if (skill) {
        await prisma.roleSkill.upsert({
          where: {
            roleId_skillId: { roleId, skillId: skill.id }
          },
          update: {
            weight: 0.95
          },
          create: {
            roleId,
            skillId: skill.id,
            weight: 0.95
          }
        });
        newAddedSkills.push(skill.name);
      }
    }

    // 4. Fetch updated role
    const roleAfter = await prisma.role.findUnique({
      where: { id: roleId },
      include: {
        roleSkills: {
          include: { skill: true }
        }
      }
    });

    await logAudit({
      actorUserId: 'usr_admin_ministry',
      action: 'UPDATE_ONTOLOGY',
      entityType: 'RoleSkill',
      entityId: roleId,
      metadata: { documentName, extractedCount: extractedSkills.length, addedSkills: newAddedSkills }
    });

    return NextResponse.json({
      success: true,
      documentName,
      extractedSkills,
      roleId,
      roleTitle: roleBefore.title,
      skillsBeforeCount: roleBefore.roleSkills.length,
      skillsAfterCount: roleAfter?.roleSkills.length || roleBefore.roleSkills.length,
      roleSkillsBefore: roleBefore.roleSkills.map((rs) => ({ name: rs.skill.name, weight: rs.weight })),
      roleSkillsAfter: roleAfter?.roleSkills.map((rs) => ({ name: rs.skill.name, weight: rs.weight }))
    });
  } catch (error: any) {
    console.error('Ontology update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
