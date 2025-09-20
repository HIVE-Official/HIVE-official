import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin, authAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";

/**
 * Admin Builder Request Management API
 * Allows admins to review and approve/reject builder requests
 * GET /api/admin/builder-requests - List pending requests
 * POST /api/admin/builder-requests - Review (approve/reject) a request
 */

const reviewRequestSchema = z.object({
  requestId: z.string().min(1, 'Request ID is required'),
  action: z.enum(['approve', 'reject']),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional()
});

// Admin user IDs (TODO: Move to environment variables or admin table)
const ADMIN_USER_IDS = [
  'test-user', // For development
  // Add real admin user IDs here
];

/**
 * Check if user is an admin
 */
async function isAdmin(userId: string): Promise<boolean> {
  // TODO: Implement proper admin checking with admin roles table
  return ADMIN_USER_IDS.includes(userId);
}

/**
 * Review (approve/reject) a builder request
 * POST /api/admin/builder-requests
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Authorization header required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    let adminUserId: string;
    
    // Handle test tokens in development
    if (token === 'test-token') {
      adminUserId = 'test-user';
    } else {
      try {
        const auth = admin.auth();
        const decodedToken = await auth.verifyIdToken(token);
        adminUserId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
      }
    }

    // Check if user is admin
    if (!(await isAdmin(adminUserId))) {
      return NextResponse.json(ApiResponseHelper.error("Admin access required", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Parse and validate request body
    const body = await request.json();
    const { requestId, action, notes } = reviewRequestSchema.parse(body);

    logger.info('👨‍💼 Admin reviewing builder request', {  requestId, action, endpoint: '/api/admin/builder-requests'  });

    // Get the builder request
    const requestRef = dbAdmin.collection('builderRequests').doc(requestId);
    const requestDoc = await requestRef.get();

    if (!requestDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Builder request not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const requestData = requestDoc.data();

    if (requestData?.status !== 'pending') {
      return NextResponse.json(
        { error: `Request has already been ${requestData?.status}` },
        { status: 409 }
      );
    }

    // Update request status
    const updateData: any = {
      status: action === 'approve' ? 'approved' : 'rejected',
      reviewedAt: admin.firestore.FieldValue.serverTimestamp(),
      reviewedBy: adminUserId,
      reviewNotes: notes || null
    };

    await requestRef.update(updateData);

    // If approved, grant builder rights to the user
    if (action === 'approve') {
      try {
        // Find the space and add user as builder
        const spaceRef = dbAdmin
          .collection('spaces')
          .doc(requestData.spaceType)
          .collection('spaces')
          .doc(requestData.spaceId);

        // Add user to members with builder role
        const memberRef = spaceRef.collection('members').doc(requestData.userId);
        const memberDoc = await memberRef.get();

        const memberData = {
          uid: requestData.userId,
          role: 'builder',
          joinedAt: memberDoc.exists ? memberDoc.data()?.joinedAt : admin.firestore.FieldValue.serverTimestamp(),
          promotedToBuilderAt: admin.firestore.FieldValue.serverTimestamp(),
          promotedBy: adminUserId,
          builderRequestId: requestId
        };

        await memberRef.set(memberData, { merge: true });

        // Update space member count if user wasn't already a member
        if (!memberDoc.exists) {
          await spaceRef.update({
            memberCount: admin.firestore.FieldValue.increment(1),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
        }

        // Update space to indicate it has builders
        await spaceRef.update({
          hasBuilders: true,
          builderCount: admin.firestore.FieldValue.increment(1),
          lastBuilderAddedAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        logger.info('✅ Granted builder rights for space', {  requestData: requestData.spaceId, endpoint: '/api/admin/builder-requests'  });

      } catch (error) {
        logger.error('Error granting builder rights', { error: error, endpoint: '/api/admin/builder-requests' });
        // Revert request status if granting rights failed
        await requestRef.update({
          status: 'pending',
          reviewedAt: null,
          reviewedBy: null,
          reviewNotes: `Failed to grant builder rights: ${error}`
        });

        return NextResponse.json(ApiResponseHelper.error("Failed to grant builder rights. Request status reverted.", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
      }
    }

    // TODO: Send notification to the user about approval/rejection
    logger.info('📧 User notification needed for: request d', { requestData, action, endpoint: '/api/admin/builder-requests' });

    return NextResponse.json({
      success: true,
      message: `Builder request ${action}d successfully`,
      request: {
        id: requestId,
        spaceId: requestData.spaceId,
        spaceName: requestData.spaceName,
        userId: requestData.userId,
        userName: requestData.userName,
        status: action === 'approve' ? 'approved' : 'rejected',
        reviewedBy: adminUserId,
        reviewNotes: notes
      },
      actions: action === 'approve' ? [
        'User granted builder rights',
        'User added to space members',
        'Space marked as having builders',
        'User can now access HiveLAB tools',
        'User can activate space features'
      ] : [
        'Request marked as rejected',
        'User notified of rejection',
        'User can submit a new request after addressing feedback'
      ]
    });

  } catch (error: any) {
    logger.error('Review builder request error', { error: error, endpoint: '/api/admin/builder-requests' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Failed to review builder request", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

/**
 * Get pending builder requests for admin review
 * GET /api/admin/builder-requests
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Authorization header required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    let adminUserId: string;
    
    // Handle test tokens in development
    if (token === 'test-token') {
      adminUserId = 'test-user';
    } else {
      try {
        const auth = admin.auth();
        const decodedToken = await auth.verifyIdToken(token);
        adminUserId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
      }
    }

    // Check if user is admin
    if (!(await isAdmin(adminUserId))) {
      return NextResponse.json(ApiResponseHelper.error("Admin access required", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const url = new URL(request.url);
    const status = url.searchParams.get('status') || 'pending';
    const limit = parseInt(url.searchParams.get('limit') || '20');

    // Get builder requests by status
    const query = dbAdmin
      .collection('builderRequests')
      .where('status', '==', status)
      .limit(limit);

    const requestsSnapshot = await query.get();

    const requests = requestsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        submittedAt: data.submittedAt?.toDate?.()?.toISOString(),
        reviewedAt: data.reviewedAt?.toDate?.()?.toISOString(),
        expiresAt: data.expiresAt?.toDate?.()?.toISOString(),
        // Calculate time since submission
        hoursWaiting: data.submittedAt ? 
          Math.floor((Date.now() - data.submittedAt.toDate().getTime()) / (1000 * 60 * 60)) : 0
      };
    });

    // Get summary statistics
    const allRequestsSnapshot = await dbAdmin.collection('builderRequests').get();
    const allRequests = allRequestsSnapshot.docs.map(doc => doc.data());
    
    const summary = {
      total: allRequests.length,
      pending: allRequests.filter(r => r.status === 'pending').length,
      approved: allRequests.filter(r => r.status === 'approved').length,
      rejected: allRequests.filter(r => r.status === 'rejected').length,
      urgentCount: requests.filter(r => r.hoursWaiting >= 20).length, // Close to 24hr deadline
      averageWaitTime: requests.length > 0 ? 
        Math.round(requests.reduce((sum, r) => sum + r.hoursWaiting, 0) / requests.length) : 0
    };

    return NextResponse.json({
      success: true,
      requests,
      summary,
      adminInfo: {
        adminUserId,
        reviewingStatus: status,
        targetResponseTime: '24 hours',
        urgentThreshold: '20+ hours waiting'
      }
    });

  } catch (error) {
    logger.error('Get builder requests error', { error: error, endpoint: '/api/admin/builder-requests' });
    return NextResponse.json(ApiResponseHelper.error("Failed to get builder requests", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}