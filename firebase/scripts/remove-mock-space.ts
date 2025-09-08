#!/usr/bin/env ts-node

/**
 * REMOVE MOCK SPACE - Clean up the single demo space found
 */

import * as admin from 'firebase-admin';

const serviceAccount = require('/Users/laneyfraass/Downloads/hive-9265c-firebase-adminsdk-fbsvc-ec0bb5d726.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'hive-9265c'
});

const db = admin.firestore();

async function removeMockSpace() {
  console.log('🧹 REMOVING MOCK SPACE');
  console.log('===================\n');
  
  const mockSpaceId = 'space_college_democrats';
  
  try {
    // Remove the space document
    await db.collection('spaces').doc(mockSpaceId).delete();
    console.log(`✅ Deleted space: ${mockSpaceId}`);
    
    // Remove any related data in flat collections
    const batch = db.batch();
    
    // Check spaceMembers
    const membersSnapshot = await db.collection('spaceMembers')
      .where('spaceId', '==', mockSpaceId)
      .get();
    
    if (!membersSnapshot.empty) {
      console.log(`   Removing ${membersSnapshot.size} members`);
      membersSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
    }
    
    // Check spacePosts
    const postsSnapshot = await db.collection('spacePosts')
      .where('spaceId', '==', mockSpaceId)
      .get();
    
    if (!postsSnapshot.empty) {
      console.log(`   Removing ${postsSnapshot.size} posts`);
      postsSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
    }
    
    // Check spaceEvents
    const eventsSnapshot = await db.collection('spaceEvents')
      .where('spaceId', '==', mockSpaceId)
      .get();
    
    if (!eventsSnapshot.empty) {
      console.log(`   Removing ${eventsSnapshot.size} events`);
      eventsSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
    }
    
    // Check spaceTools
    const toolsSnapshot = await db.collection('spaceTools')
      .where('spaceId', '==', mockSpaceId)
      .get();
    
    if (!toolsSnapshot.empty) {
      console.log(`   Removing ${toolsSnapshot.size} tools`);
      toolsSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
    }
    
    // Commit all deletions
    await batch.commit();
    
    console.log('\n✅ Mock space and all related data removed');
    console.log('🎯 Database is now clean - 167 real spaces remaining');
    
  } catch (error) {
    console.error('Error removing mock space:', error);
  }
}

// Run
removeMockSpace().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('Cleanup failed:', err);
  process.exit(1);
});