import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

export const GET = withSecureAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);
    const deployedTo = searchParams.get('deployedTo'); // profile|space
    const toolId = searchParams.get('toolId') || undefined;

    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = dbAdmin
      .collection('deployedTools')
      .where('campusId', '==', CURRENT_CAMPUS_ID);
    if (status) query = query.where('status', '==', status);
    if (deployedTo) query = query.where('deployedTo', '==', deployedTo);
    if (toolId) query = query.where('toolId', '==', toolId);
    const snap = await query.orderBy('deployedAt', 'desc').offset(offset).limit(limit).get();

    const rows: Array<any> = [];
    for (const doc of snap.docs) {
      const d = doc.data() as any;
      const toolId = d.toolId as string | undefined;
      let tool: any = null;
      try {
        if (toolId) {
          const toolDoc = await dbAdmin.collection('tools').doc(toolId).get();
          if (toolDoc.exists) {
            const t = toolDoc.data() as any;
            tool = { id: toolDoc.id, name: t.name, version: t.currentVersion };
          }
        }
      } catch {}

      rows.push({
        id: doc.id,
        toolId,
        tool,
        status: d.status,
        deployedTo: d.deployedTo,
        targetId: d.targetId,
        surface: d.surface,
        deployedAt: d.deployedAt,
      });
    }

    return NextResponse.json({ success: true, deployments: rows, count: rows.length });
  } catch (error) {
    logger.error('Admin tools deployments list error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to load deployments' }, { status: 500 });
  }
}, { requireAdmin: true });
