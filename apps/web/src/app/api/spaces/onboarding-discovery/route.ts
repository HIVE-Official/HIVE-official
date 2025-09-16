import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebase/admin/firebase-admin";
import { logger  } from '@/types/core';
import { generalApiRateLimit } from "@/lib/api/middleware/rate-limit";

interface SpaceTag {
  type: string;
  sub_type: string;
}

interface FirestoreSpace {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  type: "campus_living" | "fraternity_and_sorority" | "hive_exclusive" | "student_organizations" | "university_organizations";
  tags: SpaceTag[];
  status: "dormant" | "activated" | "frozen";
  schoolId: string;
}

// Response type for space discovery - used for return type validation
interface SpaceDiscoveryResponse {
  success: boolean;
  spaces: {
    campus_living: FirestoreSpace[];
    fraternity_and_sorority: FirestoreSpace[];
    hive_exclusive: FirestoreSpace[];
    student_organizations: FirestoreSpace[];
    university_organizations: FirestoreSpace[];
  };
  autoJoinSpaces: string[];
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<SpaceDiscoveryResponse>> {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitResult = await generalApiRateLimit.limit(ip);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get("schoolId") || "ub"; // Default to UB
    const userMajors = searchParams.get("majors")?.split(",") || [];

    // Define space types and their nested collection paths
    const spaceTypes = [
      "campus_living",
      "fraternity_and_sorority",
      "hive_exclusive",
      "student_organizations",
      "university_organizations",
    ] as const;

    let allSpaces: FirestoreSpace[] = [];

    // Query each space type's nested collection
    for (const spaceType of spaceTypes) {
      try {
        const spacesSnapshot = await dbAdmin
          .collection("spaces")
          .doc(spaceType)
          .collection("spaces")
          .where("schoolId", "==", schoolId)
          .where("status", "==", "activated")
          .orderBy("memberCount", "desc")
          .limit(20) // Limit per type to avoid overwhelming results
          .get();

        const spaces = spacesSnapshot.docs.map((doc) => ({
          id: doc.id,
          type: spaceType,
          ...doc.data(),
        })) as FirestoreSpace[];

        allSpaces = allSpaces.concat(spaces);
      } catch (error) {
        logger.warn(`Error fetching ${spaceType} spaces:`, error);
        // Continue with other space types even if one fails
      }
    }

    // Categorize spaces for the frontend
    const categorizedSpaces = {
      campus_living: [] as FirestoreSpace[],
      fraternity_and_sorority: [] as FirestoreSpace[],
      hive_exclusive: [] as FirestoreSpace[],
      student_organizations: [] as FirestoreSpace[],
      university_organizations: [] as FirestoreSpace[],
    };

    const autoJoinSpaces: string[] = [];

    allSpaces.forEach((space) => {
      switch (space.type) {
        case "campus_living": {
          categorizedSpaces.campus_living.push(space);
          break;
        }

        case "fraternity_and_sorority": {
          categorizedSpaces.fraternity_and_sorority.push(space);
          break;
        }

        case "hive_exclusive": {
          categorizedSpaces.hive_exclusive.push(space);
          break;
        }

        case "student_organizations": {
          categorizedSpaces.student_organizations.push(space);
          break;
        }

        case "university_organizations": {
          categorizedSpaces.university_organizations.push(space);

          // Auto-join logic: match user majors with space tags
          if (userMajors.length > 0) {
            const matchesMajor = space.tags?.some((tag) =>
              userMajors.some(
                (major) =>
                  major.toLowerCase().includes(tag.sub_type.toLowerCase()) ||
                  tag.sub_type.toLowerCase().includes(major.toLowerCase())
              )
            );

            if (matchesMajor) {
              autoJoinSpaces.push(space.id);
            }
          }
          break;
        }

        default:
          // Fallback to student organizations
          categorizedSpaces.student_organizations.push(space);
      }
    });

    // Sort each category by member count (most popular first)
    Object.values(categorizedSpaces).forEach((category) => {
      category.sort((a, b) => b.memberCount - a.memberCount);
    });

    logger.info(
      `Space discovery: Found ${allSpaces.length} spaces, ${autoJoinSpaces.length} auto-join matches`
    );

    return NextResponse.json({
      success: true,
      spaces: categorizedSpaces,
      autoJoinSpaces,
    });
  } catch (error) {
    logger.error("Error in space discovery:", { error: String(error) });
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch spaces",
        spaces: {
          academic: [],
          campusLiving: [],
          greekLife: [],
          studentOrganizations: [],
          universityOrganizations: [],
        },
        autoJoinSpaces: [],
      },
      { status: 500 }
    );
  }
}
