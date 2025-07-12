import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@hive/core";

/**
 * Admin endpoint to add schoolId: "ub" to all existing spaces
 * DEVELOPMENT ONLY - Remove in production
 */
export async function POST(request: NextRequest) {
  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: "This endpoint is only available in development mode" },
      { status: 403 }
    );
  }

  try {
    const spaceTypes = ["major", "residential", "interest", "creative", "organization"];
    let totalUpdated = 0;
    const results: any[] = [];

    logger.info('🔧 Starting to update spaces with schoolId: "ub"...');

    for (const type of spaceTypes) {
      logger.info(`📁 Processing ${type} spaces...`);
      
      try {
        const spacesRef = dbAdmin.collection("spaces").doc(type).collection("spaces");
        const snapshot = await spacesRef.get();
        
        logger.info(`Found ${snapshot.size} spaces in ${type} collection`);
        
        if (snapshot.empty) {
          results.push({
            type,
            found: 0,
            updated: 0,
            message: `No spaces found in ${type} collection`
          });
          continue;
        }

        let updatedInType = 0;
        const spaceNames: string[] = [];

        for (const doc of snapshot.docs) {
          const spaceData = doc.data();
          
          // Check if schoolId already exists
          if (!spaceData.schoolId) {
            try {
              // Update the space with schoolId
              await doc.ref.update({ 
                schoolId: "ub",
                updatedAt: new Date()
              });
              
              updatedInType++;
              spaceNames.push(spaceData.name || doc.id);
              logger.info(`✅ Updated: ${spaceData.name || doc.id}`);
              
            } catch (updateError) {
              logger.error(`❌ Failed to update ${doc.id}:`, updateError);
            }
          } else {
            logger.info(`⏭️ Space already has schoolId: ${spaceData.name || doc.id} (${spaceData.schoolId})`);
          }
        }

        results.push({
          type,
          found: snapshot.size,
          updated: updatedInType,
          sampleSpaces: spaceNames.slice(0, 5), // Show first 5 updated spaces
          message: `Successfully updated ${updatedInType} spaces`
        });

        totalUpdated += updatedInType;
        
      } catch (error) {
        logger.error(`❌ Error processing ${type} spaces:`, error);
        results.push({
          type,
          found: 0,
          updated: 0,
          error: error instanceof Error ? error.message : String(error),
          message: `Error processing ${type} spaces`
        });
      }
    }

    // Verify the updates
    logger.info('🔍 Verifying updates...');
    const verification: any[] = [];
    
    for (const type of spaceTypes) {
      try {
        const spacesRef = dbAdmin.collection("spaces").doc(type).collection("spaces");
        const snapshot = await spacesRef.where("schoolId", "==", "ub").get();
        
        verification.push({
          type,
          spacesWithUB: snapshot.size
        });
        
      } catch (error) {
        verification.push({
          type,
          spacesWithUB: 0,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    logger.info(`🎊 Migration complete! Updated ${totalUpdated} spaces total.`);

    return NextResponse.json({
      success: true,
      totalUpdated,
      results,
      verification,
      message: `Migration complete! Updated ${totalUpdated} spaces with schoolId: "ub"`
    });

  } catch (error) {
    logger.error("Failed to update spaces with school ID", {
      error: error instanceof Error ? error.message : String(error)
    });

    return NextResponse.json(
      { error: "Failed to update spaces", success: false },
      { status: 500 }
    );
  }
}