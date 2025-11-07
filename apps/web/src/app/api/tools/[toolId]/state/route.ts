import { getFirestore, FieldValue } from "firebase-admin/firestore";
import * as admin from "firebase-admin";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { withAuthAndErrors, withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";

// Schema for tool state update requests
const ToolStateSchema = z.object({
  spaceId: z.string().min(1, "spaceId is required"),
  userId: z.string().optional(),
  state: z.record(z.any())
});

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ toolId: string }> },
  respond
) => {
  const authenticatedUserId = getUserId(request);
  const { toolId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const spaceId = searchParams.get("spaceId");
  const userId = searchParams.get("userId") || authenticatedUserId;

  if (!spaceId) {
    return respond.error("spaceId parameter is required", "INVALID_INPUT", { status: 400 });
  }

    const db = dbAdmin;
    // Enforce campus isolation: verify space and tool belong to campus
    const toolDoc = await db.collection('tools').doc(toolId).get();
    const spaceDoc = await db.collection('spaces').doc(spaceId).get();
    if (!toolDoc.exists || !spaceDoc.exists || (toolDoc.data()?.campusId !== CURRENT_CAMPUS_ID) || (spaceDoc.data()?.campusId !== CURRENT_CAMPUS_ID)) {
      return respond.error("Access denied for this campus", "FORBIDDEN", { status: 403 });
    }
    
    // Get tool state document
    const stateDoc = await db
      .collection("tool_states")
      .doc(`${toolId}_${spaceId}_${userId}`)
      .get();

    if (!stateDoc.exists) {
      return respond.error("Tool state not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const stateData = stateDoc.data();

    return respond.success(stateData);
});

type ToolStateData = z.infer<typeof ToolStateSchema>;

export const POST = withAuthValidationAndErrors(
  ToolStateSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ toolId: string }> },
    body: ToolStateData,
    respond
  ) => {
    const { spaceId, userId: requestUserId, state } = body;
    const authenticatedUserId = getUserId(request);
    const { toolId } = await params;

    // Ensure user can only update their own state
    const userId = requestUserId || authenticatedUserId;
    if (userId !== authenticatedUserId) {
      return respond.error("Cannot update another user's state", "FORBIDDEN", { status: 403 });
    }

    const db = dbAdmin;
    
    // Verify user has access to the space
    const spaceMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .get();

    if (!spaceMemberDoc.exists) {
      return respond.error("Access denied to this space", "FORBIDDEN", { status: 403 });
    }

    // Verify tool exists and is deployed to the space
    const toolDoc = await db
      .collection("tools")
      .doc(toolId)
      .get();

    if (!toolDoc.exists) {
      return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const toolData = toolDoc.data();
    if (toolData?.status !== "published") {
      return respond.error("Tool is not published", "INVALID_INPUT", { status: 400 });
    }

    // Check if tool is deployed to the space
    const toolDeploymentDoc = await db
      .collection("tool_deployments")
      .where("toolId", "==", toolId)
      .where("spaceId", "==", spaceId)
      .where("campusId", "==", CURRENT_CAMPUS_ID)
      .where("isActive", "==", true)
      .limit(1)
      .get();

    if (toolDeploymentDoc.empty) {
      return respond.error("Tool is not deployed to this space", "FORBIDDEN", { status: 403 });
    }

    // Prepare state document
    const stateDocId = `${toolId}_${spaceId}_${userId}`;
    const stateData = {
      ...state,
      toolId,
      spaceId,
      userId,
      campusId: CURRENT_CAMPUS_ID,
      metadata: {
        ...state.metadata,
        updatedAt: new Date().toISOString(),
        savedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    };

    // Save tool state
    await db
      .collection("tool_states")
      .doc(stateDocId)
      .set(stateData, { merge: true });

    // Update tool usage analytics
    const analyticsDoc = db
      .collection("tool_analytics")
      .doc(`${toolId}_${spaceId}`);

    await analyticsDoc.set({
      toolId,
      spaceId,
      campusId: CURRENT_CAMPUS_ID,
      lastUsed: admin.firestore.FieldValue.serverTimestamp(),
      usageCount: admin.firestore.FieldValue.increment(1),
      activeUsers: admin.firestore.FieldValue.arrayUnion(userId),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    return respond.success({
      savedAt: new Date().toISOString()
    });
  }
);

export const DELETE = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ toolId: string }> },
  respond
) => {
  const authenticatedUserId = getUserId(request);
  const { toolId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const spaceId = searchParams.get("spaceId");
  const userId = searchParams.get("userId") || authenticatedUserId;

  if (!spaceId) {
    return respond.error("spaceId parameter is required", "INVALID_INPUT", { status: 400 });
  }

  // Ensure user can only delete their own state
  if (userId !== authenticatedUserId) {
    return respond.error("Cannot delete another user's state", "FORBIDDEN", { status: 403 });
  }

    const db = dbAdmin;
    // Enforce campus isolation: verify space and tool belong to campus
    const toolDoc = await db.collection('tools').doc(toolId).get();
    const spaceDoc = await db.collection('spaces').doc(spaceId).get();
    if (!toolDoc.exists || !spaceDoc.exists || (toolDoc.data()?.campusId !== CURRENT_CAMPUS_ID) || (spaceDoc.data()?.campusId !== CURRENT_CAMPUS_ID)) {
      return respond.error("Access denied for this campus", "FORBIDDEN", { status: 403 });
    }
    
    // Delete tool state document
    const stateDocId = `${toolId}_${spaceId}_${userId}`;
    await db
      .collection("tool_states")
      .doc(stateDocId)
      .delete();

    return respond.success({
      deletedAt: new Date().toISOString()
    });
});
