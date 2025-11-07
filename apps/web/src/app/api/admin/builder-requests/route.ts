import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin, authAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { withSecureAuth } from '@/lib/api-auth-secure';

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
export const POST = withSecureAuth(async (request: NextRequest, token) => {
  try {
    const adminUserId = token?.uid || 'unknown';

    // Parse and validate request body
    const body = await request.json();
    const { requestId, action, notes } = reviewRequestSchema.parse(body);

    logger.info('👨‍💼 Admin reviewing builder request', {  requestId, action  });

    // Get the builder request
    const requestRef = dbAdmin.collection('builderRequests').doc(requestId);
    const requestDoc = await requestRef.get();

    if (!requestDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Builder request not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const requestData = requestDoc.data() as any;

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

        logger.info('✅ Granted builder rights for space', {  requestData: requestData.spaceId  });

      } catch (error) {
        logger.error('Error granting builder rights', { error: error instanceof Error ? error : new Error(String(error))});
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
    logger.info('📧 User notification needed for: request d', { requestData, action });

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
    logger.error('Review builder request error', { error: error instanceof Error ? error : new Error(String(error))});

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
}, { requireAdmin: true });

/**
 * Get pending builder requests for admin review
 * GET /api/admin/builder-requests
 */
export const GET = withSecureAuth(async (request: NextRequest, token) => {
  try {
    const adminUserId = token?.uid || 'unknown';

    const url = new URL(request.url);
    const status = url.searchParams.get('status') || 'pending';
    const limit = parseInt(url.searchParams.get('limit') || '20');

    // Get builder requests by status
    const query = dbAdmin
      .collection('builderRequests')
      .where('status', '==', status)
      .limit(limit);

    const requestsSnapshot = await query.get();

    // Filter by campus: use request.campusId if present; otherwise check target space
    const requests = (await Promise.all(requestsSnapshot.docs.map(async (doc) => {
      const data = doc.data() as any;
      // quick path: campusId on request
      if (data.campusId && data.campusId !== CURRENT_CAMPUS_ID) return null;
      if (!data.campusId && data.spaceType && data.spaceId) {
        try {
          const spaceDoc = await dbAdmin
            .collection('spaces')
            .doc(data.spaceType)
            .collection('spaces')
            .doc(data.spaceId)
            .get();
          if (!spaceDoc.exists || (spaceDoc.data()?.campusId && spaceDoc.data()!.campusId !== CURRENT_CAMPUS_ID)) {
            return null;
          }
        } catch {
          return null;
        }
      }
      return {
        id: doc.id,
        ...data,
        submittedAt: data.submittedAt?.toDate?.()?.toISOString(),
        reviewedAt: data.reviewedAt?.toDate?.()?.toISOString(),
        expiresAt: data.expiresAt?.toDate?.()?.toISOString(),
        hoursWaiting: data.submittedAt ? Math.floor((Date.now() - data.submittedAt.toDate().getTime()) / (1000 * 60 * 60)) : 0
      };
    }))).filter(Boolean) as any[];

    // Get summary statistics
    // Summary limited to current campus
    const allRequestsSnapshot = await dbAdmin.collection('builderRequests').get();
    const allRequestsRaw = allRequestsSnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
    const allRequests = await Promise.all(allRequestsRaw.map(async (r) => {
      if (r.campusId) return r.campusId === CURRENT_CAMPUS_ID ? r : null;
      if (r.spaceType && r.spaceId) {
        try {
          const sd = await dbAdmin.collection('spaces').doc(r.spaceType).collection('spaces').doc(r.spaceId).get();
          return sd.exists && (sd.data()?.campusId === CURRENT_CAMPUS_ID) ? r : null;
        } catch {
          return null;
        }
      }
      return null;
    }));
    const allRequestsFiltered = allRequests.filter(Boolean) as any[];
    
    const summary = {
      total: allRequestsFiltered.length,
      pending: allRequestsFiltered.filter(r => r.status === 'pending').length,
      approved: allRequestsFiltered.filter(r => r.status === 'approved').length,
      rejected: allRequestsFiltered.filter(r => r.status === 'rejected').length,
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
    logger.error('Get builder requests error', { error: error instanceof Error ? error : new Error(String(error))});
    return NextResponse.json(ApiResponseHelper.error("Failed to get builder requests", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { requireAdmin: true });
    // Enforce campus isolation: verify the request's target space is on current campus
    try {
      const spaceRef = dbAdmin
        .collection('spaces')
        .doc(requestData.spaceType)
        .collection('spaces')
        .doc(requestData.spaceId);
      const spaceDoc = await spaceRef.get();
      if (!spaceDoc.exists || (spaceDoc.data()?.campusId && spaceDoc.data()!.campusId !== CURRENT_CAMPUS_ID)) {
        return NextResponse.json(ApiResponseHelper.error('Access denied - campus mismatch', 'FORBIDDEN'), { status: HttpStatus.FORBIDDEN });
      }
    } catch (e) {
      return NextResponse.json(ApiResponseHelper.error('Failed to validate space campus', 'INTERNAL_ERROR'), { status: HttpStatus.INTERNAL_SERVER_ERROR });
    }
