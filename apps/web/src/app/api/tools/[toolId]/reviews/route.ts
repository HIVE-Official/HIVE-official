"use server";

import { z } from "zod";
import { dbAdmin as adminDb } from "@/lib/firebase-admin";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import {
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";

const ReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(5).max(100),
  content: z.string().min(10).max(1000),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
  useCase: z.string().optional(),
  verified: z.boolean().optional(),
});

type ReviewPayload = z.infer<typeof ReviewSchema>;

async function ensureToolIsReviewable(toolId: string) {
  const toolDoc = await adminDb.collection("tools").doc(toolId).get();
  if (!toolDoc.exists) {
    return { ok: false as const, status: 404, message: "Tool not found" };
  }

  const toolData = toolDoc.data();
  if (!toolData) {
    return { ok: false as const, status: 404, message: "Tool data not found" };
  }

  if (toolData.campusId !== CURRENT_CAMPUS_ID) {
    return {
      ok: false as const,
      status: 403,
      message: "Access denied for this campus",
    };
  }

  if (toolData.status !== "published") {
    return {
      ok: false as const,
      status: 400,
      message: "Cannot review unpublished tool",
    };
  }

  return { ok: true as const, toolData, toolDoc };
}

async function userHasExistingReview(toolId: string, userId: string) {
  const existingReviewSnapshot = await adminDb
    .collection("toolReviews")
    .where("toolId", "==", toolId)
    .where("userId", "==", userId)
    .where("campusId", "==", CURRENT_CAMPUS_ID)
    .limit(1)
    .get();

  return !existingReviewSnapshot.empty;
}

async function userHasUsedTool(toolId: string, userId: string) {
  const usageSnapshot = await adminDb
    .collection("analytics_events")
    .where("eventType", "==", "tool_interaction")
    .where("userId", "==", userId)
    .where("toolId", "==", toolId)
    .where("campusId", "==", CURRENT_CAMPUS_ID)
    .limit(1)
    .get();

  return !usageSnapshot.empty;
}

export const POST = withAuthValidationAndErrors(
  ReviewSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ toolId: string }> },
    body: ReviewPayload,
    respond,
  ) => {
    const userId = getUserId(request);
    const { toolId } = await params;

    const toolValidation = await ensureToolIsReviewable(toolId);
    if (!toolValidation.ok) {
      return respond.error(toolValidation.message, toolValidation.status === 404 ? "RESOURCE_NOT_FOUND" : "FORBIDDEN", {
        status: toolValidation.status,
      });
    }

    if (await userHasExistingReview(toolId, userId)) {
      return respond.error("You have already reviewed this tool", "CONFLICT", {
        status: 409,
      });
    }

    const hasUsedTool = await userHasUsedTool(toolId, userId);
    const now = new Date().toISOString();
    const reviewRef = adminDb.collection("toolReviews").doc();

    await reviewRef.set({
      toolId,
      userId,
      rating: body.rating,
      title: body.title,
      content: body.content,
      pros: body.pros,
      cons: body.cons,
      useCase: body.useCase,
      verified: hasUsedTool,
      helpful: 0,
      reported: 0,
      status: "published",
      createdAt: now,
      updatedAt: now,
      version: toolValidation.toolData?.currentVersion,
      campusId: CURRENT_CAMPUS_ID,
    });

    await adminDb.collection("analytics_events").add({
      eventType: "tool_reviewed",
      userId,
      toolId,
      rating: body.rating,
      timestamp: now,
      campusId: CURRENT_CAMPUS_ID,
      metadata: {
        reviewId: reviewRef.id,
        verified: hasUsedTool,
        hasContent: body.content.length > 50,
      },
    });

    const ownerId = toolValidation.toolData?.ownerId;
    if (ownerId && ownerId !== userId) {
      await adminDb.collection("notifications").add({
        type: "tool_review_received",
        title: "New Tool Review",
        message: `Your tool "${toolValidation.toolData?.name}" received a ${body.rating}-star review`,
        data: {
          toolId,
          toolName: toolValidation.toolData?.name,
          reviewId: reviewRef.id,
          rating: body.rating,
          reviewTitle: body.title,
        },
        recipients: [ownerId],
        createdAt: now,
        read: false,
        campusId: CURRENT_CAMPUS_ID,
      });
    }

    return respond.created(
      { reviewId: reviewRef.id },
      { message: "Review created successfully" },
    );
  },
);
