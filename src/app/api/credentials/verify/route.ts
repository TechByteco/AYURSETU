import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyCredentialSignature } from '@/lib/credentials';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({
        valid: false,
        error: 'Missing verification token parameter.'
      }, { status: 400 });
    }

    const credential = await prisma.credential.findUnique({
      where: { qrToken: token },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            stream: true,
            abhaId: true
          }
        }
      }
    });

    if (!credential) {
      return NextResponse.json({
        valid: false,
        error: 'No credential found with this QR verification token. It may be fraudulent or unissued.'
      }, { status: 404 });
    }

    if (credential.revoked) {
      return NextResponse.json({
        valid: false,
        revoked: true,
        error: 'This credential has been revoked by the issuing authority.'
      });
    }

    // Verify cryptographic signature integrity
    const isSignatureValid = verifyCredentialSignature(credential.metadataJson, credential.vcHash);

    let parsedMetadata: any = {};
    try {
      parsedMetadata = JSON.parse(credential.metadataJson);
    } catch {
      parsedMetadata = {};
    }

    return NextResponse.json({
      valid: isSignatureValid,
      signatureIntegrity: isSignatureValid ? 'PASSED_HMAC_SHA256' : 'FAILED_TAMPER_DETECTED',
      credential: {
        id: credential.id,
        type: credential.type,
        qrToken: credential.qrToken,
        vcHash: credential.vcHash,
        issuedAt: credential.issuedAt,
        holder: {
          name: credential.user.name,
          role: credential.user.role,
          stream: credential.user.stream,
          abhaId: credential.user.abhaId
        },
        metadata: parsedMetadata,
        blockchainAnchor: {
          network: 'Ayush Grid Permissioned Ledger (Simulated Testnet)',
          blockHash: `0x${credential.vcHash.slice(0, 32)}`,
          status: 'ANCHORED_AND_CONFIRMED'
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ valid: false, error: error.message }, { status: 500 });
  }
}
