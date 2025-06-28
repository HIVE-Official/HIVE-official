import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { logger } from "@hive/core";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Get user data
    const userDoc = await adminDb.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    const { schoolId, onboarding } = userData;

    if (!schoolId) {
      return NextResponse.json(
        { error: "School ID not found" },
        { status: 400 }
      );
    }

    const {
      majors = [],
      interests = [],
      graduationYear,
      academicLevel,
    } = onboarding || {};

    // Get suggested spaces based on user profile
    const spaceTypes = [
      "academic",
      "social",
      "professional",
      "sports",
      "cultural",
      "service",
    ];
    const suggestedSpaces: any[] = [];

    for (const spaceType of spaceTypes) {
      const query = adminDb
        .collection("spaces")
        .doc(spaceType)
        .collection("spaces")
        .where("schoolId", "==", schoolId)
        .where("isActive", "==", true);

      const spacesSnapshot = await query.get();

      spacesSnapshot.docs.forEach((doc) => {
        const spaceData = doc.data();
        let relevanceScore = 0;

        // Base score for school match
        relevanceScore += 10;

        // Boost for major match
        if (majors.length > 0 && spaceData.relatedMajors) {
          const majorMatch = majors.some((major: string) =>
            spaceData.relatedMajors.includes(major)
          );
          if (majorMatch) relevanceScore += 20;
        }

        // Boost for interest match
        if (interests.length > 0 && spaceData.tags) {
          const interestMatch = interests.some((interest: string) =>
            spaceData.tags.includes(interest)
          );
          if (interestMatch) relevanceScore += 15;
        }

        // Boost for graduation year (class-specific spaces)
        if (
          graduationYear &&
          spaceData.targetGraduationYear === graduationYear
        ) {
          relevanceScore += 25;
        }

        // Boost for academic level
        if (academicLevel && spaceData.targetAcademicLevel === academicLevel) {
          relevanceScore += 15;
        }

        // Boost for popular spaces (member count)
        if (spaceData.memberCount > 50) relevanceScore += 5;
        if (spaceData.memberCount > 100) relevanceScore += 5;

        // Only suggest spaces with some relevance
        if (relevanceScore >= 15) {
          suggestedSpaces.push({
            id: doc.id,
            ...spaceData,
            spaceType,
            relevanceScore,
          });
        }
      });
    }

    // Sort by relevance score and limit results
    const sortedSpaces = suggestedSpaces
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 20); // Limit to top 20 suggestions

    // Group by space type for better UX
    const groupedSpaces = sortedSpaces.reduce((acc, space) => {
      if (!acc[space.spaceType]) {
        acc[space.spaceType] = [];
      }
      acc[space.spaceType].push(space);
      return acc;
    }, {} as Record<string, any[]>);

    logger.info(`Suggested spaces fetched for user ${uid}`, {
      schoolId,
      totalSuggestions: sortedSpaces.length,
      spaceTypeBreakdown: Object.entries(groupedSpaces).map(
        ([type, spaces]) => ({
          type,
          count: spaces.length,
        })
      ),
    });

    return NextResponse.json({
      success: true,
      suggestedSpaces: sortedSpaces,
      groupedSpaces,
      userProfile: {
        schoolId,
        majors,
        interests,
        graduationYear,
        academicLevel,
      },
    });
  } catch (error) {
    logger.error("Suggested spaces fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
