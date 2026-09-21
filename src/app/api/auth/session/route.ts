import { NextRequest, NextResponse } from 'next/server';
import { DEMO_PERSONAS, AuthUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

let activePersonaKey = 'aarav';

export async function GET(req: NextRequest) {
  const personaKey = req.cookies.get('ayush_persona')?.value || activePersonaKey;
  const persona = DEMO_PERSONAS[personaKey] || DEMO_PERSONAS.aarav;

  // Attempt to fetch fresh info from DB
  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: persona.id },
      include: { institution: true }
    });
    if (dbUser) {
      return NextResponse.json({
        user: {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role,
          stream: dbUser.stream,
          year: dbUser.year,
          abhaId: dbUser.abhaId,
          institutionId: dbUser.institutionId,
          institutionName: dbUser.institution?.name,
          locationCity: dbUser.locationCity,
          locationState: dbUser.locationState,
          consentFlags: JSON.parse(dbUser.consentFlags || '{}')
        },
        personaKey
      });
    }
  } catch (err) {
    // If DB is loading or offline, fallback to in-memory persona
  }

  return NextResponse.json({ user: persona, personaKey });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { personaKey } = body;

    if (!personaKey || !DEMO_PERSONAS[personaKey]) {
      return NextResponse.json({ error: 'Invalid persona key' }, { status: 400 });
    }

    activePersonaKey = personaKey;
    const persona = DEMO_PERSONAS[personaKey];

    const response = NextResponse.json({ success: true, user: persona, personaKey });
    response.cookies.set('ayush_persona', personaKey, {
      path: '/',
      maxAge: 86400 * 7,
      sameSite: 'lax'
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
