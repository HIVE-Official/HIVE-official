"use server";

import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/structured-logger";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import {
  withAuthAndErrors,
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";
import {
  createPlacementDocument,
  buildPlacementCompositeId,
} from "@/lib/tool-placement";

const SurfaceSchema = z.enum([
  "pinned",
  "posts",
  "events",
  "tools",
  "chat",
  "members",
]);

const DeploymentPermissionsSchema = z
  .object({
    canInteract: z.boolean().optional(),
    canView: z.boolean().optional(),
    canEdit: z.boolean().optional(),
    allowedRoles: z.array(z.string()).optional(),
  })
  .optional();

const DeploymentSettingsSchema = z
  .object({
    showInDirectory: z.boolean().optional(),
    allowSharing: z.boolean().optional(),
    collectAnalytics: z.boolean().optional(),
    notifyOnInteraction: z.boolean().optional(),
  })
  .optional();

const DeployToolSchema = z.object({
  toolId: z.string(),
  deployTo: z.enum(["profile", "space"]),
  targetId: z.string(),
  surface: SurfaceSchema.optional(),
  config: z.record(z.any()).optional(),
  permissions: DeploymentPermissionsSchema,
  settings: DeploymentSettingsSchema,
});

type DeployToolInput = z.infer<typeof DeployToolSchema>;

type DeploymentRecord = {
  id: string;
  toolId: string;
  deployedBy: string;
  deployedTo: "profile" | "space";
  targetType: "profile" | "space";
  targetId: string;
  surface?: z.infer<typeof SurfaceSchema>;
  position: number;
  config: Record<string, unknown>;
  permissions: {
    canInteract: boolean;
    canView: boolean;
    canEdit: boolean;
    allowedRoles: string[];
  };
  status: "active" | "paused" | "disabled";
  deployedAt: string;
  lastUsed?: string;
  usageCount: number;
  settings: {
    showInDirectory: boolean;
    allowSharing: boolean;
    collectAnalytics: boolean;
    notifyOnInteraction: boolean;
  };
  metadata: Record<string, unknown>;
  placementId: string;
  placementPath: string;
  creatorId: string;
  spaceId: string | null;
  profileId: string | null;
  campusId: string;
};

function resolvePermissions(
  permissions: DeployToolInput["permissions"],
): DeploymentRecord["permissions"] {
  return {
    canInteract: permissions?.canInteract ?? true,
    canView: permissions?.canView ?? true,
    canEdit: permissions?.canEdit ?? false,
    allowedRoles:
      permissions?.allowedRoles ??
      ["member", "moderator", "admin", "builder"],
  };
}

function resolveSettings(
  settings: DeployToolInput["settings"],
): DeploymentRecord["settings"] {
  return {
    showInDirectory: settings?.showInDirectory ?? true,
    allowSharing: settings?.allowSharing ?? true,
    collectAnalytics: settings?.collectAnalytics ?? true,
    notifyOnInteraction: settings?.notifyOnInteraction ?? false,
  };
}

async function ensureToolIsDeployable(toolId: string, userId: string) {
  const toolDoc = await dbAdmin.collection("tools").doc(toolId).get();
  if (!toolDoc.exists) {
    return {
      ok: false as const,
      status: 404,
      message: "Tool not found",
    };
  }

  const toolData = toolDoc.data();
  if (!toolData) {
    return {
      ok: false as const,
      status: 404,
      message: "Tool data missing",
    };
  }

  if (toolData.campusId && toolData.campusId !== CURRENT_CAMPUS_ID) {
    return {
      ok: false as const,
      status: 403,
      message: "Access denied for this campus",
    };
  }

  if (toolData.ownerId !== userId && toolData.status !== "published") {
    return {
      ok: false as const,
      status: 403,
      message: "Tool not available for deployment",
    };
  }

  return { ok: true as const, toolDoc, toolData };
}

async function ensureSpaceDeploymentAllowed(spaceId: string, userId: string) {
  const spaceDoc = await dbAdmin.collection("spaces").doc(spaceId).get();
  if (!spaceDoc.exists) {
    return {
      ok: false as const,
      status: 404,
      message: "Space not found",
    };
  }

  const spaceData = spaceDoc.data();
  if (spaceData?.campusId && spaceData.campusId !== CURRENT_CAMPUS_ID) {
    return {
      ok: false as const,
      status: 403,
      message: "Access denied for this campus",
    };
  }

  const userRole = spaceData?.members?.[userId]?.role;
  if (!userRole || !["builder", "admin", "moderator"].includes(userRole)) {
    return {
      ok: false as const,
      status: 403,
      message: "Insufficient permissions to deploy tools",
    };
  }

  return { ok: true as const, spaceData };
}

