import { NextResponse, type NextRequest } from 'next/server';

// Simple in-memory sliding window rate-limiter for sensitive API endpoints
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 120; // 120 req/min per IP

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Sanitize query params against malicious script injection patterns
  const decodedSearch = decodeURIComponent(search || '');
  if (
    decodedSearch.includes('<script') ||
    decodedSearch.includes('javascript:') ||
    decodedSearch.includes('onload=') ||
    decodedSearch.includes('onerror=')
  ) {
    return new NextResponse(
      JSON.stringify({ error: 'Potential security violation detected.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 2. Rate limiting check for API routes
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const now = Date.now();
    const clientData = ipRequestCounts.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

    if (now > clientData.resetTime) {
      clientData.count = 1;
      clientData.resetTime = now + RATE_LIMIT_WINDOW_MS;
    } else {
      clientData.count += 1;
    }
    ipRequestCounts.set(ip, clientData);

    if (clientData.count > MAX_REQUESTS_PER_WINDOW) {
      return new NextResponse(
        JSON.stringify({ error: 'Rate limit exceeded. Please retry shortly.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
            'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }
  }

  // 3. Clone response and inject hardened security headers
  const response = NextResponse.next();

  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  response.headers.set('X-Ayush-Security-Shield', 'Active-HMAC256-Strict');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, audio, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|webp|svg|ico|mp3|mp4)).*)',
  ],
};
