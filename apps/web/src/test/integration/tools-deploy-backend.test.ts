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

// Import route after mocks
import * as DeployRoute from '@/app/api/tools/deploy/route';

const devAuth = (uid: string) => ({ authorization: `Bearer test-token` });

function makeReq(url: string, init?: RequestInit) {
  const headers = new Headers(init?.headers as any);
  const body = init?.body as any;
  const method = (init?.method || 'GET') as any;
  const req = new Request(url, { headers, method, body });
  return new NextRequest(req);
}

describe('Tools Deploy Backend', () => {
  beforeEach(() => {
    resetCollections();
    // Seed a user (u1) and a tool t1
    getCollection('users').doc('test-user-id').set({ email: 'test@example.com' });
    getCollection('tools').doc('t1').set({ name: 'Poll Maker', ownerId: 'test-user-id', status: 'published', campusId: 'ub', currentVersion: '1.0.0', elements: [] });
  });

  it('deploys a tool to profile', async () => {
    const body = { toolId: 't1', deployTo: 'profile', targetId: 'test-user-id', permissions: { canInteract: true, canView: true, canEdit: false }, settings: { showInDirectory: true, allowSharing: true, collectAnalytics: true, notifyOnInteraction: false } } as any;
    const res = await DeployRoute.POST(
      makeReq('http://localhost/api/tools/deploy', { method: 'POST', headers: { ...devAuth('test-user-id'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any
    );
    expect(res.status).toBe(200);
  });

  it('rejects deployment when tool not found', async () => {
    const body = { toolId: 'nope', deployTo: 'profile', targetId: 'test-user-id', permissions: { canInteract: true, canView: true, canEdit: false }, settings: { showInDirectory: true, allowSharing: true, collectAnalytics: true, notifyOnInteraction: false } } as any;
    const res = await DeployRoute.POST(
      makeReq('http://localhost/api/tools/deploy', { method: 'POST', headers: { ...devAuth('test-user-id'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any
    );
    expect(res.status).toBe(404);
  });
});

