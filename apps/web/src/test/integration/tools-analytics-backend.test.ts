import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

// Silence loggers
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));
vi.mock('@/lib/structured-logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));
// server-only shim
vi.mock('server-only', () => ({}));

// In-memory Firestore Admin + admin FieldValue
import { dbAdminMock, adminMock, getCollection, resetCollections } from '../utils/inmemory-firestore';
vi.mock('@/lib/firebase-admin', () => ({ dbAdmin: dbAdminMock }));
vi.mock('firebase-admin', () => adminMock);

// Mock token verification for dev tokens
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

// Import route after mocks
import * as ToolAnalytics from '@/app/api/tools/[toolId]/analytics/route';

const devAuth = (uid: string) => ({ authorization: `Bearer dev_token_${uid}` });

function makeReq(url: string, init?: RequestInit) {
  const headers = new Headers(init?.headers as any);
  const body = init?.body as any;
  const method = (init?.method || 'GET') as any;
  const req = new Request(url, { headers, method, body });
  return new NextRequest(req);
}

describe('Tools Analytics Backend', () => {
  beforeEach(() => {
    resetCollections();
    // Seed a tool and related docs
    const tools = getCollection('tools');
    const toolRef = tools.doc('t1');
    toolRef.set({ name: 'Poll Maker', ownerId: 'u1', status: 'published', campusId: 'ub', currentVersion: '1.0.0', installCount: 3, elements: [] });

    // One active deployment to a space
    getCollection('deployedTools').doc('dep1').set({ toolId: 't1', deployedTo: 'space', targetId: 's1', status: 'active', usageCount: 7, campusId: 'ub' });
    getCollection('spaces').doc('s1').set({ name: 'CS Club', campusId: 'ub', members: { u1: { role: 'admin' }, u2: { role: 'member' } } });

    // A few analytics events over the last 7d
    const now = new Date();
    const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();
    const events = getCollection('analytics_events');
    events.doc().set({ eventType: 'tool_interaction', toolId: 't1', userId: 'u1', timestamp: daysAgo(1), metadata: { feature: 'Vote Casting' } });
    events.doc().set({ eventType: 'tool_view', toolId: 't1', userId: 'u2', timestamp: daysAgo(2), metadata: { feature: 'Results Viewing' } });
    events.doc().set({ eventType: 'tool_interaction', toolId: 't1', userId: 'u3', timestamp: daysAgo(2), metadata: { feature: 'Poll Creation' } });

    // Reviews
    const reviews = getCollection('toolReviews');
    reviews.doc().set({ toolId: 't1', campusId: 'ub', status: 'published', rating: 5, title: 'Great', createdAt: daysAgo(1), userId: 'u2' });
    reviews.doc().set({ toolId: 't1', campusId: 'ub', status: 'published', rating: 4, title: 'Solid', createdAt: daysAgo(3), userId: 'u3' });
  });

  it('GET /api/tools/[toolId]/analytics returns aggregated analytics', async () => {
    const res = await ToolAnalytics.GET(
      makeReq('http://localhost/api/tools/t1/analytics?range=7d', { headers: devAuth('u1') }) as any,
      { params: Promise.resolve({ toolId: 't1' }) } as any
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json?.data?.overview?.totalUsage ?? json.overview?.totalUsage).toBeDefined();
    const usage = (json?.data?.usage ?? json.usage);
    expect(Array.isArray(usage?.daily)).toBe(true);
    expect(Array.isArray(usage?.features)).toBe(true);
    expect(Array.isArray(usage?.spaces)).toBe(true);
    const feedback = (json?.data?.feedback ?? json.feedback);
    expect(Array.isArray(feedback?.ratings)).toBe(true);
  });

  it('returns 404 for missing tool', async () => {
    const res = await ToolAnalytics.GET(
      makeReq('http://localhost/api/tools/does-not-exist/analytics', { headers: devAuth('u1') }) as any,
      { params: Promise.resolve({ toolId: 'does-not-exist' }) } as any
    );
    expect(res.status).toBe(404);
  });
});

