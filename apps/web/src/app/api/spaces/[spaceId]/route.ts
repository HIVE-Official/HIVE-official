import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { type Space } from '@hive/core/src/domain/firestore/space';
import { getFirebaseAdmin } from '@hive/firebase/server';

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

    const spaceRef = db.collection('spaces').doc(spaceId);
    const doc = await spaceRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }

    const space = { id: doc.id, ...doc.data() } as Space;

    return NextResponse.json(space, { status: 200 });
  } catch (error) {
    console.error(`Error fetching space ${params.spaceId}:`, error);
    return NextResponse.json({ error: 'Failed to fetch space' }, { status: 500 });
  }
} 