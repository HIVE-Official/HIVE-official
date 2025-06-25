import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { dbAdmin } from "@/lib/firebase-admin";
import { type Space } from "@hive/core/src/domain/firestore/space";
import { logger } from "@hive/core";

const browseSpacesSchema = z.object({
  schoolId: z.string().optional(),
  type: z
    .enum(["major", "residential", "interest", "creative", "organization"])
    .optional(),
  subType: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
  search: z.string().optional(),
});

/**
 * Browse available spaces at a user's school
 * Returns paginated list of spaces with membership status
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { schoolId, type, subType, limit, offset, search } =
      browseSpacesSchema.parse(queryParams);

    // Verify the requesting user is authenticated
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const auth = getAuth();

    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get user's school if not provided
    let userSchoolId = schoolId;
    if (!userSchoolId) {
      const userDoc = await dbAdmin.collection("users").doc(userId).get();
      if (!userDoc.exists) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      userSchoolId = userDoc.data()?.schoolId;
      if (!userSchoolId) {
        return NextResponse.json(
          { error: "User school not set" },
          { status: 400 }
        );
      }
    }

    // Build the query
    let query = dbAdmin
      .collection("spaces")
      .where("schoolId", "==", userSchoolId)
      .where("status", "==", "activated");

    // Add type filter if specified
    if (type) {
      query = query.where("type", "==", type);
    }

    // Add subType filter if specified (using tags array)
    if (subType) {
      query = query.where("tags", "array-contains", {
        type: type || "interest",
        sub_type: subType,
      });
    }

    // Execute the query
    const spacesSnapshot = await query.get();

    // Convert to array and apply text search if needed
    let spaces = spacesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Space[];

    // Apply text search filter (case-insensitive)
    if (search) {
      const searchLower = search.toLowerCase();
      spaces = spaces.filter(
        (space) =>
          space.name.toLowerCase().includes(searchLower) ||
          (space.description &&
            space.description.toLowerCase().includes(searchLower))
      );
    }

    // Sort by member count (popular first) then by name
    spaces.sort((a, b) => {
      const memberCountA = a.memberCount || 0;
      const memberCountB = b.memberCount || 0;

      if (memberCountA !== memberCountB) {
        return memberCountB - memberCountA; // Higher member count first
      }

      return a.name.localeCompare(b.name); // Alphabetical for ties
    });

    // Apply pagination
    const totalCount = spaces.length;
    const paginatedSpaces = spaces.slice(offset, offset + limit);

    // Get user's current memberships to mark joined spaces
    const userMembershipsSnapshot = await dbAdmin
      .collectionGroup("members")
      .where("userId", "==", userId)
      .get();

    const userSpaceIds = new Set(
      userMembershipsSnapshot.docs
        .map((doc) => doc.ref.parent.parent?.id)
        .filter(Boolean)
    );

    // Add membership status to each space
    const spacesWithMembership = paginatedSpaces.map((space) => ({
      id: space.id,
      name: space.name,
      description: space.description,
      type: space.type,
      tags: space.tags,
      status: space.status,
      memberCount: space.memberCount || 0,
      createdAt: space.createdAt,
      updatedAt: space.updatedAt,
      isMember: userSpaceIds.has(space.id),
    }));

    // Group spaces by type for better organization
    const spacesByType = spacesWithMembership.reduce(
      (acc, space) => {
        const spaceType = space.type;
        if (!acc[spaceType]) {
          acc[spaceType] = [];
        }
        acc[spaceType].push(space);
        return acc;
      },
      {} as Record<string, typeof spacesWithMembership>
    );

    return NextResponse.json({
      success: true,
      spaces: spacesWithMembership,
      spacesByType: spacesByType,
      pagination: {
        limit,
        offset,
        totalCount,
        hasMore: offset + limit < totalCount,
        nextOffset: offset + limit < totalCount ? offset + limit : null,
      },
      filters: {
        schoolId: userSchoolId,
        type: type || null,
        subType: subType || null,
        search: search || null,
      },
      typeCounts: Object.keys(spacesByType).reduce(
        (acc, type) => {
          acc[type] = spacesByType[type].length;
          return acc;
        },
        {} as Record<string, number>
      ),
    });
  } catch (error: unknown) {
    logger.error("Browse spaces error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.errors },
        { status: 400 }
      );
    }

    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: string }).code === "auth/id-token-expired"
    ) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
