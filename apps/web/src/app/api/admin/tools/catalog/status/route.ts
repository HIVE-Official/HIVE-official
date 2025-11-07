import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

export const POST = withSecureAuth(async (request: NextRequest, token) => {
  try {
    const body = await request.json();
    const { toolId, status } = body as { toolId: string; status: 'draft'|'published'|'hidden'|'rejected'|'paused' };
    if (!toolId || !status) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }

    const toolRef = dbAdmin.collection('tools').doc(toolId);
    const toolDoc = await toolRef.get();
    if (!toolDoc.exists || toolDoc.data()?.campusId !== CURRENT_CAMPUS_ID) {
      return NextResponse.json({ success: false, error: 'Tool not found' }, { status: 404 });
    }

    const now = new Date().toISOString();
    const updatedBy = token?.uid || 'unknown';
    await toolRef.update({ status, updatedAt: now, updatedBy });

    // Sync marketplace visibility if present
    try {
      const mpSnap = await dbAdmin.collection('marketplace').where('toolId', '==', toolId).limit(1).get();
      if (!mpSnap.empty) {
        const docId = mpSnap.docs[0].id;
        await dbAdmin.collection('marketplace').doc(docId).update({
          verified: status === 'published',
          hidden: status !== 'published',
          updatedAt: now,
        });
      }
    } catch (e) {
      logger.warn('Failed syncing marketplace visibility', { e });
    }

    await dbAdmin.collection('analytics_events').add({
      eventType: 'tool_status_updated',
      toolId,
      status,
      userId: updatedBy,
      timestamp: now,
    });

    return NextResponse.json({ success: true, status });
  } catch (error) {
    logger.error('Admin tools status update error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to update tool status' }, { status: 500 });
  }
}, { requireAdmin: true, allowedFields: ['toolId','status'] });
