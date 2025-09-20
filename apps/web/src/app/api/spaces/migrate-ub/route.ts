import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { logger } from "@/lib/logger";
import { ApiResponseHelper as _ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

/**
 * Migrate existing spaces to include UB identification
 * POST /api/spaces/migrate-ub
 */

export async function POST(request: NextRequest) {
  try {
    const { dryRun = false } = await request.json().catch(() => ({}));
    
    logger.info('🏫 Starting UB identification migration for existing spaces...', { endpoint: '/api/spaces/migrate-ub' });
    
    const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations', 'cohort'];
    let totalUpdated = 0;
    const migrationResults: Record<string, any> = {};
    
    for (const spaceType of spaceTypes) {
      try {
        // Get all spaces in this type
        const allSpacesSnapshot = await dbAdmin
          .collection('spaces')
          .doc(spaceType)
          .collection('spaces')
          .get();
          
        const spacesWithoutUB = allSpacesSnapshot.docs.filter(doc => {
          const data = doc.data();
          return !data.schoolId || !data.university;
        });
        
        if (spacesWithoutUB.length === 0) {
          migrationResults[spaceType] = { updated: 0, message: 'All spaces already have UB identification' };
          continue;
        }
        
        logger.info('📊 Foundspaces in without UB identification', { spacesWithoutUB, spaceType, endpoint: '/api/spaces/migrate-ub' });
        
        if (dryRun) {
          migrationResults[spaceType] = {
            toUpdate: spacesWithoutUB.length,
            sampleSpaces: spacesWithoutUB.slice(0, 3).map(doc => ({
              id: doc.id,
              name: doc.data().name,
              currentSchoolId: doc.data().schoolId || 'missing'
            }))
          };
          continue;
        }
        
        // Update in batches
        const batch = dbAdmin.batch();
        const updatedIds: string[] = [];
        
        spacesWithoutUB.forEach(doc => {
          const spaceRef = doc.ref;
          
          batch.update(spaceRef, {
            schoolId: 'university-at-buffalo',
            university: 'University at Buffalo',
            universityShort: 'UB',
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            // Migration metadata
            migrationDate: admin.firestore.FieldValue.serverTimestamp(),
            migrationVersion: '2.0-ub'
          });
          
          updatedIds.push(doc.id);
        });
        
        await batch.commit();
        totalUpdated += spacesWithoutUB.length;
        migrationResults[spaceType] = {
          updated: spacesWithoutUB.length,
          updatedIds: updatedIds.slice(0, 3), // Show first 3 as sample
          message: `Updated ${spacesWithoutUB.length} spaces with UB identification`
        };
        
        logger.info('✅ Updatedspaces in with UB identification', { spacesWithoutUB, spaceType, endpoint: '/api/spaces/migrate-ub' });
      } catch (error) {
        logger.error('❌ Error migrating', { spaceType, error: error, endpoint: '/api/spaces/migrate-ub' });
        migrationResults[spaceType] = {
          error: `Failed to migrate: ${error}`,
          updated: 0
        };
      }
    }
    
    if (dryRun) {
      const totalToUpdate = Object.values(migrationResults).reduce((sum, result: any) => 
        sum + (result.toUpdate || 0), 0
      );
      
      return NextResponse.json({
        success: true,
        dryRun: true,
        analysis: {
          totalToUpdate,
          results: migrationResults
        },
        message: `Would update ${totalToUpdate} existing spaces with UB identification`
      });
    }
    
    return NextResponse.json({
      success: true,
      message: `Successfully migrated ${totalUpdated} existing spaces to UB identification`,
      totalUpdated,
      results: migrationResults
    });
    
  } catch (error) {
    logger.error('❌ Migration error', { error: error, endpoint: '/api/spaces/migrate-ub' });
    return NextResponse.json(
      { 
        success: false,
        error: 'Migration failed',
        message: `${error}` 
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    info: 'UB Identification Migration API',
    description: 'Updates existing spaces to include University at Buffalo identification',
    usage: {
      dryRun: 'POST with { dryRun: true } to preview changes',
      migrate: 'POST with { dryRun: false } to execute migration'
    },
    fields: {
      schoolId: 'university-at-buffalo',
      university: 'University at Buffalo', 
      universityShort: 'UB'
    }
  });
}