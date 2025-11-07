"use server";

import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/structured-logger";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { getPlacementFromDeploymentDoc } from "@/lib/tool-placement";
import {
  withAuthAndErrors,
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";

const STATE_SIZE_LIMIT_BYTES = 1024 * 1024; // 1MB

const UpdateStateSchema = z.object({
  state: z.record(z.any()),
  metadata: z
    .object({
      version: z.string().optional(),
      autoSave: z.boolean().optional(),
    })
    .optional(),
  merge: z.boolean().optional(),
});

const PatchStateSchema = z.object({
  path: z.string().min(1),
  value: z.any().optional(),
  operation: z
    .enum(["set", "delete", "increment", "append"])
    .default("set"),
});

type DeploymentDoc =
  FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;

interface ToolStateDocument {
  deploymentId: string;
  toolId: string;
  userId: string;
  state: Record<string, any>;
  metadata: {
    version: string;
    lastSaved: string | null;
    autoSave: boolean;
    size: number;
  };
  createdAt: string;
  updatedAt: string;
  campusId?: string;
}

async function loadDeployment(deploymentId: string) {
  const doc = await dbAdmin.collection("deployedTools").doc(deploymentId).get();
  if (!doc.exists) {
    return {
      ok: false as const,
      status: 404,
      message: "Deployment not found",
    };
  }

  const data = doc.data();
  if (!data) {
    return {
      ok: false as const,
      status: 400,
      message: "Invalid deployment data",
    };
  }

  if (data.campusId && data.campusId !== CURRENT_CAMPUS_ID) {
    return {
      ok: false as const,
      status: 403,
      message: "Access denied for this campus",
    };
  }

  return { ok: true as const, doc, data };
}

async function canUserAccessDeploymentState(
  userId: string,
  deployment: FirebaseFirestore.DocumentData,
) {
  if (deployment.deployedTo === "profile") {
    return deployment.targetId === userId;
  }

  if (deployment.deployedTo === "space") {
    const membershipSnapshot = await dbAdmin
      .collection("members")
      .where("userId", "==", userId)
      .where("spaceId", "==", deployment.targetId)
      .where("status", "==", "active")
      .limit(1)
      .get();
    return !membershipSnapshot.empty;
  }

  return false;
}

async function ensureStateAccess(
  userId: string,
  deploymentDoc: DeploymentDoc,
) {
  const deploymentData = deploymentDoc.data();
  if (!deploymentData) {
    return {
      ok: false as const,
      status: 400,
      message: "Invalid deployment data",
    };
  }

  if (deploymentData.campusId && deploymentData.campusId !== CURRENT_CAMPUS_ID) {
    return {
      ok: false as const,
      status: 403,
      message: "Access denied for this campus",
    };
  }

  const hasAccess = await canUserAccessDeploymentState(userId, deploymentData);
  if (!hasAccess) {
    return {
      ok: false as const,
      status: 403,
      message: "Access denied",
    };
  }

  return { ok: true as const, deploymentData };
}

async function fetchStateDocuments(
  deploymentDoc: DeploymentDoc,
  userId: string,
) {
  const placementContext = await getPlacementFromDeploymentDoc(deploymentDoc);
  const placementStateDoc = placementContext
    ? await placementContext.ref.collection("state").doc(userId).get()
    : null;

  const globalStateDoc = await dbAdmin
    .collection("toolStates")
    .doc(`${deploymentDoc.id}_${userId}`)
    .get();

  return { placementContext, placementStateDoc, globalStateDoc };
}

function ensureStateWithinLimit(state: Record<string, any>) {
  const size = JSON.stringify(state).length;
  if (size > STATE_SIZE_LIMIT_BYTES) {
    return {
      ok: false as const,
      status: 413,
      message: "State data too large (max 1MB)",
    };
  }
  return { ok: true as const, size };
}

function mergeState(
  existing: Record<string, any> | undefined,
  incoming: Record<string, any>,
  shouldMerge: boolean | undefined,
) {
  if (!existing || !shouldMerge) {
    return incoming;
  }
  return { ...existing, ...incoming };
}

function getNestedValue(object: any, path: string) {
  return path.split(".").reduce((current, key) => current?.[key], object);
}

function setNestedValue(object: any, path: string, value: any) {
  const keys = path.split(".");
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!(key in current)) current[key] = {};
    return current[key];
  }, object);
  target[lastKey] = value;
}

