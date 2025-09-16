import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// POST /api/presence/offline - Mark user as offline
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }
    
    // Update presence to offline
    await dbAdmin.collection('presence').doc(userId).set({
      isOnline: false,
      lastSeen: FieldValue.serverTimestamp()
    }, { merge: true });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error updating presence:', { error: String(error) });
    return NextResponse.json(
      { error: 'Failed to update presence' },
      { status: 500 }
    );
  }
}