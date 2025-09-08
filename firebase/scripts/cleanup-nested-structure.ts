#!/usr/bin/env ts-node

/**
 * CLEANUP: Remove old nested structure after migration is verified
 * 
 * WARNING: This script PERMANENTLY DELETES the old nested structure.
 * Only run after thoroughly testing the new flat structure!
 */

import * as admin from "firebase-admin";
import * as readline from 'readline';
import { applicationDefault } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
// Uses Application Default Credentials in production
// or GOOGLE_APPLICATION_CREDENTIALS environment variable
admin.initializeApp({
  credential: applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID || 'hive-9265c'
});

const db = admin.firestore();

// Statistics
let stats = {
  nestedSpacesDeleted: 0,
  nestedMembersDeleted: 0,
  nestedPostsDeleted: 0,
  nestedEventsDeleted: 0,
  errors: [] as string[]
};

// Space categories to clean up
const SPACE_CATEGORIES = [
  'campus_living',
  'academic_programs', 
  'student_organizations',
  'greek_life',
  'university_organizations',
  'interest_based',
  'social'
];

/**
 * Prompt for user confirmation
 */
function promptConfirmation(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y');
    });
  });
}

/**
 * Delete nested space structures
 */
async function deleteNestedSpaces() {
  console.log('\n🗑️  DELETING NESTED SPACE STRUCTURES...\n');
  
  for (const category of SPACE_CATEGORIES) {
    console.log(`\n🔍 Processing category: ${category}`);
    
    try {
      // Get all spaces in this nested category
      const nestedSpaces = await db
        .collection('spaces')
        .doc(category)
        .collection('spaces')
        .get();
      
      if (nestedSpaces.empty) {
        console.log(`  ⚠️  No nested spaces found in ${category}`);
        continue;
      }
      
      console.log(`  📊 Found ${nestedSpaces.size} nested spaces to delete`);
      
      const batch = db.batch();
      let batchCount = 0;
      
      for (const spaceDoc of nestedSpaces.docs) {
        const spaceId = spaceDoc.id;
        
        // Delete nested members subcollection
        const membersSnapshot = await spaceDoc.ref.collection('members').get();
        for (const memberDoc of membersSnapshot.docs) {
          batch.delete(memberDoc.ref);
          stats.nestedMembersDeleted++;
          batchCount++;
          
          if (batchCount >= 100) {
            await batch.commit();
            console.log(`  ✓ Deleted batch of ${batchCount} documents`);
            batchCount = 0;
          }
        }
        
        // Delete nested posts subcollection
        const postsSnapshot = await spaceDoc.ref.collection('posts').get();
        for (const postDoc of postsSnapshot.docs) {
          batch.delete(postDoc.ref);
          stats.nestedPostsDeleted++;
          batchCount++;
          
          if (batchCount >= 100) {
            await batch.commit();
            console.log(`  ✓ Deleted batch of ${batchCount} documents`);
            batchCount = 0;
          }
        }
        
        // Delete nested events subcollection
        const eventsSnapshot = await spaceDoc.ref.collection('events').get();
        for (const eventDoc of eventsSnapshot.docs) {
          batch.delete(eventDoc.ref);
          stats.nestedEventsDeleted++;
          batchCount++;
          
          if (batchCount >= 100) {
            await batch.commit();
            console.log(`  ✓ Deleted batch of ${batchCount} documents`);
            batchCount = 0;
          }
        }
        
        // Delete the space document itself
        batch.delete(spaceDoc.ref);
        stats.nestedSpacesDeleted++;
        batchCount++;
        
        if (batchCount >= 100) {
          await batch.commit();
          console.log(`  ✓ Deleted batch of ${batchCount} documents`);
          batchCount = 0;
        }
      }
      
      // Commit remaining operations
      if (batchCount > 0) {
        await batch.commit();
        console.log(`  ✓ Deleted final batch of ${batchCount} documents`);
      }
      
      // Delete the category document itself
      await db.collection('spaces').doc(category).delete();
      console.log(`  ✓ Deleted category document: ${category}`);
      
    } catch (error) {
      console.error(`  ❌ Error deleting ${category}:`, error);
      stats.errors.push(`Deletion failed for ${category}: ${error}`);
    }
  }
  
  console.log(`\n✅ Nested structure deletion complete`);
}

