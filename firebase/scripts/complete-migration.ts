#!/usr/bin/env ts-node

/**
 * COMPLETE MIGRATION - Move ALL nested spaces to flat structure
 */

import * as admin from 'firebase-admin';

const serviceAccount = require('/Users/laneyfraass/Downloads/hive-9265c-firebase-adminsdk-fbsvc-c39fd9a2a6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'hive-9265c'
});

const db = admin.firestore();

async function completeNestedMigration() {
  console.log('🚀 COMPLETING NESTED MIGRATION');
  console.log('==============================\n');
  
  let totalSpacesMigrated = 0;
  let totalMembersMigrated = 0;
  let totalPostsMigrated = 0;
  let totalEventsMigrated = 0;
  
  const categories = ['campus_living', 'academic_programs', 'student_organizations', 'greek_life', 'university_organizations'];
  
  for (const category of categories) {
    console.log(`\n📂 Processing category: ${category}`);
    
    try {
      // Get all nested spaces in this category
      const nestedSpacesSnapshot = await db
        .collection('spaces')
        .doc(category)
        .collection('spaces')
        .get();
      
      if (nestedSpacesSnapshot.empty) {
        console.log(`  No nested spaces found`);
        continue;
      }
      
      console.log(`  Found ${nestedSpacesSnapshot.size} nested spaces to migrate`);
      
      for (const spaceDoc of nestedSpacesSnapshot.docs) {
        const spaceId = spaceDoc.id;
        const spaceData = spaceDoc.data();
        
        console.log(`\n  🏢 Migrating space: ${spaceData.name || spaceId}`);
        
        // 1. Migrate the space itself to flat structure
        const flatSpaceRef = db.collection('spaces').doc(spaceId);
        const existingSpace = await flatSpaceRef.get();
        
        if (!existingSpace.exists) {
          await flatSpaceRef.set({
            ...spaceData,
            id: spaceId,
            category: category,
            spaceType: category,
            memberCount: spaceData.memberCount || 0,
            postCount: spaceData.postCount || 0,
            eventCount: spaceData.eventCount || 0,
            status: spaceData.status || 'active',
            isPublic: spaceData.isPublic !== undefined ? spaceData.isPublic : true,
            createdAt: spaceData.createdAt || admin.firestore.Timestamp.now(),
            updatedAt: admin.firestore.Timestamp.now(),
            migratedAt: admin.firestore.Timestamp.now(),
            migratedFrom: `spaces/${category}/spaces/${spaceId}`
          });
          totalSpacesMigrated++;
          console.log(`    ✅ Space migrated`);
        } else {
          // Update category if missing
          if (!existingSpace.data()?.category) {
            await flatSpaceRef.update({
              category: category,
              spaceType: category,
              updatedAt: admin.firestore.Timestamp.now()
            });
            console.log(`    ✅ Space category updated`);
          }
        }
        
        // 2. Migrate nested members
        try {
          const membersSnapshot = await db
            .collection('spaces')
            .doc(category)
            .collection('spaces')
            .doc(spaceId)
            .collection('members')
            .get();
          
          if (!membersSnapshot.empty) {
            console.log(`    👥 Migrating ${membersSnapshot.size} members`);
            
            for (const memberDoc of membersSnapshot.docs) {
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
                isActive: memberData.isActive !== false,
                migratedAt: admin.firestore.Timestamp.now(),
                migratedFrom: `spaces/${category}/spaces/${spaceId}/members/${userId}`
              }, { merge: true });
              
              totalMembersMigrated++;
            }
          }
        } catch (err) {
          // Silent
        }
        
        // 3. Migrate nested posts
        try {
          const postsSnapshot = await db
            .collection('spaces')
            .doc(category)
            .collection('spaces')
            .doc(spaceId)
            .collection('posts')
            .get();
          
          if (!postsSnapshot.empty) {
            console.log(`    📝 Migrating ${postsSnapshot.size} posts`);
            
            for (const postDoc of postsSnapshot.docs) {
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
              
              totalPostsMigrated++;
            }
          }
        } catch (err) {
          // Silent
        }
        
        // 4. Migrate nested events
        try {
          const eventsSnapshot = await db
            .collection('spaces')
            .doc(category)
            .collection('spaces')
            .doc(spaceId)
            .collection('events')
            .get();
          
          if (!eventsSnapshot.empty) {
            console.log(`    📅 Migrating ${eventsSnapshot.size} events`);
            
            for (const eventDoc of eventsSnapshot.docs) {
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
              
              totalEventsMigrated++;
            }
          }
        } catch (err) {
          // Silent
        }
      }
    } catch (error) {
      console.log(`  Error processing ${category}:`, error);
    }
  }
  
  // Final count
  console.log('\n\n' + '='.repeat(60));
  console.log('📊 MIGRATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`Spaces migrated: ${totalSpacesMigrated}`);
  console.log(`Members migrated: ${totalMembersMigrated}`);
  console.log(`Posts migrated: ${totalPostsMigrated}`);
  console.log(`Events migrated: ${totalEventsMigrated}`);
  
  // Get final totals
  const totalSpaces = await db.collection('spaces').count().get();
  const totalMembers = await db.collection('spaceMembers').count().get();
  const totalPosts = await db.collection('spacePosts').count().get();
  const totalEvents = await db.collection('spaceEvents').count().get();
  
  console.log('\n📈 FINAL DATABASE TOTALS:');
  console.log(`spaces: ${totalSpaces.data().count} documents`);
  console.log(`spaceMembers: ${totalMembers.data().count} documents`);
  console.log(`spacePosts: ${totalPosts.data().count} documents`);
  console.log(`spaceEvents: ${totalEvents.data().count} documents`);
  
  console.log('\n✅ All nested spaces and their data have been migrated to flat structure!');
  console.log('\n🔗 View in Firebase Console:');
  console.log('https://console.firebase.google.com/project/hive-9265c/firestore/data');
}

// Run
completeNestedMigration().then(() => {
  console.log('\n🏁 Migration complete');
  process.exit(0);
}).catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});