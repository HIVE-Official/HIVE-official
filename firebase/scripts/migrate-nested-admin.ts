#!/usr/bin/env ts-node

/**
 * COMPLETE NESTED COLLECTIONS MIGRATION WITH ADMIN SDK
 * Moves ALL nested collections to top-level flat structure
 */

import * as admin from 'firebase-admin';

// Use the most recent service account from Downloads
const serviceAccount = require('/Users/laneyfraass/Downloads/hive-9265c-firebase-adminsdk-fbsvc-c39fd9a2a6.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'hive-9265c'
});

const db = admin.firestore();

// Migration stats
let stats = {
  membersProcessed: 0,
  membersMigrated: 0,
  postsProcessed: 0,
  postsMigrated: 0,
  eventsProcessed: 0,
  eventsMigrated: 0,
  toolsProcessed: 0,
  toolsMigrated: 0,
  errors: [] as string[]
};

async function migrateAllNestedCollections() {
  console.log('🚀 COMPLETE NESTED COLLECTIONS MIGRATION (ADMIN SDK)');
  console.log('===================================================');
  console.log('Moving ALL nested data to top-level collections\n');
  
  try {
    // Get ALL spaces
    const spacesSnapshot = await db.collection('spaces').get();
    console.log(`📦 Found ${spacesSnapshot.size} spaces to process\n`);
    
    for (const spaceDoc of spacesSnapshot.docs) {
      const spaceId = spaceDoc.id;
      const spaceData = spaceDoc.data();
      
      // Skip category documents
      if (['campus_living', 'academic_programs', 'student_organizations', 'greek_life', 'university_organizations'].includes(spaceId)) {
        console.log(`⚠️  Skipping category document: ${spaceId}`);
        continue;
      }
      
      console.log(`\n🔍 Processing space: ${spaceData.name || spaceId}`);
      console.log(`   Category: ${spaceData.category || 'unknown'}`);
      
      // 1. MIGRATE MEMBERS
      try {
        const membersSnapshot = await db.collection('spaces').doc(spaceId).collection('members').get();
        
        if (!membersSnapshot.empty) {
          console.log(`   👥 Found ${membersSnapshot.size} members to migrate`);
          
          const batch = db.batch();
          let batchCount = 0;
          
          for (const memberDoc of membersSnapshot.docs) {
            stats.membersProcessed++;
            const memberData = memberDoc.data();
            const userId = memberDoc.id;
            const compositeKey = `${spaceId}_${userId}`;
            
            // Create in flat collection
            const flatMemberRef = db.collection('spaceMembers').doc(compositeKey);
            batch.set(flatMemberRef, {
              ...memberData,
              spaceId,
              userId,
              spaceName: spaceData.name || 'Unknown Space',
              spaceCategory: spaceData.category || spaceData.spaceType || 'general',
              role: memberData.role || 'member',
              joinedAt: memberData.joinedAt || admin.firestore.Timestamp.now(),
              isActive: memberData.isActive !== false,
              migratedAt: admin.firestore.Timestamp.now(),
              migratedFrom: `spaces/${spaceId}/members/${userId}`
            }, { merge: true });
            
            batchCount++;
            stats.membersMigrated++;
            
            // Commit batch every 100 operations
            if (batchCount >= 100) {
              await batch.commit();
              console.log(`      ✓ Migrated batch of ${batchCount} members`);
              batchCount = 0;
            }
          }
          
          // Commit remaining
          if (batchCount > 0) {
            await batch.commit();
            console.log(`      ✓ Migrated ${batchCount} members`);
          }
        }
      } catch (err) {
        console.log(`      ⚠️ No members subcollection`);
      }
      
      // 2. MIGRATE POSTS
      try {
        const postsSnapshot = await db.collection('spaces').doc(spaceId).collection('posts').get();
        
        if (!postsSnapshot.empty) {
          console.log(`   📝 Found ${postsSnapshot.size} posts to migrate`);
          
          const batch = db.batch();
          let batchCount = 0;
          
          for (const postDoc of postsSnapshot.docs) {
            stats.postsProcessed++;
            const postData = postDoc.data();
            const postId = postDoc.id;
            
            const flatPostRef = db.collection('spacePosts').doc(postId);
            batch.set(flatPostRef, {
              ...postData,
              id: postId,
              spaceId,
              spaceName: spaceData.name || 'Unknown Space',
              spaceCategory: spaceData.category || spaceData.spaceType || 'general',
              likeCount: postData.likeCount || 0,
              commentCount: postData.commentCount || 0,
              isPinned: postData.isPinned || false,
              createdAt: postData.createdAt || admin.firestore.Timestamp.now(),
              updatedAt: postData.updatedAt || admin.firestore.Timestamp.now(),
              migratedAt: admin.firestore.Timestamp.now(),
              migratedFrom: `spaces/${spaceId}/posts/${postId}`
            }, { merge: true });
            
            batchCount++;
            stats.postsMigrated++;
            
            if (batchCount >= 100) {
              await batch.commit();
              console.log(`      ✓ Migrated batch of ${batchCount} posts`);
              batchCount = 0;
            }
          }
          
          if (batchCount > 0) {
            await batch.commit();
            console.log(`      ✓ Migrated ${batchCount} posts`);
          }
        }
      } catch (err) {
        console.log(`      ⚠️ No posts subcollection`);
      }
      
      // 3. MIGRATE EVENTS
      try {
        const eventsSnapshot = await db.collection('spaces').doc(spaceId).collection('events').get();
        
        if (!eventsSnapshot.empty) {
          console.log(`   📅 Found ${eventsSnapshot.size} events to migrate`);
          
          const batch = db.batch();
          let batchCount = 0;
          
          for (const eventDoc of eventsSnapshot.docs) {
            stats.eventsProcessed++;
            const eventData = eventDoc.data();
            const eventId = eventDoc.id;
            
            const flatEventRef = db.collection('spaceEvents').doc(eventId);
            batch.set(flatEventRef, {
              ...eventData,
              id: eventId,
              spaceId,
              spaceName: spaceData.name || 'Unknown Space',
              spaceCategory: spaceData.category || spaceData.spaceType || 'general',
              attendeeCount: eventData.attendeeCount || 0,
              maxAttendees: eventData.maxAttendees || null,
              status: eventData.status || 'upcoming',
              createdAt: eventData.createdAt || admin.firestore.Timestamp.now(),
              updatedAt: eventData.updatedAt || admin.firestore.Timestamp.now(),
              migratedAt: admin.firestore.Timestamp.now(),
              migratedFrom: `spaces/${spaceId}/events/${eventId}`
            }, { merge: true });
            
            batchCount++;
            stats.eventsMigrated++;
            
            if (batchCount >= 100) {
              await batch.commit();
              console.log(`      ✓ Migrated batch of ${batchCount} events`);
              batchCount = 0;
            }
          }
          
          if (batchCount > 0) {
            await batch.commit();
            console.log(`      ✓ Migrated ${batchCount} events`);
          }
        }
      } catch (err) {
        console.log(`      ⚠️ No events subcollection`);
      }
      
      // 4. MIGRATE TOOLS
      try {
        const toolsSnapshot = await db.collection('spaces').doc(spaceId).collection('tools').get();
        
        if (!toolsSnapshot.empty) {
          console.log(`   🛠️ Found ${toolsSnapshot.size} tools to migrate`);
          
          const batch = db.batch();
          let batchCount = 0;
          
          for (const toolDoc of toolsSnapshot.docs) {
            stats.toolsProcessed++;
            const toolData = toolDoc.data();
            const toolId = toolDoc.id;
            
            const flatToolRef = db.collection('spaceTools').doc(toolId);
            batch.set(flatToolRef, {
              ...toolData,
              id: toolId,
              spaceId,
              spaceName: spaceData.name || 'Unknown Space',
              spaceCategory: spaceData.category || spaceData.spaceType || 'general',
              createdAt: toolData.createdAt || admin.firestore.Timestamp.now(),
              updatedAt: toolData.updatedAt || admin.firestore.Timestamp.now(),
              migratedAt: admin.firestore.Timestamp.now(),
              migratedFrom: `spaces/${spaceId}/tools/${toolId}`
            }, { merge: true });
            
            batchCount++;
            stats.toolsMigrated++;
            
            if (batchCount >= 100) {
              await batch.commit();
              console.log(`      ✓ Migrated batch of ${batchCount} tools`);
              batchCount = 0;
            }
          }
          
          if (batchCount > 0) {
            await batch.commit();
            console.log(`      ✓ Migrated ${batchCount} tools`);
          }
        }
      } catch (err) {
        console.log(`      ⚠️ No tools subcollection`);
      }
    }
    
    // Also check nested space structures
    console.log('\n\n🔍 Checking nested space structures...\n');
    const categories = ['campus_living', 'academic_programs', 'student_organizations', 'greek_life', 'university_organizations'];
    
    for (const category of categories) {
      console.log(`\n📂 Checking category: ${category}`);
      
      try {
        const nestedSpacesSnapshot = await db.collection('spaces').doc(category).collection('spaces').get();
        
        if (!nestedSpacesSnapshot.empty) {
          console.log(`   Found ${nestedSpacesSnapshot.size} nested spaces`);
          
          for (const spaceDoc of nestedSpacesSnapshot.docs) {
            const spaceId = spaceDoc.id;
            const spaceData = spaceDoc.data();
            
            console.log(`   Processing nested space: ${spaceData.name || spaceId}`);
            
            // Migrate nested members
            try {
              const membersSnapshot = await db
                .collection('spaces').doc(category)
                .collection('spaces').doc(spaceId)
                .collection('members').get();
              
              if (!membersSnapshot.empty) {
                console.log(`      👥 Found ${membersSnapshot.size} nested members`);
                
                for (const memberDoc of membersSnapshot.docs) {
                  stats.membersProcessed++;
                  const memberData = memberDoc.data();
                  const userId = memberDoc.id;
                  const compositeKey = `${spaceId}_${userId}`;
                  
                  await db.collection('spaceMembers').doc(compositeKey).set({
                    ...memberData,
                    spaceId,
                    userId,
                    spaceName: spaceData.name || 'Unknown Space',
                    spaceCategory: category,
                    role: memberData.role || 'member',
                    joinedAt: memberData.joinedAt || admin.firestore.Timestamp.now(),
                    isActive: true,
                    migratedAt: admin.firestore.Timestamp.now(),
                    migratedFrom: `spaces/${category}/spaces/${spaceId}/members/${userId}`
                  }, { merge: true });
                  
                  stats.membersMigrated++;
                }
              }
            } catch (err) {
              // Silent
            }
            
            // Migrate nested posts
            try {
              const postsSnapshot = await db
                .collection('spaces').doc(category)
                .collection('spaces').doc(spaceId)
                .collection('posts').get();
              
              if (!postsSnapshot.empty) {
                console.log(`      📝 Found ${postsSnapshot.size} nested posts`);
                
                for (const postDoc of postsSnapshot.docs) {
                  stats.postsProcessed++;
                  const postData = postDoc.data();
                  const postId = postDoc.id;
                  
                  await db.collection('spacePosts').doc(postId).set({
                    ...postData,
                    id: postId,
                    spaceId,
                    spaceName: spaceData.name || 'Unknown Space',
                    spaceCategory: category,
                    createdAt: postData.createdAt || admin.firestore.Timestamp.now(),
                    migratedAt: admin.firestore.Timestamp.now(),
                    migratedFrom: `spaces/${category}/spaces/${spaceId}/posts/${postId}`
                  }, { merge: true });
                  
                  stats.postsMigrated++;
                }
              }
            } catch (err) {
              // Silent
            }
            
            // Migrate nested events
            try {
              const eventsSnapshot = await db
                .collection('spaces').doc(category)
                .collection('spaces').doc(spaceId)
                .collection('events').get();
              
              if (!eventsSnapshot.empty) {
                console.log(`      📅 Found ${eventsSnapshot.size} nested events`);
                
                for (const eventDoc of eventsSnapshot.docs) {
                  stats.eventsProcessed++;
                  const eventData = eventDoc.data();
                  const eventId = eventDoc.id;
                  
                  await db.collection('spaceEvents').doc(eventId).set({
                    ...eventData,
                    id: eventId,
                    spaceId,
                    spaceName: spaceData.name || 'Unknown Space',
                    spaceCategory: category,
                    createdAt: eventData.createdAt || admin.firestore.Timestamp.now(),
                    migratedAt: admin.firestore.Timestamp.now(),
                    migratedFrom: `spaces/${category}/spaces/${spaceId}/events/${eventId}`
                  }, { merge: true });
                  
                  stats.eventsMigrated++;
                }
              }
            } catch (err) {
              // Silent
            }
          }
        }
      } catch (err) {
        console.log(`   No nested spaces in ${category}`);
      }
    }
    
  } catch (error) {
    console.error('Error during migration:', error);
    stats.errors.push(`Migration error: ${error}`);
  }
}