/**
 * Validate that flat structure is complete
 */
async function validateFlatStructure() {
  console.log('\n🔍 VALIDATING FLAT STRUCTURE...\n');
  
  const validation = {
    spaces: 0,
    members: 0,
    posts: 0,
    events: 0
  };
  
  // Count flat collections
  validation.spaces = (await db.collection('spaces').limit(1000).get()).size;
  validation.members = (await db.collection('spaceMembers').limit(1000).get()).size;
  validation.posts = (await db.collection('spacePosts').limit(1000).get()).size;
  validation.events = (await db.collection('spaceEvents').limit(1000).get()).size;
  
  console.log('📊 Flat Structure Status:');
  console.log(`  Spaces: ${validation.spaces}`);
  console.log(`  Members: ${validation.members}`);
  console.log(`  Posts: ${validation.posts}`);
  console.log(`  Events: ${validation.events}`);
  
  const hasData = validation.spaces > 0 || validation.members > 0 || 
                   validation.posts > 0 || validation.events > 0;
  
  if (!hasData) {
    console.log('\n⚠️  WARNING: No data found in flat structure!');
    console.log('Run the migration script first: migrate-to-flat-structure.ts');
    return false;
  }
  
  return true;
}

/**
 * Main cleanup function
 */
async function runCleanup() {
  console.log('🧹 FIRESTORE NESTED STRUCTURE CLEANUP');
  console.log('=====================================');
  console.log('⚠️  WARNING: This will PERMANENTLY DELETE all nested structure data!');
  console.log('Make sure you have:');
  console.log('  1. Run the migration script successfully');
  console.log('  2. Tested the flat structure thoroughly');
  console.log('  3. Backed up your database');
  console.log('');
  
  // Validate flat structure exists
  const isValid = await validateFlatStructure();
  
  if (!isValid) {
    console.log('\n❌ Cleanup aborted: Flat structure not ready');
    process.exit(1);
  }
  
  // Prompt for confirmation
  const confirmed = await promptConfirmation('\nAre you SURE you want to delete all nested structure data? (yes/no): ');
  
  if (!confirmed) {
    console.log('\n❌ Cleanup cancelled by user');
    process.exit(0);
  }
  
  // Double confirmation for safety
  const doubleConfirmed = await promptConfirmation('\nThis action CANNOT be undone. Type "yes" to confirm deletion: ');
  
  if (!doubleConfirmed) {
    console.log('\n❌ Cleanup cancelled by user');
    process.exit(0);
  }
  
  console.log('\n🚀 Starting cleanup process...\n');
  
  try {
    await deleteNestedSpaces();
    
    // Print final statistics
    console.log('\n📊 CLEANUP STATISTICS');
    console.log('====================');
    console.log(`Nested Spaces Deleted: ${stats.nestedSpacesDeleted}`);
    console.log(`Nested Members Deleted: ${stats.nestedMembersDeleted}`);
    console.log(`Nested Posts Deleted: ${stats.nestedPostsDeleted}`);
    console.log(`Nested Events Deleted: ${stats.nestedEventsDeleted}`);
    
    if (stats.errors.length > 0) {
      console.log('\n❌ ERRORS ENCOUNTERED:');
      stats.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    console.log('\n✅ CLEANUP COMPLETE!');
    console.log('The database now uses a flat structure exclusively.');
    
  } catch (error) {
    console.error('\n❌ CRITICAL ERROR:', error);
    process.exit(1);
  }
}

// Run the cleanup
if (require.main === module) {
  runCleanup().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('Cleanup failed:', error);
    process.exit(1);
  });
}

export { runCleanup };