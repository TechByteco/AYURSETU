import crypto from 'crypto';
import QRCode from 'qrcode';

const VC_SECRET = process.env.VC_SIGNING_SECRET || 'ayush_grid_w3c_vc_hmac_secret_master_key';

export interface W3CCredentialSubject {
  id: string; // e.g. did:abha:91-4521-8890-1234
  name: string;
  role: string;
  stream?: string;
  competencyTitle: string;
  verifiedProcedures?: number;
  scoreAchieved?: string;
  nsqfLevel?: number;
  durationWeeks?: number;
  mentorName?: string;
  accreditationBody?: string;
}

export interface W3CVerifiableCredential {
  '@context': string[];
  id: string; // urn:uuid:...
  type: string[];
  issuer: {
    id: string;
    name: string;
    ayushGridId?: string;
  };
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: W3CCredentialSubject;
}

/**
 * Computes a cryptographic HMAC-SHA256 signature for credential metadata
 */
export function signCredentialMetadata(metadata: W3CVerifiableCredential | any): string {
  const payload = typeof metadata === 'string' ? metadata : JSON.stringify(metadata);
  return crypto.createHmac('sha256', VC_SECRET).update(payload).digest('hex');
}

/**
 * Verifies if the stored vcHash matches the HMAC signature of the metadataJson
 */
export function verifyCredentialSignature(metadataJson: string, expectedHash: string): boolean {
  try {
    const calculatedHash = signCredentialMetadata(metadataJson);
    return crypto.timingSafeEqual(Buffer.from(calculatedHash), Buffer.from(expectedHash));
  } catch {
    return false;
  }
}

/**
 * Generates an SVG or data URL QR code for a given verification URL or token
 */
export async function generateQrDataUrl(qrToken: string): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const verifyUrl = `${baseUrl}/passport/verify?token=${encodeURIComponent(qrToken)}`;
  return QRCode.toDataURL(verifyUrl, {
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: '#0D5C3A', // Ayush Forest Green
      light: '#FFFFFF'
    }
  });
}
