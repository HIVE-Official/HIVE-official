#!/usr/bin/env ts-node

/**
 * CRITICAL MIGRATION: Nested to Flat Database Structure
 * 
 * This script migrates the entire HIVE database from conflicting nested patterns
 * to a consistent flat structure while preserving all data and relationships.
 * 
 * Migration Strategy:
 * 1. Spaces: spaces/{type}/spaces/{id} → spaces/{id} with category field
 * 2. Members: spaces/{id}/members/{userId} → spaceMembers/{spaceId_userId}
 * 3. Posts: spaces/{id}/posts/{postId} → spacePosts/{postId} with spaceId field
 * 4. Events: spaces/{id}/events/{eventId} → spaceEvents/{eventId} with spaceId field
 */

import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { applicationDefault } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
// Uses Application Default Credentials in production
// or GOOGLE_APPLICATION_CREDENTIALS environment variable
admin.initializeApp({
  credential: applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID || 'hive-9265c'
});

const db = admin.firestore();

// Migration statistics
let stats = {
  spacesProcessed: 0,
  spacesMigrated: 0,
  membersProcessed: 0,
  membersMigrated: 0,
  postsProcessed: 0,
  postsMigrated: 0,
  eventsProcessed: 0,
  eventsMigrated: 0,
  errors: [] as string[]
};

// Space categories (previously nested structure types)
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
 * Migrate spaces from nested to flat structure
 */
async function migrateSpaces() {
  console.log('\n📦 MIGRATING SPACES TO FLAT STRUCTURE...\n');
  
  // First check for any flat spaces that might already exist
  const flatSpaces = await db.collection('spaces').limit(10).get();
  
  if (!flatSpaces.empty) {
    console.log('⚠️  Found existing flat spaces. Checking if they need category field...');
    
    for (const doc of flatSpaces.docs) {
      const data = doc.data();
      if (!data.category) {
        // Infer category from type field or default to 'general'
        const category = data.type || 'general';
        await doc.ref.update({ category });
        console.log(`  ✓ Added category '${category}' to space: ${doc.id}`);
      }
    }
  }
  
  // Now migrate nested spaces
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
        console.log(`  ⚠️  No spaces found in ${category}`);
        continue;
      }
      
      console.log(`  📊 Found ${nestedSpaces.size} spaces to migrate`);
      
      const batch = db.batch();
      let batchCount = 0;
      
      for (const spaceDoc of nestedSpaces.docs) {
        stats.spacesProcessed++;
        
        const spaceData = spaceDoc.data();
        const spaceId = spaceDoc.id;
        
        // Create new flat space document with category field
        const flatSpaceRef = db.collection('spaces').doc(spaceId);
        
        // Check if already migrated
        const existing = await flatSpaceRef.get();
        if (existing.exists) {
          console.log(`  ⚠️  Space ${spaceId} already migrated, skipping...`);
          continue;
        }
        
        // Add category and ensure all required fields
        const migratedSpace = {
          ...spaceData,
          category, // Add category field to identify space type
          spaceType: category, // Keep for backwards compatibility
          id: spaceId,
          migratedFrom: `spaces/${category}/spaces/${spaceId}`,
          migratedAt: new Date(),
          // Ensure required fields exist
          memberCount: spaceData.memberCount || 0,
          postCount: spaceData.postCount || 0,
          eventCount: spaceData.eventCount || 0,
          createdAt: spaceData.createdAt || new Date(),
          updatedAt: new Date(),
          status: spaceData.status || 'active',
          isPublic: spaceData.isPublic !== undefined ? spaceData.isPublic : true
        };
        
        batch.set(flatSpaceRef, migratedSpace);
        batchCount++;
        stats.spacesMigrated++;
        
        // Commit batch every 100 operations
        if (batchCount >= 100) {
          await batch.commit();
          console.log(`  ✓ Migrated batch of ${batchCount} spaces`);
          batchCount = 0;
        }
      }
      
      // Commit remaining operations
      if (batchCount > 0) {
        await batch.commit();
        console.log(`  ✓ Migrated final batch of ${batchCount} spaces`);
      }
      
    } catch (error) {
      console.error(`  ❌ Error migrating ${category}:`, error);
      stats.errors.push(`Space migration failed for ${category}: ${error}`);
    }
  }
  
  console.log(`\n✅ Spaces migration complete: ${stats.spacesMigrated}/${stats.spacesProcessed} migrated`);
}

