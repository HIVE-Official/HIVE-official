import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, addDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { dbAdmin as adminDb } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth-server';
import { z } from 'zod';

const ReviewActionSchema = z.object({
  requestId: z.string(),
  action: z.enum(['approve', 'reject', 'request_changes']),
  notes: z.string().optional(),
  changes: z.array(z.object({
    type: z.enum(['content', 'functionality', 'privacy', 'performance']),
    description: z.string(),
    priority: z.enum(['high', 'medium', 'low'])
  })).optional()
});

interface ReviewAction {
  requestId: string;
  action: 'approve' | 'reject' | 'request_changes';
  reviewedBy: string;
  reviewedAt: string;
  notes?: string;
  changes?: Array<{
    type: 'content' | 'functionality' | 'privacy' | 'performance';
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

// POST - Review tool publish request (Admin only)
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin/reviewer
    const userDoc = await adminDb.collection('users').doc(user.uid).get();
    const userData = userDoc.data();
    
    if (!userData?.roles?.includes('admin') && !userData?.roles?.includes('tool_reviewer')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = ReviewActionSchema.parse(body);

    // Get publish request
    const requestDoc = await adminDb.collection('publishRequests').doc(validatedData.requestId).get();
    if (!requestDoc.exists) {
      return NextResponse.json({ error: 'Publish request not found' }, { status: 404 });
    }

    const requestData = requestDoc.data();
    if (requestData?.status !== 'pending' && requestData?.status !== 'changes_requested') {
      return NextResponse.json({ error: 'Request has already been reviewed' }, { status: 400 });
    }

    // Get tool details
    const toolDoc = await adminDb.collection('tools').doc(requestData?.toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }

    const toolData = toolDoc.data();
    const now = new Date();

    // Update publish request status
    const updatedRequest = {
      status: validatedData.action === 'approve' ? 'approved' : 
              validatedData.action === 'reject' ? 'rejected' : 'changes_requested',
      reviewedBy: user.uid,
      reviewedAt: now.toISOString(),
      reviewNotes: validatedData.notes,
      requestedChanges: validatedData.changes
    };

    await adminDb.collection('publishRequests').doc(validatedData.requestId).update(updatedRequest);

    let toolUpdate: any = {
      updatedAt: now.toISOString(),
      publishRequest: {
        ...requestData?.publishRequest,
        status: updatedRequest.status,
        reviewedAt: now.toISOString()
      }
    };

    // Handle approval
    if (validatedData.action === 'approve') {
      toolUpdate = {
        ...toolUpdate,
        status: 'published',
        publishedAt: now.toISOString(),
        publishType: requestData?.publishType,
        category: requestData?.category,
        tags: requestData?.tags,
        publishedDescription: requestData?.description,
        pricing: requestData?.pricing
      };

      // If publishing publicly, add to marketplace
      if (requestData?.publishType === 'public') {
        await adminDb.collection('marketplace').add({
          toolId: requestData?.toolId,
          name: toolData?.name,
          description: requestData?.description,
          category: requestData?.category,
          tags: requestData?.tags,
          ownerId: requestData?.requestedBy,
          pricing: requestData?.pricing || { type: 'free' },
          stats: {
            downloads: 0,
            rating: 0,
            reviews: 0,
            favorites: 0
          },
          publishedAt: now.toISOString(),
          featured: false,
          verified: true
        });
      }
    }

    // Handle rejection or changes requested
    if (validatedData.action === 'reject') {
      toolUpdate.status = 'draft';
    } else if (validatedData.action === 'request_changes') {
      toolUpdate.status = 'needs_changes';
    }

    await adminDb.collection('tools').doc(requestData?.toolId).update(toolUpdate);

    // Create notification for tool owner
    const notificationMessage = 
      validatedData.action === 'approve' ? `Your tool "${toolData?.name}" has been approved and published!` :
      validatedData.action === 'reject' ? `Your tool "${toolData?.name}" has been rejected. Please review the feedback.` :
      `Your tool "${toolData?.name}" needs some changes before it can be published.`;

    await adminDb.collection('notifications').add({
      type: 'tool_review_result',
      title: 'Tool Review Update',
      message: notificationMessage,
      data: {
        toolId: requestData?.toolId,
        toolName: toolData?.name,
        requestId: validatedData.requestId,
        action: validatedData.action,
        reviewNotes: validatedData.notes,
        requestedChanges: validatedData.changes
      },
      recipients: [requestData?.requestedBy],
      createdAt: now.toISOString(),
      read: false
    });

    // Log activity
    await adminDb.collection('analytics_events').add({
      eventType: 'tool_review_completed',
      userId: user.uid,
      toolId: requestData?.toolId,
      reviewAction: validatedData.action,
      timestamp: now.toISOString(),
      metadata: {
        requestId: validatedData.requestId,
        requestedBy: requestData?.requestedBy,
        hasNotes: !!validatedData.notes,
        changesRequested: validatedData.changes?.length || 0
      }
    });

    return NextResponse.json({
      message: `Tool review completed - ${validatedData.action}`,
      status: updatedRequest.status,
      reviewId: validatedData.requestId
    });

  } catch (error) {
    console.error('Error reviewing tool:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Invalid review data',
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to review tool' }, { status: 500 });
  }
}

// GET - Get pending review requests (Admin only)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin/reviewer
    const userDoc = await adminDb.collection('users').doc(user.uid).get();
    const userData = userDoc.data();
    
    if (!userData?.roles?.includes('admin') && !userData?.roles?.includes('tool_reviewer')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    const limitParam = parseInt(searchParams.get('limit') || '20');

    // Get review requests
    const requestsSnapshot = await adminDb
      .collection('publishRequests')
      .where('status', '==', status)
      .orderBy('requestedAt', 'desc')
      .limit(limitParam)
      .get();

    const requests = [];
    for (const doc of requestsSnapshot.docs) {
      const requestData = { id: doc.id, ...doc.data() };
      
      // Get tool details
      const toolDoc = await adminDb.collection('tools').doc(requestData.toolId).get();
      const toolData = toolDoc.exists ? toolDoc.data() : null;

      // Get requester details
      const userDoc = await adminDb.collection('users').doc(requestData.requestedBy).get();
      const requesterData = userDoc.exists ? userDoc.data() : null;

      requests.push({
        ...requestData,
        tool: toolData ? {
          id: requestData.toolId,
          name: toolData.name,
          description: toolData.description,
          elements: toolData.elements?.length || 0,
          createdAt: toolData.createdAt
        } : null,
        requester: requesterData ? {
          id: requestData.requestedBy,
          displayName: requesterData.displayName,
          email: requesterData.email
        } : null
      });
    }

    return NextResponse.json({
      requests,
      count: requests.length,
      status
    });

  } catch (error) {
    console.error('Error fetching review requests:', error);
    return NextResponse.json({ error: 'Failed to fetch review requests' }, { status: 500 });
  }
}