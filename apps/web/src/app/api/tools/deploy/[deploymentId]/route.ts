import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { HttpStatus } from "@/lib/api-response-types";
import { withAuthAndErrors, type AuthenticatedRequest } from "@/lib/middleware";
import type { ToolDeployment } from "../route";

interface ExecutionContext {
  deploymentId: string;
  toolId: string;
  userId: string;
  targetType: ToolDeployment["deployedTo"];
  targetId: string;
  surface?: ToolDeployment["surface"];
  permissions: {
    canRead: boolean;
    canWrite: boolean;
    canExecute: boolean;
  };
  environment: "production" | "preview";
  config: Record<string, unknown>;
  settings: ToolDeployment["settings"];
}

const DEPLOYED_TOOLS_COLLECTION = "deployedTools";
const TOOLS_COLLECTION = "tools";
const SPACES_COLLECTION = "spaces";
const MEMBERS_COLLECTION = "members";
const ACTIVITY_EVENTS_COLLECTION = "activityEvents";
const ENDPOINT = "/api/tools/deploy/[deploymentId]";

export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  try {
    const { deploymentId } = context.params;
    const userId = request.user.id;

    if (!deploymentId) {
      return respond.error("Deployment ID is required", "INVALID_INPUT", {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const deploymentDoc = await dbAdmin.collection(DEPLOYED_TOOLS_COLLECTION).doc(deploymentId).get();
    if (!deploymentDoc.exists) {
      return respond.error("Deployment not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    const deployment = {
      id: deploymentDoc.id,
      ...(deploymentDoc.data() as ToolDeployment),
    };

    const canManage = await canUserManageDeployment(userId, deployment);
    if (!canManage) {
      return respond.error("Access denied", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
    }

    if (!deployment.toolId) {
      return respond.error("Invalid deployment: missing toolId", "INVALID_DATA", {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const toolDoc = await dbAdmin.collection(TOOLS_COLLECTION).doc(deployment.toolId).get();
    const toolData = toolDoc.exists ? toolDoc.data() : null;

    const executionContext = generateExecutionContext(deployment, userId);

    return respond.success({
      deployment,
      toolData,
      executionContext,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error fetching deployment", err, {
      endpoint: ENDPOINT,
      deploymentId: context.params.deploymentId,
    });

    return respond.error("Failed to fetch deployment", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export const PUT = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  try {
    const { deploymentId } = context.params;
    const userId = request.user.id;

    if (!deploymentId) {
      return respond.error("Deployment ID is required", "INVALID_INPUT", {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const deploymentDoc = await dbAdmin.collection(DEPLOYED_TOOLS_COLLECTION).doc(deploymentId).get();
    if (!deploymentDoc.exists) {
      return respond.error("Deployment not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    const deployment = deploymentDoc.data() as ToolDeployment | undefined;
    if (!deployment) {
      return respond.error("Invalid deployment data", "INVALID_DATA", {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const canManage = await canUserManageDeployment(userId, { id: deploymentId, ...deployment });
    if (!canManage) {
      return respond.error("Access denied", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
    }

    const body = await request.json() as Partial<{
      config: Record<string, unknown>;
      permissions: ToolDeployment["permissions"];
      settings: ToolDeployment["settings"];
      status: ToolDeployment["status"];
      position: number;
    }>;

    const updateData: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };

    if (body.config !== undefined) {
      updateData.config = body.config;
    }

    if (body.permissions) {
      updateData.permissions = {
        ...deployment.permissions,
        ...body.permissions,
      };
    }

    if (body.settings) {
      updateData.settings = {
        ...deployment.settings,
        ...body.settings,
      };
    }

    if (body.status && isValidStatus(body.status)) {
      updateData.status = body.status;
    }

    if (typeof body.position === "number") {
      updateData.position = body.position;
    }

    await dbAdmin.collection(DEPLOYED_TOOLS_COLLECTION).doc(deploymentId).update(updateData);

    await dbAdmin.collection(ACTIVITY_EVENTS_COLLECTION).add({
      userId,
      type: "tool_interaction",
      toolId: deployment.toolId,
      spaceId: deployment.deployedTo === "space" ? deployment.targetId : undefined,
      metadata: {
        action: "deployment_updated",
        deploymentId,
        changes: Object.keys(body),
      },
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split("T")[0],
    });

    const updatedDoc = await dbAdmin.collection(DEPLOYED_TOOLS_COLLECTION).doc(deploymentId).get();
    const updatedDeployment = {
      id: updatedDoc.id,
      ...(updatedDoc.data() as ToolDeployment),
    };

    return respond.success(
      {
        deployment: updatedDeployment,
      },
      { message: "Deployment updated successfully" },
    );
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error updating deployment", err, {
      endpoint: ENDPOINT,
      deploymentId: context.params.deploymentId,
    });

    return respond.error("Failed to update deployment", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export const DELETE = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  try {
    const { deploymentId } = context.params;
    const userId = request.user.id;

    if (!deploymentId) {
      return respond.error("Deployment ID is required", "INVALID_INPUT", {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const deploymentDoc = await dbAdmin.collection(DEPLOYED_TOOLS_COLLECTION).doc(deploymentId).get();
    if (!deploymentDoc.exists) {
      return respond.error("Deployment not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    const deployment = deploymentDoc.data() as ToolDeployment | undefined;
    if (!deployment) {
      return respond.error("Invalid deployment data", "INVALID_DATA", {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const canManage = await canUserRemoveDeployment(userId, deployment);
    if (!canManage) {
      return respond.error("Access denied", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
    }

    await dbAdmin.collection(DEPLOYED_TOOLS_COLLECTION).doc(deploymentId).delete();

    const toolDoc = await dbAdmin.collection(TOOLS_COLLECTION).doc(deployment.toolId).get();
    if (toolDoc.exists) {
      const toolData = toolDoc.data();
      if (toolData) {
        await dbAdmin.collection(TOOLS_COLLECTION).doc(deployment.toolId).update({
          deploymentCount: Math.max(0, (toolData.deploymentCount ?? 1) - 1),
        });
      }
    }

    await dbAdmin.collection(ACTIVITY_EVENTS_COLLECTION).add({
      userId,
      type: "tool_interaction",
      toolId: deployment.toolId,
      spaceId: deployment.deployedTo === "space" ? deployment.targetId : undefined,
      metadata: {
        action: "deployment_removed",
        deploymentId,
        deployedTo: deployment.deployedTo,
        surface: deployment.surface,
      },
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split("T")[0],
    });

    return respond.success({
      success: true,
      message: "Deployment removed successfully",
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error removing deployment", err, {
      endpoint: ENDPOINT,
      deploymentId: context.params.deploymentId,
    });

    return respond.error("Failed to remove deployment", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

async function canUserManageDeployment(userId: string, deployment: ToolDeployment): Promise<boolean> {
  try {
    if (deployment.deployedBy === userId) {
      return true;
    }

    if (deployment.deployedTo === "profile") {
      return deployment.targetId === userId;
    }

    if (deployment.deployedTo === "space") {
      const spaceDoc = await dbAdmin.collection(SPACES_COLLECTION).doc(deployment.targetId).get();
      if (!spaceDoc.exists) {
        return false;
      }

      const spaceData = spaceDoc.data() as Record<string, unknown> | undefined;
      if (spaceData?.ownerId === userId) {
        return true;
      }

      const membershipSnapshot = await dbAdmin
        .collection(MEMBERS_COLLECTION)
        .where("userId", "==", userId)
        .where("spaceId", "==", deployment.targetId)
        .where("status", "==", "active")
        .get();

      if (!membershipSnapshot.empty) {
        const memberData = membershipSnapshot.docs[0].data() as { role?: string };
        return ["admin", "moderator", "builder"].includes(memberData.role ?? "");
      }
    }

    return false;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error checking deployment management permissions", err, {
      userId,
      deploymentId: deployment.id,
      endpoint: ENDPOINT,
    });

    return false;
  }
}

async function canUserRemoveDeployment(userId: string, deployment: ToolDeployment): Promise<boolean> {
  if (deployment.deployedBy === userId) {
    return true;
  }

  if (deployment.deployedTo === "space") {
    const spaceDoc = await dbAdmin.collection(SPACES_COLLECTION).doc(deployment.targetId).get();
    if (!spaceDoc.exists) {
      return false;
    }

    const spaceData = spaceDoc.data() as Record<string, unknown> | undefined;
    if (spaceData?.ownerId === userId) {
      return true;
    }
  }

  return false;
}

function isValidStatus(status: unknown): status is ToolDeployment["status"] {
  return status === "active" || status === "paused" || status === "disabled";
}

function generateExecutionContext(deployment: ToolDeployment, userId: string): ExecutionContext {
  const permissions = {
    canRead: deployment.permissions.canView,
    canWrite: deployment.permissions.canEdit,
    canExecute: deployment.permissions.canInteract,
  };

  if (deployment.deployedBy === userId) {
    permissions.canWrite = true;
    permissions.canExecute = true;
  }

  return {
    deploymentId: deployment.id ?? "",
    toolId: deployment.toolId,
    userId,
    targetType: deployment.deployedTo,
    targetId: deployment.targetId,
    surface: deployment.surface,
    permissions,
    environment: deployment.status === "active" ? "production" : "preview",
    config: deployment.config ?? {},
    settings: deployment.settings,
  };
}
