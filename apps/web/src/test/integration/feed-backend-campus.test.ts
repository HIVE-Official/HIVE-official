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

let mockSession: any = null;
vi.mock('@/lib/session', () => ({ getSession: async () => mockSession }));
import * as FeedRoute from '@/app/api/feed/route';

const COOKIE = 'hive_session';

function makeReq(url: string, init?: RequestInit) {
  const headers = new Headers(init?.headers as any);
  const body = init?.body as any;
  const method = (init?.method || 'GET') as any;
  const req = new Request(url, { headers, method, body });
  return new NextRequest(req);
}

describe('Feed Backend - Campus Isolation', () => {
  beforeEach(() => {
    resetCollections();
  });

  it('returns only UB campus posts', async () => {
    // Seed posts for both campuses
    const posts = getCollection('posts');
    posts.doc('ub1').set({ campusId: 'ub-buffalo', isActive: true, isDeleted: false, content: 'UB', createdAt: new Date() });
    posts.doc('ub2').set({ campusId: 'ub-buffalo', isActive: true, isDeleted: false, content: 'UB2', createdAt: new Date() });
    posts.doc('oth1').set({ campusId: 'other-campus', isActive: true, isDeleted: false, content: 'Other', createdAt: new Date() });
    posts.doc('del1').set({ campusId: 'ub-buffalo', isActive: true, isDeleted: true, content: 'Deleted', createdAt: new Date() });

    // Mock session for cookie-based auth
    mockSession = { userId: 'u1', email: 'u1@buffalo.edu', campusId: 'ub-buffalo' };

    const res = await FeedRoute.GET(
      makeReq('http://localhost/api/feed?limit=10', { headers: { origin: 'http://localhost:3000', cookie: `${COOKIE}=x` } }) as any
    );

    expect(res.status).toBe(200);
    const body = await res.json() as any;
    expect(body.success).toBe(true);
    const ids = (body.posts || []).map((p: any) => p.id);
    expect(ids).toContain('ub1');
    expect(ids).toContain('ub2');
    expect(ids).not.toContain('oth1');
    expect(ids).not.toContain('del1');
  });
});
