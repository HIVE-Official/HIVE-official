import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { getFirebaseAdmin } from '@hive/firebase/server';
import { type Post } from '@hive/core/src/domain/firestore/post';

export async function GET(
  request: Request,
  { params }: { params: { spaceId: string } },
) {
  try {
    getFirebaseAdmin();
    const db = admin.firestore();
    const { spaceId } = params;

    if (!spaceId) {
      return NextResponse.json({ error: 'Space ID is required' }, { status: 400 });
    }

    const postsRef = db.collection('spaces').doc(spaceId).collection('posts');
    const snapshot = await postsRef.orderBy('createdAt', 'desc').limit(20).get();

    if (snapshot.empty) {
      return NextResponse.json([], { status: 200 });
    }

    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(`Error fetching feed for space ${params.spaceId}:`, error);
    return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 });
  }
} 