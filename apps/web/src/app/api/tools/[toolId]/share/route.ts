import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { z } from "zod";
import {
  ToolSchema,
  canUserViewTool,
  ShareToolSchema,
  generateShareToken,
  createToolDefaults,
  logger,
} from "@hive/core";


// POST /api/tools/[toolId]/share - Create share link or fork tool
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  try {
    const db = getFirestore();
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await getAuth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const { toolId } = await params;
    const toolDoc = await db.collection("tools").doc(toolId).get();

    if (!toolDoc.exists) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    const originalTool = ToolSchema.parse({
      id: toolDoc.id,
      ...toolDoc.data(),
    });

    // Check if user can view this tool
    if (!canUserViewTool(originalTool, userId)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await request.json();
    const { action, ...shareData } = body;

    if (action === "create_share_link") {
      // Create or update share token
      const shareToken = originalTool.shareToken || generateShareToken();
      const validatedShareData = ShareToolSchema.parse(shareData);

      await toolDoc.ref.update({
        shareToken,
        isPublic: validatedShareData.permission === "view",
        updatedAt: new Date(),
      });

      // Track analytics event
      await db.collection("analytics_events").add({
        eventType: "tool_shared",
        userId: userId,
        toolId: toolId,
        spaceId: originalTool.spaceId || null,
        timestamp: new Date(),
        metadata: {
          shareType: "link",
          permission: validatedShareData.permission,
          hasExpiration: !!validatedShareData.expiresAt,
        },
      });

      return NextResponse.json({
        shareUrl: `${process.env.NEXT_PUBLIC_APP_URL}/tools/shared/${shareToken}`,
        shareToken,
        permission: validatedShareData.permission,
        expiresAt: validatedShareData.expiresAt,
      });
    } else if (action === "fork") {
      // Fork the tool - create a copy owned by the current user
      const { spaceId, name } = shareData;

      // Validate space access if forking to a space
      if (spaceId) {
        const spaceDoc = await db.collection("spaces").doc(spaceId).get();
        if (!spaceDoc.exists) {
          return NextResponse.json(
            { error: "Space not found" },
            { status: 404 }
          );
        }

        const spaceData = spaceDoc.data();
        const userRole = spaceData?.members?.[userId]?.role;

        if (!["builder", "admin"].includes(userRole)) {
          return NextResponse.json(
            { error: "Insufficient permissions to create tools in this space" },
            { status: 403 }
          );
        }
      }

      // Create fork data
      const forkData = {
        name: name || `${originalTool.name} (Copy)`,
        description: `Forked from ${originalTool.name}`,
        spaceId: spaceId || undefined,
        isSpaceTool: !!spaceId,
        config: originalTool.config,
        metadata: {
          ...originalTool.metadata,
          tags: [...(originalTool.metadata.tags || []), "forked"],
        },
      };

      const toolDefaults = createToolDefaults(userId, forkData);
      const now = new Date();

      const forkedTool = {
        ...toolDefaults,
        elements: originalTool.elements.map((element) => ({
          ...element,
          id: `${element.id}_${Date.now()}`, // Ensure unique IDs in the fork
        })),
        originalToolId: toolId,
        createdAt: now,
        updatedAt: now,
      };

      // Save forked tool
      const forkedToolRef = await db.collection("tools").add(forkedTool);

      // Create initial version for fork
      const initialVersion = {
        version: "1.0.0",
        changelog: `Forked from ${originalTool.name}`,
        createdAt: now,
        createdBy: userId,
        isStable: false,
      };

      await forkedToolRef
        .collection("versions")
        .doc("1.0.0")
        .set(initialVersion);

      // Update original tool's fork count
      await toolDoc.ref.update({
        forkCount: (originalTool.forkCount || 0) + 1,
      });

      // Track analytics events
      await Promise.all([
        db.collection("analytics_events").add({
          eventType: "tool_forked",
          userId: userId,
          toolId: forkedToolRef.id,
          spaceId: spaceId || null,
          timestamp: now,
          metadata: {
            originalToolId: toolId,
            originalToolName: originalTool.name,
            elementsCount: originalTool.elements.length,
          },
        }),
        db.collection("analytics_events").add({
          eventType: "tool_fork_source",
          userId: originalTool.ownerId,
          toolId: toolId,
          spaceId: originalTool.spaceId || null,
          timestamp: now,
          metadata: {
            forkedBy: userId,
            forkedToolId: forkedToolRef.id,
            newForkCount: (originalTool.forkCount || 0) + 1,
          },
        }),
      ]);

      const result = {
        id: forkedToolRef.id,
        ...forkedTool,
      };

      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Must be "create_share_link" or "fork"' },
        { status: 400 }
      );
    }
  } catch (error) {
    logger.error("Error sharing tool:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid share data",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to share tool" },
      { status: 500 }
    );
  }
}

// GET /api/tools/[toolId]/share - Get sharing information
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  try {
    const db = getFirestore();
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await getAuth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const { toolId } = await params;
    const toolDoc = await db.collection("tools").doc(toolId).get();

    if (!toolDoc.exists) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    const tool = ToolSchema.parse({ id: toolDoc.id, ...toolDoc.data() });

    // Only owner can see sharing details
    if (tool.ownerId !== userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Get fork information
    const forksSnapshot = await db
      .collection("tools")
      .where("originalToolId", "==", toolId)
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();

    const forks = forksSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      ownerId: doc.data().ownerId,
      createdAt: doc.data().createdAt,
      spaceId: doc.data().spaceId,
    }));

    return NextResponse.json({
      isPublic: tool.isPublic,
      shareToken: tool.shareToken,
      shareUrl: tool.shareToken
        ? `${process.env.NEXT_PUBLIC_APP_URL}/tools/shared/${tool.shareToken}`
        : null,
      forkCount: tool.forkCount || 0,
      recentForks: forks,
      viewCount: tool.viewCount || 0,
      useCount: tool.useCount || 0,
    });
  } catch (error) {
    logger.error("Error fetching sharing info:", error);
    return NextResponse.json(
      { error: "Failed to fetch sharing info" },
      { status: 500 }
    );
  }
}
