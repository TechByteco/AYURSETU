import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logAudit } from '@/lib/audit';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const college = await prisma.institution.findUnique({
      where: { id },
      include: {
        users: {
          where: { role: 'STUDENT' },
          include: {
            skills: {
              include: { skill: true }
            }
          },
          orderBy: { meritRank: 'asc' }
        }
      }
    });

    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }

    const students = college.users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      ayurId: u.ayurId,
      stream: u.stream,
      graduationMarks: u.graduationMarks,
      cgpa: u.cgpa,
      meritRank: u.meritRank,
      collegeRollNo: u.collegeRollNo,
      passingYear: u.passingYear,
      isCollegeVerified: u.isCollegeVerified,
      abhaId: u.abhaId,
      skills: u.skills.map((s) => ({
        skillId: s.skillId,
        skillName: s.skill.name,
        domain: s.skill.domain,
        level: s.level
      }))
    }));

    return NextResponse.json({
      college: {
        id: college.id,
        name: college.name,
        ayushAffiliationNo: college.ayushAffiliationNo,
        accreditationGrade: college.accreditationGrade,
        sanctionedIntake: college.sanctionedIntake,
        principalName: college.principalName
      },
      students,
      totalQualified: students.length
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const college = await prisma.institution.findUnique({
      where: { id }
    });

    if (!college) {
      return NextResponse.json({ error: 'Verified college not found' }, { status: 404 });
    }

    const collegeCode = college.name.includes('AIIA')
      ? 'AIIA'
      : college.name.includes('NIA')
      ? 'NIA'
      : college.name.includes('BHU')
      ? 'BHU'
      : college.name.includes('ITRA')
      ? 'ITRA'
      : 'AYUR';

    const inputList = Array.isArray(body.students)
      ? body.students
      : [body];

    if (!inputList.length || !inputList[0].name || !inputList[0].email || !inputList[0].graduationMarks) {
      return NextResponse.json(
        { error: 'Name, email, and graduation marks percentage are required for each student.' },
        { status: 400 }
      );
    }

    const enrolledStudents = [];

    for (const item of inputList) {
      const {
        name,
        email,
        phone,
        stream = 'BAMS',
        graduationMarks,
        cgpa,
        meritRank,
        collegeRollNo,
        passingYear = 2026,
        skills = []
      } = item;

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const ayurId = `AYUR-${passingYear}-${collegeCode}-${randomSuffix}`;
      const mockAbha = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      let student;
      if (existingUser) {
        student = await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            name,
            phone: phone || existingUser.phone,
            ayurId: existingUser.ayurId || ayurId,
            graduationMarks: parseFloat(graduationMarks.toString()),
            cgpa: cgpa ? parseFloat(cgpa.toString()) : (existingUser.cgpa || 8.5),
            meritRank: meritRank ? parseInt(meritRank.toString()) : existingUser.meritRank,
            collegeRollNo: collegeRollNo || existingUser.collegeRollNo,
            passingYear: parseInt(passingYear.toString()),
            isCollegeVerified: true,
            institutionId: college.id
          }
        });
      } else {
        student = await prisma.user.create({
          data: {
            name,
            email,
            phone: phone || '+91-9876543299',
            abhaId: mockAbha,
            ayurId,
            graduationMarks: parseFloat(graduationMarks.toString()),
            cgpa: cgpa ? parseFloat(cgpa.toString()) : parseFloat((parseFloat(graduationMarks.toString()) / 9.5).toFixed(1)),
            meritRank: meritRank ? parseInt(meritRank.toString()) : 5,
            collegeRollNo: collegeRollNo || `${collegeCode}/${stream}/${passingYear}/${randomSuffix}`,
            passingYear: parseInt(passingYear.toString()),
            isCollegeVerified: true,
            role: 'STUDENT',
            stream,
            year: 4,
            institutionId: college.id,
            locationCity: 'New Delhi',
            locationState: 'Delhi',
            consentFlags: JSON.stringify({
              shareProfileWithInstitutions: true,
              shareSkillData: true,
              allowAnonymizedAnalytics: true
            })
          }
        });
      }

      // Attach verified competencies evaluated by college
      if (Array.isArray(skills) && skills.length > 0) {
        for (const sk of skills) {
          let matchedSkillId: string | null = null;
          if (typeof sk === 'string') {
            const foundSkill = await prisma.skill.findFirst({
              where: {
                OR: [
                  { id: sk },
                  { name: { contains: sk.slice(0, 8) } }
                ]
              }
            });
            matchedSkillId = foundSkill ? foundSkill.id : null;
          } else if (sk && typeof sk === 'object' && sk.skillId) {
            matchedSkillId = sk.skillId;
          }

          if (matchedSkillId) {
            await prisma.userSkill.upsert({
              where: {
                userId_skillId: {
                  userId: student.id,
                  skillId: matchedSkillId
                }
              },
              create: {
                userId: student.id,
                skillId: matchedSkillId,
                level: typeof sk === 'object' && sk.level ? sk.level : 'INTERMEDIATE',
                evidenceCount: 3
              },
              update: {
                level: typeof sk === 'object' && sk.level ? sk.level : 'INTERMEDIATE'
              }
            });
          }
        }
      }

      await logAudit({
        actorUserId: college.id,
        action: 'COLLEGE_UPLOAD_QUALIFIED_STUDENT',
        entityType: 'User',
        entityId: student.id,
        metadata: { ayurId, graduationMarks, collegeRollNo }
      });

      enrolledStudents.push({
        id: student.id,
        name: student.name,
        email: student.email,
        ayurId: student.ayurId,
        graduationMarks: student.graduationMarks,
        cgpa: student.cgpa,
        collegeRollNo: student.collegeRollNo,
        collegeName: college.name
      });
    }

    return NextResponse.json({
      success: true,
      message: `${enrolledStudents.length} student(s) verified and minted Unique Ayush IDs.`,
      student: enrolledStudents[0],
      enrolledStudents
    });
  } catch (error: any) {
    console.error('Error uploading student:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
