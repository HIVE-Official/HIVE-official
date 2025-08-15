import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { dbAdmin } from "@/lib/firebase-admin";
import { validateAuth } from "../../../../../lib/auth-server";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  try {
    // Validate authentication
    const user = await validateAuth(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { toolId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const spaceId = searchParams.get("spaceId");
    const userId = searchParams.get("userId") || user.uid;

    if (!spaceId) {
      return NextResponse.json(ApiResponseHelper.error("spaceId parameter is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const db = dbAdmin;
    
    // Get tool state document
    const stateDoc = await db
      .collection("tool_states")
      .doc(`${toolId}_${spaceId}_${userId}`)
      .get();

    if (!stateDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool state not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const stateData = stateDoc.data();
    
    return NextResponse.json(stateData);
  } catch (error) {
    return NextResponse.json(ApiResponseHelper.error("Failed to load tool state", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  try {
    // Validate authentication
    const user = await validateAuth(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { toolId } = await params;
    const body = await request.json();
    const { spaceId, userId: requestUserId, state } = body;

    if (!spaceId || !state) {
      return NextResponse.json(ApiResponseHelper.error("spaceId and state are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Ensure user can only update their own state
    const userId = requestUserId || user.uid;
    if (userId !== user.uid) {
      return NextResponse.json(
        { error: "Cannot update another user's state" },
        { status: HttpStatus.FORBIDDEN }
      );
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
      return NextResponse.json(ApiResponseHelper.error("Access denied to this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Verify tool exists and is deployed to the space
    const toolDoc = await db
      .collection("tools")
      .doc(toolId)
      .get();

    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const toolData = toolDoc.data();
    if (toolData?.status !== "published") {
      return NextResponse.json(ApiResponseHelper.error("Tool is not published", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Check if tool is deployed to the space
    const toolDeploymentDoc = await db
      .collection("tool_deployments")
      .where("toolId", "==", toolId)
      .where("spaceId", "==", spaceId)
      .where("isActive", "==", true)
      .limit(1)
      .get();

    if (toolDeploymentDoc.empty) {
      return NextResponse.json(ApiResponseHelper.error("Tool is not deployed to this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Prepare state document
    const stateDocId = `${toolId}_${spaceId}_${userId}`;
    const stateData = {
      ...state,
      toolId,
      spaceId,
      userId,
      metadata: {
        ...state.metadata,
        updatedAt: new Date().toISOString(),
        savedAt: FieldValue.serverTimestamp(),
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
      lastUsed: FieldValue.serverTimestamp(),
      usageCount: FieldValue.increment(1),
      activeUsers: FieldValue.arrayUnion(userId),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    return NextResponse.json({
      success: true,
      savedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(ApiResponseHelper.error("Failed to save tool state", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  try {
    // Validate authentication
    const user = await validateAuth(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { toolId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const spaceId = searchParams.get("spaceId");
    const userId = searchParams.get("userId") || user.uid;

    if (!spaceId) {
      return NextResponse.json(ApiResponseHelper.error("spaceId parameter is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Ensure user can only delete their own state
    if (userId !== user.uid) {
      return NextResponse.json(
        { error: "Cannot delete another user's state" },
        { status: HttpStatus.FORBIDDEN }
      );
    }

    const db = dbAdmin;
    
    // Delete tool state document
    const stateDocId = `${toolId}_${spaceId}_${userId}`;
    await db
      .collection("tool_states")
      .doc(stateDocId)
      .delete();

    return NextResponse.json({
      success: true,
      deletedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(ApiResponseHelper.error("Failed to delete tool state", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}