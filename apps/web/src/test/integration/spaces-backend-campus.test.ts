import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

// Silence loggers
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));
vi.mock('@/lib/structured-logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));
// server-only shim
vi.mock('server-only', () => ({}));

// In-memory Firestore Admin
import { dbAdminMock, getCollection, resetCollections } from '../utils/inmemory-firestore';
vi.mock('@/lib/firebase-admin', () => ({ dbAdmin: dbAdminMock }));

import * as SpacesRoute from '@/app/api/spaces/route';

function makeReq(url: string, init?: RequestInit) {
  const headers = new Headers(init?.headers as any);
  const body = init?.body as any;
  const method = (init?.method || 'GET') as any;
  const req = new Request(url, { headers, method, body });
  return new NextRequest(req);
}

const devAuth = (uid: string) => ({ authorization: `Bearer dev_token_${uid}` });

describe('Spaces Backend - Campus Isolation (GET/POST)', () => {
  beforeEach(() => {
    resetCollections();
  });

  it('GET returns only UB campus spaces', async () => {
    const spaces = getCollection('spaces');
    spaces.doc('s-ub-1').set({ name: 'UB One', campusId: 'ub-buffalo', isActive: true, createdAt: new Date() });
    spaces.doc('s-oth-1').set({ name: 'Other One', campusId: 'other-campus', isActive: true, createdAt: new Date() });

    const res = await SpacesRoute.GET(
      makeReq('http://localhost/api/spaces?limit=50', { headers: devAuth('u1') }) as any,
      {} as any,
      { success: vi.fn(), error: vi.fn() } as any
    );

    const body = await (res as any).json();
    const names = (body.data?.spaces || body.spaces || []).map((s: any) => s.name);
    expect(names).toContain('UB One');
    expect(names).not.toContain('Other One');
  });

  it('POST sets campusId to UB on created space', async () => {
    // Seed user
    getCollection('users').doc('u1').set({ createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), role: 'user', email: 'u1@buffalo.edu' });

    const payload = {
      name: 'My UB Space',
      description: 'desc',
      category: 'student_org',
      joinPolicy: 'open',
      tags: ['t'],
      agreedToGuidelines: true
    };

    const res = await SpacesRoute.POST(
      makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(payload) }) as any,
      {} as any,
      payload as any,
      { success: vi.fn(), error: vi.fn() } as any
    );

    const body = await (res as any).json();
    const space = body.data?.space || body.space;
    expect(space?.campusId).toBe('ub-buffalo');
  });
});

