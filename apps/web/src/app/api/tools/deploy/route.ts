import type { DocumentData, Query } from "firebase-admin/firestore";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { HttpStatus } from "@/lib/api-response-types";
import { withAuthAndErrors, type AuthenticatedRequest } from "@/lib/middleware";

type DeployTarget = "profile" | "space";
type DeploymentSurface = "pinned" | "posts" | "events" | "tools" | "chat" | "members";

interface DeploymentPermissions {
  canInteract: boolean;
  canView: boolean;
  canEdit: boolean;
  allowedRoles?: string[];
}

interface DeploymentSettings {
  showInDirectory: boolean;
  allowSharing: boolean;
  collectAnalytics: boolean;
  notifyOnInteraction: boolean;
}

interface ToolDeployment {
  id?: string;
  toolId: string;
  deployedBy: string;
  deployedTo: DeployTarget;
  targetId: string;
  surface?: DeploymentSurface;
  position?: number;
  config?: Record<string, unknown>;
  permissions: DeploymentPermissions;
  status: "active" | "paused" | "disabled";
  deployedAt: string;
  lastUsed?: string;
  usageCount: number;
  settings: DeploymentSettings;
  metadata?: Record<string, unknown>;
}

interface DeployToolRequest {
  toolId: string;
  deployTo: DeployTarget;
  targetId: string;
  surface?: DeploymentSurface;
  config?: Record<string, unknown>;
  permissions?: Partial<DeploymentPermissions>;
  settings?: Partial<DeploymentSettings>;
}

interface DeploymentWithTool extends ToolDeployment {
  id: string;
  toolData?: {
    id: string;
    name?: string;
    description?: string;
    currentVersion?: string;
    elements?: unknown;
  };
}

const DEPLOYED_TOOLS_COLLECTION = "deployedTools";
const TOOLS_COLLECTION = "tools";
const ANALYTICS_EVENTS_COLLECTION = "analytics_events";
const SPACES_COLLECTION = "spaces";
const MAX_SPACE_DEPLOYMENTS = 20;
const SHARED_ENDPOINT = "/api/tools/deploy";
const VALID_SURFACES: DeploymentSurface[] = ["pinned", "posts", "events", "tools", "chat", "members"];
const ACTIVE_STATUSES: Array<ToolDeployment["status"]> = ["active", "paused"];

