import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

export const GET = withSecureAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);
    const ownerId = searchParams.get('ownerId') || undefined;
    const q = (searchParams.get('q') || '').toLowerCase();

    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = dbAdmin
      .collection('tools')
      .where('campusId', '==', CURRENT_CAMPUS_ID);
    if (status !== 'all') query = query.where('status', '==', status);
    if (ownerId) query = query.where('ownerId', '==', ownerId);

    const snap = await query.orderBy('updatedAt', 'desc').offset(offset).limit(limit).get();
    let rows = snap.docs.map(doc => {
      const t = doc.data() as any;
      return {
        id: doc.id,
        name: t.name,
        status: t.status,
        currentVersion: t.currentVersion,
        ownerId: t.ownerId,
        installCount: t.installCount || 0,
        lastInstalledAt: t.lastInstalledAt || null,
        updatedAt: t.updatedAt || t.updatedAt?.toDate?.()?.toISOString() || null,
      };
    });
    if (q) {
      rows = rows.filter(r => (r.name || '').toLowerCase().includes(q) || (r.id || '').toLowerCase().includes(q));
    }
    return NextResponse.json({ success: true, tools: rows, count: rows.length });
  } catch (error) {
    logger.error('Admin tools catalog list error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to load tools' }, { status: 500 });
  }
}, { requireAdmin: true });
