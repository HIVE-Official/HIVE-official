import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebase/admin/firebase-admin";
import { logger } from "@hive/core";

/**
 * Get spaces that are available for claiming (no current leader/moderator)
 * For faculty/student leader space claiming
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const spaceType = url.searchParams.get("type"); // Filter by space type if provided
    
    // Get user's school from development mode or auth
    // In dev mode, use UB - but let's be flexible about school filtering
    const schoolId = "ub"; // In production, get from authenticated user

    const availableSpaces: any[] = [];

    // Define space types to search through (using the actual Firestore structure)
    const spaceTypes = spaceType ? [spaceType] : ["major", "residential", "interest", "creative", "organization"];

    // Search through each space type's nested collection
    for (const type of spaceTypes) {
      const spacesRef = dbAdmin
        .collection("spaces")
        .doc(type)
        .collection("spaces");

      // First, let's try to get ALL spaces to see what's available (remove school filter temporarily)
      const query = spacesRef.limit(50); // Get any spaces to debug

      const snapshot = await query.get();

      logger.info(`Found ${snapshot.size} spaces in ${type} collection`);

      // Debug: Log first few spaces to see their structure
      snapshot.docs.slice(0, 3).forEach(doc => {
        logger.info(`Sample space in ${type}:`, {
          id: doc.id,
          data: doc.data()
        });
      });

      for (const doc of snapshot.docs) {
        const spaceData = doc.data();
        
        // For now, skip school filtering to see what spaces exist
        // Later we can add: && (spaceData.schoolId === schoolId || !spaceData.schoolId)
        
        // Check if space has no current moderators/leaders
        const moderatorsRef = spacesRef
          .doc(doc.id)
          .collection("moderators");
        
        const moderatorsSnapshot = await moderatorsRef.get();
        
        // If no moderators, this space is available for claiming
        if (moderatorsSnapshot.empty) {
          availableSpaces.push({
            id: doc.id,
            type: type,
            name: spaceData.name || `Unnamed ${type} space`,
            description: spaceData.description || "No description available",
            memberCount: spaceData.memberCount || 0,
            tags: spaceData.tags || [],
            createdAt: spaceData.createdAt,
            schoolId: spaceData.schoolId, // Include for debugging
          });
        } else {
          logger.info(`Space ${doc.id} has ${moderatorsSnapshot.size} moderators, skipping`);
        }
      }
    }

    // Sort by member count (most popular first) and name
    availableSpaces.sort((a, b) => {
      if (b.memberCount !== a.memberCount) {
        return b.memberCount - a.memberCount;
      }
      return a.name.localeCompare(b.name);
    });

    logger.info("Fetched available spaces for claiming", {
      count: availableSpaces.length,
      schoolId,
      spaceType
    });

    return NextResponse.json({
      success: true,
      spaces: availableSpaces,
      total: availableSpaces.length
    });

  } catch (error) {
    logger.error("Failed to fetch available spaces for claiming", {
      error: error instanceof Error ? error.message : String(error)
    });

    return NextResponse.json(
      { error: "Failed to fetch available spaces", success: false },
      { status: 500 }
    );
  }
}