export const POST = withAuthAndErrors(async (request: AuthenticatedRequest, _context, respond) => {
  try {
    const userId = request.user.id;
    const body = await request.json() as Partial<DeployToolRequest>;

    const validationError = validateDeployRequest(body);
    if (validationError) {
      return respond.error(validationError.message, validationError.code, {
        status: validationError.status,
      });
    }

    const { toolId, deployTo, targetId } = body as DeployToolRequest;
    const surface = body.surface;
    const permissions = normalizePermissions(body.permissions);
    const settings = normalizeSettings(body.settings);

    logger.info("Deploying tool", {
      userId,
      toolId,
      targetId,
      deployTo,
      surface,
      endpoint: SHARED_ENDPOINT,
    });

    const toolDoc = await dbAdmin.collection(TOOLS_COLLECTION).doc(toolId).get();
    if (!toolDoc.exists) {
      return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    const toolData = toolDoc.data();
    if (!toolData) {
      return respond.error("Tool data not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    if (toolData.ownerId !== userId && toolData.status !== "published") {
      return respond.error("Tool not available for deployment", "FORBIDDEN", {
        status: HttpStatus.FORBIDDEN,
      });
    }

    const surfaceToUse = deployTo === "space" ? surface ?? "tools" : undefined;

    const targetValidationError = await validateDeploymentTarget({
      deployTo,
      targetId,
      surface: surfaceToUse,
      userId,
    });

    if (targetValidationError) {
      return respond.error(targetValidationError.message, targetValidationError.code, {
        status: targetValidationError.status,
      });
    }

    const existingDeploymentSnapshot = await dbAdmin
      .collection(DEPLOYED_TOOLS_COLLECTION)
      .where("toolId", "==", toolId)
      .where("deployedTo", "==", deployTo)
      .where("targetId", "==", targetId)
      .where("status", "in", ACTIVE_STATUSES)
      .get();

    if (!existingDeploymentSnapshot.empty) {
      return respond.error("Tool already deployed to this target", "RESOURCE_CONFLICT", {
        status: HttpStatus.CONFLICT,
      });
    }

    if (deployTo === "space") {
      const activeDeploymentsSnapshot = await dbAdmin
        .collection(DEPLOYED_TOOLS_COLLECTION)
        .where("deployedTo", "==", "space")
        .where("targetId", "==", targetId)
        .where("status", "==", "active")
        .get();

      if (activeDeploymentsSnapshot.size >= MAX_SPACE_DEPLOYMENTS) {
        return respond.error("Space has reached maximum tool limit (20)", "RESOURCE_LIMIT_EXCEEDED", {
          status: HttpStatus.CONFLICT,
        });
      }
    }

    const now = new Date().toISOString();
    const deployment: ToolDeployment = {
      toolId,
      deployedBy: userId,
      deployedTo: deployTo,
      targetId,
      surface: surfaceToUse,
      position: await getNextPosition(deployTo, targetId, surfaceToUse),
      config: body.config ?? {},
      permissions,
      status: "active",
      deployedAt: now,
      usageCount: 0,
      settings,
      metadata: {
        toolName: toolData.name,
        toolVersion: toolData.currentVersion,
        deploymentContext: {
          userAgent: request.headers.get("user-agent"),
          timestamp: now,
        },
      },
    };

    const deploymentRef = await dbAdmin.collection(DEPLOYED_TOOLS_COLLECTION).add(deployment);

    await dbAdmin.collection(TOOLS_COLLECTION).doc(toolId).update({
      deploymentCount: (toolData.deploymentCount ?? 0) + 1,
      lastDeployedAt: now,
    });

    await dbAdmin.collection(ANALYTICS_EVENTS_COLLECTION).add({
      eventType: "tool_deployed",
      userId,
      toolId,
      spaceId: deployTo === "space" ? targetId : undefined,
      timestamp: new Date(),
      metadata: {
        action: "tool_deployed",
        deploymentId: deploymentRef.id,
        deployedTo: deployTo,
        surface: surfaceToUse,
      },
    });

    const createdDeployment: DeploymentWithTool = {
      id: deploymentRef.id,
      ...deployment,
    };

    return respond.created(
      { deployment: createdDeployment },
      { message: "Tool deployed successfully" },
    );
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error deploying tool", err, {
      endpoint: SHARED_ENDPOINT,
    });

    return respond.error("Failed to deploy tool", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, _context, respond) => {
  try {
    const userId = request.user.id;
    const searchParams = request.nextUrl.searchParams;

    const deployedToParam = searchParams.get("deployedTo");
    const targetId = searchParams.get("targetId");
    const surfaceParam = searchParams.get("surface");
    const statusParam = searchParams.get("status");

    let deploymentsQuery: Query<DocumentData> = dbAdmin.collection(DEPLOYED_TOOLS_COLLECTION);

    if (deployedToParam && isDeployTarget(deployedToParam)) {
      deploymentsQuery = deploymentsQuery.where("deployedTo", "==", deployedToParam);
    }

    if (targetId) {
      deploymentsQuery = deploymentsQuery.where("targetId", "==", targetId);
    }

    if (surfaceParam && isValidSurface(surfaceParam)) {
      deploymentsQuery = deploymentsQuery.where("surface", "==", surfaceParam);
    }

    if (statusParam && isValidStatus(statusParam)) {
      deploymentsQuery = deploymentsQuery.where("status", "==", statusParam);
    } else {
      deploymentsQuery = deploymentsQuery.where("status", "==", "active");
    }

    const deploymentsSnapshot = await deploymentsQuery.get();
    const deployments: DeploymentWithTool[] = [];

    for (const doc of deploymentsSnapshot.docs) {
      const deployment = {
        id: doc.id,
        ...(doc.data() as ToolDeployment),
      };

      const hasAccess = await canUserAccessDeployment(userId, deployment);
      if (!hasAccess) {
        continue;
      }

      if (deployment.toolId) {
        const toolDoc = await dbAdmin.collection(TOOLS_COLLECTION).doc(deployment.toolId).get();
        if (toolDoc.exists) {
          const data = toolDoc.data();
          deployment.toolData = {
            id: toolDoc.id,
            name: data?.name,
            description: data?.description,
            currentVersion: data?.currentVersion,
            elements: data?.elements,
          };
        }
      }

      deployments.push(deployment);
    }

    return respond.success({
      deployments,
      count: deployments.length,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error fetching deployed tools", err, {
      endpoint: SHARED_ENDPOINT,
    });

    return respond.error("Failed to fetch deployed tools", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

async function getNextPosition(
  deployedTo: DeployTarget,
  targetId: string,
  surface?: DeploymentSurface,
): Promise<number> {
  try {
    let query = dbAdmin
      .collection(DEPLOYED_TOOLS_COLLECTION)
      .where("deployedTo", "==", deployedTo)
      .where("targetId", "==", targetId)
      .where("status", "==", "active");

    if (surface) {
      query = query.where("surface", "==", surface);
    }

    const snapshot = await query.get();
    return snapshot.size;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error getting next deployment position", err, {
      deployedTo,
      targetId,
      surface,
      endpoint: SHARED_ENDPOINT,
    });

    return 0;
  }
}

async function canUserAccessDeployment(userId: string, deployment: ToolDeployment): Promise<boolean> {
  try {
    if (deployment.deployedTo === "profile" && deployment.targetId === userId) {
      return true;
    }

    if (deployment.deployedBy === userId) {
      return true;
    }

    if (deployment.deployedTo === "space") {
      const spaceDoc = await dbAdmin.collection(SPACES_COLLECTION).doc(deployment.targetId).get();
      if (spaceDoc.exists) {
        const spaceData = spaceDoc.data() as Record<string, unknown> | undefined;
        const members = (spaceData?.members ?? {}) as Record<string, { role?: string }>;
        const userRole = members[userId]?.role;
        return deployment.permissions.allowedRoles?.includes(userRole ?? "") ?? false;
      }
    }

    return false;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error checking deployment access", err, {
      userId,
      deploymentId: deployment.id,
      endpoint: SHARED_ENDPOINT,
    });
    return false;
  }
}

function normalizePermissions(
  permissions: Partial<DeploymentPermissions> | undefined,
): DeploymentPermissions {
  return {
    canInteract: permissions?.canInteract !== false,
    canView: permissions?.canView !== false,
    canEdit: permissions?.canEdit ?? false,
    allowedRoles: permissions?.allowedRoles ?? ["member", "moderator", "admin", "builder"],
  };
}

function normalizeSettings(settings: Partial<DeploymentSettings> | undefined): DeploymentSettings {
  return {
    showInDirectory: settings?.showInDirectory !== false,
    allowSharing: settings?.allowSharing !== false,
    collectAnalytics: settings?.collectAnalytics !== false,
    notifyOnInteraction: settings?.notifyOnInteraction ?? false,
  };
}

function isDeployTarget(value: string): value is DeployTarget {
  return value === "profile" || value === "space";
}

function isValidSurface(value: string): value is DeploymentSurface {
  return VALID_SURFACES.includes(value as DeploymentSurface);
}

function isValidStatus(value: string): value is ToolDeployment["status"] {
  return value === "active" || value === "paused" || value === "disabled";
}

function validateDeployRequest(
  body: Partial<DeployToolRequest> | undefined,
): { message: string; code: string; status: number } | null {
  if (!body) {
    return {
      message: "Missing request body",
      code: "INVALID_INPUT",
      status: HttpStatus.BAD_REQUEST,
    };
  }

  if (!body.toolId || !body.deployTo || !body.targetId) {
    return {
      message: "Missing required fields",
      code: "INVALID_INPUT",
      status: HttpStatus.BAD_REQUEST,
    };
  }

  if (!isDeployTarget(body.deployTo)) {
    return {
      message: "Invalid deployment target",
      code: "INVALID_INPUT",
      status: HttpStatus.BAD_REQUEST,
    };
  }

  if (body.surface && !isValidSurface(body.surface)) {
    return {
      message: "Invalid surface",
      code: "INVALID_INPUT",
      status: HttpStatus.BAD_REQUEST,
    };
  }

  return null;
}

async function validateDeploymentTarget(params: {
  deployTo: DeployTarget;
  targetId: string;
  surface?: DeploymentSurface;
  userId: string;
}): Promise<{ message: string; code: string; status: number } | null> {
  const { deployTo, targetId, userId } = params;

  if (deployTo === "profile" && targetId !== userId) {
    return {
      message: "Can only deploy to your own profile",
      code: "FORBIDDEN",
      status: HttpStatus.FORBIDDEN,
    };
  }

  if (deployTo === "space") {
    const spaceDoc = await dbAdmin.collection(SPACES_COLLECTION).doc(targetId).get();
    if (!spaceDoc.exists) {
      return {
        message: "Space not found",
        code: "RESOURCE_NOT_FOUND",
        status: HttpStatus.NOT_FOUND,
      };
    }

    const spaceData = spaceDoc.data() as Record<string, unknown> | undefined;
    const members = (spaceData?.members ?? {}) as Record<string, { role?: string }>;
    const userRole = members[userId]?.role;

    if (!userRole || !["builder", "admin", "moderator"].includes(userRole)) {
      return {
        message: "Insufficient permissions to deploy tools",
        code: "FORBIDDEN",
        status: HttpStatus.FORBIDDEN,
      };
    }

    if (params.surface && !isValidSurface(params.surface)) {
      return {
        message: "Invalid surface",
        code: "INVALID_INPUT",
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  return null;
}

export type { ToolDeployment };
