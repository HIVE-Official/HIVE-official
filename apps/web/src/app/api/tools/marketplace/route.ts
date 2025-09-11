import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getAuthTokenFromRequest } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";

const SearchToolsSchema = z.object({
  query: z.string().optional(),
  category: z.enum(['productivity', 'academic', 'social', 'organization', 'entertainment', 'utility', 'analytics', 'communication']).optional(),
  type: z.enum(['form', 'poll', 'scheduler', 'resource', 'automation', 'dashboard', 'game', 'calculator', 'tracker', 'custom']).optional(),
  sortBy: z.enum(['popular', 'recent', 'rating', 'trending']).default('popular'),
  featured: z.coerce.boolean().optional(),
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0)
});

const db = dbAdmin;

// GET /api/tools/marketplace - Browse marketplace tools
export async function GET(request: NextRequest) {
  try {
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    const { searchParams } = new URL(request.url);
    const params = SearchToolsSchema.parse(Object.fromEntries(searchParams.entries()));

    // Build query
    let query = db.collection("tools")
      .where("status", "==", "published")
      .where("visibility", "in", ["public", "campus"]);

    // Apply filters
    if ((await params).category) {
      query = query.where("category", "==", (await params).category);
    }

    if ((await params).type) {
      query = query.where("type", "==", (await params).type);
    }

    if ((await params).featured) {
      query = query.where("featured", "==", true);
    }

    // Apply sorting
    switch ((await params).sortBy) {
      case 'popular':
        query = query.orderBy("analytics.deployments", "desc");
        break;
      case 'recent':
        query = query.orderBy("publishedAt", "desc");
        break;
      case 'rating':
        query = query.orderBy("analytics.rating", "desc");
        break;
      case 'trending':
        query = query.orderBy("analytics.usage.weekly", "desc");
        break;
    }

    // Apply pagination
    query = query.limit((await params).limit).offset((await params).offset);

    const snapshot = await query.get();
    const tools = [];

    for (const doc of snapshot.docs) {
      const toolData = doc.data();
      
      // Apply text search if query provided
      if ((await params).query) {
        const searchLower = (await params).query.toLowerCase();
        const matchesSearch = 
          toolData.name.toLowerCase().includes(searchLower) ||
          toolData.description.toLowerCase().includes(searchLower) ||
          (toolData.metadata?.tags || []).some((tag: string) => 
            tag.toLowerCase().includes(searchLower)
          );
        
        if (!matchesSearch) continue;
      }

      // Get author info
      const authorDoc = await db.collection("users").doc(toolData.authorId).get();
      const author = authorDoc.exists ? authorDoc.data() : null;

      // Check if user has installed this tool
      const userInstallDoc = await db
        .collection("users")
        .doc(decodedToken.uid)
        .collection("installedTools")
        .doc(doc.id)
        .get();

      // Get recent reviews
      const reviewsSnapshot = await db
        .collection("tools")
        .doc(doc.id)
        .collection("reviews")
        .orderBy("createdAt", "desc")
        .limit(3)
        .get();

      const reviews = reviewsSnapshot.docs.map(reviewDoc => ({
        id: reviewDoc.id,
        ...reviewDoc.data()
      }));

      tools.push({
        id: doc.id,
        ...toolData,
        author: author ? {
          id: toolData.authorId,
          name: author.fullName || author.displayName,
          handle: author.handle,
          avatar: author.photoURL,
          verified: author.verified || false
        } : null,
        isInstalled: userInstallDoc.exists,
        recentReviews: reviews,
        publishedAt: toolData.publishedAt?.toDate ? toolData.publishedAt?.toDate ? publishedAt.toDate() : new Date(publishedAt) : toolData.publishedAt
      });
    }

    // Get categories for filters
    const categoriesSnapshot = await db
      .collection("toolCategories")
      .orderBy("order")
      .get();

    const categories = categoriesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      tools,
      categories,
      pagination: {
        limit: (await params).limit,
        offset: (await params).offset,
        hasMore: snapshot.size === (await params).limit,
        total: tools.length
      }
    });

  } catch (error) {
    logger.error('Error fetching marketplace tools', { error });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to fetch marketplace tools", "INTERNAL_ERROR"), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}