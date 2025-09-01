import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin as adminDb } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth-server';
import { z } from 'zod';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";

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
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const validatedData = PublishRequestSchema.parse(body);

    // Get tool details
    const toolDoc = await adminDb.collection('tools').doc(validatedData.toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const toolData = toolDoc.data();
    
    // Check ownership
    if (toolData?.ownerId !== user.uid) {
      return NextResponse.json(ApiResponseHelper.error("Not authorized to publish this tool", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Check tool readiness
    if (!toolData?.elements || toolData.elements.length === 0) {
      return NextResponse.json(ApiResponseHelper.error("Tool must have at least one element", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Check for existing publish request
    const existingRequestSnapshot = await adminDb
      .collection('publishRequests')
      .where('toolId', '==', validatedData.toolId)
      .where('status', 'in', ['pending', 'changes_requested'])
      .get();

    if (!existingRequestSnapshot.empty) {
      return NextResponse.json(ApiResponseHelper.error("Tool already has a pending publish request", "UNKNOWN_ERROR"), { status: 409 });
    }

    // Validate guidelines acceptance
    const { guidelines } = validatedData;
    if (!guidelines.contentAppropriate || !guidelines.functionalityTested || 
        !guidelines.documentationComplete || !guidelines.privacyCompliant) {
      return NextResponse.json(ApiResponseHelper.error("All publishing guidelines must be accepted", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const now = new Date();
    const publishRequest: PublishRequest = {
      toolId: validatedData.toolId,
      requestedBy: user.uid,
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
    const requestRef = await adminDb.collection('publishRequests').add(publishRequest);

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
        requestedBy: user.uid
      },
      recipients: ['admin'],
      createdAt: now.toISOString(),
      read: false
    });

    // Log activity
    await adminDb.collection('analytics_events').add({
      eventType: 'tool_publish_requested',
      userId: user.uid,
      toolId: validatedData.toolId,
      publishType: validatedData.publishType,
      timestamp: now.toISOString(),
      metadata: {
        requestId: requestRef.id,
        category: validatedData.category,
        tags: validatedData.tags
      }
    });

    return NextResponse.json({
      requestId: requestRef.id,
      status: 'pending',
      message: 'Tool submitted for publishing review',
      estimatedReviewTime: '2-3 business days'
    }, { status: HttpStatus.CREATED });

  } catch (error) {
    logger.error('Error submitting publish request', { error: error, endpoint: '/api/tools/publish' });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Invalid request data',
        details: error.errors
      }, { status: HttpStatus.BAD_REQUEST });
    }

    return NextResponse.json(ApiResponseHelper.error("Failed to submit publish request", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET - Get publish request status
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get('toolId');

    if (!toolId) {
      return NextResponse.json(ApiResponseHelper.error("Tool ID required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get tool details to check ownership
    const toolDoc = await adminDb.collection('tools').doc(toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const toolData = toolDoc.data();
    if (toolData?.ownerId !== user.uid) {
      return NextResponse.json(ApiResponseHelper.error("Not authorized to view this publish request", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get publish request
    const requestSnapshot = await adminDb
      .collection('publishRequests')
      .where('toolId', '==', toolId)
      .orderBy('requestedAt', 'desc')
      .limit(1)
      .get();

    if (requestSnapshot.empty) {
      return NextResponse.json(ApiResponseHelper.error("No publish request found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const publishRequest = {
      id: requestSnapshot.docs[0].id,
      ...requestSnapshot.docs[0].data()
    };

    return NextResponse.json({ publishRequest });

  } catch (error) {
    logger.error('Error fetching publish request', { error: error, endpoint: '/api/tools/publish' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch publish request", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}