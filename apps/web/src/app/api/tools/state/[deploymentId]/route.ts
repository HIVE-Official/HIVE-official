import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { HttpStatus } from "@/lib/api-response-types";
import { withAuthAndErrors, type AuthenticatedRequest } from "@/lib/middleware";

interface ToolState {
  deploymentId: string;
  toolId: string;
  userId: string;
  state: Record<string, unknown>;
  metadata?: {
    version: string;
    lastSaved: string | null;
    autoSave: boolean;
    size: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface ToolDeployment {
  toolId?: string;
  deployedTo?: "profile" | "space";
  targetId?: string;
}

const DEPLOYMENTS_COLLECTION = "deployedTools";
const STATES_COLLECTION = "toolStates";
const MAX_STATE_SIZE_BYTES = 1024 * 1024; // 1MB

export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const { deploymentId } = context.params;

  if (!deploymentId) {
    return respond.error("Deployment ID is required", "INVALID_INPUT", { status: HttpStatus.BAD_REQUEST });
  }

  const userId = request.user.id;

  try {
    const deployment = await getDeployment(deploymentId);
    if (!deployment) {
      return respond.error("Deployment not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    const hasAccess = await canUserAccessState(userId, deployment);
    if (!hasAccess) {
      return respond.error("Access denied", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
    }

    const stateId = createStateId(deploymentId, userId);
    const stateDoc = await dbAdmin.collection(STATES_COLLECTION).doc(stateId).get();

    if (!stateDoc.exists) {
      return respond.success({
        state: {},
        metadata: {
          version: "1.0.0",
          lastSaved: null,
          autoSave: true,
          size: 0,
        },
        exists: false,
      });
    }

    const stateData = stateDoc.data() as ToolState | undefined;
    if (!stateData) {
      return respond.error("State data not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    return respond.success({
      state: stateData.state,
      metadata: stateData.metadata ?? buildMetadataFromState(stateData.state, stateData.updatedAt),
      exists: true,
      createdAt: stateData.createdAt,
      updatedAt: stateData.updatedAt,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error fetching tool state", err, {
      deploymentId,
      userId,
      endpoint: "/api/tools/state/[deploymentId]",
    });

    return respond.error("Failed to fetch tool state", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export const PUT = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const { deploymentId } = context.params;

  if (!deploymentId) {
    return respond.error("Deployment ID is required", "INVALID_INPUT", { status: HttpStatus.BAD_REQUEST });
  }

  const userId = request.user.id;

  try {
    const { state, metadata, merge = true } = await request.json() as {
      state: Record<string, unknown>;
      metadata?: Partial<ToolState["metadata"]>;
      merge?: boolean;
    };

    const deployment = await getDeployment(deploymentId);
    if (!deployment) {
      return respond.error("Deployment not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    const hasAccess = await canUserAccessState(userId, deployment);
    if (!hasAccess) {
      return respond.error("Access denied", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
    }

    const now = new Date().toISOString();
    const stateId = createStateId(deploymentId, userId);

    const existingStateDoc = await dbAdmin.collection(STATES_COLLECTION).doc(stateId).get();
    const existingStateData = existingStateDoc.data() as ToolState | undefined;

    const existingState = merge && existingStateData ? existingStateData.state : {};
    const finalState = merge ? { ...existingState, ...state } : state;

    const stateSize = calculateStateSize(finalState);
    if (stateSize > MAX_STATE_SIZE_BYTES) {
      return respond.error("State data too large (max 1MB)", "PAYLOAD_TOO_LARGE", { status: HttpStatus.PAYLOAD_TOO_LARGE });
    }

    const stateDocument: ToolState = {
      deploymentId,
      toolId: deployment.toolId ?? "",
      userId,
      state: finalState,
      metadata: {
        version: metadata?.version ?? "1.0.0",
        lastSaved: now,
        autoSave: metadata?.autoSave !== false,
        size: stateSize,
      },
      createdAt: existingStateData?.createdAt ?? now,
      updatedAt: now,
    };

    await dbAdmin.collection(STATES_COLLECTION).doc(stateId).set(stateDocument);

    return respond.success({
      success: true,
      state: finalState,
      metadata: stateDocument.metadata,
      updatedAt: now,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error updating tool state", err, {
      deploymentId,
      userId,
      endpoint: "/api/tools/state/[deploymentId]",
    });

    return respond.error("Failed to update tool state", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export const PATCH = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const { deploymentId } = context.params;

  if (!deploymentId) {
    return respond.error("Deployment ID is required", "INVALID_INPUT", { status: HttpStatus.BAD_REQUEST });
  }

  const userId = request.user.id;

  try {
    const { path, value, operation = "set" } = await request.json() as {
      path: string;
      value: unknown;
      operation?: "set" | "delete" | "increment" | "append";
    };

    if (!path) {
      return respond.error("Path is required for partial updates", "INVALID_INPUT", {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const deployment = await getDeployment(deploymentId);
    if (!deployment) {
      return respond.error("Deployment not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    const hasAccess = await canUserAccessState(userId, deployment);
    if (!hasAccess) {
      return respond.error("Access denied", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
    }

    const stateId = createStateId(deploymentId, userId);
    const stateDoc = await dbAdmin.collection(STATES_COLLECTION).doc(stateId).get();

    if (!stateDoc.exists) {
      return respond.error("State not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    const currentStateData = stateDoc.data() as ToolState | undefined;
    if (!currentStateData) {
      return respond.error("State data not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    const nextState = JSON.parse(JSON.stringify(currentStateData.state)) as Record<string, unknown>;

    switch (operation) {
      case "set":
        setNestedValue(nextState, path, value);
        break;
      case "delete":
        deleteNestedValue(nextState, path);
        break;
      case "increment": {
        const currentValue = getNestedValue(nextState, path);
        const numericValue = typeof currentValue === "number" ? currentValue : 0;
        const incrementBy = typeof value === "number" ? value : 1;
        setNestedValue(nextState, path, numericValue + incrementBy);
        break;
      }
      case "append": {
        const currentValue = getNestedValue(nextState, path);
        if (!Array.isArray(currentValue)) {
          return respond.error("Path does not point to an array", "INVALID_INPUT", {
            status: HttpStatus.BAD_REQUEST,
          });
        }
        currentValue.push(value);
        setNestedValue(nextState, path, currentValue);
        break;
      }
      default:
        return respond.error("Unsupported operation", "INVALID_INPUT", { status: HttpStatus.BAD_REQUEST });
    }

    const stateSize = calculateStateSize(nextState);
    if (stateSize > MAX_STATE_SIZE_BYTES) {
      return respond.error("State data too large (max 1MB)", "PAYLOAD_TOO_LARGE", {
        status: HttpStatus.PAYLOAD_TOO_LARGE,
      });
    }

    const now = new Date().toISOString();

    await dbAdmin.collection(STATES_COLLECTION).doc(stateId).update({
      state: nextState,
      "metadata.size": stateSize,
      "metadata.lastSaved": now,
      updatedAt: now,
    });

    return respond.success({
      success: true,
      state: nextState,
      operation,
      path,
      value,
      updatedAt: now,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error patching tool state", err, {
      deploymentId,
      userId,
      endpoint: "/api/tools/state/[deploymentId]",
    });

    return respond.error("Failed to patch tool state", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export const DELETE = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const { deploymentId } = context.params;

  if (!deploymentId) {
    return respond.error("Deployment ID is required", "INVALID_INPUT", { status: HttpStatus.BAD_REQUEST });
  }

  const userId = request.user.id;

  try {
    const deployment = await getDeployment(deploymentId);
    if (!deployment) {
      return respond.error("Deployment not found", "RESOURCE_NOT_FOUND", { status: HttpStatus.NOT_FOUND });
    }

    const hasAccess = await canUserAccessState(userId, deployment);
    if (!hasAccess) {
      return respond.error("Access denied", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
    }

    const stateId = createStateId(deploymentId, userId);
    await dbAdmin.collection(STATES_COLLECTION).doc(stateId).delete();

    return respond.success({
      success: true,
      message: "Tool state cleared successfully",
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error clearing tool state", err, {
      deploymentId,
      userId,
      endpoint: "/api/tools/state/[deploymentId]",
    });

    return respond.error("Failed to clear tool state", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

async function getDeployment(deploymentId: string): Promise<ToolDeployment | null> {
  const deploymentDoc = await dbAdmin.collection(DEPLOYMENTS_COLLECTION).doc(deploymentId).get();
  if (!deploymentDoc.exists) {
    return null;
  }

  return (deploymentDoc.data() as ToolDeployment) ?? null;
}

async function canUserAccessState(userId: string, deployment: ToolDeployment): Promise<boolean> {
  try {
    if (deployment.deployedTo === "profile") {
      return deployment.targetId === userId;
    }

    if (deployment.deployedTo === "space" && deployment.targetId) {
      const membershipSnapshot = await dbAdmin
        .collection("members")
        .where("userId", "==", userId)
        .where("spaceId", "==", deployment.targetId)
        .where("status", "==", "active")
        .get();

      return !membershipSnapshot.empty;
    }

    return false;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error checking state access", err, {
      deployment,
      userId,
      endpoint: "/api/tools/state/[deploymentId]",
    });
    return false;
  }
}

function createStateId(deploymentId: string, userId: string): string {
  return `${deploymentId}_${userId}`;
}

function calculateStateSize(state: Record<string, unknown>): number {
  return JSON.stringify(state).length;
}

function buildMetadataFromState(state: Record<string, unknown>, updatedAt: string): ToolState["metadata"] {
  return {
    version: "1.0.0",
    lastSaved: updatedAt,
    autoSave: true,
    size: calculateStateSize(state),
  };
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }

    return (current as Record<string, unknown>)[key];
  }, obj);
}

function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split(".");
  const lastKey = keys.pop();

  if (!lastKey) {
    return;
  }

  let target: Record<string, unknown> = obj;

  for (const key of keys) {
    const current = target[key];
    if (typeof current !== "object" || current === null) {
      target[key] = {};
    }

    target = target[key] as Record<string, unknown>;
  }

  target[lastKey] = value as never;
}

function deleteNestedValue(obj: Record<string, unknown>, path: string): void {
  const keys = path.split(".");
  const lastKey = keys.pop();

  if (!lastKey) {
    return;
  }

  let target: Record<string, unknown> | undefined = obj;

  for (const key of keys) {
    const current = target?.[key];
    if (typeof current !== "object" || current === null) {
      target = undefined;
      break;
    }

    target = current as Record<string, unknown>;
  }

  if (target && lastKey in target) {
    delete target[lastKey];
  }
}
