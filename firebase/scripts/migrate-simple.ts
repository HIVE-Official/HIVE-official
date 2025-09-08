#!/usr/bin/env ts-node

/**
 * SIMPLIFIED MIGRATION: Nested to Flat Database Structure
 * Uses existing Firebase configuration from the app
 */

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Initialize Firebase Admin
let app;
if (!getApps().length) {
  // Force use of production project
  const projectId = 'hive-9265c'; // Production project ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  if (clientEmail && privateKey) {
    app = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey
      }),
      projectId
    });
    console.log(`✅ Initialized Firebase Admin for project: ${projectId}`);
  } else {
    console.error('❌ Missing Firebase credentials in .env file');
    process.exit(1);
  }
} else {
  app = getApps()[0];
}

const db = getFirestore();

// Migration statistics
let stats = {
  spacesChecked: 0,
  spacesMigrated: 0,
  membersChecked: 0,
  membersMigrated: 0,
  errors: [] as string[]
};

/**
 * Quick migration for flat structure
 */
async function runQuickMigration() {
  console.log('🚀 STARTING QUICK MIGRATION TO FLAT STRUCTURE');
  console.log('=============================================');
  console.log(`Project: ${process.env.FIREBASE_PROJECT_ID || 'hive-9265c'}`);
  console.log(`Started at: ${new Date().toISOString()}\n`);
  
  try {
    // Step 1: Check for existing flat spaces
    console.log('📦 Step 1: Checking existing spaces...\n');
    const spacesSnapshot = await db.collection('spaces').limit(10).get();
    
    if (spacesSnapshot.empty) {
      console.log('  ⚠️  No spaces found in flat structure');
      
      // Check for nested structure
      const categories = ['academic_programs', 'campus_living', 'student_organizations'];
      
      for (const category of categories) {
        const nestedSpaces = await db
          .collection('spaces')
          .doc(category)
          .collection('spaces')
          .limit(5)
          .get();
        
        if (!nestedSpaces.empty) {
          console.log(`  📊 Found ${nestedSpaces.size} spaces in nested ${category}`);
          
          // Migrate these spaces
          for (const spaceDoc of nestedSpaces.docs) {
            stats.spacesChecked++;
            const spaceData = spaceDoc.data();
            const spaceId = spaceDoc.id;
            
            // Create flat space with category
            const flatSpaceRef = db.collection('spaces').doc(spaceId);
            const existingFlat = await flatSpaceRef.get();
            
            if (!existingFlat.exists) {
              await flatSpaceRef.set({
                ...spaceData,
                category,
                spaceType: category,
                id: spaceId,
                migratedAt: new Date(),
                memberCount: spaceData.memberCount || 0,
                postCount: spaceData.postCount || 0,
                eventCount: spaceData.eventCount || 0,
                status: spaceData.status || 'active',
                isPublic: spaceData.isPublic !== undefined ? spaceData.isPublic : true
              });
              stats.spacesMigrated++;
              console.log(`    ✓ Migrated space: ${spaceData.name || spaceId}`);
            }
          }
        }
      }
    } else {
      console.log(`  ✅ Found ${spacesSnapshot.size} spaces in flat structure`);
      
      // Ensure they have categories
      for (const doc of spacesSnapshot.docs) {
        const data = doc.data();
        if (!data.category && !data.spaceType) {
          await doc.ref.update({ 
            category: 'general',
            updatedAt: new Date()
          });
          console.log(`    ✓ Added category to space: ${doc.id}`);
        }
      }
    }
    
    // Step 2: Migrate members to flat structure
    console.log('\n👥 Step 2: Migrating members...\n');
    
    const allSpaces = await db.collection('spaces').limit(20).get();
    
    for (const spaceDoc of allSpaces.docs) {
      const spaceId = spaceDoc.id;
      const spaceData = spaceDoc.data();
      
      // Check for nested members
      const nestedMembers = await spaceDoc.ref.collection('members').limit(10).get();
      
      if (!nestedMembers.empty) {
        console.log(`  📊 Found ${nestedMembers.size} members in space: ${spaceData.name || spaceId}`);
        
        for (const memberDoc of nestedMembers.docs) {
          stats.membersChecked++;
          const memberData = memberDoc.data();
          const userId = memberDoc.id;
          const compositeKey = `${spaceId}_${userId}`;
          
          // Create flat member document
          const flatMemberRef = db.collection('spaceMembers').doc(compositeKey);
          const existingMember = await flatMemberRef.get();
          
          if (!existingMember.exists) {
            await flatMemberRef.set({
              ...memberData,
              spaceId,
              userId,
              spaceName: spaceData.name || 'Unknown Space',
              spaceCategory: spaceData.category || spaceData.spaceType || 'general',
              role: memberData.role || 'member',
              joinedAt: memberData.joinedAt || new Date(),
              isActive: true,
              migratedAt: new Date()
            });
            stats.membersMigrated++;
            console.log(`    ✓ Migrated member: ${userId}`);
          }
        }
      } else {
        // Check if flat members already exist
        const flatMembers = await db
          .collection('spaceMembers')
          .where('spaceId', '==', spaceId)
          .limit(1)
          .get();
        
        if (!flatMembers.empty) {
          console.log(`  ✅ Space ${spaceData.name || spaceId} already using flat members`);
        }
      }
    }
    
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
    console.log('1. Deploy updated Firebase Functions');
    console.log('2. Deploy new Firestore security rules');
    console.log('3. Test the application thoroughly');
    console.log('4. Once verified, run cleanup script to remove nested data');
    
  } catch (error) {
    console.error('\n❌ CRITICAL ERROR:', error);
    process.exit(1);
  }
}

// Run the migration
if (require.main === module) {
  runQuickMigration().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
}

export { runQuickMigration };