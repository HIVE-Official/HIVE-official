import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@hive/core";

/**
 * Debug endpoint to see what space collections actually exist in Firestore
 * DEVELOPMENT ONLY
 */
export async function GET(request: NextRequest) {
  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: "This endpoint is only available in development mode" },
      { status: 403 }
    );
  }

  try {
    logger.info('🔍 Analyzing Firestore spaces structure...');

    // First, let's see what documents exist in the main "spaces" collection
    const spacesCollection = dbAdmin.collection("spaces");
    
    // Try to get all documents in the spaces collection to see the space types
    try {
      const snapshot = await spacesCollection.get();
      logger.info(`Found ${snapshot.size} documents in spaces collection`);
      
      snapshot.docs.forEach(doc => {
        logger.info(`Space type document: ${doc.id}`, doc.data());
      });
    } catch (err) {
      logger.info('Could not get spaces collection documents, trying listDocuments...');
    }
    
    // Also try listDocuments to see what space type documents exist
    const spaceTypeDocs = await spacesCollection.listDocuments();
    const spaceTypeNames = spaceTypeDocs.map(doc => doc.id);
    logger.info('Found space type documents via listDocuments:', spaceTypeNames);

    const analysis: any[] = [];

    // Now check each space type document for subcollections
    for (const spaceTypeDoc of spaceTypeDocs) {
      const spaceTypeId = spaceTypeDoc.id;
      logger.info(`📁 Analyzing ${spaceTypeId}...`);

      try {
        // Get the subcollection "spaces" under this space type
        const spacesSubcollection = spaceTypeDoc.collection("spaces");
        const spacesSnapshot = await spacesSubcollection.limit(10).get(); // Get first 10 to analyze

        const sampleSpaces = spacesSnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));

        analysis.push({
          spaceType: spaceTypeId,
          count: spacesSnapshot.size,
          hasSubcollection: !spacesSnapshot.empty,
          sampleSpaces: sampleSpaces.slice(0, 3), // Show first 3 spaces
          sampleFields: sampleSpaces.length > 0 ? Object.keys(sampleSpaces[0].data || {}) : []
        });

        logger.info(`   ${spaceTypeId}: ${spacesSnapshot.size} spaces found`);
        if (sampleSpaces.length > 0) {
          logger.info(`   Sample space:`, sampleSpaces[0]);
        }

      } catch (error) {
        logger.error(`Error analyzing ${spaceTypeId}:`, error);
        analysis.push({
          spaceType: spaceTypeId,
          count: 0,
          hasSubcollection: false,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // Also try some common space type names to see if they exist
    const commonSpaceTypes = [
      "academic", "social", "professional", "sports", "cultural", "service",
      "major", "residential", "interest", "creative", "organization",
      "courses", "clubs", "departments", "groups"
    ];

    const existenceCheck: any = {};
    for (const type of commonSpaceTypes) {
      try {
        const snapshot = await dbAdmin.collection("spaces").doc(type).collection("spaces").limit(1).get();
        existenceCheck[type] = {
          exists: !snapshot.empty,
          count: snapshot.size
        };
      } catch (error) {
        existenceCheck[type] = {
          exists: false,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }

    return NextResponse.json({
      success: true,
      message: "Firestore spaces structure analysis",
      spaceTypeDocuments: spaceTypeNames,
      detailedAnalysis: analysis,
      commonTypesCheck: existenceCheck,
      recommendation: "Use the space types that actually exist in your Firestore"
    });

  } catch (error) {
    logger.error("Failed to analyze spaces structure", {
      error: error instanceof Error ? error.message : String(error)
    });

    return NextResponse.json(
      { error: "Failed to analyze spaces", success: false },
      { status: 500 }
    );
  }
}