#!/usr/bin/env ts-node

/**
 * VERIFY MIGRATION RESULTS
 */

import * as admin from 'firebase-admin';

// Use service account
const serviceAccount = require('/Users/laneyfraass/Downloads/hive-9265c-firebase-adminsdk-fbsvc-c39fd9a2a6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'hive-9265c'
});

const db = admin.firestore();

async function verifyMigration() {
  console.log('🔍 VERIFYING MIGRATION RESULTS');
  console.log('==============================\n');
  
  try {
    // Check flat spaces
    const spacesSnapshot = await db.collection('spaces').limit(5).get();
    console.log(`📦 Spaces collection: ${spacesSnapshot.size} documents (showing first 5)`);
    spacesSnapshot.forEach(doc => {
      const data = doc.data();
      console.log(`  - ${data.name || doc.id} (category: ${data.category || 'none'})`);
    });
    
    // Check new flat collections
    console.log('\n📊 NEW TOP-LEVEL COLLECTIONS:');
    
    // spaceMembers
    const membersSnapshot = await db.collection('spaceMembers').limit(10).get();
    console.log(`\n👥 spaceMembers: ${membersSnapshot.size} documents`);
    if (membersSnapshot.size > 0) {
      console.log('  Sample keys:');
      membersSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`    - ${doc.id} (${data.spaceName || 'Unknown'} - ${data.role || 'member'})`);
      });
    }
    
    // spacePosts
    const postsSnapshot = await db.collection('spacePosts').limit(10).get();
    console.log(`\n📝 spacePosts: ${postsSnapshot.size} documents`);
    if (postsSnapshot.size > 0) {
      console.log('  Sample posts:');
      postsSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`    - ${data.spaceName || 'Unknown'}: ${(data.content || '').substring(0, 50)}...`);
      });
    }
    
    // spaceEvents
    const eventsSnapshot = await db.collection('spaceEvents').limit(10).get();
    console.log(`\n📅 spaceEvents: ${eventsSnapshot.size} documents`);
    if (eventsSnapshot.size > 0) {
      console.log('  Sample events:');
      eventsSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`    - ${data.spaceName || 'Unknown'}: ${data.title || 'Untitled'}`);
      });
    }
    
    // spaceTools
    const toolsSnapshot = await db.collection('spaceTools').limit(10).get();
    console.log(`\n🛠️ spaceTools: ${toolsSnapshot.size} documents`);
    if (toolsSnapshot.size > 0) {
      console.log('  Sample tools:');
      toolsSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`    - ${data.spaceName || 'Unknown'}: ${data.name || 'Unnamed tool'}`);
      });
    }
    
    // Get total counts
    console.log('\n📈 COLLECTION TOTALS:');
    
    // Count all documents (limited queries for performance)
    const totalSpaces = await db.collection('spaces').count().get();
    const totalMembers = await db.collection('spaceMembers').count().get();
    const totalPosts = await db.collection('spacePosts').count().get();
    const totalEvents = await db.collection('spaceEvents').count().get();
    const totalTools = await db.collection('spaceTools').count().get();
    
    console.log(`  spaces: ${totalSpaces.data().count} documents`);
    console.log(`  spaceMembers: ${totalMembers.data().count} documents`);
    console.log(`  spacePosts: ${totalPosts.data().count} documents`);
    console.log(`  spaceEvents: ${totalEvents.data().count} documents`);
    console.log(`  spaceTools: ${totalTools.data().count} documents`);
    
    console.log('\n✅ MIGRATION VERIFICATION COMPLETE');
    console.log('\n🔗 View in Firebase Console:');
    console.log('https://console.firebase.google.com/project/hive-9265c/firestore/data');
    
  } catch (error) {
    console.error('Error verifying migration:', error);
  }
}

// Run verification
verifyMigration().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});