import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getFirestoreAdmin } from "@hive/core/firebase-admin";
import { validateAuth } from "../../../../../lib/auth-server";

export async function GET(
  request: NextRequest,
  { params }: { params: { toolId: string } }
) {
  try {
    // Validate authentication
    const user = await validateAuth(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toolId } = params;
    const searchParams = request.nextUrl.searchParams;
    const spaceId = searchParams.get("spaceId");
    const userId = searchParams.get("userId") || user.uid;

    if (!spaceId) {
      return NextResponse.json(
        { error: "spaceId parameter is required" },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();
    
    // Get tool state document
    const stateDoc = await db
      .collection("tool_states")
      .doc(`${toolId}_${spaceId}_${userId}`)
      .get();

    if (!stateDoc.exists) {
      return NextResponse.json(
        { error: "Tool state not found" },
        { status: 404 }
      );
    }

    const stateData = stateDoc.data();
    
    return NextResponse.json(stateData);
  } catch (error) {
    console.error("Error loading tool state:", error);
    return NextResponse.json(
      { error: "Failed to load tool state" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { toolId: string } }
) {
  try {
    // Validate authentication
    const user = await validateAuth(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toolId } = params;
    const body = await request.json();
    const { spaceId, userId: requestUserId, state } = body;

    if (!spaceId || !state) {
      return NextResponse.json(
        { error: "spaceId and state are required" },
        { status: 400 }
      );
    }

    // Ensure user can only update their own state
    const userId = requestUserId || user.uid;
    if (userId !== user.uid) {
      return NextResponse.json(
        { error: "Cannot update another user's state" },
        { status: 403 }
      );
    }

    const db = getFirestoreAdmin();
    
    // Verify user has access to the space
    const spaceMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .get();

    if (!spaceMemberDoc.exists) {
      return NextResponse.json(
        { error: "Access denied to this space" },
        { status: 403 }
      );
    }

    // Verify tool exists and is deployed to the space
    const toolDoc = await db
      .collection("tools")
      .doc(toolId)
      .get();

    if (!toolDoc.exists) {
      return NextResponse.json(
        { error: "Tool not found" },
        { status: 404 }
      );
    }

    const toolData = toolDoc.data();
    if (toolData?.status !== "published") {
      return NextResponse.json(
        { error: "Tool is not published" },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: "Tool is not deployed to this space" },
        { status: 403 }
      );
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
      savedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error saving tool state:", error);
    return NextResponse.json(
      { error: "Failed to save tool state" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { toolId: string } }
) {
  try {
    // Validate authentication
    const user = await validateAuth(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toolId } = params;
    const searchParams = request.nextUrl.searchParams;
    const spaceId = searchParams.get("spaceId");
    const userId = searchParams.get("userId") || user.uid;

    if (!spaceId) {
      return NextResponse.json(
        { error: "spaceId parameter is required" },
        { status: 400 }
      );
    }

    // Ensure user can only delete their own state
    if (userId !== user.uid) {
      return NextResponse.json(
        { error: "Cannot delete another user's state" },
        { status: 403 }
      );
    }

    const db = getFirestoreAdmin();
    
    // Delete tool state document
    const stateDocId = `${toolId}_${spaceId}_${userId}`;
    await db
      .collection("tool_states")
      .doc(stateDocId)
      .delete();

    return NextResponse.json({
      success: true,
      deletedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error deleting tool state:", error);
    return NextResponse.json(
      { error: "Failed to delete tool state" },
      { status: 500 }
    );
  }
}