import { NextRequest, NextResponse } from 'next/server';
import { verifyMockAbha } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { logAudit } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      abhaId,
      stream,
      year,
      locationCity,
      locationState,
      availability,
      interests,
      consentFlags,
      otp
    } = body;

    let effectiveAbhaId = abhaId;
    // Validate mock ABHA ID if provided
    if (abhaId) {
      const abhaCheck = verifyMockAbha(abhaId);
      if (!abhaCheck.valid) {
        return NextResponse.json({ error: 'Invalid ABHA ID format. Expected 14 digits.' }, { status: 400 });
      }

      // If another user already has this abhaId, ensure uniqueness for demo testing
      const existingUserWithAbha = await prisma.user.findUnique({ where: { abhaId } });
      if (existingUserWithAbha && existingUserWithAbha.email !== email) {
        effectiveAbhaId = `${abhaId.slice(0, 12)}-${Date.now().toString().slice(-2)}`;
      }
    }

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    // Upsert User
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        phone,
        abhaId: effectiveAbhaId || undefined,
        stream: stream || 'BAMS',
        year: year ? parseInt(year) : 4,
        locationCity,
        locationState,
        availability,
        interests: JSON.stringify(interests || ['Clinical Ayurveda', 'Panchakarma']),
        consentFlags: JSON.stringify(consentFlags || {
          shareProfileWithInstitutions: true,
          shareSkillData: true,
          allowAnonymizedAnalytics: true
        })
      },
      create: {
        name,
        email,
        phone,
        abhaId: effectiveAbhaId || undefined,
        role: 'STUDENT',
        stream: stream || 'BAMS',
        year: year ? parseInt(year) : 4,
        locationCity: locationCity || 'New Delhi',
        locationState: locationState || 'Delhi',
        availability: availability || 'Immediate',
        interests: JSON.stringify(interests || ['Clinical Ayurveda', 'Panchakarma']),
        consentFlags: JSON.stringify(consentFlags || {
          shareProfileWithInstitutions: true,
          shareSkillData: true,
          allowAnonymizedAnalytics: true
        })
      }
    });

    await logAudit({
      actorUserId: user.id,
      action: 'ONBOARD_STUDENT',
      entityType: 'User',
      entityId: user.id,
      metadata: { stream, abhaVerified: !!abhaId }
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        abhaId: user.abhaId,
        stream: user.stream
      },
      message: 'Onboarding & ABHA identity registered successfully.'
    });
  } catch (error: any) {
    console.error('Onboarding error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
