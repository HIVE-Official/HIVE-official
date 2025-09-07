import { NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/logger";

/**
 * Status endpoint to check Firebase connectivity and space data
 */
export async function GET() {
  try {
    const status = {
      firebase: {
        connected: false,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        hasAdminCreds: false,
      },
      spaces: {
        flatCollection: { exists: false, count: 0 },
        nestedStructure: { exists: false, types: [] as string[] },
      },
      timestamp: new Date().toISOString(),
    };
    
    // Check if admin credentials are configured
    status.firebase.hasAdminCreds = !!(
      (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) ||
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    );
    
    if (!status.firebase.hasAdminCreds) {
      return NextResponse.json({
        ...status,
        message: 'Firebase admin credentials not configured. See /api/spaces/search-mock for testing.',
      });
    }
    
    // Test Firebase connection
    try {
      // Check flat collection
      const flatSpaces = await dbAdmin.collection('spaces_flat').limit(5).get();
      status.spaces.flatCollection.exists = !flatSpaces.empty;
      status.spaces.flatCollection.count = flatSpaces.size;
      status.firebase.connected = true;
      
      // Check nested structure
      const spaceTypes = ['student_organizations', 'fraternity_and_sorority', 'campus_living', 'hive_exclusive'];
      for (const type of spaceTypes) {
        const typeDoc = await dbAdmin.collection('spaces').doc(type).get();
        if (typeDoc.exists) {
          status.spaces.nestedStructure.types.push(type);
        }
      }
      status.spaces.nestedStructure.exists = status.spaces.nestedStructure.types.length > 0;
      
    } catch (error) {
      logger.error('Firebase connection test failed', { error, endpoint: '/api/spaces/status' });
      return NextResponse.json({
        ...status,
        error: 'Firebase connection failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      }, { status: 500 });
    }
    
    // Determine which mode we're in
    const mode = status.spaces.flatCollection.exists ? 'production' : 
                 status.spaces.nestedStructure.exists ? 'legacy' : 
                 'not-configured';
    
    return NextResponse.json({
      ...status,
      mode,
      message: mode === 'production' ? 
        'Firebase connected. Using flat collection for search.' :
        mode === 'legacy' ?
        'Firebase connected. Using nested structure (consider running seed script).' :
        'No spaces found. Run: pnpm tsx scripts/seed-spaces.ts',
    });
    
  } catch (error) {
    logger.error('Status check error', { error, endpoint: '/api/spaces/status' });
    
    return NextResponse.json({
      success: false,
      error: 'Status check failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}