async function ensureNoExistingDeployment(
  input: DeployToolInput,
): Promise<boolean> {
  const existingSnapshot = await dbAdmin
    .collection("deployedTools")
    .where("toolId", "==", input.toolId)
    .where("deployedTo", "==", input.deployTo)
    .where("targetId", "==", input.targetId)
    .where("campusId", "==", CURRENT_CAMPUS_ID)
    .where("status", "in", ["active", "paused"])
    .limit(1)
    .get();

  return existingSnapshot.empty;
}

async function enforceSpaceLimit(spaceId: string) {
  const snapshot = await dbAdmin
    .collection("deployedTools")
    .where("deployedTo", "==", "space")
    .where("targetId", "==", spaceId)
    .where("campusId", "==", CURRENT_CAMPUS_ID)
    .where("status", "==", "active")
    .get();

  if (snapshot.size >= 20) {
    return {
      ok: false as const,
      status: 409,
      message: "Space has reached maximum tool limit (20)",
    };
  }

  return { ok: true as const };
}

async function getNextPosition(
  deployedTo: "profile" | "space",
  targetId: string,
  surface?: string,
) {
  try {
    let query = dbAdmin
      .collection("deployedTools")
      .where("deployedTo", "==", deployedTo)
      .where("targetId", "==", targetId)
      .where("campusId", "==", CURRENT_CAMPUS_ID)
      .where("status", "==", "active");

    if (surface) {
      query = query.where("surface", "==", surface);
    }

    const snapshot = await query.get();
    return snapshot.size;
  } catch (error) {
    logger.error(
      "Error determining deployment order",
      error instanceof Error ? error : new Error(String(error)),
    );
    return 0;
  }
}

async function canUserAccessDeployment(
  userId: string,
  deployment: FirebaseFirestore.DocumentData,
) {
  if (deployment.campusId && deployment.campusId !== CURRENT_CAMPUS_ID) {
    return false;
  }

  if (
    deployment.deployedTo === "profile" &&
    deployment.targetId === userId
  ) {
    return true;
  }

  if (deployment.deployedBy === userId) {
    return true;
  }

  if (deployment.deployedTo === "space") {
    const spaceDoc = await dbAdmin
      .collection("spaces")
      .doc(deployment.targetId)
      .get();
    if (!spaceDoc.exists) {
      return false;
    }
    const spaceData = spaceDoc.data();
    if (spaceData?.campusId && spaceData.campusId !== CURRENT_CAMPUS_ID) {
      return false;
    }
    const userRole = spaceData?.members?.[userId]?.role;
    return deployment.permissions?.allowedRoles?.includes(userRole) ?? false;
  }

  return false;
}

