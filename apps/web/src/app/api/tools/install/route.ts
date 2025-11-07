"use server";

import * as admin from "firebase-admin";
import { dbAdmin as adminDb } from "@/lib/firebase-admin";
import { z } from "zod";
import { logger } from "@/lib/structured-logger";
import {
  createPlacementDocument,
  buildPlacementCompositeId,
} from "@/lib/tool-placement";
import {
  CURRENT_CAMPUS_ID,
  validateSecureSpaceAccess,
} from "@/lib/secure-firebase-queries";
import {
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";

const InstallRequestSchema = z.object({
  toolId: z.string(),
  installTo: z.enum(["profile", "space"]),
  targetId: z.string(),
  surface: z
    .enum(["pinned", "posts", "events", "tools", "chat", "members"])
    .optional(),
  config: z.record(z.any()).optional(),
  permissions: z
    .object({
      canInteract: z.boolean().optional(),
      canView: z.boolean().optional(),
      canEdit: z.boolean().optional(),
      allowedRoles: z.array(z.string()).optional(),
    })
    .optional(),
});

type InstallRequest = z.infer<typeof InstallRequestSchema>;

function ensureActivePermissions(input: InstallRequest["permissions"]) {
  return {
    canInteract: input?.canInteract ?? true,
    canView: input?.canView ?? true,
    canEdit: input?.canEdit ?? false,
    allowedRoles:
      input?.allowedRoles ?? ["member", "moderator", "admin", "builder"],
  };
}

async function validateSpaceMembership(userId: string, spaceId: string) {
  const { isValid, space, error } = await validateSecureSpaceAccess(
    spaceId,
    userId,
  );
  if (!isValid || !space) {
    return { ok: false as const, error: error ?? "Space not accessible" };
  }

  const membershipSnapshot = await adminDb
    .collection("members")
    .where("userId", "==", userId)
    .where("spaceId", "==", spaceId)
    .where("status", "==", "active")
    .where("campusId", "==", CURRENT_CAMPUS_ID)
    .limit(1)
    .get();

  if (membershipSnapshot.empty) {
    return { ok: false as const, error: "Not a member of this space" };
  }

  const membership = membershipSnapshot.docs[0].data();
  if (!["builder", "admin", "moderator"].includes(membership.role)) {
    return {
      ok: false as const,
      error: "Insufficient permissions to install tools",
    };
  }

  return { ok: true as const, space };
}

export const POST = withAuthValidationAndErrors(
  InstallRequestSchema,
  async (
    request: AuthenticatedRequest,
    _context: {},
    validatedData: InstallRequest,
    respond,
  ) => {
    try {
      const userId = getUserId(request);

      // Ensure marketplace entry exists within campus
      const marketplaceSnapshot = await adminDb
        .collection("marketplace")
        .where("toolId", "==", validatedData.toolId)
        .where("campusId", "==", CURRENT_CAMPUS_ID)
        .limit(1)
        .get();

      if (marketplaceSnapshot.empty) {
        return respond.error("Tool not found in marketplace", "RESOURCE_NOT_FOUND", {
          status: 404,
        });
      }

      const marketplaceTool = marketplaceSnapshot.docs[0].data();

      // Load tool record and enforce campus isolation
      const toolDoc = await adminDb.collection("tools").doc(validatedData.toolId).get();
      if (!toolDoc.exists) {
        return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: 404 });
      }

      const toolData = toolDoc.data();
      if (!toolData) {
        return respond.error("Tool data not found", "RESOURCE_NOT_FOUND", { status: 404 });
      }

      if (toolData.campusId !== CURRENT_CAMPUS_ID) {
        return respond.error("Access denied for this campus", "FORBIDDEN", { status: 403 });
      }

      if (toolData.status !== "published") {
        return respond.error("Tool is not available for installation", "INVALID_INPUT", {
          status: 400,
        });
      }

      if (
        validatedData.installTo === "profile" &&
        validatedData.targetId !== userId
      ) {
        return respond.error("Can only install to your own profile", "FORBIDDEN", {
          status: 403,
        });
      }

      if (validatedData.installTo === "space") {
        const membershipResult = await validateSpaceMembership(
          userId,
          validatedData.targetId,
        );
        if (!membershipResult.ok) {
          return respond.error(membershipResult.error, "FORBIDDEN", {
            status: 403,
          });
        }
      }

      const existingInstallSnapshot = await adminDb
        .collection("toolInstallations")
        .where("toolId", "==", validatedData.toolId)
        .where("installTo", "==", validatedData.installTo)
        .where("targetId", "==", validatedData.targetId)
        .where("campusId", "==", CURRENT_CAMPUS_ID)
        .where("status", "!=", "disabled")
        .limit(1)
        .get();

      if (!existingInstallSnapshot.empty) {
        return respond.error("Tool already installed to this target", "CONFLICT", {
          status: 409,
        });
      }

      if (marketplaceTool.pricing?.type === "paid") {
        return respond.error("Paid tools not yet supported", "NOT_IMPLEMENTED", {
          status: 501,
        });
      }

      if (validatedData.installTo === "space") {
        const spaceInstallLimitSnapshot = await adminDb
          .collection("toolInstallations")
          .where("installTo", "==", "space")
          .where("targetId", "==", validatedData.targetId)
          .where("campusId", "==", CURRENT_CAMPUS_ID)
          .where("status", "==", "active")
          .get();

        if (spaceInstallLimitSnapshot.size >= 50) {
          return respond.error(
            "Space has reached maximum tool limit (50)",
            "LIMIT_REACHED",
            { status: 409 },
          );
        }
      }

      const now = new Date();
      const permissions = ensureActivePermissions(validatedData.permissions);

      const installation = {
        toolId: validatedData.toolId,
        installerId: userId,
        installTo: validatedData.installTo,
        targetId: validatedData.targetId,
        surface:
          validatedData.surface ||
          (validatedData.installTo === "space" ? "tools" : undefined),
        config: validatedData.config ?? {},
        permissions,
        status: "active" as const,
        installedAt: now.toISOString(),
        usageCount: 0,
        settings: {
          showInDirectory: true,
          allowSharing: true,
          collectAnalytics: true,
          notifyOnInteraction: false,
        },
        campusId: CURRENT_CAMPUS_ID,
      };

      const placementDocument = {
        ...createPlacementDocument({
          toolId: validatedData.toolId,
          targetId: validatedData.targetId,
          installTo: validatedData.installTo,
          surface: installation.surface || "tools",
          installerId: userId,
          config: installation.config,
          permissions: installation.permissions,
          status: "active",
        }),
        campusId: CURRENT_CAMPUS_ID,
      };

      const batch = adminDb.batch();

      const installationRef =
        adminDb.collection("toolInstallations").doc();
      batch.set(installationRef, installation);

      const placementId = buildPlacementCompositeId(
        validatedData.toolId,
        validatedData.installTo,
        validatedData.targetId,
      );
      const placementRef = adminDb.collection("toolPlacements").doc(placementId);
      batch.set(placementRef, placementDocument);

      const toolRef = adminDb.collection("tools").doc(validatedData.toolId);
      batch.update(toolRef, {
        installCount: admin.firestore.FieldValue.increment(1),
        lastInstalledAt: now.toISOString(),
      });

      const analyticsRef = adminDb.collection("analytics_events").doc();
      batch.set(analyticsRef, {
        eventType: "tool_installed",
        toolId: validatedData.toolId,
        targetId: validatedData.targetId,
        installTo: validatedData.installTo,
        userId,
        campusId: CURRENT_CAMPUS_ID,
        timestamp: now.toISOString(),
      });

      const marketplaceRef = adminDb.collection("marketplace").doc(
        marketplaceSnapshot.docs[0].id,
      );
      batch.update(marketplaceRef, {
        "stats.downloads": admin.firestore.FieldValue.increment(1),
        lastDownloaded: now.toISOString(),
      });

      await batch.commit();

      logger.info("Tool installed successfully", {
        toolId: validatedData.toolId,
        installTo: validatedData.installTo,
        targetId: validatedData.targetId,
        userUid: userId,
      });

      return respond.created(
        {
          installationId: installationRef.id,
          placementId,
        },
        { message: "Tool installed successfully" },
      );
    } catch (error) {
      logger.error("Tool installation failed", {
        error: error instanceof Error ? error : new Error(String(error)),
        requestBody: validatedData,
      });

      if (error instanceof z.ZodError) {
        return respond.error("Invalid installation data", "INVALID_INPUT", {
          status: 400,
          details: error.errors,
        });
      }

      return respond.error("Failed to install tool", "INTERNAL_ERROR", {
        status: 500,
      });
    }
  },
);
