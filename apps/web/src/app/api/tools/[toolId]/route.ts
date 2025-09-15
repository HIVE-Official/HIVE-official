import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { dbAdmin, authAdmin } from "@/lib/firebase/admin/firebase-admin";
import { z } from "zod";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";
import {
  UpdateToolSchema,
  ToolSchema,
  canUserEditTool,
  canUserViewTool,
  getNextVersion,
  determineChangeType,
  validateToolStructure,
  validateElementConfig,
} from "@hive/core";

const db = dbAdmin;

// GET /api/tools/[toolId] - Get tool details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    const decodedToken = await authAdmin.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { toolId } = await params;
    const toolDoc = await dbAdmin.collection("tools").doc(toolId).get();

    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const toolData = { id: toolDoc.id, ...toolDoc.data() };
    const tool = ToolSchema.parse(toolData);

    // Check if user can view this tool
    if (!canUserViewTool(tool, userId)) {
      return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Increment view count if not the owner
    if (tool.ownerId !== userId) {
      await toolDoc.ref.update({
        viewCount: (tool.viewCount || 0) + 1,
        lastUsedAt: new Date() });
    }

    // Get versions if user can edit
    let versions: any[] = [];
    if (canUserEditTool(tool, userId)) {
      const versionsSnapshot = await toolDoc.ref
        .collection("versions")
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();

      versions = versionsSnapshot.docs.map((doc: any) => ({
        version: doc.id,
        ...doc.data(),
      }));
    }

    return NextResponse.json({
      ...tool,
      versions: versions.length > 0 ? versions : undefined });
  } catch (error) {
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch tool", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PUT /api/tools/[toolId] - Update tool
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    const decodedToken = await authAdmin.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { toolId } = await params;
    const toolDoc = await dbAdmin.collection("tools").doc(toolId).get();

    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const currentTool = ToolSchema.parse({ id: toolDoc.id, ...toolDoc.data() });

    // Check if user can edit this tool
    if (!canUserEditTool(currentTool, userId)) {
      return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const body = await request.json();
    const updateData = UpdateToolSchema.parse(body);

    // Validate tool structure if elements are being updated
    if (updateData.elements) {
      const structureValidation = validateToolStructure(updateData.elements);
      if (!structureValidation.isValid) {
        return NextResponse.json(
          {
            error: "Invalid tool structure",
            details: structureValidation.errors,
          },
          { status: HttpStatus.BAD_REQUEST }
        );
      }

      // Validate each element configuration
      const elementsSnapshot = await dbAdmin.collection("elements").get();
      const elementsMap = new Map();
      elementsSnapshot.docs.forEach((doc: any) => {
        elementsMap.set(doc.id, doc.data());
      });

      for (const elementInstance of updateData.elements) {
        const elementDef = elementsMap.get(elementInstance.elementId);
        if (!elementDef) {
          return NextResponse.json(
            {
              error: `Element definition not found: ${elementInstance.elementId}`,
            },
            { status: HttpStatus.BAD_REQUEST }
          );
        }

        if (!validateElementConfig(elementDef, elementInstance.config)) {
          return NextResponse.json(
            {
              error: `Invalid configuration for element: ${elementInstance.id}`,
            },
            { status: HttpStatus.BAD_REQUEST }
          );
        }
      }
    }

    // Determine version change type if elements changed
    let newVersion = currentTool.currentVersion;
    if (
      updateData.elements &&
      updateData.elements.length !== currentTool.elements.length
    ) {
      const changeType = determineChangeType(
        currentTool.elements,
        updateData.elements
      );
      newVersion = getNextVersion(currentTool.currentVersion, changeType);
    }

    // Prepare update data
    const now = new Date();
    const updatedTool = {
      ...updateData,
      currentVersion: newVersion,
      updatedAt: now,
    };

    // Update tool document
    await toolDoc.ref.update(updatedTool);

    // Create new version if version changed
    if (newVersion !== currentTool.currentVersion) {
      const versionData = {
        version: newVersion,
        changelog: updateData.changelog || "Updated tool configuration",
        createdAt: now,
        createdBy: userId,
        isStable: false,
      };

      await toolDoc.ref.collection("versions").doc(newVersion).set(versionData);
    }

    // Track analytics event
    await dbAdmin.collection("analytics_events").add({
      eventType: "tool_updated",
      userId: userId,
      toolId: toolId,
      spaceId: currentTool.spaceId || null,
      timestamp: now,
      metadata: {
        versionChanged: newVersion !== currentTool.currentVersion,
        newVersion: newVersion,
        elementsCount:
          updateData.elements?.length || currentTool.elements.length,
        changeType: updateData.elements
          ? determineChangeType(currentTool.elements, updateData.elements)
          : "config",
      } });

    // Fetch and return updated tool
    const updatedDoc = await toolDoc.ref.get();
    const result = { id: updatedDoc.id, ...updatedDoc.data() };

    return NextResponse.json(result);
  } catch (error) {

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid update data",
          details: error.errors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Failed to update tool", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// DELETE /api/tools/[toolId] - Delete tool
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    const decodedToken = await authAdmin.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { toolId } = await params;
    const toolDoc = await dbAdmin.collection("tools").doc(toolId).get();

    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const tool = ToolSchema.parse({ id: toolDoc.id, ...toolDoc.data() });

    // Only owner can delete
    if (tool.ownerId !== userId) {
      return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Check if tool is being used in any posts
    const postsSnapshot = await db
      .collectionGroup("posts")
      .where("type", "==", "tool")
      .where("toolId", "==", toolId)
      .limit(1)
      .get();

    if (!postsSnapshot.empty) {
      return NextResponse.json(
        {
          error: "Cannot delete tool that is being used in posts",
        },
        { status: 409 }
      );
    }

    // Delete tool and all subcollections
    const batch = dbAdmin.batch();

    // Delete versions
    const versionsSnapshot = await toolDoc.ref.collection("versions").get();
    versionsSnapshot.docs.forEach((doc: any) => {
      batch.delete(doc.ref);
    });

    // Delete data records
    const recordsSnapshot = await toolDoc.ref.collection("records").get();
    recordsSnapshot.docs.forEach((doc: any) => {
      batch.delete(doc.ref);
    });

    // Delete the tool itself
    batch.delete(toolDoc.ref);

    await batch.commit();

    // Track analytics event
    await dbAdmin.collection("analytics_events").add({
      eventType: "tool_deleted",
      userId: userId,
      toolId: toolId,
      spaceId: tool.spaceId || null,
      timestamp: new Date(),
      metadata: {
        toolName: tool.name,
        wasPublished: tool.status === "published",
        elementsCount: tool.elements.length,
        usageCount: tool.useCount,
      } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(ApiResponseHelper.error("Failed to delete tool", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
