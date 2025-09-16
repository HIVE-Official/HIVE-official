import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase/admin/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { getCurrentUser } from "@/lib/server-auth";
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from "@/lib/api/response-types/api-response-types";

const coordinationResponseSchema = z.object({
  postId: z.string().min(1),
  action: z.enum(['join', 'interested', 'maybe', 'cant_make_it', 'leave']),
  message: z.string().optional(),
  availability: z.object({
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    flexible: z.boolean().default(false)
  }).optional(),
  preferences: z.record(z.string()).optional()
});

/**
 * Handle coordination responses for Enhanced Post Board
 * POST /api/spaces/[spaceId]/coordination
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const { spaceId } = await params;
    const body = await request.json();
    const { postId, action, message, availability, preferences } = coordinationResponseSchema.parse(body);

    // Get space and verify user is a member
    const spaceRef = dbAdmin.collection("spaces").doc(spaceId);
    const spaceDoc = await spaceRef.get();
    
    if (!spaceDoc.exists) {
      return NextResponse.json(
        ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    // Check if user is a member using flat spaceMembers collection
    const memberSnapshot = await dbAdmin
      .collection("spaceMembers")
      .where("spaceId", "==", spaceId)
      .where("userId", "==", user.uid)
      .limit(1)
      .get();
    
    const memberDoc = memberSnapshot.empty ? null : memberSnapshot.docs[0];
    
    if (!memberDoc) {
      return NextResponse.json(
        ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"),
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Get the post
    const postRef = spaceRef.collection("posts").doc(postId);
    const postDoc = await postRef.get();
    
    if (!postDoc.exists) {
      return NextResponse.json(
        ApiResponseHelper.error("Post not found", "RESOURCE_NOT_FOUND"),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    const postData = postDoc.data();
    
    // Verify this is a coordination post
    if (!postData?.coordinationType) {
      return NextResponse.json(
        ApiResponseHelper.error("Not a coordination post", "INVALID_INPUT"),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Create or update coordination response
    const responseRef = postRef.collection("coordinationResponses").doc(user.uid);
    const responseData = {
      userId: user.uid,
      userName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
      userPhoto: user.photoURL || null,
      action,
      response: action === 'join' ? 'yes' : action === 'interested' ? 'maybe' : action === 'cant_make_it' ? 'no' : 'maybe',
      message: message || null,
      availability: availability || null,
      preferences: preferences || null,
      timestamp: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    };

    // Use batch for atomic operations
    const batch = dbAdmin.batch();

    // Set/update the response
    batch.set(responseRef, responseData);

    // Update post coordination stats
    const currentResponses = postData.coordinationStats || {};
    const userPreviousAction = (await responseRef.get()).data()?.action;
    
    // Decrement old action count if user had a previous response
    if (userPreviousAction && currentResponses[userPreviousAction]) {
      currentResponses[userPreviousAction] = Math.max(0, currentResponses[userPreviousAction] - 1);
    }
    
    // Increment new action count
    currentResponses[action] = (currentResponses[action] || 0) + 1;

    batch.update(postRef, {
      coordinationStats: currentResponses,
      lastActivity: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });

    await batch.commit();

    logger.info('Coordination response added', {
      spaceId,
      postId,
      userId: user.uid,
      action,
      coordinationType: postData.coordinationType,
      endpoint: '/api/spaces/[spaceId]/coordination'
    });

    return NextResponse.json({
      success: true,
      message: "Coordination response recorded",
      response: {
        userId: user.uid,
        action,
        message,
        timestamp: new Date().toISOString()
      },
      coordinationStats: currentResponses
    });

  } catch (error) {
    logger.error('Coordination response error', {
      error,
      spaceId: (await params).spaceId,
      endpoint: '/api/spaces/[spaceId]/coordination'
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      ApiResponseHelper.error("Failed to process coordination response", "INTERNAL_ERROR"),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * Get coordination responses for a post
 * GET /api/spaces/[spaceId]/coordination?postId=xxx
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const { spaceId } = await params;
    const url = new URL(request.url);
    const postId = url.searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json(
        ApiResponseHelper.error("Post ID required", "INVALID_INPUT"),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Get space and verify user is a member
    const spaceRef = dbAdmin.collection("spaces").doc(spaceId);
    
    // Check if user is a member using flat spaceMembers collection
    const memberSnapshot = await dbAdmin
      .collection("spaceMembers")
      .where("spaceId", "==", spaceId)
      .where("userId", "==", user.uid)
      .limit(1)
      .get();
    
    const memberDoc = memberSnapshot.empty ? null : memberSnapshot.docs[0];
    
    if (!memberDoc) {
      return NextResponse.json(
        ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"),
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Get coordination responses
    const postRef = spaceRef.collection("posts").doc(postId);
    const responsesSnapshot = await postRef.collection("coordinationResponses")
      .orderBy("timestamp", "desc")
      .limit(50)
      .get();

    const responses = responsesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || new Date().toISOString()
    }));

    return NextResponse.json({
      success: true,
      responses,
      count: responses.length
    });

  } catch (error) {
    logger.error('Get coordination responses error', {
      error,
      spaceId: (await params).spaceId,
      endpoint: '/api/spaces/[spaceId]/coordination'
    });

    return NextResponse.json(
      ApiResponseHelper.error("Failed to get coordination responses", "INTERNAL_ERROR"),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}