/**
 * Migrate members from nested to flat structure
 */
async function migrateMembers() {
  console.log('\n👥 MIGRATING MEMBERS TO FLAT STRUCTURE...\n');
  
  // Get all spaces from flat structure
  const spacesSnapshot = await db.collection('spaces').get();
  
  for (const spaceDoc of spacesSnapshot.docs) {
    const spaceId = spaceDoc.id;
    const spaceData = spaceDoc.data();
    const category = spaceData.category || spaceData.spaceType;
    
    console.log(`\n🔍 Processing members for space: ${spaceId}`);
    
    try {
      // Try to get members from nested structure
      let membersSnapshot;
      
      // First try flat structure location
      membersSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('members')
        .get();
      
      // If not found, try nested structure
      if (membersSnapshot.empty && category) {
        membersSnapshot = await db
          .collection('spaces')
          .doc(category)
          .collection('spaces')
          .doc(spaceId)
          .collection('members')
          .get();
      }
      
      if (membersSnapshot.empty) {
        console.log(`  ⚠️  No members found for space ${spaceId}`);
        continue;
      }
      
      console.log(`  📊 Found ${membersSnapshot.size} members to migrate`);
      
      const batch = db.batch();
      let batchCount = 0;
      
      for (const memberDoc of membersSnapshot.docs) {
        stats.membersProcessed++;
        
        const memberData = memberDoc.data();
        const userId = memberDoc.id;
        const compositeKey = `${spaceId}_${userId}`;
        
        // Create flat member document with composite key
        const flatMemberRef = db.collection('spaceMembers').doc(compositeKey);
        
        // Check if already migrated
        const existing = await flatMemberRef.get();
        if (existing.exists) {
          console.log(`  ⚠️  Member ${userId} in space ${spaceId} already migrated`);
          continue;
        }
        
        // Ensure all required fields
        const migratedMember = {
          ...memberData,
          spaceId,
          userId,
          spaceName: spaceData.name || 'Unknown Space',
          spaceCategory: category,
          role: memberData.role || 'member',
          joinedAt: memberData.joinedAt || new Date(),
          updatedAt: new Date(),
          migratedFrom: category 
            ? `spaces/${category}/spaces/${spaceId}/members/${userId}`
            : `spaces/${spaceId}/members/${userId}`,
          migratedAt: new Date()
        };
        
        batch.set(flatMemberRef, migratedMember);
        batchCount++;
        stats.membersMigrated++;
        
        // Commit batch every 100 operations
        if (batchCount >= 100) {
          await batch.commit();
          console.log(`  ✓ Migrated batch of ${batchCount} members`);
          batchCount = 0;
        }
      }
      
      // Commit remaining operations
      if (batchCount > 0) {
        await batch.commit();
        console.log(`  ✓ Migrated final batch of ${batchCount} members`);
      }
      
    } catch (error) {
      console.error(`  ❌ Error migrating members for ${spaceId}:`, error);
      stats.errors.push(`Member migration failed for space ${spaceId}: ${error}`);
    }
  }
  
  console.log(`\n✅ Members migration complete: ${stats.membersMigrated}/${stats.membersProcessed} migrated`);
}

/**
 * Migrate posts from nested to flat structure
 */
