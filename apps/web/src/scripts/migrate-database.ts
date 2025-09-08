/**
 * DATABASE MIGRATION SCRIPT
 * Migrates from nested to flat structure using client SDK
 * Run from web app context with existing Firebase configuration
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc,
  query,
  where,
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
  appId: "1:573191826528:web:1d5eaeb8531276e4c1a705",
  measurementId: "G-NK3E12MSFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Migration stats
const stats = {
  spacesChecked: 0,
  spacesMigrated: 0,
  membersChecked: 0,
  membersMigrated: 0,
  errors: [] as string[]
};

async function migrateSpaces() {
  console.log('\n📦 MIGRATING SPACES TO FLAT STRUCTURE...\n');
  
  try {
    // Check for flat spaces first
    const spacesRef = collection(db, 'spaces');
    const spacesSnapshot = await getDocs(query(spacesRef, limit(20)));
    
    console.log(`Found ${spacesSnapshot.size} spaces in flat structure`);
    
    // Ensure all have categories
    for (const spaceDoc of spacesSnapshot.docs) {
      stats.spacesChecked++;
      const data = spaceDoc.data();
      
      if (!data.category && !data.spaceType) {
        console.log(`  Adding category to space: ${spaceDoc.id}`);
        await updateDoc(doc(db, 'spaces', spaceDoc.id), {
          category: data.type || 'general',
          updatedAt: new Date()
        });
      }
    }
    
    // Check for nested spaces
    const categories = ['academic_programs', 'campus_living', 'student_organizations', 'greek_life'];
    
    for (const category of categories) {
      console.log(`\nChecking nested category: ${category}`);
      
      try {
        const nestedRef = collection(db, 'spaces', category, 'spaces');
        const nestedSnapshot = await getDocs(query(nestedRef, limit(10)));
        
        if (nestedSnapshot.size > 0) {
          console.log(`  Found ${nestedSnapshot.size} nested spaces in ${category}`);
          
          for (const spaceDoc of nestedSnapshot.docs) {
            const spaceData = spaceDoc.data();
            const spaceId = spaceDoc.id;
            
            // Check if already migrated
            const flatDoc = await getDoc(doc(db, 'spaces', spaceId));
            
            if (!flatDoc.exists()) {
              // Migrate to flat structure
              await setDoc(doc(db, 'spaces', spaceId), {
                ...spaceData,
                id: spaceId,
                category,
                spaceType: category,
                memberCount: spaceData.memberCount || 0,
                postCount: spaceData.postCount || 0,
                eventCount: spaceData.eventCount || 0,
                status: spaceData.status || 'active',
                isPublic: spaceData.isPublic !== undefined ? spaceData.isPublic : true,
                createdAt: spaceData.createdAt || new Date(),
                updatedAt: new Date(),
                migratedAt: new Date(),
                migratedFrom: `spaces/${category}/spaces/${spaceId}`
              });
              
              stats.spacesMigrated++;
              console.log(`    ✓ Migrated: ${spaceData.name || spaceId}`);
            } else {
              console.log(`    ⚠️  Already exists: ${spaceId}`);
            }
          }
        }
      } catch (err) {
        console.log(`  No nested spaces in ${category} or access denied`);
      }
    }
    
  } catch (error) {
    console.error('Error migrating spaces:', error);
    stats.errors.push(`Space migration: ${error}`);
  }
}

async function migrateMembers() {
  console.log('\n👥 MIGRATING MEMBERS TO FLAT STRUCTURE...\n');
  
  try {
    // Get all flat spaces
    const spacesRef = collection(db, 'spaces');
    const spacesSnapshot = await getDocs(query(spacesRef, limit(20)));
    
    for (const spaceDoc of spacesSnapshot.docs) {
      const spaceId = spaceDoc.id;
      const spaceData = spaceDoc.data();
      
      console.log(`\nChecking members for space: ${spaceData.name || spaceId}`);
      
      try {
        // Check for nested members
        const nestedMembersRef = collection(db, 'spaces', spaceId, 'members');
        const nestedSnapshot = await getDocs(query(nestedMembersRef, limit(20)));
        
        if (nestedSnapshot.size > 0) {
          console.log(`  Found ${nestedSnapshot.size} nested members`);
          
          for (const memberDoc of nestedSnapshot.docs) {
            stats.membersChecked++;
            const memberData = memberDoc.data();
            const userId = memberDoc.id;
            const compositeKey = `${spaceId}_${userId}`;
            
            // Check if already migrated
            const flatMemberDoc = await getDoc(doc(db, 'spaceMembers', compositeKey));
            
            if (!flatMemberDoc.exists()) {
              // Migrate to flat structure
              await setDoc(doc(db, 'spaceMembers', compositeKey), {
                ...memberData,
                spaceId,
                userId,
                spaceName: spaceData.name || 'Unknown Space',
                spaceCategory: spaceData.category || spaceData.spaceType || 'general',
                role: memberData.role || 'member',
                joinedAt: memberData.joinedAt || new Date(),
                isActive: true,
                updatedAt: new Date(),
                migratedAt: new Date(),
                migratedFrom: `spaces/${spaceId}/members/${userId}`
              });
              
              stats.membersMigrated++;
              console.log(`    ✓ Migrated member: ${userId}`);
            } else {
              console.log(`    ⚠️  Already migrated: ${userId}`);
            }
          }
        } else {
          // Check if already using flat structure
          const flatMembersQuery = query(
            collection(db, 'spaceMembers'),
            where('spaceId', '==', spaceId),
            limit(1)
          );
          const flatSnapshot = await getDocs(flatMembersQuery);
          
          if (flatSnapshot.size > 0) {
            console.log(`  ✅ Already using flat structure`);
          } else {
            console.log(`  ⚠️  No members found`);
          }
        }
      } catch (err) {
        console.log(`  Could not access members: ${err}`);
      }
    }
    
  } catch (error) {
    console.error('Error migrating members:', error);
    stats.errors.push(`Member migration: ${error}`);
  }
}

async function runMigration() {
  console.log('🚀 STARTING DATABASE MIGRATION (CLIENT SDK)');
  console.log('==========================================');
  console.log(`Project: hive-9265c (Production)`);
  console.log(`Started at: ${new Date().toISOString()}`);
  
  try {
    await migrateSpaces();
    await migrateMembers();
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Spaces Checked: ${stats.spacesChecked}`);
    console.log(`Spaces Migrated: ${stats.spacesMigrated}`);
    console.log(`Members Checked: ${stats.membersChecked}`);
    console.log(`Members Migrated: ${stats.membersMigrated}`);
    
    if (stats.errors.length > 0) {
      console.log('\n❌ Errors encountered:');
      stats.errors.forEach(err => console.log(`  - ${err}`));
    }
    
    console.log('\n✅ MIGRATION COMPLETE!');
    console.log(`Completed at: ${new Date().toISOString()}`);
    
    console.log('\n📝 NEXT STEPS:');
    console.log('1. Verify data in Firebase Console');
    console.log('2. Deploy updated Firebase Functions');
    console.log('3. Deploy new security rules');
    console.log('4. Test application thoroughly');
    
  } catch (error) {
    console.error('\n❌ CRITICAL ERROR:', error);
  }
}

// Auto-run if executed directly
if (typeof window === 'undefined') {
  runMigration().then(() => {
    console.log('\n🏁 Script finished');
    process.exit(0);
  }).catch(err => {
    console.error('Script failed:', err);
    process.exit(1);
  });
}

export { runMigration };