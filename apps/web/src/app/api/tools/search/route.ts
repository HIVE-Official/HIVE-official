"use server";

import * as admin from "firebase-admin";
import { z } from "zod";
import { dbAdmin as adminDb } from "@/lib/firebase-admin";
import { logger } from "@/lib/structured-logger";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import {
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";

const SearchToolsSchema = z.object({
  query: z.string().min(1).max(100),
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
  category: z
    .enum([
      "productivity",
      "academic",
      "social",
      "utility",
      "entertainment",
      "other",
    ])
    .optional(),
  verified: z.coerce.boolean().optional(),
  minDeployments: z.coerce.number().min(0).optional(),
  sortBy: z
    .enum(["relevance", "deployments", "rating", "created"])
    .default("relevance"),
  includePrivate: z.coerce.boolean().default(false),
});

type SearchToolsInput = z.infer<typeof SearchToolsSchema>;

function computeRelevanceScore(params: {
  nameMatch: boolean;
  exactNameMatch: boolean;
  descriptionMatch: boolean;
  tagMatch: boolean;
  isVerified: boolean;
  deploymentCount: number;
  rating: number;
}): number {
  const {
    nameMatch,
    exactNameMatch,
    descriptionMatch,
    tagMatch,
    isVerified,
    deploymentCount,
    rating,
  } = params;

  let score = 0;
  if (exactNameMatch) {
    score += 120;
  } else if (nameMatch) {
    score += 80;
  }
  if (descriptionMatch) {
    score += 60;
  }
  if (tagMatch) {
    score += 40;
  }
  if (isVerified) {
    score += 20;
  }

  score += Math.min(20, deploymentCount * 2);
  score += rating * 5;
  return score;
}

function highlightSnippet(text: string, queryLower: string) {
  const lower = text.toLowerCase();
  const index = lower.indexOf(queryLower);
  if (index === -1) return [];
  return [
    text.substring(
      Math.max(0, index - 30),
      Math.min(text.length, index + queryLower.length + 30),
    ),
  ];
}

export const POST = withAuthValidationAndErrors(
  SearchToolsSchema,
  async (
    request: AuthenticatedRequest,
    _context: {},
    searchParams: SearchToolsInput,
    respond,
  ) => {
    const userId = getUserId(request);
    const {
      query,
      limit,
      offset,
      category,
      verified,
      minDeployments,
      sortBy,
      includePrivate,
    } = searchParams;

    try {
      let toolsQuery: admin.firestore.Query<admin.firestore.DocumentData> =
        adminDb.collection("tools").where("campusId", "==", CURRENT_CAMPUS_ID);

      if (category) {
        toolsQuery = toolsQuery.where("category", "==", category);
      }

      if (verified !== undefined) {
        toolsQuery = toolsQuery.where("isVerified", "==", verified);
      }

      if (!includePrivate) {
        toolsQuery = toolsQuery.where("isPrivate", "==", false);
      }

      const toolsSnapshot = await toolsQuery.get();
      const tools: Array<{
        id: string;
        name: string;
        description: string;
        category: string;
        tags: string[];
        deploymentCount: number;
        averageRating: number;
        ratingCount: number;
        isVerified: boolean;
        isPrivate: boolean;
        previewImage: string | null;
        createdAt: string;
        updatedAt: string;
        creator: {
          id: string;
          name: string;
          avatar: string | null;
        } | null;
        userDeployment: {
          id: string;
          status: string;
          deployedAt: string | undefined;
        } | null;
        relevanceScore: number;
        highlights: {
          name: string[];
          description: string[];
          tags: string[];
        };
      }> = [];

      const queryLower = query.toLowerCase();

      for (const doc of toolsSnapshot.docs) {
        const toolData = doc.data();
        const nameText = String(toolData.name || "");
        const nameLower = nameText.toLowerCase();
        const descriptionText = String(toolData.description || "");
        const descriptionLower = descriptionText.toLowerCase();
        const tagsList = Array.isArray(toolData.tags)
          ? toolData.tags.map((tag: unknown) => String(tag))
          : [];
        const tagsLower = tagsList.map((tag) => tag.toLowerCase());

        const nameMatch = nameLower.includes(queryLower);
        const descriptionMatch = descriptionLower.includes(queryLower);
        const tagMatch = tagsLower.some((tag) => tag.includes(queryLower));

        if (!nameMatch && !descriptionMatch && !tagMatch) {
          continue;
        }

        const deploymentCount = toolData.deploymentCount || 0;
        if (
          minDeployments !== undefined &&
          deploymentCount < minDeployments
        ) {
          continue;
        }

        const rating = toolData.averageRating || 0;

        const relevanceScore = computeRelevanceScore({
          nameMatch,
          exactNameMatch: nameLower === queryLower,
          descriptionMatch,
          tagMatch,
          isVerified: Boolean(toolData.isVerified),
          deploymentCount,
          rating,
        });

        let creator: {
          id: string;
          name: string;
          avatar: string | null;
        } | null = null;

        if (toolData.creatorId) {
          try {
            const creatorDoc = await adminDb
              .collection("users")
              .doc(toolData.creatorId)
              .get();
            if (creatorDoc.exists) {
              const creatorData = creatorDoc.data();
              creator = {
                id: creatorDoc.id,
                name: creatorData?.fullName || "Unknown",
                avatar: creatorData?.photoURL || null,
              };
            }
          } catch (error) {
            logger.warn(
              "Failed to fetch creator info at /api/tools/search",
              error instanceof Error ? error : new Error(String(error)),
            );
          }
        }

        let userDeployment: {
          id: string;
          status: string;
          deployedAt: string | undefined;
        } | null = null;
        try {
          const deploymentSnapshot = await adminDb
            .collection("deployments")
            .where("toolId", "==", doc.id)
            .where("userId", "==", userId)
            .where("campusId", "==", CURRENT_CAMPUS_ID)
            .where("status", "==", "active")
            .limit(1)
            .get();

          if (!deploymentSnapshot.empty) {
            const deploymentData = deploymentSnapshot.docs[0].data();
            userDeployment = {
              id: deploymentSnapshot.docs[0].id,
              status: deploymentData.status,
              deployedAt: deploymentData.deployedAt?.toDate?.()?.toISOString(),
            };
          }
        } catch (error) {
          logger.warn(
            "Failed to check user deployment at /api/tools/search",
            error instanceof Error ? error : new Error(String(error)),
          );
        }

        tools.push({
          id: doc.id,
          name: toolData.name,
          description: toolData.description,
          category: toolData.category,
            tags: tagsList,
          deploymentCount,
          averageRating: rating,
          ratingCount: toolData.ratingCount || 0,
          isVerified: toolData.isVerified || false,
          isPrivate: toolData.isPrivate || false,
          previewImage: toolData.previewImage || null,
          createdAt:
            toolData.createdAt?.toDate?.()?.toISOString() ??
            new Date().toISOString(),
          updatedAt:
            toolData.updatedAt?.toDate?.()?.toISOString() ??
            new Date().toISOString(),
          creator,
          userDeployment,
          relevanceScore,
            highlights: {
              name: nameMatch ? [nameText] : [],
              description: descriptionMatch
                ? highlightSnippet(descriptionText, queryLower)
                : [],
              tags: tagMatch
                ? tagsList.filter((_tag, index) =>
                    tagsLower[index].includes(queryLower),
                  )
                : [],
            },
        });
      }

      tools.sort((a, b) => {
        switch (sortBy) {
          case "deployments":
            return b.deploymentCount - a.deploymentCount;
          case "rating":
            if (b.averageRating !== a.averageRating) {
              return b.averageRating - a.averageRating;
            }
            return b.ratingCount - a.ratingCount;
          case "created":
            return (
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
            );
          case "relevance":
          default:
            return b.relevanceScore - a.relevanceScore;
        }
      });

      const paginatedTools = tools.slice(offset, offset + limit);

      return respond.success({
        tools: paginatedTools,
        total: tools.length,
        hasMore: tools.length > offset + limit,
        pagination: {
          limit,
          offset,
          nextOffset: tools.length > offset + limit ? offset + limit : null,
        },
        query: {
          ...searchParams,
          executedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      logger.error(
        "Error searching tools at /api/tools/search",
        error instanceof Error ? error : new Error(String(error)),
      );
      return respond.error("Failed to search tools", "INTERNAL_ERROR", {
        status: 500,
      });
    }
  },
);
