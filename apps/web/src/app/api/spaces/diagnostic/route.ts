import { NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';

/**
 * Diagnostic endpoint to test Firebase connectivity
 */
export async function GET() {
  try {
    console.log('🔍 Diagnostic: Testing Firebase connectivity...');
    
    // Check current Firebase project configuration
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    console.log(`📊 Current Firebase project: ${projectId}`);
    
    // Test basic Firebase admin connectivity
    const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations'];
    const results: any = {};
    
    // First, let's see what collections exist at the top level
    const topLevelCollections = await dbAdmin.listCollections();
    const topLevelCollectionNames = topLevelCollections.map(col => col.id);
    console.log(`📋 Top-level collections found: ${topLevelCollectionNames.join(', ')}`);
    
    // Check if spaces collection exists
    const spacesCollection = await dbAdmin.collection('spaces').get();
    console.log(`📊 spaces collection exists: ${!spacesCollection.empty}, size: ${spacesCollection.size}`);
    
    for (const spaceType of spaceTypes) {
      try {
        console.log(`📊 Testing space type: ${spaceType}`);
        
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
        console.error(`❌ Error testing ${spaceType}:`, error);
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
    console.error('❌ Diagnostic error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Diagnostic failed',
      message: `${error}`,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}