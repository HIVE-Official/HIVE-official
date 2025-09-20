import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import * as admin from "firebase-admin/firestore";
import { logger } from "@/lib/logger";
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from '@/lib/middleware';

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
export const POST = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string }> },
  respond
) => {
  const { spaceId } = await params;
  const userId = getUserId(request);
  const body = await request.json();
  const { postId, action, message, availability, preferences } = coordinationResponseSchema.parse(body);

  // Get space and verify user is a member
  const spaceRef = dbAdmin.collection("spaces").doc("cohort").collection("spaces").doc(spaceId);
  const spaceDoc = await spaceRef.get();

  if (!spaceDoc.exists) {
    return respond.error("Space not found", "RESOURCE_NOT_FOUND", 404);
  }

  // Check if user is a member
  const memberRef = spaceRef.collection("members").doc(userId);
  const memberDoc = await memberRef.get();

  if (!memberDoc.exists) {
    return respond.error("Not a member of this space", "FORBIDDEN", 403);
  }

  // Get the post
  const postRef = spaceRef.collection("posts").doc(postId);
  const postDoc = await postRef.get();

  if (!postDoc.exists) {
    return respond.error("Post not found", "RESOURCE_NOT_FOUND", 404);
  }

  const postData = postDoc.data();

  // Verify this is a coordination post
  if (!postData?.coordinationType) {
    return respond.error("Not a coordination post", "INVALID_INPUT", 400);
  }

  // Create or update coordination response
  const responseRef = postRef.collection("coordination_responses").doc(userId);
  const responseData = {
    userId,
    userName: 'Anonymous', // TODO: Get from user profile when available
    action,
    message: message || null,
    availability: availability || null,
    preferences: preferences || null,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
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
      lastActivity: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    await batch.commit();

  logger.info('Coordination response added', {
    spaceId,
    postId,
    userId,
    action,
    coordinationType: postData.coordinationType,
    endpoint: '/api/spaces/[spaceId]/coordination'
  });

  return respond.success({
    message: "Coordination response recorded",
    response: {
      userId,
      action,
      message,
      timestamp: new Date().toISOString()
    },
    coordinationStats: currentResponses
  });

});

/**
 * Get coordination responses for a post
 * GET /api/spaces/[spaceId]/coordination?postId=xxx
 */
export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string }> },
  respond
) => {
  const { spaceId } = await params;
  const userId = getUserId(request);
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId');

  if (!postId) {
    return respond.error("Post ID required", "INVALID_INPUT", 400);
  }

  // Get space and verify user is a member
  const spaceRef = dbAdmin.collection("spaces").doc("cohort").collection("spaces").doc(spaceId);
  const memberRef = spaceRef.collection("members").doc(userId);
  const memberDoc = await memberRef.get();

  if (!memberDoc.exists) {
    return respond.error("Not a member of this space", "FORBIDDEN", 403);
  }

  // Get coordination responses
  const postRef = spaceRef.collection("posts").doc(postId);
  const responsesSnapshot = await postRef.collection("coordination_responses")
    .orderBy("timestamp", "desc")
    .limit(50)
    .get();

  const responses = responsesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || new Date().toISOString()
  }));

  return respond.success({
    responses,
    count: responses.length
  });

});