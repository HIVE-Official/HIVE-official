import { dbAdmin as adminDb } from '@/lib/firebase-admin';
import { z } from 'zod';
import { logger } from "@/lib/structured-logger";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import {
  withAuthAndErrors,
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";

const PublishRequestSchema = z.object({
  toolId: z.string(),
  publishType: z.enum(['public', 'space_only', 'private']),
  category: z.string(),
  tags: z.array(z.string()).max(10),
  description: z.string().min(10).max(500),
  changelog: z.string().optional(),
  pricing: z.object({
    type: z.enum(['free', 'paid', 'freemium']),
    price: z.number().optional(),
    currency: z.string().optional()
  }).optional(),
  termsAccepted: z.boolean(),
  guidelines: z.object({
    contentAppropriate: z.boolean(),
    functionalityTested: z.boolean(),
    documentationComplete: z.boolean(),
    privacyCompliant: z.boolean()
  })
});

interface PublishRequest {
  id?: string;
  toolId: string;
  requestedBy: string;
  publishType: 'public' | 'space_only' | 'private';
  category: string;
  tags: string[];
  description: string;
  changelog?: string;
  pricing?: {
    type: 'free' | 'paid' | 'freemium';
    price?: number;
    currency?: string;
  };
  guidelines: {
    contentAppropriate: boolean;
    functionalityTested: boolean;
    documentationComplete: boolean;
    privacyCompliant: boolean;
  };
  status: 'pending' | 'approved' | 'rejected' | 'changes_requested';
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  requestedAt: string;
  publishedAt?: string;
}

// POST - Submit tool for publishing
export const POST = withAuthValidationAndErrors(
  PublishRequestSchema,
  async (
    request: AuthenticatedRequest,
    _context,
    validatedData,
    respond
  ) => {
    try {
      const userId = getUserId(request);

    // Get tool details
    const toolDoc = await adminDb.collection('tools').doc(validatedData.toolId).get();
    if (!toolDoc.exists) {
        return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const toolData = toolDoc.data();
    
    // Check ownership
    if (toolData?.ownerId !== userId) {
        return respond.error("Not authorized to publish this tool", "FORBIDDEN", { status: 403 });
    }

    if (toolData?.campusId && toolData.campusId !== CURRENT_CAMPUS_ID) {
        return respond.error("Access denied for this campus", "FORBIDDEN", { status: 403 });
    }

    // Check tool readiness
    if (!toolData?.elements || toolData.elements.length === 0) {
        return respond.error("Tool must have at least one element", "INVALID_INPUT", { status: 400 });
    }

    // Check for existing publish request
    const existingRequestSnapshot = await adminDb
      .collection('publishRequests')
      .where('toolId', '==', validatedData.toolId)
      .where('status', 'in', ['pending', 'changes_requested'])
      .get();

    if (!existingRequestSnapshot.empty) {
        return respond.error("Tool already has a pending publish request", "CONFLICT", { status: 409 });
    }

    // Validate guidelines acceptance
    const { guidelines } = validatedData;
    if (!guidelines.contentAppropriate || !guidelines.functionalityTested || 
        !guidelines.documentationComplete || !guidelines.privacyCompliant) {
        return respond.error("All publishing guidelines must be accepted", "INVALID_INPUT", { status: 400 });
    }

    const now = new Date();
    const publishRequest: PublishRequest = {
      toolId: validatedData.toolId,
        requestedBy: userId,
      publishType: validatedData.publishType,
      category: validatedData.category,
      tags: validatedData.tags,
      description: validatedData.description,
      changelog: validatedData.changelog,
      pricing: validatedData.pricing,
      guidelines: validatedData.guidelines,
      status: 'pending',
      requestedAt: now.toISOString()
    };

    // Create publish request
    const requestRef = await adminDb.collection('publishRequests').add({ ...publishRequest, campusId: CURRENT_CAMPUS_ID } as any);

    // Update tool status to pending_review
    await adminDb.collection('tools').doc(validatedData.toolId).update({
      status: 'pending_review',
      publishRequest: {
        id: requestRef.id,
        status: 'pending',
        requestedAt: now.toISOString()
      },
      updatedAt: now.toISOString()
    });

    // Create notification for admins
    await adminDb.collection('notifications').add({
      type: 'tool_publish_request',
      title: 'New Tool Publish Request',
      message: `${toolData.name} has been submitted for publishing review`,
      data: {
        toolId: validatedData.toolId,
        toolName: toolData.name,
        requestId: requestRef.id,
        requestedBy: userId
      },
      recipients: ['admin'],
      createdAt: now.toISOString(),
      read: false
    });

    // Log activity
    await adminDb.collection('analytics_events').add({
      eventType: 'tool_publish_requested',
        userId,
      toolId: validatedData.toolId,
      publishType: validatedData.publishType,
      timestamp: now.toISOString(),
      metadata: {
        requestId: requestRef.id,
        category: validatedData.category,
        tags: validatedData.tags
      }
    });

      return respond.created({
      requestId: requestRef.id,
      status: 'pending',
      message: 'Tool submitted for publishing review',
      estimatedReviewTime: '2-3 business days'
      });

  } catch (error) {
    logger.error(
      `Error submitting publish request at /api/tools/publish`,
      error instanceof Error ? error : new Error(String(error))
    );
      return respond.error("Failed to submit publish request", "INTERNAL_ERROR", { status: 500 });
  }
  }
);

// GET - Get publish request status
export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  _context,
  respond
) => {
  try {
    const userId = getUserId(request);

    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get('toolId');

    if (!toolId) {
      return respond.error("Tool ID required", "INVALID_INPUT", { status: 400 });
    }

    // Get tool details to check ownership
    const toolDoc = await adminDb.collection('tools').doc(toolId).get();
    if (!toolDoc.exists) {
      return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const toolData = toolDoc.data();
    if (toolData?.ownerId !== userId) {
      return respond.error("Not authorized to view this publish request", "FORBIDDEN", { status: 403 });
    }

    // Get publish request
    const requestSnapshot = await adminDb
      .collection('publishRequests')
      .where('toolId', '==', toolId)
      .orderBy('requestedAt', 'desc')
      .limit(1)
      .get();

    if (requestSnapshot.empty) {
      return respond.error("No publish request found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const publishRequest = {
      id: requestSnapshot.docs[0].id,
      ...requestSnapshot.docs[0].data()
    };

    return respond.success({ publishRequest });

  } catch (error) {
    logger.error(
      `Error fetching publish request at /api/tools/publish`,
      error instanceof Error ? error : new Error(String(error))
    );
    return respond.error("Failed to fetch publish request", "INTERNAL_ERROR", { status: 500 });
  }
});
