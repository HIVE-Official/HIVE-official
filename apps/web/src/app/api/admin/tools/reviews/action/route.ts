import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';

export const POST = withSecureAuth(async (request: NextRequest, token) => {
  try {
    const body = await request.json();
    const { requestId, action, notes, changes } = body as {
      requestId: string;
      action: 'approve' | 'reject' | 'request_changes';
      notes?: string;
      changes?: Array<{ type: string; description: string; priority: 'high'|'medium'|'low' }>;
    };
    if (!requestId || !action) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }
    const reqDoc = await dbAdmin.collection('publishRequests').doc(requestId).get();
    if (!reqDoc.exists || reqDoc.data()?.campusId !== CURRENT_CAMPUS_ID) {
      return NextResponse.json({ success: false, error: 'Publish request not found' }, { status: 404 });
    }
    const reqData = reqDoc.data() as any;
    const toolId = reqData?.toolId as string | undefined;
    if (!toolId) {
      return NextResponse.json({ success: false, error: 'Invalid request data' }, { status: 400 });
    }
    const toolDoc = await dbAdmin.collection('tools').doc(toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json({ success: false, error: 'Tool not found' }, { status: 404 });
    }
    const now = new Date().toISOString();
    const reviewerId = token?.uid || 'unknown';
    const newStatus = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'changes_requested';
    await dbAdmin.collection('publishRequests').doc(requestId).update({
      status: newStatus,
      reviewedBy: reviewerId,
      reviewedAt: now,
      reviewNotes: notes || null,
      requestedChanges: changes || [],
    });
    let toolUpdate: any = { updatedAt: now, lastReviewedBy: reviewerId };
    if (action === 'approve') {
      toolUpdate = {
        ...toolUpdate,
        status: 'published',
        publishedAt: now,
        publishType: reqData?.publishType,
        category: reqData?.category,
        tags: reqData?.tags,
        publishedDescription: reqData?.description,
        pricing: reqData?.pricing
      };
      if (reqData?.publishType === 'public') {
        // Ensure marketplace entry exists
        try {
          const existing = await dbAdmin
            .collection('marketplace')
            .where('toolId', '==', toolId)
            .limit(1)
            .get();
          if (existing.empty) {
            const t = toolDoc.data() as any;
            await dbAdmin.collection('marketplace').add({
              toolId,
              name: t?.name,
              description: reqData?.description,
              category: reqData?.category,
              tags: reqData?.tags || [],
              ownerId: reqData?.requestedBy,
              pricing: reqData?.pricing || { type: 'free' },
              stats: { downloads: 0, rating: 0, reviews: 0, favorites: 0 },
              publishedAt: now,
              featured: false,
              verified: true
            });
          }
        } catch (e) {
          logger.warn('Failed to create marketplace entry on approval', { e });
        }
      }
    } else if (action === 'reject') {
      toolUpdate = { ...toolUpdate, status: 'rejected' };
    }
    await dbAdmin.collection('tools').doc(toolId).update(toolUpdate);
    // Notify requester
    try {
      const message = action === 'approve'
        ? `Your tool has been approved and published.`
        : action === 'reject'
          ? `Your tool has been rejected. Please review the feedback.`
          : `Your tool needs changes before it can be published.`;
      await dbAdmin.collection('notifications').add({
        type: 'tool_review_result',
        title: 'Tool Review Update',
        message,
        data: { toolId, requestId, action, reviewNotes: notes, requestedChanges: changes || [] },
        recipients: [reqData?.requestedBy],
        createdAt: now,
        read: false
      });
    } catch {}
    // Log analytics event
    await dbAdmin.collection('analytics_events').add({
      eventType: 'tool_review_completed',
      toolId,
      userId: reviewerId,
      reviewAction: action,
      timestamp: now,
      metadata: { requestId }
    });
    return NextResponse.json({ success: true, status: newStatus });
  } catch (error) {
    logger.error('Admin tools review action error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to process review action' }, { status: 500 });
  }
}, { requireAdmin: true, allowedFields: ['requestId','action','notes','changes'] });
