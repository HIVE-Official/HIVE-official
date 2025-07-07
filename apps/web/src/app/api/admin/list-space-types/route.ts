import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@hive/core";

/**
 * Simple endpoint to list what space type documents exist
 * Structure: spaces/[typeofspace]/spaces/spaceID
 */
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: "Development only" }, { status: 403 });
  }

  try {
    // Get all documents in the root "spaces" collection
    // These should be the space type categories
    const spacesRef = dbAdmin.collection("spaces");
    const snapshot = await spacesRef.get();
    
    logger.info(`Found ${snapshot.size} space type documents`);
    
    const spaceTypes: any[] = [];
    
    for (const doc of snapshot.docs) {
      const spaceTypeId = doc.id;
      logger.info(`Checking space type: ${spaceTypeId}`);
      
      // Check how many spaces are in the subcollection
      const spacesSubRef = doc.ref.collection("spaces");
      const spacesSubSnapshot = await spacesSubRef.limit(5).get();
      
      // Get sample space data
      const sampleSpaces = spacesSubSnapshot.docs.map(spaceDoc => ({
        id: spaceDoc.id,
        name: spaceDoc.data().name,
        schoolId: spaceDoc.data().schoolId,
        status: spaceDoc.data().status,
        memberCount: spaceDoc.data().memberCount
      }));
      
      spaceTypes.push({
        type: spaceTypeId,
        count: spacesSubSnapshot.size,
        sampleSpaces: sampleSpaces
      });
      
      logger.info(`  ${spaceTypeId}: ${spacesSubSnapshot.size} spaces`);
    }
    
    return NextResponse.json({
      success: true,
      totalSpaceTypes: snapshot.size,
      spaceTypes: spaceTypes,
      message: `Found ${snapshot.size} space type categories`
    });
    
  } catch (error) {
    logger.error("Failed to list space types", error);
    return NextResponse.json(
      { error: "Failed to list space types", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}