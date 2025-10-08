import { getFirestore } from "firebase-admin/firestore";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { HttpStatus } from "@/lib/api-response-types";
import { withAuthAndErrors, type AuthenticatedRequest } from "@/lib/middleware";
import { logger } from "@/lib/logger";
import {
  ToolSchema,
  canUserViewTool,
  ShareToolSchema,
  generateShareToken,
  createToolDefaults,
} from "@hive/core";

const db = getFirestore();
const ENDPOINT = "/api/tools/[toolId]/share";

type ShareAction = "create_share_link" | "fork";

interface ShareRequestBody {
  action: ShareAction;
  permission?: string;
  expiresAt?: string | null;
  spaceId?: string;
  name?: string;
  [key: string]: unknown;
}

export const POST = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  try {
    const { toolId } = context.params;
    const userId = request.user.id;

    if (!toolId) {
      return respond.error("Tool ID is required", "INVALID_INPUT", { status: HttpStatus.BAD_REQUEST });
    }

    const toolDoc = await dbAdmin.collection("tools").doc(toolId).get();
    if (!toolDoc.exists) {
      return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    const originalTool = ToolSchema.parse({
      id: toolDoc.id,
      ...toolDoc.data(),
    }) as Record<string, unknown>;

    const originalToolName = getString(originalTool.name) ?? "tool";
    const originalToolSpaceId = getString(originalTool.spaceId);
    const originalToolOwnerId = getString(originalTool.ownerId) ?? getString(originalTool.creatorId) ?? userId;
    const originalToolForkCount = getNumber(originalTool.forkCount) ?? 0;
    const originalToolMetadata = getRecord(originalTool.metadata);

    if (!canUserViewTool(originalTool, userId)) {
      return respond.error("Access denied", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
    }

    const body = await request.json() as ShareRequestBody;
    const { action, ...shareData } = body;

    if (action === "create_share_link") {
      const shareToken = (originalTool.shareToken as string | undefined) ?? generateShareToken(toolId, userId);
      const validatedShareData = ShareToolSchema.parse(shareData) as {
        permission: string;
        expiresAt?: string | null;
      };

      await toolDoc.ref.update({
        shareToken,
        isPublic: validatedShareData.permission === "view",
        updatedAt: new Date(),
      });

      await dbAdmin.collection("analytics_events").add({
        eventType: "tool_shared",
        userId,
        toolId,
        spaceId: originalToolSpaceId ?? null,
        timestamp: new Date(),
        metadata: {
          shareType: "link",
          permission: validatedShareData.permission,
          hasExpiration: Boolean(validatedShareData.expiresAt),
        },
      });

      return respond.success({
        shareUrl: `${process.env.NEXT_PUBLIC_APP_URL}/tools/shared/${shareToken}`,
        shareToken,
        permission: validatedShareData.permission,
        expiresAt: validatedShareData.expiresAt ?? null,
      });
    }

    if (action === "fork") {
      const { spaceId, name } = shareData as { spaceId?: string; name?: string };

      if (spaceId) {
        const spaceDoc = await dbAdmin.collection("spaces").doc(spaceId).get();
        if (!spaceDoc.exists) {
          return respond.error("Space not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
        }

        const spaceData = spaceDoc.data() as { members?: Record<string, { role?: string }> } | undefined;
        const userRole = spaceData?.members?.[userId]?.role;

        if (!["builder", "admin"].includes(userRole ?? "")) {
          return respond.error("Insufficient permissions to create tools in this space", "FORBIDDEN", {
            status: HttpStatus.FORBIDDEN,
          });
        }
      }

      const forkData = {
        name: name ?? `${originalToolName} (Copy)`,
        description: `Forked from ${originalToolName}`,
        spaceId: spaceId ?? undefined,
        isSpaceTool: Boolean(spaceId),
        config: originalTool.config,
        metadata: {
          ...(originalToolMetadata ?? {}),
          tags: [...getStringArray(originalToolMetadata?.tags), "forked"],
        },
      };

      const toolDefaults = {
        ...createToolDefaults(),
        ownerId: userId,
        ...forkData,
      };

      const now = new Date();

      const originalElements = Array.isArray(originalTool.elements)
        ? (originalTool.elements as Array<Record<string, unknown>>)
        : [];
      const timestamp = Date.now();

      const clonedElements = originalElements.map((element, index) => ({
        ...element,
        id: typeof element.id === "string" ? `${element.id}_${timestamp + index}` : `element_${timestamp + index}`,
      }));

      const forkedTool = {
        ...toolDefaults,
        elements: clonedElements,
        originalToolId: toolId,
        createdAt: now,
        updatedAt: now,
      };

      const forkedToolRef = await dbAdmin.collection("tools").add(forkedTool);

      const initialVersion = {
        version: "1.0.0",
        changelog: `Forked from ${originalTool.name ?? "tool"}`,
        createdAt: now,
        createdBy: userId,
        isStable: false,
      };

      await forkedToolRef.collection("versions").doc("1.0.0").set(initialVersion);

      await toolDoc.ref.update({
        forkCount: originalToolForkCount + 1,
      });

      await Promise.all([
        dbAdmin.collection("analytics_events").add({
          eventType: "tool_forked",
          userId,
          toolId: forkedToolRef.id,
          spaceId: spaceId ?? null,
          timestamp: now,
          metadata: {
            originalToolId: toolId,
            originalToolName,
            elementsCount: originalElements.length,
          },
        }),
        dbAdmin.collection("analytics_events").add({
          eventType: "tool_fork_source",
          userId: originalToolOwnerId,
          toolId,
          spaceId: originalToolSpaceId ?? null,
          timestamp: now,
          metadata: {
            forkedBy: userId,
            forkedToolId: forkedToolRef.id,
            newForkCount: originalToolForkCount + 1,
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
    }

    return respond.error('Invalid action. Must be "create_share_link" or "fork"', "INVALID_INPUT", {
      status: HttpStatus.BAD_REQUEST,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return respond.error("Invalid share data", "INVALID_INPUT", {
        status: HttpStatus.BAD_REQUEST,
        details: error.errors,
      });
    }

    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error sharing tool", err, {
      endpoint: ENDPOINT,
      params: context.params,
    });

    return respond.error("Failed to share tool", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  try {
    const { toolId } = context.params;
    const userId = request.user.id;

    if (!toolId) {
      return respond.error("Tool ID is required", "INVALID_INPUT", { status: HttpStatus.BAD_REQUEST });
    }

    const toolDoc = await dbAdmin.collection("tools").doc(toolId).get();
    if (!toolDoc.exists) {
      return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    const tool = ToolSchema.parse({ id: toolDoc.id, ...toolDoc.data() }) as Record<string, unknown>;
    const ownerId = getString(tool.ownerId);
    const creatorId = getString(tool.creatorId);

    if (ownerId !== userId && creatorId !== userId) {
      return respond.error("Access denied", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
    }

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

    const shareToken = getString(tool.shareToken);
    const forkCount = getNumber(tool.forkCount) ?? 0;
    const viewCount = getNumber(tool.viewCount) ?? 0;
    const useCount = getNumber(tool.useCount) ?? 0;

    return respond.success({
      isPublic: getBoolean(tool.isPublic) ?? false,
      shareToken,
      shareUrl: shareToken ? `${process.env.NEXT_PUBLIC_APP_URL}/tools/shared/${shareToken}` : null,
      forkCount,
      forks,
      viewCount,
      useCount,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error fetching sharing information", err, {
      endpoint: ENDPOINT,
      params: context.params,
    });

    return respond.error("Failed to fetch sharing information", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

function getString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function getNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined;
}

function getBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function getRecord(value: unknown): Record<string, unknown> | undefined {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return undefined;
}

function getStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}