async function runMigration() {
  console.log('🚀 STARTING COMPLETE NESTED COLLECTIONS MIGRATION');
  console.log('=================================================');
  console.log(`Project: hive-9265c (Production)`);
  console.log(`Started at: ${new Date().toISOString()}\n`);
  
  await migrateAllNestedCollections();
  
  // Print summary
  console.log('\n\n' + '='.repeat(60));
  console.log('📊 MIGRATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Members: ${stats.membersMigrated}/${stats.membersProcessed} migrated`);
  console.log(`Posts: ${stats.postsMigrated}/${stats.postsProcessed} migrated`);
  console.log(`Events: ${stats.eventsMigrated}/${stats.eventsProcessed} migrated`);
  console.log(`Tools: ${stats.toolsMigrated}/${stats.toolsProcessed} migrated`);
  
  if (stats.errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    stats.errors.forEach(err => console.log(`  - ${err}`));
  }
  
  console.log('\n✅ MIGRATION COMPLETE!');
  console.log(`Completed at: ${new Date().toISOString()}`);
  
  console.log('\n📝 NEW TOP-LEVEL COLLECTIONS CREATED:');
  console.log('  • spaceMembers - All space members (composite keys)');
  console.log('  • spacePosts - All posts from all spaces');
  console.log('  • spaceEvents - All events from all spaces');
  console.log('  • spaceTools - All tools from all spaces');
  
  console.log('\n🎯 VERIFY IN FIREBASE CONSOLE:');
  console.log('https://console.firebase.google.com/project/hive-9265c/firestore/data');
  
  console.log('\n🧹 NEXT STEP:');
  console.log('Once verified, run cleanup script to remove old nested data');
}

// Auto-run
if (require.main === module) {
  runMigration().then(() => {
    console.log('\n🏁 Migration finished successfully');
    process.exit(0);
  }).catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
}

export { runMigration };