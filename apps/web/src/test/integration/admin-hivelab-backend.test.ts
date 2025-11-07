import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

// Silence loggers
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));
vi.mock('@/lib/structured-logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));

// server-only shim
vi.mock('server-only', () => ({}));

// Use in-memory Firestore for admin
import { dbAdminMock, adminMock, getCollection, resetCollections } from '../utils/inmemory-firestore';
vi.mock('@/lib/firebase-admin', () => ({ dbAdmin: dbAdminMock }));
vi.mock('firebase-admin', () => adminMock);

// Mock Firebase Auth to accept dev tokens
vi.mock('firebase-admin/auth', () => ({
  getAuth: () => ({
    verifyIdToken: vi.fn(async (token: string) => {
      if (token.startsWith('dev_token_')) {
        const uid = token.replace('dev_token_', '').split('_')[0];
        return { uid, email: `${uid}@test.edu` } as any;
      }
      throw new Error('Invalid token');
    })
  })
}));

// Force admin checks to pass
vi.mock('@/lib/admin/roles', () => ({
  isAdminEmail: () => true,
  getAdminEmails: () => ['admin@test.edu']
}));

// Bypass the heavy withSecureAuth internals (origin/campus/sanitization) in tests
vi.mock('@/lib/api-auth-secure', async () => {
  return {
    withSecureAuth: (handler: any, _opts?: any) => {
      return (request: any, ...args: any[]) => handler(request, { uid: 'admin', email: 'admin@test.edu' } as any, ...args);
    }
  };
});

const devAuth = (uid: string) => ({ authorization: `Bearer dev_token_${uid}` });
function makeReq(url: string, init?: RequestInit) {
  const headers = new Headers(init?.headers as any);
  const body = init?.body as any;
  const method = (init?.method || 'GET') as any;
  const req = new Request(url, { headers, method, body });
  return new NextRequest(req);
}

describe('Admin Hivelab Backend', () => {
  beforeEach(() => {
    resetCollections();
  });

  it('exports catalog CSV with filters', async () => {
    // Seed tools
    await getCollection('tools').doc('t1').set({ name: 'Alpha', status: 'published', ownerId: 'u1', updatedAt: { toDate: () => new Date() } });
    await getCollection('tools').doc('t2').set({ name: 'Beta', status: 'hidden', ownerId: 'u2', updatedAt: { toDate: () => new Date() } });

    const { GET } = await import('@/app/api/admin/tools/catalog/export/route');
    const res = await GET(makeReq('http://localhost/api/admin/tools/catalog/export?status=all', { headers: devAuth('admin') }) as any);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/csv');
    const text = await res.text();
    expect(text).toContain('Alpha');
    expect(text).toContain('Beta');
  });

  it('exports reviews CSV (pending only)', async () => {
    // Seed tool + user for mapping
    await getCollection('tools').doc('t1').set({ name: 'Tool One' });
    await getCollection('users').doc('u1').set({ email: 'owner@buffalo.edu' });

    // Seed publishRequests
    await getCollection('publishRequests').doc('r1').set({ status: 'pending', toolId: 't1', requestedBy: 'u1', category: 'catalog', publishType: 'public', requestedAt: { toDate: () => new Date() } });
    await getCollection('publishRequests').doc('r2').set({ status: 'approved', toolId: 't1', requestedBy: 'u1', category: 'catalog', publishType: 'public', requestedAt: { toDate: () => new Date() } });

    const { GET } = await import('@/app/api/admin/tools/reviews/export/route');
    const res = await GET(makeReq('http://localhost/api/admin/tools/reviews/export?status=pending', { headers: devAuth('admin') }) as any);
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('r1');
    expect(text).not.toContain('r2');
    expect(text).toContain('Tool One');
    expect(text).toContain('owner@buffalo.edu');
  });

  it('exports deployments CSV with tool names', async () => {
    await getCollection('tools').doc('t1').set({ name: 'Deployed Tool' });
    await getCollection('deployedTools').doc('d1').set({ toolId: 't1', status: 'active', deployedTo: 'profile', targetId: 'p123', surface: 'profile_home', deployedAt: { toDate: () => new Date() } });

    const { GET } = await import('@/app/api/admin/tools/deployments/export/route');
    const res = await GET(makeReq('http://localhost/api/admin/tools/deployments/export', { headers: devAuth('admin') }) as any);
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('Deployed Tool');
    expect(text).toContain('profile');
  });

  it('requests quality run and logs event', async () => {
    const { POST } = await import('@/app/api/admin/tools/quality/run/route');
    const res = await POST(makeReq('http://localhost/api/admin/tools/quality/run', { method: 'POST', headers: { ...devAuth('admin'), 'content-type': 'application/json' }, body: JSON.stringify({ toolId: 't1' }) }) as any);
    expect(res.status).toBe(200);
    const events = await getCollection('analytics_events').get();
    expect(events.docs.some((d: any) => d.data().eventType === 'quality_run_requested')).toBe(true);
  });

  it('updates tool status via catalog/status', async () => {
    await getCollection('tools').doc('t1').set({ name: 'Toggle Tool', status: 'hidden' });
    const { POST } = await import('@/app/api/admin/tools/catalog/status/route');
    const res = await POST(makeReq('http://localhost/api/admin/tools/catalog/status', { method: 'POST', headers: { ...devAuth('admin'), 'content-type': 'application/json' }, body: JSON.stringify({ toolId: 't1', status: 'published' }) }) as any);
    expect(res.status).toBe(200);
    const tool = await getCollection('tools').doc('t1').get();
    expect(tool.data().status).toBe('published');
  });

  it('changes deployment state via deployments/action', async () => {
    await getCollection('deployedTools').doc('d1').set({ status: 'active', toolId: 't1' });
    const { POST } = await import('@/app/api/admin/tools/deployments/action/route');
    const res = await POST(makeReq('http://localhost/api/admin/tools/deployments/action', { method: 'POST', headers: { ...devAuth('admin'), 'content-type': 'application/json' }, body: JSON.stringify({ deploymentId: 'd1', action: 'pause' }) }) as any);
    expect(res.status).toBe(200);
    const dep = await getCollection('deployedTools').doc('d1').get();
    expect(dep.data().status).toBe('paused');
  });
});

