import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

// Logger silent
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));
vi.mock('@/lib/structured-logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));

// In-memory Firestore Admin + admin FieldValue
import { dbAdminMock, adminMock, getCollection, resetCollections } from '../utils/inmemory-firestore';
// server-only shim for Next.js server directive
vi.mock('server-only', () => ({}));
vi.mock('@/lib/firebase-admin', () => ({ dbAdmin: dbAdminMock }));
vi.mock('firebase-admin', () => adminMock);

// Mock getAuth token verification
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

// Mock SSE to be no-op
vi.mock('@/lib/sse-realtime-service', () => ({ sseRealtimeService: { sendMessage: vi.fn(async () => {}) } }));

// Import routes after mocks
import * as SpacesRoot from '@/app/api/spaces/route';
import * as SpacesJoin from '@/app/api/spaces/join/route';
import * as SpacesLeave from '@/app/api/spaces/leave/route';
import * as SpaceDetail from '@/app/api/spaces/[spaceId]/route';
import * as Members from '@/app/api/spaces/[spaceId]/members/route';
import * as MemberId from '@/app/api/spaces/[spaceId]/members/[memberId]/route';
import * as Posts from '@/app/api/spaces/[spaceId]/posts/route';
import * as PostDetail from '@/app/api/spaces/[spaceId]/posts/[postId]/route';
import * as Comments from '@/app/api/spaces/[spaceId]/posts/[postId]/comments/route';

const devAuth = (uid: string) => ({ authorization: `Bearer dev_token_${uid}` });

function makeReq(url: string, init?: RequestInit) {
  const headers = new Headers(init?.headers as any);
  const body = init?.body as any;
  const method = (init?.method || 'GET') as any;
  const req = new Request(url, { headers, method, body });
  return new NextRequest(req);
}

describe('Spaces Backend Endpoints', () => {
  beforeEach(() => {
    resetCollections();
    // Seed two users
    const daysAgo = (d: number) => ({ toDate: () => new Date(Date.now() - d * 24 * 60 * 60 * 1000) });
    getCollection('users').doc('u1').set({
      fullName: 'Owner One', email: 'u1@buffalo.edu', role: 'student',
      createdAt: daysAgo(8), // 8 days old
      isAdmin: false
    });
    getCollection('users').doc('u2').set({
      fullName: 'Member Two', email: 'u2@buffalo.edu', role: 'student',
      createdAt: daysAgo(30),
      isAdmin: false
    });
    getCollection('users').doc('u3').set({
      fullName: 'Invitee Three', email: 'u3@buffalo.edu', role: 'student',
      createdAt: daysAgo(30),
      isAdmin: false
    });
  });

  it('POST /api/spaces creates space and owner membership', async () => {
    const body = {
      name: 'UB Test Space',
      description: 'A space for testing',
      category: 'student_org',
      joinPolicy: 'open',
      tags: ['test'],
      agreedToGuidelines: true
    } as any;
    const res = await SpacesRoot.POST(
      makeReq('http://localhost/api/spaces', {
        method: 'POST',
        headers: { ...devAuth('u1'), 'content-type': 'application/json' },
        body: JSON.stringify(body)
      }) as any,
      {} as any,
      body,
      { success: (d: any) => new Response(JSON.stringify({ success: true, ...d }), { status: 201 }), error: (m: any,_c: any,o: any)=> new Response(JSON.stringify({ error: m }), { status: (o as any)?.status || 500 }) } as any
    );
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.success).toBe(true);
    const spaces = await getCollection('spaces').get();
    expect(spaces.docs.length).toBe(1);
    const members = await getCollection('spaceMembers').get();
    expect(members.docs.length).toBe(1);
    expect(members.docs[0].data().role).toBe('owner');
  });

  it('Join/Leave, Members list/invite/update/delete, Posts and Comments core flow', async () => {
    // Create space as u1
    const create = await SpacesRoot.POST(
      makeReq('http://localhost/api/spaces', {
        method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' },
        body: JSON.stringify({ name: 'Flow Space', description: 'Flow', category: 'student_org', joinPolicy: 'open', tags: [], agreedToGuidelines: true })
      }) as any,
      {} as any,
      {} as any,
      { success: (d: any) => new Response(JSON.stringify({ success: true, ...d }), { status: 201 }), error: (m: any,_c: any,o: any)=> new Response(JSON.stringify({ error: m }), { status: (o as any)?.status || 500 }) } as any
    );
    const created = await create.json();
    const spaceId = (created.data?.space?.id) || created.space?.id;

    // u2 joins
    const joinRes = await SpacesJoin.POST(
      makeReq('http://localhost/api/spaces/join', { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ spaceId }) }) as any,
      {} as any,
      { spaceId } as any,
      { success: (d: any) => new Response(JSON.stringify({ success: true, ...d }), { status: 200 }), error: (m: any,_c: any,o: any)=> new Response(JSON.stringify({ error: m }), { status: (o as any)?.status || 500 }) } as any
    );
    expect(joinRes.status).toBe(200);

    // Members GET by owner
    const membersRes = await Members.GET(
      makeReq(`http://localhost/api/spaces/${spaceId}/members?limit=50`, { headers: devAuth('u1') }) as any,
      { params: Promise.resolve({ spaceId }) } as any
    );
    expect(membersRes.status).toBe(200);
    const membersJson = await membersRes.json();
    expect(Array.isArray(membersJson.members)).toBe(true);
    expect(membersJson.members.length).toBeGreaterThanOrEqual(2);

    // Invite u3 by owner
    const inviteRes = await Members.POST(
      makeReq(`http://localhost/api/spaces/${spaceId}/members`, { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify({ userId: 'u3', role: 'member' }) }) as any,
      { params: Promise.resolve({ spaceId }) } as any
    );
    expect(inviteRes.status).toBe(200);

    // Promote u2 to moderator via RESTful endpoint
    const roleRes = await MemberId.PATCH(
      makeReq(`http://localhost/api/spaces/${spaceId}/members/u2`, { method: 'PATCH', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify({ role: 'moderator' }) }) as any,
      { params: Promise.resolve({ spaceId, memberId: 'u2' }) } as any,
      { success: (d: any) => new Response(JSON.stringify({ success: true, ...d }), { status: 200 }), error: (m: any,_c: any,o: any)=> new Response(JSON.stringify({ error: m }), { status: 403 }) } as any
    );
    expect(roleRes.status).toBe(200);

    // Create a post as owner
    const postCreate = await Posts.POST(
      makeReq(`http://localhost/api/spaces/${spaceId}/posts`, { method: 'POST', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify({ content: 'Hello', type: 'text' }) }) as any,
      { params: Promise.resolve({ spaceId }) } as any
    );
    expect(postCreate.status).toBe(201);
    const postJson = await postCreate.json();
    const postId = postJson.post.id;
    // Verify stored in in-memory collection
    const postsColl = await getCollection(`spaces/${spaceId}/posts`).get();
    expect(postsColl.docs.length).toBeGreaterThan(0);

    // List posts returns the post
    const postsList = await Posts.GET(
      makeReq(`http://localhost/api/spaces/${spaceId}/posts?limit=10`, { headers: devAuth('u1') }) as any,
      { params: Promise.resolve({ spaceId }) } as any
    );
    expect(postsList.status).toBe(200);
    const postsListJson = await postsList.json();
    expect(postsListJson.posts.length).toBeGreaterThan(0);

    // Add comment as u2
    const commentRes = await Comments.POST(
      makeReq(`http://localhost/api/spaces/${spaceId}/posts/${postId}/comments`, { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ content: 'Nice!' }) }) as any,
      { params: Promise.resolve({ spaceId, postId }) } as any
    );
    expect(commentRes.status).toBe(201);

    // List comments
    const commentList = await Comments.GET(
      makeReq(`http://localhost/api/spaces/${spaceId}/posts/${postId}/comments`, { headers: devAuth('u1') }) as any,
      { params: Promise.resolve({ spaceId, postId }) } as any
    );
    expect(commentList.status).toBe(200);
    const commentsJson = await commentList.json();
    expect(commentsJson.data.total ?? commentsJson.total).toBeDefined();

    // Remove u3 via RESTful endpoint as owner
    const removeRes = await MemberId.DELETE(
      makeReq(`http://localhost/api/spaces/${spaceId}/members/u3`, { method: 'DELETE', headers: devAuth('u1') }) as any,
      { params: Promise.resolve({ spaceId, memberId: 'u3' }) } as any,
      { success: (d: any) => new Response(JSON.stringify({ success: true, ...d }), { status: 200 }), error: (m: any,_c: any,o: any)=> new Response(JSON.stringify({ error: m }), { status: 403 }) } as any
    );
    expect(removeRes.status).toBe(200);

    // u2 leaves
    const leaveRes = await SpacesLeave.POST(
      makeReq('http://localhost/api/spaces/leave', { method: 'POST', headers: { ...devAuth('u2'), 'content-type': 'application/json' }, body: JSON.stringify({ spaceId }) }) as any,
      {} as any,
      { spaceId } as any,
      { success: (d: any) => new Response(JSON.stringify({ success: true, ...d }), { status: 200 }), error: (m: any,_c: any,o: any)=> new Response(JSON.stringify({ error: m }), { status: 403 }) } as any
    );
    expect(leaveRes.status).toBe(200);

    // Space detail and update
    const spaceGet = await SpaceDetail.GET(
      makeReq(`http://localhost/api/spaces/${spaceId}`, { headers: devAuth('u1') }) as any,
      { params: Promise.resolve({ spaceId }) } as any,
      { success: (d: any) => new Response(JSON.stringify({ success: true, ...d }), { status: 200 }), error: (m: any,_c: any,o: any)=> new Response(JSON.stringify({ error: m }), { status: 404 }) } as any
    );
    expect(spaceGet.status).toBe(200);

    const patch = await SpaceDetail.PATCH(
      makeReq(`http://localhost/api/spaces/${spaceId}`, { method: 'PATCH', headers: { ...devAuth('u1'), 'content-type': 'application/json' }, body: JSON.stringify({ description: 'Updated' }) }) as any,
      { params: Promise.resolve({ spaceId }) } as any,
      { description: 'Updated' } as any,
      { success: (d: any) => new Response(JSON.stringify({ success: true, ...d }), { status: 200 }), error: (m: any,_c: any,o: any)=> new Response(JSON.stringify({ error: m }), { status: 403 }) } as any
    );
    expect(patch.status).toBe(200);
  });
});
