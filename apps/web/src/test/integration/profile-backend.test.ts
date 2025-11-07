import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock logger to keep output clean
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));

// Minimal in-memory Firestore Admin mock
type DocData = Record<string, any>;
class InMemoryDoc {
  constructor(private store: Map<string, DocData>, private id: string) {}
  async get() {
    const data = this.store.get(this.id);
    return { exists: !!data, data: () => data };
  }
  async set(data: DocData) { this.store.set(this.id, data); }
  async update(data: DocData) {
    const existing = this.store.get(this.id) || {};
    this.store.set(this.id, { ...existing, ...data });
  }
}

class InMemoryQuery {
  constructor(private items: Array<{ id: string; data: DocData }>) {}
  where() { return this; }
  orderBy() { return this; }
  limit() { return this; }
  async get() {
    return {
      size: this.items.length,
      docs: this.items.map((it) => ({ id: it.id, data: () => it.data }))
    } as any;
  }
}

class InMemoryCollection {
  private store = new Map<string, DocData>();
  doc(id: string) { return new InMemoryDoc(this.store, id); }
  where() { return new InMemoryQuery([] as any); }
  orderBy() { return new InMemoryQuery([] as any); }
  limit() { return new InMemoryQuery([] as any); }
  async get() { return { docs: [] as any } as any; }
}

const collections: Record<string, InMemoryCollection> = {};
const getCollection = (name: string) => (collections[name] ||= new InMemoryCollection());

vi.mock('@/lib/firebase-admin', async () => {
  return {
    dbAdmin: {
      collection: (name: string) => {
        return getCollection(name);
      },
      batch: () => ({ delete: () => {}, commit: async () => {} })
    }
  } as any;
});

// Import after mocks
import * as Privacy from '@/app/api/profile/privacy/route';
import * as Stats from '@/app/api/profile/stats/route';
import * as Prefs from '@/app/api/profile/notifications/preferences/route';
import * as PublicProfile from '@/app/api/profile/[userId]/route';
import { NextRequest } from 'next/server';

const devAuthHeader = { authorization: 'Bearer dev_token_123' };

function makeReq(url: string, init?: RequestInit) {
  const headers = new Headers(init?.headers as any);
  const body = init?.body as any;
  const method = (init?.method || 'GET') as any;
  // NextRequest requires a Request to wrap; construct native Request first
  const req = new Request(url, { headers, method, body });
  return new NextRequest(req);
}

describe('Profile Backend Endpoints', () => {
  beforeEach(() => {
    // Reset in-memory collections
    for (const key of Object.keys(collections)) delete (collections as any)[key];
  });

  it('GET /api/profile/privacy returns defaults and persists', async () => {
    const res = await Privacy.GET(makeReq('http://localhost/api/profile/privacy', { headers: devAuthHeader }) as any as Request);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.privacy.userId).toBeDefined();
  });

  it('PATCH /api/profile/privacy updates a field', async () => {
    const res1 = await Privacy.PATCH(makeReq('http://localhost/api/profile/privacy', {
      method: 'PATCH',
      headers: { ...devAuthHeader, 'content-type': 'application/json' },
      body: JSON.stringify({ profileVisibility: { showToPublic: true } })
    }));
    expect(res1.status).toBe(200);
    const json1 = await res1.json();
    expect(json1.success).toBe(true);
    expect(json1.data.privacy.profileVisibility.showToPublic).toBe(true);
  });

  it('GET /api/profile/stats returns data shape', async () => {
    const res = await Stats.GET(makeReq('http://localhost/api/profile/stats?timeRange=week', { headers: devAuthHeader }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.data.totals).toBeDefined();
  });

  it('GET /api/profile/notifications/preferences returns defaults (raw JSON)', async () => {
    const res = await Prefs.GET(makeReq('http://localhost/api/profile/notifications/preferences', { headers: devAuthHeader }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.enableInApp).toBe(true);
  });

  it('PUT /api/profile/notifications/preferences updates (raw)', async () => {
    const res = await Prefs.PUT(makeReq('http://localhost/api/profile/notifications/preferences', {
      method: 'PUT',
      headers: { ...devAuthHeader, 'content-type': 'application/json' },
      body: JSON.stringify({ preferences: { enableEmail: true } })
    }));
    expect(res.status).toBe(200);
  });

  it('GET /api/profile/[userId] returns 404 for missing and 200 for existing', async () => {
    const res404 = await PublicProfile.GET(makeReq('http://localhost/api/profile/abc'), { params: { userId: 'abc' } } as any, { success: vi.fn(), error: vi.fn() } as any);
    expect(res404.status).toBe(404);

    // Seed a user
    const users = getCollection('users');
    await users.doc('u1').set({ fullName: 'Test User', handle: 'test', profileVisibility: { showToPublic: true } });
    const res200 = await PublicProfile.GET(makeReq('http://localhost/api/profile/u1'), { params: { userId: 'u1' } } as any, { success: vi.fn(), error: vi.fn() } as any);
    expect(res200.status).toBe(200);
    const json = await res200.json();
    expect(json.success).toBe(true);
    expect(json.data.profile.fullName).toBe('Test User');
  });
});
