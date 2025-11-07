"use server";

import * as admin from "firebase-admin";
import { z } from "zod";
import { dbAdmin as adminDb } from "@/lib/firebase-admin";
import {
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import {
  ToolSchema,
  canUserViewTool,
  ShareToolSchema,
  generateShareToken,
  createToolDefaults,
} from "@hive/core";

const ShareLinkActionSchema = ShareToolSchema.extend({
  action: z.literal("create_share_link"),
});

const ForkActionSchema = z.object({
  action: z.literal("fork"),
  spaceId: z.string().optional(),
  name: z.string().optional(),
});

const ShareActionSchema = z.discriminatedUnion("action", [
  ShareLinkActionSchema,
  ForkActionSchema,
]);

type ShareAction = z.infer<typeof ShareActionSchema>;

async function loadTool(toolId: string) {
  const toolDoc = await adminDb.collection("tools").doc(toolId).get();
  if (!toolDoc.exists) {
    return { ok: false as const, status: 404, message: "Tool not found" };
  }

  const tool = ToolSchema.parse({ id: toolDoc.id, ...toolDoc.data() });

  if (
    (tool as any)?.campusId &&
    (tool as any).campusId !== CURRENT_CAMPUS_ID
  ) {
    return {
      ok: false as const,
      status: 403,
      message: "Access denied for this campus",
    };
  }

  return { ok: true as const, tool, toolRef: toolDoc.ref };
}

async function validateSpaceAccess(spaceId: string, userId: string) {
  const spaceDoc = await adminDb.collection("spaces").doc(spaceId).get();
  if (!spaceDoc.exists) {
    return { ok: false as const, message: "Space not found", status: 404 };
  }

  const spaceData = spaceDoc.data();
  if (spaceData?.campusId && spaceData.campusId !== CURRENT_CAMPUS_ID) {
    return { ok: false as const, message: "Access denied for this campus", status: 403 };
  }

  const userRole = spaceData?.members?.[userId]?.role;
  if (!["builder", "admin"].includes(userRole)) {
    return {
      ok: false as const,
      message: "Insufficient permissions to create tools in this space",
      status: 403,
    };
  }

  return { ok: true as const, spaceData };
}

export const POST = withAuthValidationAndErrors(
  ShareActionSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ toolId: string }> },
    payload: ShareAction,
    respond,
  ) => {
    const userId = getUserId(request);
    const { toolId } = await params;

    const toolResult = await loadTool(toolId);
    if (!toolResult.ok) {
      return respond.error(toolResult.message, "RESOURCE_NOT_FOUND", {
        status: toolResult.status,
      });
    }

    const { tool, toolRef } = toolResult;

    if (!canUserViewTool(tool, userId)) {
      return respond.error("Access denied", "FORBIDDEN", { status: 403 });
    }

    if (payload.action === "create_share_link") {
      const shareToken =
        (tool as any).shareToken || generateShareToken(toolId, userId);
      const now = new Date();

      await toolRef.update({
        shareToken,
        isPublic: payload.permission === "view",
        updatedAt: now,
      });

      await adminDb.collection("analytics_events").add({
        eventType: "tool_shared",
        userId,
        toolId,
        spaceId: (tool as any).spaceId || null,
        campusId: CURRENT_CAMPUS_ID,
        timestamp: now.toISOString(),
        metadata: {
          shareType: "link",
          permission: payload.permission,
          hasExpiration: Boolean(payload.expiresAt),
        },
      });

      return respond.success({
        shareUrl: `${process.env.NEXT_PUBLIC_APP_URL}/tools/shared/${shareToken}`,
        shareToken,
        permission: payload.permission,
        expiresAt: payload.expiresAt,
      });
    }

    if (payload.spaceId) {
      const spaceAccess = await validateSpaceAccess(payload.spaceId, userId);
      if (!spaceAccess.ok) {
        return respond.error(spaceAccess.message, "FORBIDDEN", {
          status: spaceAccess.status,
        });
      }
    }

    const forkDefaults = {
      name: payload.name || `${tool.name} (Copy)`,
      description: `Forked from ${tool.name}`,
      spaceId: payload.spaceId || undefined,
      isSpaceTool: Boolean(payload.spaceId),
      config: tool.config,
      metadata: {
        ...tool.metadata,
        tags: [...(tool.metadata?.tags || []), "forked"],
      },
    };

    const baseDefaults = { ...createToolDefaults(), ownerId: userId };
    const now = new Date();

    const forkedTool = {
      ...baseDefaults,
      ...forkDefaults,
      elements: tool.elements.map((element: any) => ({
        ...element,
        id: `${element.id}_${Date.now()}`,
      })),
      originalToolId: toolId,
      createdAt: now,
      updatedAt: now,
      campusId: CURRENT_CAMPUS_ID,
    };

    const forkedToolRef = await adminDb.collection("tools").add(forkedTool);

    await forkedToolRef.collection("versions").doc("1.0.0").set({
      version: "1.0.0",
      changelog: `Forked from ${tool.name}`,
      createdAt: now,
      createdBy: userId,
      isStable: false,
    });

    await toolRef.update({
      forkCount: (tool as any).forkCount
        ? ((tool as any).forkCount as number) + 1
        : 1,
    });

    await Promise.all([
      adminDb.collection("analytics_events").add({
        eventType: "tool_forked",
        userId,
        toolId: forkedToolRef.id,
        spaceId: payload.spaceId || null,
        campusId: CURRENT_CAMPUS_ID,
        timestamp: now.toISOString(),
        metadata: {
          originalToolId: toolId,
          originalToolName: tool.name,
          elementsCount: tool.elements.length,
        },
      }),
      adminDb.collection("analytics_events").add({
        eventType: "tool_fork_source",
        userId: tool.ownerId,
        toolId,
        spaceId: (tool as any).spaceId || null,
        campusId: CURRENT_CAMPUS_ID,
        timestamp: now.toISOString(),
        metadata: {
          forkedBy: userId,
          forkedToolId: forkedToolRef.id,
          newForkCount: ((tool as any).forkCount || 0) + 1,
        },
      }),
    ]);

    return respond.created(
      {
        id: forkedToolRef.id,
        ...forkedTool,
      },
      { message: "Tool forked successfully" },
    );
  },
);