export const POST = withAuthValidationAndErrors(
  DeployToolSchema,
  async (
    request: AuthenticatedRequest,
    _context: {},
    payload: DeployToolInput,
    respond,
  ) => {
    const userId = getUserId(request);

    logger.info("Deploying tool", {
      toolId: payload.toolId,
      deployTo: payload.deployTo,
      targetId: payload.targetId,
      userUid: userId,
    });

    const toolResult = await ensureToolIsDeployable(payload.toolId, userId);
    if (!toolResult.ok) {
      return respond.error(toolResult.message, "FORBIDDEN", {
        status: toolResult.status,
      });
    }

    if (payload.deployTo === "profile" && payload.targetId !== userId) {
      return respond.error(
        "Can only deploy tools to your own profile",
        "FORBIDDEN",
        { status: 403 },
      );
    }

    if (payload.deployTo === "space") {
      const spaceValidation = await ensureSpaceDeploymentAllowed(
        payload.targetId,
        userId,
      );
      if (!spaceValidation.ok) {
        return respond.error(spaceValidation.message, "FORBIDDEN", {
          status: spaceValidation.status,
        });
      }

      if (payload.surface && !SurfaceSchema.options.includes(payload.surface)) {
        return respond.error("Invalid surface", "INVALID_INPUT", {
          status: 400,
        });
      }

      const limitCheck = await enforceSpaceLimit(payload.targetId);
      if (!limitCheck.ok) {
        return respond.error(limitCheck.message, "CONFLICT", {
          status: limitCheck.status,
        });
      }
    }

    const uniqueDeployment = await ensureNoExistingDeployment(payload);
    if (!uniqueDeployment) {
      return respond.error(
        "Tool already deployed to this target",
        "CONFLICT",
        { status: 409 },
      );
    }

    const timestamp = new Date();
    const resolvedSurface =
      payload.surface ??
      (payload.deployTo === "space" ? ("tools" as const) : undefined);
    const permissions = resolvePermissions(payload.permissions);
    const settings = resolveSettings(payload.settings);
    const position = await getNextPosition(
      payload.deployTo,
      payload.targetId,
      resolvedSurface,
    );

    const placementTargetType =
      payload.deployTo === "space" ? ("space" as const) : ("profile" as const);

    const placementData = {
      toolId: payload.toolId,
      targetType: placementTargetType,
      targetId: payload.targetId,
      surface: resolvedSurface ?? "tools",
      status: "active" as const,
      position,
      config: payload.config ?? {},
      permissions,
      settings,
      createdAt: timestamp,
      createdBy: userId,
      updatedAt: timestamp,
      usageCount: 0,
      metadata: {
        deploymentContext: {
          userAgent: request.headers.get("user-agent"),
          timestamp: timestamp.toISOString(),
        },
      },
    };

    const placement = await createPlacementDocument(
      placementTargetType,
      payload.targetId,
      placementData,
    );

    const compositeId = buildPlacementCompositeId(
      placementTargetType,
      payload.targetId,
      placement.id,
    );

    const deploymentDoc: DeploymentRecord = {
      id: compositeId,
      toolId: payload.toolId,
      deployedBy: userId,
      deployedTo: payload.deployTo,
      targetType: placementTargetType,
      targetId: payload.targetId,
      surface: resolvedSurface,
      position,
      config: payload.config ?? {},
      permissions,
      status: "active",
      deployedAt: timestamp.toISOString(),
      usageCount: 0,
      settings,
      metadata: {
        toolName: toolResult.toolData.name,
        toolVersion: toolResult.toolData.currentVersion,
      },
      placementId: placement.id,
      placementPath: placement.path,
      creatorId: userId,
      spaceId: placementTargetType === "space" ? payload.targetId : null,
      profileId: placementTargetType === "profile" ? payload.targetId : null,
      campusId: CURRENT_CAMPUS_ID,
    };

    await dbAdmin.collection("deployedTools").doc(compositeId).set(deploymentDoc);

    await dbAdmin
      .collection("tools")
      .doc(payload.toolId)
      .update({
        deploymentCount: (toolResult.toolData.deploymentCount || 0) + 1,
        lastDeployedAt: timestamp.toISOString(),
      });

    await dbAdmin.collection("analytics_events").add({
      eventType: "tool_deployed",
      userId,
      toolId: payload.toolId,
      campusId: CURRENT_CAMPUS_ID,
      spaceId: payload.deployTo === "space" ? payload.targetId : null,
      timestamp: timestamp.toISOString(),
      metadata: {
        deploymentId: compositeId,
        deployedTo: payload.deployTo,
        surface: resolvedSurface ?? null,
      },
    });

    return respond.created(
      {
        deployment: deploymentDoc,
        message: "Tool deployed successfully",
      },
      { message: "Tool deployed successfully" },
    );
  },
);

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  _context,
  respond,
) => {
  try {
    const userId = getUserId(request);
    const searchParams = request.nextUrl.searchParams;
    const deployedTo = searchParams.get("deployedTo");
    const targetId = searchParams.get("targetId");
    const surface = searchParams.get("surface");
    const status = searchParams.get("status") ?? "active";

    let deploymentsQuery = dbAdmin
      .collection("deployedTools")
      .where("campusId", "==", CURRENT_CAMPUS_ID);

    if (deployedTo) {
      deploymentsQuery = deploymentsQuery.where("deployedTo", "==", deployedTo);
    }
    if (targetId) {
      deploymentsQuery = deploymentsQuery.where("targetId", "==", targetId);
    }
    if (surface) {
      deploymentsQuery = deploymentsQuery.where("surface", "==", surface);
    }
    deploymentsQuery = deploymentsQuery.where("status", "==", status);

    const snapshot = await deploymentsQuery.get();
    const deployments = [];

    for (const doc of snapshot.docs) {
      const deploymentData = doc.data();
      if (!(await canUserAccessDeployment(userId, deploymentData))) {
        continue;
      }

      const toolId = deploymentData.toolId as string | undefined;
      if (!toolId) continue;

      const toolDoc = await dbAdmin.collection("tools").doc(toolId).get();
      if (!toolDoc.exists) continue;

      const toolData = toolDoc.data();
      if (toolData?.campusId && toolData.campusId !== CURRENT_CAMPUS_ID) {
        continue;
      }

      deployments.push({
        id: doc.id,
        ...deploymentData,
        toolData: {
          id: toolDoc.id,
          name: toolData?.name,
          description: toolData?.description,
          currentVersion: toolData?.currentVersion,
          elements: toolData?.elements,
        },
      });
    }

    return respond.success({
      deployments,
      count: deployments.length,
    });
  } catch (error) {
    logger.error(
      "Error fetching deployed tools",
      error instanceof Error ? error : new Error(String(error)),
    );
    return respond.error("Failed to fetch deployed tools", "INTERNAL_ERROR", {
      status: 500,
    });
  }
});
