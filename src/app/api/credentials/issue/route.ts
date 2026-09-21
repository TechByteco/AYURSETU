import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { signCredentialMetadata, generateQrDataUrl } from '@/lib/credentials';
import { logAudit } from '@/lib/audit';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'usr_student_aarav';

    const credentials = await prisma.credential.findMany({
      where: { userId },
      orderBy: { issuedAt: 'desc' }
    });

    const enriched = await Promise.all(
      credentials.map(async (c) => {
        let metadata = {};
        try {
          metadata = JSON.parse(c.metadataJson);
        } catch {
          metadata = {};
        }

        const qrDataUrl = await generateQrDataUrl(c.qrToken);

        return {
          id: c.id,
          type: c.type,
          qrToken: c.qrToken,
          vcHash: c.vcHash,
          issuedAt: c.issuedAt,
          revoked: c.revoked,
          metadata,
          qrDataUrl
        };
      })
    );

    return NextResponse.json({ credentials: enriched });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId = 'usr_student_aarav',
      type = 'LOGBOOK_MILESTONE',
      competencyTitle = 'Panchakarma Clinical Mastery Milestone (Level PE)',
      issuerName = 'All India Institute of Ayurveda (AIIA)',
      ayushGridId = 'AG-INST-DELHI-001',
      mentorName = 'Prof. Dr. Arvind Sharma',
      nsqfLevel = 6,
      verifiedProcedures = 10
    } = body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const qrToken = `vc_tok_${crypto.randomBytes(8).toString('hex')}`;
    const issuanceDate = new Date().toISOString();

    const metadata = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://ayushgrid.gov.in/contexts/credentials/v1'
      ],
      id: `urn:uuid:${crypto.randomUUID()}`,
      type: ['VerifiableCredential', type],
      issuer: {
        id: `did:ayush:grid:${ayushGridId.toLowerCase()}`,
        name: issuerName,
        ayushGridId
      },
      issuanceDate,
      credentialSubject: {
        id: user.abhaId ? `did:abha:${user.abhaId}` : `did:ayush:${user.id}`,
        name: user.name,
        role: user.role,
        stream: user.stream,
        competencyTitle,
        verifiedProcedures: parseInt(verifiedProcedures.toString()),
        nsqfLevel: parseInt(nsqfLevel.toString()),
        mentorName,
        accreditationBody: 'Ministry of Ayush / AIIA'
      }
    };

    const metadataJson = JSON.stringify(metadata);
    const vcHash = signCredentialMetadata(metadata);

    const credential = await prisma.credential.create({
      data: {
        userId,
        type,
        qrToken,
        metadataJson,
        vcHash,
        issuedAt: new Date()
      }
    });

    await logAudit({
      actorUserId: 'usr_acad_sharma',
      action: 'ISSUE_CREDENTIAL',
      entityType: 'Credential',
      entityId: credential.id,
      metadata: { type, qrToken, competencyTitle }
    });

    const qrDataUrl = await generateQrDataUrl(qrToken);

    return NextResponse.json({
      success: true,
      message: 'Cryptographically signed Verifiable Credential issued to Skill Passport!',
      credential: {
        ...credential,
        metadata,
        qrDataUrl
      }
    });
  } catch (error: any) {
    console.error('Credential issue error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
