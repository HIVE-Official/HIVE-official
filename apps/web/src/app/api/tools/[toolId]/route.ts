import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { dbAdmin } from "@/lib/firebase-admin";
import { z } from "zod";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware/index";
import {
  UpdateToolSchema,
  ToolSchema,
  canUserEditTool,
  canUserViewTool,
  getNextVersion,
  validateToolStructure,
  validateElementConfig,
} from "@hive/core";

const db = getFirestore();

// GET /api/tools/[toolId] - Get tool details
export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  context,
  respond
) => {
  const userId = getUserId(request);
  const toolId = context.params.toolId;

  if (!toolId) {
    return respond.error("Tool ID is required", "INVALID_INPUT", { status: 400 });
  }
  const toolDoc = await dbAdmin.collection("tools").doc(toolId).get();

  if (!toolDoc.exists) {
    return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: 404 });
  }

  const toolData = { id: toolDoc.id, ...toolDoc.data() };
  const tool = ToolSchema.parse(toolData);

  // Check if user can view this tool
  if (!canUserViewTool(tool, userId)) {
    return respond.error("Access denied", "FORBIDDEN", { status: 403 });
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

    versions = versionsSnapshot.docs.map((doc) => ({
      version: doc.id,
      ...doc.data(),
    }));
  }

  return respond.success({
    ...tool,
    versions: versions.length > 0 ? versions : undefined
  });
});

type ToolElementUpdate = {
  id: string;
  elementId: string;
  config: Record<string, unknown>;
  type?: string;
};

type UpdateToolData = {
  name?: string;
  description?: string;
  elements?: ToolElementUpdate[];
  changelog?: string;
  defaultConfiguration?: Record<string, unknown>;
  settings?: Record<string, unknown>;
  [key: string]: unknown;
};

export const PUT = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  context,
  respond
) => {
  const updateData = UpdateToolSchema.parse(await request.json()) as UpdateToolData;
    const userId = getUserId(request);
    const toolId = context.params.toolId;

    if (!toolId) {
      return respond.error("Tool ID is required", "INVALID_INPUT", { status: 400 });
    }
    const toolDoc = await dbAdmin.collection("tools").doc(toolId).get();

    if (!toolDoc.exists) {
      return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const currentTool = ToolSchema.parse({ id: toolDoc.id, ...toolDoc.data() });

    // Check if user can edit this tool
    if (!canUserEditTool(currentTool, userId)) {
      return respond.error("Access denied", "FORBIDDEN", { status: 403 });
    }

    // Validate tool structure if elements are being updated
    if (updateData.elements) {
      const structureIsValid = validateToolStructure({
        ...currentTool,
        elements: updateData.elements,
      });

      if (!structureIsValid) {
        return respond.error("Invalid tool structure", "INVALID_INPUT", {
          status: 400,
        });
      }

      const elementsSnapshot = await dbAdmin.collection("elements").get();
      const elementsMap = new Map(elementsSnapshot.docs.map((doc) => [doc.id, doc.data()]));

      for (const elementInstance of updateData.elements) {
        const elementDef = elementsMap.get(elementInstance.elementId);
        if (!elementDef) {
          return respond.error(
            `Element definition not found: ${elementInstance.elementId}`,
            "INVALID_INPUT",
            { status: 400 }
          );
        }

        const elementIsValid = validateElementConfig({
          type: elementDef.type ?? elementInstance.type ?? elementInstance.elementId,
          config: elementInstance.config,
        });

        if (!elementIsValid) {
          return respond.error(
            `Invalid configuration for element: ${elementInstance.id}`,
            "INVALID_INPUT",
            { status: 400 }
          );
        }
      }
    }

    const now = new Date();
    const changeType: 'major' | 'minor' | 'patch' = updateData.elements ? 'minor' : 'patch';
    const newVersion = changeType !== 'patch'
      ? getNextVersion(currentTool.currentVersion)
      : currentTool.currentVersion;

    // Prepare update data
    const updatedTool = {
      ...updateData,
      currentVersion: newVersion,
      updatedAt: now,
    } as Record<string, any>;

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
        changeType,
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
        changeType,
      } });

    // Fetch and return updated tool
    const updatedDoc = await toolDoc.ref.get();
    const result = { id: updatedDoc.id, ...updatedDoc.data() };

    return respond.success(result);
  }
);

// DELETE /api/tools/[toolId] - Delete tool
export const DELETE = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  context,
  respond
) => {
  const userId = getUserId(request);
  const toolId = context.params.toolId;

  if (!toolId) {
    return respond.error("Tool ID is required", "INVALID_INPUT", { status: 400 });
  }
  const toolDoc = await dbAdmin.collection("tools").doc(toolId).get();

  if (!toolDoc.exists) {
    return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: 404 });
  }

  const tool = ToolSchema.parse({ id: toolDoc.id, ...toolDoc.data() });

  // Only owner can delete
  if (tool.ownerId !== userId) {
    return respond.error("Access denied", "FORBIDDEN", { status: 403 });
  }

  // Check if tool is being used in any posts
  const postsSnapshot = await db
    .collectionGroup("posts")
    .where("type", "==", "tool")
    .where("toolId", "==", toolId)
    .limit(1)
    .get();

  if (!postsSnapshot.empty) {
    return respond.error(
      "Cannot delete tool that is being used in posts",
      "CONFLICT",
      { status: 409 }
    );
  }

  // Delete tool and all subcollections
  const batch = dbAdmin.batch();

  // Delete versions
  const versionsSnapshot = await toolDoc.ref.collection("versions").get();
  versionsSnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // Delete data records
  const recordsSnapshot = await toolDoc.ref.collection("records").get();
  recordsSnapshot.docs.forEach((doc) => {
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

  return respond.success({ success: true });
});