async function migratePosts() {
  console.log('\n📝 MIGRATING POSTS TO FLAT STRUCTURE...\n');
  
  // Get all spaces from flat structure
  const spacesSnapshot = await db.collection('spaces').get();
  
  for (const spaceDoc of spacesSnapshot.docs) {
    const spaceId = spaceDoc.id;
    const spaceData = spaceDoc.data();
    const category = spaceData.category || spaceData.spaceType;
    
    console.log(`\n🔍 Processing posts for space: ${spaceId}`);
    
    try {
      // Try to get posts from nested structure
      let postsSnapshot;
      
      // First try flat structure location
      postsSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('posts')
        .get();
      
      // If not found, try nested structure
      if (postsSnapshot.empty && category) {
        postsSnapshot = await db
          .collection('spaces')
          .doc(category)
          .collection('spaces')
          .doc(spaceId)
          .collection('posts')
          .get();
      }
      
      if (postsSnapshot.empty) {
        console.log(`  ⚠️  No posts found for space ${spaceId}`);
        continue;
      }
      
      console.log(`  📊 Found ${postsSnapshot.size} posts to migrate`);
      
      const batch = db.batch();
      let batchCount = 0;
      
      for (const postDoc of postsSnapshot.docs) {
        stats.postsProcessed++;
        
        const postData = postDoc.data();
        const postId = postDoc.id;
        
        // Create flat post document
        const flatPostRef = db.collection('spacePosts').doc(postId);
        
        // Check if already migrated
        const existing = await flatPostRef.get();
        if (existing.exists) {
          console.log(`  ⚠️  Post ${postId} already migrated`);
          continue;
        }
        
        // Ensure all required fields
        const migratedPost = {
          ...postData,
          id: postId,
          spaceId,
          spaceName: spaceData.name || 'Unknown Space',
          spaceCategory: category,
          createdAt: postData.createdAt || new Date(),
          updatedAt: new Date(),
          likeCount: postData.likeCount || 0,
          commentCount: postData.commentCount || 0,
          isPinned: postData.isPinned || false,
          migratedFrom: category
            ? `spaces/${category}/spaces/${spaceId}/posts/${postId}`
            : `spaces/${spaceId}/posts/${postId}`,
          migratedAt: new Date()
        };
        
        batch.set(flatPostRef, migratedPost);
        batchCount++;
        stats.postsMigrated++;
        
        // Commit batch every 100 operations
        if (batchCount >= 100) {
          await batch.commit();
          console.log(`  ✓ Migrated batch of ${batchCount} posts`);
          batchCount = 0;
        }
      }
      
      // Commit remaining operations
      if (batchCount > 0) {
        await batch.commit();
        console.log(`  ✓ Migrated final batch of ${batchCount} posts`);
      }
      
    } catch (error) {
      console.error(`  ❌ Error migrating posts for ${spaceId}:`, error);
      stats.errors.push(`Post migration failed for space ${spaceId}: ${error}`);
    }
  }
  
  console.log(`\n✅ Posts migration complete: ${stats.postsMigrated}/${stats.postsProcessed} migrated`);
}

/**
 * Migrate events from nested to flat structure
 */
async function migrateEvents() {
  console.log('\n📅 MIGRATING EVENTS TO FLAT STRUCTURE...\n');
  
  // Get all spaces from flat structure
  const spacesSnapshot = await db.collection('spaces').get();
  
  for (const spaceDoc of spacesSnapshot.docs) {
    const spaceId = spaceDoc.id;
    const spaceData = spaceDoc.data();
    const category = spaceData.category || spaceData.spaceType;
    
    console.log(`\n🔍 Processing events for space: ${spaceId}`);
    
    try {
      // Try to get events from nested structure
      let eventsSnapshot;
      
      // First try flat structure location
      eventsSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('events')
        .get();
      
      // If not found, try nested structure
      if (eventsSnapshot.empty && category) {
        eventsSnapshot = await db
          .collection('spaces')
          .doc(category)
          .collection('spaces')
          .doc(spaceId)
          .collection('events')
          .get();
      }
      
      if (eventsSnapshot.empty) {
        console.log(`  ⚠️  No events found for space ${spaceId}`);
        continue;
      }
      
      console.log(`  📊 Found ${eventsSnapshot.size} events to migrate`);
      
      const batch = db.batch();
      let batchCount = 0;
      
      for (const eventDoc of eventsSnapshot.docs) {
        stats.eventsProcessed++;
        
        const eventData = eventDoc.data();
        const eventId = eventDoc.id;
        
        // Create flat event document
        const flatEventRef = db.collection('spaceEvents').doc(eventId);
        
        // Check if already migrated
        const existing = await flatEventRef.get();
        if (existing.exists) {
          console.log(`  ⚠️  Event ${eventId} already migrated`);
          continue;
        }
        
        // Ensure all required fields
        const migratedEvent = {
          ...eventData,
          id: eventId,
          spaceId,
          spaceName: spaceData.name || 'Unknown Space',
          spaceCategory: category,
          createdAt: eventData.createdAt || new Date(),
          updatedAt: new Date(),
          attendeeCount: eventData.attendeeCount || 0,
          maxAttendees: eventData.maxAttendees || null,
          status: eventData.status || 'upcoming',
          migratedFrom: category
            ? `spaces/${category}/spaces/${spaceId}/events/${eventId}`
            : `spaces/${spaceId}/events/${eventId}`,
          migratedAt: new Date()
        };
        
        batch.set(flatEventRef, migratedEvent);
        batchCount++;
        stats.eventsMigrated++;
        
        // Commit batch every 100 operations
        if (batchCount >= 100) {
          await batch.commit();
          console.log(`  ✓ Migrated batch of ${batchCount} events`);
          batchCount = 0;
        }
      }
      
      // Commit remaining operations
      if (batchCount > 0) {
        await batch.commit();
        console.log(`  ✓ Migrated final batch of ${batchCount} events`);
      }
      
    } catch (error) {
      console.error(`  ❌ Error migrating events for ${spaceId}:`, error);
      stats.errors.push(`Event migration failed for space ${spaceId}: ${error}`);
    }
  }
  
  console.log(`\n✅ Events migration complete: ${stats.eventsMigrated}/${stats.eventsProcessed} migrated`);
}

