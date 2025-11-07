import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

// Silence logs
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));
vi.mock('@/lib/structured-logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));

// In-memory Firestore + FieldValue
import { dbAdminMock, adminMock, getCollection, resetCollections } from '../utils/inmemory-firestore';
vi.mock('@/lib/firebase-admin', () => ({ dbAdmin: dbAdminMock }));
vi.mock('firebase-admin', () => adminMock);

// Auth mock
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

// SSE noop
vi.mock('@/lib/sse-realtime-service', () => ({ sseRealtimeService: { sendMessage: vi.fn(async () => {}) } }));

// Routes
import * as SpacesRoot from '@/app/api/spaces/route';
import * as SpacesJoin from '@/app/api/spaces/join/route';
import * as SpacesLeave from '@/app/api/spaces/leave/route';
import * as Members from '@/app/api/spaces/[spaceId]/members/route';
import * as MemberId from '@/app/api/spaces/[spaceId]/members/[memberId]/route';
import * as Posts from '@/app/api/spaces/[spaceId]/posts/route';
import * as PostDetail from '@/app/api/spaces/[spaceId]/posts/[postId]/route';
import * as Comments from '@/app/api/spaces/[spaceId]/posts/[postId]/comments/route';

const devAuth = (uid: string) => ({ authorization: `Bearer dev_token_${uid}` });
const daysAgo = (d: number) => ({ toDate: () => new Date(Date.now() - d * 24 * 60 * 60 * 1000) });

function makeReq(url: string, init?: RequestInit) {
  const headers = new Headers(init?.headers as any);
  const body = init?.body as any;
  const method = (init?.method || 'GET') as any;
  const req = new Request(url, { headers, method, body });
  return new NextRequest(req);
}

const respond = {
  success: (d: any, opts?: any) => new Response(JSON.stringify({ success: true, ...d }), { status: (opts?.status || 200) }),
  error: (m: any, _c?: any, opts?: any) => new Response(JSON.stringify({ error: m }), { status: (opts?.status || 500) })
} as any;

describe('Spaces Backend - Negative Paths', () => {
  beforeEach(() => {
    resetCollections();
    // Seed baseline users
    getCollection('users').doc('u1').set({ fullName: 'User1', createdAt: daysAgo(8), isAdmin: false });
    getCollection('users').doc('u2').set({ fullName: 'User2', createdAt: daysAgo(10), isAdmin: false });
    getCollection('users').doc('u3').set({ fullName: 'User3', createdAt: daysAgo(10), isAdmin: false });
  });

  it('Create space fails without guidelines agreement', async () => {
    const body = { name: 'NoGuidelines', description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: false };
    const res = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    expect(res.status).toBe(400);
  });

  it('Create space blocked for young account (<7 days)', async () => {
    getCollection('users').doc('young').set({ fullName: 'Young', createdAt: daysAgo(0), isAdmin: false });
    const body = { name: 'TooYoung', description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const res = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('young'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    expect(res.status).toBe(403);
  });

  it('Duplicate space name returns 409', async () => {
    const body = { name: 'Dup', description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const r1 = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    expect(r1.status).toBe(201);
    const r2 = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    expect(r2.status).toBe(409);
  });

  it('University org requires admin (403)', async () => {
    const body = { name: 'UB Admin Only', description: 'x', category: 'university_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const res = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    expect(res.status).toBe(403);
  });

  it('Greek life requires verification (403)', async () => {
    const body = { name: 'Greek', description: 'x', category: 'greek_life', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const res = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    expect(res.status).toBe(403);
  });

  it('Banned user cannot create space', async () => {
    getCollection('users').doc('ban').set({ fullName: 'Ban', createdAt: daysAgo(30), isAdmin: false, spaceBanned: true });
    const body = { name: 'Banned', description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const res = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('ban'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    expect(res.status).toBe(403);
  });

  it('Daily creation limit enforced (429 on 4th)', async () => {
    for (let i = 1; i <= 3; i++) {
      const body = { name: `S${i}`, description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
      const r = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
      expect(r.status).toBe(201);
    }
    const body4 = { name: 'S4', description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const r4 = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body4) }) as any, {} as any, body4 as any, respond);
    expect(r4.status).toBe(429);
  });

  it('Join fails for non-existent space (404) and when already a member (409)', async () => {
    // Non-existent
    const j404 = await SpacesJoin.POST(makeReq('http://localhost/api/spaces/join', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify({ spaceId: 'missing' }) }) as any, {} as any, { spaceId: 'missing' } as any, respond);
    expect(j404.status).toBe(404);
    // Create space and join
    const body = { name: 'JoinTest', description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const created = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    const createdJson = await created.json();
    const spaceId = (createdJson.data?.space?.id) || createdJson.space?.id;
    const j1 = await SpacesJoin.POST(makeReq('http://localhost/api/spaces/join', { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ spaceId }) }) as any, {} as any, { spaceId } as any, respond);
    expect(j1.status).toBe(200);
    const jAgain = await SpacesJoin.POST(makeReq('http://localhost/api/spaces/join', { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ spaceId }) }) as any, {} as any, { spaceId } as any, respond);
    // validateSpaceJoinability runs first and maps this case to 403.
    expect(jAgain.status).toBe(403);
  });

  it('Join fails for private space (403)', async () => {
    const body = { name: 'Private', description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const created = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    const createdJson = await created.json();
    const spaceId = (createdJson.data?.space?.id) || createdJson.space?.id;
    await getCollection('spaces').doc(spaceId).update({ isPrivate: true });
    const j = await SpacesJoin.POST(makeReq('http://localhost/api/spaces/join', { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ spaceId }) }) as any, {} as any, { spaceId } as any, respond);
    expect(j.status).toBe(403);
  });

  it('Owner cannot leave as sole owner (409)', async () => {
    const body = { name: 'OwnerLeave', description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const created = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    const createdJson = await created.json();
    const spaceId = (createdJson.data?.space?.id) || createdJson.space?.id;
    const leave = await SpacesLeave.POST(makeReq('http://localhost/api/spaces/leave', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify({ spaceId }) }) as any, {} as any, { spaceId } as any, respond);
    expect(leave.status).toBe(409);
  });

  it('Non-members cannot view or create posts', async () => {
    const body = { name: 'NoPost', description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const created = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    const createdJson = await created.json();
    const spaceId = (createdJson.data?.space?.id) || createdJson.space?.id;
    const getRes = await Posts.GET(makeReq(`http://localhost/api/spaces/${spaceId}/posts`, { headers: devAuth('u2') }) as any, { params: Promise.resolve({ spaceId }) } as any);
    expect(getRes.status).toBe(403);
    const postRes = await Posts.POST(makeReq(`http://localhost/api/spaces/${spaceId}/posts`, { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ content: 'hi', type: 'text' }) }) as any, { params: Promise.resolve({ spaceId }) } as any);
    expect(postRes.status).toBe(403);
  });

  it('Profanity blocked in posts (400)', async () => {
    const body = { name: 'Profanity', description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const created = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    const createdJson = await created.json();
    const spaceId = (createdJson.data?.space?.id) || createdJson.space?.id;
    await SpacesJoin.POST(makeReq('http://localhost/api/spaces/join', { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ spaceId }) }) as any, {} as any, { spaceId } as any, respond);
    const postRes = await Posts.POST(makeReq(`http://localhost/api/spaces/${spaceId}/posts`, { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ content: 'this is spam', type: 'text' }) }) as any, { params: Promise.resolve({ spaceId }) } as any);
    expect(postRes.status).toBe(400);
  });

  it('Non-members cannot view or create comments; bad parent returns 404', async () => {
    const body = { name: 'CommentsN', description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const created = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    const createdJson = await created.json();
    const spaceId = (createdJson.data?.space?.id) || createdJson.space?.id;
    // Owner creates a post
    const p = await Posts.POST(makeReq(`http://localhost/api/spaces/${spaceId}/posts`, { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify({ content: 'hello', type: 'text' }) }) as any, { params: Promise.resolve({ spaceId }) } as any);
    const pj = await p.json();
    const postId = pj.post.id;
    // Non-member read comments
    const cGet = await Comments.GET(makeReq(`http://localhost/api/spaces/${spaceId}/posts/${postId}/comments`, { headers: devAuth('u2') }) as any, { params: Promise.resolve({ spaceId, postId }) } as any);
    expect(cGet.status).toBe(403);
    // Non-member create comment
    const cPostForbidden = await Comments.POST(makeReq(`http://localhost/api/spaces/${spaceId}/posts/${postId}/comments`, { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ content: 'x' }) }) as any, { params: Promise.resolve({ spaceId, postId }) } as any);
    expect(cPostForbidden.status).toBe(403);
    // Member with bad parent
    await SpacesJoin.POST(makeReq('http://localhost/api/spaces/join', { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ spaceId }) }) as any, {} as any, { spaceId } as any, respond);
    const cParent404 = await Comments.POST(makeReq(`http://localhost/api/spaces/${spaceId}/posts/${postId}/comments`, { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ content: 'x', parentCommentId: 'nope' }) }) as any, { params: Promise.resolve({ spaceId, postId }) } as any);
    expect(cParent404.status).toBe(404);
  });

  it('Invalid reaction and non-member reaction blocked', async () => {
    const body = { name: 'ReactN', description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const created = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    const createdJson = await created.json();
    const spaceId = (createdJson.data?.space?.id) || createdJson.space?.id;
    const p = await Posts.POST(makeReq(`http://localhost/api/spaces/${spaceId}/posts`, { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify({ content: 'hello', type: 'text' }) }) as any, { params: Promise.resolve({ spaceId }) } as any);
    const pj = await p.json();
    const postId = pj.post.id;
    // Invalid reaction value
    const invalid = await PostDetail.POST(makeReq(`http://localhost/api/spaces/${spaceId}/posts/${postId}`, { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify({ reaction: 'fire' }) }) as any, { params: Promise.resolve({ spaceId, postId }) } as any);
    expect(invalid.status).toBe(400);
    // Non-member reaction
    const nonMem = await PostDetail.POST(makeReq(`http://localhost/api/spaces/${spaceId}/posts/${postId}`, { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ reaction: 'heart' }) }) as any, { params: Promise.resolve({ spaceId, postId }) } as any);
    expect(nonMem.status).toBe(403);
  });

  it('Member cannot change roles without permission; owner/admin protections enforced', async () => {
    const body = { name: 'RolesN', description: 'x', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true };
    const created = await SpacesRoot.POST(makeReq('http://localhost/api/spaces', { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify(body) }) as any, {} as any, body as any, respond);
    const c = await created.json();
    const spaceId = (c.data?.space?.id) || c.space?.id;
    await SpacesJoin.POST(makeReq('http://localhost/api/spaces/join', { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ spaceId }) }) as any, {} as any, { spaceId } as any, respond);
    await SpacesJoin.POST(makeReq('http://localhost/api/spaces/join', { method: 'POST', headers: { ...devAuth('u3'), 'content-type': 'application/json' }, body: JSON.stringify({ spaceId }) }) as any, {} as any, { spaceId } as any, respond);
    // u2 (member) tries to promote u3 -> 403
    const r403 = await MemberId.PATCH(makeReq(`http://localhost/api/spaces/${spaceId}/members/u3`, { method: 'PATCH', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ role: 'moderator' }) }) as any, { params: Promise.resolve({ spaceId, memberId: 'u3' }) } as any, respond);
    expect(r403.status).toBe(403);
    // Owner promotes u2 to admin
    const ok = await MemberId.PATCH(makeReq(`http://localhost/api/spaces/${spaceId}/members/u2`, { method: 'PATCH', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify({ role: 'admin' }) }) as any, { params: Promise.resolve({ spaceId, memberId: 'u2' }) } as any, respond);
    expect(ok.status).toBe(200);
    // Admin cannot demote owner
    const demoteOwner = await MemberId.PATCH(makeReq(`http://localhost/api/spaces/${spaceId}/members/u1`, { method: 'PATCH', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ role: 'member' }) }) as any, { params: Promise.resolve({ spaceId, memberId: 'u1' }) } as any, respond);
    expect(demoteOwner.status).toBe(403);
    // Admin cannot remove owner
    const removeOwner = await MemberId.DELETE(makeReq(`http://localhost/api/spaces/${spaceId}/members/u1`, { method: 'DELETE', headers: devAuth('u2') }) as any, { params: Promise.resolve({ spaceId, memberId: 'u1' }) } as any, respond);
    expect(removeOwner.status).toBe(403);
  });
});
