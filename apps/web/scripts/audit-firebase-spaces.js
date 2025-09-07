/**
 * Audit Firebase to show exact location of RSS feed spaces
 * Run with: node apps/web/scripts/audit-firebase-spaces.js
 */

require('dotenv').config({ path: './apps/web/.env.local' });
const admin = require('firebase-admin');

// Initialize Firebase Admin
function initializeFirebase() {
  try {
    if (admin.apps?.length > 0) {
      return admin.app();
    }

    let credential;
    if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      credential = admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
    }

    const app = admin.initializeApp({
      credential,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    
    return app;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
}

async function auditFirebase() {
  const app = initializeFirebase();
  const db = admin.firestore();
  
  console.log('🔍 FIREBASE STRUCTURE AUDIT');
  console.log('═'.repeat(60));
  console.log('Project:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  console.log('');

  // Check flat collection
  console.log('📁 Checking: /spaces (flat collection)');
  console.log('─'.repeat(60));
  try {
    const flatSpaces = await db.collection('spaces').limit(5).get();
    console.log(`Found ${flatSpaces.size} documents directly in /spaces`);
    if (!flatSpaces.empty) {
      console.log('Sample documents:');
      flatSpaces.docs.forEach(doc => {
        const data = doc.data();
        console.log(`  - ${doc.id}: ${data.name || 'No name'}`);
      });
    }
  } catch (error) {
    console.log('Error accessing /spaces:', error.message);
  }
  console.log('');

  // Check nested structure
  const spaceTypes = [
    'student_organizations',
    'fraternity_and_sorority',
    'campus_living',
    'university_organizations'
  ];

  for (const spaceType of spaceTypes) {
    console.log(`📁 Checking: /spaces/${spaceType}/spaces`);
    console.log('─'.repeat(60));
    
    try {
      // First check if the document exists
      const typeDoc = await db.collection('spaces').doc(spaceType).get();
      console.log(`Document /spaces/${spaceType} exists:`, typeDoc.exists);
      
      // Then check the subcollection
      const nestedSpaces = await db
        .collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .limit(10)
        .get();
      
      console.log(`Found ${nestedSpaces.size} spaces in this category`);
      
      if (!nestedSpaces.empty) {
        console.log('\n📍 EXACT FIREBASE PATH:');
        console.log(`   /spaces/${spaceType}/spaces/{documentId}`);
        console.log('\nSample spaces (RSS feed data):');
        
        nestedSpaces.docs.forEach(doc => {
          const data = doc.data();
          console.log(`\n  Document ID: ${doc.id}`);
          console.log(`  Name: ${data.name || 'No name'}`);
          console.log(`  Path: /spaces/${spaceType}/spaces/${doc.id}`);
          
          // Show if this is RSS feed data
          if (data.description?.includes('Events organized by') || 
              data.description?.includes('Auto-created from')) {
            console.log(`  ✅ RSS Feed Import: YES`);
          }
          
          // Show available fields
          const fields = Object.keys(data).slice(0, 8);
          console.log(`  Fields: ${fields.join(', ')}`);
        });
      }
      
      // Count total in this category
      const allInCategory = await db
        .collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .get();
      console.log(`\n📊 Total count in ${spaceType}: ${allInCategory.size}`);
      
    } catch (error) {
      console.log('Error accessing nested structure:', error.message);
    }
    console.log('\n');
  }

  // Show exact example paths
  console.log('📍 EXACT FIREBASE PATHS TO RSS FEED DATA:');
  console.log('═'.repeat(60));
  console.log(`
The RSS feed spaces are stored in a NESTED structure:

/spaces/student_organizations/spaces/[space_id]
/spaces/fraternity_and_sorority/spaces/[space_id]  
/spaces/campus_living/spaces/[space_id]
/spaces/university_organizations/spaces/[space_id]

Example full paths:
- /spaces/student_organizations/spaces/space_academic_bowl
- /spaces/student_organizations/spaces/space_aces_club_tennis
- /spaces/fraternity_and_sorority/spaces/space_alpha_kappa_alpha
- /spaces/campus_living/spaces/space_campus_living

These were auto-created from RSS feed imports as evidenced by:
- Document IDs like "space_[organization_name]"
- Descriptions containing "Events organized by [org name]"
- Descriptions containing "Auto-created from lost event migration"
`);
}

// Run the audit
auditFirebase()
  .then(() => {
    console.log('\n✅ Audit complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Audit failed:', error);
    process.exit(1);
  });