/**
 * Validate migration by checking data integrity
 */
async function validateMigration() {
  console.log('\n🔍 VALIDATING MIGRATION...\n');
  
  const validation = {
    spaces: { flat: 0, nested: 0 },
    members: { flat: 0, nested: 0 },
    posts: { flat: 0, nested: 0 },
    events: { flat: 0, nested: 0 }
  };
  
  // Count flat spaces
  validation.spaces.flat = (await db.collection('spaces').get()).size;
  
  // Count nested spaces
  for (const category of SPACE_CATEGORIES) {
    const nested = await db.collection('spaces').doc(category).collection('spaces').get();
    validation.spaces.nested += nested.size;
  }
  
  // Count flat members
  validation.members.flat = (await db.collection('spaceMembers').limit(1000).get()).size;
  
  // Count flat posts
  validation.posts.flat = (await db.collection('spacePosts').limit(1000).get()).size;
  
  // Count flat events
  validation.events.flat = (await db.collection('spaceEvents').limit(1000).get()).size;
  
  console.log('📊 Migration Validation Results:');
  console.log(`\n  Spaces:`);
  console.log(`    Flat structure: ${validation.spaces.flat}`);
  console.log(`    Nested structure (old): ${validation.spaces.nested}`);
  console.log(`\n  Members:`);
  console.log(`    Flat structure: ${validation.members.flat}`);
  console.log(`\n  Posts:`);
  console.log(`    Flat structure: ${validation.posts.flat}`);
  console.log(`\n  Events:`);
  console.log(`    Flat structure: ${validation.events.flat}`);
  
  if (validation.spaces.nested > 0) {
    console.log('\n⚠️  WARNING: Nested spaces still exist. Consider cleaning up after verification.');
  }
  
  return validation;
}

/**
 * Main migration function
 */
async function runMigration() {
  console.log('🚀 STARTING CRITICAL DATABASE MIGRATION');
  console.log('=====================================');
  console.log('Migration from nested to flat structure');
  console.log(`Started at: ${new Date().toISOString()}\n`);
  
  try {
    // Run migrations in sequence
    await migrateSpaces();
    await migrateMembers();
    await migratePosts();
    await migrateEvents();
    
    // Validate the migration
    const validation = await validateMigration();
    
    // Print final statistics
    console.log('\n📊 MIGRATION STATISTICS');
    console.log('=======================');
    console.log(`Spaces: ${stats.spacesMigrated}/${stats.spacesProcessed} migrated`);
    console.log(`Members: ${stats.membersMigrated}/${stats.membersProcessed} migrated`);
    console.log(`Posts: ${stats.postsMigrated}/${stats.postsProcessed} migrated`);
    console.log(`Events: ${stats.eventsMigrated}/${stats.eventsProcessed} migrated`);
    
    if (stats.errors.length > 0) {
      console.log('\n❌ ERRORS ENCOUNTERED:');
      stats.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    console.log('\n✅ MIGRATION COMPLETE!');
    console.log(`Completed at: ${new Date().toISOString()}`);
    
    console.log('\n📝 NEXT STEPS:');
    console.log('1. Update all Firebase Functions to use flat collections');
    console.log('2. Update remaining API routes to use flat structure');
    console.log('3. Deploy new Firestore security rules');
    console.log('4. Test thoroughly before removing old nested data');
    console.log('5. Once verified, run cleanup script to remove nested structures');
    
  } catch (error) {
    console.error('\n❌ CRITICAL ERROR:', error);
    process.exit(1);
  }
}

// Run the migration
if (require.main === module) {
  runMigration().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
}

export { runMigration };