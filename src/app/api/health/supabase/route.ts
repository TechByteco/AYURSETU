import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.auth.admin.listUsers();

    if (error) {
      return NextResponse.json({
        status: 'error',
        provider: 'Supabase',
        projectRef: 'gafoklruxgxnqwjpeqnw',
        error: error.message
      }, { status: 500 });
    }

    return NextResponse.json({
      status: 'connected',
      provider: 'Supabase Cloud (PostgreSQL)',
      projectRef: 'gafoklruxgxnqwjpeqnw',
      url: 'https://gafoklruxgxnqwjpeqnw.supabase.co',
      authReady: true,
      userCount: data.users.length,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 'error',
      message: err.message
    }, { status: 500 });
  }
}
