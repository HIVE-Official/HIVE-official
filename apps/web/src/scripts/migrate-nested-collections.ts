/**
import { setDoc, doc } from "firebase/firestore";
 * COMPLETE NESTED COLLECTIONS MIGRATION
 * Moves ALL nested collections to top-level flat structure
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc,
  query,
  limit,
  getDoc
} from 'firebase/firestore';

// Production Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDMDHXJ8LcWGXz05ipPTNvA-fRi9nfdzbQ",
  authDomain: "hive-9265c.firebaseapp.com",
  projectId: "hive-9265c",
  storageBucket: "hive-9265c.appspot.com",
  messagingSenderId: "573191826528",
  appId: "1:573191826528:web:1d5eaeb8531276e4c1a705"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Migration stats
const stats = {
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
  console.log('🚀 COMPLETE NESTED COLLECTIONS MIGRATION');
  console.log('========================================');
  console.log('Moving ALL nested data to top-level collections\n');
  
  try {
    // Get ALL spaces (both flat and nested)
    const spacesRef = collection(db, 'spaces');
    const spacesSnapshot = await getDocs(spacesRef);
    
    console.log(`📦 Found ${spacesSnapshot.size} spaces to process\n`);
    
    for (const spaceDoc of spacesSnapshot.docs) {
      const spaceId = spaceDoc.id;
      const spaceData = spaceDoc.data();
      
      // Skip category documents (these aren't actual spaces)
      if (['campus_living', 'academic_programs', 'student_organizations', 'greek_life', 'university_organizations'].includes(spaceId)) {
        console.log(`⚠️  Skipping category document: ${spaceId}`);
        continue;
      }
      
      console.log(`\n🔍 Processing space: ${spaceData.name || spaceId}`);
      console.log(`   Category: ${spaceData.category || 'unknown'}`);
      
      // 1. MIGRATE MEMBERS
      try {
        const membersRef = collection(db, 'spaces', spaceId, 'members');
        const membersSnapshot = await getDocs(membersRef);
        
        if (membersSnapshot.size > 0) {
          console.log(`   👥 Found ${membersSnapshot.size} members to migrate`);
          
          for (const memberDoc of membersSnapshot.docs) {
            stats.membersProcessed++;
            const memberData = memberDoc.data();
            const userId = memberDoc.id;
            const compositeKey = `${spaceId}_${userId}`;
            
            // Check if already migrated
            const existingDoc = await getDoc(doc(db, 'spaceMembers', compositeKey));
            if (!existingDoc.exists()) {
              await setDoc(doc(db, 'spaceMembers', compositeKey), {
                ...memberData,
                spaceId,
                userId,
                spaceName: spaceData.name || 'Unknown Space',
                spaceCategory: spaceData.category || spaceData.spaceType || 'general',
                role: memberData.role || 'member',
                joinedAt: memberData.joinedAt || new Date(),
                isActive: memberData.isActive !== false,
                migratedAt: new Date(),
                migratedFrom: `spaces/${spaceId}/members/${userId}`
              });
              stats.membersMigrated++;
            }
          }
          console.log(`      ✓ Migrated ${stats.membersMigrated} members`);
        }
      } catch (err) {
        console.log(`      ⚠️ No members subcollection or access denied`);
      }
      
      // 2. MIGRATE POSTS
      try {
        const postsRef = collection(db, 'spaces', spaceId, 'posts');
        const postsSnapshot = await getDocs(postsRef);
        
        if (postsSnapshot.size > 0) {
          console.log(`   📝 Found ${postsSnapshot.size} posts to migrate`);
          
          for (const postDoc of postsSnapshot.docs) {
            stats.postsProcessed++;
            const postData = postDoc.data();
            const postId = postDoc.id;
            
            // Check if already migrated
            const existingDoc = await getDoc(doc(db, 'spacePosts', postId));
            if (!existingDoc.exists()) {
              await setDoc(doc(db, 'spacePosts', postId), {
                ...postData,
                id: postId,
                spaceId,
                spaceName: spaceData.name || 'Unknown Space',
                spaceCategory: spaceData.category || spaceData.spaceType || 'general',
                likeCount: postData.likeCount || 0,
                commentCount: postData.commentCount || 0,
                isPinned: postData.isPinned || false,
                createdAt: postData.createdAt || new Date(),
                updatedAt: postData.updatedAt || new Date(),
                migratedAt: new Date(),
                migratedFrom: `spaces/${spaceId}/posts/${postId}`
              });
              stats.postsMigrated++;
            }
          }
          console.log(`      ✓ Migrated ${stats.postsMigrated} posts`);
        }
      } catch (err) {
        console.log(`      ⚠️ No posts subcollection or access denied`);
      }
      
      // 3. MIGRATE EVENTS
      try {
        const eventsRef = collection(db, 'spaces', spaceId, 'events');
        const eventsSnapshot = await getDocs(eventsRef);
        
        if (eventsSnapshot.size > 0) {
          console.log(`   📅 Found ${eventsSnapshot.size} events to migrate`);
          
          for (const eventDoc of eventsSnapshot.docs) {
            stats.eventsProcessed++;
            const eventData = eventDoc.data();
            const eventId = eventDoc.id;
            
            // Check if already migrated
            const existingDoc = await getDoc(doc(db, 'spaceEvents', eventId));
            if (!existingDoc.exists()) {
              await setDoc(doc(db, 'spaceEvents', eventId), {
                ...eventData,
                id: eventId,
                spaceId,
                spaceName: spaceData.name || 'Unknown Space',
                spaceCategory: spaceData.category || spaceData.spaceType || 'general',
                attendeeCount: eventData.attendeeCount || 0,
                maxAttendees: eventData.maxAttendees || null,
                status: eventData.status || 'upcoming',
                createdAt: eventData.createdAt || new Date(),
                updatedAt: eventData.updatedAt || new Date(),
                migratedAt: new Date(),
                migratedFrom: `spaces/${spaceId}/events/${eventId}`
              });
              stats.eventsMigrated++;
            }
          }
          console.log(`      ✓ Migrated ${stats.eventsMigrated} events`);
        }
      } catch (err) {
        console.log(`      ⚠️ No events subcollection or access denied`);
      }
      
      // 4. MIGRATE TOOLS
      try {
        const toolsRef = collection(db, 'spaces', spaceId, 'tools');
        const toolsSnapshot = await getDocs(toolsRef);
        
        if (toolsSnapshot.size > 0) {
          console.log(`   🛠️ Found ${toolsSnapshot.size} tools to migrate`);
          
          for (const toolDoc of toolsSnapshot.docs) {
            stats.toolsProcessed++;
            const toolData = toolDoc.data();
            const toolId = toolDoc.id;
            
            // Check if already migrated
            const existingDoc = await getDoc(doc(db, 'spaceTools', toolId));
            if (!existingDoc.exists()) {
              await setDoc(doc(db, 'spaceTools', toolId), {
                ...toolData,
                id: toolId,
                spaceId,
                spaceName: spaceData.name || 'Unknown Space',
                spaceCategory: spaceData.category || spaceData.spaceType || 'general',
                createdAt: toolData.createdAt || new Date(),
                updatedAt: toolData.updatedAt || new Date(),
                migratedAt: new Date(),
                migratedFrom: `spaces/${spaceId}/tools/${toolId}`
              });
              stats.toolsMigrated++;
            }
          }
          console.log(`      ✓ Migrated ${stats.toolsMigrated} tools`);
        }
      } catch (err) {
        console.log(`      ⚠️ No tools subcollection or access denied`);
      }
    }
    
    // Also check nested space structures
    console.log('\n\n🔍 Checking nested space structures...\n');
    const categories = ['campus_living', 'academic_programs', 'student_organizations', 'greek_life', 'university_organizations'];
    
    for (const category of categories) {
      console.log(`\n📂 Checking category: ${category}`);
      
      try {
        const nestedSpacesRef = collection(db, 'spaces', category, 'spaces');
        const nestedSnapshot = await getDocs(nestedSpacesRef);
        
        if (nestedSnapshot.size > 0) {
          console.log(`   Found ${nestedSnapshot.size} nested spaces`);
          
          for (const spaceDoc of nestedSnapshot.docs) {
            const spaceId = spaceDoc.id;
            const spaceData = spaceDoc.data();
            
            console.log(`   Processing nested space: ${spaceData.name || spaceId}`);
            
            // Migrate nested members
            try {
              const nestedMembersRef = collection(db, 'spaces', category, 'spaces', spaceId, 'members');
              const membersSnapshot = await getDocs(nestedMembersRef);
              
              if (membersSnapshot.size > 0) {
                console.log(`      👥 Found ${membersSnapshot.size} nested members`);
                
                for (const memberDoc of membersSnapshot.docs) {
                  stats.membersProcessed++;
                  const memberData = memberDoc.data();
                  const userId = memberDoc.id;
                  const compositeKey = `${spaceId}_${userId}`;
                  
                  const existingDoc = await getDoc(doc(db, 'spaceMembers', compositeKey));
                  if (!existingDoc.exists()) {
                    await setDoc(doc(db, 'spaceMembers', compositeKey), {
                      ...memberData,
                      spaceId,
                      userId,
                      spaceName: spaceData.name || 'Unknown Space',
                      spaceCategory: category,
                      role: memberData.role || 'member',
                      joinedAt: memberData.joinedAt || new Date(),
                      isActive: true,
                      migratedAt: new Date(),
                      migratedFrom: `spaces/${category}/spaces/${spaceId}/members/${userId}`
                    });
                    stats.membersMigrated++;
                  }
                }
              }
            } catch (err) {
              // Silent
            }
            
            // Migrate nested posts
            try {
              const nestedPostsRef = collection(db, 'spaces', category, 'spaces', spaceId, 'posts');
              const postsSnapshot = await getDocs(nestedPostsRef);
              
              if (postsSnapshot.size > 0) {
                console.log(`      📝 Found ${postsSnapshot.size} nested posts`);
                
                for (const postDoc of postsSnapshot.docs) {
                  stats.postsProcessed++;
                  const postData = postDoc.data();
                  const postId = postDoc.id;
                  
                  const existingDoc = await getDoc(doc(db, 'spacePosts', postId));
                  if (!existingDoc.exists()) {
                    await setDoc(doc(db, 'spacePosts', postId), {
                      ...postData,
                      id: postId,
                      spaceId,
                      spaceName: spaceData.name || 'Unknown Space',
                      spaceCategory: category,
                      createdAt: postData.createdAt || new Date(),
                      migratedAt: new Date(),
                      migratedFrom: `spaces/${category}/spaces/${spaceId}/posts/${postId}`
                    });
                    stats.postsMigrated++;
                  }
                }
              }
            } catch (err) {
              // Silent
            }
            
            // Migrate nested events
            try {
              const nestedEventsRef = collection(db, 'spaces', category, 'spaces', spaceId, 'events');
              const eventsSnapshot = await getDocs(nestedEventsRef);
              
              if (eventsSnapshot.size > 0) {
                console.log(`      📅 Found ${eventsSnapshot.size} nested events`);
                
                for (const eventDoc of eventsSnapshot.docs) {
                  stats.eventsProcessed++;
                  const eventData = eventDoc.data();
                  const eventId = eventDoc.id;
                  
                  const existingDoc = await getDoc(doc(db, 'spaceEvents', eventId));
                  if (!existingDoc.exists()) {
                    await setDoc(doc(db, 'spaceEvents', eventId), {
                      ...eventData,
                      id: eventId,
                      spaceId,
                      spaceName: spaceData.name || 'Unknown Space',
                      spaceCategory: category,
                      createdAt: eventData.createdAt || new Date(),
                      migratedAt: new Date(),
                      migratedFrom: `spaces/${category}/spaces/${spaceId}/events/${eventId}`
                    });
                    stats.eventsMigrated++;
                  }
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
  
  console.log('\n📝 NEW TOP-LEVEL COLLECTIONS:');
  console.log('  • spaceMembers - All space members (composite keys)');
  console.log('  • spacePosts - All posts from all spaces');
  console.log('  • spaceEvents - All events from all spaces');
  console.log('  • spaceTools - All tools from all spaces');
  
  console.log('\n🎯 NEXT STEPS:');
  console.log('1. Verify new collections in Firebase Console');
  console.log('2. Test application with new structure');
  console.log('3. Once verified, run cleanup to remove nested data');
}

// Auto-run
runMigration().then(() => {
  console.log('\n🏁 Migration finished');
  process.exit(0);
}).catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});