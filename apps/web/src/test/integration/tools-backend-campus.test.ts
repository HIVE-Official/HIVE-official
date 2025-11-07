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

import * as ToolsRoute from '@/app/api/tools/route';

function makeReq(url: string, init?: RequestInit) {
  const headers = new Headers(init?.headers as any);
  const body = init?.body as any;
  const method = (init?.method || 'GET') as any;
  const req = new Request(url, { headers, method, body });
  return new NextRequest(req);
}

const devAuth = (uid: string) => ({ authorization: `Bearer dev_token_${uid}` });

describe('Tools Backend - Campus Isolation', () => {
  beforeEach(() => {
    resetCollections();
  });

  it('GET returns only UB tools for owner', async () => {
    const tools = getCollection('tools');
    tools.doc('t-ub-1').set({ name: 'UB Tool', ownerId: 'u1', campusId: 'ub-buffalo', updatedAt: new Date() });
    tools.doc('t-oth-1').set({ name: 'Other Tool', ownerId: 'u1', campusId: 'other-campus', updatedAt: new Date() });
    tools.doc('t-someone').set({ name: 'Not Mine', ownerId: 'u2', campusId: 'ub-buffalo', updatedAt: new Date() });

    const res = await ToolsRoute.GET(
      makeReq('http://localhost/api/tools?limit=20', { headers: devAuth('u1') }) as any,
      {} as any,
      { success: vi.fn(), error: vi.fn() } as any
    );

    const body = await (res as any).json();
    const names = (body.data?.tools || body.tools || []).map((t: any) => t.name);
    expect(names).toContain('UB Tool');
    expect(names).not.toContain('Other Tool');
    expect(names).not.toContain('Not Mine');
  });

  it('POST sets campusId to UB on created tool', async () => {
    // Seed user
    getCollection('users').doc('u1').set({ email: 'u1@buffalo.edu', stats: {} });

    const payload = { name: 'Timer', description: 'Study timer' } as any;
    const res = await ToolsRoute.POST(
      makeReq('http://localhost/api/tools', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(payload) }) as any,
      {} as any,
      payload,
      { success: vi.fn(), error: vi.fn() } as any
    );

    const body = await (res as any).json();
    const tool = body.data?.tool || body.tool;
    expect(tool?.campusId).toBe('ub-buffalo');
  });
});

