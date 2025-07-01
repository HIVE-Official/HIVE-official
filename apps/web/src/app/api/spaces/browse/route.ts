import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger, type Space, type SpaceType } from "@hive/core";

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
 * Now supports nested collection structure: spaces/{spacetype}/spaces/{spaceid}
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
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

    let allSpaces: Space[] = [];

    // Define space types to search through
    const spaceTypes: SpaceType[] = ["major", "residential", "interest", "creative", "organization"];
    const typesToSearch = type ? [type] : spaceTypes;

    // Search through each space type's nested collection
    for (const spaceType of typesToSearch) {
      let query = dbAdmin
        .collection("spaces")
        .doc(spaceType)
        .collection("spaces")
        .where("schoolId", "==", userSchoolId)
        .where("status", "==", "activated");

      // Add subType filter if specified (using tags array)
      if (subType) {
        query = query.where("tags", "array-contains", {
          type: spaceType,
          sub_type: subType,
        });
      }

      // Execute the query for this space type
      const spacesSnapshot = await query.get();

      // Convert to array and add to results
      const spaces = spacesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: spaceType, // Ensure type is set from collection path
      })) as Space[];

      allSpaces = allSpaces.concat(spaces);
    }

    // Apply text search if needed (client-side filtering)
    if (search) {
      const searchLower = search.toLowerCase();
      allSpaces = allSpaces.filter(
        (space) =>
          space.name.toLowerCase().includes(searchLower) ||
          space.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort by member count (most popular first) and name
    allSpaces.sort((a, b) => {
      if (b.memberCount !== a.memberCount) {
        return b.memberCount - a.memberCount;
      }
      return a.name.localeCompare(b.name);
    });

    // Apply pagination
    const paginatedSpaces = allSpaces.slice(offset, offset + limit);

    // Get user's memberships to show join status
    const userMembershipsPromises = paginatedSpaces.map(async (space) => {
      const memberDoc = await dbAdmin
        .collection("spaces")
        .doc(space.type)
        .collection("spaces")
        .doc(space.id)
        .collection("members")
        .doc(userId)
        .get();

      return {
        ...space,
        isMember: memberDoc.exists,
        membershipStatus: memberDoc.exists ? memberDoc.data()?.status : null,
      };
    });

    const spacesWithMembership = await Promise.all(userMembershipsPromises);

    return NextResponse.json({
      spaces: spacesWithMembership,
      pagination: {
        total: allSpaces.length,
        limit,
        offset,
        hasMore: offset + limit < allSpaces.length,
      },
    });
  } catch (error) {
    logger.error("Error browsing spaces:", error);
    return NextResponse.json(
      { error: "Failed to browse spaces" },
      { status: 500 }
    );
  }
}