function deleteNestedValue(object: any, path: string) {
  const keys = path.split(".");
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => current?.[key], object);
  if (target && lastKey in target) {
    delete target[lastKey];
  }
}

function applyPatchOperation(
  state: Record<string, any>,
  patch: z.infer<typeof PatchStateSchema>,
) {
  switch (patch.operation) {
    case "set":
      setNestedValue(state, patch.path, patch.value);
      break;
    case "delete":
      deleteNestedValue(state, patch.path);
      break;
    case "increment": {
      const currentValue = Number(getNestedValue(state, patch.path)) || 0;
      setNestedValue(state, patch.path, currentValue + Number(patch.value ?? 1));
      break;
    }
    case "append": {
      const currentArray = getNestedValue(state, patch.path) || [];
      if (!Array.isArray(currentArray)) {
        return {
          ok: false as const,
          status: 400,
          message: "Path does not point to an array",
        };
      }
      currentArray.push(patch.value);
      setNestedValue(state, patch.path, currentArray);
      break;
    }
    default:
      return {
        ok: false as const,
        status: 400,
        message: "Unsupported operation",
      };
  }
  return { ok: true as const };
}

function createStatePayload(
  deploymentId: string,
  toolId: string,
  userId: string,
  state: Record<string, any>,
  size: number,
  metadata?: { version?: string; autoSave?: boolean },
  createdAt?: string,
): ToolStateDocument {
  const timestamp = new Date().toISOString();
  return {
    deploymentId,
    toolId,
    userId,
    state,
    metadata: {
      version: metadata?.version ?? "1.0.0",
      lastSaved: timestamp,
      autoSave: metadata?.autoSave !== false,
      size,
    },
    createdAt: createdAt ?? timestamp,
    updatedAt: timestamp,
    campusId: CURRENT_CAMPUS_ID,
  };
}

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ deploymentId: string }> },
  respond,
) => {
  const userId = getUserId(request);
  const { deploymentId } = await params;

  const deploymentResult = await loadDeployment(deploymentId);
  if (!deploymentResult.ok) {
    return respond.error(deploymentResult.message, "RESOURCE_NOT_FOUND", {
      status: deploymentResult.status,
    });
  }

  const accessResult = await ensureStateAccess(userId, deploymentResult.doc);
  if (!accessResult.ok) {
    return respond.error(accessResult.message, "FORBIDDEN", {
      status: accessResult.status,
    });
  }

  const { placementContext, placementStateDoc, globalStateDoc } =
    await fetchStateDocuments(deploymentResult.doc, userId);

  const stateDoc =
    (placementStateDoc && placementStateDoc.exists
      ? (placementStateDoc.data() as ToolStateDocument)
      : null) ??
    (globalStateDoc.exists
      ? (globalStateDoc.data() as ToolStateDocument)
      : null);

  if (!stateDoc) {
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

  return respond.success({
    state: stateDoc.state,
    metadata: stateDoc.metadata,
    exists: true,
    createdAt: stateDoc.createdAt,
    updatedAt: stateDoc.updatedAt,
  });
});

export const PUT = withAuthValidationAndErrors(
  UpdateStateSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ deploymentId: string }> },
    body,
    respond,
  ) => {
    const userId = getUserId(request);
    const { deploymentId } = await params;

    const deploymentResult = await loadDeployment(deploymentId);
    if (!deploymentResult.ok) {
      return respond.error(deploymentResult.message, "RESOURCE_NOT_FOUND", {
        status: deploymentResult.status,
      });
    }

    const { data: deploymentData } = deploymentResult;

    const accessResult = await ensureStateAccess(userId, deploymentResult.doc);
    if (!accessResult.ok) {
      return respond.error(accessResult.message, "FORBIDDEN", {
        status: accessResult.status,
      });
    }

    const { placementContext, placementStateDoc, globalStateDoc } =
      await fetchStateDocuments(deploymentResult.doc, userId);

    const existingState =
      placementStateDoc?.data()?.state ??
      globalStateDoc.data()?.state ??
      undefined;

    const mergedState = mergeState(existingState, body.state, body.merge);

    const sizeCheck = ensureStateWithinLimit(mergedState);
    if (!sizeCheck.ok) {
      return respond.error(sizeCheck.message, "INVALID_INPUT", {
        status: sizeCheck.status,
      });
    }

    const existingCreatedAt =
      (placementStateDoc?.data() as ToolStateDocument | undefined)?.createdAt ??
      (globalStateDoc.data() as ToolStateDocument | undefined)?.createdAt;

    const stateDocument = createStatePayload(
      deploymentId,
      deploymentData.toolId ?? "",
      userId,
      mergedState,
      sizeCheck.size,
      body.metadata,
      existingCreatedAt,
    );

    await dbAdmin
      .collection("toolStates")
      .doc(`${deploymentId}_${userId}`)
      .set(stateDocument);

    if (placementContext) {
      await placementContext.ref.collection("state").doc(userId).set(
        stateDocument,
        {
          merge: true,
        },
      );
    }

    return respond.success({
      success: true,
      state: mergedState,
      metadata: stateDocument.metadata,
      updatedAt: stateDocument.updatedAt,
    });
  },
);

