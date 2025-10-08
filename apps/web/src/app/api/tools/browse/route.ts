import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { dbAdmin as adminDb } from "@/lib/firebase-admin";
import { getCurrentUser } from "@/lib/auth-server";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import * as admin from 'firebase-admin';

// GET /api/tools/browse - Browse and discover tools
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const featured = searchParams.get("featured") === "true";
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search");

    // For user-specific queries, verify auth
    let currentUser = null;
    if (userId) {
      try {
        currentUser = await getCurrentUser(request);
        if (!currentUser) {
          return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
        }
      } catch (error) {
        return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
      }
    }

    // Build base query
    let query: admin.firestore.Query<admin.firestore.DocumentData> = adminDb.collection("tools");

    // Filter by user if specified
    if (userId && currentUser) {
      // If requesting own tools, show all. If requesting other's tools, show only public
      if (userId === currentUser.id) {
        query = query.where("ownerId", "==", userId);
      } else {
        query = query
          .where("ownerId", "==", userId)
          .where("isPublic", "==", true)
          .where("status", "==", "published");
      }
    } else {
      // Public browsing - only show public published tools
      query = query
        .where("isPublic", "==", true)
        .where("status", "==", "published");
    }

    // Apply additional filters
    if (status && ["draft", "published", "archived"].includes(status)) {
      // Only allow status filtering for user's own tools
      if (userId && currentUser && userId === currentUser.id) {
        query = query.where("status", "==", status);
      }
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

    // Default ordering by creation date (newest first)
    query = query.orderBy("createdAt", "desc");

    // Apply pagination
    if (offset > 0) {
      const offsetQuery = await query.limit(offset).get();
      if (!offsetQuery.empty) {
        const lastDoc = offsetQuery.docs[offsetQuery.docs.length - 1];
        query = query.startAfter(lastDoc);
      }
    }
    
    query = query.limit(limit);

    const snapshot = await query.get();
    
    // Process tools and enrich with user info
    const tools = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const toolData = doc.data();
        
        // Get creator info
        let createdByName = "Anonymous";
        try {
          const userDoc = await adminDb.collection("users").doc(toolData.ownerId).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            createdByName = userData?.displayName || userData?.name || `${userData?.firstName || ''} ${userData?.lastName || ''}`.trim() || "Anonymous";
          }
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error));
          logger.warn('Failed to fetch tool owner information', {
            error: err,
            metadata: {
              ownerId: toolData.ownerId,
              endpoint: '/api/tools/browse'
            },
          });
        }

        // Apply search filter (done post-query for flexibility)
        if (search) {
          const searchLower = search.toLowerCase();
          const matchesSearch = 
            (toolData.name?.toLowerCase() || '').includes(searchLower) ||
            toolData.description.toLowerCase().includes(searchLower) ||
            (toolData.tags || []).some((tag: string) => tag.toLowerCase().includes(searchLower));
          
          if (!matchesSearch) {
            return null;
          }
        }

        return {
          id: doc.id,
          ...toolData,
          createdByName,
          // Ensure stats exist with defaults
          stats: {
            views: 0,
            uses: 0,
            likes: 0,
            installs: 0,
            shares: 0,
            ...toolData.stats
          },
          // Ensure metadata exists with defaults
          metadata: {
            version: "1.0.0",
            difficulty: "beginner",
            featured: false,
            toolType: toolData.type || "visual",
            ...toolData.metadata
          },
          // Ensure arrays exist
          tags: toolData.tags || [],
          collaborators: toolData.collaborators || [],
          // Format dates
          createdAt: toolData.createdAt?.toDate?.()?.toISOString() || toolData.createdAt,
          updatedAt: toolData.updatedAt?.toDate?.()?.toISOString() || toolData.updatedAt,
        };
      })
    );

    // Filter out null results from search filtering
    const filteredTools = tools.filter(tool => tool !== null);

    // Get total count for pagination (approximate for performance)
    let total = filteredTools.length;
    if (offset === 0) {
      try {
        let countQuery: admin.firestore.Query<admin.firestore.DocumentData> = adminDb.collection("tools");
        
        if (userId && currentUser) {
          if (userId === currentUser.id) {
            countQuery = countQuery.where("ownerId", "==", userId);
          } else {
            countQuery = countQuery
              .where("ownerId", "==", userId)
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
        const err = error instanceof Error ? error : new Error(String(error));
        logger.warn('Failed to get total count at /api/tools/browse', {
          error: err,
          metadata: {
            userId,
            hasCurrentUser: Boolean(currentUser),
            category,
            type,
            status,
          },
        });
        // Fallback to current batch size
        total = filteredTools.length;
      }
    }

    return NextResponse.json({
      tools: filteredTools,
      pagination: {
        total,
        limit,
        offset,
        hasMore: filteredTools.length === limit,
        returned: filteredTools.length
      } });
  } catch (error) {
    logger.error(
      `Error browsing tools at /api/tools/browse`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to browse tools", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
