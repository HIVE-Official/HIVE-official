import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

export const GET = withSecureAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    const limit = Math.min(parseInt(searchParams.get('limit') || '25'), 100);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);
    const category = searchParams.get('category') || undefined;
    const toolId = searchParams.get('toolId') || undefined;

    let query = dbAdmin.collection('publishRequests').where('campusId', '==', CURRENT_CAMPUS_ID).where('status', '==', status).orderBy('requestedAt', 'desc');
    if (toolId) query = query.where('toolId', '==', toolId) as any;
    const snap = await (query as any).offset(offset).limit(limit).get();

    const rows: Array<any> = [];
    for (const doc of snap.docs) {
      const data = doc.data() as any;
      const toolId = data.toolId as string | undefined;
      const requestedBy = data.requestedBy as string | undefined;
      let tool: any = null;
      let requester: any = null;
      try {
        if (toolId) {
          const toolDoc = await dbAdmin.collection('tools').doc(toolId).get();
          if (toolDoc.exists) {
            const t = toolDoc.data() as any;
            tool = { id: toolDoc.id, name: t.name, status: t.status, currentVersion: t.currentVersion };
          }
        }
      } catch {}
      try {
        if (requestedBy) {
          const userDoc = await dbAdmin.collection('users').doc(requestedBy).get();
          if (userDoc.exists) {
            const u = userDoc.data() as any;
            requester = { id: userDoc.id, displayName: u.displayName, email: u.email };
          }
        }
      } catch {}

      if (category && data.category !== category) continue;
      rows.push({
        id: doc.id,
        status: data.status,
        requestedAt: data.requestedAt || data.requestedAt?.toDate?.()?.toISOString(),
        publishType: data.publishType,
        category: data.category,
        tool,
        requester,
      });
    }

    return NextResponse.json({ success: true, reviews: rows, count: rows.length });
  } catch (error) {
    logger.error('Admin tools reviews list error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to load reviews' }, { status: 500 });
  }
}, { requireAdmin: true });
