"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import {
  withAuthAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";

const VALID_STATUSES = new Set(["draft", "published", "archived"]);

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

function parseInteger(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  _context,
  respond,
) => {
  try {
    const viewerId = getUserId(request);
    const searchParams = request.nextUrl.searchParams;

    const requestedUserId = searchParams.get("userId") ?? undefined;
    const statusParam = searchParams.get("status") ?? undefined;
    const category = searchParams.get("category") ?? undefined;
    const type = searchParams.get("type") ?? undefined;
    const featured = searchParams.get("featured") === "true";
    const limit = Math.min(
      parseInteger(searchParams.get("limit"), DEFAULT_LIMIT),
      MAX_LIMIT,
    );
    const offset = parseInteger(searchParams.get("offset"), 0);
    const search = searchParams.get("search") ?? undefined;

    let query = dbAdmin
      .collection("tools")
      .where("campusId", "==", CURRENT_CAMPUS_ID);

    if (requestedUserId) {
      if (requestedUserId === viewerId) {
        query = query.where("ownerId", "==", requestedUserId);
      } else {
        query = query
          .where("ownerId", "==", requestedUserId)
          .where("isPublic", "==", true)
          .where("status", "==", "published");
      }
    } else {
      query = query
        .where("isPublic", "==", true)
        .where("status", "==", "published");
    }

    if (
      statusParam &&
      VALID_STATUSES.has(statusParam) &&
      requestedUserId === viewerId
    ) {
      query = query.where("status", "==", statusParam);
    }

    if (category && category !== "all") {
      query = query.where("category", "==", category);
    }

    if (type && type !== "all") {
      query = query.where("metadata.toolType", "==", type);
    }

    if (featured) {
      query = query.where("metadata.featured", "==", true);
    }

    query = query.orderBy("createdAt", "desc");

    if (offset > 0) {
      const offsetSnapshot = await query.limit(offset).get();
      if (!offsetSnapshot.empty) {
        const lastDoc = offsetSnapshot.docs[offsetSnapshot.docs.length - 1];
        query = query.startAfter(lastDoc);
      }
    }

    query = query.limit(limit);
    const snapshot = await query.get();

    const tools = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const toolData = doc.data();

        let createdByName = "Anonymous";
        try {
          const ownerDoc = await dbAdmin
            .collection("users")
            .doc(toolData.ownerId)
            .get();
          if (ownerDoc.exists) {
            const ownerData = ownerDoc.data();
            createdByName =
              normalizeText(ownerData?.displayName) ||
              normalizeText(ownerData?.name) ||
              `${normalizeText(ownerData?.firstName)} ${normalizeText(
                ownerData?.lastName,
              )}`.trim() ||
              "Anonymous";
          }
        } catch (error) {
          logger.warn("Failed to fetch tool creator", {
            toolOwnerId: toolData.ownerId,
            error: error instanceof Error ? error : new Error(String(error)),
            endpoint: "/api/tools/browse",
          });
        }

        if (search) {
          const queryLower = search.toLowerCase();
          const matchesSearch =
            toolData.name?.toLowerCase().includes(queryLower) ||
            toolData.description?.toLowerCase().includes(queryLower) ||
            (toolData.tags || []).some((tag: string) =>
              tag.toLowerCase().includes(queryLower),
            );

          if (!matchesSearch) {
            return null;
          }
        }

        return {
          id: doc.id,
          ...toolData,
          createdByName,
          stats: {
            views: 0,
            uses: 0,
            likes: 0,
            installs: 0,
            shares: 0,
            ...toolData.stats,
          },
          metadata: {
            version: "1.0.0",
            difficulty: "beginner",
            featured: false,
            toolType: toolData.type || "visual",
            ...toolData.metadata,
          },
          tags: toolData.tags || [],
          collaborators: toolData.collaborators || [],
          createdAt:
            toolData.createdAt?.toDate?.()?.toISOString() ||
            toolData.createdAt,
          updatedAt:
            toolData.updatedAt?.toDate?.()?.toISOString() ||
            toolData.updatedAt,
        };
      }),
    );

    const filteredTools = tools.filter(
      (tool): tool is NonNullable<typeof tool> => tool !== null,
    );

    let total = filteredTools.length;
    if (offset === 0) {
      try {
        let countQuery = dbAdmin
          .collection("tools")
          .where("campusId", "==", CURRENT_CAMPUS_ID);

        if (requestedUserId) {
          if (requestedUserId === viewerId) {
            countQuery = countQuery.where("ownerId", "==", requestedUserId);
          } else {
            countQuery = countQuery
              .where("ownerId", "==", requestedUserId)
              .where("isPublic", "==", true)
              .where("status", "==", "published");
          }
        } else {
          countQuery = countQuery
            .where("isPublic", "==", true)
            .where("status", "==", "published");
        }

        const countSnapshot = await countQuery.count().get();
        total = countSnapshot.data().count;
      } catch (error) {
        logger.warn("Failed to count tools for browse", {
          error: error instanceof Error ? error : new Error(String(error)),
          endpoint: "/api/tools/browse",
        });
      }
    }

    return respond.success({
      tools: filteredTools,
      pagination: {
        total,
        limit,
        offset,
        hasMore: filteredTools.length === limit,
        returned: filteredTools.length,
      },
    });
  } catch (error) {
    logger.error(
      "Error browsing tools",
      error instanceof Error ? error : new Error(String(error)),
    );
    return respond.error("Failed to browse tools", "INTERNAL_ERROR", {
      status: 500,
    });
  }
});
