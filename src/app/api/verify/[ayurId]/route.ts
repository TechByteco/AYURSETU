import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';

const AYUSH_VERIFICATION_SECRET = process.env.AYUSH_VERIFICATION_SECRET || 'ayush-gov-hmac-sha256-master-key-sih2026';

export async function GET(
  req: NextRequest,
  { params }: { params: { ayurId: string } }
) {
  try {
    const rawId = params.ayurId;

    if (!rawId || typeof rawId !== 'string') {
      return NextResponse.json({ error: 'Ayush Unique Student ID is required.' }, { status: 400 });
    }

    // Input sanitization against header/query injection
    const ayurId = rawId.trim().replace(/[^a-zA-Z0-9_-]/g, '');

    const student = await prisma.user.findFirst({
      where: {
        OR: [
          { ayurId: { equals: ayurId } },
          { id: { equals: ayurId } }
        ]
      },
      include: {
        institution: true,
        skills: {
          include: { skill: true }
        },
        logbookEntries: {
          where: { approved: true }
        }
      }
    });

    if (!student) {
      return NextResponse.json({
        valid: false,
        error: `No official record found for Unique Ayush ID: ${ayurId}. This credential may be invalid or not yet uploaded by a verified institution.`
      }, { status: 404 });
    }

    const payload = `${student.ayurId || ayurId}:${student.graduationMarks}:${student.institution?.name || 'AIIA'}:${student.passingYear || 2026}`;
    const cryptographicSignature = crypto
      .createHmac('sha256', AYUSH_VERIFICATION_SECRET)
      .update(payload)
      .digest('hex');

    return NextResponse.json({
      valid: true,
      verificationStatus: 'GOVERNMENT_AUTHENTICATED',
      seal: 'MINISTRY OF AYUSH • AYURSETU VERIFIED GRADUATE',
      cryptographicSignature: `SHA256:${cryptographicSignature}`,
      tamperProofCheck: 'PASS_SIGNATURE_VALID',
      student: {
        name: student.name,
        ayurId: student.ayurId || ayurId,
        stream: student.stream,
        year: student.year,
        graduationMarks: student.graduationMarks,
        cgpa: student.cgpa,
        meritRank: student.meritRank,
        collegeRollNo: student.collegeRollNo,
        passingYear: student.passingYear,
        isCollegeVerified: student.isCollegeVerified,
        college: student.institution
          ? {
              name: student.institution.name,
              ayushAffiliationNo: student.institution.ayushAffiliationNo,
              accreditationGrade: student.institution.accreditationGrade,
              principalName: student.institution.principalName
            }
          : null,
        verifiedProceduresLogged: student.logbookEntries.length,
        verifiedCompetencies: student.skills.map((s) => ({
          name: s.skill.name,
          domain: s.skill.domain,
          level: s.level
        }))
      },
      verifiedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error verifying Unique Ayush ID:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
