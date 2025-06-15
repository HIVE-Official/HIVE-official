import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { type Space } from '@hive/core';
import { dbAdmin } from '@/lib/firebase-admin';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> },
) {
  let spaceId: string;
  
  try {
    ({ spaceId } = await params);

    if (!spaceId) {
      return NextResponse.json({ error: 'Space ID is required' }, { status: 400 });
    }

    const spaceRef = dbAdmin.collection('spaces').doc(spaceId);
    const doc = await spaceRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }

    const space = { id: doc.id, ...doc.data() } as Space;

    return NextResponse.json(space, { status: 200 });
  } catch (error) {
    console.error(`Error fetching space ${spaceId || 'unknown'}:`, error);
    return NextResponse.json({ error: 'Failed to fetch space' }, { status: 500 });
  }
} 