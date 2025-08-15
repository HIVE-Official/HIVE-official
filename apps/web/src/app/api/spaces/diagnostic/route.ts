import { NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/logger";
import { ApiResponseHelper as _ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

/**
 * Diagnostic endpoint to test Firebase connectivity
 */
export async function GET() {
  try {
    logger.info('🔍 Diagnostic: Testing Firebase connectivity...', { endpoint: '/api/spaces/diagnostic' });
    
    // Check current Firebase project configuration
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    logger.info('Current Firebase project', { projectId, endpoint: '/api/spaces/diagnostic' });
    
    // Test basic Firebase admin connectivity
    const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations', 'cohort'];
    const results: any = {};
    
    // First, let's see what collections exist at the top level
    const topLevelCollections = await dbAdmin.listCollections();
    const topLevelCollectionNames = topLevelCollections.map(col => col.id);
    logger.info('Top-level collections found', { data: topLevelCollectionNames.join(', '), endpoint: '/api/spaces/diagnostic' });
    
    // Check if spaces collection exists
    const spacesCollection = await dbAdmin.collection('spaces').get();
    logger.info('Spaces collection check', { exists: !spacesCollection.empty, size: spacesCollection.size, endpoint: '/api/spaces/diagnostic' });
    
    for (const spaceType of spaceTypes) {
      try {
        logger.info('Testing space type', { spaceType, endpoint: '/api/spaces/diagnostic' });
        
        // Test if the space type collection exists
        const spaceTypeDoc = await dbAdmin.collection('spaces').doc(spaceType).get();
        
        if (!spaceTypeDoc.exists) {
          results[spaceType] = { status: 'missing', message: 'Space type collection does not exist' };
          continue;
        }
        
        // Test if the spaces subcollection exists and has data
        const spacesSnapshot = await dbAdmin
          .collection('spaces')
          .doc(spaceType)
          .collection('spaces')
          .limit(3)
          .get();
          
        results[spaceType] = {
          status: 'success',
          spaceCount: spacesSnapshot.size,
          sampleSpaces: spacesSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name || 'No name',
            status: doc.data().status || 'No status'
          }))
        };
        
      } catch (error) {
        logger.error('Error testing space type', { spaceType, error: error instanceof Error ? error.message : String(error), endpoint: '/api/spaces/diagnostic' });
        results[spaceType] = { 
          status: 'error', 
          message: `Error: ${error}` 
        };
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Firebase diagnostic complete',
      projectId: projectId,
      firebaseStructure: 'spaces/[spacetype]/spaces/spaceID',
      topLevelCollections: topLevelCollectionNames,
      spaceTypes: spaceTypes,
      results: results,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    logger.error('Diagnostic error', { error: error instanceof Error ? error.message : String(error), endpoint: '/api/spaces/diagnostic' });
    
    return NextResponse.json({
      success: false,
      error: 'Diagnostic failed',
      message: `${error}`,
      timestamp: new Date().toISOString()
    }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}