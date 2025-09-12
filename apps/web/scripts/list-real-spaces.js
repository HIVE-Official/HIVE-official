/**
 * List all real spaces from Firebase
 * Run with: node apps/web/scripts/list-real-spaces.js
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
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(
        Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString()
      );
      credential = admin.credential.cert(serviceAccount);
    }

    const _app = admin.initializeApp({
      credential,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    
    return app;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
}

async function listRealSpaces() {
  try {
    console.log('📋 Listing all real spaces from Firebase RSS data...\n');
    
    const _app = initializeFirebase();
    const db = admin.firestore();
    
    const spaceTypes = [
      'student_organizations',
      'fraternity_and_sorority', 
      'campus_living',
      'university_organizations'
    ];
    
    for (const spaceType of spaceTypes) {
      console.log(`\n📁 ${spaceType.toUpperCase()}:`);
      console.log('='.repeat(50));
      
      try {
        const spacesSnapshot = await db
          .collection('spaces')
          .doc(spaceType)
          .collection('spaces')
          .limit(20)
          .get();
        
        if (spacesSnapshot.empty) {
          console.log('  No spaces found');
          continue;
        }
        
        spacesSnapshot.docs.forEach((doc, index) => {
          const data = doc.data();
          console.log(`  ${index + 1}. ${data.name || doc.id}`);
          console.log(`     ID: ${doc.id}`);
          if (data.description) {
            console.log(`     Description: ${data.description.substring(0, 100)}...`);
          }
          if (data.category) {
            console.log(`     Category: ${data.category}`);
          }
          if (data.tags && data.tags.length > 0) {
            console.log(`     Tags: ${data.tags.join(', ')}`);
          }
          console.log('');
        });
        
        console.log(`  Total shown: ${spacesSnapshot.size} (limited to 20)`);
        
      } catch (error) {
        console.error(`  Error fetching ${spaceType}:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error listing spaces:', error);
    process.exit(1);
  }
}

// Run the list
listRealSpaces()
  .then(() => {
    console.log('\n✅ Listing completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to list:', error);
    process.exit(1);
  });