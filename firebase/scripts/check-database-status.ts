import * as admin from "firebase-admin";
import { applicationDefault } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
// Uses Application Default Credentials in production
// or GOOGLE_APPLICATION_CREDENTIALS environment variable
admin.initializeApp({
  credential: applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID || 'hive-9265c'
});

const db = admin.firestore();

async function checkDatabaseStatus() {
  console.log('🔍 Checking Firestore Database Status for hive-9265c...\n');
  
  try {
    // List all top-level collections
    const collections = await db.listCollections();
    console.log('📁 Top-level Collections:');
    
    for (const collection of collections) {
      console.log(`  - ${collection.id}`);
      
      // Get document count for each collection
      try {
        const snapshot = await collection.limit(5).get();
        console.log(`    └── ${snapshot.size} documents (showing first 5)`);
        
        // Show first few document IDs
        snapshot.docs.forEach((doc, index) => {
          console.log(`        ${index + 1}. ${doc.id}`);
        });
        
        // Check for subcollections in first document
        if (!snapshot.empty) {
          const firstDoc = snapshot.docs[0];
          const subcollections = await firstDoc.ref.listCollections();
          if (subcollections.length > 0) {
            console.log(`    └── Subcollections in ${firstDoc.id}:`);
            subcollections.forEach(sub => {
              console.log(`        - ${sub.id}`);
            });
          }
        }
        
        console.log('');
      } catch (error) {
        console.log(`    └── Error reading collection: ${(error as Error).message}\n`);
      }
    }
    
    // Check specific collections we expect from migration
    console.log('🎯 Checking Migration-Specific Collections:');
    
    const expectedCollections = [
      'users',
      'spaces', 
      'schools',
      'creation_tools',
      'creation_templates',
      'platform_analytics',
      'user_behavior',
      'content_metrics',
      'content_reports',
      'moderation_queue',
      'safety_reports'
    ];
    
    for (const collectionName of expectedCollections) {
      try {
        const snapshot = await db.collection(collectionName).limit(1).get();
        console.log(`  ✅ ${collectionName}: ${snapshot.size > 0 ? 'Has data' : 'Empty'}`);
      } catch (error) {
        console.log(`  ❌ ${collectionName}: Error - ${(error as Error).message}`);
      }
    }
    
    // Check for user subcollections
    console.log('\n👤 Checking User Subcollections:');
    const usersSnapshot = await db.collection('users').limit(3).get();
    
    for (const userDoc of usersSnapshot.docs) {
      console.log(`  User: ${userDoc.id}`);
      
      const expectedSubcollections = ['notifications', 'preferences', 'analytics'];
      for (const subcol of expectedSubcollections) {
        try {
          const subSnapshot = await userDoc.ref.collection(subcol).limit(1).get();
          console.log(`    ✅ ${subcol}: ${subSnapshot.size > 0 ? 'Has data' : 'Empty'}`);
        } catch (error) {
          console.log(`    ❌ ${subcol}: Error`);
        }
      }
    }
    
    // Check for space subcollections
    console.log('\n🏢 Checking Space Subcollections:');
    
    // Check both nested and flat space structures
    const spacesSnapshot = await db.collection('spaces').limit(3).get();
    
    if (spacesSnapshot.empty) {
      console.log('  No spaces found in flat structure, checking nested...');
      
      // Check nested structure
      const spaceTypes = ['campus_living', 'academic_programs', 'student_organizations', 'greek_life', 'university_organizations'];
      
      for (const spaceType of spaceTypes) {
        try {
          const nestedSpaces = await db.collection('spaces').doc(spaceType).collection('spaces').limit(2).get();
          
          if (!nestedSpaces.empty) {
            console.log(`  Found spaces in ${spaceType}:`);
            
            for (const spaceDoc of nestedSpaces.docs) {
              console.log(`    Space: ${spaceDoc.id}`);
              
              const expectedSubcollections = ['analytics', 'tools', 'moderation'];
              for (const subcol of expectedSubcollections) {
                try {
                  const subSnapshot = await spaceDoc.ref.collection(subcol).limit(1).get();
                  console.log(`      ✅ ${subcol}: ${subSnapshot.size > 0 ? 'Has data' : 'Empty'}`);
                } catch (error) {
                  console.log(`      ❌ ${subcol}: Error`);
                }
              }
            }
          }
        } catch (error) {
          console.log(`    ❌ ${spaceType}: Error - ${(error as Error).message}`);
        }
      }
    } else {
      console.log('  Found spaces in flat structure:');
      for (const spaceDoc of spacesSnapshot.docs) {
        console.log(`    Space: ${spaceDoc.id}`);
        
        const expectedSubcollections = ['analytics', 'tools', 'moderation'];
        for (const subcol of expectedSubcollections) {
          try {
            const subSnapshot = await spaceDoc.ref.collection(subcol).limit(1).get();
            console.log(`      ✅ ${subcol}: ${subSnapshot.size > 0 ? 'Has data' : 'Empty'}`);
          } catch (error) {
            console.log(`      ❌ ${subcol}: Error`);
          }
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking database status:', error);
  }
  
  console.log('\n✅ Database status check complete!');
}

checkDatabaseStatus().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
}); 