export const PATCH = withAuthValidationAndErrors(
  PatchStateSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ deploymentId: string }> },
    body,
    respond,
  ) => {
    const userId = getUserId(request);
    const { deploymentId } = await params;

    const deploymentResult = await loadDeployment(deploymentId);
    if (!deploymentResult.ok) {
      return respond.error(deploymentResult.message, "RESOURCE_NOT_FOUND", {
        status: deploymentResult.status,
      });
    }

    const accessResult = await ensureStateAccess(userId, deploymentResult.doc);
    if (!accessResult.ok) {
      return respond.error(accessResult.message, "FORBIDDEN", {
        status: accessResult.status,
      });
    }

    const { placementContext, placementStateDoc, globalStateDoc } =
      await fetchStateDocuments(deploymentResult.doc, userId);

    const sourceDoc =
      placementStateDoc && placementStateDoc.exists
        ? (placementStateDoc.data() as ToolStateDocument)
        : (globalStateDoc.data() as ToolStateDocument | undefined);

    if (!sourceDoc) {
      return respond.error("State not found", "RESOURCE_NOT_FOUND", {
        status: 404,
      });
    }

    const mutableState = { ...sourceDoc.state };
    const patchResult = applyPatchOperation(mutableState, body);
    if (!patchResult.ok) {
      return respond.error(patchResult.message, "INVALID_INPUT", {
        status: patchResult.status,
      });
    }

    const sizeCheck = ensureStateWithinLimit(mutableState);
    if (!sizeCheck.ok) {
      return respond.error(sizeCheck.message, "INVALID_INPUT", {
        status: sizeCheck.status,
      });
    }

    const timestamp = new Date().toISOString();
    const stateId = `${deploymentId}_${userId}`;

    await dbAdmin.collection("toolStates").doc(stateId).set(
      {
        state: mutableState,
        "metadata.size": sizeCheck.size,
        "metadata.lastSaved": timestamp,
        updatedAt: timestamp,
      },
      { merge: true },
    );

    if (placementContext) {
      await placementContext.ref.collection("state").doc(userId).set(
        {
          state: mutableState,
          metadata: {
            ...(sourceDoc.metadata ?? {}),
            size: sizeCheck.size,
            lastSaved: timestamp,
          },
          updatedAt: timestamp,
        },
        { merge: true },
      );
    }

    return respond.success({
      success: true,
      state: mutableState,
      operation: body.operation,
      path: body.path,
      value: body.value,
      updatedAt: timestamp,
    });
  },
);

export const DELETE = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ deploymentId: string }> },
  respond,
) => {
  const userId = getUserId(request);
  const { deploymentId } = await params;

  const deploymentResult = await loadDeployment(deploymentId);
  if (!deploymentResult.ok) {
    return respond.error(deploymentResult.message, "RESOURCE_NOT_FOUND", {
      status: deploymentResult.status,
    });
  }

  const accessResult = await ensureStateAccess(userId, deploymentResult.doc);
  if (!accessResult.ok) {
    return respond.error(accessResult.message, "FORBIDDEN", {
      status: accessResult.status,
    });
  }

  const { placementContext } = await fetchStateDocuments(
    deploymentResult.doc,
    userId,
  );

  await dbAdmin
    .collection("toolStates")
    .doc(`${deploymentId}_${userId}`)
    .delete();

  if (placementContext) {
    await placementContext.ref.collection("state").doc(userId).delete();
  }

  return respond.success({
    success: true,
    message: "Tool state cleared successfully",
  });
});
