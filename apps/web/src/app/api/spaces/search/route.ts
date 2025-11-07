"use server";

import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import {
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";

const SearchSpacesSchema = z.object({
  query: z.string().min(1).max(100),
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
  type: z
    .enum(["academic", "social", "recreational", "cultural", "general"])
    .optional(),
  verified: z.coerce.boolean().optional(),
  minMembers: z.coerce.number().min(0).optional(),
  maxMembers: z.coerce.number().min(0).optional(),
  sortBy: z
    .enum(["relevance", "members", "activity", "created"])
    .default("relevance"),
});

export const POST = withAuthValidationAndErrors(
  SearchSpacesSchema,
  async (
    request: AuthenticatedRequest,
    _context,
    searchParams,
    respond,
  ) => {
    try {
      const userId = getUserId(request);
      const { query, limit, offset, type, verified, minMembers, maxMembers, sortBy } =
        searchParams;

      let spacesQuery = dbAdmin
        .collection("spaces")
        .where("campusId", "==", CURRENT_CAMPUS_ID);

      if (type) {
        spacesQuery = spacesQuery.where("type", "==", type);
      }

      if (verified !== undefined) {
        spacesQuery = spacesQuery.where("isVerified", "==", verified);
      }

      const spacesSnapshot = await spacesQuery.get();
      const spaces: Array<{
        id: string;
        name: string;
        description: string;
        type: string;
        tags: string[];
        memberCount: number;
        isVerified: boolean;
        isPrivate: boolean;
        createdAt: string;
        creator: { id: string; name: string; avatar: string | null } | null;
        isMember: boolean;
        relevanceScore: number;
        highlights: {
          name: string[];
          description: string[];
          tags: string[];
        };
      }> = [];

      const queryLower = query.toLowerCase();

      for (const doc of spacesSnapshot.docs) {
        const spaceData = doc.data();

        const name = String(spaceData.name || "").toLowerCase();
        const description = String(spaceData.description || "").toLowerCase();
        const tags = (spaceData.tags || []).map((tag: string) =>
          String(tag).toLowerCase(),
        );

        const nameMatch = name.includes(queryLower);
        const descriptionMatch = description.includes(queryLower);
        const tagMatch = tags.some((tag) => tag.includes(queryLower));

        if (!nameMatch && !descriptionMatch && !tagMatch) {
          continue;
        }

        const memberCount = spaceData.memberCount || 0;
        if (minMembers !== undefined && memberCount < minMembers) continue;
        if (maxMembers !== undefined && memberCount > maxMembers) continue;

        let relevanceScore = 0;
        if (nameMatch) relevanceScore += name === queryLower ? 100 : 80;
        if (descriptionMatch) relevanceScore += 60;
        if (tagMatch) relevanceScore += 40;
        if (spaceData.isVerified) relevanceScore += 20;
        relevanceScore += Math.min(20, memberCount / 10);

        let creator: { id: string; name: string; avatar: string | null } | null =
          null;
        if (spaceData.creatorId) {
          try {
            const creatorDoc = await dbAdmin
              .collection("users")
              .doc(spaceData.creatorId)
              .get();
            if (creatorDoc.exists) {
              const creatorData = creatorDoc.data();
              creator = {
                id: creatorDoc.id,
                name:
                  creatorData?.fullName ||
                  creatorData?.displayName ||
                  "Unknown",
                avatar: creatorData?.photoURL || null,
              };
            }
          } catch (error) {
            logger.warn(
              "Failed to fetch creator info at /api/spaces/search",
              error instanceof Error ? error : new Error(String(error)),
            );
          }
        }

        let isMember = false;
        try {
          const memberDoc = await dbAdmin
            .collection("spaces")
            .doc(doc.id)
            .collection("members")
            .doc(userId)
            .get();
          isMember = memberDoc.exists;
        } catch (error) {
          logger.warn(
            "Failed to check membership at /api/spaces/search",
            error instanceof Error ? error : new Error(String(error)),
          );
        }

        spaces.push({
          id: doc.id,
          name: spaceData.name,
          description: spaceData.description,
          type: spaceData.type,
          tags: spaceData.tags || [],
          memberCount,
          isVerified: Boolean(spaceData.isVerified),
          isPrivate: Boolean(spaceData.isPrivate),
          createdAt:
            spaceData.createdAt?.toDate?.()?.toISOString() ??
            new Date().toISOString(),
          creator,
          isMember,
          relevanceScore,
          highlights: {
            name: nameMatch ? [spaceData.name] : [],
            description: descriptionMatch
              ? [
                  description.substring(
                    Math.max(0, description.indexOf(queryLower) - 30),
                    Math.min(
                      description.length,
                      description.indexOf(queryLower) +
                        queryLower.length +
                        30,
                    ),
                  ),
                ]
              : [],
            tags: tagMatch
              ? tags.filter((tag) => tag.includes(queryLower))
              : [],
          },
        });
      }

      spaces.sort((a, b) => {
        switch (sortBy) {
          case "members":
            return b.memberCount - a.memberCount;
          case "activity": {
            const aActivity =
              a.memberCount +
              (Date.now() - new Date(a.createdAt).getTime()) /
                (1000 * 60 * 60 * 24);
            const bActivity =
              b.memberCount +
              (Date.now() - new Date(b.createdAt).getTime()) /
                (1000 * 60 * 60 * 24);
            return bActivity - aActivity;
          }
          case "created":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "relevance":
          default:
            return b.relevanceScore - a.relevanceScore;
        }
      });

      const paginatedSpaces = spaces.slice(offset, offset + limit);

      return respond.success({
        spaces: paginatedSpaces,
        total: spaces.length,
        hasMore: spaces.length > offset + limit,
        pagination: {
          limit,
          offset,
          nextOffset: spaces.length > offset + limit ? offset + limit : null,
        },
        query: {
          ...searchParams,
          executedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      logger.error(
        "Error searching spaces at /api/spaces/search",
        error instanceof Error ? error : new Error(String(error)),
      );
      return respond.error("Failed to search spaces", "INTERNAL_ERROR", {
        status: 500,
      });
    }
  },
);
