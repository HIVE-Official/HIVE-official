import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';

// Silence loggers during tests
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));
vi.mock('@/lib/structured-logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));
// server-only shim
vi.mock('server-only', () => ({}));

// Mock session utilities before importing module under test
let mockSession: any = null;
let mockCsrfValid = false;
vi.mock('@/lib/session', () => ({
  getSession: async () => mockSession,
  validateCSRF: () => mockCsrfValid,
  // re-export types used by the code if any
}));

import { withSecureAuth } from '@/lib/api-auth-secure';

function makeReq(url: string, init?: RequestInit) {
  const headers = new Headers(init?.headers as any);
  const body = init?.body as any;
  const method = (init?.method || 'GET') as any;
  const req = new Request(url, { headers, method, body });
  return new NextRequest(req);
}

const ORIGIN = 'http://localhost:3000';
const COOKIE_NAME = 'hive_session';

describe('withSecureAuth - campus isolation (cookie sessions)', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('denies access when session campusId != required campus', async () => {
    mockSession = { userId: 'u1', email: 'u1@buffalo.edu', campusId: 'other-campus', isAdmin: false };

    const handler = vi.fn(async () => NextResponse.json({ ok: true }));
    const secured = withSecureAuth(handler as any, { campusId: 'ub-buffalo' });

    const req = makeReq('http://localhost/api/test', { headers: { origin: ORIGIN, cookie: `${COOKIE_NAME}=x` } });

    const res = await secured(req as any);
    expect(res.status).toBe(403);
  });

  it('allows access when session campusId matches required campus', async () => {
    mockSession = { userId: 'u1', email: 'u1@buffalo.edu', campusId: 'ub-buffalo', isAdmin: false };

    const handler = vi.fn(async () => NextResponse.json({ ok: true }));
    const secured = withSecureAuth(handler as any, { campusId: 'ub-buffalo' });

    const req = makeReq('http://localhost/api/test', { headers: { origin: ORIGIN, cookie: `${COOKIE_NAME}=x` } });

    const res = await secured(req as any);
    expect(res.status).toBe(200);
    expect(handler).toHaveBeenCalledOnce();
  });

  it('requires authentication when no cookie or header present', async () => {
    const handler = vi.fn(async () => NextResponse.json({ ok: true }));
    const secured = withSecureAuth(handler as any, { campusId: 'ub-buffalo' });

    const req = makeReq('http://localhost/api/test', {
      headers: { origin: ORIGIN },
    });

    const res = await secured(req as any);
    expect(res.status).toBe(401);
  });

  it('admin POST requires valid CSRF token', async () => {
    // Admin session with CSRF present
    mockSession = { userId: 'admin', email: 'jwrhineh@buffalo.edu', campusId: 'ub-buffalo', isAdmin: true, csrf: 'csrf123' };

    const handler = vi.fn(async () => NextResponse.json({ ok: true }));
    const secured = withSecureAuth(handler as any, { campusId: 'ub-buffalo', requireAdmin: true });

    // Missing CSRF
    const reqNoCsrf = makeReq('http://localhost/api/admin/test', {
      method: 'POST',
      headers: {
        origin: ORIGIN,
        'content-type': 'application/json',
        cookie: `${COOKIE_NAME}=x`,
      },
      body: JSON.stringify({ foo: 'bar' }),
    });
    const resNoCsrf = await secured(reqNoCsrf as any);
    expect(resNoCsrf.status).toBe(403);

    // With CSRF: mock validation succeeds
    mockCsrfValid = true;

    const reqWithCsrf = makeReq('http://localhost/api/admin/test', {
      method: 'POST',
      headers: {
        origin: ORIGIN,
        'x-csrf-token': 'csrf123',
        'content-type': 'application/json',
        cookie: `${COOKIE_NAME}=x`,
      },
      body: JSON.stringify({ foo: 'bar' }),
    });
    const resWithCsrf = await secured(reqWithCsrf as any);
    expect(resWithCsrf.status).toBe(200);
    expect(handler).toHaveBeenCalled();
  });
});
